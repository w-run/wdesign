<script setup lang="ts">
defineOptions({ name: 'WdEmpty' })

withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  { title: '暂无数据', description: '' },
)
</script>

<template>
  <div class="wd-empty">
    <div class="wd-empty__icon">
      <slot name="icon">
        <wd-icon name="folder-open" :size="30" style="opacity:.5" />
      </slot>
    </div>
    <div v-if="title" class="wd-empty__title">{{ title }}</div>
    <div v-if="description || $slots.description" class="wd-empty__desc">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="$slots.action" class="wd-empty__action"><slot name="action" /></div>
  </div>
</template>
