#!/usr/bin/env node
/**
 * append-icon-style.mjs — 把图标包的 style.css 拼接进 demo.css
 *
 * ===== 为什么需要这一步 =====
 * WdIcon 的样式（.wd-icon 布局 + weight 加粗）属于 wdesign-icons 包，
 * 出处在 `wdesign-icons/src/style.css`。
 *
 * 但 demo 的构建是**手工编译 SFC + esbuild 打包**，不走 Vite，
 * 因此 `<style>` 块不会自动注入。历史上我手抄过一份到 demo.scss，
 * 结果是：
 *   · 其他项目引用图标包时拿不到这些样式（只能赌 SFC 注入生效）
 *   · demo 与真实包的样式会逐渐漂移
 *
 * 现在改为**构建期拼接同一个文件** —— 单一来源，两边永不漂移。
 *
 * ===== 为什么不用 SCSS 的 @import / @use =====
 *   · Sass 的 @use 不支持 .css 文件（报 Can't find stylesheet）
 *   · @import '*.css' 会被原样保留成 CSS @import，
 *     相对路径相对**产物目录**解析，部署后容易 404
 *
 * 用法：node tools/append-icon-style.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ICON_STYLE = join(ROOT, '../wdesign-icons/src/style.css')
const DEMO_CSS = join(ROOT, 'demo/demo.css')

if (!existsSync(ICON_STYLE)) {
  console.error(`❌ 找不到图标样式：${ICON_STYLE}`)
  process.exit(1)
}
if (!existsSync(DEMO_CSS)) {
  console.error(`❌ 找不到 demo.css，请先编译 SCSS`)
  process.exit(1)
}

const iconCss = readFileSync(ICON_STYLE, 'utf8')
let demoCss = readFileSync(DEMO_CSS, 'utf8')

/*
 * 幂等：先移除上次拼接的段落，再重新追加。
 * 用标记注释包裹，重复执行不会累积。
 */
const START = '/* ==== wdesign-icons/style.css（构建期自动拼接，勿手改）==== */'
const END = '/* ==== /wdesign-icons ==== */'
const re = new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g')
demoCss = demoCss.replace(re, '').trimEnd()

demoCss += `\n\n${START}\n${iconCss}\n${END}\n`

writeFileSync(DEMO_CSS, demoCss)
console.log(`✅ 已拼接图标样式（${iconCss.length} 字节）→ demo/demo.css`)
