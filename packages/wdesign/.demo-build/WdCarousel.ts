import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, withModifiers as _withModifiers, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = ["src", "alt"]
const _hoisted_2 = {
  key: 1,
  class: "wd-carousel__label"
}
const _hoisted_3 = {
  key: 2,
  class: "wd-carousel__dots"
}
const _hoisted_4 = ["aria-label", "onClick"]

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export interface WdCarouselItem {
  label?: string
  src?: string
  alt?: string
}

const SETTLE_MS = 500
const THRESHOLD = 40

export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdCarousel' },
  __name: 'WdCarousel',
  props: {
    items: { type: Array, required: false, default: () => [] },
    height: { type: Number, required: false, default: 260 },
    autoplay: { type: Number, required: false, default: 0 },
    showDots: { type: Boolean, required: false, default: true },
    showArrows: { type: Boolean, required: false, default: true },
    loop: { type: Boolean, required: false, default: true }
  },
  setup(__props: any) {



const props = __props

const PALETTE = ['var(--wd-tint-2)', 'var(--wd-success-soft)', 'var(--wd-warning-soft)', 'var(--wd-field)']

const root = ref<HTMLElement | null>(null)
const n = () => props.items.length
const looping = () => props.loop && n() > 1

/**
 * 无缝循环：在首尾各克隆一张 —— [末] 1 2 3 [首]
 * 滑到克隆位后，等 transitionend 再**无动画**跳回真身，
 * 于是末→首、首→末都看不出倒退。
 */
const slides = computed(() => {
  const list = props.items
  if (!list.length) return []
  if (!looping()) return list.map((it, i) => ({ it, real: i, key: 'r' + i }))
  return [
    { it: list[list.length - 1], real: list.length - 1, key: 'c-head' },
    ...list.map((it, i) => ({ it, real: i, key: 'r' + i })),
    { it: list[0], real: 0, key: 'c-tail' },
  ]
})

/** 轨道位置（有 loop 时整体右移一格，pos=1 对应急真实第 0 张） */
const pos = ref(looping() ? 1 : 0)
const animating = ref(true)
const dragX = ref(0)

const current = computed(() => {
  const total = n() || 1
  return ((pos.value - (looping() ? 1 : 0)) % total + total) % total
})

const trackStyle = computed(() => ({
  transform: `translateX(calc(-${pos.value * 100}% + ${dragX.value}px))`,
  transition: animating.value ? undefined : 'none',
}))

function go(i: number) {
  if (!n()) return
  animating.value = true
  pos.value = (looping() ? 1 : 0) + i
  scheduleSettle()
  restart()
}

function next() {
  if (!n()) return
  animating.value = true
  pos.value += 1
  if (!looping()) pos.value = pos.value % n()
  scheduleSettle()
  restart()
}

function prev() {
  if (!n()) return
  animating.value = true
  pos.value -= 1
  if (!looping()) pos.value = (pos.value + n()) % n()
  scheduleSettle()
  restart()
}

/**
 * 过渡结束：站在克隆位就无动画跳回真身。
 * ⚠️ 不能只依赖 transitionend —— 动画时钟停摆（后台标签页、无头渲染、
 * 系统「减弱动态效果」）时该事件不会来，位置会一路累积（-900%、-1200%…）。
 * 因此另设一个兜底定时器，时长取 CSS 过渡的 0.45s + 余量。
 */
let settleTimer: number | null = null

function scheduleSettle() {
  if (settleTimer) window.clearTimeout(settleTimer)
  if (!looping()) return
  settleTimer = window.setTimeout(normalize, SETTLE_MS)
}

function normalize() {
  if (!looping()) return
  if (pos.value === 0) jumpTo(n())
  else if (pos.value === n() + 1) jumpTo(1)
}

function onTransitionEnd() {
  if (settleTimer) { window.clearTimeout(settleTimer); settleTimer = null }
  normalize()
}

function jumpTo(target: number) {
  animating.value = false
  pos.value = target
  // 两帧后恢复动画，确保「瞬时归位」不被合成到同一次绘制里
  requestAnimationFrame(() => requestAnimationFrame(() => { animating.value = true }))
}

let timer: number | null = null
function restart() {
  stop()
  if (props.autoplay > 0 && n() > 1) timer = window.setInterval(next, props.autoplay)
}
function stop() {
  if (timer) { window.clearInterval(timer); timer = null }
}
onMounted(() => {
  pos.value = looping() ? 1 : 0
  restart()
})
onBeforeUnmount(() => { stop(); detach(); if (settleTimer) window.clearTimeout(settleTimer) })

/* ---------------- 滑动手势 ---------------- */
let startX = 0, startY = 0, swiping = false, decided = false

function onDown(e: PointerEvent) {
  if (n() < 2) return
  if (e.pointerType === 'mouse' && e.button !== 0) return
  swiping = true; decided = false
  startX = e.clientX; startY = e.clientY
  try { (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId) } catch { /* ignore */ }
  window.addEventListener('pointermove', onMove, { passive: false })
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

function onMove(e: PointerEvent) {
  if (!swiping) return
  const dx = e.clientX - startX, dy = e.clientY - startY
  if (!decided) {
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
    if (Math.abs(dy) > Math.abs(dx)) { end(false); return }
    decided = true
    stop()
  }
  if (e.cancelable) e.preventDefault()
  dragX.value = dx
}

function onUp(e: PointerEvent) {
  if (!swiping) return
  const dx = e.clientX - startX
  if (decided && Math.abs(dx) > THRESHOLD) {
    if (dx < 0) next(); else prev()
  }
  end(true)
}

function end(again: boolean) {
  swiping = false; decided = false; dragX.value = 0
  detach()
  if (again) restart()
}

function detach() {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('pointercancel', onUp)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    ref_key: "root",
    ref: root,
    class: "wd-carousel",
    style: _normalizeStyle({ height: __props.height + 'px' }),
    onMouseenter: stop,
    onMouseleave: restart,
    onPointerdown: onDown
  }, [
    _createElementVNode("div", {
      class: "wd-carousel__track",
      style: _normalizeStyle(trackStyle.value),
      onTransitionend: onTransitionEnd
    }, [
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(slides.value, (s) => {
        return (_openBlock(), _createElementBlock("div", {
          key: s.key,
          class: "wd-carousel__slide",
          style: _normalizeStyle({ background: PALETTE[s.real % PALETTE.length] })
        }, [
          _renderSlot(_ctx.$slots, "item", {
            item: s.it,
            index: s.real
          }, () => [
            (s.it.src)
              ? (_openBlock(), _createElementBlock("img", {
                  key: 0,
                  src: s.it.src,
                  alt: s.it.alt || '',
                  class: "wd-carousel__img",
                  draggable: "false"
                }, null, 8 /* PROPS */, _hoisted_1))
              : (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(s.it.label || `Slide ${s.real + 1}`), 1 /* TEXT */))
          ])
        ], 4 /* STYLE */))
      }), 128 /* KEYED_FRAGMENT */))
    ], 36 /* STYLE, NEED_HYDRATION */),
    (__props.showArrows && __props.items.length > 1)
      ? (_openBlock(), _createElementBlock("button", {
          key: 0,
          type: "button",
          class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--prev",
          "aria-label": "上一张",
          onPointerdown: _cache[0] || (_cache[0] = _withModifiers(() => {}, ["stop"])),
          onClick: prev
        }, [...(_cache[3] || (_cache[3] = [
          _createElementVNode("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.6",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            _createElementVNode("path", { d: "m15 18-6-6 6-6" })
          ], -1 /* CACHED */)
        ]))], 32 /* NEED_HYDRATION */))
      : _createCommentVNode("v-if", true),
    (__props.showArrows && __props.items.length > 1)
      ? (_openBlock(), _createElementBlock("button", {
          key: 1,
          type: "button",
          class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--next",
          "aria-label": "下一张",
          onPointerdown: _cache[1] || (_cache[1] = _withModifiers(() => {}, ["stop"])),
          onClick: next
        }, [...(_cache[4] || (_cache[4] = [
          _createElementVNode("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.6",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            _createElementVNode("path", { d: "m9 6 6 6-6 6" })
          ], -1 /* CACHED */)
        ]))], 32 /* NEED_HYDRATION */))
      : _createCommentVNode("v-if", true),
    (__props.showDots && __props.items.length > 1)
      ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (_, i) => {
            return (_openBlock(), _createElementBlock("button", {
              key: i,
              type: "button",
              class: _normalizeClass(["wd-carousel__dot", { 'wd-carousel__dot--active': i === current.value }]),
              "aria-label": `第 ${i + 1} 张`,
              onPointerdown: _cache[2] || (_cache[2] = _withModifiers(() => {}, ["stop"])),
              onClick: ($event: any) => (go(i))
            }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_4))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : _createCommentVNode("v-if", true)
  ], 36 /* STYLE, NEED_HYDRATION */))
}
}

})