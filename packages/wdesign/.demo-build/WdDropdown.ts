import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, withModifiers as _withModifiers, withKeys as _withKeys, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode } from "vue"

const _hoisted_1 = ["aria-expanded"]
const _hoisted_2 = {
  key: 0,
  class: "wd-dropdown__menu",
  role: "menu"
}
const _hoisted_3 = ["onClick"]

import { onBeforeUnmount, onMounted, ref } from 'vue'

// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。
export interface WdDropdownItem {
  label: string
  value: string | number
  danger?: boolean
  disabled?: boolean
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdDropdown' },
  __name: 'WdDropdown',
  props: {
    items: { type: Array, required: false, default: () => [] }
  },
  emits: ["select"],
  setup(__props: any, { emit: __emit }) {

const POP_DURATION = { enter: 200, leave: 140 }




const props = __props

const emit = __emit

const open = ref(false)
const root = ref<HTMLElement>()

function pick(item: WdDropdownItem) {
  if (item.disabled) return
  emit('select', item.value)
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
  return (_openBlock(), _createElementBlock("span", {
    ref_key: "root",
    ref: root,
    class: "wd-dropdown"
  }, [
    _createElementVNode("span", {
      class: "wd-dropdown__trigger",
      role: "button",
      tabindex: "0",
      "aria-haspopup": true,
      "aria-expanded": open.value,
      onKeydown: [
        _cache[0] || (_cache[0] = _withKeys(_withModifiers(($event: any) => (open.value = !open.value), ["prevent"]), ["enter"])),
        _cache[1] || (_cache[1] = _withKeys(_withModifiers(($event: any) => (open.value = !open.value), ["prevent"]), ["space"]))
      ],
      onClick: _cache[2] || (_cache[2] = ($event: any) => (open.value = !open.value))
    }, [
      _renderSlot(_ctx.$slots, "default")
    ], 40 /* PROPS, NEED_HYDRATION */, _hoisted_1),
    _createVNode(_Transition, {
      name: "wd-pop",
      duration: POP_DURATION
    }, {
      default: _withCtx(() => [
        (open.value)
          ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.items, (it) => {
                return (_openBlock(), _createElementBlock("button", {
                  key: it.value,
                  type: "button",
                  role: "menuitem",
                  class: _normalizeClass(["wd-dropdown__item", { 'wd-dropdown__item--danger': it.danger, 'wd-dropdown__item--disabled': it.disabled }]),
                  "data-wd-hover": "",
                  onClick: ($event: any) => (pick(it))
                }, _toDisplayString(it.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_3))
              }), 128 /* KEYED_FRAGMENT */))
            ]))
          : _createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    })
  ], 512 /* NEED_PATCH */))
}
}

})