<script setup lang="ts">
defineOptions({ name: 'WdResult' })

withDefaults(
  defineProps<{
    status?: 'success' | 'warning' | 'error' | 'info'
    title?: string
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
