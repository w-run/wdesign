import { defineComponent as _defineComponent } from 'vue'
import { normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSpinner' },
  __name: 'WdSpinner',
  props: {
    size: { type: String, required: false, default: 'md' }
  },
  setup(__props: any) {





return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(["wd-spinner", __props.size !== 'md' ? `wd-spinner--${__props.size}` : '']),
    role: "status",
    "aria-label": "加载中"
  }, null, 2 /* CLASS */))
}
}

})