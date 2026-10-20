# AGENTS.md — WDesign 项目

> **开发约束记忆在 `.agents/memory/`，不进版本库**（`.gitignore` 已排除）。
> 这是本地维护的工作区约束，包含踩坑清单与架构决策。
>
> 克隆仓库后该目录为空，需从本地备份恢复，或参考本文件的摘要。
> 改代码前先读 `03-pitfalls.md`（27 条踩坑，全是实际发生过的）。

## 仓库结构

```
wdesign/                     pnpm monorepo
├── .agents/memory/          ★ 开发约束记忆（本地，不入库）
├── tools/publish-npm.sh     发布脚本
└── packages/
    ├── wdesign-ui/          @w-run/wdesign-ui      76 组件
    ├── icons/               @w-run/wdesign-icons   595 SVG
    └── wdesign-demo/        @w-run/wdesign-demo    演示站
```

## 记忆索引（本地文件）

| 文件 | 什么时候读 |
|---|---|
| `01-architecture.md` | 动结构 / 加包 / 改构建 |
| `02-style-rules.md` | 写组件 / 改样式 |
| `03-pitfalls.md` | **遇到怪问题先查这里**（27 条） |
| `04-release.md` | 发版 |
| `05-checks.md` | 加检查 / 改检查 |
| `06-workflow.md` | 日常开发 / 调试链路 |

## 常用命令

```sh
pnpm install                # 首次
pnpm dev                    # demo → :5273
pnpm --filter @w-run/wdesign-ui verify   # 全部检查
pnpm build:ui               # 构建组件库
pnpm build:demo             # 构建 demo
bash tools/publish-npm.sh   # 发布到公共 npm
```

## 三条最高优先级

1. **不许静默失效** —— 不报错但不起作用的写法必须改掉
   （`var()` fallback、`transition` 承载状态、`:deep()` 写在全局 SCSS、
   esbuild 默认 tree-shaking 删库导出）

2. **检查器不许放水** —— 修完必须注入已知错误验证它仍会失败

3. **禁止重启任何服务或主机** —— 配置只改文件，重启交给用户

---

## 核心约束速查

完整版见 `.agents/memory/`，这里只列最常踩的：

### 样式
- 颜色只走 `var(--wd-*)`，**不加 fallback**（会掩盖令牌名写错）
- 一个 scss 文件只放一个组件
- 阴影用阶梯 token：`--wd-shadow-sm / default / hover / pop / lg / knob`

### 组件
- `defineOptions({ name: 'WdXxx' })` 置于脚本开头
- 事件名 **kebab-case**，`size` 只许 `sm | md | lg`
- 共用逻辑抽模块：`overlay` / `overlay-stack` / `anchor` / `controllable` / `time`

### 布局
- 附加信息（标记点、底部文字）一律**绝对定位浮层**，不参与布局
- flex 交叉轴的 stretch 会覆盖子项 `width` —— 留白写父级 `padding`
- 列宽 ≠ 节点宽，两者必须解耦

### 构建
- 只发 ESM（esbuild 的 cjs 会静默丢弃 re-export）
- 库构建必须 `--tree-shaking=false`
- `--format` 不能写在公共参数数组里

### 发布
- 官方源必须等到可用；npmmirror 只戳一次，不等待
- 凭据走 `$NPM_TOKEN`，绝不写进仓库文件
