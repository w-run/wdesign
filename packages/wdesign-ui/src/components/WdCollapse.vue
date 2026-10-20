<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
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
    /** 面板数据：title 为标题、content 为正文，正文也可用 item-0、item-1 这类插槽替换 */
    items?: WdCollapseItem[]
    /**
     * 手风琴模式：同时只能展开一项。
     * 开启后点开新项会自动收起之前的项。
     */
    accordion?: boolean
    /** 手风琴模式下是否允许全部收起（默认允许） */
    collapsible?: boolean
  }>(),
  { modelValue: () => [], items: () => [], accordion: false, collapsible: true },
)

const emit = defineEmits<{
  /** 展开项变化时触发：参数为仍展开的索引数组，升序排列；手风琴全收时为空数组 */
  (e: 'update:modelValue', value: number[]): void
}>()

const openSet = computed(() => new Set(props.modelValue))

function toggle(i: number) {
  if (!props.accordion) {
    const next = new Set(props.modelValue)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    emit('update:modelValue', [...next].sort((a, b) => a - b))
    return
  }

  /*
   * 手风琴：点开新项只保留这一项；点已展开项则全部收起
   * （collapsible=false 时保持展开，不允许全收）。
   *
   * ⚠️ 不能简写成 `openSet.has(i) ? [] : [i]` ——
   * collapsible=false 时点当前项会意外收起。
   */
  if (openSet.value.has(i)) {
    emit('update:modelValue', props.collapsible ? [] : [i])
  } else {
    emit('update:modelValue', [i])
  }
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
