import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle } from "vue"

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSkeleton' },
  __name: 'WdSkeleton',
  props: {
    variant: { type: String, required: false, default: 'text' },
    width: { type: [Number, String], required: false, default: '' },
    height: { type: [Number, String], required: false, default: '' },
    count: { type: Number, required: false, default: 3 }
  },
  setup(__props: any) {



const props = __props

function toSize(v: number | string): string {
  if (v === '' || v === undefined || v === null) return ''
  return typeof v === 'number' ? `${v}px` : v
}

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.variant === 'circle') {
    const s = toSize(props.width) || '48px'
    style.width = s
    style.height = toSize(props.height) || s
  } else {
    if (props.width) style.width = toSize(props.width)
    if (props.height) style.height = toSize(props.height)
    if (props.variant === 'rect' && !props.height) style.height = '80px'
  }
  return style
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-skeleton", `wd-skeleton--${__props.variant}`]),
    "aria-hidden": "true"
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.count, (i) => {
      return (_openBlock(), _createElementBlock("span", {
        key: i,
        class: _normalizeClass(["wd-skeleton__item", { 'wd-skeleton__item--text': __props.variant === 'text' }]),
        style: _normalizeStyle(itemStyle.value)
      }, null, 6 /* CLASS, STYLE */))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}
}

})