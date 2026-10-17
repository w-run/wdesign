import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, createVNode as _createVNode, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, Transition as _Transition, withCtx as _withCtx, Teleport as _Teleport, createBlock as _createBlock } from "vue"

const _hoisted_1 = { class: "wd-drawer__panel" }
const _hoisted_2 = { class: "wd-drawer__head" }
const _hoisted_3 = { class: "wd-drawer__title" }
const _hoisted_4 = { class: "wd-drawer__body" }
const _hoisted_5 = {
  key: 0,
  class: "wd-drawer__foot"
}

import { computed, watchEffect } from 'vue'


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



const props = __props

const emit = __emit

const classes = computed(() => ['wd-drawer', props.side === 'left' ? 'wd-drawer--left' : ''])

function close() {
  emit('update:modelValue', false)
}

watchEffect((onCleanup) => {
  if (!props.modelValue) return
  const fn = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }
  document.addEventListener('keydown', fn)
  onCleanup(() => document.removeEventListener('keydown', fn))
})

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createVNode(_Transition, { name: "wd-drawer-fade" }, {
      default: _withCtx(() => [
        (__props.modelValue)
          ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              class: _normalizeClass(classes.value),
              role: "dialog",
              "aria-modal": "true"
            }, [
              _createElementVNode("div", {
                class: "wd-drawer__mask",
                onClick: _cache[0] || (_cache[0] = ($event: any) => (__props.closeOnMask && close()))
              }),
              _createElementVNode("div", _hoisted_1, [
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
              ])
            ], 2 /* CLASS */))
          : _createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    })
  ]))
}
}

})