import { defineComponent as _defineComponent } from 'vue'
import { normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue"

const _hoisted_1 = { class: "wd-slider" }
const _hoisted_2 = ["min", "max", "step", "value"]
const _hoisted_3 = {
  key: 0,
  class: "wd-slider__value"
}

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSlider' },
  __name: 'WdSlider',
  props: {
    modelValue: { type: Number, required: false, default: 0 },
    min: { type: Number, required: false, default: 0 },
    max: { type: Number, required: false, default: 100 },
    step: { type: Number, required: false, default: 1 },
    showValue: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const percent = computed(() => {
  const span = props.max - props.min || 1
  return Math.max(0, Math.min(100, ((props.modelValue - props.min) / span) * 100))
})

const trackStyle = computed(() => ({
  background: `linear-gradient(to right, var(--wd-red) 0%, var(--wd-red) ${percent.value}%, var(--wd-tint-2) ${percent.value}%, var(--wd-tint-2) 100%)`,
}))

function onInput(e: Event) {
  emit('update:modelValue', Number((e.target as HTMLInputElement).value))
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("input", {
      type: "range",
      min: __props.min,
      max: __props.max,
      step: __props.step,
      value: __props.modelValue,
      style: _normalizeStyle(trackStyle.value),
      onInput: onInput
    }, null, 44 /* STYLE, PROPS, NEED_HYDRATION */, _hoisted_2),
    (__props.showValue)
      ? (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(__props.modelValue), 1 /* TEXT */))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})