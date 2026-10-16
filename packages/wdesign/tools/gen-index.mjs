#!/usr/bin/env node
/**
 * gen-index.mjs — 由 src/components/*.vue 重新生成 src/index.ts
 *
 * 为什么需要它：组件是手工新增的，但 index.ts 的 import / export / 插件注册
 * 三张清单容易漏（历史上就漏过 WdContainer / WdGrid / WdSpace 三个导出，
 * 以及 15 个组件没进 app.use(WdUI) 的全局注册）。
 *
 * 用法：node tools/gen-index.mjs
 */
import { readdirSync, writeFileSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const compDir = join(root, 'src/components')
const outFile = join(root, 'src/index.ts')

const files = readdirSync(compDir).filter((f) => f.endsWith('.vue'))
const comps = files.map((f) => f.replace(/\.vue$/, '')).sort()

// 校验：每个 SFC 必须自带 defineOptions({ name: 'WdXxx' })，否则全局注册拿不到名字
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

// 保留既有顺序（减少 diff），新组件追加在末尾
let order = comps
try {
  const old = readFileSync(outFile, 'utf8')
  const prev = [...old.matchAll(/^import (Wd\w+) from '\.\/components\/\w+\.vue'/gm)].map((m) => m[1])
  const keep = prev.filter((n) => comps.includes(n))
  const added = comps.filter((n) => !keep.includes(n))
  order = [...keep, ...added]
} catch { /* 首次生成 */ }

const L = []
L.push('// =============================================================')
L.push('//  wdesign · Soft Bento · Red')
L.push('//  入口：导出全部组件 + 全量注册插件')
L.push('//')
L.push('//  全量注册：')
L.push('//    import WdUI from \'./wdesign/src\'')
L.push('//    app.use(WdUI)')
L.push('//')
L.push('//  按需引入：')
L.push('//    import { WdButton, WdCard } from \'./wdesign/src\'')
L.push('//')
L.push('//  ⚠️ 本文件由 tools/gen-index.mjs 生成，请勿手工编辑；')
L.push('//     新增组件后运行 `node tools/gen-index.mjs` 重建。')
L.push('// =============================================================')
L.push("import type { App, Plugin } from 'vue'")
L.push('')
for (const c of order) L.push(`import ${c} from './components/${c}.vue'`)
L.push("import { toast } from './components/toast'")
L.push('')
L.push('export {')
L.push('  toast,')
for (const c of order) L.push(`  ${c},`)
L.push('}')
L.push('')
L.push('// 全量注册（app.use(WdUI)）：与 export 列表严格一致，避免半注册状态')
L.push('const components = [')
for (const c of order) L.push(`  ${c},`)
L.push(']')
L.push('')
L.push('const WdUI: Plugin = {')
L.push('  install(app: App) {')
L.push('    for (const component of components) {')
L.push('      const name = (component as { name?: string }).name')
L.push('      if (name) app.component(name, component)')
L.push('    }')
L.push('  },')
L.push('}')
L.push('')
L.push('export default WdUI')
L.push('')
L.push('// —— 图标库（独立包 @w-run/wdesign-icons）——')
L.push("export { WdIcon } from '@w-run/wdesign-icons'")
L.push('')

writeFileSync(outFile, L.join('\n'))
console.log(`✅ 已生成 src/index.ts —— ${order.length} 个组件全部 import / export / 注册`)
