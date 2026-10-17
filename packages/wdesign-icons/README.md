# wdesign-icons

**WDesign 图标库** — Soft Bento · Red 配套。
595 个 SVG 文件（filled 164 / outlined 431），431 个唯一名称；全部 **256×256 · currentColor · kebab-case**。

## 目录
```
wdesign-icons/
├── icons/
│   ├── filled/      # 实心（164）
│   └── outlined/    # 线性（431）
├── icons.json       # 清单（名称 / 风格 / 尺寸）
├── icons.data.js    # 全量内联数据（非构建环境用，window.WD_ICONS）
├── src/
│   ├── WdIcon.vue   # Vue3 组件（Vite 环境自动加载）
│   └── index.ts
└── MIGRATION.md     # 命名规范化记录（旧名 → 新名）
```

## 使用（Vue3 + Vite）
保持与 `wdesign/` 同级目录：
```ts
import { WdIcon } from 'wdesign-icons'
```
```vue
<WdIcon name="home" />
<WdIcon name="bell" filled :size="28" />
<WdIcon name="heart" :size="32" style="color: var(--wd-red)" />
```
图标颜色 = `currentColor`，由 CSS `color` 驱动（红 / 墨色 / 深底白字零成本切换）。

## 使用（非构建环境 / 纯 HTML）
```html
<script src="wdesign-icons/icons.data.js"></script>
<script>
  document.querySelectorAll('[data-icon]').forEach((el) => {
    el.innerHTML = window.WD_ICONS['outlined/' + el.dataset.icon] || ''
    el.style.cssText += ';display:inline-flex;width:24px;height:24px'
  })
</script>
```

## 命名规范
- 全小写 kebab-case：`arrow-left-circle`
- 语义后缀：`-off`（禁用）、`-plus / -minus`（增删）、`-alt`（变体）、`-circle / -square`（外框）
- 无冗余前缀（无 `icon-`），无游离编号
- 全部变更记录见 [MIGRATION.md](./MIGRATION.md)

## 光学尺寸补偿（Optical Sizing）

SVG 统一画在 256×256 画布上，但**「占满画布」不等于「看起来一样大」**：
`minus` 只有一条横线，`chevron` 是一个尖角 —— 几何包围盒再大，墨迹也只有完整图标的 1/6。
同尺寸并排时，细条图标会明显显小显弱。

### 实测数据（595 个图标光栅化到 64×64，统计墨迹覆盖率）

| 分位 | 覆盖率 |
|---|---|
| p5 | 0.103 |
| 中位 | 0.240 |
| p95 | 0.577 |

最轻 `outlined/point` **0.021**、`outlined/minus` 0.038；
最重 `filled/message-read` **0.651** —— 相差约 30 倍。

### 分档（先按结构类别，再用覆盖率细分）

| 系数 | 适用 | 数量 |
|---|---|---|
| **1.14** | 细条/箭尖类：`chevron*` / `arrow*` / `dots*` / `minus` / `plus` / `check` / `pause` / `play` / `menu` / `list` … | 33 |
| **1.08** | 其他墨迹偏轻（覆盖率 < 0.13） | 20 |
| **0.97** | 实心占满（> 0.55），略收以免显得笨重 | 49 |
| 1.00 | 其余 | 493 |

效果：覆盖率离散度（p95−p5）**0.474 → 0.419**。

### 用法

```vue
<wd-icon name="chevron-right" :size="24" />                    <!-- 实际渲染 27.4px -->
<wd-icon name="chevron-right" :size="24" :optical="false" />   <!-- 严格几何尺寸 -->
```

补偿只影响**渲染尺寸**，不改调用方传入的语义 `size`。
需要像素级对齐（图标与文字基线严格对齐）时可关闭。

数据源：`src/optical.js`（三档清单 + `opticalFactor()`）；
覆盖率缓存 `.ink-cache.json`；`python3 tools/icon-audit.py` 校验清单一致性。

## 规范
- 画布：**256 × 256**（已统一，含 32 个历史 257 宽文件）
- 颜色：**currentColor**（已统一，去除硬编码 black）
- 许可：请按原图标集授权使用
