<script setup lang="ts">
defineOptions({ name: 'WdListItem' })

withDefaults(
  defineProps<{
    /** 主文本，过长时截断 */
    title?: string
    /** 右侧次要说明，如数量或状态 */
    meta?: string
    /** 可点击；为 false 时无悬停反馈也不抛 click */
    clickable?: boolean
  }>(),
  { title: '', meta: '', clickable: true },
)

const emit = defineEmits<{
  /** 点击条目时触发，参数为原生事件；clickable 为 false 时不触发 */
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <div
    data-wd-hover
    class="wd-list-item"
    :class="{ 'wd-list-item--clickable': clickable }"
    @click="clickable && emit('click', $event)"
  >
    <span v-if="$slots.icon" class="wd-list-item__icon"><slot name="icon" /></span>
    <span class="wd-list-item__title">{{ title }}</span>
    <span v-if="meta" class="wd-list-item__meta">{{ meta }}</span>
    <slot name="extra" />
  </div>
</template>
