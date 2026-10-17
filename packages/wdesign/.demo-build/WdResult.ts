import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createElementBlock as _createElementBlock, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = { class: "wd-result__icon" }
const _hoisted_2 = {
  key: 0,
  class: "wd-result__title"
}
const _hoisted_3 = {
  key: 1,
  class: "wd-result__desc"
}
const _hoisted_4 = {
  key: 2,
  class: "wd-result__extra"
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdResult' },
  __name: 'WdResult',
  props: {
    status: { type: String, required: false, default: 'info' },
    title: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' }
  },
  setup(__props: any) {





return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-result", `wd-result--${__props.status}`])
  }, [
    _createElementVNode("div", _hoisted_1, [
      _renderSlot(_ctx.$slots, "icon", {}, () => [
        (__props.status === 'success')
          ? (_openBlock(), _createBlock(_component_wd_icon, {
              key: 0,
              name: "check-circle",
              size: 30
            }))
          : (__props.status === 'warning')
            ? (_openBlock(), _createBlock(_component_wd_icon, {
                key: 1,
                name: "warning-circle",
                size: 30
              }))
            : (__props.status === 'error')
              ? (_openBlock(), _createBlock(_component_wd_icon, {
                  key: 2,
                  name: "close-circle",
                  size: 30
                }))
              : (_openBlock(), _createBlock(_component_wd_icon, {
                  key: 3,
                  name: "info-circle",
                  size: 30
                }))
      ])
    ]),
    (__props.title)
      ? (_openBlock(), _createElementBlock("div", _hoisted_2, _toDisplayString(__props.title), 1 /* TEXT */))
      : _createCommentVNode("v-if", true),
    (__props.description || _ctx.$slots.default)
      ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
          _renderSlot(_ctx.$slots, "default", {}, () => [
            _createTextVNode(_toDisplayString(__props.description), 1 /* TEXT */)
          ])
        ]))
      : _createCommentVNode("v-if", true),
    (_ctx.$slots.extra)
      ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
          _renderSlot(_ctx.$slots, "extra")
        ]))
      : _createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

})