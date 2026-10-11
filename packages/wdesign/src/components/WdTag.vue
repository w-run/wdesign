<script setup lang="ts">
defineOptions({ name: 'WdTag' })

withDefaults(
  defineProps<{
    variant?: 'tint' | 'gray' | 'dark'
    dot?: boolean
  }>(),
  { variant: 'tint', dot: false },
)
</script>

<template>
  <span class="wd-tag" :class="`wd-tag--${variant}`">
    <i v-if="dot" class="wd-tag__dot"></i>
    <slot />
  </span>
</template>
