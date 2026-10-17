import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-badge__dot"
}
const _hoisted_2 = {
  key: 1,
  class: "wd-badge__count"
}

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdBadge' },
  __name: 'WdBadge',
  props: {
    value: { type: [Number, String], required: false, default: '' },
    dot: { type: Boolean, required: false, default: false },
    max: { type: Number, required: false, default: 99 },
    tone: { type: String, required: false, default: 'red' }
  },
  setup(__props: any) {



const props = __props

const display = computed(() => {
  if (typeof props.value === 'number' && props.max && props.value > props.max) {
    return `${props.max}+`
  }
  return props.value
})

const showCount = computed(
  () => !props.dot && props.value !== '' && props.value !== undefined && props.value !== null,
)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(["wd-badge", __props.tone === 'gray' ? 'wd-badge--gray' : ''])
  }, [
    _renderSlot(_ctx.$slots, "default"),
    (__props.dot)
      ? (_openBlock(), _createElementBlock("span", _hoisted_1))
      : (showCount.value)
        ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(display.value), 1 /* TEXT */))
        : _createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

})