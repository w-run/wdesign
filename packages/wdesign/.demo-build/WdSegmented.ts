import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, createBlock as _createBlock } from "vue"

const _hoisted_1 = ["aria-hidden"]
const _hoisted_2 = ["aria-selected", "tabindex", "onClick"]
const _hoisted_3 = {
  key: 0,
  class: "wd-segmented-picker"
}
const _hoisted_4 = ["aria-expanded"]
const _hoisted_5 = { class: "wd-segmented-picker__label" }
const _hoisted_6 = { class: "wd-segmented-picker__meta" }
const _hoisted_7 = {
  key: 0,
  class: "wd-segmented-picker__panel",
  role: "listbox"
}
const _hoisted_8 = ["aria-selected", "onClick"]

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useDismiss } from './anchor'
import { useOverlayLayer } from './overlay-stack'

type Option = string | { label: string; value: string | number }
type Mode = 'flat' | 'scroll' | 'dropdown'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSegmented' },
  __name: 'WdSegmented',
  props: {
    modelValue: { type: [String, Number], required: false, default: '' },
    options: { type: Array, required: false, default: () => [] },
    block: { type: Boolean, required: false, default: false },
    tone: { type: String, required: false, default: 'light' },
    overflow: { type: String, required: false, default: 'wrap' },
    overflowMax: { type: Number, required: false, default: 15 }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)
const activeLabel = computed(
  () => items.value.find((o) => o.value === props.modelValue)?.label ?? '',
)

const wrap = ref<HTMLElement>()
/** 点击外部关闭 */
const track = ref<HTMLElement>()
const slider = ref<HTMLElement>()

const mode = ref<Mode>('flat')
const canLeft = ref(false)
const canRight = ref(false)
const dropdownOpen = ref(false)
/** 点击外部关闭：统一走 anchor.ts（click 事件，与触发器一致） */
useDismiss([wrap], () => { dropdownOpen.value = false }, dropdownOpen)



/** 层栈：Esc 只关最上层 */
useOverlayLayer(dropdownOpen, wrap, () => { dropdownOpen.value = false; return true })

/* ---------------- 滑块（选中项平移） ---------------- */
/**
 * 是否已完成首次定位。
 * ⚠️ 首次定位必须**禁用过渡**，否则页面加载时滑块会从 x=0
 * 一路滑到选中项 —— 用户看到的是一个莫名其妙的横移动画。
 * 那是「初始状态」而不是「状态变化」，不该有过渡。
 */
let sliderPlaced = false

function updateSlider() {
  const t = track.value
  const s = slider.value
  if (!t || !s || mode.value === 'dropdown') return
  const active = t.querySelector<HTMLElement>('.wd-segmented__item--active')
  if (!active) return

  // 首帧：先关掉过渡，落位后再恢复（下一帧开，避免同一帧内又被捕捉）
  if (!sliderPlaced) {
    const prev = s.style.transition
    s.style.transition = 'none'
    place(active, s)
    // 强制一次样式计算，让"无过渡的初始位置"先提交
    void s.offsetWidth
    requestAnimationFrame(() => {
      s.style.transition = prev || ''
      sliderPlaced = true
    })
    // rAF 在时钟停摆时不回调 —— 兜底直接恢复
    setTimeout(() => {
      if (!sliderPlaced) { s.style.transition = prev || ''; sliderPlaced = true }
    }, 80)
    return
  }
  place(active, s)
}

/** 把滑块移到激活项的位置（绝对值，不累积漂移） */
function place(active: HTMLElement, s: HTMLElement) {
  // 滑块与激活项同处 track 坐标系；offsetLeft/Top 不受 transform 影响
  s.style.transform = `translate(${active.offsetLeft - s.offsetLeft}px, ${active.offsetTop - s.offsetTop}px)`
  s.style.width = `${active.offsetWidth}px`
  s.style.height = `${active.offsetHeight}px`
}

/* ---------------- 滚动/自动模式：模式判定 ---------------- */
function measure() {
  const w = wrap.value
  const t = track.value
  if (!t || !w) return

  /*
   * ⚠️ 这里每条分支都必须走到 updateSlider()。
   *
   * 曾经 `overflow === 'wrap'`（默认值）分支直接 `return` 了 ——
   * 于是**默认模式的分段控制在初始化时滑块从不定位**，
   * 必须点一下别的选项（触发 watch(modelValue)）才出现。
   * 非默认模式反而正常，所以这个 bug 很容易被忽略。
   *
   * 统一在函数末尾 nextTick 里更新，任何分支都不提前返回。
   */
  if (props.overflow === 'wrap') {
    mode.value = 'flat'
  } else if (props.overflow === 'scroll') {
    mode.value = 'scroll'
  } else {
    // auto：内容自然宽度 vs 容器可用宽度
    // 注意不能用 track.clientWidth —— 它是 inline-flex，宽度随内容，永远「放得下」
    const cs = getComputedStyle(t)
    const pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0)
    const gap = parseFloat(cs.columnGap) || parseFloat(cs.gap) || 0
    const kids = Array.from(t.querySelectorAll<HTMLElement>('.wd-segmented__item'))
    const content = kids.reduce((sum, k) => sum + k.offsetWidth, 0) + gap * Math.max(0, kids.length - 1) + pad
    const wcs = getComputedStyle(w)
    const available =
      w.clientWidth - (parseFloat(wcs.paddingLeft) || 0) - (parseFloat(wcs.paddingRight) || 0)
    if (content <= available + 1) mode.value = 'flat'
    else if (kids.length > props.overflowMax) mode.value = 'dropdown'
    else mode.value = 'scroll'
  }
  nextTick(() => {
    updateSlider()
    updateFades()
  })
}

/* ---------------- 渐隐提示 ---------------- */
function updateFades() {
  const t = track.value
  if (!t || mode.value !== 'scroll') {
    canLeft.value = false
    canRight.value = false
    return
  }
  const max = t.scrollWidth - t.clientWidth
  canLeft.value = t.scrollLeft > 1
  canRight.value = max > 1 && t.scrollLeft < max - 1
}

/** 把选中项平滑滚入视野（不改变页面滚动位置） */
function scrollActiveIntoView() {
  const t = track.value
  if (!t || mode.value !== 'scroll') return
  const align = () => {
    const active = t.querySelector<HTMLElement>('.wd-segmented__item--active')
    if (!active) return
    const pad = 8
    const left = active.offsetLeft - pad
    const right = active.offsetLeft + active.offsetWidth + pad
    if (left < t.scrollLeft) t.scrollTo({ left, behavior: 'smooth' })
    else if (right > t.scrollLeft + t.clientWidth) t.scrollTo({ left: right - t.clientWidth, behavior: 'smooth' })
  }
  align()
  // 兜底：smooth 结束后若仍未对齐（字体加载/布局变化），再校正一次
  t.addEventListener('scrollend', align, { once: true })
}

/* ---------------- 下拉模式 ---------------- */
function pick(v: string | number) {
  emit('update:modelValue', v)
  dropdownOpen.value = false
}
function onKey(e: KeyboardEvent) {
  // Esc 由层栈统一调度（见下方 useOverlayLayer），这里不再单独处理
}

let ro: ResizeObserver | undefined

onMounted(async () => {
  await nextTick()
  measure()
  window.addEventListener('resize', measure)
  document.addEventListener('keydown', onKey)
  // 容器尺寸变化（侧栏展开/窗口缩放）时重新判定模式
  if (typeof ResizeObserver !== 'undefined' && wrap.value) {
    ro = new ResizeObserver(() => measure())
    ro.observe(wrap.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
  document.removeEventListener('keydown', onKey)
  ro?.disconnect()
})

watch(
  () => props.modelValue,
  () =>
    nextTick(() => {
      updateSlider()
      scrollActiveIntoView()
    }),
)

watch(items, () =>
  nextTick(() => {
    measure()
  }),
)

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("div", {
    ref_key: "wrap",
    ref: wrap,
    class: _normalizeClass(["wd-segmented-wrap", {
      'wd-segmented-wrap--auto': __props.overflow === 'auto',
      'wd-segmented-wrap--scroll': mode.value === 'scroll',
      'wd-segmented-wrap--measuring': mode.value === 'dropdown',
      'wd-segmented-wrap--fade-l': canLeft.value,
      'wd-segmented-wrap--fade-r': canRight.value,
    }])
  }, [
    _createElementVNode("div", {
      ref_key: "track",
      ref: track,
      class: _normalizeClass(["wd-segmented", { 'wd-segmented--block': __props.block, 'wd-segmented--dark': __props.tone === 'dark' }]),
      "aria-hidden": mode.value === 'dropdown',
      role: "tablist",
      onScroll: updateFades
    }, [
      _createElementVNode("span", {
        ref_key: "slider",
        ref: slider,
        class: "wd-segmented__slider"
      }, null, 512 /* NEED_PATCH */),
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (o) => {
        return (_openBlock(), _createElementBlock("button", {
          key: o.value,
          type: "button",
          role: "tab",
          class: _normalizeClass(["wd-segmented__item", { 'wd-segmented__item--active': o.value === __props.modelValue }]),
          "aria-selected": o.value === __props.modelValue,
          tabindex: mode.value === 'dropdown' ? -1 : 0,
          onClick: ($event: any) => (emit('update:modelValue', o.value))
        }, _toDisplayString(o.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_2))
      }), 128 /* KEYED_FRAGMENT */))
    ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1),
    _createCommentVNode(" 选项过多：降级为下拉筛选 "),
    (mode.value === 'dropdown')
      ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
          _createElementVNode("button", {
            type: "button",
            class: "wd-segmented-picker__trigger",
            "aria-haspopup": 'listbox',
            "aria-expanded": dropdownOpen.value,
            onClick: _cache[0] || (_cache[0] = ($event: any) => (dropdownOpen.value = !dropdownOpen.value))
          }, [
            _createElementVNode("span", _hoisted_5, _toDisplayString(activeLabel.value), 1 /* TEXT */),
            _createElementVNode("span", _hoisted_6, _toDisplayString(items.value.length) + " 项", 1 /* TEXT */),
            _createVNode(_component_wd_icon, {
              class: _normalizeClass(["wd-segmented-picker__caret", { 'is-open': dropdownOpen.value }]),
              name: "chevron-down",
              size: 16
            }, null, 8 /* PROPS */, ["class"])
          ], 8 /* PROPS */, _hoisted_4),
          (dropdownOpen.value)
            ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (o) => {
                  return (_openBlock(), _createElementBlock("button", {
                    key: o.value,
                    type: "button",
                    role: "option",
                    "aria-selected": o.value === __props.modelValue,
                    class: _normalizeClass(["wd-segmented-picker__option", { 'wd-segmented-picker__option--active': o.value === __props.modelValue }]),
                    onClick: ($event: any) => (pick(o.value))
                  }, [
                    _createElementVNode("span", null, _toDisplayString(o.label), 1 /* TEXT */),
                    (o.value === __props.modelValue)
                      ? (_openBlock(), _createBlock(_component_wd_icon, {
                          key: 0,
                          name: "check",
                          size: 15
                        }))
                      : _createCommentVNode("v-if", true)
                  ], 10 /* CLASS, PROPS */, _hoisted_8))
                }), 128 /* KEYED_FRAGMENT */))
              ]))
            : _createCommentVNode("v-if", true)
        ]))
      : _createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

})