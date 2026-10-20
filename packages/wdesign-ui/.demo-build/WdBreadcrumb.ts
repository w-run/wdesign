import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode } from "vue"

const _hoisted_1 = {
  class: "wd-breadcrumb",
  "aria-label": "面包屑"
}
const _hoisted_2 = {
  key: 0,
  class: "wd-breadcrumb__sep"
}
const _hoisted_3 = ["onClick"]

export interface WdBreadcrumbItem {
  label: string
  value?: string | number
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdBreadcrumb' },
  __name: 'WdBreadcrumb',
  props: {
    items: { type: Array, required: false, default: () => [] },
    separator: { type: String, required: false, default: '/' }
  },
  emits: ["select"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

function pick(item: WdBreadcrumbItem, index: number) {
  if (index === props.items.length - 1) return
  emit('select', item.value ?? index, index)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("nav", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.items, (item, i) => {
      return (_openBlock(), _createElementBlock(_Fragment, { key: i }, [
        (i > 0)
          ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(__props.separator), 1 /* TEXT */))
          : _createCommentVNode("v-if", true),
        _createElementVNode("button", {
          type: "button",
          class: _normalizeClass(["wd-breadcrumb__item", { 'wd-breadcrumb__item--current': i === props.items.length - 1 }]),
          onClick: ($event: any) => (pick(item, i))
        }, _toDisplayString(item.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_3)
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})