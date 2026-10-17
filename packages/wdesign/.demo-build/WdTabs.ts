import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = ["aria-selected", "disabled", "tabindex", "onClick"]
const _hoisted_2 = { class: "wd-tabs__label" }
const _hoisted_3 = ["aria-label", "onClick"]

import { computed, ref } from 'vue'

type Tab = string | { label: string; value: string | number; closable?: boolean; disabled?: boolean }


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTabs' },
  __name: 'WdTabs',
  props: {
    modelValue: { type: [String, Number], required: false, default: '' },
    tabs: { type: Array, required: false, default: () => [] },
    block: { type: Boolean, required: false, default: false },
    closable: { type: Boolean, required: false, default: false },
    addable: { type: Boolean, required: false, default: false },
    scrollable: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue", "close", "add"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

/** 首次交互后才允许激活项播放弹入动画（避免首屏渲染时抖动） */
const animReady = ref(false)
function select(v: string | number) {
  animReady.value = true
  emit('update:modelValue', v)
}

const items = computed(() =>
  props.tabs.map((t) => {
    const raw = typeof t === 'string' ? { label: t, value: t } : t
    // 优先级：条目显式 closable > 组件级 closable
    // 条目显式 false 要能覆盖组件级的 true（否则"固定"页签也会出现 ×）
    const canClose = 'closable' in raw ? raw.closable === true : props.closable
    return { label: raw.label, value: raw.value, closable: canClose, disabled: raw.disabled === true }
  }),
)

function close(t: { value: string | number }, e: MouseEvent) {
  e.stopPropagation()
  emit('close', t.value)
}

/** 键盘左右切换 */
function onKeydown(e: KeyboardEvent) {
  const list = items.value.filter((t) => !t.disabled)
  if (!list.length) return
  const cur = list.findIndex((t) => t.value === props.modelValue)
  let next = -1
  if (e.key === 'ArrowRight') next = (cur + 1) % list.length
  else if (e.key === 'ArrowLeft') next = (cur - 1 + list.length) % list.length
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = list.length - 1
  if (next < 0) return
  e.preventDefault()
  select(list[next].value)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-tabs", {
      'wd-tabs--block': __props.block,
      'wd-tabs--anim-ready': animReady.value,
      'wd-tabs--scrollable': __props.scrollable,
      'wd-tabs--closable': items.value.some(t => t.closable),
    }]),
    role: "tablist",
    onKeydown: onKeydown
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (t) => {
      return (_openBlock(), _createElementBlock("button", {
        key: t.value,
        type: "button",
        role: "tab",
        class: _normalizeClass(["wd-tabs__item", {
        'wd-tabs__item--active': t.value === __props.modelValue,
        'wd-tabs__item--disabled': t.disabled,
      }]),
        "data-wd-hover": "",
        "aria-selected": t.value === __props.modelValue,
        disabled: t.disabled,
        tabindex: t.value === __props.modelValue ? 0 : -1,
        onClick: ($event: any) => (select(t.value))
      }, [
        _createElementVNode("span", _hoisted_2, _toDisplayString(t.label), 1 /* TEXT */),
        (t.closable && !t.disabled)
          ? (_openBlock(), _createElementBlock("span", {
              key: 0,
              class: "wd-tabs__close",
              role: "button",
              "aria-label": `关闭 ${t.label}`,
              onClick: ($event: any) => (close(t, $event))
            }, [...(_cache[1] || (_cache[1] = [
              _createElementVNode("svg", {
                width: "10",
                height: "10",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "3",
                "stroke-linecap": "round"
              }, [
                _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
              ], -1 /* CACHED */)
            ]))], 8 /* PROPS */, _hoisted_3))
          : _createCommentVNode("v-if", true)
      ], 10 /* CLASS, PROPS */, _hoisted_1))
    }), 128 /* KEYED_FRAGMENT */)),
    (__props.addable)
      ? (_openBlock(), _createElementBlock("button", {
          key: 0,
          type: "button",
          class: "wd-tabs__add",
          "aria-label": "新建",
          "data-wd-hover": "",
          onClick: _cache[0] || (_cache[0] = ($event: any) => (emit('add')))
        }, [...(_cache[2] || (_cache[2] = [
          _createElementVNode("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.6",
            "stroke-linecap": "round"
          }, [
            _createElementVNode("path", { d: "M12 5v14M5 12h14" })
          ], -1 /* CACHED */)
        ]))]))
      : _createCommentVNode("v-if", true)
  ], 34 /* CLASS, NEED_HYDRATION */))
}
}

})