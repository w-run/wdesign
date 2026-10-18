import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, Teleport as _Teleport, openBlock as _openBlock, createBlock as _createBlock, Fragment as _Fragment, createElementBlock as _createElementBlock } from "vue"

import { computed, ref } from 'vue'
import { useAnchoredPosition } from './anchor'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTooltip' },
  __name: 'WdTooltip',
  props: {
    content: { type: String, required: false, default: '' },
    placement: { type: String, required: false, default: 'top' }
  },
  setup(__props: any) {



const props = __props

const open = ref(false)
const anchorEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)

/**
 * Teleport 到 body + fixed 定位。
 *
 * 之前用 position:absolute 挂在触发器旁边，一旦祖先有 overflow:hidden
 * （表格单元格、卡片、滚动区）气泡就被裁掉 —— 而 tooltip 恰恰最常出现在
 * 这些地方。传送到 body 是唯一可靠解，代价是必须用 JS 量坐标。
 */
const { pos } = useAnchoredPosition(open, anchorEl, panelEl, {
  placement: props.placement === 'top' ? 'top-start' : 'bottom-start',
  gap: 8,
})

const style = computed(() => ({
  top: pos.value.top + 'px',
  left: pos.value.left + 'px',
}))

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("span", {
      ref_key: "anchorEl",
      ref: anchorEl,
      class: "wd-tooltip",
      onMouseenter: _cache[0] || (_cache[0] = ($event: any) => (open.value = true)),
      onMouseleave: _cache[1] || (_cache[1] = ($event: any) => (open.value = false)),
      onFocusin: _cache[2] || (_cache[2] = ($event: any) => (open.value = true)),
      onFocusout: _cache[3] || (_cache[3] = ($event: any) => (open.value = false))
    }, [
      _renderSlot(_ctx.$slots, "default")
    ], 544 /* NEED_HYDRATION, NEED_PATCH */),
    (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
      _createCommentVNode("\n      显隐用 .is-open + display，不用 <Transition>：\n      时钟停摆时 enter-from 会残留，气泡卡在半透明或永不消失。\n\n      ⚠️ 不能用 v-show：它把 `display:none` 写成**内联样式**，\n      优先级高于 `.is-open { display: block }`，结果永远显示不出来。\n      改为「节点常驻 + 只靠类切换」，display 完全交给 CSS。\n    "),
      _createElementVNode("span", {
        ref_key: "panelEl",
        ref: panelEl,
        class: _normalizeClass(["wd-tooltip__bubble", { 'is-open': open.value }]),
        style: _normalizeStyle(style.value),
        role: "tooltip"
      }, _toDisplayString(__props.content), 7 /* TEXT, CLASS, STYLE */)
    ]))
  ], 64 /* STABLE_FRAGMENT */))
}
}

})