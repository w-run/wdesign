import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, unref as _unref, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-tooltip__bubble",
  role: "tooltip"
}

import { ref } from 'vue'
import { popDuration } from './pop-duration'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTooltip' },
  __name: 'WdTooltip',
  props: {
    content: { type: String, required: false, default: '' },
    placement: { type: String, required: false, default: 'top' }
  },
  setup(__props: any) {

const POP_DURATION = popDuration()





const open = ref(false)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(["wd-tooltip", [`wd-tooltip--${__props.placement}`, { 'wd-tooltip--open': open.value }]]),
    onMouseenter: _cache[0] || (_cache[0] = ($event: any) => (open.value = true)),
    onMouseleave: _cache[1] || (_cache[1] = ($event: any) => (open.value = false)),
    onFocusin: _cache[2] || (_cache[2] = ($event: any) => (open.value = true)),
    onFocusout: _cache[3] || (_cache[3] = ($event: any) => (open.value = false))
  }, [
    _renderSlot(_ctx.$slots, "default"),
    _createVNode(_Transition, {
      name: "wd-pop",
      duration: _unref(POP_DURATION)
    }, {
      default: _withCtx(() => [
        (open.value)
          ? (_openBlock(), _createElementBlock("span", _hoisted_1, _toDisplayString(__props.content), 1 /* TEXT */))
          : _createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["duration"])
  ], 34 /* CLASS, NEED_HYDRATION */))
}
}

})