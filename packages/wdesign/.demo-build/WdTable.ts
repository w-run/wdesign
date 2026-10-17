import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, renderSlot as _renderSlot } from "vue"

const _hoisted_1 = { class: "wd-table-wrap" }
const _hoisted_2 = ["aria-sort", "onClick"]
const _hoisted_3 = {
  key: 0,
  class: "wd-table__sort"
}
const _hoisted_4 = {
  key: 0,
  d: "M12 5l7 7H5l7-7z"
}
const _hoisted_5 = {
  key: 1,
  d: "M12 19l-7-7h14l-7 7z"
}
const _hoisted_6 = {
  key: 1,
  class: "wd-table__empty"
}

import { computed, ref } from 'vue'

export interface WdTableColumn {
  key: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTable' },
  __name: 'WdTable',
  props: {
    columns: { type: Array, required: false, default: () => [] },
    rows: { type: Array, required: false, default: () => [] },
    striped: { type: Boolean, required: false, default: true },
    emptyText: { type: String, required: false, default: '暂无数据' }
  },
  setup(__props: any) {



const props = __props

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

function toggleSort(key: string, col: WdTableColumn) {
  if (!col.sortable) return
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (props.rows.length)
      ? (_openBlock(), _createElementBlock("table", {
          key: 0,
          class: _normalizeClass(["wd-table", { 'wd-table--striped': __props.striped }])
        }, [
          _createElementVNode("thead", null, [
            _createElementVNode("tr", null, [
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
                    ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
                        (_openBlock(), _createElementBlock("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          style: _normalizeStyle({ color: sortKey.value === col.key ? 'var(--wd-red)' : 'var(--wd-ink-3)' })
                        }, [
                          (sortKey.value !== col.key || sortDir.value === 'asc')
                            ? (_openBlock(), _createElementBlock("path", _hoisted_4))
                            : (_openBlock(), _createElementBlock("path", _hoisted_5))
                        ], 4 /* STYLE */))
                      ]))
                    : _createCommentVNode("v-if", true)
                ], 14 /* CLASS, STYLE, PROPS */, _hoisted_2))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ]),
          _createElementVNode("tbody", null, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(sorted.value, (row, i) => {
              return (_openBlock(), _createElementBlock("tr", { key: i }, [
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
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ], 2 /* CLASS */))
      : (_openBlock(), _createElementBlock("div", _hoisted_6, _toDisplayString(__props.emptyText), 1 /* TEXT */))
  ]))
}
}

})