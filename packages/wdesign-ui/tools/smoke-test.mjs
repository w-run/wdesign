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
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const COMP = join(ROOT, 'src/components')
const require = createRequire(fileURLToPath(import.meta.url))

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
  for (const f of ['wdesign-ui.esm.js', 'wdesign-ui.css', 'index.d.ts']) {
    if (existsSync(join(DIST, f))) ok(`dist/${f} 存在`)
    else fail(`dist/${f} 缺失`)
  }
    /*
     * ESM 产物必须能加载，且导出全部组件。
     *
     * 检查的是「导出是否齐全」，不只是「文件存在」——
     * esbuild 默认的 tree-shaking 会把入口里看起来没人用的导出全删掉，
     * 实测产出只剩 2 个函数、76 个组件全部消失。
     * 构建脚本已加 --tree-shaking=false，这条检查防止它被改回去。
     */
    try {
      const mod = await import(pathToFileURL(join(DIST, "wdesign-ui.esm.js")).href)
      const n = Object.keys(mod).filter((k) => k.startsWith("Wd")).length
      if (n >= 50) ok(`dist ESM 可加载（${n} 个组件）`)
      else fail("dist ESM 组件数异常", `只有 ${n} 个 — 检查 tree-shaking`)
    } catch (e) {
      fail("dist ESM 无法加载", String(e).split("\n")[0])
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
/*
 * 12. （已移除）demo 资源指纹检查
 *
 * demo 已拆到独立包 packages/wdesign-demo，
 * 这项检查随之一并迁移，组件库不再依赖 demo 文件。
 */

/* ============================================================
 * 13. 组合式 API 必须已 import
 *
 * ===== 为什么需要 =====
 * 写了 `onMounted(() => {...})` 但忘了从 vue import ——
 * 运行时 ReferenceError → **整个组件不渲染**。
 *
 * 这个 bug 特别难查：
 *   · 构建期不报错（onMounted 只是未定义的标识符）
 *   · 运行时不显示在控制台（Vue 会捕获 setup 里的异常）
 *   · 页面结构看起来正常，只有组件位置是空的
 *
 * 实测踩过一次：WdAudioPlayer 因此整个消失，10 个音频组件全空。
 * ========================================================== */

/** 所有需要从 vue import 的组合式 API */
const VUE_APIS = [
  'ref', 'computed', 'reactive', 'watch', 'watchEffect', 'watchPostEffect',
  'onMounted', 'onBeforeMount', 'onUnmounted', 'onBeforeUnmount',
  'onUpdated', 'onBeforeUpdate', 'onActivated', 'onDeactivated',
  'onErrorCaptured', 'nextTick', 'provide', 'inject', 'defineAsyncComponent',
  'toRef', 'toRefs', 'toRaw', 'markRaw', 'shallowRef', 'shallowReactive',
  'triggerRef', 'customRef', 'readonly', 'isRef', 'unref', 'useSlots', 'useAttrs',
]

{
  const problems = []

  for (const f of readdirSync(COMP).filter((x) => x.endsWith('.vue')).sort()) {
    const name = basename(f, '.vue')
    const src = readFileSync(join(COMP, f), 'utf8')

    // 只处理 <script setup> 块
    const m = /<script setup[^>]*>([\s\S]*?)<\/script>/.exec(src)
    if (!m) continue
    const script = m[1]

    // 去掉注释和字符串字面量，避免注释里的 API 名误报
    // 去掉注释即可（保留字符串 —— 它们不影响"是否调用了 API"的判断）
    const clean = script
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/[^\n]*/g, '')

    /*
     * 收集已 import 的名字。
     *
     * ⚠️ 必须在**原始 script** 上匹配，不能用清理后的 clean ——
     * 清理会把 `from 'vue'` 里的字符串换成 `''`，
     * 导致这条 import 根本匹配不到（误报 181 处）。
     */
    const imported = new Set()
    for (const im of script.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"]vue['"]/g)) {
      for (const part of im[1].split(',')) {
        // 处理 `ref as myRef` 形式
        const n = part.trim().split(/\s+as\s+/)[0].trim()
        if (n) imported.add(n)
      }
    }

    // 检查每个被**调用**的 API 是否已 import
    for (const api of VUE_APIS) {
      // 匹配 api( 或 api<...>(（泛型形式）
      const used = new RegExp(`(?<![.\\w])${api}(?:<[^>]*>)?\\s*\\(`).test(clean)
      if (!used) continue
      if (!imported.has(api)) {
        problems.push(`${name}: ${api}()`)
      }
    }
  }

  if (problems.length) {
    fail(
      '组合式 API 未 import（组件会整个不渲染）',
      problems.slice(0, 6).join(' | ') +
        (problems.length > 6 ? ` …共 ${problems.length} 处` : ''),
    )
  } else {
    ok('组合式 API 均已正确 import')
  }
}

/* ============================================================
 * 14. 定位元素不得用 transform: scale 做尺寸变化
 *
 * ===== 为什么需要 =====
 * `position: fixed/absolute` + `top/left` 定位的是**布局盒**，
 * 而 `transform: scale()` 是布局后的视觉变换 ——
 * 以元素中心为原点，视觉位置相对指针偏移约 scale 差值的一半。
 *
 * 表现：拖动时的克隆块 / 下拉面板"跟着手指但始终差一点"。
 * 项目里踩了三次（dropdown / 浮层 / sortable 克隆块）。
 *
 * ===== 只查真正的 JS 定位浮层 =====
 * 静态流内元素的按压反馈（如 .wd-btn:active { scale(.985) }）
 * 不涉及定位偏移，是合法的 —— 不要误报。
 * ========================================================== */
{
  const problems = []

  /*
   * 需要同时满足两个条件才算问题：
   *   1. 该规则链上有 position: fixed 或 absolute
   *   2. 该规则里有 transform: scale(...)
   * 并且**只看样式，不看注释**。
   */
  for (const f of readdirSync(join(ROOT, 'src/styles/components')).filter((x) => x.endsWith('.scss'))) {
    const src = readFileSync(join(ROOT, 'src/styles/components', f), 'utf8')
    // 去注释（含块注释与行注释）—— 注释里提到 transform: scale 不算
    const clean = src
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/[^\n]*/g, '')

    const lines = clean.split('\n')
    let selector = ''
    let depth = 0
    let hasPositioning = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // 进入新规则块（任意深度）时重置状态
      const isRuleStart = /\{$/.test(line) && !line.startsWith('@')
      if (isRuleStart) {
        // 顶层块换选择器，嵌套块继承外层选择器
        if (depth === 0) {
          selector = line.replace(/\s*\{$/, '')
          hasPositioning = false
        }
      }

      if (/position:\s*(fixed|absolute)/.test(line)) hasPositioning = true

      if (/transform:\s*scale\(/.test(line) && hasPositioning) {
        problems.push(`${f}:${i + 1} ${selector || '(嵌套规则)'}`)
      }

      depth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
      if (depth <= 0) { depth = 0; hasPositioning = false; selector = '' }
    }
  }

  const uniq = [...new Set(problems)]
  if (uniq.length) {
    fail('定位元素使用了 transform: scale（会导致偏移）', uniq.slice(0, 5).join(' | '))
  } else {
    ok('定位元素未误用 transform: scale')
  }
}


/*
 * 15. （已移除）demo 样式归属检查
 *
 * demo 拆包后由 demo 自己的检查负责。
 */

/* ============================================================
 * 16. 图标包必须有独立的样式出口
 *
 * WdIcon 的样式如果只存在于 .vue 的 <style> 块，
 * 打包器抽离 / 手工编译 / SSR 场景下会丢失。
 * 必须同时提供可显式 import 的 style.css。
 * ========================================================== */
{
  const iconStyle = join(ROOT, '../icons/src/style.css')
  const pkgPath = join(ROOT, '../icons/package.json')

  if (!existsSync(iconStyle)) {
    fail('图标包缺少独立样式出口', 'icons/src/style.css 不存在')
  } else {
    const css = readFileSync(iconStyle, 'utf8')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
    const exported = pkg.exports?.['./style.css']

    if (!exported) {
      fail('图标包 style.css 未在 package.json exports 中声明', '消费方无法 import')
    } else if (!css.includes('--wd-icon-stroke')) {
      fail('图标包 style.css 缺少 weight 加粗规则', '样式与 WdIcon.vue 不同步')
    } else {
      ok('图标包样式出口完整（style.css + exports + weight 规则）')
    }
  }
}


/* ============================================================
 * 17. box-sizing 的全局声明唯一性
 *
 * ===== 为什么需要 =====
 * `_base.scss` 里有一条 `*, *::before, *::after { box-sizing: border-box }`，
 * 这是组件的正确渲染前提（伪元素也依赖它）。
 *
 * 但 demo.scss 曾经**又写了一遍**，而且漏了 ::before / ::after ——
 * 两处定义不一致，排查盒模型问题时极易误判。
 *
 * 规则：全局 box-sizing 只能有一处声明，且必须包含伪元素。
 * ========================================================== */
{
  const files = []
  const walk = (dir) => {
    if (!existsSync(dir)) return
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, f.name)
      if (f.isDirectory()) walk(full)
      else if (f.name.endsWith('.scss')) files.push(full)
    }
  }
  walk(join(ROOT, 'src/styles'))
  // demo 已拆到独立包，不在组件库内

  const decls = []
  for (const full of files) {
    const src = readFileSync(full, 'utf8')
    // 去注释，避免注释里提到的 box-sizing 被误报
    const clean = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')
    const rel = full.replace(ROOT + '/', '')

    /*
     * 只关心「通配符选择器」上的 box-sizing 声明 ——
     * 组件内部的 `.foo { box-sizing: content-box }` 是合法且必要的。
     */
    const re = /(\*[^{}]*?)\{([^{}]*box-sizing[^{}]*)\}/g
    let m
    while ((m = re.exec(clean)) !== null) {
      const selector = m[1].trim()
      const body = m[2]
      // 必须是通配符开头（`*` 或 `*, *::before, ...`）
      if (!/^\*/.test(selector)) continue
      decls.push({ rel, selector, hasPseudo: /::before|::after/.test(selector), body })
    }
  }

  if (!decls.length) {
    fail('全局 box-sizing 未声明', '_base.scss 里应当有一条 * 规则')
  } else if (decls.length > 1) {
    fail(
      'box-sizing 被重复声明（应只有 _base.scss 一处）',
      decls.map((d) => `${d.rel}: ${d.selector}`).join(' | '),
    )
  } else if (!decls[0].hasPseudo) {
    fail(
      '全局 box-sizing 漏了伪元素',
      `${decls[0].rel} 的选择器是 "${decls[0].selector}"，应为 *, *::before, *::after`,
    )
  } else {
    ok('全局 box-sizing 声明唯一且包含伪元素')
  }
}

/* ============================================================
 * 18. 全量样式入口必须引入每一个组件原子件
 *
 * ===== 为什么需要 =====
 * `styles/index.scss` 是「全量」入口，@import 列表是手工维护的。
 * 迁移期间新写的 12 个组件原子件没被收进来 —— 组件照常渲染、
 * 控制台一片安静，只是完全没有样式。这是最难查的一类静默失效。
 *
 * 规则：
 *   · `styles/components/_x.scss` 必须出现在 `styles/index.scss` 里
 *   · 入口里 import 的原子件也必须真实存在
 *   · `@import 'dark'` 必须是最后一条（深色覆盖不能被后面的组件反超）
 * ========================================================== */
{
  const styleDir = join(ROOT, 'src/styles')
  const atomDir = join(styleDir, 'components')
  const entryPath = join(styleDir, 'index.scss')
  const raw = readFileSync(entryPath, 'utf8')
  // 去注释：注释里举例写的 @import 不该算数
  const src = raw
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')

  // 取出全部 @import，组件原子件的写成不带前缀的名字，其余保持原样
  const importList = [...src.matchAll(/@import\s+['"]([^'"]+)['"]/g)].map((m) =>
    m[1].replace(/^components\//, ''),
  )
  const imported = importList.filter((i) => !i.startsWith('_'))
  const atoms = readdirSync(atomDir)
    .filter((f) => f.endsWith('.scss'))
    .map((f) => basename(f, '.scss').replace(/^_/, ''))

  const missing = atoms.filter((a) => !importList.includes(a))
  // 顶层 partial 允许带下划线（_vars.scss → @import 'vars'）
  const hasPartial = (name) =>
    existsSync(join(styleDir, `${name}.scss`)) || existsSync(join(styleDir, `_${name}.scss`))
  const ghosts = importList.filter((i) => !atoms.includes(i) && !hasPartial(i))

  if (missing.length) {
    fail(
      '组件原子件没被 styles/index.scss 引入（该组件在演示站里完全没有样式）',
      missing.map((m) => `components/_${m}.scss`).join('、'),
    )
  } else {
    ok('全量样式入口收全了所有组件原子件')
  }

  if (ghosts.length) {
    fail('styles/index.scss import 了不存在的原子件', ghosts.join('、'))
  }

  const lastImport = importList[importList.length - 1]
  if (lastImport !== 'dark') {
    fail(
      "@import 'dark' 必须是 styles/index.scss 的最后一条",
      `当前最后一条是 ${lastImport}`,
    )
  } else {
    ok("深色覆盖 @import 'dark' 位于样式入口末尾")
  }
}

/* ============================================================
 * 19. 组件内部引用别的组件/图标，必须自己 import
 *
 * ===== 为什么需要 =====
 * 40 个组件的模板里都写着 `<wd-icon>`、WdTransfer 里写着 `<wd-input>`，
 * 但几乎没有一个 import 过 —— 它们依赖宿主全局注册才能解析。于是 README
 * 推荐的「按需引入」（`import { WdButton } from '@w-run/wdesign'`）一旦生效，
 * 组件内部的箭头、清除按钮、勾选图标全部渲染成空白，
 * 只在控制台留一句 "Failed to resolve component: wd-icon"。
 *
 * 实测：修之前全站巡检 299 条 warn，修之后只剩 4 条且指向同一处。
 *
 * 规则：模板里出现 <wd-xxx>，就必须在 script 里 import 对应的 WdXxx。
 * ========================================================== */
{
  const localNames = new Set(files.map((f) => f.replace(/\.vue$/, '')))
  const toPascal = (tag) =>
    tag
      .split('-')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join('')

  const offenders = []
  for (const f of files) {
    const src = readFileSync(join(COMP, f), 'utf8')
    const tplStart = src.indexOf('<template>')
    const tpl = tplStart >= 0 ? src.slice(tplStart) : ''
    const script = src.slice(0, tplStart)

    for (const tag of new Set([...tpl.matchAll(/<(wd-[a-z0-9-]+)/g)].map((m) => m[1]))) {
      const name = toPascal(tag)
      // WdIcon 来自 @w-run/wdesign-icons，其余必须是本仓库的组件
      if (name !== 'WdIcon' && !localNames.has(name)) {
        offenders.push(`${f}: <${tag}> 没有对应的组件`)
        continue
      }
      const imported =
        new RegExp(`import\\s*(?:type\\s*)?\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from`).test(script) ||
        new RegExp(`import\\s+${name}\\s+from`).test(script)
      if (!imported) offenders.push(`${f}: <${tag}> 没 import ${name}`)
    }
  }

  if (offenders.length) {
    fail(
      '组件模板引用了别的组件却没 import（按需引入时会静默渲染成空白）',
      offenders.join('、'),
    )
  } else {
    ok('组件内部引用的组件/图标都显式 import 了')
  }
}

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
