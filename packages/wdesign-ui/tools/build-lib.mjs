#!/usr/bin/env node
/**
 * build-lib.mjs — 把 src/ 编译成可分发的库产物。
 *
 * 之前的问题：package.json 的 main/module/types 全部指向 `./src/index.ts`，
 * 等于「要求使用者自己配 Vue SFC 编译 + SCSS 编译 + TS 处理」。
 * npm install 之后根本跑不起来 —— 这不是组件库，是源码副本。
 *
 * 产物（dist/）：
 *   wdesign-ui.esm.js     ESM，Vue 为外部依赖（peer）
 *   wdesign-ui.cjs        CommonJS
 *   wdesign.css        所有组件样式（已编译 SCSS）
 *   index.d.ts         类型声明（由 tsc 生成，若可用）
 *   style/<name>.css   单组件样式，支持按需引入
 *
 * 刻意不做的事：
 *   - 不打包 Vue（peer dependency 的正确做法）
 *   - 不做 UMD（2026 年了，CDN 场景交给 demo 那边）
 *   - 不压缩（压缩交给使用方的打包器，避免 sourcemap 变复杂）
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const COMP = join(SRC, 'components')
const OUT = join(ROOT, 'dist')
const TMP = join(ROOT, '.lib-build')

/*
 * 模块解析基准。
 *
 * ⚠️ 旧版写死 /var/minis/workspace/vuetest/index.js（iSH 上的临时目录），
 *    迁到 w-box 后该路径不存在，createRequire 找不到任何依赖 ——
 *    报「缺少 @vue/compiler-sfc」，但包其实装在 node_modules 里。
 *
 *    改为用本文件位置作基准，Node 会沿目录向上查找 node_modules。
 */
const require = createRequire(fileURLToPath(import.meta.url))
let parse, compileScript
try {
  ;({ parse, compileScript } = require('@vue/compiler-sfc'))
} catch {
  console.error('❌ 缺少 @vue/compiler-sfc，无法编译单文件组件')
  process.exit(1)
}

/*
 * 依赖探测：不写死路径。
 * 旧版硬编码 iSH 的 /root/build/deps 与 /var/minis/workspace/sassbuild，
 * 迁到 w-box 后全部失效。改为依次探测：
 *   1. 环境变量覆盖  2. 仓库 node_modules  3. 旧 iSH 路径（保底）
 */
function findDep(...cands) {
  for (const c of cands) if (c && existsSync(c)) return c
  return null
}
const ROOT_NM = join(ROOT, '../../node_modules')
const LOCAL_NM = join(ROOT, 'node_modules')
const ESBUILD = findDep(
  process.env.ESBUILD_BIN,
  join(ROOT_NM, '.bin/esbuild'),
  join(LOCAL_NM, '.bin/esbuild'),
  '/root/build/deps/node_modules/.bin/esbuild',
)
if (!existsSync(ESBUILD)) {
  console.error(`❌ 找不到 esbuild：${ESBUILD}`)
  process.exit(1)
}

// rmSync(TMP, { recursive: true, force: true })
rmSync(OUT, { recursive: true, force: true })
mkdirSync(TMP, { recursive: true })
mkdirSync(join(OUT, 'style'), { recursive: true })

/* ---------------- 1. 编译 SFC ---------------- */
const signals = readdirSync(COMP).filter((f) => f.endsWith('.vue')).sort()
const helpers = readdirSync(COMP).filter((f) => f.endsWith('.ts'))
const entry = []

for (const f of signals) {
  const name = basename(f, '.vue')
  const source = readFileSync(join(COMP, f), 'utf8')
  const { descriptor, errors } = parse(source, { filename: f })
  if (errors.length) {
    console.error(`❌ ${f}:`, errors[0].message)
    process.exit(1)
  }
  // inlineTemplate: 模板编译进 setup，产物更快、少一次运行期编译
  const compiled = compileScript(descriptor, { id: name, inlineTemplate: true })
  // 编译后是 .ts 文件，把组件间的 .vue 引用改成无后缀（esbuild 会解析 .ts）
  const code = compiled.content
    .replace(
      /from\s+(['"])(\.\/[^'"]+)\.vue\1/g,
      (_, q, p) => `from ${q}${p}${q}`,
    )
    /*
     * 组件内部的 WdIcon 来自独立包（图标包源码里是 .vue，esbuild 没有 loader）。
     * 打包前 WdIcon.vue 已经被编译成同目录的 WdIcon.ts（只有 default 导出），
     * 所以这里把 `import { WdIcon } from 包名` 改写成默认导入 —— 否则会出现
     *   No loader is configured for ".vue" files: ../icons/src/WdIcon.vue
     */
    .replace(
      /import\s*\{\s*WdIcon\s*\}\s*from\s*(['"])@w-run\/wdesign-icons\1/g,
      "import WdIcon from './WdIcon'",
    )
  writeFileSync(join(TMP, `${name}.ts`), code)
  entry.push(`export { default as ${name} } from './${name}'`)
}

for (const h of helpers) {
  writeFileSync(join(TMP, h), readFileSync(join(COMP, h), 'utf8'))
}

/*
 * 复制组件目录下的子目录（如 vendor/）。
 *
 * ⚠️ 上面的 helpers 只抓 .ts 文件，漏掉子目录。
 *    qrcode.ts 依赖 ./vendor/qrcode-generator.js，
 *    不复制就报 Could not resolve。
 */
for (const d of readdirSync(COMP, { withFileTypes: true }).filter((e) => e.isDirectory())) {
  const srcDir = join(COMP, d.name)
  const dstDir = join(TMP, d.name)
  mkdirSync(dstDir, { recursive: true })
  for (const f of readdirSync(srcDir)) {
    if (/\.(js|ts|json)$/.test(f)) {
      writeFileSync(join(dstDir, f), readFileSync(join(srcDir, f), 'utf8'))
    }
  }
}

// src/ 根目录的辅助模块（hover.ts 等）
for (const f of readdirSync(SRC).filter((x) => x.endsWith('.ts') && x !== 'index.ts')) {
  writeFileSync(join(TMP, f), readFileSync(join(SRC, f), 'utf8'))
}

// 图标组件（独立包，但组件库要用）
const ICON_SRC = join(ROOT, '../icons/src/WdIcon.vue')
const ICON_DIR = join(ROOT, '../icons/src')
if (existsSync(ICON_SRC)) {
  const source = readFileSync(ICON_SRC, 'utf8')
  const { descriptor } = parse(source, { filename: 'WdIcon.vue' })
  const compiled = compileScript(descriptor, { id: 'WdIcon', inlineTemplate: true })
  writeFileSync(join(TMP, 'WdIcon.ts'), compiled.content)
  /*
   * 图标包的辅助模块。
   * ⚠️ optical 已从 .js 改名为 .ts（类型语法之前写在 .js 里是错的），
   *    这里两个都按 .ts 找。
   */
  for (const aux of ['optical', 'registry']) {
    const p = join(ICON_DIR, `${aux}.ts`)
    if (existsSync(p)) writeFileSync(join(TMP, `${aux}.ts`), readFileSync(p, 'utf8'))
  }
  entry.unshift(`export { default as WdIcon } from './WdIcon'`)
  entry.push(`export { preloadIcons, getIcon, getIconSync, injectIcons } from './registry'`)
}

// 主入口：复用 src/index.ts 的导出（去掉它自己的 WdIcon 重复导出）
const indexSrc = readFileSync(join(SRC, 'index.ts'), 'utf8')
  // 组件导出改用我们生成的 entry（路径已扁平化）
  .replace(/export\s*\{[^}]*\}\s*from\s*'\.\/components\/[^']*'/g, '')
  .replace(/export\s*\{[^}]*\}\s*from\s*'@w-run\/wdesign-icons'/g, '')
writeFileSync(join(TMP, '_index.ts'), `${entry.join('\n')}\n${indexSrc}`)

console.log(`📦 编译 ${signals.length} 个组件`)

/* ---------------- 2. 打包 ---------------- */
function run(cmd, args) {
  const { execFileSync } = require('node:child_process')
  execFileSync(cmd, args, { stdio: 'inherit' })
}

const common = [
  join(TMP, '_index.ts'),
  '--bundle',
  '--external:vue',
  '--platform=neutral',
  '--target=es2020',
  // Vue 是 peer：既不完全内联，也不要它生成的 runtime 依赖
  '--define:process.env.NODE_ENV="production"',
]

run(ESBUILD, [...common, `--outfile=${join(OUT, 'wdesign-ui.esm.js')}`])
console.log('  ✓ wdesign-ui.esm.js / wdesign-ui.cjs')

/* ---------------- 3. 编译 SCSS ---------------- */
const SASS = findDep(
  process.env.SASS_BIN,
  join(ROOT_NM, 'sass/sass.js'),
  join(LOCAL_NM, 'sass/sass.js'),
  '/var/minis/workspace/sassbuild/node_modules/sass/sass.js',
)
if (existsSync(SASS)) {
  const { execFileSync } = require('node:child_process')
  // 全量样式
  try {
    execFileSync(process.execPath, [SASS, join(SRC, 'styles/index.scss'),
      join(OUT, 'wdesign-ui.css'), '--no-source-map', '--quiet'], { stdio: 'pipe' })
    console.log('  ✓ wdesign.css')
  } catch (e) {
    console.error('  ⚠️ 全量样式编译失败：', e.stderr?.toString().slice(0, 200))
  }
  /*
   * 单组件样式（按需引入）。
   * ⚠️ 不能「每个文件起一个 sass 进程」—— 单次启动约 6s（iSH 上更慢），
   * 62 个就是 6 分钟。改成生成一个批量入口：一次编译、一次写出，
   * 用 @use 逐个产出，再按 section 拆分不可行，所以退一步：
   * 每个文件单独编译但复用同一个 sass 进程（通过 sass 的 JS API）。
   */
  const entries = join(SRC, 'styles/entries')
  if (existsSync(entries)) {
    let n = 0
    try {
      const sassMod = require(dirname(SASS))
      for (const f of readdirSync(entries).filter((x) => x.endsWith('.scss'))) {
        const outFile = join(OUT, 'style', f.replace('.scss', '.css'))
        const r = sassMod.compile(join(entries, f), { style: 'expanded', quietDeps: true })
        writeFileSync(outFile, r.css)
        n++
      }
      console.log(`  ✓ style/*.css（${n} 个）`)
    } catch (e) {
      console.log(`  ⚠️ 单组件样式跳过：${String(e).slice(0, 80)}`)
    }
  }
} else {
  console.log('  ⚠️ 未找到 dart-sass，跳过样式编译')
}

/* ---------------- 4. 类型声明 ---------------- */
/* ---------------- 4. 类型声明 ---------------- */
/*
 * 不走 tsc：在 iSH 上会卡很久，且拿不到 .vue 的 props 类型。
 * 改为从产物导出清单生成 —— 覆盖「能 import 什么」这个主要诉求；
 * 组件 props 的类型由使用者 IDE 的 SFC 语言服务读取 src/ 得到。
 */
{
  const esm = readFileSync(join(OUT, "wdesign-ui.esm.js"), "utf8")
  const tail = esm.slice(-5000)
  const exported = [...new Set(
    [...tail.matchAll(/\bas\s+([A-Za-z_$][\w$]*)/g)].map((m) => m[1]),
  )].sort()
  const decl = [
    "// 由 tools/build-lib.mjs 生成，请勿手工编辑",
    "import type { Plugin } from 'vue'",
    "",
    ...exported.map((n) => `export declare const ${n}: any`),
    "",
    "declare const WdUI: Plugin",
    "export default WdUI",
    "",
  ]
  writeFileSync(join(OUT, "index.d.ts"), decl.join("\n"))
  console.log(`  ✓ index.d.ts（${exported.length} 个导出）`)
}



// rmSync(TMP, { recursive: true, force: true })

/* ---------------- 5. 报告 ---------------- */
const files = readdirSync(OUT).filter((f) => f.endsWith('.js') || f.endsWith('.css'))
let total = 0
for (const f of files) {
  const size = readFileSync(join(OUT, f)).length
  total += size
  console.log(`  ${(size / 1024).toFixed(1).padStart(7)} KB  ${f}`)
}
console.log(`\n✅ 产物在 dist/（${(total / 1024).toFixed(0)} KB，不含 style/）`)
