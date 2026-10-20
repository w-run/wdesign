import { defineComponent as _defineComponent } from 'vue'
import { unref as _unref, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle } from "vue"

const _hoisted_1 = ["aria-label", "aria-disabled"]
const _hoisted_2 = ["aria-checked", "aria-label", "tabindex", "disabled", "onPointerenter", "onClick"]

import { computed, ref } from 'vue'
import { useControllable } from './controllable'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdRate' },
  __name: 'WdRate',
  props: {
    modelValue: { type: Number, required: false },
    defaultValue: { type: Number, required: false },
    count: { type: Number, required: false, default: 5 },
    disabled: { type: Boolean, required: false, default: false },
    clearable: { type: Boolean, required: false, default: true },
    color: { type: String, required: false, default: 'var(--wd-red)' },
    colorOff: { type: String, required: false, default: 'var(--wd-field-hover)' },
    icon: { type: String, required: false, default: 'star' },
    size: { type: Number, required: false, default: 22 }
  },
  emits: ["update:modelValue", "change"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const { value, set } = useControllable<number>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: 0,
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

/** 悬停预览：-1 表示无预览 */
const hover = ref(-1)

/**
 * 只有真正支持悬停的指针（鼠标 / 触控板）才做预览。
 * 触屏上 `pointerenter` 会在按下时触发、而 `pointerleave` 常常不来，
 * 于是 hover 值残留 → 点同一颗星「清空」后星星仍然亮着（看起来清空失败）。
 */
function isHoverPointer(e: PointerEvent) {
  return e.pointerType === 'mouse' || e.pointerType === 'pen'
}

function onEnter(i: number, e: PointerEvent) {
  if (props.disabled || !isHoverPointer(e)) return
  hover.value = i
}

function onLeave(e: PointerEvent) {
  if (!isHoverPointer(e)) return
  hover.value = -1
}

function pick(i: number) {
  if (props.disabled) return
  // 触摸后立刻清掉预览，避免高亮停留在被点的星上造成「没清空」的错觉
  hover.value = -1
  const next = value.value === i + 1 ? (props.clearable ? 0 : i + 1) : i + 1
  set(next)
}

/** 展示用值：有预览看预览，否则看受控值 */
const shown = computed(() => (hover.value >= 0 ? hover.value + 1 : props.modelValue))

// ---- 键盘操作（WAI-ARIA radiogroup 语义）----
const root = ref<HTMLElement | null>(null)

function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  const cur = props.modelValue
  let next: number | null = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = Math.min(props.count, cur + 1)
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = Math.max(0, cur - 1)
  else if (e.key === 'Home') next = 1
  else if (e.key === 'End') next = props.count
  else if (e.key === 'Delete' || e.key === 'Backspace') next = 0
  if (next === null) return
  e.preventDefault()
  emit('update:modelValue', next)
}

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("div", {
    ref_key: "root",
    ref: root,
    class: _normalizeClass(["wd-rate", { 'wd-rate--disabled': __props.disabled }]),
    style: _normalizeStyle({
      '--rate-color': __props.color,
      '--rate-color-off': __props.colorOff,
    }),
    role: "radiogroup",
    "aria-label": `评分，共 ${__props.count} 星，当前 ${_unref(value)} 星`,
    "aria-disabled": __props.disabled || undefined,
    onMouseleave: _cache[1] || (_cache[1] = ($event: any) => (hover.value = -1)),
    onKeydown: onKeydown
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.count, (i) => {
      return (_openBlock(), _createElementBlock("button", {
        key: i,
        type: "button",
        class: _normalizeClass(["wd-rate__item", { 'wd-rate__item--on': i <= shown.value }]),
        role: "radio",
        "aria-checked": i === _unref(value),
        "aria-label": `${i} 星`,
        tabindex: __props.disabled ? -1 : i === (_unref(value) || (hover.value >= 0 ? hover.value + 1 : 1)) ? 0 : -1,
        disabled: __props.disabled,
        onPointerenter: ($event: any) => (onEnter(i - 1, $event)),
        onPointerleave: _cache[0] || (_cache[0] = ($event: any) => (onLeave($event))),
        onClick: ($event: any) => (pick(i - 1))
      }, [
        _createCommentVNode("\n        用 filled 变体：实心星比描边星更有\"评分\"的分量感。\n        variant=\"filled\" 让 WdIcon 去找 filled 目录下的同名图标。\n      "),
        _createVNode(_component_wd_icon, {
          name: __props.icon,
          variant: "filled",
          size: __props.size
        }, null, 8 /* PROPS */, ["name", "size"])
      ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_2))
    }), 128 /* KEYED_FRAGMENT */))
  ], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_1))
}
}

})