import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, withModifiers as _withModifiers, toDisplayString as _toDisplayString, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport, createBlock as _createBlock, Fragment as _Fragment } from "vue"

const _hoisted_1 = ["src", "alt"]
const _hoisted_2 = {
  key: 0,
  class: "wd-preview"
}
const _hoisted_3 = ["src", "alt"]
const _hoisted_4 = {
  key: 0,
  class: "wd-preview__count"
}
const _hoisted_5 = { class: "wd-preview__toolbar" }

import { computed, ref, watch } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdImagePreview' },
  __name: 'WdImagePreview',
  props: {
    src: { type: String, required: false, default: '' },
    list: { type: Array, required: false, default: () => [] },
    alt: { type: String, required: false, default: '' },
    index: { type: Number, required: false, default: 0 }
  },
  setup(__props: any) {



const props = __props

const open = ref(false)
const cur = ref(props.index)
const scale = ref(1)
const rotate = ref(0)

const images = computed(() => (props.list.length ? props.list : props.src ? [props.src] : []))

watch(
  () => props.index,
  (v) => {
    cur.value = v
  },
)

function view(i: number) {
  const n = images.value.length
  if (!n) return
  cur.value = ((i % n) + n) % n
  scale.value = 1
  rotate.value = 0
}
function zoom(d: number) {
  scale.value = Math.min(4, Math.max(0.4, Math.round((scale.value + d) * 100) / 100))
}
function resetView() {
  scale.value = 1
  rotate.value = 0
}
function openPreview() {
  if (!images.value.length) return
  resetView()
  open.value = true
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("span", {
      class: "wd-image-preview",
      onClick: openPreview
    }, [
      _renderSlot(_ctx.$slots, "default", {}, () => [
        (__props.src || __props.list.length)
          ? (_openBlock(), _createElementBlock("img", {
              key: 0,
              src: __props.src || images.value[0],
              alt: __props.alt,
              class: "wd-image-preview__thumb"
            }, null, 8 /* PROPS */, _hoisted_1))
          : _createCommentVNode("v-if", true)
      ])
    ]),
    (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
      _createVNode(_Transition, { name: "wd-preview-fade" }, {
        default: _withCtx(() => [
          (open.value)
            ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
                _createElementVNode("div", {
                  class: "wd-preview__mask",
                  onClick: _cache[0] || (_cache[0] = ($event: any) => (open.value = false))
                }),
                _createElementVNode("div", {
                  class: "wd-preview__stage",
                  onWheel: _cache[1] || (_cache[1] = _withModifiers(($event: any) => (zoom(($event as WheelEvent).deltaY > 0 ? -0.15 : 0.15)), ["prevent"]))
                }, [
                  _createElementVNode("img", {
                    class: "wd-preview__img",
                    src: images.value[cur.value],
                    alt: __props.alt,
                    style: _normalizeStyle({ transform: `scale(${scale.value}) rotate(${rotate.value}deg)` })
                  }, null, 12 /* STYLE, PROPS */, _hoisted_3)
                ], 32 /* NEED_HYDRATION */),
                (images.value.length > 1)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_4, _toDisplayString(cur.value + 1) + " / " + _toDisplayString(images.value.length), 1 /* TEXT */))
                  : _createCommentVNode("v-if", true),
                _createElementVNode("div", _hoisted_5, [
                  (images.value.length > 1)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "上一张",
                        onClick: _cache[2] || (_cache[2] = ($event: any) => (view(cur.value - 1)))
                      }, "‹"))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "旋转",
                    onClick: _cache[3] || (_cache[3] = ($event: any) => (rotate.value = (rotate.value + 90) % 360))
                  }, "↻"),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "缩小",
                    onClick: _cache[4] || (_cache[4] = ($event: any) => (zoom(-0.25)))
                  }, "−"),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "放大",
                    onClick: _cache[5] || (_cache[5] = ($event: any) => (zoom(0.25)))
                  }, "＋"),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "还原",
                    onClick: resetView
                  }, "1:1"),
                  (images.value.length > 1)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "下一张",
                        onClick: _cache[6] || (_cache[6] = ($event: any) => (view(cur.value + 1)))
                      }, "›"))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "关闭",
                    onClick: _cache[7] || (_cache[7] = ($event: any) => (open.value = false))
                  }, [...(_cache[8] || (_cache[8] = [
                    _createElementVNode("svg", {
                      width: "13",
                      height: "13",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round"
                    }, [
                      _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                    ], -1 /* CACHED */)
                  ]))])
                ])
              ]))
            : _createCommentVNode("v-if", true)
        ]),
        _: 1 /* STABLE */
      })
    ]))
  ], 64 /* STABLE_FRAGMENT */))
}
}

})