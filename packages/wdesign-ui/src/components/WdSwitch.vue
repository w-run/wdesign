<script setup lang="ts">
import { computed } from 'vue'
import { useControllable } from './controllable'

defineOptions({ name: 'WdSwitch' })

const props = withDefaults(
  defineProps<{
    /** v-model 绑定的开关值（受控） */
    modelValue?: boolean
    /** 非受控模式的初始值（不传 modelValue 时生效） */
    defaultValue?: boolean
    /** 禁用：不响应点击与键盘，保持当前值 */
    disabled?: boolean
  }>(),
  /*
   * ⚠️ 不能给 modelValue 设默认值。
   * withDefaults 会让 `'modelValue' in props` 永远为 true，
   * 于是所有实例都被判定成「受控」，非受控模式彻底失效。
   * 兜底值放在 useControllable 的 fallback 里。
   */
  { disabled: false },
)

const emit = defineEmits<{
  /** v-model 更新：点击切换时触发，参数为新值 */
  (e: 'update:modelValue', value: boolean): void
  /** 值变化：与 update:modelValue 同时触发，供业务处理 */
  (e: 'change', value: boolean): void
}>()

const { value, set, controlled } = useControllable<boolean>({
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
    role="switch"
    class="wd-switch"
    :class="{ 'wd-switch--off': !value }"
    :aria-checked="value"
    :data-controlled="controlled ? 'true' : 'false'"
    :disabled="disabled"
    @click="toggle"
  >
    <span class="wd-switch__knob"></span>
  </button>
</template>
