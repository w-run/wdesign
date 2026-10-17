import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode } from "vue"

const _hoisted_1 = { class: "wd-empty" }
const _hoisted_2 = { class: "wd-empty__icon" }
const _hoisted_3 = {
  key: 0,
  class: "wd-empty__title"
}
const _hoisted_4 = {
  key: 1,
  class: "wd-empty__desc"
}
const _hoisted_5 = {
  key: 2,
  class: "wd-empty__action"
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdEmpty' },
  __name: 'WdEmpty',
  props: {
    title: { type: String, required: false, default: '暂无数据' },
    description: { type: String, required: false, default: '' }
  },
  setup(__props: any) {





return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      _renderSlot(_ctx.$slots, "icon", {}, () => [
        _cache[0] || (_cache[0] = _createElementVNode("svg", {
          width: "30",
          height: "30",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.7",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          _createElementVNode("path", { d: "M22 12h-6l-2 3h-4l-2-3H2" }),
          _createElementVNode("path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" })
        ], -1 /* CACHED */))
      ])
    ]),
    (__props.title)
      ? (_openBlock(), _createElementBlock("div", _hoisted_3, _toDisplayString(__props.title), 1 /* TEXT */))
      : _createCommentVNode("v-if", true),
    (__props.description || _ctx.$slots.description)
      ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
          _renderSlot(_ctx.$slots, "description", {}, () => [
            _createTextVNode(_toDisplayString(__props.description), 1 /* TEXT */)
          ])
        ]))
      : _createCommentVNode("v-if", true),
    (_ctx.$slots.action)
      ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
          _renderSlot(_ctx.$slots, "action")
        ]))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})