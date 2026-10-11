<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdSegmented' })

type Option = string | { label: string; value: string | number }

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    options?: Option[]
    block?: boolean
    tone?: 'light' | 'dark'
  }>(),
  { modelValue: '', options: () => [], block: false, tone: 'light' },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)
</script>

<template>
  <div
    class="wd-segmented"
    :class="{ 'wd-segmented--block': block, 'wd-segmented--dark': tone === 'dark' }"
    role="tablist"
  >
    <button
      v-for="o in items"
      :key="o.value"
      type="button"
      role="tab"
      class="wd-segmented__item"
      :class="{ 'wd-segmented__item--active': o.value === modelValue }"
      :aria-selected="o.value === modelValue"
      @click="emit('update:modelValue', o.value)"
    >
      {{ o.label }}
    </button>
  </div>
</template>
