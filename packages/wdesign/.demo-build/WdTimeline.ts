import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, createBlock as _createBlock, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createTextVNode as _createTextVNode, vShow as _vShow, withDirectives as _withDirectives, normalizeStyle as _normalizeStyle } from "vue"

const _hoisted_1 = ["onClick"]
const _hoisted_2 = { class: "wd-timeline__node" }
const _hoisted_3 = {
  key: 1,
  class: "wd-timeline__dot"
}
const _hoisted_4 = { class: "wd-timeline__body" }
const _hoisted_5 = {
  key: 0,
  class: "wd-timeline__period"
}
const _hoisted_6 = { class: "wd-timeline__title" }
const _hoisted_7 = {
  key: 1,
  class: "wd-timeline__desc"
}

import { computed, ref } from 'vue'

export interface WdTimelineItem {
  /** 时间/阶段标签 */
  period?: string
  /** 标题 */
  title: string
  /** 描述 */
  desc?: string
  /** 节点颜色，默认主色 */
  color?: string
  /** 节点图标（用 WdIcon 名字，优先于圆点） */
  icon?: string
  /** 该节点是否高亮（强调"当前进度"） */
  active?: boolean
  /** 该节点是否禁用（置灰） */
  disabled?: boolean
  /** 可折叠时的子内容 */
  detail?: string
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTimeline' },
  __name: 'WdTimeline',
  props: {
    items: { type: Array, required: true },
    line: { type: Boolean, required: false, default: false },
    mode: { type: String, required: false, default: 'vertical' },
    lineStyle: { type: String, required: false, default: 'solid' },
    size: { type: String, required: false, default: 'md' },
    collapsible: { type: Boolean, required: false, default: false }
  },
  emits: ["item-click"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

/** 展开的项（collapsible 模式） */
const expanded = ref<Set<number>>(new Set())

function toggle(i: number, item: WdTimelineItem) {
  if (!props.collapsible || !item.detail) return
  const next = new Set(expanded.value)
  if (next.has(i)) next.delete(i)
  else next.add(i)
  expanded.value = next
  emit('item-click', item, i)
}

/**
 * 连接线样式最终值。
 *
 * 老 API 是 `line: boolean`（是否画贯穿线），新 API 是 `lineStyle`。
 * 兼容规则：
 *   · 显式传了 lineStyle('dashed' / 'none') → 用它
 *   · 否则若 line === false 且没传 lineStyle → **也不画线**（尊重老语义）
 *   · 其余情况用 solid
 *
 * 注：这里不能简单地让 lineStyle 默认 'solid' 就完事 ——
 * 老组件默认 line=false 表示"不画线"，直接给 solid 会改变既有视觉。
 */
const resolvedLine = computed(() => {
  if (props.lineStyle !== 'solid') return props.lineStyle
  // line 未显式传（undefined 经默认值变成 false）时按老语义不画
  return props.line ? 'solid' : 'none'
})

const isHorizontal = computed(() => props.mode === 'horizontal')

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("ul", {
    class: _normalizeClass(["wd-timeline", [
      `wd-timeline--${__props.mode}`,
      `wd-timeline--line-${resolvedLine.value}`,
      `wd-timeline--${__props.size}`,
    ]])
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (it, i) => {
      return (_openBlock(), _createElementBlock("li", {
        key: i,
        class: _normalizeClass(["wd-timeline__item", {
        'is-active': it.active,
        'is-disabled': it.disabled,
        'is-clickable': __props.collapsible && it.detail,
        'is-expanded': expanded.value.has(i),
        'is-last': i === __props.items.length - 1,
      }]),
        style: _normalizeStyle(it.color ? { '--tl-color': it.color } : undefined),
        onClick: ($event: any) => (toggle(i, it))
      }, [
        _createCommentVNode(" 节点 "),
        _createElementVNode("span", _hoisted_2, [
          (it.icon)
            ? (_openBlock(), _createBlock(_component_wd_icon, {
                key: 0,
                name: it.icon,
                size: __props.size === 'sm' ? 11 : 13
              }, null, 8 /* PROPS */, ["name", "size"]))
            : (_openBlock(), _createElementBlock("span", _hoisted_3))
        ]),
        _createCommentVNode(" 主体 "),
        _createElementVNode("div", _hoisted_4, [
          (it.period)
            ? (_openBlock(), _createElementBlock("span", _hoisted_5, _toDisplayString(it.period), 1 /* TEXT */))
            : _createCommentVNode("v-if", true),
          _createElementVNode("h3", _hoisted_6, [
            _createTextVNode(_toDisplayString(it.title) + " ", 1 /* TEXT */),
            (__props.collapsible && it.detail)
              ? (_openBlock(), _createBlock(_component_wd_icon, {
                  key: 0,
                  class: _normalizeClass(["wd-timeline__caret", { 'is-open': expanded.value.has(i) }]),
                  name: "chevron-down",
                  size: 13
                }, null, 8 /* PROPS */, ["class"]))
              : _createCommentVNode("v-if", true)
          ]),
          (it.desc)
            ? (_openBlock(), _createElementBlock("p", _hoisted_7, _toDisplayString(it.desc), 1 /* TEXT */))
            : _createCommentVNode("v-if", true),
          _createCommentVNode("\n          折叠内容用 v-show 而非 v-if：\n          展开/收起是高频操作，保留 DOM 避免每次重建；\n          同时 v-show 不参与 Transition，绕开动画时钟停摆的问题。\n        "),
          (__props.collapsible && it.detail)
            ? _withDirectives((_openBlock(), _createElementBlock("div", {
                key: 2,
                class: "wd-timeline__detail"
              }, _toDisplayString(it.detail), 513 /* TEXT, NEED_PATCH */)), [
                [_vShow, expanded.value.has(i)]
              ])
            : _createCommentVNode("v-if", true)
        ])
      ], 14 /* CLASS, STYLE, PROPS */, _hoisted_1))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}
}

})