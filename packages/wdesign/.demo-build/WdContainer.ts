import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdContainer' },
  __name: 'WdContainer',
  props: {
    maxWidth: { type: String, required: false, default: '1200px' },
    pad: { type: String, required: false, default: 'md' }
  },
  setup(__props: any) {



const props = __props

// 水平 / 垂直内间距按档位成对给出。
// 只设 padding-inline 会让内容在容器里上下贴边（演示页曾因此上下内边距为 0）。
const PAD_X = { sm: 'var(--wd-space-3)', md: 'var(--wd-space-4)', lg: 'var(--wd-space-6)' }
const PAD_Y = { sm: 'var(--wd-space-3)', md: 'var(--wd-space-4)', lg: 'var(--wd-space-6)' }

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: "wd-container",
    style: _normalizeStyle({
      maxWidth: __props.maxWidth,
      paddingInline: PAD_X[props.pad],
      paddingBlock: PAD_Y[props.pad],
    })
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 4 /* STYLE */))
}
}

})