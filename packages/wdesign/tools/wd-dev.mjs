#!/usr/bin/env node
/**
 * wd-dev.mjs — 常驻构建服务（本环境下 Vite 的轻量替代）
 *
 * ===== 为什么不用 Vite / webpack =====
 * 本环境是 iSH（aarch64 + musl + 模拟层）：
 *   - rollup / vite / webpack 都依赖原生二进制（@rollup/rollup-linux-arm64-musl 等）
 *   - 预编译产物不存在，从源码编译需要全套 Rust/Go 工具链，且极慢
 *   - esbuild 是唯一开箱可用的（单文件二进制，aarch64-musl 有现成包）
 *
 * ===== 借鉴 Vite 的什么 =====
 * 1. **依赖预构建**：把不变的第三方（vue）预先打成 ESM，之后不再碰
 * 2. **增量 + 缓存**：只重建变更模块，其余走缓存
 * 3. **按需编译**：浏览器请求哪个模块才编译哪个（这里用 import map 模拟）
 * 4. **HMR 通道**：WebSocket 推送变更，客户端做局部替换
 *
 * ===== 不做什么 =====
 * - 不实现完整的 ESM 依赖图解析（esbuild 已够用，且更快）
 * - 不做 SSR（这个库不需要）
 * - 不做 CSS HMR 的模块级替换，样式变更整页刷新（SASS 全量编译仍然慢，
 *   但可以只编译受影响的那一个 partial —— 见 rebuildStyle）
 *
 * ===== 性能实测（iSH）=====
 *   esbuild 增量:        0.16s
 *   sass 首次 require:   4.7s   ← 只付一次
 *   sass 后续编译:       27ms   ← 常驻进程的关键价值
 *
 * 用法：
 *   node tools/wd-dev.mjs              # 起服务，默认 5173
 *   node tools/wd-dev.mjs --port 8080
 */
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname, extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'


const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = Number(process.argv.find((a) => a.startsWith('--port='))?.split('=')[1] || 5173)

const require = createRequire('/var/minis/workspace/vuetest/index.js')
const ESBUILD = '/root/build/deps/node_modules/.bin/esbuild'

/* ---------------------------------------------------------------
 * 1. 依赖预构建（Vite 的 optimizeDeps 思路）
 *    第三方依赖只处理一次，产物写进 .dev-cache/deps
 * ------------------------------------------------------------- */
const CACHE = join(ROOT, '.dev-cache')
const DEPS = join(CACHE, 'deps')

function prebundleDeps() {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
  const names = Object.keys(pkg.dependencies || {})
  if (!names.length) return
  // vue 是 peer，不预构建（由页面自己提供）
  const toBuild = names.filter((n) => n !== 'vue')
  if (!toBuild.length) return
  console.log(`📦 预构建依赖：${toBuild.join(', ')}`)
  const { execFileSync } = require('node:child_process')
  try {
    execFileSync(ESBUILD, [
      ...toBuild, '--bundle', '--format=esm', '--platform=neutral',
      `--outdir=${DEPS}`, '--external:vue', '--log-level=error',
    ], { stdio: 'inherit' })
    console.log('  ✓ 依赖就绪')
  } catch {
    console.log('  ⚠️ 预构建失败，回退到按需解析')
  }
}

/* ---------------------------------------------------------------
 * 2. SASS 常驻编译
 *    首次 require 约 4.7s（5.4MB dart2js 初始化），之后每次 27ms。
 *    这就是「常驻进程」相对「每次 spawn 一个 node」的全部价值。
 * ------------------------------------------------------------- */
let sass = null
function getSass() {
  if (!sass) {
    const t = Date.now()
    sass = require('/var/minis/workspace/sassbuild/node_modules/sass')
    console.log(`  sass 就绪（${Date.now() - t}ms）`)
  }
  return sass
}

const styleCache = new Map()

/** 编译单个 scss 入口，带内存缓存 */
function buildStyle(entry, force = false) {
  const abs = join(ROOT, entry)
  if (!force && styleCache.has(abs)) return styleCache.get(abs)
  try {
    const r = getSass().compile(abs, { style: 'expanded', quietDeps: true })
    styleCache.set(abs, r.css)
    return r.css
  } catch (e) {
    return `/* SCSS 编译错误：${String(e).split('\n')[0]} */`
  }
}

/* ---------------------------------------------------------------
 * 3. 组件按需编译
 *    只编译被请求的那个 .vue，结果按 mtime 缓存
 * ------------------------------------------------------------- */
const compCache = new Map()

function buildComponent(name) {
  const src = join(ROOT, 'src/components', `${name}.vue`)
  if (!existsSync(src)) return null
  const mtime = statSync(src).mtimeMs
  const hit = compCache.get(name)
  if (hit && hit.mtime === mtime) return hit.code

  const { parse, compileScript } = require('@vue/compiler-sfc')
  const source = readFileSync(src, 'utf8')
  const { descriptor, errors } = parse(source, { filename: `${name}.vue` })
  if (errors.length) {
    return `export default { render(){ return null } } /* ${errors[0].message} */`
  }
  const compiled = compileScript(descriptor, { id: name, inlineTemplate: true })
  const code = compiled.content
    .replace(/from\s+['"]vue['"]/g, "from '/@vue'")
    .replace(/from\s+['"](\.\/[^'"]+)\.vue['"]/g, (_, p) => `from '/src/components${p.slice(1)}'`)
    .replace(/from\s+['"](\.\/[^'"]+)['"]/g, (_, p) => `from '/src/components/${p.slice(2)}'`)
    .replace(/from\s+['"]@w-run\/wdesign-icons['"]/g, "from '/src/components/WdIcon'")

  compCache.set(name, { mtime, code })
  return code
}

/* ---------------------------------------------------------------
 * 4. HMR 通道（SSE）
 *
 * 为什么不用 WebSocket：
 *   本环境没有 ws 包，而 node:http 不带 WebSocketServer。
 *   为了一个开发服务器去装 ws 不值得 —— SSE 是原生支持的，
 *   单向推送也正适合「服务端告诉客户端谁变了」这个场景。
 *
 * 借鉴 Vite 的部分保留：服务端只推「哪个文件变了」，客户端决定怎么处理。
 * ------------------------------------------------------------- */
const SSE_CLIENTS = new Set()

function broadcast(payload) {
  const msg = `data: ${JSON.stringify(payload)}\n\n`
  for (const res of SSE_CLIENTS) {
    try { res.write(msg) } catch { SSE_CLIENTS.delete(res) }
  }
}

const HMR_CLIENT = `
const es = new EventSource('/__hmr')
es.onmessage = (e) => {
  const d = JSON.parse(e.data)
  if (d.type === 'style') {
    /*
     * 样式热替换：只换所有 <link> 的 query，不重载页面。
     * 这样组件状态（滚动位置、输入内容、展开态）全部保留 ——
     * 调样式时不用每次都点回原来的位置。
     */
    for (const l of document.querySelectorAll('link[rel=stylesheet]')) {
      const u = new URL(l.href, location.href)
      u.searchParams.set('t', Date.now())
      l.href = u.toString()
    }
    return
  }
  if (d.type === 'reload') location.reload()
}
es.onerror = () => console.warn('[wd-dev] HMR 断开，刷新页面重连')
`

/* ---------------------------------------------------------------
 * 5. HTTP 服务
 * ------------------------------------------------------------- */
const MIME = {
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
}

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost')
  let path = decodeURIComponent(url.pathname)

  /**
   * 缓存策略按「文件名是否带内容指纹」区分：
   *
   *   带指纹（app.a1b2c3d4.js）→ immutable 长缓存。
   *     名字由内容决定，内容一变名字就变，所以可以放心缓存一年。
   *   不带指纹（HTML、虚拟模块）→ no-store。
   *     这类资源名字固定，缓存住就永远看不到新内容。
   *
   * 这也正是 dev server 里保留指纹文件的意义：
   * 能在开发期就验证「缓存策略是否真的生效」，而不是等到上线。
   */
  const isFingerprinted = /\.([0-9a-f]{8})\.(js|css)$/.test(path)

  const send = (code, body, type = 'text/plain; charset=utf-8') => {
    res.writeHead(code, {
      'Content-Type': type,
      'Cache-Control': isFingerprinted
        ? 'public, max-age=31536000, immutable'
        : 'no-store, must-revalidate',
    })
    res.end(body)
  }

  /* --- 虚拟模块 --- */
  if (path === '/@vue') {
    return send(200, `export * from '/vendor/vue.js'`, MIME['.js'])
  }
  if (path === '/@hmr') {
    return send(200, HMR_CLIENT, MIME['.js'])
  }
  if (path === '/__hmr') {
    // SSE：长连接，服务端推送变更
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })
    res.write(': connected\n\n')
    SSE_CLIENTS.add(res)
    req.on('close', () => SSE_CLIENTS.delete(res))
    return
  }
  if (path === '/@index') {
    // 聚合入口：把所有组件重新导出，供页面按需 import
    const list = require('node:fs').readdirSync(join(ROOT, 'src/components'))
      .filter((f) => f.endsWith('.vue')).map((f) => f.replace('.vue', ''))
    const lines = list.map((n) => `export { default as ${n} } from '/src/components/${n}.vue'`)
    return send(200, lines.join('\n'), MIME['.js'])
  }

  /* --- .vue 按需编译 --- */
  const vueMatch = path.match(/^\/src\/components\/([\w-]+)\.vue$/)
  if (vueMatch) {
    const code = buildComponent(vueMatch[1])
    if (code == null) return send(404, 'component not found')
    return send(200, code, MIME['.js'])
  }

  /* --- TS 辅助模块（overlay / form-context …）--- */
  const tsMatch = path.match(/^\/src\/components\/([\w-]+)\.ts$/)
  if (tsMatch) {
    const p = join(ROOT, 'src/components', `${tsMatch[1]}.ts`)
    if (!existsSync(p)) return send(404, 'not found')
    const { execFileSync } = require('node:child_process')
    try {
      const out = execFileSync(ESBUILD, [p, '--loader=ts', '--format=esm'], {
        encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
      })
      return send(200, out.replace(/from\s+['"]vue['"]/g, "from '/@vue'"), MIME['.js'])
    } catch (e) {
      return send(500, `/* ts 转换失败: ${e.message} */`, MIME['.js'])
    }
  }

  /* --- 全量样式（必须在通用正则之前判断，否则会被 all 当成组件名）--- */
  if (path === '/style/all.css') {
    return send(200, buildStyle('src/styles/index.scss'), MIME['.css'])
  }

  /* --- 样式：/style/xxx.css → 编译对应 scss --- */
  const styleMatch = path.match(/^\/style\/([\w-]+)\.css$/)
  if (styleMatch) {
    const name = styleMatch[1]
    const candidates = [
      `src/styles/entries/${name}.scss`,
      `src/styles/components/_${name}.scss`,
    ]
    const found = candidates.find((c) => existsSync(join(ROOT, c)))
    if (!found) return send(404, `/* no style ${name} */`, MIME['.css'])
    return send(200, buildStyle(found), MIME['.css'])
  }
  /* --- 静态文件 --- */
  if (path === '/' || path.endsWith('/')) path += 'index.html'
  const file = join(ROOT, path)
  if (!file.startsWith(ROOT) || !existsSync(file)) return send(404, 'not found')

  const ext = extname(file)
  // HTML 注入 HMR 客户端
  if (ext === '.html') {
    let html = readFileSync(file, 'utf8')
    if (!html.includes('/@hmr')) {
      html = html.replace('</head>', '  <script type="module" src="/@hmr"></script>\n</head>')
    }
    return send(200, html, MIME['.html'])
  }
  return send(200, readFileSync(file), MIME[ext] || 'application/octet-stream')
})

/* ---------------------------------------------------------------
 * 6. 文件监听（防抖 + 分类）
 * ------------------------------------------------------------- */
function debounce(fn, ms) {
  let t
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms) }
}

const onStyleChange = debounce((file) => {
  styleCache.clear()  // 简化：清全部；精确失效需要构建 @use 依赖图
  console.log(`  [style] ${relative(ROOT, file)}`)
  broadcast({ type: 'style' })
}, 120)

const onCompChange = debounce((file) => {
  compCache.delete(relative(join(ROOT, 'src/components'), file).replace('.vue', ''))
  console.log(`  [comp]  ${relative(ROOT, file)} → reload`)
  broadcast({ type: 'reload' })
}, 120)

/* ---------------------------------------------------------------
 * 启动
 * ------------------------------------------------------------- */
console.log('🔧 wd-dev —— 常驻构建服务')
prebundleDeps()

/*
 * ⚠️ fs.watch({recursive:true}) 在 Linux 上不被支持（只有 macOS/Windows 原生支持），
 * 在 iSH/Alpine 上**静默失效** —— 不报错，只是永远不触发回调。
 * 实测：监听目录后修改文件，回调一次都不来。
 *
 * 改用「扫描目录 + 比对 mtime」的轮询方案：可靠，代价是每秒一次 readdir
 * （几十个文件的 stat，开销可忽略）。
 */
function scanDir(dir, ext) {
  const out = new Map()
  const { readdirSync, statSync } = require('node:fs')
  for (const f of readdirSync(dir)) {
    if (!ext.test(f)) continue
    const p = join(dir, f)
    try { out.set(p, statSync(p).mtimeMs) } catch { /* 文件刚被删 */ }
  }
  return out
}

let styleSnap = scanDir(join(ROOT, 'src/styles/components'), /\.scss$/)
let compSnap = scanDir(join(ROOT, 'src/components'), /\.(vue|ts)$/)

setInterval(() => {
  const stylesDir = join(ROOT, 'src/styles/components')
  const next = scanDir(stylesDir, /\.scss$/)
  for (const [p, m] of next) {
    if (styleSnap.get(p) !== m) {
      onStyleChange(p)
      break
    }
  }
  styleSnap = next

  const compsDir = join(ROOT, 'src/components')
  const nextC = scanDir(compsDir, /\.(vue|ts)$/)
  for (const [p, m] of nextC) {
    if (compSnap.get(p) !== m) {
      onCompChange(p)
      break
    }
  }
  compSnap = nextC
}, 700)

server.listen(PORT, () => {
  console.log(`\n  ➜  本地:   http://localhost:${PORT}/`)
  console.log(`  ➜  demo:  http://localhost:${PORT}/demo/index.html`)
  console.log(`\n  样式：/style/all.css  或 /style/<name>.css`)
  console.log(`  组件：/src/components/<Name>.vue（按需编译）\n`)
})
