<script setup lang="ts">
defineOptions({ name: 'WdContainer' })

const props = withDefaults(
  defineProps<{
    maxWidth?: string
    /** 内间距档位：水平与垂直成对生效 */
    pad?: 'sm' | 'md' | 'lg'
  }>(),
  { maxWidth: '1200px', pad: 'md' },
)

// 水平 / 垂直内间距按档位成对给出。
// 只设 padding-inline 会让内容在容器里上下贴边（演示页曾因此上下内边距为 0）。
const PAD_X = { sm: 'var(--wd-space-3)', md: 'var(--wd-space-4)', lg: 'var(--wd-space-6)' }
const PAD_Y = { sm: 'var(--wd-space-3)', md: 'var(--wd-space-4)', lg: 'var(--wd-space-6)' }
</script>

<template>
  <div
    class="wd-container"
    :style="{
      maxWidth,
      paddingInline: PAD_X[props.pad],
      paddingBlock: PAD_Y[props.pad],
    }"
  >
    <slot />
  </div>
</template>
