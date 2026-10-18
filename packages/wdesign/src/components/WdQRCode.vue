<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { encodeQr } from './qrcode'

defineOptions({ name: 'WdQRCode' })

const props = withDefaults(
  defineProps<{
    /**
     * 要编码的内容（URL / 文本 / 短 JSON）。
     *
     * ⚠️ 不叫 `value`：Vue 3 把 `value` 当作表单元素的默认模型 prop，
     * 在 DOM 内模板（浏览器直接解析 HTML）场景下会和原生属性打架。
     * 用 `text` 更明确，也避免使用者误以为支持 v-model。
     */
    text?: string
    /** 渲染尺寸（px），正方形 */
    size?: number
    /** 纠错等级：L 7% / M 15% / Q 25% / H 30% */
    level?: 'L' | 'M' | 'Q' | 'H'
    /** 静区宽度（模块数） */
    margin?: number
    /** 深色模块颜色 */
    color?: string
    /** 背景色（必须比 color 亮，否则扫不出来） */
    background?: string
    /** 中心留空直径（占尺寸的百分比，用于叠 logo） */
    centerBlank?: number
    /** 显示加载骨架 */
    loading?: boolean
  }>(),
  {
    text: '',
    size: 160,
    level: 'M',
    margin: 2,
    color: '#191B1F',
    background: '#FFFFFF',
    centerBlank: 0,
    loading: false,
  },
)

const emit = defineEmits<{ error: [message: string] }>()

/**
 * 渲染方式用 SVG，不用 Canvas。
 *
 * 理由：
 *   · 矢量：任意缩放/高分屏都清晰，Canvas 需要处理 DPR
 *   · 可被 CSS 控制（currentColor 之类），也方便截图工具
 *   · 打印场景下 SVG 质量明显更好
 *   · DOM 节点数 = 模块数，但通过 path 合并成一条，实际只有 1 个 <path>
 */
const result = computed(() => {
  if (!props.text) return null
  const r = encodeQr(props.text, props.level)
  if (!r) {
    emit('error', '内容过长，无法生成二维码')
    return null
  }
  return r
})

/**
 * 把矩阵合并成单条 path。
 *
 * 每个黑模块画一个 1×1 的方块，全部拼进一个 `d` 属性 ——
 * 比创建上千个 <rect> 快得多，内存也小。
 * 用 `M x y h1 v1 h-1 z` 这种紧凑写法，比 `M x y L ...` 短一半。
 */
const pathData = computed(() => {
  const r = result.value
  if (!r) return ''
  const parts: string[] = []
  for (let row = 0; row < r.size; row++) {
    for (let col = 0; col < r.size; col++) {
      if (r.matrix[row][col]) {
        parts.push(`M${col} ${row}h1v1h-1z`)
      }
    }
  }
  return parts.join('')
})

const totalSize = computed(() => result.value ? result.value.size + props.margin * 2 : 0)

const svgStyle = computed(() => ({
  width: props.size + 'px',
  height: props.size + 'px',
  background: props.background,
}))

/** 中心留空的半径（百分比 → 模块单位） */
const blankR = computed(() => {
  if (!props.centerBlank || !totalSize.value) return 0
  return (totalSize.value * Math.min(props.centerBlank, 40)) / 200
})

const failed = ref(false)
watch(
  () => props.text,
  () => { failed.value = false },
)

onBeforeUnmount(() => {})
</script>

<template>
  <div class="wd-qrcode" :style="{ width: size + 'px', height: size + 'px' }">
    <!-- 加载态：与最终尺寸一致的骨架，避免布局跳动 -->
    <div v-if="loading" class="wd-qrcode__skeleton" :style="{ width: size + 'px', height: size + 'px' }"></div>

    <div v-else-if="!result" class="wd-qrcode__empty">
      无内容
    </div>

    <svg
      v-else
      class="wd-qrcode__svg"
      :style="svgStyle"
      :viewBox="`0 0 ${totalSize} ${totalSize}`"
      :width="size"
      :height="size"
      shape-rendering="crispEdges"
      role="img"
      :aria-label="`二维码：${text}`"
    >
      <!-- 静区：必须是纯背景色，否则边界识别会失败 -->
      <rect :width="totalSize" :height="totalSize" :fill="background" />

      <g :transform="`translate(${margin} ${margin})`">
        <path :d="pathData" :fill="color" />

        <!--
          中心挖空：先画一个背景色圆形盖住，再让使用者用插槽叠 logo。
          用「遮盖」而不是「挖洞」，是因为 path 里做布尔运算太复杂，
          而且二维码中间本来就是纠错码区域，遮掉一部分不影响识别。
        -->
        <circle
          v-if="blankR > 0"
          :cx="result.size / 2"
          :cy="result.size / 2"
          :r="blankR"
          :fill="background"
        />
      </g>
    </svg>

    <!-- 中心插槽：叠在 SVG 之上，绝对定位居中 -->
    <div v-if="$slots.center && result" class="wd-qrcode__center">
      <slot name="center" />
    </div>
  </div>
</template>
