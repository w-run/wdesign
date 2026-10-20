<script setup lang="ts">
import { computed, ref } from 'vue'
import { useControllable } from './controllable'

defineOptions({ name: 'WdOtp' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    /** 非受控模式的初始值 */
    defaultValue?: string
    length?: number
    disabled?: boolean
    /**
     * 视觉形态：
     *   separate  — 独立方块（默认）
     *   pill      — 连在一起的胶囊（首尾圆头，中间直角拼接）
     *   underline — 只保留底部横线，无底色
     */
    variant?: 'separate' | 'pill' | 'underline'
  }>(),
  /* 不给 modelValue 默认值，否则无法区分受控/非受控 */
  { length: 6, disabled: false, variant: 'separate' },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const { value, set } = useControllable<string>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: '',
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

const boxes = ref<HTMLInputElement[]>([])

function charAt(i: number) {
  return value.value[i] || ''
}

function onInput(i: number, e: Event) {
  const el = e.target as HTMLInputElement
  const next = el.value.replace(/\D/g, '').slice(-1)
  const arr = value.value.split('')
  arr[i] = next
  set(arr.join('').slice(0, props.length))
  if (next && i < props.length - 1) boxes.value[i + 1]?.focus()
}

function onKeydown(i: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !charAt(i) && i > 0) {
    const arr = value.value.split('')
    arr[i - 1] = ''
    set(arr.join(''))
    boxes.value[i - 1]?.focus()
  }
  if (e.key === 'ArrowLeft' && i > 0) boxes.value[i - 1]?.focus()
  if (e.key === 'ArrowRight' && i < props.length - 1) boxes.value[i + 1]?.focus()
}

function onPaste(e: ClipboardEvent) {
  e.preventDefault()
  const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, props.length)
  if (!text) return
  set(text)
  boxes.value[Math.min(text.length, props.length - 1)]?.focus()
}
</script>

<template>
  <div
    class="wd-otp"
    :class="[
      `wd-otp--${variant}`,
      { 'wd-otp--disabled': disabled },
    ]"
    @paste="onPaste"
  >
    <input
      v-for="i in length"
      :key="i"
      ref="boxes"
      class="wd-otp__box"
      :value="charAt(i - 1)"
      :disabled="disabled"
      inputmode="numeric"
      maxlength="1"
      autocomplete="one-time-code"
      @input="onInput(i - 1, $event)"
      @keydown="onKeydown(i - 1, $event)"
    />
  </div>
</template>
