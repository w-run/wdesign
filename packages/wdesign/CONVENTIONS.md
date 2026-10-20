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

## 12. `position` + `top/left` 定位的元素不能用 `transform: scale` 做尺寸变化

**症状**：拖动时的克隆块 / 下拉面板 / 浮层"跟着指针但始终差一点"，
偏移量约 3%（元素宽高的一半 × scale 的变化量）。

**根因**：`position: fixed/absolute` + `top/left` 定位的是**布局盒**，
而 `transform` 是布局完成后的视觉变换。`scale()` 以元素中心为原点，
视觉尺寸比布局盒大 `n%`，于是视觉位置相对指针偏移 `n/2%`。

**这个坑在项目里踩了三次**：dropdown 面板、通用浮层、sortable 克隆块。

```scss
/* ❌ 看起来只是"放大一点"，实际整个定位都会偏 */
.wd-sortable__clone { position: fixed; transform: scale(1.06); }

/* ✅ 改用不参与定位的属性表达"被抓起" */
.wd-sortable__clone {
  position: fixed;
  outline: 1px solid var(--wd-ink-5);
  box-shadow: var(--wd-shadow-lg);
}
```

如果确实需要视觉放大，只有两条路：
1. 用 `transform-origin: top left` + 手动补偿偏移（脆弱）
2. **改布局尺寸**（padding / width），让布局盒与视觉一致（推荐）

---

## 13. 可见性不能依赖动画，必须由静态属性决定

**症状**：面板"打开了但看不见"、`opacity` 永远是 0、
`animationPlayState` 显示 `running` 但元素纹丝不动。

**根因**：动画时钟在以下环境会停摆 —— 后台标签页、无头渲染、
系统省电模式、`prefers-reduced-motion` 被强制。此时：

- `animation ... both` 把元素钉在起始帧
- `transition` 卡在旧值
- **关键帧里带 `opacity: 0` 的 `from` 帧 → 元素永久不可见**

**项目里踩过四次**：hero 渐变、Modal 面板、选集抽屉、group 交互。

```scss
/* ❌ 三种都会在时钟停摆时失效 */
.is-open { animation: fade-in both; }         /* 钉在 from 帧 */
.panel { opacity: 0 } .is-open { opacity: 1 } /* transition 卡住 */
@keyframes in { from { opacity: 0 } }          /* 停在 from */

/* ✅ 显隐由 display 决定，静态属性直接给最终值 */
.panel { display: none; }
.panel.is-open { display: flex; opacity: 1; }
```

**判据**：如果去掉所有 `animation` / `transition` 后元素会消失，
说明可见性依赖了动画 —— 必须改造。

动画只做锦上添花：位置偏移、缩放、颜色过渡。
**任何情况下都不能让"内容是否可见"依赖它。**

---

## 14. SCSS 嵌套不能展开 `&::-webkit-*` 伪元素

**症状**：写了十几个 `&::-webkit-media-controls-* { display: none }`，
编译后只剩 3 条有效规则。

**根因**：Sass 对 `&` 后跟 `::-webkit-*` 这类非标准伪元素的展开
在某些版本下会静默丢弃（不报错）。

```scss
/* ❌ 编译后大量丢失 */
.wd-vplayer__el {
  &::-webkit-media-controls-panel { display: none !important; }
}

/* ✅ 写完整选择器 */
.wd-vplayer__el::-webkit-media-controls-panel { display: none !important; }
```

**排查手法**：`grep -c "webkit-media-controls" demo/demo.css`，
数量应该等于你写的规则条数。

---

## 15. 自定义属性里不能放 `color-mix()`

**症状**：`background: var(--x)` 整条失效，元素变透明。

**根因**：自定义属性的值是「未解析的 token 序列」，
`--x: color-mix(in srgb, var(--y) 50%, transparent)` 定义时**不求值**，
等到 `background: var(--x)` 时浏览器拿到的是字面量，无法解析 → 丢弃。

```scss
/* ❌ 整条 background 会被丢弃 */
.wd-slider { --track: color-mix(in srgb, var(--wd-red) 22%, transparent); }
.wd-slider input { background: var(--track); }

/* ✅ 直接写在用它的属性上 */
.wd-slider input {
  background: color-mix(in srgb, var(--wd-slider-color) 22%, transparent);
}

/* ✅ 或者用 rgba 字面量（需要跟随主题时用方案二） */
.wd-group { --ring: rgba(214, 40, 57, .07); }
```

⚠️ 例外：`color-mix()` **写在属性值里**是正常工作的
（`box-shadow: 0 0 0 4px color-mix(...)`），只是别放进 `--var` 定义。

---

## 16. 组内子控件必须「缴械」自己的焦点环

**症状**：输入框聚焦时出现一圈粗重、边缘不齐的框。

**根因**：三层焦点环叠在一起 ——
`.wd-input:focus-within`（4px）+ `.wd-group:focus-within`（4px）
+ 子项自己的 `outline`。三者同色但半径/圆角不同，叠起来就成了毛边。

**规则**：一个整体只有一个边界。

```scss
/* 容器负责表达焦点 */
.wd-group:focus-within { box-shadow: 0 0 0 4px var(--wd-focus-ring-soft); }

/* 组内所有子控件放弃自己的环 */
.wd-group .wd-input:focus-within,
.wd-group .wd-select:focus-within,
.wd-group .wd-btn:focus-visible,
.wd-group [class*='__item']:focus-within {
  box-shadow: none !important;
  outline: none !important;
}
```

新增可聚焦子控件时，记得同步加进这份清单 —— 漏一个就复发。

---

## 17. `flex-wrap: wrap` 会让控制条高度跳变

**症状**：窄容器里控件换行，播放器/工具栏突然变高。

**根因**：换行改变的是**行数**，直接影响高度。而控件的挤压
只是视觉变窄，不会改变容器尺寸。

**规则**：横向控制条一律 `flex-wrap: nowrap`，
超窄时**按优先级层层隐藏**次要控件：

```scss
.wd-vplayer__row { flex-wrap: nowrap; }

@container vplayer (max-width: 460px) { .wd-vplayer__vol { display: none; } }
@container vplayer (max-width: 380px) { .wd-vplayer__btn--text { display: none; } }
@container vplayer (max-width: 320px) { .wd-vplayer__panel-wrap { display: none; } }
```

用 `@container` 而非 `@media` —— 组件可能嵌在任意宽度的容器里
（侧栏、弹窗、卡片网格），与视口宽度无关。

---

## 18. 需要"展开动效"又不想挤压邻居：定宽 + transform

**症状**：音量滑条 hover 展开时，把时间、倍速等后续控件整体推右。

**根因**：动画 `width: 0 → 62px`。**`width` 参与布局**，
变更会触发重排，邻居跟着移位。

**规则**：容器里"展开"的元素必须**始终占据最终宽度**，
用不参与布局的属性做动效。

```scss
/* ❌ 会挤压邻居 */
.slider { width: 0; transition: width .12s; }
.wrap:hover .slider { width: 62px; }

/* ✅ 固定宽度占位，只动 transform / opacity */
.slider {
  width: 62px;              /* 始终占位 */
  opacity: 0;
  transform: translateX(14px);
  pointer-events: none;
  transition: opacity .18s var(--wd-ease-out), transform .18s var(--wd-ease-out);
}
.wrap:hover .slider { opacity: 1; transform: translateX(0); pointer-events: auto; }
```

⚠️ 不要用 `scaleX(0.2)` 代替宽度变化 —— 它会把圆角横向压扁
（2px 半径变 0.4px），展开过程中圆头像"刀片"。

---

## 19. 面板不能放在带 `overflow` 的滚动容器里

**症状**：倍速 / 选集面板点开后在 DOM 里存在、高度正常，但**看不见**。

**根因**（三层套娃，修一层露一层）：
1. 播放器容器 `.wd-vplayer { overflow: hidden }` —— 为裁圆角
2. 控制条 `.wd-vplayer__row { overflow-x: auto }` ——
   **一个轴设 `auto`，另一轴会自动变成 `auto` 而非 `visible`**（CSS 规范）
3. 后面残留的 `overflow-y: hidden` 覆盖了刚写的 `overflow: visible`

**规则**：
- 浮层不要放在滚动容器内；必须放在最外层的定位上下文里
- 圆角裁切改由**内容元素自己**负责（`video`、`img` 各自 `border-radius`），
  容器不设 `overflow: hidden`
- 修改 `overflow` 后，用 `getComputedStyle` 确认**三个轴**都是期望值

```js
// 排查用：沿祖先链找谁在裁切
let el = panel.parentElement
while (el) {
  const cs = getComputedStyle(el)
  if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
    console.log('裁切来源：', el.className, cs.overflowX, cs.overflowY)
  }
  el = el.parentElement
}
```

---

## 20. `.vue` 里用新的组合式 API，必须同步改 import

**症状**：组件**完全不渲染** —— 面板标题和结构都在，只有组件位置是空的。
控制台没有明显报错（Vue 吞掉了 setup 里的异常）。

**根因**：写了 `onMounted(() => {...})` 但忘了从 vue import。

```ts
// ❌ 用了 onMounted 但没 import → 运行时 ReferenceError → 整个组件挂掉
import { computed, onBeforeUnmount, ref, watch } from 'vue'
onMounted(() => { /* ... */ })

// ✅
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
```

**为什么难查**：
- 构建期不报错（`onMounted` 只是未定义的标识符）
- 运行时不显示在控制台（Vue 的 setup 异常会被捕获）
- 页面结构看起来正常，只有组件位置是空的

**排查手法**：组件"消失"时，先 grep 用到的 API 是否都在 import 列表里。

---

## 21. 批量改样式：宁可手工，不要写"智能"脚本

**教训**：为了给全库 27 处 `:hover` 加 `@media (hover: hover)`，
我写了一个"扫描顶层 hover 规则并自动包裹"的脚本。结果：

- 逗号分隔的多选择器被整块包进 `@media`，语义改变
- 嵌套在其它 `@media` 里的规则被二次包裹，结构破坏
- 编译直接报 `expected selector`

**规则**：
- 批量改写只处理**结构最确定**的形态（单行规则、单选择器）
- 改完**立刻编译**，报错就回滚
- **不确定的一律留给人工** —— 脚本漏改是可发现的，改错是静默的
- 改写前先 `cp -r` 备份

判断标准：**如果脚本无法用一句话说清它改哪些、不改哪些，就不要写。**

---

## 22. 组件名与样式文件的实际块名可能不一致

**症状**：加类名检查时，`WdAiMessage` 被报"串用了 `wd-ai-msg__*`"。

**根因**：块名不能从组件名机械推导 ——
`WdAiMessage → wd-ai-msg`、`WdVideoPlayer → wd-vplayer`，
都不是标准的 kebab 转换。

**规则**：检查工具应从**样式文件实际内容**反查块名，
而不是从组件名推导。同理，新增组件时块名一旦定下就不要随意改。

---

## 23. 检查器修完必须验证没有「放水」

给 `check-icons.py` 加负向后顾修掉 `:name="icon"` 误报后，
必须确认它**仍能抓到真错误**：

```sh
# 注入一个不存在的图标名，确认检查仍然失败
sed -i 's/name="folder-open"/name="fake-icon-xyz"/' src/components/WdEmpty.vue
python3 tools/check-icons.py   # 应该报错
git checkout src/components/WdEmpty.vue
```

**规则**：任何"降低误报"的修改，都要用一个**已知的真错误**验证
检查器没被削弱。否则下一次它静默失效，比误报更危险。


## 24. flex 交叉轴的 stretch 会覆盖子项的 `width`

**症状**：给 flex 容器的子项写 `width: calc(100% - 20px)`，计算值却仍是
容器全宽，再加上左右 `margin` 就溢出。

**根因**：flex column 容器的交叉轴默认 `align-items: normal`（等价于
`stretch`）—— 子项沿交叉轴被强行拉伸到容器宽度，**`width` 被忽略**。
`align-self: stretch` 无效（本来就是），`width: auto` 也无效。

```scss
/* ❌ 332px 的声明被忽略，实际仍是 352px，再叠 margin 溢出 10px */
.wrap { display: flex; flex-direction: column; }
.item { width: calc(100% - 20px); margin: 0 10px; }

/* ✅ 留白写在父级 padding，子项 width: 100% 填满内容盒 */
.wrap { display: flex; flex-direction: column; padding: 0 10px; }
.item { width: 100%; margin: 0; }
```

⚠️ 这与 `box-sizing` **无关**：全局已是 `border-box`（`_base.scss` 的
`*` 规则，且包含 `::before/::after`）。排查时不要往 box-sizing 上想。

判据：**只要父级是 flex 且没设 `align-items`，子项在交叉轴上的
`width`/`height` 就不可靠**。需要精确尺寸时用 padding 或 `align-self`。

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
