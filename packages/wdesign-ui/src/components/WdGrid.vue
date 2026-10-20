<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdGrid' })

const props = withDefaults(
  defineProps<{
    /** 列数；传 auto 则按 200px 最小宽自动铺满 */
    columns?: number | 'auto'
    /** 间距档位 sm|md|lg，对应 8 / 16 / 24px */
    gap?: 'sm' | 'md' | 'lg'
    /** 旧版兼容的自定义间距像素值，新代码请用 gap */
    gutter?: number
  }>(),
  { columns: 1, gap: 'md' },
)

const cols = computed(() => {
  if (props.columns === 'auto') return 'repeat(auto-fit, minmax(200px, 1fr))'
  return `repeat(${props.columns}, 1fr)`
})

const gapValue = computed(() => {
  if (props.gutter) `${props.gutter}px`
  const val = { sm: 8, md: 16, lg: 24 }[props.gap] || 16
  return `${val}px`
})
</script>

<template>
  <div class="wd-grid" :style="{ gridTemplateColumns: cols, gap: gapValue }">
    <slot />
  </div>
</template>
