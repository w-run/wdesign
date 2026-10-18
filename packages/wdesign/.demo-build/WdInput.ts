import { defineComponent as _defineComponent } from 'vue'
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, unref as _unref, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, withModifiers as _withModifiers, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass } from "vue"

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
import { useControllable } from './controllable'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdInput' },
  __name: 'WdInput',
  props: {
    modelValue: { type: String, required: false },
    defaultValue: { type: String, required: false },
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
  emits: ["update:modelValue", "change", "clear", "enter"],
  setup(__props: any, { expose: __expose, emit: __emit }) {



const props = __props

const emit = __emit

/**
 * 受控 / 非受控。
 * 非受控模式下组件自己持有输入值，只需监听 @change ——
 * 搜索框这类「用完就走」的场景不必再维护一个 ref。
 */
const { value, set } = useControllable<string>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: '',
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

const el = ref<HTMLInputElement | null>(null)

const hasValue = computed(() => value.value.length > 0)
const showClear = computed(() => props.clearable && hasValue.value && !props.disabled && !props.readonly)
const count = computed(() => (props.showCount && props.maxlength ? `${value.value.length}/${props.maxlength}` : ''))

function onInput(event: Event) {
  let v = (event.target as HTMLInputElement).value
  // 浏览器原生 maxlength 已限制输入，这里再兜一层（粘贴/程序化赋值）
  if (props.maxlength && v.length > props.maxlength) {
    v = v.slice(0, props.maxlength)
    ;(event.target as HTMLInputElement).value = v
  }
  set(v)
}

function clear() {
  set('')
  emit('clear')
  el.value?.focus()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') emit('enter', value.value)
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
      value: _unref(value),
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