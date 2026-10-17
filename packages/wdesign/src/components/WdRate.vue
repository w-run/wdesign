<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'WdRate' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    count?: number
    disabled?: boolean
    /** 允许再次点击同一颗星清空（默认开启） */
    clearable?: boolean
  }>(),
  { modelValue: 0, count: 5, disabled: false, clearable: true },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

/** 悬停预览：-1 表示无预览 */
const hover = ref(-1)

/**
 * 只有真正支持悬停的指针（鼠标 / 触控板）才做预览。
 * 触屏上 `pointerenter` 会在按下时触发、而 `pointerleave` 常常不来，
 * 于是 hover 值残留 → 点同一颗星「清空」后星星仍然亮着（看起来清空失败）。
 */
function isHoverPointer(e: PointerEvent) {
  return e.pointerType === 'mouse' || e.pointerType === 'pen'
}

function onEnter(i: number, e: PointerEvent) {
  if (props.disabled || !isHoverPointer(e)) return
  hover.value = i
}

function onLeave(e: PointerEvent) {
  if (!isHoverPointer(e)) return
  hover.value = -1
}

function pick(i: number) {
  if (props.disabled) return
  // 触摸后立刻清掉预览，避免高亮停留在被点的星上造成「没清空」的错觉
  hover.value = -1
  const next = props.modelValue === i + 1 ? (props.clearable ? 0 : i + 1) : i + 1
  emit('update:modelValue', next)
}

/** 展示用值：有预览看预览，否则看受控值 */
const shown = computed(() => (hover.value >= 0 ? hover.value + 1 : props.modelValue))

// ---- 键盘操作（WAI-ARIA radiogroup 语义）----
const root = ref<HTMLElement | null>(null)

function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  const cur = props.modelValue
  let next: number | null = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = Math.min(props.count, cur + 1)
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = Math.max(0, cur - 1)
  else if (e.key === 'Home') next = 1
  else if (e.key === 'End') next = props.count
  else if (e.key === 'Delete' || e.key === 'Backspace') next = 0
  if (next === null) return
  e.preventDefault()
  emit('update:modelValue', next)
}
</script>

<template>
  <div
    ref="root"
    class="wd-rate"
    :class="{ 'wd-rate--disabled': disabled }"
    role="radiogroup"
    :aria-label="`评分，共 ${count} 星，当前 ${modelValue} 星`"
    :aria-disabled="disabled || undefined"
    @mouseleave="hover = -1"
    @keydown="onKeydown"
  >
    <button
      v-for="i in count"
      :key="i"
      type="button"
      class="wd-rate__item"
      :class="{ 'wd-rate__item--on': i <= shown }"
      role="radio"
      :aria-checked="i === modelValue"
      :aria-label="`${i} 星`"
      :tabindex="disabled ? -1 : i === (modelValue || (hover >= 0 ? hover + 1 : 1)) ? 0 : -1"
      :disabled="disabled"
      @pointerenter="onEnter(i - 1, $event)"
      @pointerleave="onLeave($event)"
      @click="pick(i - 1)"
    >
      <wd-icon name="star" :size="22" />
    </button>
  </div>
</template>
