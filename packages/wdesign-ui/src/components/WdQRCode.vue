<script setup lang="ts">
import { computed } from 'vue'
import { encodeQr } from './qrcode'

defineOptions({ name: 'WdQRCode' })

const props = withDefaults(
  defineProps<{
    /**
     * 要编码的内容（URL / 文本 / 短 JSON）。
     *
     * ⚠️ 不叫 `value`：Vue 3 把 `value` 当作表单元素的默认 model prop，
     * 在 DOM 内模板场景下会和原生属性打架。
     */
    text?: string
    /** 渲染尺寸（px），正方形 */
    size?: number
    /** 纠错等级：L 7% / M 15% / Q 25% / H 30% */
    level?: 'L' | 'M' | 'Q' | 'H'
    /** 静区宽度（模块数） */
    margin?: number
    /**
     * 模块样式：
     *  square — 经典方块（默认）
     *  dot    — 圆点
     *  liquid — 水滴黏连：相邻模块圆角相接，形成连续的"墨迹"
     */
    moduleStyle?: 'square' | 'dot' | 'liquid'
    /** 深色模块颜色 */
    color?: string
    /** 背景色（必须比 color 亮，否则扫不出来） */
    background?: string
    /**
     * 中心挖空直径占「模块尺寸」的百分比。
     * 0 表示不挖空；有 logo 时配合挖空使用。
     */
    centerBlank?: number
    /** 是否启用加载骨架 */
    loading?: boolean
  }>(),
  {
    text: '',
    size: 160,
    level: 'M',
    margin: 2,
    moduleStyle: 'square',
    color: '#191B1F',
    background: '#FFFFFF',
    centerBlank: 0,
    loading: false,
  },
)

const emit = defineEmits<{
  /** 编码失败时触发，参数为错误说明（如内容过长），此时二维码不渲染 */
  error: [message: string]
}>()

const result = computed(() => {
  if (!props.text) return null
  const r = encodeQr(props.text, props.level)
  if (!r) {
    emit('error', '内容过长，无法生成二维码')
    return null
  }
  return r
})

/* ---------------- 中心挖空 ---------------- */
/**
 * 中心挖空半径（模块单位）。
 *
 * 关键在于：挖空必须**逐模块判断**，把落在圆内的模块从矩阵里剔除，
 * 而不是在上面盖一个圆形色块。
 *
 * ⚠️ 为什么不能用「盖色块」：
 *   盖章只能遮住视觉，底下的模块仍在数据区里；
 *   一旦 logo 本身有透明边缘，或导出为无背景的 PNG/SVG，
 *   被"遮住"的模块就会露出来，形成与 logo 重叠的噪点。
 *   真正从矩阵里剔除模块，才能保证任何背景下都干净。
 *
 * 剔除后靠纠错码兜底：只要剔除面积在纠错能力内（H 级约 30%），
 * 二维码仍可正常识别。
 */
const blankR = computed(() => {
  const r = result.value
  if (!r || !props.centerBlank) return 0
  // 百分比是相对「模块边长」算的
  return (r.size * Math.min(props.centerBlank, 40)) / 200
})

/** 该模块是否落在中心挖空圆内 */
function inBlank(row: number, col: number): boolean {
  const radius = blankR.value
  if (radius <= 0) return false
  const r = result.value
  if (!r) return false
  const cx = r.size / 2
  const cy = r.size / 2
  // 用模块中心点判断，避免边缘模块被切一半
  const dx = col + 0.5 - cx
  const dy = row + 0.5 - cy
  return dx * dx + dy * dy <= radius * radius
}

/* ---------------- 三种模块样式 ---------------- */
const pathData = computed(() => {
  const r = result.value
  if (!r) return ''

  if (props.moduleStyle === 'dot') {
    // 圆点：每模块一个 circle，半径略小于 0.5（留缝隙，扫描更稳）
    const parts: string[] = []
    const rad = 0.48
    for (let row = 0; row < r.size; row++) {
      for (let col = 0; col < r.size; col++) {
        if (!r.matrix[row][col] || inBlank(row, col)) continue
        const cx = col + 0.5
        const cy = row + 0.5
        // 圆用两段弧表示：M cx-r cy A r r 0 1 0 cx+r cy A r r 0 1 0 cx-r cy
        parts.push(
          `M${cx - rad} ${cy}a${rad} ${rad} 0 1 0 ${rad * 2} 0a${rad} ${rad} 0 1 0 ${-rad * 2} 0`
        )
      }
    }
    return parts.join('')
  }

  if (props.moduleStyle === 'liquid') {
    /*
     * 水滴黏连：每个模块画成圆角矩形，圆角大小取决于四邻。
     *  · 四邻都是黑 → 直角（完全连通）
     *  · 孤立      → 圆角（近似圆形）
     *  · 单边相连  → 该边为直角，其余角圆
     * 这样相邻模块的圆角在接缝处对齐，视觉上连成一片"墨迹"。
     */
    const parts: string[] = []
    /*
     * 圆角半径 0.5 = 模块的半边长，四角相接时正好合成圆弧。
     * 孤立模块因此接近圆形；两个相邻模块的直角边贴在一起，
     * 形成连续的"墨迹"——这就是水滴黏连的效果。
     * 之前用 0.42，圆角太小，看起来仍是方块。
     */
    const R = 0.5
    const isOn = (row: number, col: number) => {
      if (row < 0 || col < 0 || row >= r.size || col >= r.size) return false
      if (!r.matrix[row][col]) return false
      return !inBlank(row, col)
    }

    const rr = (row: number, col: number): [number, number, number, number] => {
      const up = isOn(row - 1, col)
      const dn = isOn(row + 1, col)
      const lf = isOn(row, col - 1)
      const rt = isOn(row, col + 1)
      // [左上, 右上, 右下, 左下] —— 相邻方向为直角
      return [
        up || lf ? 0 : R,
        up || rt ? 0 : R,
        dn || rt ? 0 : R,
        dn || lf ? 0 : R,
      ]
    }

    for (let row = 0; row < r.size; row++) {
      for (let col = 0; col < r.size; col++) {
        if (!r.matrix[row][col] || inBlank(row, col)) continue
        const [tl, tr, br, bl] = rr(row, col)
        const x = col
        const y = row
        // 圆角矩形路径（四个角半径可不同）
        parts.push(
          `M${x + tl} ${y}` +
          `H${x + 1 - tr}` +
          (tr ? `A${tr} ${tr} 0 0 1 ${x + 1} ${y + tr}` : '') +
          `V${y + 1 - br}` +
          (br ? `A${br} ${br} 0 0 1 ${x + 1 - br} ${y + 1}` : '') +
          `H${x + bl}` +
          (bl ? `A${bl} ${bl} 0 0 1 ${x} ${y + 1 - bl}` : '') +
          `V${y + tl}` +
          (tl ? `A${tl} ${tl} 0 0 1 ${x + tl} ${y}` : '') +
          'Z'
        )
      }
    }
    return parts.join('')
  }

  // square：经典方块，合并成一条 path
  const parts: string[] = []
  for (let row = 0; row < r.size; row++) {
    for (let col = 0; col < r.size; col++) {
      if (!r.matrix[row][col] || inBlank(row, col)) continue
      parts.push(`M${col} ${row}h1v1h-1z`)
    }
  }
  return parts.join('')
})

const totalSize = computed(() => (result.value ? result.value.size + props.margin * 2 : 0))

const svgStyle = computed(() => ({
  width: props.size + 'px',
  height: props.size + 'px',
  background: props.background,
}))
</script>

<template>
  <div class="wd-qrcode" :style="{ width: size + 'px', height: size + 'px' }">
    <div v-if="loading" class="wd-qrcode__skeleton" :style="{ width: size + 'px', height: size + 'px' }"></div>

    <div v-else-if="!result" class="wd-qrcode__empty">无内容</div>

    <svg
      v-else
      class="wd-qrcode__svg"
      :style="svgStyle"
      :viewBox="`0 0 ${totalSize} ${totalSize}`"
      :width="size"
      :height="size"
      :shape-rendering="moduleStyle === 'square' ? 'crispEdges' : 'geometricPrecision'"
      role="img"
      :aria-label="`二维码：${text}`"
    >
      <rect :width="totalSize" :height="totalSize" :fill="background" />

      <g :transform="`translate(${margin} ${margin})`">
        <path :d="pathData" :fill="color" />
      </g>
    </svg>

    <!-- 中心插槽：叠在 SVG 之上，绝对定位居中 -->
    <div
      v-if="$slots.center && result"
      class="wd-qrcode__center"
      :style="centerBlank ? { width: `calc(${size}px * ${centerBlank / 100}), maxWidth: none` } : undefined"
    >
      <slot name="center" />
    </div>
  </div>
</template>
