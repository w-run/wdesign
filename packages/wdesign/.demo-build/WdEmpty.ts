import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, createVNode as _createVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode } from "vue"

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
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      _renderSlot(_ctx.$slots, "icon", {}, () => [
        _createVNode(_component_wd_icon, {
          name: "folder-open",
          size: 30,
          style: {"opacity":".5"}
        })
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