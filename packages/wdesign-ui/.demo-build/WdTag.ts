import { defineComponent as _defineComponent } from 'vue'
import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-tag__dot"
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTag' },
  __name: 'WdTag',
  props: {
    variant: { type: String, required: false, default: 'tint' },
    size: { type: String, required: false },
    dot: { type: Boolean, required: false, default: false }
  },
  setup(__props: any) {





return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(["wd-tag", [`wd-tag--${__props.variant}`, { 'wd-tag--lg': __props.size === 'lg', 'wd-tag--sm': __props.size === 'sm' }]]),
    "data-wd-hover": ""
  }, [
    (__props.dot)
      ? (_openBlock(), _createElementBlock("i", _hoisted_1))
      : _createCommentVNode("v-if", true),
    _renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}
}

})