# AGENTS.md — WDesign 项目

> 所有开发约束、踩坑清单、架构决策集中在 **`.agents/memory/`**。
> 改代码前先读对应文件，尤其是 `03-pitfalls.md`。

## 仓库结构

```
wdesign/                     pnpm monorepo
├── .agents/memory/          ★ 开发约束记忆（先读这里）
├── tools/publish-npm.sh     发布脚本
└── packages/
    ├── wdesign-ui/          @w-run/wdesign-ui      76 组件
    ├── icons/               @w-run/wdesign-icons   595 SVG
    └── wdesign-demo/        @w-run/wdesign-demo    演示站
```

## 记忆索引

| 文件 | 什么时候读 |
|---|---|
| [`01-architecture`](.agents/memory/01-architecture.md) | 动结构 / 加包 / 改构建 |
| [`02-style-rules`](.agents/memory/02-style-rules.md) | 写组件 / 改样式 |
| [`03-pitfalls`](.agents/memory/03-pitfalls.md) | **遇到怪问题先查这里**（27 条） |
| [`04-release`](.agents/memory/04-release.md) | 发版 |
| [`05-checks`](.agents/memory/05-checks.md) | 加检查 / 改检查 |
| [`06-workflow`](.agents/memory/06-workflow.md) | 日常开发 / 调试链路 |

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
   （`var()` fallback、`transition` 承载状态、`:deep()` 写在全局 SCSS…）
2. **检查器不许放水** —— 修完必须注入已知错误验证它仍会失败
3. **禁止重启任何服务或主机** —— 配置只改文件，重启交给用户
