import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, createVNode as _createVNode, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = ["aria-selected", "disabled", "tabindex", "onClick"]
const _hoisted_2 = { class: "wd-tabs__label" }
const _hoisted_3 = ["aria-label", "onClick"]

import { computed, nextTick, onMounted, ref, watch } from 'vue'

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

/* ---------------- 选中滑块（与 WdSegmented 同一套做法） ---------------- */
/**
 * Tabs 与 Segmented 视觉几乎一致，但之前 Tabs 只有"选中项换底色"，
 * 切换时是硬切。这里补一个平滑滑动的指示块，让两者行为对齐。
 *
 * 用 offsetLeft/offsetWidth 而非 getBoundingClientRect：
 *   offset* 是相对 offsetParent 的布局值，不受 transform 影响，
 *   而滑块本身就是被 transform 移动的 —— 用 rect 会读到上一帧的位置。
 */
const root = ref<HTMLElement | null>(null)
const slider = ref<HTMLElement | null>(null)
const sliderReady = ref(false)

function updateSlider() {
  const r = root.value
  const s = slider.value
  if (!r || !s) return
  const active = r.querySelector<HTMLElement>('.wd-tabs__item--active')
  if (!active) { s.style.opacity = '0'; return }
  s.style.opacity = '1'
  s.style.width = active.offsetWidth + 'px'
  s.style.height = active.offsetHeight + 'px'
  s.style.transform = `translate(${active.offsetLeft - s.offsetLeft}px, ${active.offsetTop - s.offsetTop}px)`
}

/**
 * 首帧禁过渡：页面加载时滑块应从 0 直接落位，而不是"滑进来"。
 * 与 Segmented 踩过的坑一致 —— 用类名控制而非内联 transition，
 * 且 rAF 在后台/无头环境不回调，必须用 setTimeout 兜底。
 */
function settleSlider() {
  if (sliderReady.value) return
  slider.value?.classList.remove('is-initial')
  sliderReady.value = true
}

onMounted(async () => {
  slider.value?.classList.add('is-initial')
  await nextTick()
  updateSlider()
  requestAnimationFrame(settleSlider)
  window.setTimeout(settleSlider, 60)
  window.addEventListener('resize', updateSlider)
})

watch(() => props.modelValue, () => nextTick(updateSlider))
watch(() => props.tabs, () => nextTick(updateSlider), { deep: true })

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("div", {
    ref_key: "root",
    ref: root,
    class: _normalizeClass(["wd-tabs", {
      'wd-tabs--block': __props.block,
      'wd-tabs--anim-ready': animReady.value,
      'wd-tabs--scrollable': __props.scrollable,
      'wd-tabs--closable': items.value.some(t => t.closable),
    }]),
    role: "tablist",
    onKeydown: onKeydown
  }, [
    _createElementVNode("span", {
      ref_key: "slider",
      ref: slider,
      class: "wd-tabs__slider"
    }, null, 512 /* NEED_PATCH */),
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
            }, [
              _createVNode(_component_wd_icon, {
                name: "close",
                size: 10
              })
            ], 8 /* PROPS */, _hoisted_3))
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
        }, [
          _createVNode(_component_wd_icon, {
            name: "plus",
            size: 14
          })
        ]))
      : _createCommentVNode("v-if", true)
  ], 34 /* CLASS, NEED_HYDRATION */))
}
}

})