import { defineComponent as _defineComponent } from 'vue'
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, createElementVNode as _createElementVNode, Fragment as _Fragment, renderList as _renderList, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-pagination__total"
}
const _hoisted_2 = ["disabled"]
const _hoisted_3 = { class: "wd-pagination__simple-text" }
const _hoisted_4 = ["disabled"]
const _hoisted_5 = ["disabled"]
const _hoisted_6 = {
  key: 0,
  class: "wd-pagination__dots"
}
const _hoisted_7 = ["aria-current", "onClick"]
const _hoisted_8 = ["disabled"]
const _hoisted_9 = {
  key: 3,
  class: "wd-pagination__size"
}
const _hoisted_10 = ["value"]
const _hoisted_11 = ["value"]

import { computed, ref } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdPagination' },
  __name: 'WdPagination',
  props: {
    modelValue: { type: Number, required: false, default: 1 },
    total: { type: Number, required: false, default: 0 },
    pageSize: { type: Number, required: false, default: 10 },
    simple: { type: Boolean, required: false, default: false },
    showTotal: { type: Boolean, required: false, default: false },
    showSizeChanger: { type: Boolean, required: false, default: false },
    pageSizes: { type: Array, required: false, default: () => [10, 20, 50] },
    compact: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue", "update:pageSize", "change"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

/** 首次交互后才播放激活项动画（避免首屏渲染时抖动） */
const animReady = ref(false)

const size = ref(props.pageSize)
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / size.value)))

const range = computed<(number | '...')[]>(() => {
  const n = pageCount.value
  const cur = props.modelValue
  if (!props.compact || n <= 7) return Array.from({ length: n }, (_, i) => i + 1)
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
  if (v === props.modelValue) return
  emit('update:modelValue', v)
  emit('change', v, size.value)
}

function changeSize(e: Event) {
  const v = Number((e.target as HTMLSelectElement).value)
  size.value = v
  emit('update:pageSize', v)
  // 换页长后当前页可能越界，夹回范围内
  const max = Math.max(1, Math.ceil(props.total / v))
  const p = Math.min(props.modelValue, max)
  emit('update:modelValue', p)
  emit('change', p, v)
}

const from = computed(() => (pageCount.value ? (props.modelValue - 1) * size.value + 1 : 0))
const to = computed(() => Math.min(props.modelValue * size.value, props.total))

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("nav", {
    class: _normalizeClass(["wd-pagination", { 'wd-pagination--anim-ready': animReady.value, 'wd-pagination--simple': __props.simple }]),
    "aria-label": "分页"
  }, [
    (__props.showTotal)
      ? (_openBlock(), _createElementBlock("span", _hoisted_1, " 第 " + _toDisplayString(from.value) + "–" + _toDisplayString(to.value) + " 条 / 共 " + _toDisplayString(__props.total) + " 条 ", 1 /* TEXT */))
      : _createCommentVNode("v-if", true),
    _createCommentVNode(" 简洁模式 "),
    (__props.simple)
      ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
          _createElementVNode("button", {
            type: "button",
            class: "wd-pagination__btn",
            "data-wd-hover": "",
            disabled: __props.modelValue <= 1,
            "aria-label": "上一页",
            onClick: _cache[0] || (_cache[0] = ($event: any) => (go(__props.modelValue - 1)))
          }, [
            _createVNode(_component_wd_icon, {
              name: "chevron-left",
              size: 14
            })
          ], 8 /* PROPS */, _hoisted_2),
          _createElementVNode("span", _hoisted_3, _toDisplayString(__props.modelValue) + " / " + _toDisplayString(pageCount.value), 1 /* TEXT */),
          _createElementVNode("button", {
            type: "button",
            class: "wd-pagination__btn",
            "data-wd-hover": "",
            disabled: __props.modelValue >= pageCount.value,
            "aria-label": "下一页",
            onClick: _cache[1] || (_cache[1] = ($event: any) => (go(__props.modelValue + 1)))
          }, [
            _createVNode(_component_wd_icon, {
              name: "chevron-right",
              size: 14
            })
          ], 8 /* PROPS */, _hoisted_4)
        ], 64 /* STABLE_FRAGMENT */))
      : (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
          _createCommentVNode(" 完整模式 "),
          _createElementVNode("button", {
            type: "button",
            class: "wd-pagination__btn",
            "data-wd-hover": "",
            disabled: __props.modelValue <= 1,
            "aria-label": "上一页",
            onClick: _cache[2] || (_cache[2] = ($event: any) => (go(__props.modelValue - 1)))
          }, [
            _createVNode(_component_wd_icon, {
              name: "chevron-left",
              size: 14
            })
          ], 8 /* PROPS */, _hoisted_5),
          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(range.value, (p, i) => {
            return (_openBlock(), _createElementBlock(_Fragment, { key: i }, [
              (p === '...')
                ? (_openBlock(), _createElementBlock("span", _hoisted_6, "…"))
                : (_openBlock(), _createElementBlock("button", {
                    key: 1,
                    type: "button",
                    class: _normalizeClass(["wd-pagination__btn", { 'wd-pagination__btn--active': p === __props.modelValue }]),
                    "data-wd-hover": "",
                    "aria-current": p === __props.modelValue ? 'page' : undefined,
                    onClick: ($event: any) => (go(p as number))
                  }, _toDisplayString(p), 11 /* TEXT, CLASS, PROPS */, _hoisted_7))
            ], 64 /* STABLE_FRAGMENT */))
          }), 128 /* KEYED_FRAGMENT */)),
          _createElementVNode("button", {
            type: "button",
            class: "wd-pagination__btn",
            "data-wd-hover": "",
            disabled: __props.modelValue >= pageCount.value,
            "aria-label": "下一页",
            onClick: _cache[3] || (_cache[3] = ($event: any) => (go(__props.modelValue + 1)))
          }, [
            _createVNode(_component_wd_icon, {
              name: "chevron-right",
              size: 14
            })
          ], 8 /* PROPS */, _hoisted_8)
        ], 64 /* STABLE_FRAGMENT */)),
    (__props.showSizeChanger)
      ? (_openBlock(), _createElementBlock("label", _hoisted_9, [
          _createElementVNode("select", {
            value: size.value,
            onChange: changeSize
          }, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.pageSizes, (s) => {
              return (_openBlock(), _createElementBlock("option", {
                key: s,
                value: s
              }, _toDisplayString(s) + " 条/页", 9 /* TEXT, PROPS */, _hoisted_11))
            }), 128 /* KEYED_FRAGMENT */))
          ], 40 /* PROPS, NEED_HYDRATION */, _hoisted_10)
        ]))
      : _createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

})