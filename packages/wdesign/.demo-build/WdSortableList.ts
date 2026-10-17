import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveComponent as _resolveComponent, createVNode as _createVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createCommentVNode as _createCommentVNode, Teleport as _Teleport, createBlock as _createBlock } from "vue"

const _hoisted_1 = ["onPointerdown"]
const _hoisted_2 = {
  class: "wd-sortable__handle",
  "aria-hidden": "true"
}
const _hoisted_3 = { class: "wd-sortable__label" }
const _hoisted_4 = {
  class: "wd-sortable__handle",
  "aria-hidden": "true"
}
const _hoisted_5 = { class: "wd-sortable__label" }

import { computed, onBeforeUnmount, ref } from 'vue'

type Item = string | { label: string }

const DRAG_THRESHOLD = 4


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSortableList' },
  __name: 'WdSortableList',
  props: {
    modelValue: { type: Array, required: false, default: () => [] }
  },
  emits: ["update:modelValue", "change"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const list = ref<HTMLElement | null>(null)

function labelOf(it: Item) {
  return typeof it === 'string' ? it : it.label
}

/* ---------------------------------------------------------------
 * 拖动实现：Pointer Events（而非 HTML5 拖放）
 *
 * 原先用 draggable + dragstart/dragover/drop —— 这套 API 在**触屏**和
 * 部分内嵌 WebView 中根本不触发，表现为「拖不动」。Pointer Events
 * 统一覆盖鼠标 / 触摸 / 触控笔，且能自己控制阈值与插入位置。
 * --------------------------------------------------------------- */

const dragging = ref(false)
const fromIndex = ref(-1)
const overIndex = ref(-1)
const ghost = ref<{ top: number; left: number; width: number; label: string } | null>(null)

let startY = 0
let startX = 0
let armed = false

function itemEls(): HTMLElement[] {
  if (!list.value) return []
  return Array.from(list.value.querySelectorAll<HTMLElement>('.wd-sortable__item'))
}

function computeOver(y: number): number {
  const els = itemEls()
  for (let i = 0; i < els.length; i++) {
    const r = els[i].getBoundingClientRect()
    if (y < r.top + r.height / 2) return i
  }
  return els.length
}

function onPointerDown(e: PointerEvent, i: number) {
  if (e.button !== undefined && e.button !== 0) return
  armed = true
  dragging.value = false
  fromIndex.value = i
  startY = e.clientY
  startX = e.clientX
  // setPointerCapture 在元素未真正处于活动指针状态时会抛 NotFoundError，
  // 且会中断整个 handler —— 必须包起来，不能让捕获失败拖垮拖拽本身。
  try {
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  } catch { /* 忽略：window 上的监听已足够 */ }
  window.addEventListener('pointermove', onPointerMove, { passive: false })
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(e: PointerEvent) {
  if (!armed) return
  if (!dragging.value) {
    if (Math.abs(e.clientY - startY) < DRAG_THRESHOLD &&
        Math.abs(e.clientX - startX) < DRAG_THRESHOLD) return
    dragging.value = true
    const el = itemEls()[fromIndex.value]
    if (el) {
      const r = el.getBoundingClientRect()
      ghost.value = {
        top: r.top,
        left: r.left,
        width: r.width,
        label: labelOf(props.modelValue[fromIndex.value]),
      }
    }
  }
  if (e.cancelable) e.preventDefault()
  if (ghost.value) ghost.value.top = e.clientY - 20
  overIndex.value = computeOver(e.clientY)
}

function onPointerUp() {
  if (dragging.value && fromIndex.value >= 0 && overIndex.value >= 0) {
    let to = overIndex.value
    if (to > fromIndex.value) to -= 1
    if (to !== fromIndex.value) {
      const arr = [...props.modelValue]
      const [moved] = arr.splice(fromIndex.value, 1)
      arr.splice(to, 0, moved)
      emit('update:modelValue', arr)
      emit('change', arr)
    }
  }
  cleanup()
}

function cleanup() {
  armed = false
  dragging.value = false
  fromIndex.value = -1
  overIndex.value = -1
  ghost.value = null
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
}

onBeforeUnmount(cleanup)

const dropLineTop = computed(() => {
  if (!dragging.value || overIndex.value < 0 || !list.value) return null
  const els = itemEls()
  if (!els.length) return null
  const base = list.value.getBoundingClientRect()
  const i = overIndex.value
  return i < els.length
    ? els[i].getBoundingClientRect().top - base.top
    : els[els.length - 1].getBoundingClientRect().bottom - base.top
})

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", {
      class: _normalizeClass(["wd-sortable", { 'wd-sortable--dragging': dragging.value }]),
      ref_key: "list",
      ref: list
    }, [
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.modelValue, (it, i) => {
        return (_openBlock(), _createElementBlock("div", {
          key: i,
          class: _normalizeClass(["wd-sortable__item", {
        'wd-sortable__item--drag': dragging.value && fromIndex.value === i,
        'wd-sortable__item--over': dragging.value && overIndex.value === i && fromIndex.value !== i,
      }]),
          onPointerdown: ($event: any) => (onPointerDown($event, i))
        }, [
          _createElementVNode("span", _hoisted_2, [
            _createVNode(_component_wd_icon, {
              name: "dots-drag",
              size: 14
            })
          ]),
          _createElementVNode("span", _hoisted_3, _toDisplayString(labelOf(it)), 1 /* TEXT */)
        ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1))
      }), 128 /* KEYED_FRAGMENT */)),
      (dropLineTop.value !== null)
        ? (_openBlock(), _createElementBlock("div", {
            key: 0,
            class: "wd-sortable__drop-line",
            style: _normalizeStyle({ top: dropLineTop.value + 'px' })
          }, null, 4 /* STYLE */))
        : _createCommentVNode("v-if", true)
    ], 2 /* CLASS */),
    (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
      (ghost.value)
        ? (_openBlock(), _createElementBlock("div", {
            key: 0,
            class: "wd-sortable__clone",
            style: _normalizeStyle({ top: ghost.value.top + 'px', left: ghost.value.left + 'px', width: ghost.value.width + 'px' })
          }, [
            _createElementVNode("span", _hoisted_4, [
              _createVNode(_component_wd_icon, {
                name: "dots-drag",
                size: 14
              })
            ]),
            _createElementVNode("span", _hoisted_5, _toDisplayString(ghost.value.label), 1 /* TEXT */)
          ], 4 /* STYLE */))
        : _createCommentVNode("v-if", true)
    ]))
  ], 64 /* STABLE_FRAGMENT */))
}
}

})