#!/usr/bin/env node
/**
 * build-demo.mjs — demo 的**唯一**构建入口
 *
 * ===== 为什么要统一入口 =====
 * 之前 build:demo 只有两步（打组件 + 指纹），
 * 但 demo 的产物实际依赖四件事，顺序还不能乱：
 *
 *   1. 编译 SCSS      → demo.css（覆盖旧文件）
 *   2. 拼接图标样式   → 往 demo.css 追加 .wd-icon 规则
 *   3. 打包组件       → components.js
 *   4. 生成指纹       → 把 demo.css 复制成 demo.<hash>.css 并改写引用
 *
 * ⚠️ 顺序错一次就出事，而且症状极其诡异：
 *    · 跳过第 2 步 → `.wd-icon` 没有尺寸约束，
 *      SVG 按固有 256×256 渲染，整页图标炸成巨图
 *    · 第 4 步在 2 之前 → 指纹文件不含图标样式，同样炸
 *    · 忘了第 1 步 → 改了 SCSS 但页面不变（看着像缓存问题）
 *
 * 这四个步骤被手工执行过十几次，每次都靠记忆 —— 迟早出错（已经错了两回）。
 * 收拢成一个脚本，顺序写死在代码里，不再依赖人的记忆。
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/** 找 dart-sass（项目内没有 node_modules，用 workspace 里的那份） */
const SASS_CANDIDATES = [
  join(ROOT, 'node_modules/sass/sass.js'),
  '/var/minis/workspace/sassbuild/node_modules/sass/sass.js',
]

function run(label, cmd, args, opts = {}) {
  process.stdout.write(`\n▸ ${label}\n`)
  const r = spawnSync(cmd, args, { cwd: ROOT, encoding: 'utf8', ...opts })
  const out = ((r.stdout || '') + (r.stderr || ''))
    .split('\n')
    .filter((l) => l.trim() && !/DEPRECATION|More info|sass-lang\.com|^\s*$/.test(l))
    .join('\n')
  if (out) console.log(out.split('\n').map((l) => '  ' + l).join('\n'))
  if (r.status !== 0) {
    console.error(`\n✗ ${label} 失败（exit ${r.status}）`)
    process.exit(1)
  }
}

/* ---- 1. 编译 SCSS ---- */
const sass = SASS_CANDIDATES.find((p) => existsSync(p))
if (!sass) {
  console.error('✗ 找不到 dart-sass')
  console.error('  预期位置：' + SASS_CANDIDATES.join(' 或 '))
  process.exit(1)
}
run('编译 SCSS → demo/demo.css', 'node', [sass, 'demo/demo.scss', 'demo/demo.css', '--no-source-map', '--quiet'])

/* ---- 2. 拼接图标样式（必须在 SCSS 编译之后、指纹之前） ---- */
run('拼接图标样式', 'node', ['tools/append-icon-style.mjs'])

/* ---- 3. 打包组件 ---- */
run('打包组件 → components.js', 'node', ['tools/build-demo-components.mjs'])

/* ---- 4. 生成指纹（必须是最后一步） ---- */
run('生成指纹', 'node', ['tools/fingerprint.mjs', 'demo'])

console.log('\n✅ demo 构建完成')
