import { defineComponent as _defineComponent } from 'vue'
import { createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, createVNode as _createVNode, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, unref as _unref, vModelText as _vModelText, withModifiers as _withModifiers, withDirectives as _withDirectives, createBlock as _createBlock, normalizeStyle as _normalizeStyle, Teleport as _Teleport } from "vue"

const _hoisted_1 = ["disabled", "aria-expanded"]
const _hoisted_2 = {
  key: 0,
  class: "wd-select__tags"
}
const _hoisted_3 = ["aria-label", "onClick"]
const _hoisted_4 = {
  key: 0,
  class: "wd-select__tag wd-select__tag--more"
}
const _hoisted_5 = { class: "wd-select__value" }
const _hoisted_6 = {
  key: 2,
  class: "wd-select__placeholder"
}
const _hoisted_7 = { class: "wd-select__actions" }
const _hoisted_8 = ["aria-multiselectable"]
const _hoisted_9 = {
  key: 0,
  class: "wd-select__search"
}
const _hoisted_10 = ["aria-selected", "disabled", "onClick", "onMouseenter"]
const _hoisted_11 = {
  key: 1,
  class: "wd-select__empty"
}

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useOverlayLayer } from './overlay-stack'
import { useAnchoredPosition } from './anchor'

// <Transition> 依赖 transitionend 收尾；事件丢失时元素会停在 enter-from。
// 显式给 duration，让 Vue 用定时器兜底。
import { popDuration } from './pop-duration'
/** 过渡时长：尊重系统「减弱动态效果」，否则用它兜底 transitionend 丢失的情况 */
type OptionValue = string | number
type Option = string | { label: string; value: OptionValue; disabled?: boolean }
type Model = OptionValue | OptionValue[]


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSelect' },
  __name: 'WdSelect',
  props: {
    modelValue: { type: [String, Number, Array], required: false, default: '' },
    options: { type: Array, required: false, default: () => [] },
    placeholder: { type: String, required: false, default: '请选择' },
    disabled: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: 'md' },
    multiple: { type: Boolean, required: false, default: false },
    filterable: { type: Boolean, required: false, default: false },
    clearable: { type: Boolean, required: false, default: false },
    maxTagCount: { type: Number, required: false, default: 3 }
  },
  emits: ["update:modelValue", "change", "clear"],
  setup(__props: any, { emit: __emit }) {

const POP_DURATION = popDuration()



const props = __props

const emit = __emit

const open = ref(false)
const root = ref<HTMLElement>()
const triggerEl = ref<HTMLElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)

/** Teleport 到 body + fixed 定位，避免被祖先 overflow:hidden 裁切 */
const { pos } = useAnchoredPosition(open, triggerEl, menuEl, {
  placement: 'bottom-start',
  gap: 6,
  matchWidth: true,
})

/** 层栈：Esc 只关最上层（弹窗里的选择器不会连带关弹窗） */
useOverlayLayer(open, root, () => { open.value = false; return true })
const search = ref('')
const searchEl = ref<HTMLInputElement | null>(null)
const activeIndex = ref(-1)

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o, disabled: false } : { disabled: false, ...o })),
)

/** 当前选中值集合（统一成数组便于判断） */
const selected = computed<OptionValue[]>(() => {
  if (props.multiple) return Array.isArray(props.modelValue) ? props.modelValue : []
  return props.modelValue === '' || props.modelValue === undefined ? [] : [props.modelValue as OptionValue]
})

const selectedItems = computed(() => selected.value.map((v) => items.value.find((o) => o.value === v)).filter(Boolean) as typeof items.value)

/** 过滤后的选项（filterable） */
const visible = computed(() => {
  const kw = search.value.trim().toLowerCase()
  if (!kw || !props.filterable) return items.value
  return items.value.filter((o) => String(o.label).toLowerCase().includes(kw))
})

const hasValue = computed(() => selected.value.length > 0)
const showClear = computed(() => props.clearable && hasValue.value && !props.disabled)

/** 多选时触发器里显示的标签（超出 maxTagCount 折叠） */
const shownTags = computed(() => selectedItems.value.slice(0, props.maxTagCount))
const overflowCount = computed(() => Math.max(0, selectedItems.value.length - props.maxTagCount))

const singleLabel = computed(() => selectedItems.value[0]?.label ?? '')

function toggle(v: OptionValue) {
  const opt = items.value.find((o) => o.value === v)
  if (opt?.disabled) return

  if (props.multiple) {
    const set = new Set(selected.value)
    set.has(v) ? set.delete(v) : set.add(v)
    const next = Array.from(set)
    emit('update:modelValue', next)
    emit('change', next)
    // 多选不关闭面板，便于连续选择
  } else {
    emit('update:modelValue', v)
    emit('change', v)
    open.value = false
  }
  search.value = ''
}

function removeTag(v: OptionValue, e: MouseEvent) {
  e.stopPropagation()
  if (props.disabled) return
  const next = selected.value.filter((x) => x !== v)
  emit('update:modelValue', next)
  emit('change', next)
}

function clear(e?: MouseEvent) {
  e?.stopPropagation()
  const next = props.multiple ? [] : ''
  emit('update:modelValue', next)
  emit('change', next)
  emit('clear')
}

async function toggleOpen() {
  if (props.disabled) return
  open.value = !open.value
  if (open.value) {
    activeIndex.value = Math.max(0, visible.value.findIndex((o) => o.value === selected.value[0]))
    await nextTick()
    if (props.filterable) searchEl.value?.focus()
  } else {
    search.value = ''
  }
}

/* ---- 键盘操作 ---- */
function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  if (!open.value && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
    e.preventDefault(); toggleOpen(); return
  }
  if (!open.value) return
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const n = visible.value.length
    if (!n) return
    const dir = e.key === 'ArrowDown' ? 1 : -1
    activeIndex.value = (activeIndex.value + dir + n) % n
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const opt = visible.value[activeIndex.value]
    if (opt) toggle(opt.value)
  }
}

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) {
    open.value = false
    search.value = ''
  }
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

// 选项变化后把高亮索引夹到范围内
watch(visible, (list) => {
  if (activeIndex.value >= list.length) activeIndex.value = list.length - 1
})

return (_ctx: any,_cache: any) => {
  const _component_wd_icon = _resolveComponent("wd-icon")!

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", {
      ref_key: "root",
      ref: root,
      class: _normalizeClass(["wd-select", { 'wd-select--open': open.value, 'wd-select--disabled': __props.disabled, 'wd-select--multiple': __props.multiple }]),
      onKeydown: onKeydown
    }, [
      _createElementVNode("button", {
        ref_key: "triggerEl",
        ref: triggerEl,
        type: "button",
        class: _normalizeClass(["wd-select__trigger", [`wd-select__trigger--${__props.size}`, { 'wd-select__trigger--tags': __props.multiple && hasValue.value }]]),
        disabled: __props.disabled,
        "aria-expanded": open.value,
        "aria-haspopup": "listbox",
        onClick: toggleOpen
      }, [
        _createCommentVNode(" 多选：标签堆叠 "),
        (__props.multiple && hasValue.value)
          ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(shownTags.value, (o) => {
                return (_openBlock(), _createElementBlock("span", {
                  key: o.value,
                  class: "wd-select__tag"
                }, [
                  _createTextVNode(_toDisplayString(o.label) + " ", 1 /* TEXT */),
                  (!__props.disabled)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        type: "button",
                        class: "wd-select__tag-x",
                        "aria-label": `移除 ${o.label}`,
                        onClick: ($event: any) => (removeTag(o.value, $event))
                      }, [
                        _createVNode(_component_wd_icon, {
                          name: "close",
                          size: 10
                        })
                      ], 8 /* PROPS */, _hoisted_3))
                    : _createCommentVNode("v-if", true)
                ]))
              }), 128 /* KEYED_FRAGMENT */)),
              (overflowCount.value)
                ? (_openBlock(), _createElementBlock("span", _hoisted_4, "+" + _toDisplayString(overflowCount.value), 1 /* TEXT */))
                : _createCommentVNode("v-if", true)
            ]))
          : (!__props.multiple && hasValue.value)
            ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                _createCommentVNode(" 单选 "),
                _createElementVNode("span", _hoisted_5, _toDisplayString(singleLabel.value), 1 /* TEXT */)
              ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            : (_openBlock(), _createElementBlock("span", _hoisted_6, _toDisplayString(__props.placeholder), 1 /* TEXT */)),
        _createElementVNode("span", _hoisted_7, [
          (showClear.value)
            ? (_openBlock(), _createElementBlock("button", {
                key: 0,
                type: "button",
                class: "wd-select__clear",
                "aria-label": "清除",
                onClick: clear
              }, [
                _createVNode(_component_wd_icon, {
                  name: "close",
                  size: 12
                })
              ]))
            : _createCommentVNode("v-if", true),
          _createVNode(_component_wd_icon, {
            class: _normalizeClass(["wd-chevron", { 'wd-chevron--open': open.value }]),
            name: "chevron-down",
            size: 14
          }, null, 8 /* PROPS */, ["class"])
        ])
      ], 10 /* CLASS, PROPS */, _hoisted_1)
    ], 34 /* CLASS, NEED_HYDRATION */),
    (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
      _createElementVNode("div", {
        ref_key: "menuEl",
        ref: menuEl,
        class: _normalizeClass(["wd-select__menu", { 'is-open': open.value }]),
        style: _normalizeStyle({ top: _unref(pos).top + 'px', left: _unref(pos).left + 'px', minWidth: '200px' }),
        role: "listbox",
        "aria-multiselectable": __props.multiple || undefined
      }, [
        _createCommentVNode(" 搜索框 "),
        (__props.filterable)
          ? (_openBlock(), _createElementBlock("div", _hoisted_9, [
              _withDirectives(_createElementVNode("input", {
                ref_key: "searchEl",
                ref: searchEl,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event: any) => ((search).value = $event)),
                type: "text",
                placeholder: "输入关键字筛选…",
                onClick: _cache[1] || (_cache[1] = _withModifiers(() => {}, ["stop"]))
              }, null, 512 /* NEED_PATCH */), [
                [_vModelText, search.value]
              ])
            ]))
          : _createCommentVNode("v-if", true),
        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(visible.value, (o, i) => {
          return (_openBlock(), _createElementBlock("button", {
            key: o.value,
            type: "button",
            role: "option",
            class: _normalizeClass(["wd-select__option", {
            'wd-select__option--active': selected.value.includes(o.value),
            'wd-select__option--hover': i === activeIndex.value,
            'wd-select__option--disabled': o.disabled,
          }]),
            "aria-selected": selected.value.includes(o.value),
            disabled: o.disabled,
            onClick: ($event: any) => (toggle(o.value)),
            onMouseenter: ($event: any) => (activeIndex.value = i)
          }, [
            _createElementVNode("span", null, _toDisplayString(o.label), 1 /* TEXT */),
            (selected.value.includes(o.value))
              ? (_openBlock(), _createBlock(_component_wd_icon, {
                  key: 0,
                  class: "wd-select__option-mark",
                  name: "check",
                  size: 14
                }))
              : _createCommentVNode("v-if", true)
          ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_10))
        }), 128 /* KEYED_FRAGMENT */)),
        (!visible.value.length)
          ? (_openBlock(), _createElementBlock("div", _hoisted_11, "无匹配项"))
          : _createCommentVNode("v-if", true)
      ], 14 /* CLASS, STYLE, PROPS */, _hoisted_8)
    ]))
  ], 64 /* STABLE_FRAGMENT */))
}
}

})