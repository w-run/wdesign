import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, withModifiers as _withModifiers, withKeys as _withKeys, createElementVNode as _createElementVNode, unref as _unref, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, Teleport as _Teleport, createBlock as _createBlock } from "vue"

const _hoisted_1 = ["aria-expanded"]
const _hoisted_2 = ["onClick"]

import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useOverlayLayer } from './overlay-stack'
import { useAnchoredPosition } from './anchor'

// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。
import { popDuration } from './pop-duration'
/** 过渡时长：尊重系统「减弱动态效果」，否则用它兜底 transitionend 丢失的情况 */
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

const POP_DURATION = popDuration()




const props = __props

const emit = __emit

const open = ref(false)
const root = ref<HTMLElement>()
const triggerEl = ref<HTMLElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)

/**
 * Teleport 到 body + fixed 定位，避免被祖先 overflow:hidden 裁切
 * （表格单元格、卡片里是常态，不是边缘情况）。
 */
const { pos } = useAnchoredPosition(open, triggerEl, menuEl, {
  placement: 'bottom-start',
  gap: 6,
  matchWidth: false,
})

/**
 * 挂到全局层栈：弹窗里再打开下拉时，按 Esc 只关下拉，
 * 不会连弹窗一起关掉。
 */
useOverlayLayer(open, root, () => { open.value = false; return true })

function pick(item: WdDropdownItem) {
  if (item.disabled) return
  emit('select', item.value)
  open.value = false
}

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
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
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("span", {
      ref_key: "root",
      ref: root,
      class: "wd-dropdown"
    }, [
      _createElementVNode("span", {
        ref_key: "triggerEl",
        ref: triggerEl,
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
      ], 40 /* PROPS, NEED_HYDRATION */, _hoisted_1)
    ], 512 /* NEED_PATCH */),
    (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
      _createElementVNode("div", {
        ref_key: "menuEl",
        ref: menuEl,
        class: _normalizeClass(["wd-dropdown__menu", { 'is-open': open.value }]),
        style: _normalizeStyle({ top: _unref(pos).top + 'px', left: _unref(pos).left + 'px' }),
        role: "menu"
      }, [
        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.items, (it) => {
          return (_openBlock(), _createElementBlock("button", {
            key: it.value,
            type: "button",
            role: "menuitem",
            class: _normalizeClass(["wd-dropdown__item", { 'wd-dropdown__item--danger': it.danger, 'wd-dropdown__item--disabled': it.disabled }]),
            "data-wd-hover": "",
            onClick: ($event: any) => (pick(it))
          }, _toDisplayString(it.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_2))
        }), 128 /* KEYED_FRAGMENT */))
      ], 6 /* CLASS, STYLE */)
    ]))
  ], 64 /* STABLE_FRAGMENT */))
}
}

})