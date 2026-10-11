<script setup lang="ts">
defineOptions({ name: 'WdInput' })

withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    shape?: 'pill' | 'rounded'
    type?: string
    disabled?: boolean
  }>(),
  { modelValue: '', placeholder: '', shape: 'pill', type: 'text', disabled: false },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="wd-input" :class="{ 'wd-input--rounded': shape === 'rounded' }">
    <span v-if="$slots.icon" class="wd-input__icon"><slot name="icon" /></span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
    />
    <slot name="suffix" />
  </label>
</template>
