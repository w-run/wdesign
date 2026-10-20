<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, ref } from 'vue'
import { useControllable } from './controllable'

defineOptions({ name: 'WdRate' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    /** 非受控模式的初始值 */
    defaultValue?: number
    count?: number
    disabled?: boolean
    /** 允许再次点击同一颗星清空（默认开启） */
    clearable?: boolean
    /** 选中颜色，任意 CSS 颜色值 */
    color?: string
    /** 未选中颜色 */
    colorOff?: string
    /** 图标名（需有 filled 变体），默认 star */
    icon?: string
    /** 图标尺寸 */
    size?: number
  }>(),
  /* 不给 modelValue 默认值，否则无法区分受控/非受控 */
  {
    count: 5, disabled: false, clearable: true,
    color: 'var(--wd-red)', colorOff: 'var(--wd-field-hover)',
    icon: 'star', size: 22,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const { value, set } = useControllable<number>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: 0,
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

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
  const next = value.value === i + 1 ? (props.clearable ? 0 : i + 1) : i + 1
  set(next)
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
    :style="{
      '--rate-color': color,
      '--rate-color-off': colorOff,
    }"
    role="radiogroup"
    :aria-label="`评分，共 ${count} 星，当前 ${value} 星`"
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
      :aria-checked="i === value"
      :aria-label="`${i} 星`"
      :tabindex="disabled ? -1 : i === (value || (hover >= 0 ? hover + 1 : 1)) ? 0 : -1"
      :disabled="disabled"
      @pointerenter="onEnter(i - 1, $event)"
      @pointerleave="onLeave($event)"
      @click="pick(i - 1)"
    >
      <!--
        用 filled 变体：实心星比描边星更有"评分"的分量感。
        variant="filled" 让 WdIcon 去找 filled 目录下的同名图标。
      -->
      <wd-icon :name="icon" variant="filled" :size="size" />
    </button>
  </div>
</template>
