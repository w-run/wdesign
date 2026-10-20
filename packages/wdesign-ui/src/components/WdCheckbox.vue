<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed } from 'vue'
import { useControllable } from './controllable'

defineOptions({ name: 'WdCheckbox' })

const props = withDefaults(
  defineProps<{
    /** v-model 绑的选中状态；传了即为受控，点击后只发事件、不回写 */
    modelValue?: boolean
    /** 非受控模式的初始值（不传 modelValue 时生效） */
    defaultValue?: boolean
    /** 文案，不传时用默认插槽 */
    label?: string
    /** 禁用：不响应点击、不发事件，配色转灰 */
    disabled?: boolean
    /**
     * 选中色。任意 CSS 颜色值。
     * 不传时用 --wd-ink（深色）—— 见样式里关于「为什么不用主题红」的说明。
     * hover / 禁用态由 color-mix 从它派生，会自动跟随。
     */
    color?: string
  }>(),
  /* ⚠️ 不给 modelValue 默认值：否则 `'modelValue' in props` 恒为 true，
     非受控模式失效。兜底值见 useControllable 的 fallback。 */
  { label: '', disabled: false, color: '' },
)

const emit = defineEmits<{
  /** v-model 更新；受控时父级须回写，否则勾选状态不动 */
  (e: 'update:modelValue', value: boolean): void
  /** 用户点击造成的选中态变化，参数为新值；受控值被外部改动时不触发 */
  (e: 'change', value: boolean): void
}>()

const { value, set } = useControllable<boolean>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: false,
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

function toggle() {
  if (!props.disabled) set(!value.value)
}
</script>

<template>
  <button
    type="button"
    role="checkbox"
    class="wd-checkbox"
    :class="{ 'wd-checkbox--checked': value, 'wd-checkbox--disabled': disabled }"
    :aria-checked="value"
    :disabled="disabled"
    :style="color ? { '--wd-check-color': color } : undefined"
    @click="toggle"
  >
    <span class="wd-checkbox__box">
      <wd-icon name="check" :size="13" />
    </span>
    <span v-if="label || $slots.default" class="wd-checkbox__label"><slot>{{ label }}</slot></span>
  </button>
</template>
