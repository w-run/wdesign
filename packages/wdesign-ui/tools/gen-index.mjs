#!/usr/bin/env node
/**
 * gen-index.mjs — 生成三个入口文件
 *
 * 为什么拆成三个：
 *
 *   index.ts        只做**具名导出**，不含默认导出。
 *                   没有 `export default` 指向组件数组，打包器才能按引用裁剪；
 *                   只要引用到 `WdButton`，其余 45 个组件不进包。
 *
 *   full.ts         默认导出全量注册插件（app.use(WdUI)）。
 *                   被单独一个路径引用 —— 想要「一次全注册」的人明确地
 *                   选择承担全部体积，而不是被默认入口强加。
 *
 *   components/*    已可被直接引用（`@w-run/wdesign/components/WdButton.vue`），
 *                   配合包 `exports` 的 `./components/*` 通配。
 *
 * 样式按需见 styles/components/*.scss 与 styles/index.scss（全量）。
 *
 * 用法：node tools/gen-index.mjs
 */
import { readdirSync, writeFileSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const compDir = join(root, 'src/components')
const outIndex = join(root, 'src/index.ts')
const outFull = join(root, 'src/full.ts')

const files = readdirSync(compDir).filter((f) => f.endsWith('.vue'))
const comps = files.map((f) => f.replace(/\.vue$/, '')).sort()

// 规范检查：每个 SFC 必须自带 defineOptions({ name })
const problems = []
for (const name of comps) {
  const src = readFileSync(join(compDir, `${name}.vue`), 'utf8')
  const m = src.match(/defineOptions\(\{\s*name:\s*'([^']+)'/)
  if (!m) problems.push(`${name}.vue 缺少 defineOptions({ name })`)
  else if (m[1] !== name) problems.push(`${name}.vue 的 name 是 ${m[1]}，与文件名不一致`)
}
if (problems.length) {
  console.error('❌ 组件规范检查失败：')
  for (const p of problems) console.error('   · ' + p)
  process.exit(1)
}

// 保留既有顺序（减少 diff），新组件追加
let order = comps
try {
  const old = readFileSync(outIndex, 'utf8')
  const prev = [...old.matchAll(/^import (Wd\w+) from '\.\/components\/\w+\.vue'/gm)].map((m) => m[1])
  const keep = prev.filter((n) => comps.includes(n))
  order = [...keep, ...comps.filter((n) => !keep.includes(n))]
} catch { /* 首次生成 */ }

// ---------------- index.ts：纯具名导出，无默认导出 ----------------
const L = []
L.push('// =============================================================')
L.push('//  wdesign · Soft Bento · Red — 具名导出入口')
L.push('//')
L.push('//  按需引入（推荐，可 tree-shake）：')
L.push("//    import { WdButton, WdCard } from '@w-run/wdesign'")
L.push('//')
L.push('//  全量注册（会引入全部组件，慎用）：')
L.push("//    import WdUI from '@w-run/wdesign/full'")
L.push('//    app.use(WdUI)')
L.push('//')
L.push('//  ⚠️ 本文件由 tools/gen-index.mjs 生成，请勿手工编辑。')
L.push('//     这里**故意没有 export default** —— 有默认导出就必须把 46 个组件')
L.push('//     全部列入数组，打包器的 tree-shaking 会因此失效。')
L.push('// =============================================================')
for (const c of order) L.push(`export { default as ${c} } from './components/${c}.vue'`)
L.push("export { toast } from './components/toast'")
L.push("export type { WdToastOptions } from './components/toast'")
L.push("export { addHover } from './hover'")
L.push("export type { AddHoverOptions } from './hover'")
L.push("export { WdIcon } from '@w-run/wdesign-icons'")
L.push("export { opticalFactor, DEFAULT_OPTICAL } from '@w-run/wdesign-icons'")
L.push('')
writeFileSync(outIndex, L.join('\n'))

// ---------------- full.ts：全量注册插件 ----------------
const F = []
F.push('// =============================================================')
F.push('//  wdesign — 全量注册插件')
F.push('//')
F.push("//    import WdUI from '@w-run/wdesign/full'")
F.push('//    app.use(WdUI)')
F.push('//')
F.push('//  ⚠️ 这个入口会引入全部组件（体积最大），只在确实用到大部分组件时选择。')
F.push('//     按需引入请用：import { WdButton } from "@w-run/wdesign"')
F.push('// =============================================================')
F.push("import type { App, Plugin } from 'vue'")
for (const c of order) F.push(`import ${c} from './components/${c}.vue'`)
F.push('')
F.push('const components = [')
for (const c of order) F.push(`  ${c},`)
F.push(']')
F.push('')
F.push('export const WdUI: Plugin = {')
F.push('  install(app: App) {')
F.push('    for (const component of components) {')
F.push('      const name = (component as { name?: string }).name')
F.push('      if (name) app.component(name, component)')
F.push('    }')
F.push('  },')
F.push('}')
F.push('')
F.push('export default WdUI')
F.push('')
F.push('// 同时透出具名导出，方便 `import WdUI, { WdButton } from "@w-run/wdesign/full"`')
F.push("export * from './index'")
F.push('')
writeFileSync(outFull, F.join('\n'))

console.log(`✅ 生成入口：index.ts（${order.length} 个具名导出，无默认导出）`)
console.log(`            full.ts（全量注册插件）`)
