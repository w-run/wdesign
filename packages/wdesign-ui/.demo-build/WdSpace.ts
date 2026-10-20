import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSpace' },
  __name: 'WdSpace',
  props: {
    size: { type: [String, Number], required: false, default: 'md' },
    direction: { type: String, required: false, default: 'row' },
    wrap: { type: Boolean, required: false, default: false },
    between: { type: Boolean, required: false, default: false },
    center: { type: Boolean, required: false, default: false },
    grow: { type: Boolean, required: false, default: false }
  },
  setup(__props: any) {



const props = __props

const gap = computed(() => {
  if (typeof props.size === 'number') return `${props.size}px`
  return { sm: 'var(--wd-space-2)', md: 'var(--wd-space-3)', lg: 'var(--wd-space-6)' }[props.size]
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-space", {
      'wd-space--col': __props.direction === 'col',
      'wd-space--wrap': __props.wrap,
      'wd-space--between': __props.between,
      'wd-space--center': __props.center,
      'wd-space--grow': __props.grow,
    }]),
    style: _normalizeStyle({ gap: gap.value })
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 6 /* CLASS, STYLE */))
}
}

})