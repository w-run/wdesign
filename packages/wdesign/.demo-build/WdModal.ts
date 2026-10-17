import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, createVNode as _createVNode, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, Transition as _Transition, withCtx as _withCtx, Teleport as _Teleport, createBlock as _createBlock } from "vue"

const _hoisted_1 = ["aria-label"]
const _hoisted_2 = { class: "wd-modal__head" }
const _hoisted_3 = { class: "wd-modal__title" }
const _hoisted_4 = { class: "wd-modal__body" }
const _hoisted_5 = {
  key: 0,
  class: "wd-modal__foot"
}

import { computed, ref, watchEffect } from 'vue'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * 无障碍焦点管理：
 * 打开时把焦点移入面板并记住来源，Tab 在面板内循环（焦点陷阱），
 * 关闭后归还焦点——否则键盘/读屏用户会「tab 到背后的页面」而失去上下文。
 */

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



const props = __props

const emit = __emit

const panel = ref<HTMLElement | null>(null)
let lastActive: HTMLElement | null = null

const maxWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
)

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { close(); return }
  if (e.key !== 'Tab' || !panel.value) return
  const nodes = Array.from(panel.value.querySelectorAll<HTMLElement>(FOCUSABLE))
  if (!nodes.length) return
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (e.shiftKey && (active === first || !panel.value.contains(active))) {
    e.preventDefault(); last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault(); first.focus()
  }
}

watchEffect((onCleanup) => {
  if (!props.modelValue) return
  lastActive = document.activeElement as HTMLElement | null
  document.addEventListener('keydown', onKeydown)
  // 等面板渲染后聚焦首个可聚焦元素（无可聚焦元素时聚焦面板本身）
  requestAnimationFrame(() => {
    const el = panel.value
    if (!el) return
    const first = el.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? el).focus()
  })
  onCleanup(() => {
    document.removeEventListener('keydown', onKeydown)
    lastActive?.focus?.()
    lastActive = null
  })
})

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createVNode(_Transition, { name: "wd-modal-fade" }, {
      default: _withCtx(() => [
        (__props.modelValue)
          ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              class: "wd-modal",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": __props.title || undefined
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
            ], 8 /* PROPS */, _hoisted_1))
          : _createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    })
  ]))
}
}

})