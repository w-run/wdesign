<script setup lang="ts">
defineOptions({ name: 'WdBreadcrumb' })

export interface WdBreadcrumbItem {
  label: string
  value?: string | number
}

const props = withDefaults(
  defineProps<{
    /** 层级列表；最后一项视为当前页，不可点击 */
    items?: WdBreadcrumbItem[]
    /** 层级之间的分隔符 */
    separator?: string
  }>(),
  { items: () => [], separator: '/' },
)

const emit = defineEmits<{
  /** 点击非末项时触发；value 为该项 value（缺省为下标），index 为下标 */
  (e: 'select', value: string | number, index: number): void
}>()

function pick(item: WdBreadcrumbItem, index: number) {
  if (index === props.items.length - 1) return
  emit('select', item.value ?? index, index)
}
</script>

<template>
  <nav class="wd-breadcrumb" aria-label="面包屑">
    <template v-for="(item, i) in props.items" :key="i">
      <span v-if="i > 0" class="wd-breadcrumb__sep">{{ separator }}</span>
      <button
        type="button"
        class="wd-breadcrumb__item"
        :class="{ 'wd-breadcrumb__item--current': i === props.items.length - 1 }"
        @click="pick(item, i)"
      >
        {{ item.label }}
      </button>
    </template>
  </nav>
</template>
