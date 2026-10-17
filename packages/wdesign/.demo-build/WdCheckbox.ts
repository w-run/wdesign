import { defineComponent as _defineComponent } from 'vue'
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createElementVNode as _createElementVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = ["aria-checked", "disabled"]
const _hoisted_2 = { class: "wd-checkbox__box" }
const _hoisted_3 = {
  key: 0,
  class: "wd-checkbox__label"
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdCheckbox' },
  __name: 'WdCheckbox',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    label: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue)
}

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("button", {
    type: "button",
    role: "checkbox",
    class: _normalizeClass(["wd-checkbox", { 'wd-checkbox--checked': __props.modelValue, 'wd-checkbox--disabled': __props.disabled }]),
    "aria-checked": __props.modelValue,
    disabled: __props.disabled,
    onClick: toggle
  }, [
    _createElementVNode("span", _hoisted_2, [
      _createVNode(_component_wd_icon, {
        name: "check",
        size: 13
      })
    ]),
    (__props.label || _ctx.$slots.default)
      ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
          _renderSlot(_ctx.$slots, "default", {}, () => [
            _createTextVNode(_toDisplayString(__props.label), 1 /* TEXT */)
          ])
        ]))
      : _createCommentVNode("v-if", true)
  ], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

})