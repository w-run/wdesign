import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = { class: "wd-result__icon" }
const _hoisted_2 = {
  key: 0,
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}
const _hoisted_3 = {
  key: 1,
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}
const _hoisted_4 = {
  key: 2,
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.6",
  "stroke-linecap": "round"
}
const _hoisted_5 = {
  key: 3,
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.4",
  "stroke-linecap": "round"
}
const _hoisted_6 = {
  key: 0,
  class: "wd-result__title"
}
const _hoisted_7 = {
  key: 1,
  class: "wd-result__desc"
}
const _hoisted_8 = {
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
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-result", `wd-result--${__props.status}`])
  }, [
    _createElementVNode("div", _hoisted_1, [
      _renderSlot(_ctx.$slots, "icon", {}, () => [
        (__props.status === 'success')
          ? (_openBlock(), _createElementBlock("svg", _hoisted_2, [...(_cache[0] || (_cache[0] = [
              _createElementVNode("path", { d: "m4.5 12.5 5 5 10-11" }, null, -1 /* CACHED */)
            ]))]))
          : (__props.status === 'warning')
            ? (_openBlock(), _createElementBlock("svg", _hoisted_3, [...(_cache[1] || (_cache[1] = [
                _createElementVNode("path", { d: "M12 8v5M12 16.5h.01M10.3 4.2 3.6 16.1A2 2 0 0 0 5.3 19h13.4a2 2 0 0 0 1.7-2.9L13.7 4.2a2 2 0 0 0-3.4 0z" }, null, -1 /* CACHED */)
              ]))]))
            : (__props.status === 'error')
              ? (_openBlock(), _createElementBlock("svg", _hoisted_4, [...(_cache[2] || (_cache[2] = [
                  _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" }, null, -1 /* CACHED */)
                ]))]))
              : (_openBlock(), _createElementBlock("svg", _hoisted_5, [...(_cache[3] || (_cache[3] = [
                  _createElementVNode("path", { d: "M12 11v6M12 7.5h.01" }, null, -1 /* CACHED */),
                  _createElementVNode("circle", {
                    cx: "12",
                    cy: "12",
                    r: "9"
                  }, null, -1 /* CACHED */)
                ]))]))
      ])
    ]),
    (__props.title)
      ? (_openBlock(), _createElementBlock("div", _hoisted_6, _toDisplayString(__props.title), 1 /* TEXT */))
      : _createCommentVNode("v-if", true),
    (__props.description || _ctx.$slots.default)
      ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
          _renderSlot(_ctx.$slots, "default", {}, () => [
            _createTextVNode(_toDisplayString(__props.description), 1 /* TEXT */)
          ])
        ]))
      : _createCommentVNode("v-if", true),
    (_ctx.$slots.extra)
      ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
          _renderSlot(_ctx.$slots, "extra")
        ]))
      : _createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

})