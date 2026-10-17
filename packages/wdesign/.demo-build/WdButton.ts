import { defineComponent as _defineComponent } from 'vue'
import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, Fragment as _Fragment, renderSlot as _renderSlot, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = ["type", "disabled", "aria-busy"]
const _hoisted_2 = {
  key: 0,
  class: "wd-btn__spinner",
  "aria-hidden": "true"
}

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdButton' },
  __name: 'WdButton',
  props: {
    variant: { type: String, required: false, default: 'primary' },
    size: { type: String, required: false, default: 'md' },
    disabled: { type: Boolean, required: false, default: false },
    iconOnly: { type: Boolean, required: false, default: false },
    block: { type: Boolean, required: false, default: false },
    loading: { type: Boolean, required: false, default: false },
    loadingText: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: 'button' }
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
    'wd-btn--loading': props.loading,
  },
])

function onClick(e: MouseEvent) {
  // 加载中拦截点击：避免重复提交（这是 loading 最主要的用途）
  if (props.loading || props.disabled) return
  emit('click', e)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("button", {
    "data-wd-hover": "",
    class: _normalizeClass(classes.value),
    type: __props.type,
    disabled: __props.disabled || __props.loading,
    "aria-busy": __props.loading || undefined,
    onClick: onClick
  }, [
    (__props.loading)
      ? (_openBlock(), _createElementBlock("span", _hoisted_2))
      : _createCommentVNode("v-if", true),
    (__props.loading && __props.loadingText)
      ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
          _createTextVNode(_toDisplayString(__props.loadingText), 1 /* TEXT */)
        ], 64 /* STABLE_FRAGMENT */))
      : _renderSlot(_ctx.$slots, "default", {}, undefined, undefined, 2)
  ], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

})