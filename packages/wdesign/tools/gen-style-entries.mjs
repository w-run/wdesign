#!/usr/bin/env node
/**
 * gen-style-entries.mjs — 生成按需样式入口
 *
 * ## 背景：为什么不能直接把原子件暴露出去
 * 原子件（`styles/components/_button.scss`）的颜色/尺寸全部是 `var(--wd-*)`，
 * 但原子件自己**不定义**这些变量 —— 变量只有 `_vars.scss` 发射。
 * 直接引原子件会得到一份颜色全部失效的样式：CSS 变量未定义时整条声明被丢弃，
 * 不报错、不告警，是最难查的一类问题。
 *
 * ## 分层
 *   styles/index.tokens.scss   `:root { --wd-* }`（唯一发射点，全站一次）
 *   styles/index.fonts.scss    字体 @font-face
 *   styles/index.base.scss     reset + 滚动条 + reduced-motion
 *   styles/index.scss          全量（tokens + fonts + base + 全部组件）
 *   styles/entries/<name>.scss 单个组件（只转发原子件）
 *
 * ## 用法
 *   // 只要组件，字体用系统自带的
 *   @use 'wdesign/styles/index.tokens' as wd;
 *   @use 'wdesign/styles/entries/button';
 *
 *   // 需要自带字体 + reset
 *   @use 'wdesign/styles/index.tokens' as wd;
 *   @use 'wdesign/styles/index.fonts' as wdfont;
 *   @use 'wdesign/styles/index.base' as wdbase;
 *
 * 运行：node tools/gen-style-entries.mjs
 */
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const styles = join(root, 'src/styles')
const atomDir = join(styles, 'components')
const outDir = join(styles, 'entries')

const atoms = readdirSync(atomDir)
  .filter((f) => f.endsWith('.scss'))
  .map((f) => f.replace(/^_/, '').replace(/\.scss$/, ''))
  .sort()

mkdirSync(outDir, { recursive: true })

const banner = (title, extra = '') => `// =============================================================
//  WDesign — ${title}
//${extra ? '//\n' + extra : ''}
//  ⚠️ 由 tools/gen-style-entries.mjs 生成，请勿手工编辑
// =============================================================
`

// ---- 令牌：唯一的 :root 发射点 ----
writeFileSync(
  join(styles, 'index.tokens.scss'),
  banner(
    '样式令牌（按需引入时必引，且全站只引一次）',
    `//    @use 'wdesign/styles/index.tokens' as wd;
//  ⚠️ 重复引入会发射多份 :root，后出现的会覆盖深色层。`
  ) + `@use './vars' as *;\n`
)

// ---- 字体（可选）----
writeFileSync(
  join(styles, 'index.fonts.scss'),
  banner('字体 @font-face（可选）', `//    @use 'wdesign/styles/index.fonts' as wdfont;`) +
    `@use './fonts' as *;\n`
)

// ---- base（可选）----
writeFileSync(
  join(styles, 'index.base.scss'),
  banner('最小重置（可选）', `//    @use 'wdesign/styles/index.base' as wdbase;`) +
    `@use './base' as *;\n`
)

// ---- 每个原子件一个入口 ----
let n = 0
for (const a of atoms) {
  writeFileSync(
    join(outDir, `${a}.scss`),
    `// WDesign — ${a} 样式（按需引入）
//
//   @use 'wdesign/styles/index.tokens' as wd;     // 必须先引（全站一次）
//   @use 'wdesign/styles/entries/${a}';     // 再引本组件
//
// 本文件只转发原子件，不重复发射令牌。
@use '../components/${a}';
`
  )
  n++
}

console.log(`✅ 生成 3 个分层入口 + ${n} 个组件入口`)
console.log('   styles/index.tokens.scss / index.fonts.scss / index.base.scss')
console.log('   styles/entries/<name>.scss')
