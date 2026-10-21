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
    /**
     * 线条粗细：thin | normal | medium | bold
     *
     * ===== 为什么需要 =====
     * 本库所有图标都是**填充路径**（fill: currentColor），
     * 没有可调的 stroke-width —— 填充图形天生只有一个"粗细"。
     *
     * 实现方式：给填充路径叠一层**同色 stroke**，
     * 让它向外扩一圈，视觉上等于加粗。
     * 配 `paint-order: stroke fill` 保证描边在填充下方，
     * 不会糊住内部细节。
     *
     * 数值按 256 画布换算：
     *   thin   0   （原样）
     *   normal 6   （+2.3%，几乎无感，用于一致性）
     *   medium 12  （+4.7%，明显更实）
     *   bold   20  （+7.8%，小尺寸下也清晰）
     */
    weight?: 'thin' | 'normal' | 'medium' | 'bold'
  }>(),
  { variant: 'outlined', size: 24, filled: false, optical: true, weight: 'medium' },
)

const svg = ref('')
const resolvedStyle = computed(() => (props.filled ? 'filled' : props.variant))

/**
 * 描边宽度（按 256 viewBox 换算）。
 *
 * ⚠️ 只对**填充**图标有意义：本库没有真正的 stroke 图标，
 *    所以这里的 stroke 是"向外扩张"的模拟加粗，
 *    不是描边风的线条。
 */
const WEIGHT_STROKE: Record<string, number> = {
  thin: 0,
  normal: 6,
  medium: 12,
  bold: 20,
}
const strokeWidth = computed(() => WEIGHT_STROKE[props.weight] ?? 0)

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
    :class="[
      { 'wd-icon--optical': factor !== 1 },
      `wd-icon--w-${weight}`,
    ]"
    :style="{
      width: sizePx,
      height: sizePx,
      // 传给 CSS 变量，由样式表统一应用到 svg 内的所有图形
      '--wd-icon-stroke': String(strokeWidth),
    }"
    v-html="svg"
  ></span>
</template>

<style>
/*
 * ⚠️ 这份样式与 src/style.css **必须保持一致**。
 *
 * 为什么两处都要写：
 *   · 这里是"自动路径"—— Vue 的 SFC 机制会随组件注入，无需配置
 *   · style.css 是"显式路径"—— 打包器抽离 style / 手工编译 / SSR
 *     等场景下自动注入可能失效，消费方需要能显式 import
 *
 * 改这里时，同步改 src/style.css。
 */
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

/* 线条加粗：叠同色 stroke 向外扩，详见 style.css 的注释 */
.wd-icon svg :is(path, circle, rect, line, polyline, polygon, ellipse) {
  stroke: currentColor;
  stroke-width: var(--wd-icon-stroke, 0);
  stroke-linejoin: round;
  stroke-linecap: round;
  paint-order: stroke fill;
}
</style>
