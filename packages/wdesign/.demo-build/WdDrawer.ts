import { defineComponent as _defineComponent } from 'vue'
import { createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, createVNode as _createVNode, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, vShow as _vShow, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, withDirectives as _withDirectives, Teleport as _Teleport, createBlock as _createBlock } from "vue"

const _hoisted_1 = { class: "wd-drawer__head" }
const _hoisted_2 = { class: "wd-drawer__title" }
const _hoisted_3 = { class: "wd-drawer__body" }
const _hoisted_4 = {
  key: 0,
  class: "wd-drawer__foot"
}

import { computed, ref, toRef, watchEffect } from 'vue'
import { useScrollLock, useFocusTrap } from './overlay'
import { nextZIndex } from './overlay-stack'
import { popDuration } from './pop-duration'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdDrawer' },
  __name: 'WdDrawer',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: '' },
    side: { type: String, required: false, default: 'right' },
    closeOnMask: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {

const POP_DURATION = popDuration()

// 显式给 duration：transitionend 在渲染器暂停/时钟停摆时会丢失，
// 导致元素永远停在 enter-from（或关闭时无法销毁）。
// 给 duration 让 Vue 用定时器兜底。



const props = __props

const emit = __emit

const classes = computed(() => ['wd-drawer', props.side === 'left' ? 'wd-drawer--left' : ''])

const panel = ref<HTMLElement | null>(null)
/** 打开过一次后节点常驻，靠 .is-open 控制显隐 */
const mounted = ref(false)
watchEffect(() => { if (props.modelValue) mounted.value = true })
const openRef = toRef(props, 'modelValue')

/** 每次打开重新取层级：后开的浮层压在先开的上面 */
const myZ = ref(0)
watchEffect(() => { if (props.modelValue) myZ.value = nextZIndex() })

/**
 * 抽屉和弹窗一样是"模态覆盖层"：
 *   - 打开时背景不该还能滚（不然滚的是抽屉背后的列表）
 *   - Tab 不该跑到背景里去（之前完全没有焦点管理）
 * 两者都用 overlay.ts 的统一实现。
 */
useScrollLock(openRef)
useFocusTrap(openRef, panel, () => { close(); return true; })

function close() {
  emit('update:modelValue', false)
}


return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createCommentVNode(" 同 Modal：显隐由 .is-open + display 保证，不依赖 Transition 的时序 "),
    _withDirectives(_createElementVNode("div", {
      class: _normalizeClass([classes.value, { 'is-open': __props.modelValue }]),
      role: "dialog",
      "aria-modal": "true",
      style: _normalizeStyle({ zIndex: myZ.value })
    }, [
      _createElementVNode("div", {
        class: "wd-drawer__mask",
        onClick: _cache[0] || (_cache[0] = ($event: any) => (__props.closeOnMask && close()))
      }),
      _createElementVNode("div", {
        ref_key: "panel",
        ref: panel,
        class: "wd-drawer__panel",
        tabindex: "-1"
      }, [
        _createElementVNode("div", _hoisted_1, [
          _createElementVNode("div", _hoisted_2, _toDisplayString(__props.title), 1 /* TEXT */),
          _createElementVNode("button", {
            type: "button",
            class: "wd-icon-btn",
            "aria-label": "关闭",
            onClick: close
          }, [
            _createVNode(_component_wd_icon, {
              name: "close",
              size: 15
            })
          ])
        ]),
        _createElementVNode("div", _hoisted_3, [
          _renderSlot(_ctx.$slots, "default")
        ]),
        (_ctx.$slots.footer)
          ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
              _renderSlot(_ctx.$slots, "footer")
            ]))
          : _createCommentVNode("v-if", true)
      ], 512 /* NEED_PATCH */)
    ], 6 /* CLASS, STYLE */), [
      [_vShow, mounted.value]
    ])
  ]))
}
}

})