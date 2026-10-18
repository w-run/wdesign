import { defineComponent as _defineComponent } from 'vue'
import { createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, createVNode as _createVNode, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeStyle as _normalizeStyle, vShow as _vShow, withModifiers as _withModifiers, normalizeClass as _normalizeClass, withDirectives as _withDirectives, Teleport as _Teleport, createBlock as _createBlock } from "vue"

const _hoisted_1 = ["aria-label"]
const _hoisted_2 = { class: "wd-modal__head" }
const _hoisted_3 = { class: "wd-modal__title" }
const _hoisted_4 = { class: "wd-modal__body" }
const _hoisted_5 = {
  key: 0,
  class: "wd-modal__foot"
}

import { computed, ref, toRef, watchEffect } from 'vue'
import { useScrollLock, useFocusTrap } from './overlay'
import { nextZIndex } from './overlay-stack'
import { popDuration } from './pop-duration'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdModal' },
  __name: 'WdModal',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: '' },
    width: { type: [Number, String], required: false, default: 440 },
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

const panel = ref<HTMLElement | null>(null)

/** 打开过一次后节点常驻，之后靠 .is-open 控制显隐（见模板注释） */
const mounted = ref(false)
watchEffect(() => { if (props.modelValue) mounted.value = true })

/**
 * 滚动锁定 + 焦点陷阱。
 * 两者都抽在 overlay.ts —— 之前「点击外部关闭」在 5 个组件里各写一份，
 * 结果 WdSelect 的 Esc 是后来补的。共用的行为只该有一处实现。
 */
const openRef = toRef(props, 'modelValue')

/** 每次打开重新取层级：后开的浮层压在先开的上面 */
const myZ = ref(0)
watchEffect(() => { if (props.modelValue) myZ.value = nextZIndex() })
useScrollLock(openRef)
// Esc 交给层栈统一调度 —— 多层时只关最上层
useFocusTrap(openRef, panel, () => { close(); return true; })

const maxWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
)

function close() {
  emit('update:modelValue', false)
}



return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createCommentVNode("\n      不用 <Transition>：其 enter 阶段依赖 nextFrame，动画时钟停摆时\n      （后台标签页 / 无头渲染 / 减弱动效）永不推进，enter-from 会残留，\n      关闭时再叠 leave-* 就彻底销毁不掉 —— 表现为「弹窗关不掉、还挡着点击」。\n      改为常驻节点 + .is-open 类，可见性交给 display，动画只负责好看。\n    "),
    _withDirectives(_createElementVNode("div", {
      class: _normalizeClass(["wd-modal", { 'is-open': __props.modelValue }]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": __props.title || undefined,
      style: _normalizeStyle({ zIndex: myZ.value }),
      onTransitionend: _cache[1] || (_cache[1] = _withModifiers(
//@ts-ignore
(...args) => (_ctx.onLeaveEnd && _ctx.onLeaveEnd(...args)), ["self"]))
    }, [
      _createElementVNode("div", {
        class: "wd-modal__mask",
        onClick: _cache[0] || (_cache[0] = ($event: any) => (__props.closeOnMask && close()))
      }),
      _createElementVNode("div", {
        ref_key: "panel",
        ref: panel,
        class: "wd-modal__panel",
        tabindex: "-1",
        style: _normalizeStyle({ maxWidth: maxWidth.value })
      }, [
        _createElementVNode("div", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, _toDisplayString(__props.title), 1 /* TEXT */),
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
        _createElementVNode("div", _hoisted_4, [
          _renderSlot(_ctx.$slots, "default")
        ]),
        (_ctx.$slots.footer)
          ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
              _renderSlot(_ctx.$slots, "footer")
            ]))
          : _createCommentVNode("v-if", true)
      ], 4 /* STYLE */)
    ], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_1), [
      [_vShow, mounted.value]
    ])
  ]))
}
}

})