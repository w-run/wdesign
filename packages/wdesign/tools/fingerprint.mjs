#!/usr/bin/env node
/**
 * fingerprint.mjs — 内容指纹与缓存策略
 *
 * ===== 要解决的问题 =====
 * 1. **demo 靠 `?v=时间戳` 手工维护** —— 每次构建都要 sed 一遍，
 *    忘了就看不到新内容（这几轮已踩两次）。
 *    时间戳还有个隐性缺陷：内容没变也换 URL，缓存永远失效。
 * 2. **库产物用固定文件名** —— `wdesign.esm.js` 发布后 CDN / 浏览器
 *    缓存无法刷新。用户升级版本还拿到旧代码，是最难排查的一类 bug。
 * 3. **缓存策略不匹配** —— 内容哈希文件名才能配 `immutable` 长缓存，
 *    否则只能保守地设短期限或 no-cache，等于放弃了缓存收益。
 *
 * ===== 采用的策略（业界通行，vite/webpack 同款）=====
 *   文件名 = 内容哈希前 8 位
 *   内容不变 → 名字不变 → 永久缓存命中
 *   内容变了 → 名字必变 → 天然绕开旧缓存
 *
 * 同时生成 manifest（原文件名 → 指纹文件名），
 * HTML 里的引用由它改写，不再手写版本号。
 *
 * 用法：
 *   node tools/fingerprint.mjs demo      # 给 demo 的资源加指纹并改写 index.html
 *   node tools/fingerprint.mjs lib       # 给 dist 产物加指纹 + 生成 manifest
 *   node tools/fingerprint.mjs check     # 校验 index.html 引用是否都带指纹
 */
import { readFileSync, writeFileSync, existsSync, copyFileSync, unlinkSync, readdirSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/** 内容哈希：取 sha256 前 8 位，足够避免碰撞，又不至于把文件名撑爆 */
function hash(buf) {
  return createHash('sha256').update(buf).digest('hex').slice(0, 8)
}

/**
 * 给一个文件生成指纹名：app.js → app.a1b2c3d4.js
 * 无扩展名的文件（如 LICENSE）不加后缀。
 */
function fingerprinted(name, buf) {
  const ext = extname(name)
  if (!ext) return name
  const stem = basename(name, ext)
  return `${stem}.${hash(buf)}${ext}`
}

/* ---------------------------------------------------------------
 * demo 模式
 *
 * 把 demo 下需要版本控制的资源复制成带指纹的副本，
 * 然后改写 index.html 的引用。旧的无指纹副本删除，
 * 避免目录里堆一堆历史文件。
 * ------------------------------------------------------------- */
const DEMO_ASSETS = [
  'demo.css',
  'demo.js',
  'demo-extra.js',
  'components.js',
  'icons.data.js',
  'icons.optical.js',
  'vue.global.prod.js',
]

function buildDemo() {
  const dir = join(ROOT, 'demo')
  const htmlPath = join(dir, 'index.html')
  let html = readFileSync(htmlPath, 'utf8')
  const manifest = {}

  // 读上一轮清单，用来判断「这次到底有没有变化」
  let prevManifest = {}
  try {
    prevManifest = JSON.parse(readFileSync(join(dir, 'asset-manifest.json'), 'utf8'))
  } catch { /* 首次运行没有清单 */ }

  let processed = 0
  for (const name of DEMO_ASSETS) {
    const src = join(dir, name)
    if (!existsSync(src)) {
      console.warn(`   ⚠️ 缺少 ${name}，跳过`)
      continue
    }
    const buf = readFileSync(src)
    const out = fingerprinted(name, buf)
    manifest[name] = out
    processed++

    if (out !== name) {
      /*
       * ⚠️ 只写指纹副本，**不删原文件**。
       * 原文件是构建输入（sass / esbuild 的输出目标），删掉它下次构建
       * 就没有输入了 —— 之前这么干导致第二轮构建「缺少 demo.js」。
       * 目录里两者并存是可以接受的：原文件不进版本库，也不会被 HTML 引用。
       */
      copyFileSync(src, join(dir, out))
    }
  }

  /*
   * 改写 HTML 引用。
   *
   * 必须同时匹配三种写法，否则第二轮构建就无法命中：
   *   1. 原文件名          demo.js
   *   2. 带时间戳          demo.js?v=1792291995   （旧方案遗留）
   *   3. **已带指纹的文件名** demo.5292bd58.js      （上一轮替换的结果）
   *
   * 第 3 种是最容易漏的 —— 只匹配原文件名时，第一次替换成功，
   * 第二次因为 HTML 里已经是 `demo.<hash>.js` 而匹配不到，
   * 表现为「改了代码但页面还是旧的」。
   */
  for (const [plain, hashed] of Object.entries(manifest)) {
    const ext = extname(plain)
    const stem = basename(plain, ext).replace(/\./g, '\\.')
    const extRe = ext.replace('.', '\\.')
    // (?:\.[0-9a-f]{8})?  → 可选的旧指纹段
    const re = new RegExp(
      `(["'])${stem}(?:\\.[0-9a-f]{8})?${extRe}(?:\\?v=\\d+)?\\1`,
      'g',
    )
    html = html.replace(re, (_, q) => `${q}${hashed}${q}`)
  }

  writeFileSync(htmlPath, html)

  /*
   * ⚠️ 安全闸门：一个都没处理成功时绝不清理。
   * 之前这里无条件执行「删除不在 manifest 里的指纹文件」，
   * 结果 manifest 因路径错误全空 → 把所有资源删光了。
   * 清理动作必须严格依赖「本次确实成功生成了清单」这个前提。
   */
  if (processed === 0) {
    console.error('✗ 没有处理任何资源，跳过清理（防止误删）')
    process.exit(1)
  }

  // 清掉上一轮的指纹文件（名字变了会留下孤儿）
  const kept = new Set([...Object.values(manifest), ...DEMO_ASSETS])
  const all = DEMO_ASSETS.map((n) => {
    const ext = extname(n)
    const stem = basename(n, ext)
    // 匹配 stem.<8位hash>.ext
    return new RegExp(`^${stem.replace(/\./g, '\\.')}\\.[0-9a-f]{8}${ext.replace('.', '\\.')}$`)
  })
  let removed = 0
  for (const f of readdirSync(dir)) {
    if (kept.has(f)) continue
    if (all.some((re) => re.test(f))) {
      try { unlinkSync(join(dir, f)); removed++ } catch { /* 忽略 */ }
    }
  }

  writeFileSync(join(dir, 'asset-manifest.json'), JSON.stringify(manifest, null, 2))
  /*
   * 统计口径：manifest 里 k !== v 是「这个资源有指纹名」，
   * 不代表「这次改名了」。真正的改名数要和上一轮的 manifest 比。
   */
  let renamed = 0
  for (const [k, v] of Object.entries(manifest)) {
    if (prevManifest[k] !== v) renamed++
  }
  console.log(`✅ demo 指纹完成：${renamed}/${Object.keys(manifest).length} 个资源已更新，清理孤儿 ${removed} 个`)
  for (const [k, v] of Object.entries(manifest)) {
    if (prevManifest[k] !== v) console.log(`   ${k} → ${v}`)
  }
}

/* ---------------------------------------------------------------
 * lib 模式
 *
 * 产物改名 + 生成 manifest，供消费方或 CDN 做长缓存。
 * 同时保留固定名副本（模块入口），因为 package.json 的 exports
 * 指向固定名 —— 那里由 node 解析，不需要指纹。
 * ------------------------------------------------------------- */
function buildLib() {
  const dir = join(ROOT, 'dist')
  if (!existsSync(dir)) {
    console.error('❌ dist/ 不存在，先跑 npm run build')
    return
  }
  const manifest = {}

  for (const f of readdirSync(dir)) {
    if (!/\.(js|cjs|css)$/.test(f)) continue
    const buf = readFileSync(join(dir, f))
    manifest[f] = fingerprinted(f, buf)
  }

  writeFileSync(join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`✅ dist 指纹清单（${Object.keys(manifest).length} 项）`)
  for (const [k, v] of Object.entries(manifest)) {
    console.log(`   ${k} → ${v}`)
  }
  console.log('\n   提示：产物文件不重命名（package.json 的 exports 依赖固定名），')
  console.log('   manifest 供 CDN / 引用方做版本化 URL 与长缓存使用。')
}

/* ---------------------------------------------------------------
 * check 模式：CI 用
 * ------------------------------------------------------------- */
function checkDemo() {
  const html = readFileSync(join(ROOT, 'demo/index.html'), 'utf8')
  const problems = []
  for (const name of DEMO_ASSETS) {
    // 引用了不带指纹的名字 → 缓存会出问题
    const re = new RegExp(`["']${name.replace(/\./g, '\\.')}["']`)
    if (re.test(html)) problems.push(name)
  }
  if (problems.length) {
    console.error(`✗ 以下资源仍用固定名引用（会导致缓存不刷新）：\n   ${problems.join(', ')}`)
    console.error('\n修法：npm run fingerprint:demo')
    return 1
  }
  console.log('✓ demo 资源引用均已带内容指纹')
  return 0
}

/* ---------------------------------------------------------------
 * 入口
 * ------------------------------------------------------------- */
const mode = process.argv[2] || 'demo'
if (mode === 'demo') buildDemo()
else if (mode === 'lib') buildLib()
else if (mode === 'check') process.exit(checkDemo())
else {
  console.error('用法：node tools/fingerprint.mjs [demo|lib|check]')
  process.exit(1)
}
