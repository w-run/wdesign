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

  // 4. 不允许手写 SVG（必须走 WdIcon，否则无法跟随图标库迭代）
  //    例外：图标组件自身
  if (name !== 'WdIcon') {
    const stripped = src
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')
    const svgs = (stripped.match(/<svg[\s>]/g) || []).length
    if (svgs > 0) fail(`${name} 含 ${svgs} 处手写 SVG`, '应改用 <wd-icon>')
    else ok(`${name} 无手写 SVG`)
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
 * 9. demo 资源引用必须带指纹
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
