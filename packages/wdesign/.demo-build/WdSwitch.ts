import { defineComponent as _defineComponent } from 'vue'
import { unref as _unref, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = ["aria-checked", "data-controlled", "disabled"]

import { computed } from 'vue'
import { useControllable } from './controllable'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSwitch' },
  __name: 'WdSwitch',
  props: {
    modelValue: { type: Boolean, required: false },
    defaultValue: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const { value, set, controlled } = useControllable<boolean>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: false,
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

function toggle() {
  if (!props.disabled) set(!value.value)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("button", {
    type: "button",
    role: "switch",
    class: _normalizeClass(["wd-switch", { 'wd-switch--off': !_unref(value) }]),
    "aria-checked": _unref(value),
    "data-controlled": _unref(controlled) ? 'true' : 'false',
    disabled: __props.disabled,
    onClick: toggle
  }, [...(_cache[0] || (_cache[0] = [
    _createElementVNode("span", { class: "wd-switch__knob" }, null, -1 /* CACHED */)
  ]))], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

})