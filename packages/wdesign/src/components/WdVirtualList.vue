<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'WdVirtualList' })

const props = withDefaults(
  defineProps<{
    /** 数据源 */
    items?: unknown[]
    /** 每项高度（px）。固定高度才能精确计算；0 表示交给 itemSize 测量 */
    itemHeight?: number
    /** 可视区高度（px） */
    height?: number
    /** 上下预渲染的行数（滚动缓冲，越大越平滑但节点越多） */
    buffer?: number
    /** 行 key 字段（数据是对象时用） */
    itemKey?: string
    /** 空数据文案 */
    emptyText?: string
    /** 无滚动条（仍可滚） */
    hideScrollbar?: boolean
  }>(),
  {
    items: () => [],
    itemHeight: 40,
    height: 400,
    buffer: 4,
    itemKey: '',
    emptyText: '暂无数据',
    hideScrollbar: false,
  },
)

const emit = defineEmits<{
  (e: 'scroll', offset: number): void
  (e: 'reachEnd'): void
}>()

const viewport = ref<HTMLElement | null>(null)
const scrollTop = ref(0)

/**
 * 用 itemHeight 固定高度算虚拟窗口。
 *
 * 为什么不做动态测量：
 *   动态测量（ResizeObserver 逐行量）会带来「测量 → 重排 → 位置跳变」
 *   的连锁反应，滚动中尤其明显（内容抖动）。列表场景里固定行高
 *   （或调用方预先给定高度）已覆盖绝大多数需求，换来的是绝对稳定的滚动。
 *   需要动态高度的场景，请改用 onMounted 后传入算好的 itemHeight。
 */
const totalHeight = computed(() => props.items.length * props.itemHeight)

/** 可视窗口内 + buffer 的起止下标 */
const range = computed(() => {
  const h = props.height
  const start = Math.floor(scrollTop.value / props.itemHeight)
  const visible = Math.ceil(h / props.itemHeight)
  const from = Math.max(0, start - props.buffer)
  const to = Math.min(props.items.length, start + visible + props.buffer)
  return { from, to }
})

const visibleItems = computed(() =>
  props.items.slice(range.value.from, range.value.to).map((item, i) => ({
    item,
    index: range.value.from + i,
  })),
)

/** 偏移量：让第 from 项正好落在视口顶部（配合 translateY 使用） */
const offsetY = computed(() => range.value.from * props.itemHeight)

function onScroll(e: Event) {
  const el = e.target as HTMLElement
  scrollTop.value = el.scrollTop
  emit('scroll', el.scrollTop)
  // 触底：留 2px 容差，避免小数滚动位置判不中
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) emit('reachEnd')
}

function keyOf(item: unknown, index: number): string | number {
  if (props.itemKey && item && typeof item === 'object') {
    const v = (item as Record<string, unknown>)[props.itemKey]
    if (v !== undefined) return v as string | number
  }
  return index
}

/** 滚动到指定下标 */
function scrollToIndex(index: number, align: 'start' | 'center' | 'end' = 'start') {
  const el = viewport.value
  if (!el) return
  const max = Math.max(0, totalHeight.value - props.height)
  let top = index * props.itemHeight
  if (align === 'center') top -= (props.height - props.itemHeight) / 2
  else if (align === 'end') top -= props.height - props.itemHeight
  el.scrollTop = Math.min(max, Math.max(0, top))
}

/** 滚动到顶部 */
function scrollToTop() {
  if (viewport.value) viewport.value.scrollTop = 0
}

/**
 * 数据变化后如果滚出范围，把滚动位置夹回有效区间。
 * 否则删除大量数据后视口会停在一片空白上。
 */
watch(
  () => props.items.length,
  async () => {
    await nextTick()
    const el = viewport.value
    if (!el) return
    const max = Math.max(0, totalHeight.value - props.height)
    if (el.scrollTop > max) el.scrollTop = max
  },
)

onMounted(() => {
  if (viewport.value) scrollTop.value = viewport.value.scrollTop
})

defineExpose({ scrollToIndex, scrollToTop })
</script>

<template>
  <div
    ref="viewport"
    class="wd-vlist"
    :class="{ 'wd-vlist--hide-scrollbar': hideScrollbar }"
    :style="{ height: typeof height === 'number' ? height + 'px' : height }"
    @scroll.passive="onScroll"
  >
    <div v-if="items.length" class="wd-vlist__phantom" :style="{ height: totalHeight + 'px' }">
      <div
        class="wd-vlist__window"
        :style="{ transform: `translateY(${offsetY}px)` }"
      >
        <div
          v-for="entry in visibleItems"
          :key="keyOf(entry.item, entry.index)"
          class="wd-vlist__item"
          :style="{ height: itemHeight + 'px' }"
        >
          <slot :item="entry.item" :index="entry.index">{{ entry.item }}</slot>
        </div>
      </div>
    </div>
    <div v-else class="wd-vlist__empty">{{ emptyText }}</div>
  </div>
</template>
