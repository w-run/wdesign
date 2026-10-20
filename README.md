# WDesign

**WDesign** — 一套「无边框 · 色块分层 · 全圆角」的现代扁平设计系统（Vue3 + SCSS）。

- 主题色 `#D62839`（浅色 / 深色模式下恒定）；深色两级 `#1C1C1C` / `#2F2F2F`
- 字体：拉丁 **Mona Sans** + 中文 **思源黑体（Source Han Sans SC）** —— 均为 VF 可变字体
- 无毛玻璃、无渐变、无描边 —— 区域只用色块与留白区分

## Packages

| 包 | 说明 |
|---|---|
| [`packages/wdesign-ui`](./packages/wdesign-ui) | 组件库 `@w-run/wdesign-ui`：**76 个组件** + 141 个令牌 + 全量 SCSS + 检查器 |
| [`packages/icons`](./packages/icons) | 图标库 `@w-run/wdesign-icons`：**595 个 SVG**（outlined 431 / filled 164）· 256×256 · currentColor · kebab-case |
| [`packages/wdesign-demo`](./packages/wdesign-demo) | 演示站 `@w-run/wdesign-demo`：vite + vue-router，**一组件一页面**（76 页） |

## 开发

```sh
pnpm install                             # 首次
pnpm dev                                 # 演示站 → http://localhost:5273
pnpm --filter @w-run/wdesign-ui verify   # 组件库全部检查（令牌 / 图标 / 类型 / 冒烟 403 项）
pnpm --filter @w-run/wdesign-demo check:pages  # 演示站结构检查（76 页）
pnpm build:ui                            # 构建组件库
pnpm build:demo                          # 构建演示站
bash tools/publish-npm.sh                # 发布到公共 npm
```

演示站通过 vite alias 直连组件库**源码**（`@wdesign` → `packages/wdesign-ui/src`），
改组件即时热更新，**不需要先 build:ui**。

## 使用

```bash
# 宿主需装 sass
npm i @w-run/wdesign-ui @w-run/wdesign-icons
```

```ts
import { createApp } from 'vue'
import { WdButton, WdIcon } from '@w-run/wdesign-ui'
import '@w-run/wdesign-ui/style'      // 全量样式
import '@w-run/wdesign-icons/style.css'

const app = createApp(App)
app.component('WdButton', WdButton)
app.component('WdIcon', WdIcon)
app.mount('#app')
```

```vue
<WdButton variant="primary">按钮</WdButton>
<WdIcon name="heart" :size="28" />
```

按需引样式可以只引单个组件：`import '@w-run/wdesign-ui/style/button'`。

- 组件约定与写法硬规则：[packages/wdesign-ui/CONVENTIONS.md](./packages/wdesign-ui/CONVENTIONS.md)
- 设计令牌总览：[packages/wdesign-ui/TOKENS.md](./packages/wdesign-ui/TOKENS.md)
- 可视化设计规范：[design-system.html](./design-system.html)（浏览器打开）

## Preview

![演示 · 日期与 Toast](docs/preview-demo.jpg)
![组件 · 表格与折叠](docs/preview-components.jpg)
![Markdown 样式](docs/preview-markdown.jpg)
![深色模式](docs/preview-dark.jpg)
![图标库](docs/preview-icons.jpg)

## License

[MIT](./LICENSE)
