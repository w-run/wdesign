import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, renderSlot as _renderSlot, createTextVNode as _createTextVNode } from "vue"

const _hoisted_1 = { class: "wd-collapse" }
const _hoisted_2 = ["aria-expanded", "onClick"]
const _hoisted_3 = { class: "wd-collapse__body" }
const _hoisted_4 = { class: "wd-collapse__inner" }
const _hoisted_5 = { class: "wd-collapse__content" }

import { computed } from 'vue'

export interface WdCollapseItem {
  title: string
  content?: string
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdCollapse' },
  __name: 'WdCollapse',
  props: {
    modelValue: { type: Array, required: false, default: () => [] },
    items: { type: Array, required: false, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const openSet = computed(() => new Set(props.modelValue))

function toggle(i: number) {
  const next = new Set(props.modelValue)
  if (next.has(i)) next.delete(i)
  else next.add(i)
  emit('update:modelValue', [...next].sort((a, b) => a - b))
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.items, (item, i) => {
      return (_openBlock(), _createElementBlock("div", {
        key: i,
        class: _normalizeClass(["wd-collapse__item", { 'wd-collapse__item--open': openSet.value.has(i) }])
      }, [
        _createElementVNode("button", {
          type: "button",
          class: "wd-collapse__head",
          "aria-expanded": openSet.value.has(i),
          onClick: ($event: any) => (toggle(i))
        }, [
          _createElementVNode("span", null, _toDisplayString(item.title), 1 /* TEXT */),
          (_openBlock(), _createElementBlock("svg", {
            class: _normalizeClass(["wd-chevron", { 'wd-chevron--open': openSet.value.has(i) }]),
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.4",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [...(_cache[0] || (_cache[0] = [
            _createElementVNode("path", { d: "m6 9 6 6 6-6" }, null, -1 /* CACHED */)
          ]))], 2 /* CLASS */))
        ], 8 /* PROPS */, _hoisted_2),
        _createElementVNode("div", _hoisted_3, [
          _createElementVNode("div", _hoisted_4, [
            _createElementVNode("div", _hoisted_5, [
              _renderSlot(_ctx.$slots, `item-${i}`, { item: item }, () => [
                _createTextVNode(_toDisplayString(item.content), 1 /* TEXT */)
              ])
            ])
          ])
        ])
      ], 2 /* CLASS */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})