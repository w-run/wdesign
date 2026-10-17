import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-timeline__period"
}
const _hoisted_2 = { class: "wd-timeline__body" }
const _hoisted_3 = { class: "wd-timeline__title" }
const _hoisted_4 = {
  key: 0,
  class: "wd-timeline__desc"
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTimeline' },
  __name: 'WdTimeline',
  props: {
    items: { type: Array, required: true },
    line: { type: Boolean, required: false, default: false }
  },
  setup(__props: any) {

/**
 * WdTimeline — 时间线
 * 反向迭代（源：w-run/blog 的 About 经历区块）
 */




return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("ul", {
    class: _normalizeClass(["wd-timeline", { 'wd-timeline--line': __props.line }])
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (it, i) => {
      return (_openBlock(), _createElementBlock("li", {
        key: i,
        class: "wd-timeline__item"
      }, [
        (it.period)
          ? (_openBlock(), _createElementBlock("span", _hoisted_1, _toDisplayString(it.period), 1 /* TEXT */))
          : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_2, [
          _createElementVNode("h3", _hoisted_3, _toDisplayString(it.title), 1 /* TEXT */),
          (it.desc)
            ? (_openBlock(), _createElementBlock("p", _hoisted_4, _toDisplayString(it.desc), 1 /* TEXT */))
            : _createCommentVNode("v-if", true)
        ])
      ]))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}
}

})