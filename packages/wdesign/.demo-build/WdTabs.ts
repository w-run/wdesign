import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = ["aria-selected", "onClick"]

import { computed, ref } from 'vue'

type Tab = string | { label: string; value: string | number }


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTabs' },
  __name: 'WdTabs',
  props: {
    modelValue: { type: [String, Number], required: false, default: '' },
    tabs: { type: Array, required: false, default: () => [] },
    block: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
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
  props.tabs.map((t) => (typeof t === 'string' ? { label: t, value: t } : t)),
)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-tabs", { 'wd-tabs--block': __props.block, 'wd-tabs--anim-ready': animReady.value }]),
    role: "tablist"
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (t) => {
      return (_openBlock(), _createElementBlock("button", {
        key: t.value,
        type: "button",
        role: "tab",
        class: _normalizeClass(["wd-tabs__item", { 'wd-tabs__item--active': t.value === __props.modelValue }]),
        "data-wd-hover": "",
        "aria-selected": t.value === __props.modelValue,
        onClick: ($event: any) => (select(t.value))
      }, _toDisplayString(t.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_1))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}
}

})