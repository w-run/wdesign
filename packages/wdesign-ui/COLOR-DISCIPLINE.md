# 设计语言：主色的用量纪律

> 本库主色是**红色**。红色在通用语义里同时代表 danger。
> 用多了，普通操作会被读成警告 —— 这是本库最需要克制的部分。

## 一、主色只出现在「必须引导视线」的位置

允许用 `--wd-red` / `--wd-tint-*` 的场景：

| 场景 | 例子 |
|---|---|
| 主操作按钮 | `wd-btn--primary` |
| 当前状态 / 进度 | `steps--process`、进度条已播放段 |
| 错误 / 危险语义 | `alert--danger`、`result--error`、`tag--danger` |
| 选中态**的唯一标记** | `select` 的勾选图标、`timeline` 的活动节点 |
| 品牌标识 | logo、`sec-eyebrow` 装饰短线 |

不允许的场景：

| 反例 | 正确做法 |
|---|---|
| 普通 hover 底 | `--wd-field-hover`（中性灰） |
| 次级按钮默认底 | `ghost` 变体（透明底） |
| 列表项悬停 | `--wd-field-hover` |
| 输入框背景 | `--wd-field` |
| 轨道 / 骨架 / 分隔 | `--wd-ink-5`、`--wd-tint-3`（中性） |
| 头像占位底 | `--wd-field` |
| 下拉选项选中底 | `--wd-field` + 加粗 + 勾选图标 |

## 二、令牌区分

```
红色族（语义：品牌 / 强调 / 危险）
  --wd-red           主色
  --wd-red-text      红色文字（已调过对比度）
  --wd-red-on-dark   深底上的红
  --wd-tint-1..4     红色浅底，逐级加深

中性族（语义：结构 / 交互反馈）
  --wd-field         控件底
  --wd-field-hover   控件悬停底
  --wd-bg            页面底
  --wd-ink-1..5      文字与描边，5 最弱
```

**判断方法**：问一句「这个颜色在传达'注意/错误/品牌'，还是只在表达'这里有个结构'？」
后者一律用中性族。

## 三、圆角：可点击控件优先胶囊

| 元素类型 | 圆角 |
|---|---|
| 可点击控件（按钮 / 输入 / 选择 / 下拉触发器 / 标签 / 页码 / 小选择器） | `--wd-radius-pill` |
| 色值指示器 | `50%`（圆形，与方形色板形成区分） |
| 内容块（卡片 / 面板 / 浮层 / 详情区） | `--wd-radius-md` |
| 小面积容器（tag 内部、缩略图） | `--wd-radius-sm` / `xs` |

判据：**它会不会被点？** 会 → 胶囊；不会 → 按面积选 md/sm。

## 四、尺寸必须走令牌

```
--wd-size-sm  34px
--wd-size-md  44px
--wd-size-lg  56px
```

不许在组件里硬编码 32/40/48px。曾有 Cascader 写死 32/40/48，
与 Input/Select 的 34/44/56 并排时高度差 4~8px，肉眼可见。

## 五、自查命令

```sh
# 淡红底是否出现在不该出现的地方
grep -rn "var(--wd-tint-[12])" src/styles/components/*.scss

# 是否有硬编码控件高度
grep -rn "height: 3[0-9]px\|height: 4[0-9]px\|height: 5[0-9]px" src/styles/components/*.scss

# 是否有非胶囊的可点击控件圆角
grep -rn "border-radius: var(--wd-radius-xs)" src/styles/components/*.scss
```
