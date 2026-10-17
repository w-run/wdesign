import { defineComponent as _defineComponent } from 'vue'
import { normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue"

const _hoisted_1 = { class: "wd-slider" }
const _hoisted_2 = ["min", "max", "step", "value"]
const _hoisted_3 = {
  key: 0,
  class: "wd-slider__value"
}

import { computed, ref, watch } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSlider' },
  __name: 'WdSlider',
  props: {
    modelValue: { type: Number, required: false, default: 0 },
    min: { type: Number, required: false, default: 0 },
    max: { type: Number, required: false, default: 100 },
    step: { type: Number, required: false, default: 1 },
    showValue: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const percent = computed(() => {
  const span = props.max - props.min || 1
  return Math.max(0, Math.min(100, ((props.modelValue - props.min) / span) * 100))
})

const trackStyle = computed(() => ({
  background: `linear-gradient(to right, var(--wd-red) 0%, var(--wd-red) ${percent.value}%, var(--wd-tint-2) ${percent.value}%, var(--wd-tint-2) 100%)`,
}))

/**
 * 拖动时必须让原生 input 自己维护 value。
 * 原先用 `:value` + `@input`：用户拖动 → emit → 父组件回传 → Vue 把 DOM value
 * 重设回 modelValue。若父组件未即时更新（或值被夹紧），滑块会被反复拉回，
 * 表现为「拖不动 / 进度卡住」。
 * 这里改为：input 事件只透出数值，DOM value 交给浏览器；仅在外部值变化时同步。
 */
const el = ref<HTMLInputElement | null>(null)
let dragging = false

function onInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  emit('update:modelValue', v)
}

function onPointerDown() { dragging = true }
function onPointerUp() { dragging = false }

watch(
  () => props.modelValue,
  (v) => {
    // 拖动过程中不回写，避免打断用户操作
    if (dragging || !el.value) return
    if (Number(el.value.value) !== v) el.value.value = String(v)
  },
)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("input", {
      ref_key: "el",
      ref: el,
      type: "range",
      min: __props.min,
      max: __props.max,
      step: __props.step,
      value: __props.modelValue,
      style: _normalizeStyle(trackStyle.value),
      onInput: onInput,
      onPointerdown: onPointerDown,
      onPointerup: onPointerUp,
      onPointercancel: onPointerUp
    }, null, 44 /* STYLE, PROPS, NEED_HYDRATION */, _hoisted_2),
    (__props.showValue)
      ? (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(__props.modelValue), 1 /* TEXT */))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})