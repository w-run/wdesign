<script setup lang="ts">
defineOptions({ name: 'WdCheckbox' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    disabled?: boolean
  }>(),
  { modelValue: false, label: '', disabled: false },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    type="button"
    role="checkbox"
    class="wd-checkbox"
    :class="{ 'wd-checkbox--checked': modelValue, 'wd-checkbox--disabled': disabled }"
    :aria-checked="modelValue"
    :disabled="disabled"
    @click="toggle"
  >
    <span class="wd-checkbox__box">
      <wd-icon name="check" :size="13" />
    </span>
    <span v-if="label || $slots.default" class="wd-checkbox__label"><slot>{{ label }}</slot></span>
  </button>
</template>
