import { defineComponent as _defineComponent } from 'vue'
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, renderList as _renderList, Fragment as _Fragment, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode } from "vue"

const _hoisted_1 = ["disabled"]
const _hoisted_2 = {
  key: 0,
  class: "wd-select__value"
}
const _hoisted_3 = {
  key: 1,
  class: "wd-select__placeholder"
}
const _hoisted_4 = {
  key: 0,
  class: "wd-select__menu",
  role: "listbox"
}
const _hoisted_5 = ["aria-selected", "onClick"]
const _hoisted_6 = {
  key: 0,
  class: "wd-select__option-mark",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "3",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。
type Option = string | { label: string; value: string | number }


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSelect' },
  __name: 'WdSelect',
  props: {
    modelValue: { type: [String, Number], required: false, default: '' },
    options: { type: Array, required: false, default: () => [] },
    placeholder: { type: String, required: false, default: '请选择' },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {

const POP_DURATION = { enter: 200, leave: 140 }




const props = __props

const emit = __emit

const open = ref(false)
const root = ref<HTMLElement>()

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)
const current = computed(() => items.value.find((o) => o.value === props.modelValue))

function pick(value: string | number) {
  emit('update:modelValue', value)
  open.value = false
}

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    ref_key: "root",
    ref: root,
    class: _normalizeClass(["wd-select", { 'wd-select--open': open.value, 'wd-select--disabled': __props.disabled }])
  }, [
    _createElementVNode("button", {
      type: "button",
      class: _normalizeClass(["wd-select__trigger", { 'wd-select__trigger--lg': _ctx.size === 'lg', 'wd-select__trigger--sm': _ctx.size === 'sm' }]),
      disabled: __props.disabled,
      onClick: _cache[0] || (_cache[0] = ($event: any) => (open.value = !open.value))
    }, [
      (current.value)
        ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(current.value.label), 1 /* TEXT */))
        : (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(__props.placeholder), 1 /* TEXT */)),
      (_openBlock(), _createElementBlock("svg", {
        class: _normalizeClass(["wd-chevron", { 'wd-chevron--open': open.value }]),
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2.4",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, [...(_cache[1] || (_cache[1] = [
        _createElementVNode("path", { d: "m6 9 6 6 6-6" }, null, -1 /* CACHED */)
      ]))], 2 /* CLASS */))
    ], 10 /* CLASS, PROPS */, _hoisted_1),
    _createVNode(_Transition, {
      name: "wd-pop",
      duration: POP_DURATION
    }, {
      default: _withCtx(() => [
        (open.value)
          ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (o) => {
                return (_openBlock(), _createElementBlock("button", {
                  key: o.value,
                  type: "button",
                  role: "option",
                  class: _normalizeClass(["wd-select__option", { 'wd-select__option--active': o.value === __props.modelValue }]),
                  "aria-selected": o.value === __props.modelValue,
                  onClick: ($event: any) => (pick(o.value))
                }, [
                  _createElementVNode("span", null, _toDisplayString(o.label), 1 /* TEXT */),
                  (o.value === __props.modelValue)
                    ? (_openBlock(), _createElementBlock("svg", _hoisted_6, [...(_cache[2] || (_cache[2] = [
                        _createElementVNode("path", { d: "m4.5 12.5 5 5 10-11" }, null, -1 /* CACHED */)
                      ]))]))
                    : _createCommentVNode("v-if", true)
                ], 10 /* CLASS, PROPS */, _hoisted_5))
              }), 128 /* KEYED_FRAGMENT */))
            ]))
          : _createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    })
  ], 2 /* CLASS */))
}
}

})