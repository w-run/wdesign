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
pnpm --filter @w-run/wdesign-demo check:pages   # 演示站 76 页结构检查
pnpm build:ui               # 构建组件库
pnpm build:demo             # 构建 demo（先跑 check:pages）
bash tools/publish-npm.sh   # 发布到公共 npm
```

## 演示站（wdesign-demo）

- **一组件一页面**：`src/pages/<dir>/index.vue`，路由在 `src/router.ts`，两处必须成对
- 页面用 `DemoPage` + `DemoBlock` + `DemoRow`（`@/shell/*`），组件从 `@wdesign` 导入
- `@wdesign` 是 vite alias，直连 `packages/wdesign-ui/src` —— 改组件即时生效，不用先 build
- 静态资源在 `public/`（`/media/demo.mp4`、`/media/audio.mp3`、`/media/danmaku.xml`、`/images/*.jpg`）
- 字体吃仓库里的 VF 文件（`src/styles/index.scss` 里 `$wd-vf-fonts-enabled: false` + 本地 `@font-face`）
- `tools/check-pages.mjs` 校验：路由↔文件成对、SFC 编译、组件已 import、`@wdesign` 符号存在、
  无手写 svg、事件名 kebab-case、枚举型 prop 取值合法、绑定表达式没有裸标识符、
  `var(--wd-*)` 令牌存在且不带 fallback、每页有 DemoBlock、图标名存在

### 版式节奏（改之前先看，别退回"一叠白盒子"）

演示站的观感靠这几组数字撑着，都是照参考集（大圆角 + 柔影 + 大留白）定的：

| 位置 | 值 |
|---|---|
| 页面容器 | `max-width: 960` 居中；`.demo-main` 左右 `clamp(24–56)`、底部 120 |
| 眉标 | 11.5px / 700 / `.16em` / 全大写 + 5px 红点，距标题 18 |
| 页面标题 | `clamp(34–46px)` / 800 / `-.035em` / lh 1.08；说明 15px/1.75、限宽 62ch |
| 面板标题 | 11.5px / 800 / `.12em` / 全大写 + **18×2 彩色短杠**（彩虹色按 nth-child 轮换，不染红） |
| 面板本体 | 白卡、radius 24、padding `26 30 28`、`--wd-shadow` → hover `--wd-shadow-hover` |
| 内容区 | **两列网格** `minmax(340px,1fr)`、gap 20；宽内容（表格/播放器/日历…）`:span="2"` 跨满 |
| 行内间距 | `DemoRow` 默认 gap 16、`align-items: flex-start` |
| 入场 | 每块错开 40ms 的 `translateY(10px)` —— **只动位移不动透明度**（pitfalls 第 1 条） |

判据：**一屏要能看到 3~4 块**。整页又变成"一行一张 900 宽白卡、里面三个按钮"就是退回俗套了。

## 环境与远程调试（可用工具）

```
w-box（本机 · vite :5273） ──穿透 62904──▶ 公网 http://srv.addr.w-run.net:62904/
w-yun（Windows 云 · Chrome CDP :9222） ──穿透 62906──▶ chrome-devtools MCP
```

| 资源 | 地址 / 调用 | 说明 |
|---|---|---|
| 开发预览 | `http://srv.addr.w-run.net:62904/` | **必须走 http**，https 握手即 `000`。反代到本机 vite `:5273`（已在跑，`--host 0.0.0.0`） |
| Chrome DevTools MCP | `w-yun-chrome` → `http://srv.addr.w-run.net:62906/mcp`（Bearer） | chrome-devtools-mcp 1.11，调试 Chrome 常驻在 **w-yun**（`user-data-dir=C:\Users\admin\chrome-debug`）。32 个工具：导航/点击/填表/截图/console/network/trace/lighthouse |
| 桌面视觉操作 MCP | `w-yun-computer-use` → `ssh -W 127.0.0.1:19000 w-yun` | omni-computer-use 29 个工具：整屏截图/鼠标/键盘/剪贴板/开应用 |
| MCP 配置 | `~/.codebuddy/mcp.json` | token 只在这里，**绝不抄进仓库** |

**用哪个**

- 改组件要验渲染 → 先用 `w-yun-chrome`：`list_pages` 拿 pageId → `navigate_page` → `take_screenshot`，
  配合 `list_console_messages` / `list_network_requests` 抓静默失效。
- 需要看浏览器之外的东西（系统窗口、原生弹窗、MCP 网关不通时兜底）→ `w-yun-computer-use`。

**两个必踩的坑**

1. `w-yun-computer-use` **首次必须先 `request_access {apps:["*"], reason:"…"}`**，
   否则一律报 `allowlist is empty`。收工调 `deactivate`，撤掉屏幕上的
   「Agent is using your computer」水印并把授权归还用户。
2. `62906` 裸 `curl` 返回 **401 是正常的**（前面有 Bearer 鉴权网关），
   不代表隧道断了；只有 `62904` 才该用 `curl -s -o /dev/null -w "%{http_code}"` 判活。

```sh
# 链路自检（都是只读，不会打断任何服务）
curl -s -o /dev/null -w "62904=%{http_code}\n" http://srv.addr.w-run.net:62904/
ss -lntp | grep 5273
```

## 三条最高优先级

1. **不许静默失效** —— 不报错但不起作用的写法必须改掉
   （`var()` fallback、`transition` 承载状态、`:deep()` 写在全局 SCSS、
   esbuild 默认 tree-shaking 删库导出、
   **组件内部 `<wd-icon>` 不 import WdIcon 而指望全局注册**、
   **`styles/index.scss` 漏引组件原子件**、
   **`:size="28"` 传给字符串枚举 prop**）

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
