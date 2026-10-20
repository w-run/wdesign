# 03 · 踩坑清单（防复发）

> 每条都是**实际发生过**的 bug。遇到怪问题时按关键字搜索本文。

## 静默失效类（不报错但不工作）

### 1. 动画不许承载功能状态

`opacity: 0` 靠 `transition` 变到 1 时，在以下环境会**卡在起始帧**：
无头渲染、后台标签页、省电模式、动画时钟停摆的环境。

**症状**：面板"打不开"、选中样式"完全失效"。
**修法**：可见性必须由**静态属性**决定（`v-if` / 类名），动画只做锦上添花。

> 这个坑踩了 5 次以上：Modal、Drawer、日历选中态、树节点展开、抽屉透明度。

### 2. `:deep()` 在全局 SCSS 里无效

```scss
/* ❌ 整条规则被丢弃，不报错 */
.wd-media-card__tools :deep(button) { border-radius: 50%; }
```

`:deep()` 是 Vue SFC **scoped 样式**的语法。写在全局 SCSS 里会被当成未知伪类
**整条丢弃**——实测按钮圆角一直是 10px（默认值），写的 50% 从未生效。

**修法**：全局样式直接写后代选择器。

### 3. esbuild 默认 tree-shaking 会删光库导出

入口有 81 条导出，esbuild 认为"没人用"全部当死代码删除，
产出只剩 2 个函数，`require()` 拿到 **0 个组件**。

**修法**：`--tree-shaking=false`。tree-shaking 应该在消费侧做。

### 4. `--format` 参数冲突

`--format=esm` 在公共参数数组里，`--format=cjs` 在后面追加 ——
esbuild 取第一个，产出 ESM 内容却存成 `.cjs`。

### 5. esbuild 的 cjs 格式化丢弃 re-export

`export { default as X } from './X'` 在 cjs 格式下会被静默丢弃
（ESM 正常 77 个，cjs 恒为 0）。所以只发 ESM。

## 布局类

### 6. flex 交叉轴的 stretch 会覆盖子项的 `width`

```scss
/* ❌ width 被忽略，实际仍是容器宽，再叠 margin 就溢出 */
.wrap { display: flex; flex-direction: column; }
.item { width: calc(100% - 20px); margin: 0 10px; }

/* ✅ 留白写在父级 padding，子项 width: 100% */
.wrap { display: flex; flex-direction: column; padding: 0 10px; }
.item { width: 100%; margin: 0; }
```

⚠️ 这与 `box-sizing` **无关**（全局已是 border-box）。
`align-self: stretch` 和 `width: auto` 都无效。

### 7. `position` + `top/left` 定位的元素不能用 `transform: scale` 做尺寸变化

### 8. `flex-wrap: wrap` 会让控制条高度跳变

### 9. 标签宽度不要写死

### 10. 列宽 ≠ 节点宽

时间线的节点被拉成椭圆，因为把"列宽"和"节点宽"绑成了同一个 CSS 属性：

```scss
/* ❌ 22×10 的扁椭圆 */
width: var(--tl-node-col);   /* 22px —— 列宽 */
height: var(--tl-dot);       /* 10px —— 圆点直径 */

/* ✅ 节点保持正方形，用 margin 在列内居中 */
width: var(--tl-dot);
height: var(--tl-dot);
margin-left: calc((var(--tl-node-col) - var(--tl-dot)) / 2);
```

**布局占位和视觉图形必须解耦。**

### 11. grid gap 会切断连续的色带

日期区间底条只铺到格子边缘时，相邻格之间有 2px 白缝。
用 `left/right: -1px` 吃掉 gap。

### 12. 伪元素只有两个，需求超过两个时要换方案

日历格子里：`::before` = 区间色带、`::after` = 端点实心圆，
"今天"的标记就没地方放了。改用**真实元素**（`.wd-calendar__today-bar`）。

## 层级与可见性

### 13. `z-index: -1` 会沉到父级背景之下

区间底条用 `z-index: -1` 被白卡背景完全盖住，看起来"根本没着色"。

**修法**：父级加 `isolation: isolate`，底条用 `0`、图形 `1`、文字 `2`。

### 14. 浮层必须 Teleport

### 15. 多层浮层必须走层栈（`overlay-stack.ts`）

### 16. 面板不能放在带 `overflow` 的滚动容器里

### 17. 组内子控件必须"缴械"自己的焦点环

## 交互与状态

### 18. 受控 / 非受控必须统一走 `controllable.ts`

### 19. 事件类型要统一

### 20. 直播 / 无限值场景（`isLive`）要特殊处理

### 21. 状态机不能用"值的形状"判断阶段

日期区间：用 `start && end` 判断"已完成"是错的 ——
点第一下时 `start === end`，会被误判成已完成，第二次点击走"重新开始"分支。

**修法**：显式记录 `rangePending`，把"选了一半"和"选完了"分开。

> 通用规律：**状态机要有显式状态位**，不要从数据反推当前处于哪个阶段。

### 22. 程序化滚动会触发自己的监听，形成自激循环

时间选择器吸附时 `scrollTo` 会再触发 `scroll` 事件 → 又吸附 → 又 scrollTo。
需要 `programmatic` 标记在程序化滚动期间忽略事件。

### 23. 滚动居中需要首尾占位空间

要让第 i 项滚到容器正中，它上方需要有 `clientHeight/2` 的空间。
没有占位时最大滚动距离不够，算出"居中位置"根本达不到，吸附总落到错误的项上。

⚠️ 用 **padding** 而非占位子元素：子元素写 `height: 50%` 在 flex 容器里
参考的是**内容高度**（实测只有 6px），padding 的百分比稳定参照容器高度。

**读写必须对称**：

```
读：i = round((scrollTop + clientHeight/2 - ITEM_H/2 - PAD) / ITEM_H)
写：scrollTop = PAD + i * ITEM_H + ITEM_H/2 - clientHeight/2
```

## 检查与验证

### 24. `.vue` 里用新的组合式 API，必须同步改 import

忘 import `onMounted` 会让整个组件不渲染。

### 25. 批量改样式：宁可手工，不要写"智能"脚本

### 26. 组件名与样式文件的实际块名可能不一致

### 27. 检查器修完必须验证没有"放水"

```sh
# 注入一个不存在的图标名，确认检查仍然失败
```

修完检查器后**必须注入已知错误**验证它仍会失败，否则等于把刹车拆了。
