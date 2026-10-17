import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdGrid' },
  __name: 'WdGrid',
  props: {
    columns: { type: [Number, String], required: false, default: 1 },
    gap: { type: String, required: false, default: 'md' },
    gutter: { type: Number, required: false }
  },
  setup(__props: any) {



const props = __props

const cols = computed(() => {
  if (props.columns === 'auto') return 'repeat(auto-fit, minmax(200px, 1fr))'
  return `repeat(${props.columns}, 1fr)`
})

const gapValue = computed(() => {
  if (props.gutter) `${props.gutter}px`
  const val = { sm: 8, md: 16, lg: 24 }[props.gap] || 16
  return `${val}px`
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: "wd-grid",
    style: _normalizeStyle({ gridTemplateColumns: cols.value, gap: gapValue.value })
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 4 /* STYLE */))
}
}

})