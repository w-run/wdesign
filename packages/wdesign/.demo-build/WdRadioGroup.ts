import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, unref as _unref, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = {
  class: "wd-radio-group",
  role: "radiogroup"
}
const _hoisted_2 = ["aria-checked", "disabled", "onClick"]
const _hoisted_3 = { class: "wd-radio__label" }

import { computed } from 'vue'
import { useControllable } from './controllable'

type Option = string | { label: string; value: string | number }


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdRadioGroup' },
  __name: 'WdRadioGroup',
  props: {
    modelValue: { type: [String, Number], required: false },
    defaultValue: { type: [String, Number], required: false },
    options: { type: Array, required: false, default: () => [] },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const { value, set } = useControllable<string | number>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: '',
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)

function pick(value: string | number) {
  if (!props.disabled) set(value)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (o) => {
      return (_openBlock(), _createElementBlock("button", {
        key: o.value,
        type: "button",
        role: "radio",
        class: _normalizeClass(["wd-radio", { 'wd-radio--checked': _unref(value) === o.value, 'wd-radio--disabled': __props.disabled }]),
        "aria-checked": _unref(value) === o.value,
        disabled: __props.disabled,
        onClick: ($event: any) => (pick(o.value))
      }, [
        _cache[0] || (_cache[0] = _createElementVNode("span", { class: "wd-radio__dot" }, [
          _createElementVNode("span", { class: "wd-radio__inner" })
        ], -1 /* CACHED */)),
        _createElementVNode("span", _hoisted_3, _toDisplayString(o.label), 1 /* TEXT */)
      ], 10 /* CLASS, PROPS */, _hoisted_2))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})