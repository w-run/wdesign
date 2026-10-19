#!/usr/bin/env node
/**
 * build-demo-components.mjs — 把 src/components/*.vue 编译成浏览器可直接用的
 * `demo/components.js`，让演示页跑**真实组件**而不是手抄镜像。
 *
 * 背景：demo 原先用 demo.js / demo-extra.js 里手抄的镜像组件。镜像只覆盖了
 * 部分 props（如 WdSegmented 缺 overflow / overflowMax），于是「演示页看起来
 * 组件坏了」，实际是镜像没跟上真实实现。
 *
 * 流程：@vue/compiler-sfc 逐组件编译 → 写临时目录 → esbuild 打包成 IIFE
 *       （自动处理模块级变量重名、TS 类型剥离）
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'

const require = createRequire('/var/minis/workspace/vuetest/index.js')
const { parse, compileScript } = require('@vue/compiler-sfc')

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const COMP = join(ROOT, 'src/components')
const TMP = join(ROOT, '.demo-build')
const OUT = join(ROOT, 'demo/components.js')
const ESBUILD = '/root/build/deps/node_modules/.bin/esbuild'

rmSync(TMP, { recursive: true, force: true })
mkdirSync(TMP, { recursive: true })

const files = readdirSync(COMP).filter(f => f.endsWith('.vue')).sort()
// 组件共用的辅助模块（如 form-context.ts）也要一并带上
const helpers = readdirSync(COMP).filter(f => f.endsWith('.ts'))
// 图标组件在独立包里，也要一并编译（demo 用 window.WD_ICONS 内联数据）
const ICON_SRC = join(ROOT, '../wdesign-icons/src/WdIcon.vue')
const ICON_STYLE = join(ROOT, '../wdesign-icons/src/style.css')
const ICON_OPT = join(ROOT, '../wdesign-icons/src/optical.ts')
const names = []
const entry = []

for (const f of files) {
  const name = f.replace(/\.vue$/, '')
  const source = readFileSync(join(COMP, f), 'utf8')
  const { descriptor, errors } = parse(source, { filename: f })
  if (errors.length) {
    console.error(`❌ ${f}:`, errors[0])
    process.exit(1)
  }
  const compiled = compileScript(descriptor, { id: name, inlineTemplate: true })
  // 保留 vue 的 import（含 as 别名）—— esbuild 通过 --alias:vue 指向 shim
  const code = compiled.content
    // 组件间引用 .vue → 同目录下已编译的 .ts
    .replace(/from\s+['"]\.\/(\w+)\.vue['"]/g, "from './$1'")
  writeFileSync(join(TMP, name + '.ts'), code)
  names.push(name)
  entry.push(`export { default as ${name} } from './${name}'`)
}

// 全局 Vue 适配：把 Vue 的具名导入重定向到 window.Vue
// —— 追加图标组件（@w-run/wdesign-icons）——
{
  const source = readFileSync(ICON_SRC, 'utf8')
  const { descriptor, errors } = parse(source, { filename: 'WdIcon.vue' })
  if (errors.length) { console.error('❌ WdIcon.vue:', errors[0]); process.exit(1) }
  const compiled = compileScript(descriptor, { id: 'WdIcon', inlineTemplate: true })
  // 它 import { opticalFactor } from './optical' —— 改成相对临时目录
  let code = compiled.content
    .replace(/from\s+['"]\.\/optical['"]/g, "from './optical'")
  writeFileSync(join(TMP, 'WdIcon.ts'), code)
  // optical.js 是纯 JS，转成 ts 便于 esbuild 处理
  writeFileSync(join(TMP, 'optical.ts'), readFileSync(ICON_OPT, 'utf8'))
  // 图标注册表（缓存 / 预加载）
  writeFileSync(join(TMP, 'registry.ts'), readFileSync(join(ROOT, '../wdesign-icons/src/registry.ts'), 'utf8'))
  names.push('WdIcon')
  entry.push("export { default as WdIcon } from './WdIcon'")
  // 命令式 toast：不是组件，需单独暴露
  entry.push("export { toast } from '../src/components/toast'")
  entry.push("export { preloadIcons, getIcon, getIconSync, injectIcons, registerLoaders, clearIconCache, cachedIconCount } from './registry'")
  console.log('   + WdIcon（来自 wdesign-icons）')
}

// 复制 .ts 辅助模块
for (const h of helpers) {
  writeFileSync(join(TMP, h), readFileSync(join(COMP, h), 'utf8'))
}

/*
 * 复制 vendor 子目录。
 * 组件可能依赖同目录下的第三方源码（如 qrcode-generator），
 * 这些不是 .ts 也不是 .vue，上面的循环抓不到。
 * ⚠️ 漏掉时 esbuild 报 "Could not resolve ./vendor/xxx"，但错误信息
 * 指向 .demo-build 里的临时文件，很容易误以为是路径写错了。
 */
const VENDOR = join(COMP, 'vendor')
if (existsSync(VENDOR)) {
  mkdirSync(join(TMP, 'vendor'), { recursive: true })
  for (const f of readdirSync(VENDOR)) {
    writeFileSync(join(TMP, 'vendor', f), readFileSync(join(VENDOR, f), 'utf8'))
  }
  console.log(`   + vendor/（${readdirSync(VENDOR).length} 个文件）`)
}

writeFileSync(join(TMP, 'entry.ts'), entry.join('\n') + '\n')

// 收集所有组件实际从 vue 导入的具名符号（含 as 别名前的原名）
const vueImports = new Set()
for (const tf of readdirSync(TMP).filter(x => x.endsWith('.ts'))) {
  const src = readFileSync(join(TMP, tf), 'utf8')
  // import 可能跨多行：匹配 import { ... } from 'vue' 的完整块
  const re = /import\s*\{([\s\S]*?)\}\s*from\s*['"]vue['"]/g
  let m
  while ((m = re.exec(src))) {
    for (const seg of m[1].split(',')) {
      const name = seg.trim().split(/\s+as\s+/)[0].trim()
      if (name) vueImports.add(name)
    }
  }
}

// shim：用 Proxy 兜底 + 显式声明实际用到的名字（esbuild 需要确定导出存在）
writeFileSync(join(TMP, 'shim.ts'),
  `const G: any = (globalThis as any).Vue\n` +
  `const named: any = new Proxy({}, { get: (_t, k) => (G as any)[String(k)] })\n` +
  `export default named\n` +
  [...vueImports].map(n => `export const ${n}: any = (G as any).${n}`).join('\n') + '\n')

execFileSync(ESBUILD, [
  join(TMP, 'entry.ts'), '--bundle', '--format=iife', '--target=es2020',
  '--global-name=WD_REAL_MODULE', '--outfile=' + join(TMP, 'bundle.js'),
  '--alias:vue=' + join(TMP, 'shim.ts'),
  '--external:none',
], { stdio: 'inherit' })

// 包一层：暴露 ALL 与各组件名
const bundle = readFileSync(join(TMP, 'bundle.js'), 'utf8')
writeFileSync(OUT,
`/* 由 tools/build-demo-components.mjs 生成，请勿手工编辑。
 * 源：src/components/*.vue（${files.length} 个）· 依赖全局 Vue
 */
${bundle}
;(function(){
  var M = (typeof WD_REAL_MODULE !== 'undefined' ? WD_REAL_MODULE : window.WD_REAL_MODULE) || {};
  window.WD_REAL = { ALL: [] };
  ${JSON.stringify(names)}.forEach(function(n){
    if (M[n]) { window.WD_REAL[n] = M[n]; window.WD_REAL.ALL.push(M[n]); }
  });
  // 命令式 toast
  window.WDtoast = M.toast;
  // 暴露图标注册表 API（预加载 / 缓存），供页面在 mount 前预热
  window.WdIcons = {
    preloadIcons: M.preloadIcons,
    getIcon: M.getIcon,
    getIconSync: M.getIconSync,
    injectIcons: M.injectIcons,
    registerLoaders: M.registerLoaders,
    cachedIconCount: M.cachedIconCount,
    clearIconCache: M.clearIconCache,
  };
})();
`)
console.log(`✅ 生成 demo/components.js —— ${files.length} 个真实组件`)
