<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdProgress' })

const props = withDefaults(
  defineProps<{
    value?: number
    thin?: boolean
    onDark?: boolean
    /** 进度色，默认主题红。任意 CSS 颜色值。 */
    color?: string
  }>(),
  { value: 0, thin: false, onDark: false, color: '' },
)

const percent = computed(() => Math.max(0, Math.min(100, props.value)))
const classes = computed(() => [
  'wd-progress',
  props.thin ? 'wd-progress--thin' : '',
  props.onDark ? 'wd-progress--on-dark' : '',
])
</script>

<template>
  <div
    :class="classes"
    role="progressbar"
    :aria-valuenow="percent"
    aria-valuemin="0"
    aria-valuemax="100"
    :style="color ? { '--wd-progress-color': color } : undefined"
  >
    <span class="wd-progress__bar" :style="{ width: percent + '%' }"></span>
  </div>
</template>
