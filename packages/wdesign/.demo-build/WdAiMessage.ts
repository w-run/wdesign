import { defineComponent as _defineComponent } from 'vue'
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, renderList as _renderList, Fragment as _Fragment } from "vue"

const _hoisted_1 = { class: "wd-ai-msg__avatar" }
const _hoisted_2 = { class: "wd-ai-msg__bubble" }
const _hoisted_3 = {
  key: 0,
  class: "wd-ai-msg__thinking"
}
const _hoisted_4 = { class: "wd-ai-msg__reasoning-state" }
const _hoisted_5 = { class: "wd-ai-msg__reasoning-body" }
const _hoisted_6 = { class: "wd-ai-msg__reasoning-inner" }
const _hoisted_7 = { class: "wd-ai-msg__reasoning-text" }
const _hoisted_8 = {
  key: 0,
  class: "wd-ai-msg__cursor"
}
const _hoisted_9 = {
  key: 2,
  class: "wd-ai-msg__text"
}
const _hoisted_10 = {
  key: 0,
  class: "wd-ai-msg__cursor"
}
const _hoisted_11 = {
  key: 3,
  class: "wd-ai-msg__actions"
}
const _hoisted_12 = ["onClick"]

import { onBeforeUnmount, ref, watch } from 'vue'

interface Action {
  label: string
  variant?: 'primary' | 'tint' | 'ghost'
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdAiMessage' },
  __name: 'WdAiMessage',
  props: {
    content: { type: String, required: false, default: '' },
    reasoning: { type: String, required: false, default: '' },
    self: { type: Boolean, required: false, default: false },
    thinking: { type: Boolean, required: false, default: false },
    streaming: { type: Boolean, required: false, default: false },
    reasoningStreaming: { type: Boolean, required: false, default: false },
    speed: { type: Number, required: false, default: 24 },
    actions: { type: Array, required: false, default: () => [] },
    defaultReasoningOpen: { type: Boolean, required: false, default: true }
  },
  emits: ["action", "stream-end", "reasoning-end"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const shown = ref(props.content)
const shownReasoning = ref(props.reasoning)
const reasoningOpen = ref(props.defaultReasoningOpen)

let contentTimer: number | null = null
let reasoningTimer: number | null = null

function stopContent() {
  if (contentTimer) {
    window.clearInterval(contentTimer)
    contentTimer = null
  }
}
function stopReasoning() {
  if (reasoningTimer) {
    window.clearInterval(reasoningTimer)
    reasoningTimer = null
  }
}

function startContent() {
  stopContent()
  shown.value = ''
  let i = 0
  contentTimer = window.setInterval(() => {
    i += 1
    shown.value = props.content.slice(0, i)
    if (i >= props.content.length) {
      stopContent()
      emit('stream-end')
    }
  }, Math.max(8, props.speed))
}

function startReasoning() {
  stopReasoning()
  shownReasoning.value = ''
  let i = 0
  reasoningTimer = window.setInterval(() => {
    i += 1
    shownReasoning.value = props.reasoning.slice(0, i)
    if (i >= props.reasoning.length) {
      stopReasoning()
      emit('reasoning-end')
      // 思考结束自动收起（可点击重新展开）
      if (props.defaultReasoningOpen) reasoningOpen.value = false
    }
  }, Math.max(8, props.speed))
}

watch(
  () => props.streaming,
  (v) => {
    if (v) startContent()
    else {
      stopContent()
      shown.value = props.content
    }
  },
  { immediate: true },
)

watch(
  () => props.reasoningStreaming,
  (v) => {
    if (v) startReasoning()
    else {
      stopReasoning()
      shownReasoning.value = props.reasoning
    }
  },
  { immediate: true },
)

watch(
  () => props.content,
  (v) => {
    if (!props.streaming) shown.value = v
  },
)

watch(
  () => props.reasoning,
  (v) => {
    if (!props.reasoningStreaming) shownReasoning.value = v
  },
)

onBeforeUnmount(() => {
  stopContent()
  stopReasoning()
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-ai-msg", { 'wd-ai-msg--self': __props.self }])
  }, [
    _createElementVNode("span", _hoisted_1, _toDisplayString(__props.self ? '我' : 'AI'), 1 /* TEXT */),
    _createElementVNode("div", _hoisted_2, [
      _createCommentVNode(" 深度思考（reasoning_content）：独立区域，可折叠 "),
      (__props.thinking && !shownReasoning.value)
        ? (_openBlock(), _createElementBlock("div", _hoisted_3, [...(_cache[1] || (_cache[1] = [
            _createElementVNode("i", null, null, -1 /* CACHED */),
            _createElementVNode("i", null, null, -1 /* CACHED */),
            _createElementVNode("i", null, null, -1 /* CACHED */),
            _createTextVNode("深度思考中… ", -1 /* CACHED */)
          ]))]))
        : _createCommentVNode("v-if", true),
      (shownReasoning.value)
        ? (_openBlock(), _createElementBlock("div", {
            key: 1,
            class: _normalizeClass(["wd-ai-msg__reasoning", { 'wd-ai-msg__reasoning--open': reasoningOpen.value }])
          }, [
            _createElementVNode("button", {
              type: "button",
              class: "wd-ai-msg__reasoning-head",
              onClick: _cache[0] || (_cache[0] = ($event: any) => (reasoningOpen.value = !reasoningOpen.value))
            }, [
              _cache[3] || (_cache[3] = _createElementVNode("svg", {
                class: "wd-ai-msg__reasoning-spark",
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "currentColor"
              }, [
                _createElementVNode("path", { d: "M12 2.5l1.9 5.2 5.3 1.9-5.3 1.9L12 16.7l-1.9-5.2-5.3-1.9 5.3-1.9z" })
              ], -1 /* CACHED */)),
              _cache[4] || (_cache[4] = _createElementVNode("span", { class: "wd-ai-msg__reasoning-title" }, "深度思考", -1 /* CACHED */)),
              _createElementVNode("span", _hoisted_4, _toDisplayString(__props.reasoningStreaming ? '进行中' : '已完成'), 1 /* TEXT */),
              _createElementVNode("span", {
                class: _normalizeClass(["wd-chevron", { 'wd-chevron--open': reasoningOpen.value }])
              }, [...(_cache[2] || (_cache[2] = [
                _createElementVNode("svg", {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.6",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, [
                  _createElementVNode("path", { d: "m6 9 6 6 6-6" })
                ], -1 /* CACHED */)
              ]))], 2 /* CLASS */)
            ]),
            _createElementVNode("div", _hoisted_5, [
              _createElementVNode("div", _hoisted_6, [
                _createElementVNode("p", _hoisted_7, [
                  _createTextVNode(_toDisplayString(shownReasoning.value), 1 /* TEXT */),
                  (__props.reasoningStreaming)
                    ? (_openBlock(), _createElementBlock("span", _hoisted_8, "▍"))
                    : _createCommentVNode("v-if", true)
                ])
              ])
            ])
          ], 2 /* CLASS */))
        : _createCommentVNode("v-if", true),
      _createCommentVNode(" 正文（content） "),
      (__props.content || shown.value)
        ? (_openBlock(), _createElementBlock("p", _hoisted_9, [
            _createTextVNode(_toDisplayString(shown.value), 1 /* TEXT */),
            (__props.streaming && shown.value.length < __props.content.length)
              ? (_openBlock(), _createElementBlock("span", _hoisted_10, "▍"))
              : _createCommentVNode("v-if", true)
          ]))
        : _createCommentVNode("v-if", true),
      (__props.actions.length)
        ? (_openBlock(), _createElementBlock("div", _hoisted_11, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.actions, (a) => {
              return (_openBlock(), _createElementBlock("button", {
                key: a.label,
                type: "button",
                class: _normalizeClass(["wd-btn", [`wd-btn--${a.variant || 'ghost'}`, 'wd-btn--sm']]),
                onClick: ($event: any) => (emit('action', a.label))
              }, _toDisplayString(a.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_12))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : _createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}
}

})