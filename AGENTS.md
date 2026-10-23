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

### 字阶与字重（toC 的层级全靠这两组数）

字号四档 + 字重五档，全部走令牌，**不许在页面里写裸数字**：

| 令牌 | 值 | 用在哪 |
|---|---|---|
| `--wd-fs-display` | `clamp(40px, 3.4vw, 56px)` | 页面主标题 |
| `--wd-fs-title` | 26px | 区块大标题 |
| `--wd-fs-heading` | 17px | 卡片 / 面板标题 |
| `--wd-fs-body` | 14.5px | 正文、说明 |
| `--wd-fs-label` | 12.5px | 标签、元信息 |
| `--wd-fw-regular` | 400 | 正文（鸿蒙/安卓的中文正文都是 400） |
| `--wd-fw-medium` | 500 | 按钮、标签、导航项 |
| `--wd-fw-semibold` | 600 | 卡片标题、表头 |
| `--wd-fw-bold` | 700 | 页面标题、区块标题 |
| `--wd-fw-black` | 780 | 首屏大标题（全站仅此一处） |

实测依据：鸿蒙官网大标题 48/400、次级 24/400、正文 16/400（行高 1.5），几乎全 400，
层级全靠字号 + 字距；安卓/Material 是正文 400、按钮标签 500、强调 700。
**共同点：字重克制、靠字号拉层级。** 之前那套 450/560/650/780/840 整体偏粗，中文会糊成一块。

标题/正文的对比靠**字号 1.17 倍 + 字重 650 vs 450** 一起给，只拉字号会显得"字很大但没重量"。

### 选中态（暗色最容易做坏的地方）

两档，用途不同，**不要共用一个值**：

| 令牌 | 浅色 | 深色 | 用在哪 |
|---|---|---|---|
| `--wd-selected-bg` + `--wd-selected-ink` | 近黑底 / 白字 | 近白底 / 近黑字 | 强选中：侧栏项、分段控件、列表项（一次只有一个） |
| `--wd-selected-row` | `#E4E9F0` | `#2E2E36` | 弱选中：表格行、树节点、下拉选中项（整片面积，必须克制） |

用 `--wd-field` 当选中底 = 选中和 hover 同色，深色主题下就是一片"灰白"。**别这么写。**

### 版式节奏（改之前先看，别退回"一叠白盒子"）

演示站的观感靠这几组数字撑着，都是照参考集（大圆角 + 柔影 + 大留白）定的：

| 位置 | 值 |
|---|---|
| 页面容器 | `max-width: 960` 居中；`.demo-main` 左右 `clamp(24–56)`、底部 120 |
| 眉标 | 11.5px / 700 / `.16em` / 全大写 + 5px 红点，距标题 18 |
| 页面标题 | `clamp(34–46px)` / 800 / `-.035em` / lh 1.08；说明 15px/1.75、限宽 62ch |
| 面板标题 | 11.5px / 800 / `.12em` / 全大写 + **18×2 彩色短杠**（彩虹色按 nth-child 轮换，不染红） |
| 面板本体 | 白卡、radius 24、padding `26 30 28`、`--wd-shadow` → hover `--wd-shadow-hover` |
| 版式 | **左右双栏**：左 = demo 卡片单列（预览 + 可展开源码），右 = 组件 API（属性/事件/插槽） |
| 右栏 | `minmax(380px, 30vw)`、白卡、sticky 且内部滚动；窄屏（<1180）落到正文下方不隐藏 |
| API 数据 | 构建期从组件源码解析（`tools/extract-api.mjs` → `virtual:component-api`），**不许手写** |
| 源码数据 | 构建期切页面 SFC 的 `<DemoBlock>`（`tools/demo-code-plugin.mjs` → `virtual:demo-code`），**不许手写** |
| 行内间距 | `DemoRow` 默认 gap 16、`align-items: flex-start` |
| 入场 | 每块错开 40ms 的 `translateY(10px)` —— **只动位移不动透明度**（pitfalls 第 1 条） |

### 逐组件排查（显示缺陷）

改完壳之后必须**逐页看渲染**，机械扫描只能定位、不能定论。已用过的两类探针：

| 探针 | 查什么 | 已知误报 |
|---|---|---|
| 几何 | `scrollWidth/clientWidth`、越界、图片丢失 | badge 数字气泡（绝对定位）、carousel 轨道外的 slide、table 省略号单元格、`wd-btn` 的 sheen 伪元素（`top/bottom:-60%` 撑出 scrollHeight） |
| 文本裁切 | Range 量文本矩形 vs 最近 `overflow:hidden` 祖先 | 祖先若是 `body`（页面滚动容器）会把折叠下方所有文本判成"被裁" |

真正抓到过的：`WdSelect` onChange 自递归（栈溢出）、WdNav 项被 flex 压缩、
API 表 `undefined` 胶囊 / `/**` 残留 / 反引号、导航页灰底撑满卡片。


**缓动一律走令牌**：`--wd-ease-out`（入场）/ `--wd-ease-smooth`（颜色、背景）/
`--wd-ease-sharp`（退场）/ `--wd-ease-spring-soft`（微交互）。
不要写裸 `ease` —— 浏览器的 `ease` 曲线起手偏"肉"，而且散落在 200 多个声明里
无法统一调整（2026-10 已全量替换成 `--wd-ease-smooth`）。

**动效怎么看**：远程链路 120ms 的过渡肉眼看不见 —— 侧栏底部 `⏱` 慢放开关把
`--wd-dur-*` 整体拉长 5~8 倍；判断"有没有动效"先开它再看。

判据：**像一份组件文档**，不是一块卡片墙。左栏一条线读下来：标题 → 预览 → 代码；
右栏随时能查属性。想靠"多列并排"提高密度 = 走错方向（试过，代码一展开就参差不齐）。

## 项目级 Skills（`.codebuddy/skills/`）

用于**审查界面细节**的技能，随仓库本地安装（`.codebuddy/` 与 `.agents/` 都在 `.gitignore` 里，
所以只在本机生效；要让团队共享就把这两条从 `.gitignore` 挪走）。

| Skill | 什么时候用 | 产出 |
|---|---|---|
| `web-design-guidelines` | 改完 UI 代码，要一次规范级自查（焦点环、表单、排版、动效、暗色、i18n） | `文件:行` 形式的逐条违规 |
| `fixing-accessibility` | 加交互控件 / 弹窗 / 图标按钮前，查无障碍 | 违规片段 + 一句理由 + 具体改法 |
| `review-animations` | 改过渡、滑块、弹层入场 | 按"工艺线"逐条判定（要先 `/review-animations` 手动触发） |
| `web-quality-audit` + `performance` | 要实测证据：Lighthouse、性能 trace、可访问性树 | 实测基线 + 源码定位，配合 `w-yun-chrome` 的 `lighthouse_audit` |

安装方式：`npx skills add <owner/repo> --skill <name> -y`（在仓库根跑，会自动 symlink 进 `.codebuddy/skills/`）。
技能的真实文件在 `.agents/skills/`，**改技能改那里**，`.codebuddy/skills/` 里只是软链。

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


## 代码高亮主题（wdesign-demo）

代码面板的高亮由**构建期 shiki** 产出，主题是标准 VS Code 主题 JSON：

| 文件 | 用途 |
|---|---|
| `packages/wdesign-demo/theme/wdesign-light.json` | 浅色主题（同时也是可用的 VS Code 主题） |
| `packages/wdesign-demo/theme/wdesign-dark.json` | 深色主题 |
| `packages/wdesign-demo/tools/highlight.mjs` | 构建期调 shiki，双主题输出（`--shiki-dark`） |

改配色只改这两个 JSON：文档里的代码、和你在 VS Code 里看到的，是**同一份**色板。
想在本机 VS Code 里用：把 JSON 放进 `~/.vscode/extensions/` 下任一主题扩展，
或直接用「Preferences: Color Theme → 从文件安装」。

## 检查器（`pnpm --filter @w-run/wdesign-ui verify` 已包含）

| 检查 | 抓什么 |
|---|---|
| `check-tokens.py` | `var(--wd-*)` 未定义 / 带 fallback |
| `check-icons.py` | 图标名不存在 |
| `check-sizing.py` | **min-width 与 max-width 打架**（CSS 里 min 优先于 max，容器窄了就被顶破 / 被裁）+ `minmax(数字 px, …)` 网格 |
| `check-template-refs.py` | **模板里误写 `xxx.value`** —— 模板自动解包，写了就是 undefined，render 抛错、DOM 停在上一帧（点不动、aria 不翻转，极难查） |
| `smoke-test.mjs` | 每个组件的渲染冒烟 |

## 四条最高优先级

1. **不许静默失效** —— 不报错但不起作用的写法必须改掉
   （`var()` fallback、`transition` 承载状态、`:deep()` 写在全局 SCSS、
   esbuild 默认 tree-shaking 删库导出、
   **组件内部 `<wd-icon>` 不 import WdIcon 而指望全局注册**、
   **`styles/index.scss` 漏引组件原子件**、
   **`:size="28"` 传给字符串枚举 prop**）

2. **检查器不许放水** —— 修完必须注入已知错误验证它仍会失败

3. **审视觉必须完美主义、用挑剔的标准** —— 这一条是铁律，不因为"能跑"就放过：
   - 不要拿"整体还行"敷衍。**逐项对数值**：字号档、行高、间距、圆角、阴影、
     字重、字距、对齐基线、动效时长与缓动曲线。
   - 交付前必须**真的看图**（截图），并且按挑剔的眼光问：哪里"小气"？
     哪里空、哪里挤、哪里不齐、哪里像模板？说得出具体毛病才叫看完。
   - 复制粘贴式的"卡片墙 / 一叠白盒子 / 均匀 16px 网格"= 俗套，直接判不合格。
     有节奏（疏密）、有层级（大字号对比）、有焦点（一个视觉锚点）才算过。
   - 宁可多迭代几轮把观感修到位，也不要把半成品交出去让人替你看。
   - 用户提出"没设计感"时，先把参考集（`/root/wdesign_reference`、iSH 存档 demo）
     和现状**逐项列差分**，再动手 —— 猜着改只会来回摆。
   - **每次审查前先用浏览器截图参考站**（Apple / 鸿蒙 / 安卓 / 微软官网 + collectui.com），
     量出标题·副标题·正文的字号与字重倍数、行高、留白，再回头逐处挑毛病。
     截图控制在 1~2 张（一张几百 KB，长会话会把 Node 堆吃爆）。

4. **禁止重启任何服务或主机** —— 配置只改文件，重启交给用户

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




**浮层必须 Teleport 到 body**：`position: absolute` 的面板挂在组件内部时，
会被祖先的 `overflow` 裁切、被祖先的 `transform`（**transform 会创建层叠上下文**）
困住 —— 演示站的 `.demo-block` 就有 `transition: transform`，实测时间面板被
下一张卡片整块盖住，`z-index` 调到 1200 也没用。内联形态（如 DateTimePicker 里的
时间列）用 `inline` 属性显式关掉 Teleport。

### 输入类组件的 attrs 要落到原生控件

`WdInput` 这类「根节点是外壳、真正控件在里面」的组件，必须
`inheritAttrs: false`，再把 `id / name / autocomplete / aria-*` 绑到原生 `<input>`：

- 默认透传会把它们挂在外层 `<label>` 上 —— `name` 不参与表单提交、`aria-label` 对 label 毫无意义
- 但 `class / style` 要留在根节点，否则使用方传的类名会跑到输入框上、布局直接坏
- 组件间互指用的 id 走 `components/uid.ts`（模块级自增，不用 `useId`：peer 依赖是 vue>=3.3）

### 日期面板只有一份实现

`WdDatePicker` / `WdDateTimePicker` **必须内嵌 `WdCalendar`**，不许自己画格子。

- 面板长什么样 = Calendar 长什么样：年月滚轮、min/max、今天/清空、键盘、标记、区间，一处改处处生效
- DatePicker 只负责「触发器 + 浮层 + 关闭时机」；外壳样式只留触发器和面板卡片，
  `__day / __week / __grid / __month-item` 这些类一旦出现就是又抄了一份
- 键盘：方向键移动 `.is-cursor` 描边（只在 Calendar 聚焦时显示），Enter / Space 才提交 ——
  按一下方向键就把日期改掉是表单里的破坏性操作

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
