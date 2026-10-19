import { defineComponent as _defineComponent } from 'vue'
import { normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = ["aria-valuenow"]

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdProgress' },
  __name: 'WdProgress',
  props: {
    value: { type: Number, required: false, default: 0 },
    thin: { type: Boolean, required: false, default: false },
    onDark: { type: Boolean, required: false, default: false },
    color: { type: String, required: false, default: '' }
  },
  setup(__props: any) {



const props = __props

const percent = computed(() => Math.max(0, Math.min(100, props.value)))
const classes = computed(() => [
  'wd-progress',
  props.thin ? 'wd-progress--thin' : '',
  props.onDark ? 'wd-progress--on-dark' : '',
])

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(classes.value),
    role: "progressbar",
    "aria-valuenow": percent.value,
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    style: _normalizeStyle(__props.color ? { '--wd-progress-color': __props.color } : undefined)
  }, [
    _createElementVNode("span", {
      class: "wd-progress__bar",
      style: _normalizeStyle({ width: percent.value + '%' })
    }, null, 4 /* STYLE */)
  ], 14 /* CLASS, STYLE, PROPS */, _hoisted_1))
}
}

})