import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = ["disabled"]

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdButton' },
  __name: 'WdButton',
  props: {
    variant: { type: String, required: false, default: 'primary' },
    size: { type: String, required: false, default: 'md' },
    disabled: { type: Boolean, required: false, default: false },
    iconOnly: { type: Boolean, required: false, default: false },
    block: { type: Boolean, required: false, default: false }
  },
  emits: ["click"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const classes = computed(() => [
  'wd-btn',
  `wd-btn--${props.variant}`,
  `wd-btn--${props.size}`,
  {
    'wd-btn--icon': props.iconOnly,
    'wd-btn--block': props.block,
  },
])

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("button", {
    "data-wd-hover": "",
    class: _normalizeClass(classes.value),
    type: "button",
    disabled: __props.disabled,
    onClick: _cache[0] || (_cache[0] = ($event: any) => (emit('click', $event)))
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

})