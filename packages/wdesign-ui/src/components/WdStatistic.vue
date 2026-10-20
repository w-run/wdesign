<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'WdStatistic' })

const props = withDefaults(
  defineProps<{
    /** 目标数值 */
    value?: number
    /** 标题 */
    title?: string
    /** 前缀 / 后缀（货币符号、单位） */
    prefix?: string
    /** 后缀（紧跟数字后的单位、百分号） */
    suffix?: string
    /** 小数位 */
    precision?: number
    /** 千分位分隔 */
    separator?: boolean
    /** 进场时滚动到目标值（false 则直接显示） */
    animated?: boolean
    /** 滚动时长（ms） */
    duration?: number
  }>(),
  {
    value: 0,
    title: '',
    prefix: '',
    suffix: '',
    precision: 0,
    separator: true,
    animated: true,
    duration: 900,
  },
)

/** 当前显示的数值（动画过程中在变） */
const shown = ref(props.animated ? 0 : props.value)

let raf = 0
let startAt = 0
const from = ref(0)

const REDUCE = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let fallback: number | undefined

function animateTo(to: number) {
  cancelAnimationFrame(raf)
  if (fallback) window.clearTimeout(fallback)
  if (!props.animated || REDUCE()) {
    shown.value = to
    return
  }
  from.value = shown.value
  startAt = 0

  /**
   * ⚠️ requestAnimationFrame 在动画时钟停摆时完全不回调
   * （后台标签页 / 无头渲染 / 系统减弱动效），数字会永远停在起始值。
   * 因此额外挂一个 setTimeout 兜底：到时无论如何落到目标值。
   */
  fallback = window.setTimeout(() => {
    cancelAnimationFrame(raf)
    shown.value = to
  }, props.duration + 120)

  const step = (ts: number) => {
    if (!startAt) startAt = ts
    const t = Math.min(1, (ts - startAt) / props.duration)
    // easeOutExpo：先快后缓，数字滚动看起来更自然
    const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    shown.value = from.value + (to - from.value) * e
    if (t < 1) raf = requestAnimationFrame(step)
    else {
      shown.value = to
      if (fallback) { window.clearTimeout(fallback); fallback = undefined }
    }
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  if (props.animated) animateTo(props.value)
  else shown.value = props.value
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  if (fallback) window.clearTimeout(fallback)
})

watch(() => props.value, (v) => animateTo(v))

/** 格式化：小数位 + 千分位 */
const text = computed(() => {
  const fixed = Math.abs(shown.value).toFixed(props.precision)
  let [int, dec] = fixed.split('.')
  if (props.separator) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const sign = shown.value < 0 ? '-' : ''
  return sign + int + (dec ? '.' + dec : '')
})
</script>

<template>
  <div class="wd-statistic">
    <div v-if="title" class="wd-statistic__title">{{ title }}</div>
    <div class="wd-statistic__value">
      <span v-if="prefix" class="wd-statistic__affix">{{ prefix }}</span>
      <span class="wd-statistic__num">{{ text }}</span>
      <span v-if="suffix" class="wd-statistic__affix wd-statistic__affix--suffix">{{ suffix }}</span>
    </div>
    <div v-if="$slots.footer" class="wd-statistic__footer"><slot name="footer" /></div>
  </div>
</template>
