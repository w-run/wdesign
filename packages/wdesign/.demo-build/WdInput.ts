import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, withModifiers as _withModifiers, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass } from "vue"

const _hoisted_1 = {
  key: 0,
  class: "wd-input__icon"
}
const _hoisted_2 = ["type", "value", "placeholder", "disabled", "readonly", "maxlength"]
const _hoisted_3 = {
  key: 2,
  class: "wd-input__count"
}

import { computed, ref } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdInput' },
  __name: 'WdInput',
  props: {
    modelValue: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    shape: { type: String, required: false, default: 'pill' },
    type: { type: String, required: false, default: 'text' },
    disabled: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: 'md' },
    clearable: { type: Boolean, required: false, default: false },
    maxlength: { type: Number, required: false },
    showCount: { type: Boolean, required: false, default: false },
    readonly: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue", "clear", "enter"],
  setup(__props: any, { expose: __expose, emit: __emit }) {



const props = __props

const emit = __emit

const el = ref<HTMLInputElement | null>(null)

const hasValue = computed(() => props.modelValue.length > 0)
const showClear = computed(() => props.clearable && hasValue.value && !props.disabled && !props.readonly)
const count = computed(() => (props.showCount && props.maxlength ? `${props.modelValue.length}/${props.maxlength}` : ''))

function onInput(event: Event) {
  let v = (event.target as HTMLInputElement).value
  // 浏览器原生 maxlength 已限制输入，这里再兜一层（粘贴/程序化赋值）
  if (props.maxlength && v.length > props.maxlength) {
    v = v.slice(0, props.maxlength)
    ;(event.target as HTMLInputElement).value = v
  }
  emit('update:modelValue', v)
}

function clear() {
  emit('update:modelValue', '')
  emit('clear')
  el.value?.focus()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') emit('enter', props.modelValue)
}

__expose({ focus: () => el.value?.focus(), blur: () => el.value?.blur() })

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock("label", {
    class: _normalizeClass(["wd-input", {
      'wd-input--rounded': __props.shape === 'rounded',
      'wd-input--lg': __props.size === 'lg',
      'wd-input--sm': __props.size === 'sm',
      'wd-input--has-count': !!count.value,
    }])
  }, [
    (_ctx.$slots.icon)
      ? (_openBlock(), _createElementBlock("span", _hoisted_1, [
          _renderSlot(_ctx.$slots, "icon")
        ]))
      : _createCommentVNode("v-if", true),
    _createElementVNode("input", {
      ref_key: "el",
      ref: el,
      type: __props.type,
      value: __props.modelValue,
      placeholder: __props.placeholder,
      disabled: __props.disabled,
      readonly: __props.readonly,
      maxlength: __props.maxlength,
      onInput: onInput,
      onKeydown: onKeydown
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_2),
    (showClear.value)
      ? (_openBlock(), _createElementBlock("button", {
          key: 1,
          type: "button",
          class: "wd-input__clear",
          "aria-label": "清除",
          onClick: _withModifiers(clear, ["prevent"])
        }, [
          _createVNode(_component_wd_icon, {
            name: "close",
            size: 13
          })
        ]))
      : _createCommentVNode("v-if", true),
    _renderSlot(_ctx.$slots, "suffix"),
    (count.value)
      ? (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(count.value), 1 /* TEXT */))
      : _createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

})