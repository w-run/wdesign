import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = ["value", "disabled", "onInput", "onKeydown"]

import { ref } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdOtp' },
  __name: 'WdOtp',
  props: {
    modelValue: { type: String, required: false, default: '' },
    length: { type: Number, required: false, default: 6 },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const boxes = ref<HTMLInputElement[]>([])

function charAt(i: number) {
  return props.modelValue[i] || ''
}

function onInput(i: number, e: Event) {
  const el = e.target as HTMLInputElement
  const next = el.value.replace(/\D/g, '').slice(-1)
  const arr = props.modelValue.split('')
  arr[i] = next
  emit('update:modelValue', arr.join('').slice(0, props.length))
  if (next && i < props.length - 1) boxes.value[i + 1]?.focus()
}

function onKeydown(i: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !charAt(i) && i > 0) {
    const arr = props.modelValue.split('')
    arr[i - 1] = ''
    emit('update:modelValue', arr.join(''))
    boxes.value[i - 1]?.focus()
  }
  if (e.key === 'ArrowLeft' && i > 0) boxes.value[i - 1]?.focus()
  if (e.key === 'ArrowRight' && i < props.length - 1) boxes.value[i + 1]?.focus()
}

function onPaste(e: ClipboardEvent) {
  e.preventDefault()
  const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, props.length)
  if (!text) return
  emit('update:modelValue', text)
  boxes.value[Math.min(text.length, props.length - 1)]?.focus()
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: "wd-otp",
    onPaste: onPaste
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.length, (i) => {
      return (_openBlock(), _createElementBlock("input", {
        key: i,
        ref_for: true,
        ref_key: "boxes",
        ref: boxes,
        class: "wd-otp__box",
        value: charAt(i - 1),
        disabled: __props.disabled,
        inputmode: "numeric",
        maxlength: "1",
        autocomplete: "one-time-code",
        onInput: ($event: any) => (onInput(i - 1, $event)),
        onKeydown: ($event: any) => (onKeydown(i - 1, $event))
      }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_1))
    }), 128 /* KEYED_FRAGMENT */))
  ], 32 /* NEED_HYDRATION */))
}
}

})