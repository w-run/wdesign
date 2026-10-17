import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = ["aria-checked", "disabled"]


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSwitch' },
  __name: 'WdSwitch',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {





const emit = __emit

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("button", {
    type: "button",
    role: "switch",
    class: _normalizeClass(["wd-switch", { 'wd-switch--off': !__props.modelValue }]),
    "aria-checked": __props.modelValue,
    disabled: __props.disabled,
    onClick: _cache[0] || (_cache[0] = ($event: any) => (emit('update:modelValue', !__props.modelValue)))
  }, [...(_cache[1] || (_cache[1] = [
    _createElementVNode("span", { class: "wd-switch__knob" }, null, -1 /* CACHED */)
  ]))], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

})