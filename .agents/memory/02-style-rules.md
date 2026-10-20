# 02 · 样式与组件写法

## SCSS 硬规则

### 颜色只走 token

组件样式只允许 `var(--wd-*)`。仅两类刻意保留的硬编码：

1. `#fff` —— 品牌 / 深色表面上的文字与图标
2. markdown 的 hljs 语法色板（VS Code Dark 固定配色，已在 `_markdown.scss` 标注）

### ⚠️ 不要给 `var()` 加 fallback

```scss
/* ❌ 令牌名写错时会悄悄用兜底值，看起来"生效了" */
color: var(--wd-ink-2, #445);

/* ✅ 缺什么令牌就去加 */
color: var(--wd-ink-2);
```

fallback 会**掩盖令牌名写错**的问题 —— 这是静默失效最常见的来源。

### 其它

- 阴影统一用阶梯 token：`--wd-shadow-sm / default / hover / pop / lg / knob`
- BEM 命名：`.wd-block__elem--mod`
- 原子基础件：`.wd-dot` `.wd-icon-btn` `.wd-chevron`（+ 修饰符）
- 属性顺序：定位 / 布局 → 盒模型 → 视觉 → 文字 → 动效
- 2 空格缩进；文件以换行结尾；无行尾空格、无 TAB
- **一个文件只放一个组件**。曾把两个组件塞进同一 scss（243 行），改一处误伤另一处。

## Vue SFC 硬规则

- `defineOptions({ name: 'WdXxx' })` 置于脚本开头
- props 用 TS 接口 + `withDefaults`；事件用 `defineEmits` 类型化声明
- 状态顺序：`ref/computed` → 方法
- **`style` 禁止作为 prop 名**（保留给 HTML style 属性）
- 交互型组件显式声明事件并自根元素冒泡，不依赖 attrs 回退
- 模板类名与 SCSS 一一对应
- **事件名用 kebab-case**（`change-episode` / `row-click`），不用 camelCase

### `size` 统一为 `sm | md | lg`

不要新增 `xs` / `xl`，也不要只实现其中两档。

### 共用逻辑必须抽模块

| 模块 | 职责 |
|---|---|
| `overlay.ts` | 滚动锁定、焦点陷阱 |
| `overlay-stack.ts` | 多层浮层层栈 |
| `anchor.ts` | 定位、外部点击 |
| `controllable.ts` | 受控 / 非受控 |
| `time.ts` | 时间格式化 |

不要在组件里各写一份。

## 布局：数字与附属信息的关系

日期类组件的单元格遵循这套模型（已踩坑多次才稳定）：

```
      ⑧ ← 右上角标记点（绝对定位，不占位）
   ┌─────┐
   │  15 │ ← 数字永远在格子**正中心**
   │ 初二 │ ← 底部文字（绝对定位，不占位）
   └─────┘
```

**原则：所有附加信息都用绝对定位浮层，不参与布局。**

这样所有格子天然等高、数字天然对齐，翻月不跳动。
用 `padding-bottom` 或 `transform` 位移都会让"有信息的格子"和"没信息的格子"产生尺寸差异。
