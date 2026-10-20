import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdCard' },
  __name: 'WdCard',
  props: {
    variant: { type: String, required: false, default: 'default' },
    padding: { type: String, required: false, default: 'md' },
    hoverable: { type: Boolean, required: false, default: false }
  },
  setup(__props: any) {



const props = __props

const classes = computed(() => [
  'wd-card',
  props.variant !== 'default' ? `wd-card--${props.variant}` : '',
  props.padding !== 'md' ? `wd-card--pad-${props.padding}` : '',
  props.hoverable ? 'wd-card--hoverable' : '',
])

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(classes.value),
    "data-wd-hover": ""
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}
}

})