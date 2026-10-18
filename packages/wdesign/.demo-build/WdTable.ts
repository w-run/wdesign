import { defineComponent as _defineComponent } from 'vue'
import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, createBlock as _createBlock, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, createVNode as _createVNode, createTextVNode as _createTextVNode, withModifiers as _withModifiers, renderSlot as _renderSlot } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-table__th wd-table__th--expand",
  "aria-label": "展开"
}
const _hoisted_2 = {
  key: 1,
  class: "wd-table__th wd-table__th--check"
}
const _hoisted_3 = ["aria-checked"]
const _hoisted_4 = ["aria-sort", "onClick"]
const _hoisted_5 = {
  key: 0,
  class: "wd-table__sort"
}
const _hoisted_6 = ["onClick"]
const _hoisted_7 = ["aria-expanded", "onClick"]
const _hoisted_8 = ["aria-checked", "onClick"]
const _hoisted_9 = ["aria-expanded", "aria-label", "onClick"]
const _hoisted_10 = {
  key: 0,
  class: "wd-table__expand-row"
}
const _hoisted_11 = ["colspan"]
const _hoisted_12 = {
  key: 1,
  class: "wd-table__empty"
}
const _hoisted_13 = {
  key: 2,
  class: "wd-table__loading"
}

import { computed, ref } from 'vue'

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


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTable' },
  __name: 'WdTable',
  props: {
    columns: { type: Array, required: false, default: () => [] },
    rows: { type: Array, required: false, default: () => [] },
    striped: { type: Boolean, required: false, default: true },
    emptyText: { type: String, required: false, default: '暂无数据' },
    loading: { type: Boolean, required: false, default: false },
    loadingText: { type: String, required: false, default: '加载中…' },
    selectable: { type: Boolean, required: false, default: false },
    selected: { type: Array, required: false, default: () => [] },
    rowKey: { type: String, required: false, default: '' },
    maxHeight: { type: [Number, String], required: false, default: '' },
    tree: { type: Boolean, required: false, default: false },
    childrenKey: { type: String, required: false, default: 'children' },
    defaultExpandAll: { type: Boolean, required: false, default: false },
    expandable: { type: Boolean, required: false, default: false },
    expandColspan: { type: Number, required: false, default: 0 },
    size: { type: String, required: false, default: 'md' }
  },
  emits: ["update:selected", "change", "row-click", "expand-change"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

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

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-table-wrap", {
      'wd-table-wrap--loading': __props.loading,
      'wd-table-wrap--fixed': leftCols.value.length || rightCols.value.length,
    }]),
    style: _normalizeStyle(wrapStyle.value)
  }, [
    (props.rows.length)
      ? (_openBlock(), _createElementBlock("table", {
          key: 0,
          class: _normalizeClass(["wd-table", [`wd-table--${__props.size}`, { 'wd-table--striped': __props.striped, 'wd-table--tree': __props.tree }]])
        }, [
          _createElementVNode("thead", null, [
            _createElementVNode("tr", null, [
              (__props.expandable)
                ? (_openBlock(), _createElementBlock("th", _hoisted_1))
                : _createCommentVNode("v-if", true),
              (__props.selectable)
                ? (_openBlock(), _createElementBlock("th", _hoisted_2, [
                    _createElementVNode("button", {
                      type: "button",
                      class: _normalizeClass(["wd-table__check", { 'wd-table__check--on': allChecked.value, 'wd-table__check--part': someChecked.value }]),
                      "aria-checked": allChecked.value ? 'true' : someChecked.value ? 'mixed' : 'false',
                      role: "checkbox",
                      "aria-label": "全选",
                      onClick: toggleAll
                    }, [
                      (someChecked.value && !allChecked.value)
                        ? (_openBlock(), _createBlock(_component_wd_icon, {
                            key: 0,
                            name: "minus",
                            size: 10
                          }))
                        : (allChecked.value)
                          ? (_openBlock(), _createBlock(_component_wd_icon, {
                              key: 1,
                              name: "check",
                              size: 10
                            }))
                          : _createCommentVNode("v-if", true)
                    ], 10 /* CLASS, PROPS */, _hoisted_3)
                  ]))
                : _createCommentVNode("v-if", true),
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.columns, (col) => {
                return (_openBlock(), _createElementBlock("th", {
                  key: col.key,
                  style: _normalizeStyle([
              col.width ? { width: col.width } : undefined,
              col.fixed === 'left' ? { position: 'sticky', left: leftOffsets.value[col.key], zIndex: 3 } : undefined,
              col.fixed === 'right' ? { position: 'sticky', right: rightOffsets.value[col.key], zIndex: 3 } : undefined,
            ]),
                  class: _normalizeClass(["wd-table__th", {
              'wd-table__th--sort': col.sortable,
              'wd-table__th--fixed-left': col.fixed === 'left',
              'wd-table__th--fixed-right': col.fixed === 'right',
              'wd-table__th--ellipsis': col.ellipsis,
            }]),
                  "aria-sort": sortKey.value === col.key ? (sortDir.value === 'asc' ? 'ascending' : 'descending') : 'none',
                  onClick: ($event: any) => (toggleSort(col.key, col))
                }, [
                  _createTextVNode(_toDisplayString(col.title) + " ", 1 /* TEXT */),
                  (col.sortable)
                    ? (_openBlock(), _createElementBlock("span", _hoisted_5, [
                        _createVNode(_component_wd_icon, {
                          name: sortKey.value !== col.key || sortDir.value === 'asc' ? 'arrow-up' : 'arrow-down',
                          size: 12,
                          style: _normalizeStyle({ color: sortKey.value === col.key ? 'var(--wd-red)' : 'var(--wd-ink-3)' })
                        }, null, 8 /* PROPS */, ["name", "style"])
                      ]))
                    : _createCommentVNode("v-if", true)
                ], 14 /* CLASS, STYLE, PROPS */, _hoisted_4))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ]),
          _createElementVNode("tbody", null, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(sorted.value, (item, i) => {
              return (_openBlock(), _createElementBlock(_Fragment, {
                key: item.key
              }, [
                _createElementVNode("tr", {
                  class: _normalizeClass(["wd-table__row", {
              'wd-table__row--checked': __props.selectable && isChecked(item.row, i),
              'wd-table__row--expanded': expandedRowKeys.value.has(item.key),
            }]),
                  onClick: ($event: any) => (emit('row-click', item.row, i))
                }, [
                  _createCommentVNode(" 展开列 "),
                  (__props.expandable)
                    ? (_openBlock(), _createElementBlock("td", {
                        key: 0,
                        class: "wd-table__td--expand",
                        onClick: _cache[0] || (_cache[0] = _withModifiers(() => {}, ["stop"]))
                      }, [
                        _createElementVNode("button", {
                          type: "button",
                          class: _normalizeClass(["wd-table__expander", { 'is-open': expandedRowKeys.value.has(item.key) }]),
                          "aria-expanded": expandedRowKeys.value.has(item.key),
                          "aria-label": "展开行",
                          onClick: ($event: any) => (toggleRowExpand(item, $event))
                        }, [
                          _createVNode(_component_wd_icon, {
                            name: "chevron-right",
                            size: 13
                          })
                        ], 10 /* CLASS, PROPS */, _hoisted_7)
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createCommentVNode(" 勾选列 "),
                  (__props.selectable)
                    ? (_openBlock(), _createElementBlock("td", {
                        key: 1,
                        class: "wd-table__td--check",
                        onClick: _cache[1] || (_cache[1] = _withModifiers(() => {}, ["stop"]))
                      }, [
                        _createElementVNode("button", {
                          type: "button",
                          class: _normalizeClass(["wd-table__check", { 'wd-table__check--on': isChecked(item.row, i) }]),
                          "aria-checked": isChecked(item.row, i) ? 'true' : 'false',
                          role: "checkbox",
                          "aria-label": "选择此行",
                          onClick: ($event: any) => (toggleRow(item.row))
                        }, [
                          (isChecked(item.row, i))
                            ? (_openBlock(), _createBlock(_component_wd_icon, {
                                key: 0,
                                name: "check",
                                size: 10
                              }))
                            : _createCommentVNode("v-if", true)
                        ], 10 /* CLASS, PROPS */, _hoisted_8)
                      ]))
                    : _createCommentVNode("v-if", true),
                  _createCommentVNode(" 数据列 "),
                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.columns, (col, ci) => {
                    return (_openBlock(), _createElementBlock("td", {
                      key: col.key,
                      style: _normalizeStyle([
                col.align ? { textAlign: col.align } : undefined,
                col.fixed === 'left' ? { position: 'sticky', left: leftOffsets.value[col.key], zIndex: 2 } : undefined,
                col.fixed === 'right' ? { position: 'sticky', right: rightOffsets.value[col.key], zIndex: 2 } : undefined,
              ]),
                      class: _normalizeClass({
                'wd-table__td--fixed-left': col.fixed === 'left',
                'wd-table__td--fixed-right': col.fixed === 'right',
                'wd-table__td--ellipsis': col.ellipsis,
              })
                    }, [
                      _createCommentVNode("\n                树形缩进放在**第一列的单元格内部**，而不是给整行加 padding：\n                整行加 padding 会把固定列也推偏，缩进应该是内容层的属性。\n              "),
                      (__props.tree && ci === 0)
                        ? (_openBlock(), _createElementBlock("span", {
                            key: 0,
                            class: "wd-table__indent",
                            style: _normalizeStyle({ paddingLeft: item.depth * 18 + 'px' })
                          }, [
                            (item.hasChildren)
                              ? (_openBlock(), _createElementBlock("button", {
                                  key: 0,
                                  type: "button",
                                  class: _normalizeClass(["wd-table__tree-toggle", { 'is-open': item.expanded }]),
                                  "aria-expanded": item.expanded,
                                  "aria-label": item.expanded ? '收起' : '展开',
                                  onClick: _withModifiers(($event: any) => (toggleExpand(item, $event)), ["stop"])
                                }, [
                                  _createVNode(_component_wd_icon, {
                                    name: "chevron-right",
                                    size: 12
                                  })
                                ], 10 /* CLASS, PROPS */, _hoisted_9))
                              : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                  _createCommentVNode(" 无子节点的叶子：占一个与箭头等宽的位，保持文字对齐 "),
                                  _cache[2] || (_cache[2] = _createElementVNode("span", { class: "wd-table__tree-spacer" }, null, -1 /* CACHED */))
                                ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                          ], 4 /* STYLE */))
                        : _createCommentVNode("v-if", true),
                      _renderSlot(_ctx.$slots, `cell-${col.key}`, {
                        row: item.row,
                        value: item.row[col.key],
                        depth: item.depth
                      }, () => [
                        _createTextVNode(_toDisplayString(item.row[col.key]), 1 /* TEXT */)
                      ])
                    ], 6 /* CLASS, STYLE */))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 10 /* CLASS, PROPS */, _hoisted_6),
                _createCommentVNode(" 行展开详情 "),
                (__props.expandable && expandedRowKeys.value.has(item.key))
                  ? (_openBlock(), _createElementBlock("tr", _hoisted_10, [
                      _createElementVNode("td", {
                        colspan: colspan.value,
                        class: "wd-table__expand-cell"
                      }, [
                        _renderSlot(_ctx.$slots, "expand", {
                          row: item.row,
                          index: i
                        }, () => [
                          _cache[3] || (_cache[3] = _createElementVNode("span", { class: "wd-table__expand-empty" }, "未提供 expand 插槽", -1 /* CACHED */))
                        ])
                      ], 8 /* PROPS */, _hoisted_11)
                    ]))
                  : _createCommentVNode("v-if", true)
              ], 64 /* STABLE_FRAGMENT */))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ], 2 /* CLASS */))
      : (!__props.loading)
        ? (_openBlock(), _createElementBlock("div", _hoisted_12, _toDisplayString(__props.emptyText), 1 /* TEXT */))
        : _createCommentVNode("v-if", true),
    _createCommentVNode(" 加载中：盖一层半透明遮罩 + 转圈，保留表头结构 "),
    (__props.loading)
      ? (_openBlock(), _createElementBlock("div", _hoisted_13, [
          _cache[4] || (_cache[4] = _createElementVNode("span", { class: "wd-spinner" }, null, -1 /* CACHED */)),
          _createElementVNode("span", null, _toDisplayString(__props.loadingText), 1 /* TEXT */)
        ]))
      : _createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}
}

})