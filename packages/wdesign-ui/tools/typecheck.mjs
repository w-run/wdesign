#!/usr/bin/env node
/**
 * typecheck.mjs — TypeScript 类型检查
 *
 * ===== 为什么需要 =====
 * 74 个组件全部写了 `defineProps<T>`，但此前**从未跑过类型检查** ——
 * 类型只是"文档"，写错了不会报。
 *
 * 首次运行立刻抓到两个真问题：
 *   1. overlay-stack.ts 的 onEscape 声明为 `() => void`，
 *      调用处却判断 `!== false` —— 类型与实现矛盾，
 *      而且"未处理"分支永远走不到（void !== false 恒为 true）
 *   2. optical.js 里混用 TS 语法（interface / 类型注解），
 *      文件扩展名却是 .js —— 构建时靠 esbuild 容忍，
 *      任何严格 JS 环境都会报错
 *
 * ===== 环境说明 =====
 * 本项目是纯源码包，没有 node_modules（shared 目录不适合装依赖）。
 * 类型检查依赖装在 /var/minis/workspace/tscheck，
 * 这里用软链复用；缺失时跳过而不是报错，避免阻塞日常开发。
 */
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const TSC = join(ROOT, 'node_modules/typescript/bin/tsc')

if (!existsSync(TSC)) {
  console.log('⚠️  未找到 typescript，跳过类型检查')
  console.log('   安装：cd /var/minis/workspace/tscheck && npm i typescript')
  process.exit(0)
}

const targets = [
  { name: 'wdesign', config: join(ROOT, 'tsconfig.json') },
  { name: 'wdesign-icons', config: join(ROOT, '../icons/tsconfig.json') },
]

let failed = 0

for (const t of targets) {
  if (!existsSync(t.config)) {
    console.log(`⚠️  ${t.name}：无 tsconfig，跳过`)
    continue
  }

  const r = spawnSync('node', [TSC, '--noEmit', '-p', t.config], {
    encoding: 'utf8',
    cwd: ROOT,
  })

  const out = (r.stdout || '') + (r.stderr || '')
  const errors = out.split('\n').filter((l) => /error TS/.test(l))

  /*
   * 忽略"环境级"错误：图标包无法解析 vue 与 .vue 文件，
   * 因为那需要 vue-tsc（本环境的 vue-tsc 2.x 在 Node 22 下跑不起来）。
   * 只报真正的类型错误。
   */
  const real = errors.filter(
    (l) => !/Cannot find module 'vue'|Cannot find module '\.\/WdIcon\.vue'/.test(l),
  )

  if (real.length) {
    failed += real.length
    console.log(`\n✗ ${t.name}：${real.length} 个类型错误`)
    real.slice(0, 12).forEach((l) => console.log('   ' + l.trim()))
    if (real.length > 12) console.log(`   …共 ${real.length} 个`)
  } else {
    console.log(`✓ ${t.name}：类型检查通过`)
  }
}

if (failed) {
  console.log(`\n类型检查失败：${failed} 个错误`)
  process.exit(1)
}
console.log('\n=== 类型检查全部通过 ===')
