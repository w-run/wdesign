import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, createVNode as _createVNode, renderSlot as _renderSlot, createTextVNode as _createTextVNode } from "vue"

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
    items: { type: Array, required: false, default: () => [] },
    accordion: { type: Boolean, required: false, default: false },
    collapsible: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const openSet = computed(() => new Set(props.modelValue))

function toggle(i: number) {
  if (!props.accordion) {
    const next = new Set(props.modelValue)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    emit('update:modelValue', [...next].sort((a, b) => a - b))
    return
  }

  /*
   * 手风琴：点开新项只保留这一项；点已展开项则全部收起
   * （collapsible=false 时保持展开，不允许全收）。
   *
   * ⚠️ 不能简写成 `openSet.has(i) ? [] : [i]` ——
   * collapsible=false 时点当前项会意外收起。
   */
  if (openSet.value.has(i)) {
    emit('update:modelValue', props.collapsible ? [] : [i])
  } else {
    emit('update:modelValue', [i])
  }
}

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

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
          _createVNode(_component_wd_icon, {
            class: _normalizeClass(["wd-chevron", { 'wd-chevron--open': openSet.value.has(i) }]),
            name: "chevron-down",
            size: 15
          }, null, 8 /* PROPS */, ["class"])
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