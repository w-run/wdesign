import { defineComponent as _defineComponent } from 'vue'
import { normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createTextVNode as _createTextVNode, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport, createBlock as _createBlock } from "vue"

const _hoisted_1 = { class: "wd-notification__body" }
const _hoisted_2 = {
  key: 0,
  class: "wd-notification__title"
}
const _hoisted_3 = {
  key: 1,
  class: "wd-notification__desc"
}

import { watchEffect } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdNotification' },
  __name: 'WdNotification',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' },
    variant: { type: String, required: false, default: 'info' }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

function close() {
  emit('update:modelValue', false)
}

watchEffect((onCleanup) => {
  if (!props.modelValue) return
  const fn = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }
  document.addEventListener('keydown', fn)
  onCleanup(() => document.removeEventListener('keydown', fn))
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createVNode(_Transition, { name: "wd-notification-fade" }, {
      default: _withCtx(() => [
        (__props.modelValue)
          ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              class: _normalizeClass(["wd-notification", `wd-notification--${__props.variant}`]),
              role: "alert"
            }, [
              _createElementVNode("span", {
                class: _normalizeClass(["wd-notification__icon wd-dot wd-dot--lg", `wd-dot--${__props.variant}`])
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
              _createElementVNode("button", {
                type: "button",
                class: "wd-icon-btn wd-icon-btn--ghost wd-icon-btn--sm",
                "aria-label": "关闭",
                onClick: close
              }, [...(_cache[0] || (_cache[0] = [
                _createElementVNode("svg", {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.6",
                  "stroke-linecap": "round"
                }, [
                  _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                ], -1 /* CACHED */)
              ]))])
            ], 2 /* CLASS */))
          : _createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    })
  ]))
}
}

})