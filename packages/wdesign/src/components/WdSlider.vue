<script setup lang="ts">
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'WdSlider' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    showValue?: boolean
  }>(),
  { modelValue: 0, min: 0, max: 100, step: 1, showValue: true },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const el = ref<HTMLInputElement | null>(null)

/**
 * 当前值：拖动中以原生 input 的实时值为准，否则跟随 props。
 *
 * 为什么不能只看 props：组件允许只传 `:model-value`（受控但父级不更新，
 * 如演示页的静态示例），此时 emit 出去也没人接，props 永远不变 ——
 * 滑块能拖、红色进度却停在原地。
 * 这里用 `live` 记录用户拖出来的值，保证视觉与滑块位置始终一致。
 */
const live = ref<number | null>(null)
const current = computed(() => (live.value !== null ? live.value : props.modelValue))

const percent = computed(() => {
  const span = props.max - props.min || 1
  return Math.max(0, Math.min(100, ((current.value - props.min) / span) * 100))
})

const trackStyle = computed(() => ({
  background: `linear-gradient(to right, var(--wd-red) 0%, var(--wd-red) ${percent.value}%, var(--wd-tint-2) ${percent.value}%, var(--wd-tint-2) 100%)`,
}))

function onInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  live.value = v                 // 立即驱动视觉，不等父级回传
  emit('update:modelValue', v)
}

// 外部值变化时清除本地覆盖（父级真正接管后以 props 为准）
watch(
  () => props.modelValue,
  (v) => {
    if (live.value !== null && v !== live.value) live.value = null
  },
)
</script>

<template>
  <div class="wd-slider">
    <input
      ref="el"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="current"
      :style="trackStyle"
      @input="onInput"
    />
    <span v-if="showValue" class="wd-slider__value">{{ current }}</span>
  </div>
</template>
