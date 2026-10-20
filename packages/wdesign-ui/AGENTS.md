# AGENTS.md — 关于 WDesign 的操作指南

> ⚠️ **本文件的约束已迁移到 `.agents/memory/`。**
>
> 完整、按主题整理、可检索的开发约束在：
>
> | 文件 | 内容 |
> |---|---|
> | `.agents/memory/01-architecture.md` | 仓库结构、包职责、构建链路 |
> | `.agents/memory/02-style-rules.md` | SCSS 与 SFC 写法硬规则 |
> | `.agents/memory/03-pitfalls.md` | **27 条踩坑清单（遇到怪问题先查这个）** |
> | `.agents/memory/04-release.md` | 发布流程与验证策略 |
> | `.agents/memory/05-checks.md` | 检查器清单与「不许放水」原则 |
> | `.agents/memory/06-workflow.md` | 开发流程与调试链路 |
>
> 本文件保留**项目概览**和**发布说明**，新增约束请写进 `.agents/memory/`。

---

# 一、项目概览

WDesign 是一个 Vue 3 组件库 + 图标库 + 演示站，pnpm monorepo 三包结构。

```
packages/
├── wdesign-ui/       @w-run/wdesign-ui      76 个组件 · 令牌驱动
├── icons/            @w-run/wdesign-icons   595 个 SVG
└── wdesign-demo/     @w-run/wdesign-demo    演示站（vite + vue-router）
```

## 技术特征

- **纯 Vue 3 + TypeScript**，`<script setup>` + `defineProps<T>`
- **SCSS 令牌驱动**：141 个 CSS 变量，深浅双主题
- **零运行时依赖**（除 vue），图标走 `<WdIcon>` 单组件
- **按需引入**：`import { WdButton } from '@w-run/wdesign-ui'`

## 快速开始

```sh
pnpm install
pnpm dev              # demo → http://localhost:5273
pnpm build:ui         # 构建组件库
pnpm build:demo       # 构建 demo
```

## 发布

```sh
bash tools/publish-npm.sh        # 见 .agents/memory/04-release.md
```

---

# 二、加新组件

1. 写 `packages/wdesign-ui/src/components/WdXxx.vue`
   - `defineOptions({ name: 'WdXxx' })`
   - props 用 TS 接口 + `withDefaults`
   - 事件用 `defineEmits` 类型化声明，**kebab-case**
2. 写 `packages/wdesign-ui/src/styles/components/_xxx.scss`
   - 颜色只走 `var(--wd-*)`，**不加 fallback**
   - 一个文件只放一个组件
3. 在 `src/styles/index.scss` 加 `@import 'components/xxx';`
4. 跑 `npm run gen:index`（重新生成导出）
5. 跑 `npm run verify`（必须全绿）
6. 在 demo 加页面：`packages/wdesign-demo/src/pages/xxx/index.vue`
7. 在 `demo/src/router.ts` 注册路由

## 命名约定

| 项 | 规则 |
|---|---|
| 组件名 | `WdXxx`（PascalCase） |
| 路由标签 | `wd-xxx`（kebab）——注意多词组件的转换 |
| BEM | `.wd-xxx__elem--mod` |
| 事件 | kebab-case（`change-episode`） |
| size | 只许 `sm / md / lg` |

## 组件名与标签名的坑

`WdDateTimePicker` → kebab 是 `wd-date-time-picker`（不是 `wd-datetime-picker`）。
写错标签会渲染成未知元素，页面上一片空白但**不报错**。
