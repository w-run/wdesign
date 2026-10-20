import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveComponent as _resolveComponent, createVNode as _createVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode } from "vue"

const _hoisted_1 = { class: "wd-explorer" }
const _hoisted_2 = { class: "wd-explorer__side" }
const _hoisted_3 = ["onClick"]
const _hoisted_4 = { class: "wd-explorer__folder-name" }
const _hoisted_5 = { class: "wd-explorer__count" }
const _hoisted_6 = { class: "wd-explorer__main" }
const _hoisted_7 = { class: "wd-explorer__bar" }
const _hoisted_8 = { class: "wd-explorer__path" }
const _hoisted_9 = { class: "wd-explorer__crumb wd-explorer__crumb--cur" }
const _hoisted_10 = { class: "wd-explorer__views" }
const _hoisted_11 = {
  key: 0,
  class: "wd-explorer__table"
}
const _hoisted_12 = ["onClick"]
const _hoisted_13 = { class: "wd-explorer__name" }
const _hoisted_14 = { class: "wd-explorer__file-chip" }
const _hoisted_15 = { class: "wd-explorer__file-name" }
const _hoisted_16 = { class: "is-num" }
const _hoisted_17 = { class: "is-num" }
const _hoisted_18 = {
  key: 1,
  class: "wd-explorer__grid"
}
const _hoisted_19 = ["onClick"]
const _hoisted_20 = { class: "wd-explorer__tile-icon" }
const _hoisted_21 = { class: "wd-explorer__tile-name" }
const _hoisted_22 = { class: "wd-explorer__tile-size" }
const _hoisted_23 = {
  key: 2,
  class: "wd-explorer__empty"
}

import { computed, ref } from 'vue'

export interface WdExplorerFile {
  name: string
  size?: number
  modified?: string
}
export interface WdExplorerFolder {
  name: string
  files: WdExplorerFile[]
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdExplorer' },
  __name: 'WdExplorer',
  props: {
    folders: { type: Array, required: false, default: () => [] },
    view: { type: String, required: false, default: 'details' }
  },
  emits: ["select"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const active = ref(0)
const mode = ref<'details' | 'icons'>(props.view)
const current = computed(() => props.folders[active.value] || { name: '', files: [] })

function fmtSize(n?: number) {
  if (!n) return '—'
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(1)} MB`
}

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      _cache[3] || (_cache[3] = _createElementVNode("div", { class: "wd-explorer__side-title" }, "文件夹", -1 /* CACHED */)),
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.folders, (f, i) => {
        return (_openBlock(), _createElementBlock("button", {
          key: i,
          type: "button",
          class: _normalizeClass(["wd-explorer__folder", { 'wd-explorer__folder--active': i === active.value }]),
          onClick: ($event: any) => (active.value = i)
        }, [
          _createVNode(_component_wd_icon, {
            name: "folder",
            size: 15
          }),
          _createElementVNode("span", _hoisted_4, _toDisplayString(f.name), 1 /* TEXT */),
          _createElementVNode("span", _hoisted_5, _toDisplayString(f.files.length), 1 /* TEXT */)
        ], 10 /* CLASS, PROPS */, _hoisted_3))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    _createElementVNode("div", _hoisted_6, [
      _createElementVNode("div", _hoisted_7, [
        _createElementVNode("div", _hoisted_8, [
          _createElementVNode("span", {
            class: "wd-explorer__crumb",
            onClick: _cache[0] || (_cache[0] = ($event: any) => (active.value = 0))
          }, "全部文件"),
          _cache[4] || (_cache[4] = _createElementVNode("span", { class: "wd-explorer__sep" }, "/", -1 /* CACHED */)),
          _createElementVNode("span", _hoisted_9, _toDisplayString(current.value.name), 1 /* TEXT */)
        ]),
        _createElementVNode("div", _hoisted_10, [
          _createElementVNode("button", {
            type: "button",
            class: _normalizeClass(["wd-explorer__view-btn", { 'wd-explorer__view-btn--active': mode.value === 'details' }]),
            title: "详情",
            onClick: _cache[1] || (_cache[1] = ($event: any) => (mode.value = 'details'))
          }, [
            _createVNode(_component_wd_icon, {
              name: "search",
              size: 15
            })
          ], 2 /* CLASS */),
          _createElementVNode("button", {
            type: "button",
            class: _normalizeClass(["wd-explorer__view-btn", { 'wd-explorer__view-btn--active': mode.value === 'icons' }]),
            title: "图标",
            onClick: _cache[2] || (_cache[2] = ($event: any) => (mode.value = 'icons'))
          }, [
            _createVNode(_component_wd_icon, {
              name: "layout-grid",
              size: 15
            })
          ], 2 /* CLASS */)
        ])
      ]),
      (mode.value === 'details')
        ? (_openBlock(), _createElementBlock("table", _hoisted_11, [
            _cache[5] || (_cache[5] = _createElementVNode("colgroup", null, [
              _createElementVNode("col"),
              _createElementVNode("col", { style: {"width":"96px"} }),
              _createElementVNode("col", { style: {"width":"118px"} })
            ], -1 /* CACHED */)),
            _cache[6] || (_cache[6] = _createElementVNode("thead", null, [
              _createElementVNode("tr", null, [
                _createElementVNode("th", null, "名称"),
                _createElementVNode("th", { class: "is-num" }, "大小"),
                _createElementVNode("th", { class: "is-num" }, "修改时间")
              ])
            ], -1 /* CACHED */)),
            _createElementVNode("tbody", null, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(current.value.files, (f, i) => {
                return (_openBlock(), _createElementBlock("tr", {
                  key: i,
                  onClick: ($event: any) => (emit('select', f))
                }, [
                  _createElementVNode("td", null, [
                    _createElementVNode("span", _hoisted_13, [
                      _createElementVNode("span", _hoisted_14, [
                        _createVNode(_component_wd_icon, {
                          name: "file",
                          size: 15
                        })
                      ]),
                      _createElementVNode("span", _hoisted_15, _toDisplayString(f.name), 1 /* TEXT */)
                    ])
                  ]),
                  _createElementVNode("td", _hoisted_16, _toDisplayString(fmtSize(f.size)), 1 /* TEXT */),
                  _createElementVNode("td", _hoisted_17, _toDisplayString(f.modified || '—'), 1 /* TEXT */)
                ], 8 /* PROPS */, _hoisted_12))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ]))
        : (_openBlock(), _createElementBlock("div", _hoisted_18, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(current.value.files, (f, i) => {
              return (_openBlock(), _createElementBlock("button", {
                key: i,
                type: "button",
                class: "wd-explorer__tile",
                onClick: ($event: any) => (emit('select', f))
              }, [
                _createElementVNode("span", _hoisted_20, [
                  _createVNode(_component_wd_icon, {
                    name: "folder-open",
                    size: 22
                  })
                ]),
                _createElementVNode("span", _hoisted_21, _toDisplayString(f.name), 1 /* TEXT */),
                _createElementVNode("span", _hoisted_22, _toDisplayString(fmtSize(f.size)), 1 /* TEXT */)
              ], 8 /* PROPS */, _hoisted_19))
            }), 128 /* KEYED_FRAGMENT */))
          ])),
      (!current.value.files.length)
        ? (_openBlock(), _createElementBlock("div", _hoisted_23, "此文件夹为空"))
        : _createCommentVNode("v-if", true)
    ])
  ]))
}
}

})