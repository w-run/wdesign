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

const el = ref<HTMLInputElement | null>(null)

/**
 * 当前值：拖动中以原生 input 的实时值为准，否则跟随 props。
 *
 * 为什么不能只看 props：组件允许只传 `:model-value`（受控但父级不更新，
 * 如演示页的静态示例），此时 emit 出去也没人接，props 永远不变 ——
 * 滑块能拖、红色进度却停在原地。
 * 这里用 `live` 记录用户拖出来的值，保证视觉与滑块位置始终一致。
 */
const live = ref<number | null>(null)
const current = computed(() => (live.value !== null ? live.value : props.modelValue))

const percent = computed(() => {
  const span = props.max - props.min || 1
  return Math.max(0, Math.min(100, ((current.value - props.min) / span) * 100))
})

const trackStyle = computed(() => ({
  background: `linear-gradient(to right, var(--wd-red) 0%, var(--wd-red) ${percent.value}%, var(--wd-tint-2) ${percent.value}%, var(--wd-tint-2) 100%)`,
}))

function onInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  live.value = v                 // 立即驱动视觉，不等父级回传
  emit('update:modelValue', v)
}

// 外部值变化时清除本地覆盖（父级真正接管后以 props 为准）
watch(
  () => props.modelValue,
  (v) => {
    if (live.value !== null && v !== live.value) live.value = null
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
      value: current.value,
      style: _normalizeStyle(trackStyle.value),
      onInput: onInput
    }, null, 44 /* STYLE, PROPS, NEED_HYDRATION */, _hoisted_2),
    (__props.showValue)
      ? (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(current.value), 1 /* TEXT */))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})