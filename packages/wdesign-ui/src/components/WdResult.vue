<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
defineOptions({ name: 'WdResult' })

withDefaults(
  defineProps<{
    /** 结果状态，决定图标与主色 */
    status?: 'success' | 'warning' | 'error' | 'info'
    /** 主标题，为空时不渲染 */
    title?: string
    /** 补充说明，可用默认插槽覆盖 */
    description?: string
  }>(),
  { status: 'info', title: '', description: '' },
)
</script>

<template>
  <div class="wd-result" :class="`wd-result--${status}`">
    <div class="wd-result__icon">
      <slot name="icon">
        <wd-icon v-if="status === 'success'" name="check-circle" :size="30" />
        <wd-icon v-else-if="status === 'warning'" name="warning-circle" :size="30" />
        <wd-icon v-else-if="status === 'error'" name="close-circle" :size="30" />
        <wd-icon v-else name="info-circle" :size="30" />
      </slot>
    </div>
    <div v-if="title" class="wd-result__title">{{ title }}</div>
    <div v-if="description || $slots.default" class="wd-result__desc"><slot>{{ description }}</slot></div>
    <div v-if="$slots.extra" class="wd-result__extra"><slot name="extra" /></div>
  </div>
</template>
