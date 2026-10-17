<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'WdTable' })

export interface WdTableColumn {
  key: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}

type Row = Record<string, unknown>

const props = withDefaults(
  defineProps<{
    columns?: WdTableColumn[]
    rows?: Row[]
    striped?: boolean
    emptyText?: string
    /** 加载中：显示骨架遮罩，避免"空白 = 没数据"的误判 */
    loading?: boolean
    loadingText?: string
    /** 开启勾选列 */
    selectable?: boolean
    /** 已选行（受控） */
    selected?: Row[]
    /** 行唯一标识字段，默认取 index */
    rowKey?: string
    /** 表体最大高度，超出滚动（表头吸附） */
    maxHeight?: number | string
  }>(),
  {
    columns: () => [],
    rows: () => [],
    striped: true,
    emptyText: '暂无数据',
    loading: false,
    loadingText: '加载中…',
    selectable: false,
    selected: () => [],
    rowKey: '',
    maxHeight: '',
  },
)

const emit = defineEmits<{
  (e: 'update:selected', rows: Row[]): void
  (e: 'change', rows: Row[]): void
  (e: 'rowClick', row: Row, index: number): void
}>()

const sortKey = ref('')
const sortDir = ref<'asc' | 'desc'>('asc')

const sorted = computed(() => {
  if (!sortKey.value) return props.rows
  return [...props.rows].sort((a, b) => {
    const av = String(a[sortKey.value] ?? ''), bv = String(b[sortKey.value] ?? '')
    const cmp = av.localeCompare(bv, 'zh-CN', { numeric: true })
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

function keyOf(row: Row, i: number): string {
  const k = props.rowKey
  return k && row[k] !== undefined ? String(row[k]) : String(i)
}

/* ---------------- 勾选 ---------------- */
const selectedKeys = computed(() => new Set(props.selected.map((r, i) => keyOf(r, i))))

const isChecked = (row: Row, i: number) =>
  props.selected.some((r) => keyOf(r, 0) === keyOf(row, i) || r === row)

const allChecked = computed(
  () => props.rows.length > 0 && props.rows.every((r, i) => props.selected.some((s) => s === r || keyOf(s, 0) === keyOf(r, i))),
)
const someChecked = computed(() => props.selected.length > 0 && !allChecked.value)

function toggleRow(row: Row) {
  const next = props.selected.includes(row)
    ? props.selected.filter((r) => r !== row)
    : [...props.selected, row]
  emit('update:selected', next)
  emit('change', next)
}

function toggleAll() {
  const next = allChecked.value ? [] : [...props.rows]
  emit('update:selected', next)
  emit('change', next)
}

function toggleSort(key: string, col: WdTableColumn) {
  if (!col.sortable) return
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const wrapStyle = computed(() =>
  props.maxHeight ? { maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight } : undefined,
)
</script>

<template>
  <div class="wd-table-wrap" :class="{ 'wd-table-wrap--loading': loading }" :style="wrapStyle">
    <table v-if="props.rows.length" class="wd-table" :class="{ 'wd-table--striped': striped }">
      <thead>
        <tr>
          <th v-if="selectable" class="wd-table__th wd-table__th--check">
            <button
              type="button"
              class="wd-table__check"
              :class="{ 'wd-table__check--on': allChecked, 'wd-table__check--part': someChecked }"
              :aria-checked="allChecked ? 'true' : someChecked ? 'mixed' : 'false'"
              role="checkbox"
              aria-label="全选"
              @click="toggleAll"
            >
              <wd-icon v-if="someChecked && !allChecked" name="minus" :size="10" />
              <wd-icon v-else-if="allChecked" name="check" :size="10" />
            </button>
          </th>
          <th
            v-for="col in props.columns"
            :key="col.key"
            :style="col.width ? { width: col.width } : undefined"
            class="wd-table__th"
            :class="{ 'wd-table__th--sort': col.sortable }"
            :aria-sort="sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'"
            @click="toggleSort(col.key, col)"
          >
            {{ col.title }}
            <span v-if="col.sortable" class="wd-table__sort">
              <wd-icon :name="sortKey !== col.key || sortDir === 'asc' ? 'arrow-up' : 'arrow-down'" :size="12" :style="{ color: sortKey === col.key ? 'var(--wd-red)' : 'var(--wd-ink-3)' }" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in sorted"
          :key="keyOf(row, i)"
          :class="{ 'wd-table__row--checked': selectable && selected.includes(row) }"
          @click="emit('rowClick', row, i)"
        >
          <td v-if="selectable" class="wd-table__td--check" @click.stop>
            <button
              type="button"
              class="wd-table__check"
              :class="{ 'wd-table__check--on': selected.includes(row) }"
              :aria-checked="selected.includes(row) ? 'true' : 'false'"
              role="checkbox"
              aria-label="选择此行"
              @click="toggleRow(row)"
            >
              <wd-icon v-if="selected.includes(row)" name="check" :size="10" />
            </button>
          </td>
          <td
            v-for="col in props.columns"
            :key="col.key"
            :style="col.align ? { textAlign: col.align } : undefined"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">{{ row[col.key] }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="!loading" class="wd-table__empty">{{ emptyText }}</div>

    <!-- 加载中：盖一层半透明遮罩 + 转圈，保留表头结构 -->
    <div v-if="loading" class="wd-table__loading">
      <span class="wd-spinner"></span>
      <span>{{ loadingText }}</span>
    </div>
  </div>
</template>

<style scoped>
.wd-table__th { cursor: default; }
.wd-table__th--sort { cursor: pointer; user-select: none; }
.wd-table__th--sort:hover { color: var(--wd-red-text); }
.wd-table__sort { display: inline-flex; margin-left: 5px; vertical-align: middle; }
.wd-table__th--check,
.wd-table__td--check { width: 44px; }
</style>
