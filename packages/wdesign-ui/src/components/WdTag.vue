<script setup lang="ts">
defineOptions({ name: 'WdTag' })

withDefaults(
  defineProps<{
    /** 视觉风格：tint 淡色底 / gray 中性灰 / dark 深色实底 */
    variant?: 'tint' | 'gray' | 'dark'
    /** 尺寸档：sm | md | lg，不传为默认 md */
    size?: 'lg' | 'md' | 'sm'
    /** 前置状态圆点（固定主色红） */
    dot?: boolean
  }>(),
  { variant: 'tint', dot: false },
)
</script>

<template>
  <span class="wd-tag" data-wd-hover :class="[`wd-tag--${variant}`, { 'wd-tag--lg': size === 'lg', 'wd-tag--sm': size === 'sm' }]">
    <i v-if="dot" class="wd-tag__dot"></i>
    <slot />
  </span>
</template>
