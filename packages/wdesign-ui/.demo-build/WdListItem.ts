import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-list-item__icon"
}
const _hoisted_2 = { class: "wd-list-item__title" }
const _hoisted_3 = {
  key: 1,
  class: "wd-list-item__meta"
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdListItem' },
  __name: 'WdListItem',
  props: {
    title: { type: String, required: false, default: '' },
    meta: { type: String, required: false, default: '' },
    clickable: { type: Boolean, required: false, default: true }
  },
  emits: ["click"],
  setup(__props: any, { emit: __emit }) {





const emit = __emit

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    "data-wd-hover": "",
    class: _normalizeClass(["wd-list-item", { 'wd-list-item--clickable': __props.clickable }]),
    onClick: _cache[0] || (_cache[0] = ($event: any) => (__props.clickable && emit('click', $event)))
  }, [
    (_ctx.$slots.icon)
      ? (_openBlock(), _createElementBlock("span", _hoisted_1, [
          _renderSlot(_ctx.$slots, "icon")
        ]))
      : _createCommentVNode("v-if", true),
    _createElementVNode("span", _hoisted_2, _toDisplayString(__props.title), 1 /* TEXT */),
    (__props.meta)
      ? (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(__props.meta), 1 /* TEXT */))
      : _createCommentVNode("v-if", true),
    _renderSlot(_ctx.$slots, "extra")
  ], 2 /* CLASS */))
}
}

})