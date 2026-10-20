import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveComponent as _resolveComponent, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = { class: "wd-steps" }
const _hoisted_2 = { class: "wd-steps__dot" }
const _hoisted_3 = { class: "wd-steps__label" }
const _hoisted_4 = {
  key: 0,
  class: "wd-steps__desc"
}

import { computed } from 'vue'

type Step = string | { title: string; desc?: string }


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSteps' },
  __name: 'WdSteps',
  props: {
    steps: { type: Array, required: false, default: () => [] },
    current: { type: Number, required: false, default: 0 }
  },
  setup(__props: any) {



const props = __props

const items = computed(() =>
  props.steps.map((s) => (typeof s === 'string' ? { title: s, desc: '' } : { desc: '', ...s })),
)

function state(i: number) {
  if (i < props.current) return 'finish'
  if (i === props.current) return 'process'
  return 'wait'
}

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (s, i) => {
      return (_openBlock(), _createElementBlock(_Fragment, { key: i }, [
        _createElementVNode("div", {
          class: _normalizeClass(["wd-steps__item", `wd-steps__item--${state(i)}`])
        }, [
          _createElementVNode("span", _hoisted_2, [
            (state(i) === 'finish')
              ? (_openBlock(), _createBlock(_component_wd_icon, {
                  key: 0,
                  name: "check",
                  size: 13
                }))
              : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                  _createTextVNode(_toDisplayString(i + 1), 1 /* TEXT */)
                ], 64 /* STABLE_FRAGMENT */))
          ]),
          _createElementVNode("span", _hoisted_3, [
            _createTextVNode(_toDisplayString(s.title) + " ", 1 /* TEXT */),
            (s.desc)
              ? (_openBlock(), _createElementBlock("em", _hoisted_4, _toDisplayString(s.desc), 1 /* TEXT */))
              : _createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */),
        (i < items.value.length - 1)
          ? (_openBlock(), _createElementBlock("span", {
              key: 0,
              class: _normalizeClass(["wd-steps__bar", { 'wd-steps__bar--done': i < __props.current }])
            }, null, 2 /* CLASS */))
          : _createCommentVNode("v-if", true)
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})