import { defineComponent as _defineComponent } from 'vue'
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx, createBlock as _createBlock } from "vue"

const _hoisted_1 = { class: "wd-post-item__title" }
const _hoisted_2 = {
  key: 0,
  class: "wd-post-item__emoji"
}
const _hoisted_3 = {
  key: 0,
  class: "wd-post-item__summary"
}
const _hoisted_4 = {
  key: 1,
  class: "wd-post-item__tags"
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdPostItem' },
  __name: 'WdPostItem',
  props: {
    title: { type: String, required: true },
    summary: { type: String, required: false },
    tags: { type: Array, required: false, default: () => [] },
    emoji: { type: String, required: false },
    href: { type: String, required: false }
  },
  setup(__props: any) {

/**
 * WdPostItem — 文章条目
 * 反向迭代（源：w-run/blog 的文章列表项）
 * 刻意不含日期字段（便于批量导入、不暴露新旧）
 */




return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_resolveDynamicComponent(__props.href ? 'a' : 'div'), {
    href: __props.href,
    class: "wd-post-item"
  }, {
    default: _withCtx(() => [
      _createElementVNode("h3", _hoisted_1, [
        (__props.emoji)
          ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(__props.emoji), 1 /* TEXT */))
          : _createCommentVNode("v-if", true),
        _createTextVNode(_toDisplayString(__props.title), 1 /* TEXT */)
      ]),
      (__props.summary)
        ? (_openBlock(), _createElementBlock("p", _hoisted_3, _toDisplayString(__props.summary), 1 /* TEXT */))
        : _createCommentVNode("v-if", true),
      (__props.tags.length)
        ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.tags, (t) => {
              return (_openBlock(), _createElementBlock("span", {
                key: t,
                class: "wd-tag wd-tag--sm wd-tag--gray"
              }, _toDisplayString(t), 1 /* TEXT */))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : _createCommentVNode("v-if", true)
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href"]))
}
}

})