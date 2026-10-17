<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdCollapse' })

export interface WdCollapseItem {
  title: string
  content?: string
}

const props = withDefaults(
  defineProps<{
    /** 展开项的索引数组 */
    modelValue?: number[]
    items?: WdCollapseItem[]
  }>(),
  { modelValue: () => [], items: () => [] },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: number[]): void }>()

const openSet = computed(() => new Set(props.modelValue))

function toggle(i: number) {
  const next = new Set(props.modelValue)
  if (next.has(i)) next.delete(i)
  else next.add(i)
  emit('update:modelValue', [...next].sort((a, b) => a - b))
}
</script>

<template>
  <div class="wd-collapse">
    <div
      v-for="(item, i) in props.items"
      :key="i"
      class="wd-collapse__item"
      :class="{ 'wd-collapse__item--open': openSet.has(i) }"
    >
      <button type="button" class="wd-collapse__head" :aria-expanded="openSet.has(i)" @click="toggle(i)">
        <span>{{ item.title }}</span>
        <wd-icon class="wd-chevron" :class="{ 'wd-chevron--open': openSet.has(i) }" name="chevron-down" :size="15" />
      </button>
      <div class="wd-collapse__body">
        <div class="wd-collapse__inner">
          <div class="wd-collapse__content">
            <slot :name="`item-${i}`" :item="item">{{ item.content }}</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
