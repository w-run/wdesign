# 01 · 架构

## 仓库结构（pnpm monorepo）

```
wdesign/
├── pnpm-workspace.yaml
├── package.json             根：脚本转发 + 共享 devDeps
├── tsconfig.base.json
├── tools/publish-npm.sh     发布到公共 npm
└── packages/
    ├── wdesign-ui/          @w-run/wdesign-ui      组件库
    ├── icons/               @w-run/wdesign-icons   图标库（595 SVG）
    └── wdesign-demo/        @w-run/wdesign-demo    演示站（vite）
```

## 包职责边界

| 包 | 只放 | 不放 |
|---|---|---|
| **wdesign-ui** | 组件、样式、令牌、检查器、lib 构建 | demo 页面、demo 构建脚本 |
| **icons** | SVG 源、`WdIcon.vue`、`style.css`、`icons.json` | 组件逻辑 |
| **wdesign-demo** | 页面、壳、路由、vite 配置 | 组件源码（通过 alias 引用） |

**demo 通过 vite alias 直连 ui 源码**：

```ts
"@wdesign": "../wdesign-ui/src"
```

改组件立即生效，**不需要先 build**。这是刻意的：否则每改一个像素都要等构建。

## 构建链路

### ui 构建（`packages/wdesign-ui/tools/build-lib.mjs`）

```
src/components/*.vue  ──compileScript──▶  .lib-build/*.ts（扁平化）
src/**/*.ts           ──直接复制────────▶  .lib-build/
src/components/vendor ──递归复制────────▶  .lib-build/vendor/
                                              │
                                              ├─▶ esbuild ─▶ dist/wdesign-ui.esm.js
                                              └─▶ sass    ─▶ dist/wdesign-ui.css
                                                          └▶ dist/style/*.css（64 个）
```

### demo 构建（vite）

`vite build` 输出到 `packages/wdesign-demo/dist/`。

## 三个构建上的关键决策

### 1. 只发 ESM，不发 CJS

esbuild 的 `--format=cjs` 在处理 `export { default as X } from './X'` 这类
re-export 时会**静默丢弃导出**（ESM 正常 77 个，cjs 恒为 0）。

Node 22 与所有现代打包器都支持 ESM，只发 ESM 更干净。

### 2. 必须 `--tree-shaking=false`

库入口的职责是暴露全部 76 个组件。esbuild 默认会把入口里"看起来没人用"的
导出当死代码删除 —— 实测产出只剩 2 个函数，`require()` 拿到 0 个组件。

**tree-shaking 应该在消费侧做**，库构建阶段不该替用户决定。

### 3. `--format` 不能写在公共参数数组里

两次构建格式不同（esm / cjs）。写在 common 里会与后面的 `--format=cjs`
互相覆盖，产出 ESM 内容却存成 `.cjs`。

## 样式入口

- `src/styles/index.scss` —— 全量入口，**默认包含 `_base.scss`**
- `_base.scss` 里的 `*, *::before, *::after { box-sizing: border-box }`
  是**唯一设置点**，其它文件不许重复声明（漏伪元素会让色带、圆点尺寸出错）
