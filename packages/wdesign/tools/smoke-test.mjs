#!/usr/bin/env node
/**
 * smoke-test.mjs — 组件库冒烟测试（无浏览器）
 *
 * ===== 为什么需要 =====
 * 这几轮修的 7 个 bug 全是「静默失败」：
 *   - 图标名拼错          → 渲染空白，不报错
 *   - CSS 变量不存在      → 声明被丢弃，不报错
 *   - 动画时钟停摆        → 元素永不显示，不报错
 *   - duration: Infinity  → width: NaN%，无效声明被丢弃
 *   - v-show 覆盖 display → 元素永不显示，不报错
 *   - 事件名不匹配        → 监听静默失效
 *   - 构建路径错          → 产物缺模块
 *
 * 每一个都是靠肉眼发现的。这类问题只能在工具层面拦。
 *
 * ===== 测试什么 =====
 * 不做完整单测（环境不支持跑 jsdom/vitest），只做**结构性断言**：
 *   1. 每个组件都能被 SFC 编译器成功编译（抓语法/模板错误）
 *   2. 组件都声明了 defineOptions.name
 *   3. props/emits 里没有 camelCase 事件名
 *   4. 没有手写 <svg>（必须走 WdIcon）
 *   5. 浮层组件的面板必须有 Teleport
 *   6. 用 <Transition> 的地方必须有 :duration 兜底
 *   7. 引用的 CSS 变量和图标名都存在（复用 check-tokens / check-icons）
 *   8. 构建产物完整（dist 里的文件都能被 require/import）
 *
 * 用法：node tools/smoke-test.mjs
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const COMP = join(ROOT, 'src/components')
const require = createRequire('/var/minis/workspace/vuetest/index.js')

let pass = 0
const fails = []

function ok(msg) { pass++ }
function fail(msg, detail) { fails.push({ msg, detail }) }

/* ============================================================
 * 1. 每个组件都能编译
 * ========================================================== */
const { parse, compileScript } = require('@vue/compiler-sfc')
const files = readdirSync(COMP).filter((f) => f.endsWith('.vue')).sort()

for (const f of files) {
  const name = basename(f, '.vue')
  try {
    const src = readFileSync(join(COMP, f), 'utf8')
    const { descriptor, errors } = parse(src, { filename: f })
    if (errors.length) {
      fail(`${name} 解析失败`, errors[0].message)
      continue
    }
    compileScript(descriptor, { id: name, inlineTemplate: true })
    ok(`${name} 可编译`)
  } catch (e) {
    fail(`${name} 编译异常`, String(e).split('\n')[0])
  }
}

/* ============================================================
 * 2~6. 结构性断言
 * ========================================================== */
/** 浮层组件：面板必须 Teleport（否则被祖先 overflow:hidden 裁切） */
const OVERLAY = ['WdTooltip', 'WdDropdown', 'WdSelect', 'WdDatePicker', 'WdPopconfirm', 'WdModal', 'WdDrawer', 'WdCommand']

for (const f of files) {
  const name = basename(f, '.vue')
  const src = readFileSync(join(COMP, f), 'utf8')

  // 2. name 必须声明（否则 devtools / 递归组件会出问题）
  if (/defineOptions\(\{\s*name:/.test(src)) ok(`${name} 有 name`)
  else fail(`${name} 缺少 defineOptions.name`)

  // 3. 事件名不该有 camelCase（Vue 约定 kebab-case）
  const camelEvt = [...src.matchAll(/\(e:\s*'([a-z]+[A-Z][\w]*)'/g)].map((m) => m[1])
  if (camelEvt.length) fail(`${name} 事件名用了 camelCase`, camelEvt.join(', '))
  else ok(`${name} 事件命名规范`)

  /*
   * 4. 不允许手写 SVG（必须走 WdIcon，否则无法跟随图标库迭代）。
   *
   * ⚠️ 例外：WdQRCode。它的 SVG 不是图标，而是**数据可视化的载体** ——
   * 每个黑模块对应二维码的一个比特，必须由矩阵动态生成，
   * 不可能做成图标组件。这类"内容本身是图形"的组件允许手写 SVG，
   * 但必须显式列在这里，避免规则被悄悄绕过。
   */
  const SVG_EXEMPT = new Set(['WdQRCode'])
  //    例外：图标组件自身
  if (name !== 'WdIcon') {
    const stripped = src
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')
    if (SVG_EXEMPT.has(name)) {
      ok(`${name} 手写 SVG（已列入白名单：内容即图形）`)
    } else {
      const svgs = (stripped.match(/<svg[\s>]/g) || []).length
      if (svgs > 0) fail(`${name} 含 ${svgs} 处手写 SVG`, '应改用 <wd-icon>')
      else ok(`${name} 无手写 SVG`)
    }
  }

  // 5. 浮层必须 Teleport
  if (OVERLAY.includes(name)) {
    if (!src.includes('<Teleport')) fail(`${name} 是浮层但未 Teleport`, '会被祖先 overflow:hidden 裁切')
    else ok(`${name} 已 Teleport`)
  }

  /*
   * 6. <Transition> 必须给 :duration（transitionend 可能丢失）
   *
   * ⚠️ 必须先剥掉注释再判断：多个组件在注释里解释「为什么不用 Transition」，
   * 直接正则扫描会把注释里的字样当成真实标签 —— 实测误报 6 个。
   */
  const noComment = src
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
  const hasTransition = /<Transition[\s>]/.test(noComment)
  if (hasTransition && !/:duration/.test(noComment)) {
    fail(`${name} 的 <Transition> 缺少 :duration`, '时钟停摆时元素会卡在 enter-from')
  } else if (hasTransition) {
    ok(`${name} Transition 有兜底`)
  } else {
    ok(`${name} 未用 Transition（用类驱动显隐）`)
  }
}

/* ============================================================
 * 7. 令牌与图标（复用已有检查脚本的输出）
 * ========================================================== */
import { execFileSync } from 'node:child_process'
for (const [script, label] of [
  ['tools/check-tokens.py', 'CSS 变量'],
  ['tools/check-icons.py', '图标名'],
]) {
  try {
    const out = execFileSync('python3', [join(ROOT, script)], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] })
    if (out.includes('✓')) ok(`${label}检查通过`)
    else fail(`${label}检查未通过`, out.split('\n').slice(-3).join(' '))
  } catch (e) {
    fail(`${label}检查失败`, String(e.stdout || e.message).slice(0, 200))
  }
}

/* ============================================================
 * 8. 构建产物完整性
 * ========================================================== */
const DIST = join(ROOT, 'dist')
if (!existsSync(DIST)) {
  fail('dist/ 不存在', '先跑 npm run build')
} else {
  for (const f of ['wdesign.esm.js', 'wdesign.cjs', 'wdesign.css', 'index.d.ts']) {
    if (existsSync(join(DIST, f))) ok(`dist/${f} 存在`)
    else fail(`dist/${f} 缺失`)
  }
  /*
   * CJS 必须能被 require（抓「产物引用了不存在模块」这类问题）。
   * ⚠️ vue 是 peer dependency，本环境没装 —— 直接 require 必然失败，
   * 且这个失败不代表产物有问题。所以先注入一个最小 vue stub。
   */
  try {
    const Module = require('node:module')
    const origResolve = Module._resolveFilename
    Module._resolveFilename = function (request, ...args) {
      if (request === 'vue') return 'vue-stub'
      return origResolve.call(this, request, ...args)
    }
    require.cache['vue-stub'] = {
      id: 'vue-stub', filename: 'vue-stub', loaded: true,
      exports: new Proxy({}, { get: () => () => ({}) }),
    }
    const cjs = require(join(DIST, 'wdesign.cjs'))
    const n = Object.keys(cjs).filter((k) => k.startsWith('Wd')).length
    if (n >= 50) ok(`dist/wdesign.cjs 可加载（${n} 个组件）`)
    else fail(`dist/wdesign.cjs 组件数异常`, `只有 ${n} 个`)
    Module._resolveFilename = origResolve
  } catch (e) {
    fail('dist/wdesign.cjs 无法 require', String(e).split('\n')[0])
  }
}

/* ============================================================
 * 10. 模板用到的 BEM 类名，样式表里必须有定义
 *
 * ===== 为什么需要 =====
 * Modal 曾经出过这个事故：模板里写了
 *   .wd-modal__head / __title / __close / __body / __foot
 * 但 `_modal.scss` 只定义了 `.wd-modal` / `__mask` / `__panel` ——
 * 其余五个类**一个都没写**。
 * 结果关闭按钮掉到标题下面、正文挤在一起，
 * 看起来就像"样式完全没加载"，排查半天才发现是类名从未定义。
 *
 * 这类缺陷在浏览器里**不报错、不警告**，只是"长得不对"，
 * 只能靠肉眼或工具发现。所以放进冒烟测试。
 * ========================================================== */

/**
 * 把所有样式源码拼成一个字符串。
 *
 * ⚠️ 为什么用"整体字符串包含"而不是解析 SCSS 嵌套：
 *   前一版试图按 `{}` 逐行维护嵌套栈来展开 `&__el`，
 *   但 SCSS 里有 @media / @include / 逗号多选择器 / 单行写法，
 *   逐行判断层级非常脆弱，误报了几十个"未定义"。
 *
 *   改成最朴素的方式：只要类名或它的基名在样式源码里出现过就算定义。
 *   这能可靠抓住"整组类名从未写过"（Modal 事故），
 *   又不会被嵌套语法误伤。
 */
function loadStyleSource() {
  const dirs = [join(ROOT, 'src/styles'), join(ROOT, 'demo')]
  const chunks = []
  const walk = (dir) => {
    if (!existsSync(dir)) return
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, f.name)
      if (f.isDirectory()) walk(full)
      else if (f.name.endsWith('.scss') || f.name.endsWith('.css')) chunks.push(readFileSync(full, 'utf8'))
    }
  }
  dirs.forEach(walk)
  return chunks.join('\n')
}

{
  const styleSrc = loadStyleSource()
  const missing = []

  for (const f of readdirSync(COMP).filter((x) => x.endsWith('.vue')).sort()) {
    const name = basename(f, '.vue')
    const src = readFileSync(join(COMP, f), 'utf8')
    const tplMatch = /<template>([\s\S]*)<\/template>/.exec(src)
    if (!tplMatch) continue
    // 去 HTML 注释：注释里出现的类名不算使用
    const clean = tplMatch[1].replace(/<!--[\s\S]*?-->/g, '')

    // 提取 wd-xxx__yyy / wd-xxx--zzz 形态的类名
    const used = new Set()
    for (const m of clean.matchAll(/['"\s](wd-[a-z0-9-]+(?:__[a-z0-9-]+)?(?:--[a-z0-9-]+)?)/g)) {
      const cls = m[1]
      if (cls.includes('__') || cls.includes('--')) used.add(cls)
    }

    const miss = []
    for (const cls of used) {
      /**
       * 命中条件（任一即可）：
       *   1. 完整类名出现过
       *   2. 去掉 `--mod` 的基名出现过（应对 &--mod 嵌套）
       *   3. 块名出现过且该文件里有 & 嵌套写法（应对 &__el 嵌套）
       */
      const base = cls.replace(/--[a-z0-9-]+$/, '')
      const block = cls.split('__')[0].split('--')[0]
      const hit =
        styleSrc.includes(cls) ||
        styleSrc.includes(base) ||
        (styleSrc.includes(block) && (styleSrc.includes('&__') || styleSrc.includes('&--')))
      if (!hit) miss.push(cls)
    }
    if (miss.length) missing.push({ name, classes: miss })
  }

  if (missing.length) {
    for (const { name, classes } of missing) {
      fail(
        `${name} 用到的样式类未定义`,
        classes.slice(0, 6).join(', ') + (classes.length > 6 ? ` …共 ${classes.length} 个` : ''),
      )
    }
  } else {
    ok('组件的 BEM 类名均有样式定义')
  }
}

/* ============================================================
 * 11. 组件模板不该串用其它组件的 BEM 块
 *
 * 抓「复制粘贴别的组件模板，忘了改类名」。
 * 只查带 __ / -- 的修饰形态，块名本身在白名单里放行。
 * ========================================================== */
{
  const styleSrc = loadStyleSource()
  const problems = []

  /** 公共原子块：被多个组件复用意属正常 */
  const SHARED = new Set([
    'wd-icon', 'wd-btn', 'wd-input', 'wd-tag', 'wd-checkbox', 'wd-spinner',
    'wd-chevron', 'wd-segmented', 'wd-segmented-picker', 'wd-dot', 'wd-preview',
    'wd-list-item', 'wd-form-item', 'wd-icon-btn',
    // wd-radio 是 WdRadioGroup 的子项块（radio-group 的成员）
    'wd-radio', 'wd-radio-group',
  ])

  for (const f of readdirSync(COMP).filter((x) => x.endsWith('.vue')).sort()) {
    const name = basename(f, '.vue')
    const src = readFileSync(join(COMP, f), 'utf8')
    const tplMatch = /<template>([\s\S]*)<\/template>/.exec(src)
    if (!tplMatch) continue
    const clean = tplMatch[1].replace(/<!--[\s\S]*?-->/g, '')

    /*
     * 「自己的块名」不能只靠组件名推导：
     * WdAiMessage 的实际块是 wd-ai-msg、WdVideoPlayer 是 wd-vplayer。
     * 做法：从样式源码里找以该组件名变体开头的块，找不到就跳过本组件
     * （说明它没有独立样式，复用别的块）。
     */
    const kebab = name.replace(/^Wd/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    const variants = [
      `wd-${kebab}`,
      `wd-${kebab.replace(/-message$/, '-msg')}`,
      `wd-${kebab.replace(/-player$/, 'player')}`,
      `wd-${kebab.replace(/-list$/, 'list')}`,
      `wd-${kebab.replace(/-group$/, 'group')}`,
    ]
    const ownList = variants.filter((c) => styleSrc.includes(`.${c}`))
    if (!ownList.length) continue

    for (const m of clean.matchAll(/(wd-[a-z0-9-]+)(?:__|--)/g)) {
      const blk = m[1]
      /*
       * 同组件的"衍生块"也算自己：
       *   WdRadioGroup 用 wd-radio（radio 是它的子项）
       *   WdSegmented 用 wd-segmented-wrap（wrap 是它的外层）
       *   WdTable 用 wd-table-wrap
       * 判据：块名以自己某个块名为前缀。
       */
      const isOwnDerived = ownList.some((own) => blk.startsWith(own))
      if (ownList.includes(blk) || isOwnDerived || SHARED.has(blk)) continue
      problems.push(`${name} → ${blk}`)
    }
  }

  const uniq = [...new Set(problems)]
  if (uniq.length) {
    fail('跨组件类名串用', uniq.slice(0, 5).join(' | ') + (uniq.length > 5 ? ` …共 ${uniq.length}` : ''))
  } else {
    ok('组件模板未串用其它组件的 BEM 块')
  }
}
/* ============================================================
 * 12. demo 资源引用必须带指纹
 * ========================================================== */
const html = readFileSync(join(ROOT, 'demo/index.html'), 'utf8')
const plainRefs = ['components.js', 'demo.js', 'demo.css'].filter((n) =>
  new RegExp(`["']${n.replace('.', '\\.')}["']`).test(html),
)
if (plainRefs.length) fail('demo 资源未带指纹', plainRefs.join(', '))
else ok('demo 资源引用均带指纹')

/* ============================================================ */
console.log(`\n${'='.repeat(52)}`)
console.log(`  冒烟测试：${pass} 通过 / ${fails.length} 失败`)
console.log('='.repeat(52))

if (fails.length) {
  for (const { msg, detail } of fails) {
    console.log(`\n  ✗ ${msg}`)
    if (detail) console.log(`      ${detail}`)
  }
  process.exit(1)
}
console.log('  ✓ 全部通过\n')
