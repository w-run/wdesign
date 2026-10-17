import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-input__icon"
}
const _hoisted_2 = ["type", "value", "placeholder", "disabled"]


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdInput' },
  __name: 'WdInput',
  props: {
    modelValue: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    shape: { type: String, required: false, default: 'pill' },
    type: { type: String, required: false, default: 'text' },
    disabled: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: 'md' }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {





const emit = __emit

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("label", {
    class: _normalizeClass(["wd-input", { 'wd-input--rounded': __props.shape === 'rounded', 'wd-input--lg': __props.size === 'lg', 'wd-input--sm': __props.size === 'sm' }])
  }, [
    (_ctx.$slots.icon)
      ? (_openBlock(), _createElementBlock("span", _hoisted_1, [
          _renderSlot(_ctx.$slots, "icon")
        ]))
      : _createCommentVNode("v-if", true),
    _createElementVNode("input", {
      type: __props.type,
      value: __props.modelValue,
      placeholder: __props.placeholder,
      disabled: __props.disabled,
      onInput: onInput
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_2),
    _renderSlot(_ctx.$slots, "suffix")
  ], 2 /* CLASS */))
}
}

})