// =============================================================
//  WDesign Icons — 光学尺寸补偿表（auto-generated）
//
//  为什么需要
//  ----------
//  SVG 统一画在 256×256 画布上，但「占满画布」＝「看起来一样大」并不成立：
//  `minus` 只有一条横线、`chevron` 是一个尖角，几何包围盒再大，墨迹也只有
//  完整图标的 1/6。同尺寸并排时，细条图标会明显显得偏小偏弱。
//
//  实测数据（595 个图标光栅化到 64×64 统计墨迹覆盖率）：
//    p5 = 0.103 / 中位 0.240 / p95 = 0.577   —— 相差 5.6 倍
//    `outlined/point` 0.021、`outlined/minus` 0.038
//    `filled/message-read` 0.651、`filled/apps` 0.638
//
//  做法
//  ----
//  给每个图标一个渲染系数，WdIcon 用 size × factor 作为实际宽度。
//  分档不是按覆盖率一刀切，而是先按**结构类别**，再用覆盖率细分：
//    1.14  细条/箭尖类（结构上无法填满画布）：chevron / arrow / dots / minus …
//    1.08  其他墨迹偏轻的图标（覆盖率 < 0.13）
//    0.97  实心占满的图标（覆盖率 > 0.55），略收以免显得笨重
//    1.00  其余
//
//  想关闭补偿：<wd-icon :optical="false">
// =============================================================

/** 结构上注定「细」的图标名（不含风格前缀） */
export const OPTICAL_TALL = new Set([
  // 33 个
  'arrow-down', 'arrow-down-left', 'arrow-down-right', 'arrow-left',
  'arrow-right', 'arrow-up', 'arrow-up-left', 'arrow-up-right',
  'check', 'chevron-down', 'chevron-left', 'chevron-left-alt',
  'chevron-left-double-alt', 'chevron-right', 'chevron-right-alt', 'chevron-right-double-alt',
  'chevron-up', 'chevrons-down', 'chevrons-left', 'chevrons-right',
  'chevrons-up', 'command-line', 'dots-drag', 'dots-horizontal',
  'dots-vertical', 'hr-line', 'list', 'menu',
  'minus', 'pause', 'play', 'plus',
  'point',
])

/** 墨迹偏轻（覆盖率 < 0.13），轻微补偿 */
export const OPTICAL_LIGHT = new Set([
  // 20 个
  'activity', 'circle-alt', 'close', 'corner-down-left',
  'corner-down-right', 'corner-left-down', 'corner-left-up', 'corner-right-down',
  'corner-right-up', 'corner-up-left', 'corner-up-right', 'eye-off',
  'git-commit', 'italic', 'maximize', 'minimize',
  'text', 'trending-down', 'trending-up', 'zoom-in-arrow',
])

/** 实心占满（覆盖率 > 0.55），略收 */
export const OPTICAL_HEAVY = new Set([
  // 49 个
  'ad', 'apps', 'arrow-down-circle', 'arrow-right-circle',
  'arrow-up-circle', 'board', 'box-back', 'box-go',
  'box-ok', 'box-prize', 'brackets', 'calculator',
  'cancel', 'check-circle', 'clipboard', 'clock',
  'close-circle', 'develop', 'file', 'file-minus',
  'file-plus', 'folder', 'folder-manage', 'folder-minus',
  'folder-plus', 'folders', 'help-circle', 'id-card',
  'identity', 'image', 'info-circle', 'language',
  'layout-dashboard', 'layout-grid', 'message', 'message-circle',
  'message-read', 'minus-circle', 'minus-square', 'money-bag',
  'monitor', 'pause-circle', 'pip', 'plus-circle',
  'plus-square', 'shopping-bag', 'ticket', 'video',
  'warning-circle',
])

export interface OpticalFactors {
  tall: number
  light: number
  heavy: number
  /** 是否对实心图标做收缩；关掉可让 filled 更「满」 */
  shrinkHeavy?: boolean
}

export const DEFAULT_OPTICAL: Required<OpticalFactors> = {
  tall: 1.14,
  light: 1.08,
  heavy: 0.97,
  shrinkHeavy: true,
}

/**
 * 取图标的缩放系数。
 * @param name 图标名（kebab-case，不带风格前缀）
 * @param opts 可覆盖分档系数
 */
export function opticalFactor(name: string, opts: OpticalFactors = DEFAULT_OPTICAL): number {
  const o = { ...DEFAULT_OPTICAL, ...opts }
  if (OPTICAL_TALL.has(name)) return o.tall
  if (OPTICAL_LIGHT.has(name)) return o.light
  if (o.shrinkHeavy && OPTICAL_HEAVY.has(name)) return o.heavy
  return 1
}
