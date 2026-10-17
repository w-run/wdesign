import { defineComponent as _defineComponent } from 'vue'
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, unref as _unref, renderList as _renderList, Fragment as _Fragment, normalizeClass as _normalizeClass, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode } from "vue"

const _hoisted_1 = ["disabled"]
const _hoisted_2 = {
  key: 0,
  class: "wd-datepicker__value"
}
const _hoisted_3 = {
  key: 1,
  class: "wd-datepicker__placeholder"
}
const _hoisted_4 = {
  key: 0,
  class: "wd-datepicker__panel"
}
const _hoisted_5 = { class: "wd-datepicker__head" }
const _hoisted_6 = { class: "wd-datepicker__month" }
const _hoisted_7 = { class: "wd-datepicker__week" }
const _hoisted_8 = { class: "wd-datepicker__grid" }
const _hoisted_9 = ["onClick"]

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。
import { popDuration } from './pop-duration'
/** 过渡时长：尊重系统「减弱动态效果」，否则用它兜底 transitionend 丢失的情况 */

export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdDatePicker' },
  __name: 'WdDatePicker',
  props: {
    modelValue: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '选择日期' },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {

const POP_DURATION = popDuration()




const props = __props

const emit = __emit

const open = ref(false)
const root = ref<HTMLElement>()
const view = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))

const WEEK = ['一', '二', '三', '四', '五', '六', '日']

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}
function fmt(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const monthLabel = computed(() => `${view.value.getFullYear()} 年 ${view.value.getMonth() + 1} 月`)

const days = computed(() => {
  const first = view.value
  const startIdx = (first.getDay() + 6) % 7 // 周一为第一列
  const start = new Date(first)
  start.setDate(1 - startIdx)
  const today = fmt(new Date())
  const list: { key: string; label: number; muted: boolean; today: boolean; selected: boolean }[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = fmt(d)
    list.push({
      key,
      label: d.getDate(),
      muted: d.getMonth() !== first.getMonth(),
      today: key === today,
      selected: key === props.modelValue,
    })
  }
  return list
})

function prevMonth() {
  view.value = new Date(view.value.getFullYear(), view.value.getMonth() - 1, 1)
}
function nextMonth() {
  view.value = new Date(view.value.getFullYear(), view.value.getMonth() + 1, 1)
}
function pick(key: string) {
  emit('update:modelValue', key)
  open.value = false
}
function pickToday() {
  const now = new Date()
  view.value = new Date(now.getFullYear(), now.getMonth(), 1)
  pick(fmt(now))
}

function toggle() {
  if (props.disabled) return
  open.value = !open.value
  if (open.value && props.modelValue) {
    const d = new Date(props.modelValue)
    if (!Number.isNaN(d.getTime())) {
      view.value = new Date(d.getFullYear(), d.getMonth(), 1)
    }
  }
}

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    ref_key: "root",
    ref: root,
    class: _normalizeClass(["wd-datepicker", { 'wd-datepicker--open': open.value }])
  }, [
    _createElementVNode("button", {
      type: "button",
      class: "wd-datepicker__trigger",
      disabled: __props.disabled,
      onClick: toggle
    }, [
      (__props.modelValue)
        ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(__props.modelValue), 1 /* TEXT */))
        : (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(__props.placeholder), 1 /* TEXT */)),
      _cache[0] || (_cache[0] = _createElementVNode("svg", {
        class: "wd-datepicker__icon",
        width: "15",
        height: "15",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round"
      }, [
        _createElementVNode("rect", {
          x: "3.5",
          y: "5",
          width: "17",
          height: "16",
          rx: "4"
        }),
        _createElementVNode("path", { d: "M3.5 10h17M8 3v4M16 3v4" })
      ], -1 /* CACHED */))
    ], 8 /* PROPS */, _hoisted_1),
    _createVNode(_Transition, {
      name: "wd-pop",
      duration: _unref(POP_DURATION)
    }, {
      default: _withCtx(() => [
        (open.value)
          ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
              _createElementVNode("div", _hoisted_5, [
                _createElementVNode("span", _hoisted_6, _toDisplayString(monthLabel.value), 1 /* TEXT */),
                _createElementVNode("span", { class: "wd-datepicker__nav" }, [
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--sm",
                    "aria-label": "上个月",
                    onClick: prevMonth
                  }, [...(_cache[1] || (_cache[1] = [
                    _createElementVNode("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      _createElementVNode("path", { d: "m15 18-6-6 6-6" })
                    ], -1 /* CACHED */)
                  ]))]),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--sm",
                    "aria-label": "下个月",
                    onClick: nextMonth
                  }, [...(_cache[2] || (_cache[2] = [
                    _createElementVNode("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      _createElementVNode("path", { d: "m9 6 6 6-6 6" })
                    ], -1 /* CACHED */)
                  ]))])
                ])
              ]),
              _createElementVNode("div", _hoisted_7, [
                (_openBlock(), _createElementBlock(_Fragment, null, _renderList(WEEK, (w) => {
                  return _createElementVNode("span", { key: w }, _toDisplayString(w), 1 /* TEXT */)
                }), 64 /* STABLE_FRAGMENT */))
              ]),
              _createElementVNode("div", _hoisted_8, [
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(days.value, (d) => {
                  return (_openBlock(), _createElementBlock("button", {
                    key: d.key,
                    type: "button",
                    class: _normalizeClass(["wd-datepicker__day", {
              'wd-datepicker__day--muted': d.muted,
              'wd-datepicker__day--today': d.today,
              'wd-datepicker__day--selected': d.selected,
            }]),
                    onClick: ($event: any) => (pick(d.key))
                  }, _toDisplayString(d.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_9))
                }), 128 /* KEYED_FRAGMENT */))
              ]),
              _createElementVNode("div", { class: "wd-datepicker__foot" }, [
                _createElementVNode("button", {
                  type: "button",
                  class: "wd-datepicker__todaybtn",
                  onClick: pickToday
                }, "回到今天")
              ])
            ]))
          : _createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["duration"])
  ], 2 /* CLASS */))
}
}

})