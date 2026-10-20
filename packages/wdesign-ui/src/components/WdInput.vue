<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, ref } from 'vue'
import { useControllable } from './controllable'

defineOptions({ name: 'WdInput' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    /** 非受控模式的初始值（不传 modelValue 时生效） */
    defaultValue?: string
    placeholder?: string
    shape?: 'pill' | 'rounded'
    type?: string
    disabled?: boolean
    size?: 'lg' | 'md' | 'sm'
    /** 有内容时显示清除按钮 */
    clearable?: boolean
    /** 最大长度 */
    maxlength?: number
    /** 显示「当前/上限」字数（需同时给 maxlength） */
    showCount?: boolean
    /** 只读 */
    readonly?: boolean
  }>(),
  {
    /* ⚠️ 不给 modelValue 默认值：否则 `vnode.props` 判断受控会失效 */
    placeholder: '',
    shape: 'pill',
    type: 'text',
    disabled: false,
    size: 'md',
    clearable: false,
    showCount: false,
    readonly: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
  (e: 'enter', value: string): void
}>()

/**
 * 受控 / 非受控。
 * 非受控模式下组件自己持有输入值，只需监听 @change ——
 * 搜索框这类「用完就走」的场景不必再维护一个 ref。
 */
const { value, set } = useControllable<string>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: '',
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

const el = ref<HTMLInputElement | null>(null)

const hasValue = computed(() => value.value.length > 0)
const showClear = computed(() => props.clearable && hasValue.value && !props.disabled && !props.readonly)
const count = computed(() => (props.showCount && props.maxlength ? `${value.value.length}/${props.maxlength}` : ''))

function onInput(event: Event) {
  let v = (event.target as HTMLInputElement).value
  // 浏览器原生 maxlength 已限制输入，这里再兜一层（粘贴/程序化赋值）
  if (props.maxlength && v.length > props.maxlength) {
    v = v.slice(0, props.maxlength)
    ;(event.target as HTMLInputElement).value = v
  }
  set(v)
}

function clear() {
  set('')
  emit('clear')
  el.value?.focus()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') emit('enter', value.value)
}

defineExpose({ focus: () => el.value?.focus(), blur: () => el.value?.blur() })
</script>

<template>
  <label
    class="wd-input"
    :class="{
      'wd-input--rounded': shape === 'rounded',
      'wd-input--lg': size === 'lg',
      'wd-input--sm': size === 'sm',
      'wd-input--has-count': !!count,
    }"
  >
    <span v-if="$slots.icon" class="wd-input__icon"><slot name="icon" /></span>
    <input
      ref="el"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="onInput"
      @keydown="onKeydown"
    />
    <button
      v-if="showClear"
      type="button"
      class="wd-input__clear"
      aria-label="清除"
      @click.prevent="clear"
    >
      <wd-icon name="close" :size="13" />
    </button>
    <slot name="suffix" />
    <span v-if="count" class="wd-input__count">{{ count }}</span>
  </label>
</template>
