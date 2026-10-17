import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle } from "vue"

const _hoisted_1 = { class: "wd-file-list" }
const _hoisted_2 = ["onClick"]
const _hoisted_3 = {
  key: 0,
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}
const _hoisted_4 = { class: "wd-file-list__icon" }
const _hoisted_5 = {
  key: 0,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}
const _hoisted_6 = {
  key: 1,
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}
const _hoisted_7 = { class: "wd-file-list__name" }
const _hoisted_8 = { class: "wd-file-list__size" }

import { computed, ref } from 'vue'

export interface WdFileNode {
  name: string
  type?: 'file' | 'folder'
  size?: number
  children?: WdFileNode[]
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdFileList' },
  __name: 'WdFileList',
  props: {
    items: { type: Array, required: false, default: () => [] }
  },
  emits: ["select"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const openPaths = ref<Set<string>>(new Set())

/** 扁平化：只展开 openPaths 命中的层级（避免递归组件） */
const rows = computed(() => {
  const out: { node: WdFileNode; depth: number; path: string }[] = []
  const walk = (nodes: WdFileNode[], depth: number, base: string) => {
    nodes.forEach((n, i) => {
      const path = `${base}${i}/`
      out.push({ node: n, depth, path })
      if (n.type === 'folder' && openPaths.value.has(path)) {
        walk(n.children || [], depth + 1, path)
      }
    })
  }
  walk(props.items, 0, '')
  return out
})

function onRow(row: { node: WdFileNode; path: string }) {
  if (row.node.type === 'folder') {
    const s = new Set(openPaths.value)
    if (s.has(row.path)) s.delete(row.path)
    else s.add(row.path)
    openPaths.value = s
  } else {
    emit('select', row.node)
  }
}

function fmtSize(n?: number) {
  if (!n) return ''
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(1)} MB`
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(rows.value, (row) => {
      return (_openBlock(), _createElementBlock("div", {
        key: row.path,
        class: _normalizeClass(["wd-file-list__row", `wd-file-list__row--${row.node.type || 'file'}`]),
        style: _normalizeStyle({ paddingLeft: 12 + row.depth * 20 + 'px' }),
        onClick: ($event: any) => (onRow(row))
      }, [
        _createCommentVNode(" 箭头列始终占位：文件夹与文件的图标保持同列对齐 "),
        _createElementVNode("span", {
          class: _normalizeClass(["wd-file-list__chevron wd-chevron wd-chevron--right", { 'wd-chevron--open': openPaths.value.has(row.path) }])
        }, [
          (row.node.type === 'folder')
            ? (_openBlock(), _createElementBlock("svg", _hoisted_3, [...(_cache[0] || (_cache[0] = [
                _createElementVNode("path", { d: "m9 6 6 6-6 6" }, null, -1 /* CACHED */)
              ]))]))
            : _createCommentVNode("v-if", true)
        ], 2 /* CLASS */),
        _createElementVNode("span", _hoisted_4, [
          (row.node.type === 'folder')
            ? (_openBlock(), _createElementBlock("svg", _hoisted_5, [...(_cache[1] || (_cache[1] = [
                _createElementVNode("path", { d: "M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" }, null, -1 /* CACHED */)
              ]))]))
            : (_openBlock(), _createElementBlock("svg", _hoisted_6, [...(_cache[2] || (_cache[2] = [
                _createElementVNode("path", { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" }, null, -1 /* CACHED */)
              ]))]))
        ]),
        _createElementVNode("span", _hoisted_7, _toDisplayString(row.node.name), 1 /* TEXT */),
        _createElementVNode("span", _hoisted_8, _toDisplayString(fmtSize(row.node.size)), 1 /* TEXT */)
      ], 14 /* CLASS, STYLE, PROPS */, _hoisted_2))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})