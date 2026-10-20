# @w-run/wdesign-ui

Vue3 + SCSS 组件库。**76 个组件**、141 个设计令牌、全量样式与按需样式入口，
配套图标库 [`@w-run/wdesign-icons`](../icons)。

> 代码约定与写法硬规则见 [CONVENTIONS.md](./CONVENTIONS.md)；
> 令牌清单见 [TOKENS.md](./TOKENS.md)；
> 只发 ESM，`dist/` 由 `tools/build-lib.mjs` 生成。

## 设计四原则（硬规则）

1. **主题色 `#D62839`** —— 红只做点缀，界面红色面积 ≤ 10%
2. **不用硬边框 / 分割线** —— 区域只用色块分层 + 留白区分
3. **圆润优先** —— 大圆角、胶囊、软几何
4. **留白、极简** —— 少色、少元素、一屏一个焦点

### 区域分层

| 层 | 色值 | 用途 |
|---|---|---|
| L0 页面底 | `#F7F8FA` | 画布 |
| L1 卡片 | `#FFFFFF` + 单层阴影 | 内容容器 |
| L2 浅色块 | `#FBEAEB`（更浅 `#FDF2F3`） | 高亮 / 选中 / 次级按钮 |
| L3 主题红 | `#D62839` | 主按钮 / 关键数据 / 进度 |
| L4 深色锚点 | `#1C1C1C` / `#2F2F2F` | 深色卡 · 两级（锚点 / 浮层） |

浅色与深色主题的**主题色都是 `#D62839`**，只换底与文字，不换红。

## 安装与使用

```bash
npm i @w-run/wdesign-ui @w-run/wdesign-icons
npm i -D sass          # 只有要用源码 scss 时才需要
```

```ts
import { createApp } from 'vue'
import { WdButton, WdIcon } from '@w-run/wdesign-ui'
import '@w-run/wdesign-ui/style'        // 全量样式（推荐）
import '@w-run/wdesign-icons/style.css'

const app = createApp(App)
app.component('WdButton', WdButton)
app.component('WdIcon', WdIcon)
app.mount('#app')
```

```vue
<WdButton variant="primary" size="lg">主按钮</WdButton>
<WdIcon name="heart" :size="28" />
```

### 样式入口

| 入口 | 内容 |
|---|---|
| `@w-run/wdesign-ui/style` | 全量（令牌 + 字体 + base + 全部组件 + 深色） |
| `@w-run/wdesign-ui/style/button` | 单个组件原子件（需自己先引令牌） |

自己拼装时按这个顺序：

```scss
@use '@w-run/wdesign-ui/style/tokens';   // :root { --wd-* }，全站只发射一次
@use '@w-run/wdesign-ui/style/fonts';    // @font-face
@use '@w-run/wdesign-ui/style/base';     // reset + 滚动条 + reduced-motion
@use '@w-run/wdesign-ui/style/button';   // 你真正用到的组件
```

> ⚠️ 原子件只引用 `var(--wd-*)`，自己**不发射**变量。跳过 `tokens` 会得到一份
> 「颜色全部失效但样式表照样加载」的产物 —— 不报错、不告警，最难查的一类问题。

## 组件一览

### 基础

| 组件 | 说明 |
|---|---|
| `WdButton` | 按钮：`variant` primary/tint/dark/ghost；`size` lg/md/sm；`iconOnly`、`block`、`loading` |
| `WdTag` | 标签：`variant` tint/gray/dark；`dot` |
| `WdBadge` | 徽标：`value`、`dot`、`max`、`tone` |
| `WdAvatar` / `WdAvatarGroup` | 头像 / 头像堆叠：`tone` 0–3 明度档（0 = 按名字自动）、`max` |
| `WdDivider` | 分隔：水平/垂直、带文字对齐、虚线 |
| `WdSpace` | 间距容器：`size`、`direction`、`between`、`grow` |
| `WdGrid` | 网格：`columns`（数字或 `auto`）、`gap` |
| `WdContainer` | 版心：`maxWidth`、`pad` |
| `WdCard` | 卡片：`variant` default/tint/dark、`padding`、`hoverable` |
| `WdGroup` | 控件组：capsule/joined/inset，自动压掉子项外框 |

### 表单

| 组件 | 说明 |
|---|---|
| `WdInput` | 输入框：`shape` pill/rounded、`clearable`、`showCount`；`#icon` / `#suffix` |
| `WdSelect` | 选择：单选/多选、`filterable`、`maxTagCount` |
| `WdCascader` | 级联：`options` 树、`changeOnSelect` |
| `WdCheckbox` / `WdSwitch` / `WdRadioGroup` | 勾选 / 开关 / 单选组，均支持受控与非受控 |
| `WdSegmented` | 分段控制：`tone` light/dark、`overflow` wrap/scroll/auto |
| `WdSlider` | 滑杆：`min`/`max`/`step`、`showValue` |
| `WdRate` | 评分：`count`、`clearable`、自定义 `icon` |
| `WdColorPicker` | 取色：`presets`、`editable` |
| `WdOtp` | 验证码：separate/pill/underline，自动前进/回退/粘贴 |
| `WdMentions` | @ 提及：`users`、`trigger` |
| `WdUpload` | 上传：拖拽 + 进度、`maxCount`/`maxSize` |
| `WdTransfer` | 穿梭框：`data`、`filterable` |
| `WdForm` / `WdFormItem` | 表单：`rules` 校验、`labelPosition`、`scrollToError` |
| `WdDatePicker` / `WdTimePicker` / `WdDateTimePicker` / `WdCalendar` | 日期、时间、日期时间、日历（区间 + 标记 + 底部文字） |
| `WdSortableList` | 拖动排序（HTML5 拖拽） |

### 数据展示

| 组件 | 说明 |
|---|---|
| `WdTable` | 表格：排序、勾选、展开行、树形、`maxHeight` 吸顶；`#cell-<key>` 插槽 |
| `WdTree` | 树：`checkable`、`cascade`、自定义 `#label`/`#icon`/`#extra` |
| `WdVirtualList` | 虚拟列表：只渲染可视区，万级数据不卡 |
| `WdPagination` | 分页：`simple`、`showSizeChanger` |
| `WdDescriptions` | 描述列表：`columns`、`vertical`、`striped` |
| `WdStatistic` | 数值：`precision`、`separator`、进场滚动 |
| `WdTimeline` | 时间线：vertical/alternate/horizontal、`collapsible` |
| `WdCollapse` | 折叠：`accordion`、`#item-<i>` 插槽 |
| `WdTabs` | 页签：`closable`、`addable`、`scrollable` |
| `WdSteps` | 步骤条：`current` |
| `WdProgress` | 进度：`thin`、`onDark`、自定义色 |
| `WdSkeleton` | 骨架：text/rect/circle、`count` |
| `WdEmpty` / `WdResult` | 空状态 / 结果页 |
| `WdExplorer` | 资源管理器：详情 / 图标双视图 |
| `WdFileList` | 文件树列表 |
| `WdScrollbar` | 自定义滚动条：`always`、`native` 兜底 |
| `WdSplitter` | 分栏：横向/纵向拖拽，`resize` / `resizeEnd` |

### 反馈

| 组件 | 说明 |
|---|---|
| `WdAlert` | 提示条：info/success/warning/danger、`closable` |
| `WdModal` / `WdDrawer` | 模态框 / 抽屉：Teleport + 焦点陷阱 + 层栈 |
| `WdNotification` | 通知横幅 |
| `toast()` | 命令式轻提示：`toast.success / warning / danger`，最多堆 4 条 |
| `WdPopconfirm` / `WdPopover` / `WdTooltip` / `WdDropdown` | 气泡类，走 `anchor` 定位 + 外部点击 |
| `WdSpinner` | 加载圈：`size` sm/md/lg 或像素值 |

### 导航

| 组件 | 说明 |
|---|---|
| `WdNav` | 导航：横栏/竖栏、`collapsed`、`iconOnly`、`sticky`、**分组可折叠**（`collapsibleGroups` + `defaultCollapsedGroups`，active 落到收起分组会自动展开并滚入视野） |
| `WdBreadcrumb` | 面包屑：`items`、`separator` |
| `WdCommand` | 命令面板（⌘K）：分组、快捷键、远程 `search` |
| `WdAffix` / `WdBacktop` | 吸附 / 回到顶部 |

### 媒体

| 组件 | 说明 |
|---|---|
| `WdCarousel` | 轮播：自动播放、圆点、箭头、无缝循环 |
| `WdImagePreview` | 灯箱：缩放、旋转、上一张/下一张 |
| `WdAudioPlayer` | 音频：card/bar/mini 三形态、波形、反色卡 |
| `WdVideoPlayer` | 视频：点播/直播、选集、倍速、画中画、弹幕 |
| `WdDanmaku` | 弹幕层：`items` / `src`（B 站 XML）/ `raw` |
| `WdMediaCard` | 媒体卡：`layout`（overlay/stacked）× `mediaMode`（cover/inset）两个正交维度 |

### 内容与其他

| 组件 | 说明 |
|---|---|
| `WdMarkdown` | Markdown 渲染：内置解析器 + hljs 深色代码配色 |
| `WdAiMessage` | AI 消息：正文与思考链分离、流式输出、`actions` |
| `WdPostItem` / `WdListItem` | 文章条目 / 列表行 |
| `WdQRCode` | 二维码：dot/liquid 模块样式、中心挖空放 logo |
| `WdWatermark` | 水印：文字/图片、旋转、间距 |

## 令牌与主题

```css
:root {
  --wd-red: #E5484D;      /* 换主题色 */
  --wd-tint-2: #FDECEC;   /* 浅色块 */
  --wd-radius-lg: 20px;   /* 收紧圆角 */
}
```

- 组件样式**只引用 `var(--wd-*)`**，且**不写 fallback** —— 令牌名写错时要立刻失效，
  而不是被兜底值掩盖（理由见 CONVENTIONS）。
- 深色：`<html data-theme="dark">` 整套翻转，**主题红不变**。

## 字体

- 拉丁 **Mona Sans**、中文 **思源黑体 / Source Han Sans SC**，均为 VF 可变字体（wght 200–900），
  默认从 `https://box.w-run.net/npm/fonts` 加载。
- 离线 / 内网：自己写 `@font-face` 并把 `$wd-vf-fonts-enabled` 置 `false`（必须在 import 之前），
  避免多请求一次 CDN。VF 文件就在本包 `fonts/` 下。
- **WDesignSans**（自托管分段字体）仍是 WIP，默认关闭（`$wd-wdsans-enabled`）：
  文件不在本仓库，宿主托管好再打开。

## 检查器

```sh
npm run verify    # check:tokens + check:icons + typecheck + smoke-test
```

冒烟测试（403 项）覆盖的结构性断言：组件可编译 / `defineOptions.name` / 事件名 kebab-case /
无手写 `<svg>` / 浮层 Teleport / `transition` 有 `:duration` 兜底 / 令牌与图标名存在 /
模板用到的 BEM 类名有定义 / **组件内部引用别的组件必须自己 import** /
**全量样式入口收全每个原子件** / `box-sizing` 声明唯一。

> 修完检查器**必须注入一个已知错误验证它仍然会失败**，否则等于把刹车拆了。

## 演示

演示站是独立包 [`../wdesign-demo`](../wdesign-demo)：`pnpm dev` 起在 `:5273`，
76 个组件一页一个，通过 alias 直连本包源码，改组件即时生效。

## License

MIT
