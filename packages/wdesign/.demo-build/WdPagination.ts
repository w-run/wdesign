import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, renderList as _renderList, Fragment as _Fragment, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = ["disabled"]
const _hoisted_2 = {
  key: 0,
  class: "wd-pagination__dots"
}
const _hoisted_3 = ["onClick"]
const _hoisted_4 = ["disabled"]

import { computed, ref } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdPagination' },
  __name: 'WdPagination',
  props: {
    modelValue: { type: Number, required: false, default: 1 },
    total: { type: Number, required: false, default: 0 },
    pageSize: { type: Number, required: false, default: 10 }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

/** 首次交互后才播放激活项动画（避免首屏渲染时抖动） */
const animReady = ref(false)

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const range = computed<(number | '...')[]>(() => {
  const n = pageCount.value
  const cur = props.modelValue
  if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  const left = Math.max(2, cur - 1)
  const right = Math.min(n - 1, cur + 1)
  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < n - 1) pages.push('...')
  pages.push(n)
  return pages
})

function go(p: number) {
  animReady.value = true
  const v = Math.min(Math.max(1, p), pageCount.value)
  if (v !== props.modelValue) emit('update:modelValue', v)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("nav", {
    class: _normalizeClass(["wd-pagination", { 'wd-pagination--anim-ready': animReady.value }]),
    "aria-label": "分页"
  }, [
    _createElementVNode("button", {
      type: "button",
      class: "wd-pagination__btn",
      "data-wd-hover": "",
      disabled: __props.modelValue <= 1,
      "aria-label": "上一页",
      onClick: _cache[0] || (_cache[0] = ($event: any) => (go(__props.modelValue - 1)))
    }, [...(_cache[2] || (_cache[2] = [
      _createElementVNode("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2.6",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, [
        _createElementVNode("path", { d: "m15 18-6-6 6-6" })
      ], -1 /* CACHED */)
    ]))], 8 /* PROPS */, _hoisted_1),
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(range.value, (p, i) => {
      return (_openBlock(), _createElementBlock(_Fragment, { key: i }, [
        (p === '...')
          ? (_openBlock(), _createElementBlock("span", _hoisted_2, "…"))
          : (_openBlock(), _createElementBlock("button", {
              key: 1,
              type: "button",
              class: _normalizeClass(["wd-pagination__btn", { 'wd-pagination__btn--active': p === __props.modelValue }]),
              onClick: ($event: any) => (go(p as number))
            }, _toDisplayString(p), 11 /* TEXT, CLASS, PROPS */, _hoisted_3))
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */)),
    _createElementVNode("button", {
      type: "button",
      class: "wd-pagination__btn",
      disabled: __props.modelValue >= pageCount.value,
      "aria-label": "下一页",
      onClick: _cache[1] || (_cache[1] = ($event: any) => (go(__props.modelValue + 1)))
    }, [...(_cache[3] || (_cache[3] = [
      _createElementVNode("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2.6",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, [
        _createElementVNode("path", { d: "m9 6 6 6-6 6" })
      ], -1 /* CACHED */)
    ]))], 8 /* PROPS */, _hoisted_4)
  ], 2 /* CLASS */))
}
}

})