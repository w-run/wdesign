<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdDivider' })

const props = withDefaults(
  defineProps<{
    /** 水平 / 垂直 */
    direction?: 'horizontal' | 'vertical'
    /** 有文字时，文字对齐方式 */
    align?: 'left' | 'center' | 'right'
    /** 线型 */
    variant?: 'solid' | 'dashed'
    /** 与内容之间的间距（px） */
    spacing?: number
  }>(),
  { direction: 'horizontal', align: 'center', variant: 'solid', spacing: 16 },
)

const isHorizontal = computed(() => props.direction === 'horizontal')

// 类名集中在 computed 里，避免静态 class 与绑定 class 互相覆盖
const classes = computed(() => [
  'wd-divider',
  `wd-divider--${props.direction}`,   // ← 之前漏了这个，水平线的 ::before 规则因此从未命中
  `wd-divider--${props.variant}`,
  ...(isHorizontal.value ? [`wd-divider--${props.align}`] : []),
])

const style = computed(() =>
  isHorizontal.value
    ? { marginTop: `${props.spacing}px`, marginBottom: `${props.spacing}px` }
    : { marginLeft: `${props.spacing / 2}px`, marginRight: `${props.spacing / 2}px` },
)
</script>

<template>
  <div
    v-if="isHorizontal"
    :class="classes"
    :style="style"
    role="separator"
    aria-orientation="horizontal"
  >
    <span v-if="$slots.default" class="wd-divider__text"><slot /></span>
  </div>
  <span
    v-else
    :class="classes"
    :style="style"
    role="separator"
    aria-orientation="vertical"
  ></span>
</template>
