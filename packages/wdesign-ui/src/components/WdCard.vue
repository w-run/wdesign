<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdCard' })

const props = withDefaults(
  defineProps<{
    /** 底色档：default 白卡、tint 浅色次级块、dark 深色强调块（文字自动反白） */
    variant?: 'default' | 'tint' | 'dark'
    /** 内间距档 sm|md|lg，档位越大内距与圆角一起放大 */
    padding?: 'sm' | 'md' | 'lg'
    /** 指针移入时上浮 2px 并加深阴影，只在整张卡可点击时开 */
    hoverable?: boolean
  }>(),
  { variant: 'default', padding: 'md', hoverable: false },
)

const classes = computed(() => [
  'wd-card',
  props.variant !== 'default' ? `wd-card--${props.variant}` : '',
  props.padding !== 'md' ? `wd-card--pad-${props.padding}` : '',
  props.hoverable ? 'wd-card--hoverable' : '',
])
</script>

<template>
  <div :class="classes" data-wd-hover>
    <slot />
  </div>
</template>
