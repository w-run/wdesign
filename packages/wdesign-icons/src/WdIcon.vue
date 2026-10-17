<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { opticalFactor } from './optical'
import { getIcon, getIconSync } from './registry'

defineOptions({ name: 'WdIcon' })

const props = withDefaults(
  defineProps<{
    /** 图标名（kebab-case），如 home / layout-grid / fast-forward */
    name: string
    /** 风格：outlined（线性，默认）| filled（实心） */
    variant?: 'outlined' | 'filled'
    /** 尺寸（数字 = px）。这是「光学尺寸」：实际渲染会按图标形状微调 */
    size?: number | string
    /** 简写：填充风格（等价 style="filled"） */
    filled?: boolean
    /**
     * 光学尺寸补偿（默认开启）。
     * 细条类图标（chevron / arrow / dots / minus）结构上填不满画布，
     * 同尺寸并排时会显得偏小；开启后按形状放大一档，视觉更均匀。
     * 设 false 可拿到严格的几何尺寸（如需要像素级对齐）。
     */
    optical?: boolean
  }>(),
  { variant: 'outlined', size: 24, filled: false, optical: true },
)

const svg = ref('')
const resolvedStyle = computed(() => (props.filled ? 'filled' : props.variant))

const factor = computed(() => (props.optical ? opticalFactor(props.name) : 1))

const sizePx = computed(() => {
  const base = typeof props.size === 'number' ? props.size : parseFloat(props.size) || 24
  // 光学补偿只影响渲染尺寸，不改调用方传入的语义尺寸
  return `${Math.round(base * factor.value * 100) / 100}px`
})

/**
 * 取图标：**先同步命中缓存，再异步加载**。
 *
 * 同步优先是为了消除"图标晚一拍"的闪烁 —— 配合 preloadIcons() 预热后，
 * 首帧就能拿到内容。未预热时才退到异步，且结果会进缓存，
 * 同一图标后续渲染全部同步命中。
 */
watchEffect(() => {
  const name = props.name
  const style = resolvedStyle.value

  // 1) 同步命中（已预热 / 已渲染过）
  const hit = getIconSync(name, style)
  if (hit) {
    svg.value = hit
    return
  }

  // 2) 异步加载（未命中）
  let alive = true
  getIcon(name, style).then((raw) => {
    // 组件可能已卸载或 name 已变 —— 丢弃过期结果
    if (alive) svg.value = raw ?? ''
  })
  return () => { alive = false }
})
</script>

<template>
  <span
    class="wd-icon"
    :class="{ 'wd-icon--optical': factor !== 1 }"
    :style="{ width: sizePx, height: sizePx }"
    v-html="svg"
  ></span>
</template>

<style>
.wd-icon {
  display: inline-flex;
  flex: none;
  vertical-align: middle;
}
.wd-icon svg {
  width: 100%;
  height: 100%;
  display: block;
  color: inherit;
}
</style>
