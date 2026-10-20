<script setup lang="ts">
import { computed } from 'vue'
import { useControllable } from './controllable'

defineOptions({ name: 'WdRadioGroup' })

type Option = string | { label: string; value: string | number }

const props = withDefaults(
  defineProps<{
    /** 当前选中值，用于 v-model；传了即受控，不传走非受控 */
    modelValue?: string | number
    /** 非受控模式的初始值 */
    defaultValue?: string | number
    /** 选项列表，字符串会同时作为 label 与 value */
    options?: Option[]
    /** 是否禁用，禁用后整组不可切换 */
    disabled?: boolean
  }>(),
  /* 不给 modelValue 默认值，否则无法区分受控/非受控 */
  { options: () => [], disabled: false },
)

const emit = defineEmits<{
  /** 选择选项时触发，参数为选中值，用于 v-model；重复点击已选项也会触发 */
  (e: 'update:modelValue', value: string | number): void
  /** 与 update:modelValue 同时触发，参数相同，供非 v-model 场景监听 */
  (e: 'change', value: string | number): void
}>()

const { value, set } = useControllable<string | number>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: '',
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)

function pick(value: string | number) {
  if (!props.disabled) set(value)
}
</script>

<template>
  <div class="wd-radio-group" role="radiogroup">
    <button
      v-for="o in items"
      :key="o.value"
      type="button"
      role="radio"
      class="wd-radio"
      :class="{ 'wd-radio--checked': value === o.value, 'wd-radio--disabled': disabled }"
      :aria-checked="value === o.value"
      :disabled="disabled"
      @click="pick(o.value)"
    >
      <span class="wd-radio__dot"><span class="wd-radio__inner"></span></span>
      <span class="wd-radio__label">{{ o.label }}</span>
    </button>
  </div>
</template>
