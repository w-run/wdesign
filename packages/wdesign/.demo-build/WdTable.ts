import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, renderList as _renderList, Fragment as _Fragment, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, createTextVNode as _createTextVNode, withModifiers as _withModifiers, renderSlot as _renderSlot } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-table__th wd-table__th--check"
}
const _hoisted_2 = ["aria-checked"]
const _hoisted_3 = {
  key: 0,
  width: "10",
  height: "10",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "3.6",
  "stroke-linecap": "round"
}
const _hoisted_4 = {
  key: 1,
  width: "10",
  height: "10",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "3.6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}
const _hoisted_5 = ["aria-sort", "onClick"]
const _hoisted_6 = {
  key: 0,
  class: "wd-table__sort"
}
const _hoisted_7 = {
  key: 0,
  d: "M12 5l7 7H5l7-7z"
}
const _hoisted_8 = {
  key: 1,
  d: "M12 19l-7-7h14l-7 7z"
}
const _hoisted_9 = ["onClick"]
const _hoisted_10 = ["aria-checked", "onClick"]
const _hoisted_11 = {
  key: 0,
  width: "10",
  height: "10",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "3.6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}
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
}

type Row = Record<string, unknown>


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
    maxHeight: { type: [Number, String], required: false, default: '' }
  },
  emits: ["update:selected", "change", "rowClick"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

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

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-table-wrap", { 'wd-table-wrap--loading': __props.loading }]),
    style: _normalizeStyle(wrapStyle.value)
  }, [
    (props.rows.length)
      ? (_openBlock(), _createElementBlock("table", {
          key: 0,
          class: _normalizeClass(["wd-table", { 'wd-table--striped': __props.striped }])
        }, [
          _createElementVNode("thead", null, [
            _createElementVNode("tr", null, [
              (__props.selectable)
                ? (_openBlock(), _createElementBlock("th", _hoisted_1, [
                    _createElementVNode("button", {
                      type: "button",
                      class: _normalizeClass(["wd-table__check", { 'wd-table__check--on': allChecked.value, 'wd-table__check--part': someChecked.value }]),
                      "aria-checked": allChecked.value ? 'true' : someChecked.value ? 'mixed' : 'false',
                      role: "checkbox",
                      "aria-label": "全选",
                      onClick: toggleAll
                    }, [
                      (someChecked.value && !allChecked.value)
                        ? (_openBlock(), _createElementBlock("svg", _hoisted_3, [...(_cache[1] || (_cache[1] = [
                            _createElementVNode("path", { d: "M6 12h12" }, null, -1 /* CACHED */)
                          ]))]))
                        : (allChecked.value)
                          ? (_openBlock(), _createElementBlock("svg", _hoisted_4, [...(_cache[2] || (_cache[2] = [
                              _createElementVNode("path", { d: "m4.5 12.5 5 5 10-11" }, null, -1 /* CACHED */)
                            ]))]))
                          : _createCommentVNode("v-if", true)
                    ], 10 /* CLASS, PROPS */, _hoisted_2)
                  ]))
                : _createCommentVNode("v-if", true),
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.columns, (col) => {
                return (_openBlock(), _createElementBlock("th", {
                  key: col.key,
                  style: _normalizeStyle(col.width ? { width: col.width } : undefined),
                  class: _normalizeClass(["wd-table__th", { 'wd-table__th--sort': col.sortable }]),
                  "aria-sort": sortKey.value === col.key ? (sortDir.value === 'asc' ? 'ascending' : 'descending') : 'none',
                  onClick: ($event: any) => (toggleSort(col.key, col))
                }, [
                  _createTextVNode(_toDisplayString(col.title) + " ", 1 /* TEXT */),
                  (col.sortable)
                    ? (_openBlock(), _createElementBlock("span", _hoisted_6, [
                        (_openBlock(), _createElementBlock("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          style: _normalizeStyle({ color: sortKey.value === col.key ? 'var(--wd-red)' : 'var(--wd-ink-3)' })
                        }, [
                          (sortKey.value !== col.key || sortDir.value === 'asc')
                            ? (_openBlock(), _createElementBlock("path", _hoisted_7))
                            : (_openBlock(), _createElementBlock("path", _hoisted_8))
                        ], 4 /* STYLE */))
                      ]))
                    : _createCommentVNode("v-if", true)
                ], 14 /* CLASS, STYLE, PROPS */, _hoisted_5))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ]),
          _createElementVNode("tbody", null, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(sorted.value, (row, i) => {
              return (_openBlock(), _createElementBlock("tr", {
                key: keyOf(row, i),
                class: _normalizeClass({ 'wd-table__row--checked': __props.selectable && __props.selected.includes(row) }),
                onClick: ($event: any) => (emit('rowClick', row, i))
              }, [
                (__props.selectable)
                  ? (_openBlock(), _createElementBlock("td", {
                      key: 0,
                      class: "wd-table__td--check",
                      onClick: _cache[0] || (_cache[0] = _withModifiers(() => {}, ["stop"]))
                    }, [
                      _createElementVNode("button", {
                        type: "button",
                        class: _normalizeClass(["wd-table__check", { 'wd-table__check--on': __props.selected.includes(row) }]),
                        "aria-checked": __props.selected.includes(row) ? 'true' : 'false',
                        role: "checkbox",
                        "aria-label": "选择此行",
                        onClick: ($event: any) => (toggleRow(row))
                      }, [
                        (__props.selected.includes(row))
                          ? (_openBlock(), _createElementBlock("svg", _hoisted_11, [...(_cache[3] || (_cache[3] = [
                              _createElementVNode("path", { d: "m4.5 12.5 5 5 10-11" }, null, -1 /* CACHED */)
                            ]))]))
                          : _createCommentVNode("v-if", true)
                      ], 10 /* CLASS, PROPS */, _hoisted_10)
                    ]))
                  : _createCommentVNode("v-if", true),
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.columns, (col) => {
                  return (_openBlock(), _createElementBlock("td", {
                    key: col.key,
                    style: _normalizeStyle(col.align ? { textAlign: col.align } : undefined)
                  }, [
                    _renderSlot(_ctx.$slots, `cell-${col.key}`, {
                      row: row,
                      value: row[col.key]
                    }, () => [
                      _createTextVNode(_toDisplayString(row[col.key]), 1 /* TEXT */)
                    ])
                  ], 4 /* STYLE */))
                }), 128 /* KEYED_FRAGMENT */))
              ], 10 /* CLASS, PROPS */, _hoisted_9))
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