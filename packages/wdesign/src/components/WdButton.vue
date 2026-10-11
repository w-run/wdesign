<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdButton' })

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'tint' | 'dark' | 'ghost'
    size?: 'lg' | 'md' | 'sm'
    disabled?: boolean
    iconOnly?: boolean
    block?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    iconOnly: false,
    block: false,
  },
)

const classes = computed(() => [
  'wd-btn',
  `wd-btn--${props.variant}`,
  `wd-btn--${props.size}`,
  {
    'wd-btn--icon': props.iconOnly,
    'wd-btn--block': props.block,
  },
])
</script>

<template>
  <button :class="classes" type="button" :disabled="disabled">
    <slot />
  </button>
</template>
