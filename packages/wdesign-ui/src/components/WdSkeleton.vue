<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdSkeleton' })

const props = withDefaults(
  defineProps<{
    /** 骨架形态：text 文本行 / rect 矩形块 / circle 圆形 */
    variant?: 'text' | 'rect' | 'circle'
    /** 单个占位块宽度，数字按 px 处理 */
    width?: number | string
    /** 单个占位块高度，数字按 px 处理；rect 不传时默认 80px */
    height?: number | string
    /** 占位块数量 */
    count?: number
  }>(),
  { variant: 'text', width: '', height: '', count: 3 },
)

function toSize(v: number | string): string {
  if (v === '' || v === undefined || v === null) return ''
  return typeof v === 'number' ? `${v}px` : v
}

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.variant === 'circle') {
    const s = toSize(props.width) || '48px'
    style.width = s
    style.height = toSize(props.height) || s
  } else {
    if (props.width) style.width = toSize(props.width)
    if (props.height) style.height = toSize(props.height)
    if (props.variant === 'rect' && !props.height) style.height = '80px'
  }
  return style
})
</script>

<template>
  <div class="wd-skeleton" :class="`wd-skeleton--${variant}`" aria-hidden="true">
    <span
      v-for="i in count"
      :key="i"
      class="wd-skeleton__item"
      :class="{ 'wd-skeleton__item--text': variant === 'text' }"
      :style="itemStyle"
    ></span>
  </div>
</template>
