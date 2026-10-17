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

const THRESHOLD = 40          // 超过这个位移才翻页

export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdCarousel' },
  __name: 'WdCarousel',
  props: {
    items: { type: Array, required: false, default: () => [] },
    height: { type: Number, required: false, default: 260 },
    autoplay: { type: Number, required: false, default: 0 },
    showDots: { type: Boolean, required: false, default: true },
    showArrows: { type: Boolean, required: false, default: true }
  },
  setup(__props: any) {



const props = __props

const PALETTE = ['var(--wd-tint-2)', 'var(--wd-success-soft)', 'var(--wd-warning-soft)', 'var(--wd-field)']

const index = ref(0)
const root = ref<HTMLElement | null>(null)

/** 拖动中的水平位移（px），用于跟手反馈 */
const dragX = ref(0)

const trackStyle = computed(() => ({
  transform: `translateX(calc(-${index.value * 100}% + ${dragX.value}px))`,
  transition: dragX.value === 0 ? undefined : 'none',
}))

function go(i: number) {
  const n = props.items.length
  if (!n) return
  index.value = ((i % n) + n) % n
}

let timer: number | null = null
function start() {
  stop()
  if (props.autoplay > 0 && props.items.length > 1) {
    timer = window.setInterval(() => go(index.value + 1), props.autoplay)
  }
}
function stop() {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
}
onMounted(start)
onBeforeUnmount(() => {
  stop()
  detach()
})

/* ---------------------------------------------------------------
 * 滑动切换：Pointer Events
 * `touch-action: pan-y` 已在样式里声明，横向手势由我们接管、
 * 纵向滚动仍交给浏览器。原先只有箭头和圆点，触屏滑不动。
 * --------------------------------------------------------------- */
let startX = 0
let startY = 0
let swiping = false
let decided = false
let pid = -1

function onDown(e: PointerEvent) {
  if (props.items.length < 2) return
  if (e.pointerType === 'mouse' && e.button !== 0) return
  swiping = true
  decided = false
  startX = e.clientX
  startY = e.clientY
  pid = e.pointerId
  // 同 WdSortableList：捕获失败不应中断手势
  try {
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  } catch { /* ignore */ }
  window.addEventListener('pointermove', onMove, { passive: false })
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

function onMove(e: PointerEvent) {
  if (!swiping) return
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  if (!decided) {
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
    // 纵向优先 → 交还给页面滚动
    if (Math.abs(dy) > Math.abs(dx)) { end(false); return }
    decided = true
    stop()                    // 手势开始后暂停自动播放
  }
  if (e.cancelable) e.preventDefault()
  // 首尾加阻尼，避免拖出空白
  const atEdge = (index.value === 0 && dx > 0) ||
                 (index.value === props.items.length - 1 && dx < 0)
  dragX.value = atEdge ? dx * 0.35 : dx
}

function onUp(e: PointerEvent) {
  if (!swiping) return
  const dx = e.clientX - startX
  if (decided && Math.abs(dx) > THRESHOLD) {
    go(index.value + (dx < 0 ? 1 : -1))
  }
  end(true)
}

function end(restart: boolean) {
  swiping = false
  decided = false
  dragX.value = 0
  detach()
  if (restart) start()
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
    onMouseleave: start,
    onPointerdown: onDown
  }, [
    _createElementVNode("div", {
      class: "wd-carousel__track",
      style: _normalizeStyle(trackStyle.value)
    }, [
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (it, i) => {
        return (_openBlock(), _createElementBlock("div", {
          key: i,
          class: "wd-carousel__slide",
          style: _normalizeStyle({ background: PALETTE[i % PALETTE.length] })
        }, [
          _renderSlot(_ctx.$slots, "item", {
            item: it,
            index: i
          }, () => [
            (it.src)
              ? (_openBlock(), _createElementBlock("img", {
                  key: 0,
                  src: it.src,
                  alt: it.alt || '',
                  class: "wd-carousel__img",
                  draggable: "false"
                }, null, 8 /* PROPS */, _hoisted_1))
              : (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(it.label || `Slide ${i + 1}`), 1 /* TEXT */))
          ])
        ], 4 /* STYLE */))
      }), 128 /* KEYED_FRAGMENT */))
    ], 4 /* STYLE */),
    (__props.showArrows && __props.items.length > 1)
      ? (_openBlock(), _createElementBlock("button", {
          key: 0,
          type: "button",
          class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--prev",
          "aria-label": "上一张",
          onPointerdown: _cache[0] || (_cache[0] = _withModifiers(() => {}, ["stop"])),
          onClick: _cache[1] || (_cache[1] = ($event: any) => (go(index.value - 1)))
        }, [...(_cache[5] || (_cache[5] = [
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
          onPointerdown: _cache[2] || (_cache[2] = _withModifiers(() => {}, ["stop"])),
          onClick: _cache[3] || (_cache[3] = ($event: any) => (go(index.value + 1)))
        }, [...(_cache[6] || (_cache[6] = [
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
              class: _normalizeClass(["wd-carousel__dot", { 'wd-carousel__dot--active': i === index.value }]),
              "aria-label": `第 ${i + 1} 张`,
              onPointerdown: _cache[4] || (_cache[4] = _withModifiers(() => {}, ["stop"])),
              onClick: ($event: any) => (go(i))
            }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_4))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : _createCommentVNode("v-if", true)
  ], 36 /* STYLE, NEED_HYDRATION */))
}
}

})