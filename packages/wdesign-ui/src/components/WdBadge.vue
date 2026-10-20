<script setup lang="ts">
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'WdBadge' })

const props = withDefaults(
  defineProps<{
    /** 数值；传字符串则原样显示 */
    value?: number | string
    /** 只显示圆点，不显示数字 */
    dot?: boolean
    /** 数值上限，超过显示为 max+ */
    max?: number
    /** 配色：gray 用于弱提示 */
    tone?: 'red' | 'gray'
  }>(),
  { value: '', dot: false, max: 99, tone: 'red' },
)

const display = computed(() => {
  if (typeof props.value === 'number' && props.max && props.value > props.max) {
    return `${props.max}+`
  }
  return props.value
})

const showCount = computed(
  () => !props.dot && props.value !== '' && props.value !== undefined && props.value !== null,
)

/**
 * 仅在数值**变化**时播放弹入动画。
 * 首屏渲染时徽标本来就该静止呈现，一加载就弹会显得页面在抖。
 */
const animReady = ref(false)
watch(() => props.value, () => { animReady.value = true })
</script>

<template>
  <span class="wd-badge" :class="[tone === 'gray' ? 'wd-badge--gray' : '', { 'wd-badge--anim-ready': animReady }]">
    <slot />
    <span v-if="dot" class="wd-badge__dot"></span>
    <span v-else-if="showCount" class="wd-badge__count">{{ display }}</span>
  </span>
</template>
