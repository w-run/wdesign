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

const percent = computed(() => {
  const span = props.max - props.min || 1
  return Math.max(0, Math.min(100, ((props.modelValue - props.min) / span) * 100))
})

const trackStyle = computed(() => ({
  background: `linear-gradient(to right, var(--wd-red) 0%, var(--wd-red) ${percent.value}%, var(--wd-tint-2) ${percent.value}%, var(--wd-tint-2) 100%)`,
}))

/**
 * 拖动时必须让原生 input 自己维护 value。
 * 原先用 `:value` + `@input`：用户拖动 → emit → 父组件回传 → Vue 把 DOM value
 * 重设回 modelValue。若父组件未即时更新（或值被夹紧），滑块会被反复拉回，
 * 表现为「拖不动 / 进度卡住」。
 * 这里改为：input 事件只透出数值，DOM value 交给浏览器；仅在外部值变化时同步。
 */
const el = ref<HTMLInputElement | null>(null)
let dragging = false

function onInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  emit('update:modelValue', v)
}

function onPointerDown() { dragging = true }
function onPointerUp() { dragging = false }

watch(
  () => props.modelValue,
  (v) => {
    // 拖动过程中不回写，避免打断用户操作
    if (dragging || !el.value) return
    if (Number(el.value.value) !== v) el.value.value = String(v)
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
      :value="modelValue"
      :style="trackStyle"
      @input="onInput"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    />
    <span v-if="showValue" class="wd-slider__value">{{ modelValue }}</span>
  </div>
</template>
