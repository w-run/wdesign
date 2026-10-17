import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue"

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
const trackStyle = computed(() => ({ transform: `translateX(-${index.value * 100}%)` }))

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
onBeforeUnmount(stop)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: "wd-carousel",
    style: _normalizeStyle({ height: __props.height + 'px' }),
    onMouseenter: stop,
    onMouseleave: start
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
                  class: "wd-carousel__img"
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
          onClick: _cache[0] || (_cache[0] = ($event: any) => (go(index.value - 1)))
        }, [...(_cache[2] || (_cache[2] = [
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
        ]))]))
      : _createCommentVNode("v-if", true),
    (__props.showArrows && __props.items.length > 1)
      ? (_openBlock(), _createElementBlock("button", {
          key: 1,
          type: "button",
          class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--next",
          "aria-label": "下一张",
          onClick: _cache[1] || (_cache[1] = ($event: any) => (go(index.value + 1)))
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
            _createElementVNode("path", { d: "m9 6 6 6-6 6" })
          ], -1 /* CACHED */)
        ]))]))
      : _createCommentVNode("v-if", true),
    (__props.showDots && __props.items.length > 1)
      ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (_, i) => {
            return (_openBlock(), _createElementBlock("button", {
              key: i,
              type: "button",
              class: _normalizeClass(["wd-carousel__dot", { 'wd-carousel__dot--active': i === index.value }]),
              "aria-label": `第 ${i + 1} 张`,
              onClick: ($event: any) => (go(i))
            }, null, 10 /* CLASS, PROPS */, _hoisted_4))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : _createCommentVNode("v-if", true)
  ], 36 /* STYLE, NEED_HYDRATION */))
}
}

})