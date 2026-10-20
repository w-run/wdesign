<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useControllable } from './controllable'

defineOptions({ name: 'WdSlider' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    /** 非受控模式的初始值 */
    defaultValue?: number
    min?: number
    max?: number
    step?: number
    showValue?: boolean
    /** 滑轨与滑块颜色，默认主题红。任意 CSS 颜色值。 */
    color?: string
  }>(),
  /* 不给 modelValue 默认值，否则无法区分受控/非受控 */
  { min: 0, max: 100, step: 1, showValue: true, color: '' },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const el = ref<HTMLInputElement | null>(null)

/**
 * 当前值：拖动中以原生 input 的实时值为准，否则跟随 props。
 *
 * 为什么不能只看 props：组件允许只传 `:model-value`（受控但父级不更新，
 * 如演示页的静态示例），此时 emit 出去也没人接，props 永远不变 ——
 * 滑块能拖、红色进度却停在原地。
 * 这里用 `live` 记录用户拖出来的值，保证视觉与滑块位置始终一致。
 */
/**
 * 受控 / 非受控由 useControllable 统一处理：
 *  · 传了 modelValue → 以父级为准（父级不更新时，本地仍即时反映拖动）
 *  · 没传 → 组件自己持有状态
 * 这里保留 live 覆盖，是为了「受控但父级不更新」的静态示例也能拖动。
 */
const { value: ctl, set } = useControllable<number>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: 0,
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

const live = ref<number | null>(null)
const current = computed(() => (live.value !== null ? live.value : ctl.value))

const percent = computed(() => {
  const span = props.max - props.min || 1
  return Math.max(0, Math.min(100, ((current.value - props.min) / span) * 100))
})

/*
 * 轨道用内联渐变画「已填充 / 未填充」两段。
 *
 * ⚠️ 这里不能写死 --wd-red：
 *   组件支持 `color` prop 自定义主色，渐变必须跟着变。
 *   用 var(--wd-slider-color) 即可（它由 color prop 注入，
 *   未传时回落到 --wd-red）。
 *
 * ⚠️ 未填充段也不要再用 --wd-tint-2（淡红）——
 *   那是红色族，换色后会和已填充段冲突。改用中性 --wd-field。
 */
const trackStyle = computed(() => ({
  background: `linear-gradient(to right, var(--wd-slider-color) 0%, var(--wd-slider-color) ${percent.value}%, var(--wd-field) ${percent.value}%, var(--wd-field) 100%)`,
}))

function onInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  live.value = v                 // 立即驱动视觉，不等父级回传
  set(v)
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
  <div
    class="wd-slider"
    :style="color ? { '--wd-slider-color': color } : undefined"
  >
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
