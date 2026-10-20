<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, ref } from 'vue'

defineOptions({ name: 'WdTable' })

export interface WdTableColumn {
  key: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  /** 固定到左侧或右侧（需配合 scrollX 使用） */
  fixed?: 'left' | 'right'
  /** 省略号截断 */
  ellipsis?: boolean
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
    /**
     * 树形模式：行的 children 字段作为子节点。
     * 与 expandable 不同的是，树形是**层级数据**，缩进展示。
     */
    tree?: boolean
    /** 子节点字段名，默认 children */
    childrenKey?: string
    /** 默认展开全部树节点 */
    defaultExpandAll?: boolean
    /** 开启行展开（每行可放详情区） */
    expandable?: boolean
    /** 展开区的列跨度（默认占满） */
    expandColspan?: number
    /** 行高密度 */
    size?: 'sm' | 'md'
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
    tree: false,
    childrenKey: 'children',
    defaultExpandAll: false,
    expandable: false,
    expandColspan: 0,
    size: 'md',
  },
)

const emit = defineEmits<{
  'update:selected': [rows: Row[]]
  change: [rows: Row[]]
  'row-click': [row: Row, index: number]
  'expand-change': [row: Row, expanded: boolean]
}>()

const sortKey = ref('')
const sortDir = ref<'asc' | 'desc'>('asc')

/* ---------------- 树形展开 ---------------- */
/**
 * 已展开的行 key。
 *
 * ⚠️ 用 key 而不是行对象引用：树形场景下父组件可能每次渲染都重建
 * 数据数组（比如从接口重新拉），引用一变展开态就全丢了。
 */
const expandedKeys = ref<Set<string>>(new Set())

function rowKeyOf(row: Row, i: number): string {
  const k = props.rowKey
  if (k && row[k] !== undefined) return String(row[k])
  return String(i)
}

/** 递归收集所有节点 key（用于 expandAll） */
function collectKeys(rows: Row[], prefix = ''): string[] {
  const out: string[] = []
  rows.forEach((r, i) => {
    const k = prefix ? `${prefix}-${i}` : String(i)
    out.push(props.rowKey && r[props.rowKey] !== undefined ? String(r[props.rowKey]) : k)
    const kids = r[props.childrenKey]
    if (Array.isArray(kids) && kids.length) out.push(...collectKeys(kids as Row[], k))
  })
  return out
}

if (props.defaultExpandAll) {
  expandedKeys.value = new Set(collectKeys(props.rows))
}

/**
 * 拍平成渲染用的列表。
 *
 * 树形表格必须拍平再渲染 —— 用递归组件会失去「表格行必须同层」的语义，
 * `<tr>` 不能嵌套在 `<tr>` 里，浏览器会强行纠正 DOM 导致列错位。
 * 拍平时顺便算出 depth（缩进用）与是否为最后一个子节点（画连接线用）。
 */
interface FlatRow {
  row: Row
  depth: number
  key: string
  hasChildren: boolean
  expanded: boolean
  parentKey: string | null
  /** 该节点在其父级 children 中的序号 */
  indexInParent: number
  /** 父级是否还有后续兄弟（决定连接线画到哪） */
  hasNextSibling: boolean
}

const flatRows = computed<FlatRow[]>(() => {
  if (!props.tree) {
    return props.rows.map((row, i) => ({
      row,
      depth: 0,
      key: rowKeyOf(row, i),
      hasChildren: false,
      expanded: false,
      parentKey: null,
      indexInParent: i,
      hasNextSibling: i < props.rows.length - 1,
    }))
  }

  const out: FlatRow[] = []
  const walk = (rows: Row[], depth: number, parentKey: string | null) => {
    rows.forEach((row, i) => {
      const key = rowKeyOf(row, i) === String(i) && depth > 0
        ? `${parentKey}-${i}`
        : rowKeyOf(row, i)
      const kids = row[props.childrenKey]
      const hasChildren = Array.isArray(kids) && kids.length > 0
      const expanded = expandedKeys.value.has(key)
      out.push({
        row,
        depth,
        key,
        hasChildren,
        expanded,
        parentKey,
        indexInParent: i,
        hasNextSibling: i < rows.length - 1,
      })
      if (hasChildren && expanded) {
        walk(kids as Row[], depth + 1, key)
      }
    })
  }
  walk(props.rows, 0, null)
  return out
})

function toggleExpand(item: FlatRow, e?: Event) {
  e?.stopPropagation()
  const next = new Set(expandedKeys.value)
  if (next.has(item.key)) next.delete(item.key)
  else next.add(item.key)
  expandedKeys.value = next
  emit('expand-change', item.row, next.has(item.key))
}

/* ---------------- 排序 ---------------- */
const sorted = computed(() => {
  // 树形模式不排序：层级结构一排序就散架了
  if (!sortKey.value || props.tree) return flatRows.value
  const arr = [...flatRows.value]
  arr.sort((a, b) => {
    const av = String(a.row[sortKey.value] ?? '')
    const bv = String(b.row[sortKey.value] ?? '')
    const cmp = av.localeCompare(bv, 'zh-CN', { numeric: true })
    return sortDir.value === 'asc' ? cmp : -cmp
  })
  return arr
})

/* ---------------- 勾选 ---------------- */
const selectedKeys = computed(() => new Set(props.selected.map((r, i) => rowKeyOf(r, i))))

function isChecked(row: Row, i: number): boolean {
  return props.selected.some((r) => r === row || rowKeyOf(r, 0) === rowKeyOf(row, i))
}

const allChecked = computed(
  () => props.rows.length > 0 && props.rows.every((r, i) => isChecked(r, i)),
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

/* ---------------- 行展开 ---------------- */
const expandedRowKeys = ref<Set<string>>(new Set())

function toggleRowExpand(item: FlatRow, e?: Event) {
  e?.stopPropagation()
  const next = new Set(expandedRowKeys.value)
  if (next.has(item.key)) next.delete(item.key)
  else next.add(item.key)
  expandedRowKeys.value = next
}

/* ---------------- 列固定 ---------------- */
const leftCols = computed(() => props.columns.filter((c) => c.fixed === 'left'))
const rightCols = computed(() => props.columns.filter((c) => c.fixed === 'right'))

/**
 * 固定列的 left 偏移。
 * 必须累加前面所有固定列的宽度 —— 用 `calc()` 写死不够灵活，
 * 而且勾选列/展开列是否在场会改变起始偏移。
 */
const leftOffsets = computed(() => {
  const map: Record<string, string> = {}
  let acc = 0
  if (props.expandable) acc += 40
  if (props.selectable) acc += 44
  for (const c of leftCols.value) {
    map[c.key] = acc + 'px'
    acc += parseWidth(c.width)
  }
  return map
})

const rightOffsets = computed(() => {
  const map: Record<string, string> = {}
  let acc = 0
  for (let i = rightCols.value.length - 1; i >= 0; i--) {
    const c = rightCols.value[i]
    map[c.key] = acc + 'px'
    acc += parseWidth(c.width)
  }
  return map
})

function parseWidth(w?: string): number {
  if (!w) return 120
  const n = parseFloat(w)
  return isNaN(n) ? 120 : n
}

const wrapStyle = computed(() =>
  props.maxHeight
    ? { maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight }
    : undefined,
)

/** 展开区 colspan：默认 = 所有列 + 勾选列 + 展开列 */
const colspan = computed(() => {
  if (props.expandColspan) return props.expandColspan
  return props.columns.length + (props.selectable ? 1 : 0) + (props.expandable ? 1 : 0)
})
</script>

<template>
  <div
    class="wd-table-wrap"
    :class="{
      'wd-table-wrap--loading': loading,
      'wd-table-wrap--fixed': leftCols.length || rightCols.length,
    }"
    :style="wrapStyle"
  >
    <table
      v-if="props.rows.length"
      class="wd-table"
      :class="[`wd-table--${size}`, { 'wd-table--striped': striped, 'wd-table--tree': tree }]"
    >
      <thead>
        <tr>
          <th v-if="expandable" class="wd-table__th wd-table__th--expand" aria-label="展开"></th>
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
            :style="[
              col.width ? { width: col.width } : undefined,
              col.fixed === 'left' ? { position: 'sticky', left: leftOffsets[col.key], zIndex: 3 } : undefined,
              col.fixed === 'right' ? { position: 'sticky', right: rightOffsets[col.key], zIndex: 3 } : undefined,
            ]"
            class="wd-table__th"
            :class="{
              'wd-table__th--sort': col.sortable,
              'wd-table__th--fixed-left': col.fixed === 'left',
              'wd-table__th--fixed-right': col.fixed === 'right',
              'wd-table__th--ellipsis': col.ellipsis,
            }"
            :aria-sort="sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'"
            @click="toggleSort(col.key, col)"
          >
            {{ col.title }}
            <span v-if="col.sortable" class="wd-table__sort">
              <wd-icon
                :name="sortKey !== col.key || sortDir === 'asc' ? 'arrow-up' : 'arrow-down'"
                :size="12"
                :style="{ color: sortKey === col.key ? 'var(--wd-red)' : 'var(--wd-ink-3)' }"
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, i) in sorted" :key="item.key">
          <tr
            class="wd-table__row"
            :class="{
              'wd-table__row--checked': selectable && isChecked(item.row, i),
              'wd-table__row--expanded': expandedRowKeys.has(item.key),
            }"
            @click="emit('row-click', item.row, i)"
          >
            <!-- 展开列 -->
            <td v-if="expandable" class="wd-table__td--expand" @click.stop>
              <button
                type="button"
                class="wd-table__expander"
                :class="{ 'is-open': expandedRowKeys.has(item.key) }"
                :aria-expanded="expandedRowKeys.has(item.key)"
                aria-label="展开行"
                @click="toggleRowExpand(item, $event)"
              >
                <wd-icon name="chevron-right" :size="13" />
              </button>
            </td>

            <!-- 勾选列 -->
            <td v-if="selectable" class="wd-table__td--check" @click.stop>
              <button
                type="button"
                class="wd-table__check"
                :class="{ 'wd-table__check--on': isChecked(item.row, i) }"
                :aria-checked="isChecked(item.row, i) ? 'true' : 'false'"
                role="checkbox"
                aria-label="选择此行"
                @click="toggleRow(item.row)"
              >
                <wd-icon v-if="isChecked(item.row, i)" name="check" :size="10" />
              </button>
            </td>

            <!-- 数据列 -->
            <td
              v-for="(col, ci) in props.columns"
              :key="col.key"
              :style="[
                col.align ? { textAlign: col.align } : undefined,
                col.fixed === 'left' ? { position: 'sticky', left: leftOffsets[col.key], zIndex: 2 } : undefined,
                col.fixed === 'right' ? { position: 'sticky', right: rightOffsets[col.key], zIndex: 2 } : undefined,
              ]"
              :class="{
                'wd-table__td--fixed-left': col.fixed === 'left',
                'wd-table__td--fixed-right': col.fixed === 'right',
                'wd-table__td--ellipsis': col.ellipsis,
              }"
            >
              <!--
                树形缩进放在**第一列的单元格内部**，而不是给整行加 padding：
                整行加 padding 会把固定列也推偏，缩进应该是内容层的属性。
              -->
              <span
                v-if="tree && ci === 0"
                class="wd-table__indent"
                :style="{ paddingLeft: item.depth * 18 + 'px' }"
              >
                <button
                  v-if="item.hasChildren"
                  type="button"
                  class="wd-table__tree-toggle"
                  :class="{ 'is-open': item.expanded }"
                  :aria-expanded="item.expanded"
                  :aria-label="item.expanded ? '收起' : '展开'"
                  @click.stop="toggleExpand(item, $event)"
                >
                  <wd-icon name="chevron-right" :size="12" />
                </button>
                <!-- 无子节点的叶子：占一个与箭头等宽的位，保持文字对齐 -->
                <span v-else class="wd-table__tree-spacer"></span>
              </span>

              <slot :name="`cell-${col.key}`" :row="item.row" :value="item.row[col.key]" :depth="item.depth">
                {{ item.row[col.key] }}
              </slot>
            </td>
          </tr>

          <!-- 行展开详情 -->
          <tr
            v-if="expandable && expandedRowKeys.has(item.key)"
            class="wd-table__expand-row"
          >
            <td :colspan="colspan" class="wd-table__expand-cell">
              <slot name="expand" :row="item.row" :index="i">
                <span class="wd-table__expand-empty">未提供 expand 插槽</span>
              </slot>
            </td>
          </tr>
        </template>
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
