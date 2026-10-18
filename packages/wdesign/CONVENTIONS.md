# WDesign 代码约定（Conventions）

统一代码风格与结构，新代码按此执行。

> 本文档的第二部分「踩坑清单」记录的是**真实踩过的坑**。
> 每一条都对应一个曾经上线过的 bug —— 不是理论建议，是防复发清单。

---

# 一、基础风格

## 样式（SCSS）

- **颜色全部走 token**：组件样式只允许 `var(--wd-*)`。仅两类刻意保留的硬编码：
  1. `#fff` —— 品牌 / 深色表面上的文字与图标（勾、白字、白点）
  2. markdown 的 hljs 语法色板（VS Code Dark 固定配色，已在 `_markdown.scss` 标注）
- ⚠️ **不要给 `var()` 加 fallback**（`var(--wd-field, #e9edf1)`）。
  fallback 会**掩盖令牌名写错**的问题 —— 写错时样式悄悄用兜底值，看起来"生效了"，
  实际改令牌根本不起作用。这是静默失效最常见的来源。缺什么令牌就去加，不要兜底。
- **阴影统一用阶梯 token**：`--wd-shadow-sm / default / hover / pop / lg / knob`
- **BEM 命名**：`.wd-block__elem--mod`；原子基础件用 `.wd-dot` `.wd-icon-btn` `.wd-chevron`（+ 修饰符）
- 属性顺序：定位 / 布局 → 盒模型 → 视觉（背景、圆角、阴影）→ 文字 → 动效
- 2 空格缩进；文件以换行结尾；无行尾空格、无 TAB
- **一个文件只放一个组件**。曾把 `wd-segmented` 与 `wd-segmented-picker`
  塞进同一个 scss（243 行），改一处容易误伤另一处，按需引入也无法单独取。

## Vue 组件（SFC）

- `defineOptions({ name: 'WdXxx' })` 置于脚本开头
- props 用 TS 接口 + `withDefaults`；事件用 `defineEmits` 类型化声明
- 状态顺序：`ref/computed` → 方法；`style` 禁止作为 prop 名（保留给 HTML style 属性）
- 交互型组件显式声明事件并自根元素冒泡（如 WdButton 的 `click`），不依赖 attrs 回退
- 模板类名与 SCSS 一一对应；能用原子件（dot / icon-btn / chevron）就不重复写样式
- **事件名用 kebab-case**（`change-episode` / `row-click`），不用 camelCase。
  Vue 约定模板里写 kebab；camelCase 只在小写单段时碰巧能用，多词时静默失效。
- **`size` 统一为 `sm | md | lg`**，不要新增 `xs` / `xl` 或只实现其中两档。
- **共用逻辑抽模块**，不要在组件里各写一份：
  `overlay.ts`（滚动锁定/焦点陷阱）· `overlay-stack.ts`（层栈）·
  `anchor.ts`（定位/外部点击）· `controllable.ts`（受控/非受控）· `time.ts`（时间格式化）

## 构建与缓存

- **缓存靠内容指纹，不靠时间戳**。
  `?v=1792291995` 这类手工版本号已废弃 —— 内容没变也换 URL，缓存永远失效；
  忘改一次就看不到新内容（已踩两次）。
  现在由 `tools/fingerprint.mjs` 生成 `name.<hash8>.js`，引用自动改写。
- **改了组件就重新构建**：`npm run build:demo`（会自动跑指纹）
- 排查「页面没更新」时，先看文件名里的 hash 变没变，再怀疑代码。

## token 扩展流程

新颜色 / 阴影 / 圆角一律进 `_tokens.scss`（+ `_dark.scss` 深色覆盖 + `tokens.json` 同步）→ 组件改引用 `var(--wd-*)`。

---

# 二、踩坑清单（防复发）

## 1. 动画不许承载功能状态

**症状**：元素永不显示、关不掉、卡在半透明。

`<Transition>` 的 enter 阶段依赖 `nextFrame`。动画时钟停摆时
（后台标签页 / 无头渲染 / 系统减弱动效）它不推进，`enter-from` 类永久残留；
此时再触发关闭会叠加 `leave-*`，元素彻底销毁不掉。

`:duration` 兜底**救不了** —— 它自己也挂在同一个不推进的时钟上。

**规则**：
- 可见性由 `display` 决定（`.is-open { display: block }`），动画只负责好看
- 需要「打开过一次后常驻」时用 `v-show` + `mounted`，但**不要**同时用
  `v-show` 和 `.is-open` 控制同一个 display ——
  `v-show` 写的是内联样式，优先级高于类选择器，会把它永久压成 `none`
- 数字滚动 / 轮播这类需要 `requestAnimationFrame` 的，必须加 `setTimeout` 兜底
- 参考实现：`WdPopconfirm` / `WdModal` / `WdDrawer` / `WdTooltip`（类驱动）
  与 `WdStatistic`（rAF 兜底）

## 2. 浮层必须 Teleport

**症状**：下拉 / 气泡 / 面板在表格、卡片、滚动区里被裁掉一半。

`position: absolute` 会被任何祖先的 `overflow: hidden` 切断。
这类浮层恰恰最常出现在这些地方 —— 不是边缘情况，是常态。

**规则**：
- 面板 Teleport 到 body + `position: fixed`
- 坐标用 `useAnchoredPosition()` 计算（含空间不足自动翻转、水平夹进视口）
- 容器**不能**设 `overflow: hidden`（会裁掉内部控件的焦点环）
- 圆角要同时压到内层控件：`.item--last` 和 `.item--last > *` 都要写，
  因为控件可能「自身就是 item」

## 3. 多层浮层必须走层栈

**症状**：弹窗里开抽屉时，Tab 焦点在两层面板间来回跳；按一次 Esc 全部关掉。

根因是每个浮层各自往 document 挂 keydown，谁也不知道谁存在。

**规则**：
- 用 `overlay-stack.ts`，**只有栈顶**响应 Tab 与 Esc
- 滚动锁定用计数（`lockCount`），关到底才恢复
- 焦点归还：原元素不在文档里时，退还给「当前栈顶浮层的面板」，不要直接掉到 body
- 层级用 `nextZIndex()` 自增；固定 z-index 在多层场景必然错乱

## 4. 令牌与图标名必须校验

**症状**：样式莫名不生效；图标位置一片空白。两者都**不报错**。

- 引用不存在的 CSS 变量 → 整条声明被浏览器丢弃
- `WdIcon` 找不到图标名 → 渲染空白，控制台干净

**规则**：
- 提交前跑 `npm run check:tokens` / `npm run check:icons`（CI 用 `--strict`）
- 图标名必须真实存在于 `packages/wdesign-icons/icons/{outlined,filled}`

## 5. 图标：不 emoji、不手写 SVG

- **不用 emoji 做布局图标**：emoji 是字体字符，各平台字形/粗细/基线都不同，
  且不跟随 `currentColor`（深色主题下是一坨突兀的彩色）。
- **不手写内联 `<svg>`**：无法跟随图标库迭代、不能预加载、纯增体积。
  全部走 `<wd-icon name="…" />`。
- **图标用 filled 还是 outlined 看场景**：
  控件压在画面上（播放器）用 `filled`（细线会被半透明底压没）；
  正文旁的导航/信息图标用 `outlined`。
- 预加载：`injectIcons(window.WD_ICONS)` 或 `await preloadIcons([...])`，
  让 `WdIcon` 首帧走同步命中，避免"晚一拍"闪一下。

## 6. 受控 / 非受控

**症状**：非受控模式完全不生效，所有实例都被判成受控。

**两个真实原因**：
1. `'modelValue' in props` **恒为 true** —— Vue 的 props 对象包含所有声明过的键
2. `withDefaults(..., { modelValue: false })` 让该键必然存在

**规则**：
- 判据读 `getCurrentInstance().vnode.props`（`useControllable` 已封装）
- **不要给 `modelValue` 设默认值**，兜底值放 `fallback`
- `fallback` 必须匹配类型：Select 多选是 `[]`、单选是 `''`
- 同时触发 `update:modelValue` 与 `change`，非受控场景只监听 `change`

## 7. 批量改码的插入位置

**症状**：改完之后组件集体消失，页面上一片 `<!---->`。

脚本按「文件里第一个匹配」插入代码，把调用插到了 `const x = ref()` **之前**，
触发 TDZ（暂时性死区），运行时 ReferenceError，整个组件渲染失败。

**规则**：
- 批量插入用**精确锚点**（目标行的完整内容），插在锚点之后
- 改完立刻跑冒烟测试 + 浏览器验证，不要等全部改完再测
- 尤其注意：`useXxx(refA, ...)` 必须放在 `refA` 声明之后

## 8. 事件类型要统一

**症状**：下拉点了没反应。

`useDismiss` 曾默认用 `mousedown`（想"更早响应"），与触发器的 `click` 时序错位：
按下 → 判为外部 → 关闭；抬起 → click → 又打开。

**规则**：触发器、面板内、外部点击用**同一种事件类型**。
`mousedown` 只在「拖动开始就要关闭」的场景显式传。

## 9. 直播 / 无限值

**症状**：进度条不动、控制台干净。

直播的 `duration` 是 `Infinity`，`current/duration*100` 算出 `NaN`，
`style="width: NaN%"` 是无效声明会被丢弃。

**规则**：算百分比前先 `Number.isFinite()` 判断（`formatDuration` 已内置兜底）。

## 10. 视觉补偿

- **指向性图形要视觉居中，不是几何居中**。
  播放三角左边是竖边、右侧收成尖角，实心质量偏左，几何居中看着会偏左。
  往指向方向推约 5–6% 图标的尺寸（34px → 2px）。
- **对比度**：禁用态用 `.6` 而不是 `.45`（`.45` 在浅底上约 3:1，读不出来）；
  可读弱文字用 `--wd-ink-2`，`--wd-ink-3` 只用于禁用态与装饰。

## 11. 标签宽度不要写死

**症状**：多列布局里值区被挤成竖排，中文一个字一行。

固定 `width: 96px` 的标签在三列 + 窄容器下只给值区留 21px。

**规则**：用 `flex: 0 1 auto; max-width: 40%`，让标签按内容收缩；
值区保底 `min-width: 3.5em`。

---

# 三、提交前检查

```sh
npm run test:all       # check:tokens + check:icons + check:fingerprint + 冒烟测试(306 项)
npm run build:demo     # 重新构建 + 生成指纹
```

改了下面任一项，必须重新构建 demo 并在浏览器里看一遍：

- `src/components/**`
- `src/styles/**`
- `demo/**`

**冒烟测试覆盖 9 类结构性断言**（组件可编译 / name 声明 / 事件命名 /
无手写 SVG / 浮层 Teleport / Transition 兜底 / 令牌 / 图标名 / 产物完整）。
它能拦住"静默失败"类问题 —— 这类问题构建通过、控制台干净，只能靠工具发现。
