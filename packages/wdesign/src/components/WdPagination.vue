<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'WdPagination' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    total?: number
    pageSize?: number
    /** 简洁模式：只显示上一页 / 页码 / 下一页 */
    simple?: boolean
    /** 显示总条数 */
    showTotal?: boolean
    /** 显示每页条数选择 */
    showSizeChanger?: boolean
    /** 可选的每页条数 */
    pageSizes?: number[]
    /** 首尾是否折叠为省略号（关闭则全部展开） */
    compact?: boolean
  }>(),
  {
    modelValue: 1,
    total: 0,
    pageSize: 10,
    simple: false,
    showTotal: false,
    showSizeChanger: false,
    pageSizes: () => [10, 20, 50],
    compact: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', page: number): void
  (e: 'update:pageSize', size: number): void
  (e: 'change', page: number, size: number): void
}>()

/** 首次交互后才播放激活项动画（避免首屏渲染时抖动） */
const animReady = ref(false)

const size = ref(props.pageSize)
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / size.value)))

const range = computed<(number | '...')[]>(() => {
  const n = pageCount.value
  const cur = props.modelValue
  if (!props.compact || n <= 7) return Array.from({ length: n }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  const left = Math.max(2, cur - 1)
  const right = Math.min(n - 1, cur + 1)
  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < n - 1) pages.push('...')
  pages.push(n)
  return pages
})

function go(p: number) {
  animReady.value = true
  const v = Math.min(Math.max(1, p), pageCount.value)
  if (v === props.modelValue) return
  emit('update:modelValue', v)
  emit('change', v, size.value)
}

function changeSize(e: Event) {
  const v = Number((e.target as HTMLSelectElement).value)
  size.value = v
  emit('update:pageSize', v)
  // 换页长后当前页可能越界，夹回范围内
  const max = Math.max(1, Math.ceil(props.total / v))
  const p = Math.min(props.modelValue, max)
  emit('update:modelValue', p)
  emit('change', p, v)
}

const from = computed(() => (pageCount.value ? (props.modelValue - 1) * size.value + 1 : 0))
const to = computed(() => Math.min(props.modelValue * size.value, props.total))
</script>

<template>
  <nav
    class="wd-pagination"
    :class="{ 'wd-pagination--anim-ready': animReady, 'wd-pagination--simple': simple }"
    aria-label="分页"
  >
    <span v-if="showTotal" class="wd-pagination__total">
      第 {{ from }}–{{ to }} 条 / 共 {{ total }} 条
    </span>

    <!-- 简洁模式 -->
    <template v-if="simple">
      <button type="button" class="wd-pagination__btn" data-wd-hover :disabled="modelValue <= 1" aria-label="上一页" @click="go(modelValue - 1)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
      </button>
      <span class="wd-pagination__simple-text">{{ modelValue }} / {{ pageCount }}</span>
      <button type="button" class="wd-pagination__btn" data-wd-hover :disabled="modelValue >= pageCount" aria-label="下一页" @click="go(modelValue + 1)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>
      </button>
    </template>

    <!-- 完整模式 -->
    <template v-else>
      <button type="button" class="wd-pagination__btn" data-wd-hover :disabled="modelValue <= 1" aria-label="上一页" @click="go(modelValue - 1)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
      </button>

      <template v-for="(p, i) in range" :key="i">
        <span v-if="p === '...'" class="wd-pagination__dots">…</span>
        <button
          v-else
          type="button"
          class="wd-pagination__btn"
          data-wd-hover
          :class="{ 'wd-pagination__btn--active': p === modelValue }"
          :aria-current="p === modelValue ? 'page' : undefined"
          @click="go(p as number)"
        >{{ p }}</button>
      </template>

      <button type="button" class="wd-pagination__btn" data-wd-hover :disabled="modelValue >= pageCount" aria-label="下一页" @click="go(modelValue + 1)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>
      </button>
    </template>

    <label v-if="showSizeChanger" class="wd-pagination__size">
      <select :value="size" @change="changeSize">
        <option v-for="s in pageSizes" :key="s" :value="s">{{ s }} 条/页</option>
      </select>
    </label>
  </nav>
</template>
