import { defineComponent as _defineComponent } from 'vue'
import { normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createTextVNode as _createTextVNode } from "vue"

const _hoisted_1 = { class: "wd-alert__body" }
const _hoisted_2 = {
  key: 0,
  class: "wd-alert__title"
}
const _hoisted_3 = {
  key: 1,
  class: "wd-alert__desc"
}

import { ref } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdAlert' },
  __name: 'WdAlert',
  props: {
    variant: { type: String, required: false, default: 'info' },
    title: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' },
    closable: { type: Boolean, required: false, default: false }
  },
  emits: ["close"],
  setup(__props: any, { emit: __emit }) {





const emit = __emit

const visible = ref(true)

function close() {
  visible.value = false
  emit('close')
}

return (_ctx: any,_cache: any) => {
  return (visible.value)
    ? (_openBlock(), _createElementBlock("div", {
        key: 0,
        class: _normalizeClass(["wd-alert", `wd-alert--${__props.variant}`]),
        role: "alert"
      }, [
        _createElementVNode("span", {
          class: _normalizeClass(["wd-alert__icon wd-dot wd-dot--lg", `wd-dot--${__props.variant}`])
        }, null, 2 /* CLASS */),
        _createElementVNode("div", _hoisted_1, [
          (__props.title)
            ? (_openBlock(), _createElementBlock("div", _hoisted_2, _toDisplayString(__props.title), 1 /* TEXT */))
            : _createCommentVNode("v-if", true),
          (__props.description || _ctx.$slots.default)
            ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
                _renderSlot(_ctx.$slots, "default", {}, () => [
                  _createTextVNode(_toDisplayString(__props.description), 1 /* TEXT */)
                ])
              ]))
            : _createCommentVNode("v-if", true)
        ]),
        (__props.closable)
          ? (_openBlock(), _createElementBlock("button", {
              key: 0,
              type: "button",
              class: "wd-alert__close",
              "aria-label": "关闭",
              onClick: close
            }, [...(_cache[0] || (_cache[0] = [
              _createElementVNode("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.6",
                "stroke-linecap": "round"
              }, [
                _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
              ], -1 /* CACHED */)
            ]))]))
          : _createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
    : _createCommentVNode("v-if", true)
}
}

})