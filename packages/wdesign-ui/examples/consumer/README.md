# WDesign 消费端示例

演示怎么**从 npm 装包**用组件库 —— 和 `packages/wdesign-demo`（直连源码）不同，
这里走的是发布后的真实产物：`dist/` 的 ESM + `style/*.css`。

它的作用是当「包装错了」的报警器：样式入口改名、导出丢了、按钮里的图标不显示，
在这里一跑就能看出来。

## 快速开始

```sh
npm install
npm run dev        # → http://localhost:5180
```

依赖的是已发布的 `@w-run/wdesign-ui` / `@w-run/wdesign-icons`，
所以要验证**未发布**的改动，先在仓库根跑 `pnpm build:ui` 再 `npm link`。

## 用法要点

### 1. 具名引入组件（可 tree-shake）

```js
import { WdButton, WdInput, toast } from '@w-run/wdesign-ui'
```

### 2. 样式分成两个入口

```js
import '@w-run/wdesign-ui/style'          // 全量：令牌 + 字体 + base + 全部组件 + 深色
import '@w-run/wdesign-icons/style.css'   // 图标所需的基础样式
```

只想引单个组件的样式时（记得先引令牌，否则颜色全丢）：

```js
import '@w-run/wdesign-ui/style/tokens'
import '@w-run/wdesign-ui/style/button'
```

### 3. 字体不用自己配

`style` 里已经带 `@font-face`（Mona Sans + 思源黑体，VF 可变字体）。
要换成自托管，在引样式前把 `$wd-vf-fonts-enabled` 置 `false` 再自己写 `@font-face`。

### 4. 组件内部的图标

组件自己会 import `WdIcon`，**不需要**全局注册 —— 按需引入也能正常显示图标。
