/* 由 tools/build-demo-components.mjs 自动生成，请勿手工编辑。
 * 源：src/components/*.vue（46 个）
 * 依赖：全局 Vue（vue.global.prod.js）
 */
const { defineComponent, computed, ref, watch, watchEffect, nextTick, onMounted, onBeforeUnmount, createElementVNode, createElementBlock, openBlock, createBlock, Fragment, renderList, toDisplayString, normalizeClass, normalizeStyle, withModifiers, withKeys, withCtx, createCommentVNode, createTextVNode, resolveComponent, mergeProps, Teleport, Transition, TransitionGroup, vModelText, vShow, toRef, reactive, provide, inject, h } = Vue

/* ---- WdAiMessage ---- */


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


interface Action {
  label: string
  variant?: 'primary' | 'tint' | 'ghost'
}


export const WdAiMessage = /*@__PURE__*/_defineComponent({
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

/* ---- WdAlert ---- */


const _hoisted_1 = { class: "wd-alert__body" }
const _hoisted_2 = {
  key: 0,
  class: "wd-alert__title"
}
const _hoisted_3 = {
  key: 1,
  class: "wd-alert__desc"
}


export const WdAlert = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdAlert' },
  __name: 'WdAlert',
  props: {
    variant: { type: String, required: false, default: 'info' },
    title: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' },
    closable: { type: Boolean, required: false, default: false }
  },
  emits: ["close"],
  setup(__props: any, { emit: __emit }) {





const emit = __emit

const visible = ref(true)

function close() {
  visible.value = false
  emit('close')
}

return (_ctx: any,_cache: any) => {
  return (visible.value)
    ? (_openBlock(), _createElementBlock("div", {
        key: 0,
        class: _normalizeClass(["wd-alert", `wd-alert--${__props.variant}`]),
        role: "alert"
      }, [
        _createElementVNode("span", {
          class: _normalizeClass(["wd-alert__icon wd-dot wd-dot--lg", `wd-dot--${__props.variant}`])
        }, null, 2 /* CLASS */),
        _createElementVNode("div", _hoisted_1, [
          (__props.title)
            ? (_openBlock(), _createElementBlock("div", _hoisted_2, _toDisplayString(__props.title), 1 /* TEXT */))
            : _createCommentVNode("v-if", true),
          (__props.description || _ctx.$slots.default)
            ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
                _renderSlot(_ctx.$slots, "default", {}, () => [
                  _createTextVNode(_toDisplayString(__props.description), 1 /* TEXT */)
                ])
              ]))
            : _createCommentVNode("v-if", true)
        ]),
        (__props.closable)
          ? (_openBlock(), _createElementBlock("button", {
              key: 0,
              type: "button",
              class: "wd-alert__close",
              "aria-label": "关闭",
              onClick: close
            }, [...(_cache[0] || (_cache[0] = [
              _createElementVNode("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.6",
                "stroke-linecap": "round"
              }, [
                _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
              ], -1 /* CACHED */)
            ]))]))
          : _createCommentVNode("v-if", true)
      ], 2 /* CLASS */))
    : _createCommentVNode("v-if", true)
}
}

})

/* ---- WdAvatar ---- */



export const WdAvatar = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdAvatar' },
  __name: 'WdAvatar',
  props: {
    name: { type: String, required: false, default: '' },
    tone: { type: Number, required: false, default: 0 },
    dark: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: 'md' }
  },
  setup(__props: any) {



const props = __props

const label = computed(() => {
  const n = props.name.trim()
  if (!n) return '?'
  if (n.startsWith('+')) return n
  return n.charAt(0)
})

const resolvedTone = computed(() => {
  if (props.tone) return props.tone
  if (!props.name) return 0
  let hash = 0
  for (const ch of props.name) hash = (hash * 31 + ch.charCodeAt(0)) % 3
  return (hash + 1) as 1 | 2 | 3
})

const classes = computed(() => [
  'wd-avatar',
  resolvedTone.value ? `wd-avatar--tone-${resolvedTone.value}` : '',
  props.dark ? 'wd-avatar--dark' : '',
  props.size === 'sm' ? 'wd-avatar--sm' : '',
])

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(classes.value)
  }, _toDisplayString(label.value), 3 /* TEXT, CLASS */))
}
}

})

/* ---- WdAvatarGroup ---- */


const _hoisted_1 = { class: "wd-avatars" }


import WdAvatar from './WdAvatar.vue'


export const WdAvatarGroup = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdAvatarGroup' },
  __name: 'WdAvatarGroup',
  props: {
    names: { type: Array, required: false, default: () => [] },
    max: { type: Number, required: false, default: 3 }
  },
  setup(__props: any) {



const props = __props

const shown = computed(() => props.names.slice(0, props.max))
const rest = computed(() => Math.max(0, props.names.length - props.max))

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(shown.value, (name, index) => {
      return (_openBlock(), _createBlock(WdAvatar, {
        key: index,
        name: name
      }, null, 8 /* PROPS */, ["name"]))
    }), 128 /* KEYED_FRAGMENT */)),
    (rest.value)
      ? (_openBlock(), _createBlock(WdAvatar, {
          key: 0,
          name: `+${rest.value}`,
          dark: ""
        }, null, 8 /* PROPS */, ["name"]))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})

/* ---- WdBadge ---- */


const _hoisted_1 = {
  key: 0,
  class: "wd-badge__dot"
}
const _hoisted_2 = {
  key: 1,
  class: "wd-badge__count"
}


export const WdBadge = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdBadge' },
  __name: 'WdBadge',
  props: {
    value: { type: [Number, String], required: false, default: '' },
    dot: { type: Boolean, required: false, default: false },
    max: { type: Number, required: false, default: 99 },
    tone: { type: String, required: false, default: 'red' }
  },
  setup(__props: any) {



const props = __props

const display = computed(() => {
  if (typeof props.value === 'number' && props.max && props.value > props.max) {
    return `${props.max}+`
  }
  return props.value
})

const showCount = computed(
  () => !props.dot && props.value !== '' && props.value !== undefined && props.value !== null,
)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(["wd-badge", __props.tone === 'gray' ? 'wd-badge--gray' : ''])
  }, [
    _renderSlot(_ctx.$slots, "default"),
    (__props.dot)
      ? (_openBlock(), _createElementBlock("span", _hoisted_1))
      : (showCount.value)
        ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(display.value), 1 /* TEXT */))
        : _createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

})

/* ---- WdBreadcrumb ---- */


const _hoisted_1 = {
  class: "wd-breadcrumb",
  "aria-label": "面包屑"
}
const _hoisted_2 = {
  key: 0,
  class: "wd-breadcrumb__sep"
}
const _hoisted_3 = ["onClick"]

export interface WdBreadcrumbItem {
  label: string
  value?: string | number
}


export const WdBreadcrumb = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdBreadcrumb' },
  __name: 'WdBreadcrumb',
  props: {
    items: { type: Array, required: false, default: () => [] },
    separator: { type: String, required: false, default: '/' }
  },
  emits: ["select"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

function pick(item: WdBreadcrumbItem, index: number) {
  if (index === props.items.length - 1) return
  emit('select', item.value ?? index, index)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("nav", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.items, (item, i) => {
      return (_openBlock(), _createElementBlock(_Fragment, { key: i }, [
        (i > 0)
          ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(__props.separator), 1 /* TEXT */))
          : _createCommentVNode("v-if", true),
        _createElementVNode("button", {
          type: "button",
          class: _normalizeClass(["wd-breadcrumb__item", { 'wd-breadcrumb__item--current': i === props.items.length - 1 }]),
          onClick: ($event: any) => (pick(item, i))
        }, _toDisplayString(item.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_3)
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})

/* ---- WdButton ---- */


const _hoisted_1 = ["disabled"]


export const WdButton = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdButton' },
  __name: 'WdButton',
  props: {
    variant: { type: String, required: false, default: 'primary' },
    size: { type: String, required: false, default: 'md' },
    disabled: { type: Boolean, required: false, default: false },
    iconOnly: { type: Boolean, required: false, default: false },
    block: { type: Boolean, required: false, default: false }
  },
  emits: ["click"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const classes = computed(() => [
  'wd-btn',
  `wd-btn--${props.variant}`,
  `wd-btn--${props.size}`,
  {
    'wd-btn--icon': props.iconOnly,
    'wd-btn--block': props.block,
  },
])

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("button", {
    "data-wd-hover": "",
    class: _normalizeClass(classes.value),
    type: "button",
    disabled: __props.disabled,
    onClick: _cache[0] || (_cache[0] = ($event: any) => (emit('click', $event)))
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

})

/* ---- WdCard ---- */



export const WdCard = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdCard' },
  __name: 'WdCard',
  props: {
    variant: { type: String, required: false, default: 'default' },
    padding: { type: String, required: false, default: 'md' },
    hoverable: { type: Boolean, required: false, default: false }
  },
  setup(__props: any) {



const props = __props

const classes = computed(() => [
  'wd-card',
  props.variant !== 'default' ? `wd-card--${props.variant}` : '',
  props.padding !== 'md' ? `wd-card--pad-${props.padding}` : '',
  props.hoverable ? 'wd-card--hoverable' : '',
])

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(classes.value),
    "data-wd-hover": ""
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}
}

})

/* ---- WdCarousel ---- */


const _hoisted_1 = ["src", "alt"]
const _hoisted_2 = {
  key: 1,
  class: "wd-carousel__label"
}
const _hoisted_3 = {
  key: 2,
  class: "wd-carousel__dots"
}
const _hoisted_4 = ["aria-label", "onClick"]


export interface WdCarouselItem {
  label?: string
  src?: string
  alt?: string
}


export const WdCarousel = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdCarousel' },
  __name: 'WdCarousel',
  props: {
    items: { type: Array, required: false, default: () => [] },
    height: { type: Number, required: false, default: 260 },
    autoplay: { type: Number, required: false, default: 0 },
    showDots: { type: Boolean, required: false, default: true },
    showArrows: { type: Boolean, required: false, default: true }
  },
  setup(__props: any) {



const props = __props

const PALETTE = ['var(--wd-tint-2)', 'var(--wd-success-soft)', 'var(--wd-warning-soft)', 'var(--wd-field)']

const index = ref(0)
const trackStyle = computed(() => ({ transform: `translateX(-${index.value * 100}%)` }))

function go(i: number) {
  const n = props.items.length
  if (!n) return
  index.value = ((i % n) + n) % n
}

let timer: number | null = null
function start() {
  stop()
  if (props.autoplay > 0 && props.items.length > 1) {
    timer = window.setInterval(() => go(index.value + 1), props.autoplay)
  }
}
function stop() {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
}
onMounted(start)
onBeforeUnmount(stop)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: "wd-carousel",
    style: _normalizeStyle({ height: __props.height + 'px' }),
    onMouseenter: stop,
    onMouseleave: start
  }, [
    _createElementVNode("div", {
      class: "wd-carousel__track",
      style: _normalizeStyle(trackStyle.value)
    }, [
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (it, i) => {
        return (_openBlock(), _createElementBlock("div", {
          key: i,
          class: "wd-carousel__slide",
          style: _normalizeStyle({ background: PALETTE[i % PALETTE.length] })
        }, [
          _renderSlot(_ctx.$slots, "item", {
            item: it,
            index: i
          }, () => [
            (it.src)
              ? (_openBlock(), _createElementBlock("img", {
                  key: 0,
                  src: it.src,
                  alt: it.alt || '',
                  class: "wd-carousel__img"
                }, null, 8 /* PROPS */, _hoisted_1))
              : (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(it.label || `Slide ${i + 1}`), 1 /* TEXT */))
          ])
        ], 4 /* STYLE */))
      }), 128 /* KEYED_FRAGMENT */))
    ], 4 /* STYLE */),
    (__props.showArrows && __props.items.length > 1)
      ? (_openBlock(), _createElementBlock("button", {
          key: 0,
          type: "button",
          class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--prev",
          "aria-label": "上一张",
          onClick: _cache[0] || (_cache[0] = ($event: any) => (go(index.value - 1)))
        }, [...(_cache[2] || (_cache[2] = [
          _createElementVNode("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.6",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            _createElementVNode("path", { d: "m15 18-6-6 6-6" })
          ], -1 /* CACHED */)
        ]))]))
      : _createCommentVNode("v-if", true),
    (__props.showArrows && __props.items.length > 1)
      ? (_openBlock(), _createElementBlock("button", {
          key: 1,
          type: "button",
          class: "wd-icon-btn wd-carousel__arrow wd-carousel__arrow--next",
          "aria-label": "下一张",
          onClick: _cache[1] || (_cache[1] = ($event: any) => (go(index.value + 1)))
        }, [...(_cache[3] || (_cache[3] = [
          _createElementVNode("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.6",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [
            _createElementVNode("path", { d: "m9 6 6 6-6 6" })
          ], -1 /* CACHED */)
        ]))]))
      : _createCommentVNode("v-if", true),
    (__props.showDots && __props.items.length > 1)
      ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (_, i) => {
            return (_openBlock(), _createElementBlock("button", {
              key: i,
              type: "button",
              class: _normalizeClass(["wd-carousel__dot", { 'wd-carousel__dot--active': i === index.value }]),
              "aria-label": `第 ${i + 1} 张`,
              onClick: ($event: any) => (go(i))
            }, null, 10 /* CLASS, PROPS */, _hoisted_4))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : _createCommentVNode("v-if", true)
  ], 36 /* STYLE, NEED_HYDRATION */))
}
}

})

/* ---- WdCheckbox ---- */


const _hoisted_1 = ["aria-checked", "disabled"]
const _hoisted_2 = {
  key: 0,
  class: "wd-checkbox__label"
}


export const WdCheckbox = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdCheckbox' },
  __name: 'WdCheckbox',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    label: { type: String, required: false, default: '' },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("button", {
    type: "button",
    role: "checkbox",
    class: _normalizeClass(["wd-checkbox", { 'wd-checkbox--checked': __props.modelValue, 'wd-checkbox--disabled': __props.disabled }]),
    "aria-checked": __props.modelValue,
    disabled: __props.disabled,
    onClick: toggle
  }, [
    _cache[0] || (_cache[0] = _createElementVNode("span", { class: "wd-checkbox__box" }, [
      _createElementVNode("svg", {
        width: "13",
        height: "13",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "3.4",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, [
        _createElementVNode("path", { d: "m4.5 12.5 5 5 10-11" })
      ])
    ], -1 /* CACHED */)),
    (__props.label || _ctx.$slots.default)
      ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
          _renderSlot(_ctx.$slots, "default", {}, () => [
            _createTextVNode(_toDisplayString(__props.label), 1 /* TEXT */)
          ])
        ]))
      : _createCommentVNode("v-if", true)
  ], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

})

/* ---- WdCollapse ---- */


const _hoisted_1 = { class: "wd-collapse" }
const _hoisted_2 = ["aria-expanded", "onClick"]
const _hoisted_3 = { class: "wd-collapse__body" }
const _hoisted_4 = { class: "wd-collapse__inner" }
const _hoisted_5 = { class: "wd-collapse__content" }


export interface WdCollapseItem {
  title: string
  content?: string
}


export const WdCollapse = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdCollapse' },
  __name: 'WdCollapse',
  props: {
    modelValue: { type: Array, required: false, default: () => [] },
    items: { type: Array, required: false, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const openSet = computed(() => new Set(props.modelValue))

function toggle(i: number) {
  const next = new Set(props.modelValue)
  if (next.has(i)) next.delete(i)
  else next.add(i)
  emit('update:modelValue', [...next].sort((a, b) => a - b))
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.items, (item, i) => {
      return (_openBlock(), _createElementBlock("div", {
        key: i,
        class: _normalizeClass(["wd-collapse__item", { 'wd-collapse__item--open': openSet.value.has(i) }])
      }, [
        _createElementVNode("button", {
          type: "button",
          class: "wd-collapse__head",
          "aria-expanded": openSet.value.has(i),
          onClick: ($event: any) => (toggle(i))
        }, [
          _createElementVNode("span", null, _toDisplayString(item.title), 1 /* TEXT */),
          (_openBlock(), _createElementBlock("svg", {
            class: _normalizeClass(["wd-chevron", { 'wd-chevron--open': openSet.value.has(i) }]),
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.4",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, [...(_cache[0] || (_cache[0] = [
            _createElementVNode("path", { d: "m6 9 6 6 6-6" }, null, -1 /* CACHED */)
          ]))], 2 /* CLASS */))
        ], 8 /* PROPS */, _hoisted_2),
        _createElementVNode("div", _hoisted_3, [
          _createElementVNode("div", _hoisted_4, [
            _createElementVNode("div", _hoisted_5, [
              _renderSlot(_ctx.$slots, `item-${i}`, { item: item }, () => [
                _createTextVNode(_toDisplayString(item.content), 1 /* TEXT */)
              ])
            ])
          ])
        ])
      ], 2 /* CLASS */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})

/* ---- WdContainer ---- */


export const WdContainer = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdContainer' },
  __name: 'WdContainer',
  props: {
    maxWidth: { type: String, required: false, default: '1200px' },
    pad: { type: String, required: false, default: 'md' }
  },
  setup(__props: any) {



const props = __props

// 水平 / 垂直内间距按档位成对给出。
// 只设 padding-inline 会让内容在容器里上下贴边（演示页曾因此上下内边距为 0）。
const PAD_X = { sm: 'var(--wd-space-3)', md: 'var(--wd-space-4)', lg: 'var(--wd-space-6)' }
const PAD_Y = { sm: 'var(--wd-space-3)', md: 'var(--wd-space-4)', lg: 'var(--wd-space-6)' }

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: "wd-container",
    style: _normalizeStyle({
      maxWidth: __props.maxWidth,
      paddingInline: PAD_X[props.pad],
      paddingBlock: PAD_Y[props.pad],
    })
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 4 /* STYLE */))
}
}

})

/* ---- WdDatePicker ---- */


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


// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。

export const WdDatePicker = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdDatePicker' },
  __name: 'WdDatePicker',
  props: {
    modelValue: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '选择日期' },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {

const POP_DURATION = { enter: 200, leave: 140 }




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
      duration: POP_DURATION
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
    })
  ], 2 /* CLASS */))
}
}

})

/* ---- WdDrawer ---- */


const _hoisted_1 = { class: "wd-drawer__panel" }
const _hoisted_2 = { class: "wd-drawer__head" }
const _hoisted_3 = { class: "wd-drawer__title" }
const _hoisted_4 = { class: "wd-drawer__body" }
const _hoisted_5 = {
  key: 0,
  class: "wd-drawer__foot"
}


export const WdDrawer = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdDrawer' },
  __name: 'WdDrawer',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: '' },
    side: { type: String, required: false, default: 'right' },
    closeOnMask: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const classes = computed(() => ['wd-drawer', props.side === 'left' ? 'wd-drawer--left' : ''])

function close() {
  emit('update:modelValue', false)
}

watchEffect((onCleanup) => {
  if (!props.modelValue) return
  const fn = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }
  document.addEventListener('keydown', fn)
  onCleanup(() => document.removeEventListener('keydown', fn))
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createVNode(_Transition, { name: "wd-drawer-fade" }, {
      default: _withCtx(() => [
        (__props.modelValue)
          ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              class: _normalizeClass(classes.value),
              role: "dialog",
              "aria-modal": "true"
            }, [
              _createElementVNode("div", {
                class: "wd-drawer__mask",
                onClick: _cache[0] || (_cache[0] = ($event: any) => (__props.closeOnMask && close()))
              }),
              _createElementVNode("div", _hoisted_1, [
                _createElementVNode("div", _hoisted_2, [
                  _createElementVNode("div", _hoisted_3, _toDisplayString(__props.title), 1 /* TEXT */),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn",
                    "aria-label": "关闭",
                    onClick: close
                  }, [...(_cache[1] || (_cache[1] = [
                    _createElementVNode("svg", {
                      width: "15",
                      height: "15",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round"
                    }, [
                      _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                    ], -1 /* CACHED */)
                  ]))])
                ]),
                _createElementVNode("div", _hoisted_4, [
                  _renderSlot(_ctx.$slots, "default")
                ]),
                (_ctx.$slots.footer)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
                      _renderSlot(_ctx.$slots, "footer")
                    ]))
                  : _createCommentVNode("v-if", true)
              ])
            ], 2 /* CLASS */))
          : _createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    })
  ]))
}
}

})

/* ---- WdDropdown ---- */


const _hoisted_1 = ["aria-expanded"]
const _hoisted_2 = {
  key: 0,
  class: "wd-dropdown__menu",
  role: "menu"
}
const _hoisted_3 = ["onClick"]


// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。
export interface WdDropdownItem {
  label: string
  value: string | number
  danger?: boolean
  disabled?: boolean
}


export const WdDropdown = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdDropdown' },
  __name: 'WdDropdown',
  props: {
    items: { type: Array, required: false, default: () => [] }
  },
  emits: ["select"],
  setup(__props: any, { emit: __emit }) {

const POP_DURATION = { enter: 200, leave: 140 }




const props = __props

const emit = __emit

const open = ref(false)
const root = ref<HTMLElement>()

function pick(item: WdDropdownItem) {
  if (item.disabled) return
  emit('select', item.value)
  open.value = false
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
  return (_openBlock(), _createElementBlock("span", {
    ref_key: "root",
    ref: root,
    class: "wd-dropdown"
  }, [
    _createElementVNode("span", {
      class: "wd-dropdown__trigger",
      role: "button",
      tabindex: "0",
      "aria-haspopup": true,
      "aria-expanded": open.value,
      onKeydown: [
        _cache[0] || (_cache[0] = _withKeys(_withModifiers(($event: any) => (open.value = !open.value), ["prevent"]), ["enter"])),
        _cache[1] || (_cache[1] = _withKeys(_withModifiers(($event: any) => (open.value = !open.value), ["prevent"]), ["space"]))
      ],
      onClick: _cache[2] || (_cache[2] = ($event: any) => (open.value = !open.value))
    }, [
      _renderSlot(_ctx.$slots, "default")
    ], 40 /* PROPS, NEED_HYDRATION */, _hoisted_1),
    _createVNode(_Transition, {
      name: "wd-pop",
      duration: POP_DURATION
    }, {
      default: _withCtx(() => [
        (open.value)
          ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.items, (it) => {
                return (_openBlock(), _createElementBlock("button", {
                  key: it.value,
                  type: "button",
                  role: "menuitem",
                  class: _normalizeClass(["wd-dropdown__item", { 'wd-dropdown__item--danger': it.danger, 'wd-dropdown__item--disabled': it.disabled }]),
                  "data-wd-hover": "",
                  onClick: ($event: any) => (pick(it))
                }, _toDisplayString(it.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_3))
              }), 128 /* KEYED_FRAGMENT */))
            ]))
          : _createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    })
  ], 512 /* NEED_PATCH */))
}
}

})

/* ---- WdEmpty ---- */


const _hoisted_1 = { class: "wd-empty" }
const _hoisted_2 = { class: "wd-empty__icon" }
const _hoisted_3 = {
  key: 0,
  class: "wd-empty__title"
}
const _hoisted_4 = {
  key: 1,
  class: "wd-empty__desc"
}
const _hoisted_5 = {
  key: 2,
  class: "wd-empty__action"
}


export const WdEmpty = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdEmpty' },
  __name: 'WdEmpty',
  props: {
    title: { type: String, required: false, default: '暂无数据' },
    description: { type: String, required: false, default: '' }
  },
  setup(__props: any) {





return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      _renderSlot(_ctx.$slots, "icon", {}, () => [
        _cache[0] || (_cache[0] = _createElementVNode("svg", {
          width: "30",
          height: "30",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.7",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          _createElementVNode("path", { d: "M22 12h-6l-2 3h-4l-2-3H2" }),
          _createElementVNode("path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" })
        ], -1 /* CACHED */))
      ])
    ]),
    (__props.title)
      ? (_openBlock(), _createElementBlock("div", _hoisted_3, _toDisplayString(__props.title), 1 /* TEXT */))
      : _createCommentVNode("v-if", true),
    (__props.description || _ctx.$slots.description)
      ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
          _renderSlot(_ctx.$slots, "description", {}, () => [
            _createTextVNode(_toDisplayString(__props.description), 1 /* TEXT */)
          ])
        ]))
      : _createCommentVNode("v-if", true),
    (_ctx.$slots.action)
      ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
          _renderSlot(_ctx.$slots, "action")
        ]))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})

/* ---- WdExplorer ---- */


const _hoisted_1 = { class: "wd-explorer" }
const _hoisted_2 = { class: "wd-explorer__side" }
const _hoisted_3 = ["onClick"]
const _hoisted_4 = { class: "wd-explorer__folder-name" }
const _hoisted_5 = { class: "wd-explorer__count" }
const _hoisted_6 = { class: "wd-explorer__main" }
const _hoisted_7 = { class: "wd-explorer__bar" }
const _hoisted_8 = { class: "wd-explorer__path" }
const _hoisted_9 = { class: "wd-explorer__crumb wd-explorer__crumb--cur" }
const _hoisted_10 = { class: "wd-explorer__views" }
const _hoisted_11 = {
  key: 0,
  class: "wd-explorer__table"
}
const _hoisted_12 = ["onClick"]
const _hoisted_13 = { class: "wd-explorer__name" }
const _hoisted_14 = { class: "wd-explorer__file-name" }
const _hoisted_15 = { class: "is-num" }
const _hoisted_16 = { class: "is-num" }
const _hoisted_17 = {
  key: 1,
  class: "wd-explorer__grid"
}
const _hoisted_18 = ["onClick"]
const _hoisted_19 = { class: "wd-explorer__tile-name" }
const _hoisted_20 = { class: "wd-explorer__tile-size" }
const _hoisted_21 = {
  key: 2,
  class: "wd-explorer__empty"
}


export interface WdExplorerFile {
  name: string
  size?: number
  modified?: string
}
export interface WdExplorerFolder {
  name: string
  files: WdExplorerFile[]
}


export const WdExplorer = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdExplorer' },
  __name: 'WdExplorer',
  props: {
    folders: { type: Array, required: false, default: () => [] },
    view: { type: String, required: false, default: 'details' }
  },
  emits: ["select"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const active = ref(0)
const mode = ref<'details' | 'icons'>(props.view)
const current = computed(() => props.folders[active.value] || { name: '', files: [] })

function fmtSize(n?: number) {
  if (!n) return '—'
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(1)} MB`
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      _cache[4] || (_cache[4] = _createElementVNode("div", { class: "wd-explorer__side-title" }, "文件夹", -1 /* CACHED */)),
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.folders, (f, i) => {
        return (_openBlock(), _createElementBlock("button", {
          key: i,
          type: "button",
          class: _normalizeClass(["wd-explorer__folder", { 'wd-explorer__folder--active': i === active.value }]),
          onClick: ($event: any) => (active.value = i)
        }, [
          _cache[3] || (_cache[3] = _createElementVNode("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "currentColor"
          }, [
            _createElementVNode("path", { d: "M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" })
          ], -1 /* CACHED */)),
          _createElementVNode("span", _hoisted_4, _toDisplayString(f.name), 1 /* TEXT */),
          _createElementVNode("span", _hoisted_5, _toDisplayString(f.files.length), 1 /* TEXT */)
        ], 10 /* CLASS, PROPS */, _hoisted_3))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    _createElementVNode("div", _hoisted_6, [
      _createElementVNode("div", _hoisted_7, [
        _createElementVNode("div", _hoisted_8, [
          _createElementVNode("span", {
            class: "wd-explorer__crumb",
            onClick: _cache[0] || (_cache[0] = ($event: any) => (active.value = 0))
          }, "全部文件"),
          _cache[5] || (_cache[5] = _createElementVNode("span", { class: "wd-explorer__sep" }, "/", -1 /* CACHED */)),
          _createElementVNode("span", _hoisted_9, _toDisplayString(current.value.name), 1 /* TEXT */)
        ]),
        _createElementVNode("div", _hoisted_10, [
          _createElementVNode("button", {
            type: "button",
            class: _normalizeClass(["wd-explorer__view-btn", { 'wd-explorer__view-btn--active': mode.value === 'details' }]),
            title: "详情",
            onClick: _cache[1] || (_cache[1] = ($event: any) => (mode.value = 'details'))
          }, [...(_cache[6] || (_cache[6] = [
            _createElementVNode("svg", {
              width: "15",
              height: "15",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.2",
              "stroke-linecap": "round"
            }, [
              _createElementVNode("path", { d: "M4 6h16M4 12h16M4 18h16" })
            ], -1 /* CACHED */)
          ]))], 2 /* CLASS */),
          _createElementVNode("button", {
            type: "button",
            class: _normalizeClass(["wd-explorer__view-btn", { 'wd-explorer__view-btn--active': mode.value === 'icons' }]),
            title: "图标",
            onClick: _cache[2] || (_cache[2] = ($event: any) => (mode.value = 'icons'))
          }, [...(_cache[7] || (_cache[7] = [
            _createStaticVNode("<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"6.5\" height=\"6.5\" rx=\"2\"></rect><rect x=\"13.5\" y=\"4\" width=\"6.5\" height=\"6.5\" rx=\"2\"></rect><rect x=\"4\" y=\"13.5\" width=\"6.5\" height=\"6.5\" rx=\"2\"></rect><rect x=\"13.5\" y=\"13.5\" width=\"6.5\" height=\"6.5\" rx=\"2\"></rect></svg>", 1)
          ]))], 2 /* CLASS */)
        ])
      ]),
      (mode.value === 'details')
        ? (_openBlock(), _createElementBlock("table", _hoisted_11, [
            _cache[9] || (_cache[9] = _createElementVNode("colgroup", null, [
              _createElementVNode("col"),
              _createElementVNode("col", { style: {"width":"96px"} }),
              _createElementVNode("col", { style: {"width":"118px"} })
            ], -1 /* CACHED */)),
            _cache[10] || (_cache[10] = _createElementVNode("thead", null, [
              _createElementVNode("tr", null, [
                _createElementVNode("th", null, "名称"),
                _createElementVNode("th", { class: "is-num" }, "大小"),
                _createElementVNode("th", { class: "is-num" }, "修改时间")
              ])
            ], -1 /* CACHED */)),
            _createElementVNode("tbody", null, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(current.value.files, (f, i) => {
                return (_openBlock(), _createElementBlock("tr", {
                  key: i,
                  onClick: ($event: any) => (emit('select', f))
                }, [
                  _createElementVNode("td", null, [
                    _createElementVNode("span", _hoisted_13, [
                      _cache[8] || (_cache[8] = _createElementVNode("span", { class: "wd-explorer__file-chip" }, [
                        _createElementVNode("svg", {
                          width: "15",
                          height: "15",
                          viewBox: "0 0 24 24",
                          fill: "currentColor"
                        }, [
                          _createElementVNode("path", { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" })
                        ])
                      ], -1 /* CACHED */)),
                      _createElementVNode("span", _hoisted_14, _toDisplayString(f.name), 1 /* TEXT */)
                    ])
                  ]),
                  _createElementVNode("td", _hoisted_15, _toDisplayString(fmtSize(f.size)), 1 /* TEXT */),
                  _createElementVNode("td", _hoisted_16, _toDisplayString(f.modified || '—'), 1 /* TEXT */)
                ], 8 /* PROPS */, _hoisted_12))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ]))
        : (_openBlock(), _createElementBlock("div", _hoisted_17, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(current.value.files, (f, i) => {
              return (_openBlock(), _createElementBlock("button", {
                key: i,
                type: "button",
                class: "wd-explorer__tile",
                onClick: ($event: any) => (emit('select', f))
              }, [
                _cache[11] || (_cache[11] = _createElementVNode("span", { class: "wd-explorer__tile-icon" }, [
                  _createElementVNode("svg", {
                    width: "22",
                    height: "22",
                    viewBox: "0 0 24 24",
                    fill: "currentColor"
                  }, [
                    _createElementVNode("path", { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" })
                  ])
                ], -1 /* CACHED */)),
                _createElementVNode("span", _hoisted_19, _toDisplayString(f.name), 1 /* TEXT */),
                _createElementVNode("span", _hoisted_20, _toDisplayString(fmtSize(f.size)), 1 /* TEXT */)
              ], 8 /* PROPS */, _hoisted_18))
            }), 128 /* KEYED_FRAGMENT */))
          ])),
      (!current.value.files.length)
        ? (_openBlock(), _createElementBlock("div", _hoisted_21, "此文件夹为空"))
        : _createCommentVNode("v-if", true)
    ])
  ]))
}
}

})

/* ---- WdFileList ---- */


const _hoisted_1 = { class: "wd-file-list" }
const _hoisted_2 = ["onClick"]
const _hoisted_3 = {
  key: 0,
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}
const _hoisted_4 = { class: "wd-file-list__icon" }
const _hoisted_5 = {
  key: 0,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}
const _hoisted_6 = {
  key: 1,
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}
const _hoisted_7 = { class: "wd-file-list__name" }
const _hoisted_8 = { class: "wd-file-list__size" }


export interface WdFileNode {
  name: string
  type?: 'file' | 'folder'
  size?: number
  children?: WdFileNode[]
}


export const WdFileList = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdFileList' },
  __name: 'WdFileList',
  props: {
    items: { type: Array, required: false, default: () => [] }
  },
  emits: ["select"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const openPaths = ref<Set<string>>(new Set())

/** 扁平化：只展开 openPaths 命中的层级（避免递归组件） */
const rows = computed(() => {
  const out: { node: WdFileNode; depth: number; path: string }[] = []
  const walk = (nodes: WdFileNode[], depth: number, base: string) => {
    nodes.forEach((n, i) => {
      const path = `${base}${i}/`
      out.push({ node: n, depth, path })
      if (n.type === 'folder' && openPaths.value.has(path)) {
        walk(n.children || [], depth + 1, path)
      }
    })
  }
  walk(props.items, 0, '')
  return out
})

function onRow(row: { node: WdFileNode; path: string }) {
  if (row.node.type === 'folder') {
    const s = new Set(openPaths.value)
    if (s.has(row.path)) s.delete(row.path)
    else s.add(row.path)
    openPaths.value = s
  } else {
    emit('select', row.node)
  }
}

function fmtSize(n?: number) {
  if (!n) return ''
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(1)} MB`
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(rows.value, (row) => {
      return (_openBlock(), _createElementBlock("div", {
        key: row.path,
        class: _normalizeClass(["wd-file-list__row", `wd-file-list__row--${row.node.type || 'file'}`]),
        style: _normalizeStyle({ paddingLeft: 12 + row.depth * 20 + 'px' }),
        onClick: ($event: any) => (onRow(row))
      }, [
        _createCommentVNode(" 箭头列始终占位：文件夹与文件的图标保持同列对齐 "),
        _createElementVNode("span", {
          class: _normalizeClass(["wd-file-list__chevron wd-chevron wd-chevron--right", { 'wd-chevron--open': openPaths.value.has(row.path) }])
        }, [
          (row.node.type === 'folder')
            ? (_openBlock(), _createElementBlock("svg", _hoisted_3, [...(_cache[0] || (_cache[0] = [
                _createElementVNode("path", { d: "m9 6 6 6-6 6" }, null, -1 /* CACHED */)
              ]))]))
            : _createCommentVNode("v-if", true)
        ], 2 /* CLASS */),
        _createElementVNode("span", _hoisted_4, [
          (row.node.type === 'folder')
            ? (_openBlock(), _createElementBlock("svg", _hoisted_5, [...(_cache[1] || (_cache[1] = [
                _createElementVNode("path", { d: "M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" }, null, -1 /* CACHED */)
              ]))]))
            : (_openBlock(), _createElementBlock("svg", _hoisted_6, [...(_cache[2] || (_cache[2] = [
                _createElementVNode("path", { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" }, null, -1 /* CACHED */)
              ]))]))
        ]),
        _createElementVNode("span", _hoisted_7, _toDisplayString(row.node.name), 1 /* TEXT */),
        _createElementVNode("span", _hoisted_8, _toDisplayString(fmtSize(row.node.size)), 1 /* TEXT */)
      ], 14 /* CLASS, STYLE, PROPS */, _hoisted_2))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})

/* ---- WdGrid ---- */



export const WdGrid = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdGrid' },
  __name: 'WdGrid',
  props: {
    columns: { type: [Number, String], required: false, default: 1 },
    gap: { type: String, required: false, default: 'md' },
    gutter: { type: Number, required: false }
  },
  setup(__props: any) {



const props = __props

const cols = computed(() => {
  if (props.columns === 'auto') return 'repeat(auto-fit, minmax(200px, 1fr))'
  return `repeat(${props.columns}, 1fr)`
})

const gapValue = computed(() => {
  if (props.gutter) `${props.gutter}px`
  const val = { sm: 8, md: 16, lg: 24 }[props.gap] || 16
  return `${val}px`
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: "wd-grid",
    style: _normalizeStyle({ gridTemplateColumns: cols.value, gap: gapValue.value })
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 4 /* STYLE */))
}
}

})

/* ---- WdImagePreview ---- */


const _hoisted_1 = ["src", "alt"]
const _hoisted_2 = {
  key: 0,
  class: "wd-preview"
}
const _hoisted_3 = ["src", "alt"]
const _hoisted_4 = {
  key: 0,
  class: "wd-preview__count"
}
const _hoisted_5 = { class: "wd-preview__toolbar" }


export const WdImagePreview = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdImagePreview' },
  __name: 'WdImagePreview',
  props: {
    src: { type: String, required: false, default: '' },
    list: { type: Array, required: false, default: () => [] },
    alt: { type: String, required: false, default: '' },
    index: { type: Number, required: false, default: 0 }
  },
  setup(__props: any) {



const props = __props

const open = ref(false)
const cur = ref(props.index)
const scale = ref(1)
const rotate = ref(0)

const images = computed(() => (props.list.length ? props.list : props.src ? [props.src] : []))

watch(
  () => props.index,
  (v) => {
    cur.value = v
  },
)

function view(i: number) {
  const n = images.value.length
  if (!n) return
  cur.value = ((i % n) + n) % n
  scale.value = 1
  rotate.value = 0
}
function zoom(d: number) {
  scale.value = Math.min(4, Math.max(0.4, Math.round((scale.value + d) * 100) / 100))
}
function resetView() {
  scale.value = 1
  rotate.value = 0
}
function openPreview() {
  if (!images.value.length) return
  resetView()
  open.value = true
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("span", {
      class: "wd-image-preview",
      onClick: openPreview
    }, [
      _renderSlot(_ctx.$slots, "default", {}, () => [
        (__props.src || __props.list.length)
          ? (_openBlock(), _createElementBlock("img", {
              key: 0,
              src: __props.src || images.value[0],
              alt: __props.alt,
              class: "wd-image-preview__thumb"
            }, null, 8 /* PROPS */, _hoisted_1))
          : _createCommentVNode("v-if", true)
      ])
    ]),
    (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
      _createVNode(_Transition, { name: "wd-preview-fade" }, {
        default: _withCtx(() => [
          (open.value)
            ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
                _createElementVNode("div", {
                  class: "wd-preview__mask",
                  onClick: _cache[0] || (_cache[0] = ($event: any) => (open.value = false))
                }),
                _createElementVNode("div", {
                  class: "wd-preview__stage",
                  onWheel: _cache[1] || (_cache[1] = _withModifiers(($event: any) => (zoom(($event as WheelEvent).deltaY > 0 ? -0.15 : 0.15)), ["prevent"]))
                }, [
                  _createElementVNode("img", {
                    class: "wd-preview__img",
                    src: images.value[cur.value],
                    alt: __props.alt,
                    style: _normalizeStyle({ transform: `scale(${scale.value}) rotate(${rotate.value}deg)` })
                  }, null, 12 /* STYLE, PROPS */, _hoisted_3)
                ], 32 /* NEED_HYDRATION */),
                (images.value.length > 1)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_4, _toDisplayString(cur.value + 1) + " / " + _toDisplayString(images.value.length), 1 /* TEXT */))
                  : _createCommentVNode("v-if", true),
                _createElementVNode("div", _hoisted_5, [
                  (images.value.length > 1)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "上一张",
                        onClick: _cache[2] || (_cache[2] = ($event: any) => (view(cur.value - 1)))
                      }, "‹"))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "旋转",
                    onClick: _cache[3] || (_cache[3] = ($event: any) => (rotate.value = (rotate.value + 90) % 360))
                  }, "↻"),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "缩小",
                    onClick: _cache[4] || (_cache[4] = ($event: any) => (zoom(-0.25)))
                  }, "−"),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "放大",
                    onClick: _cache[5] || (_cache[5] = ($event: any) => (zoom(0.25)))
                  }, "＋"),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "还原",
                    onClick: resetView
                  }, "1:1"),
                  (images.value.length > 1)
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        type: "button",
                        class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                        "aria-label": "下一张",
                        onClick: _cache[6] || (_cache[6] = ($event: any) => (view(cur.value + 1)))
                      }, "›"))
                    : _createCommentVNode("v-if", true),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn wd-icon-btn--ghost wd-preview__btn",
                    "aria-label": "关闭",
                    onClick: _cache[7] || (_cache[7] = ($event: any) => (open.value = false))
                  }, [...(_cache[8] || (_cache[8] = [
                    _createElementVNode("svg", {
                      width: "13",
                      height: "13",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round"
                    }, [
                      _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                    ], -1 /* CACHED */)
                  ]))])
                ])
              ]))
            : _createCommentVNode("v-if", true)
        ]),
        _: 1 /* STABLE */
      })
    ]))
  ], 64 /* STABLE_FRAGMENT */))
}
}

})

/* ---- WdInput ---- */


const _hoisted_1 = {
  key: 0,
  class: "wd-input__icon"
}
const _hoisted_2 = ["type", "value", "placeholder", "disabled"]


export const WdInput = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdInput' },
  __name: 'WdInput',
  props: {
    modelValue: { type: String, required: false, default: '' },
    placeholder: { type: String, required: false, default: '' },
    shape: { type: String, required: false, default: 'pill' },
    type: { type: String, required: false, default: 'text' },
    disabled: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: 'md' }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {





const emit = __emit

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("label", {
    class: _normalizeClass(["wd-input", { 'wd-input--rounded': __props.shape === 'rounded', 'wd-input--lg': __props.size === 'lg', 'wd-input--sm': __props.size === 'sm' }])
  }, [
    (_ctx.$slots.icon)
      ? (_openBlock(), _createElementBlock("span", _hoisted_1, [
          _renderSlot(_ctx.$slots, "icon")
        ]))
      : _createCommentVNode("v-if", true),
    _createElementVNode("input", {
      type: __props.type,
      value: __props.modelValue,
      placeholder: __props.placeholder,
      disabled: __props.disabled,
      onInput: onInput
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_2),
    _renderSlot(_ctx.$slots, "suffix")
  ], 2 /* CLASS */))
}
}

})

/* ---- WdListItem ---- */


const _hoisted_1 = {
  key: 0,
  class: "wd-list-item__icon"
}
const _hoisted_2 = { class: "wd-list-item__title" }
const _hoisted_3 = {
  key: 1,
  class: "wd-list-item__meta"
}


export const WdListItem = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdListItem' },
  __name: 'WdListItem',
  props: {
    title: { type: String, required: false, default: '' },
    meta: { type: String, required: false, default: '' },
    clickable: { type: Boolean, required: false, default: true }
  },
  emits: ["click"],
  setup(__props: any, { emit: __emit }) {





const emit = __emit

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    "data-wd-hover": "",
    class: _normalizeClass(["wd-list-item", { 'wd-list-item--clickable': __props.clickable }]),
    onClick: _cache[0] || (_cache[0] = ($event: any) => (__props.clickable && emit('click', $event)))
  }, [
    (_ctx.$slots.icon)
      ? (_openBlock(), _createElementBlock("span", _hoisted_1, [
          _renderSlot(_ctx.$slots, "icon")
        ]))
      : _createCommentVNode("v-if", true),
    _createElementVNode("span", _hoisted_2, _toDisplayString(__props.title), 1 /* TEXT */),
    (__props.meta)
      ? (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(__props.meta), 1 /* TEXT */))
      : _createCommentVNode("v-if", true),
    _renderSlot(_ctx.$slots, "extra")
  ], 2 /* CLASS */))
}
}

})

/* ---- WdModal ---- */


const _hoisted_1 = ["aria-label"]
const _hoisted_2 = { class: "wd-modal__head" }
const _hoisted_3 = { class: "wd-modal__title" }
const _hoisted_4 = { class: "wd-modal__body" }
const _hoisted_5 = {
  key: 0,
  class: "wd-modal__foot"
}


const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * 无障碍焦点管理：
 * 打开时把焦点移入面板并记住来源，Tab 在面板内循环（焦点陷阱），
 * 关闭后归还焦点——否则键盘/读屏用户会「tab 到背后的页面」而失去上下文。
 */

export const WdModal = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdModal' },
  __name: 'WdModal',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: '' },
    width: { type: [Number, String], required: false, default: 440 },
    closeOnMask: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const panel = ref<HTMLElement | null>(null)
let lastActive: HTMLElement | null = null

const maxWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
)

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { close(); return }
  if (e.key !== 'Tab' || !panel.value) return
  const nodes = Array.from(panel.value.querySelectorAll<HTMLElement>(FOCUSABLE))
  if (!nodes.length) return
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (e.shiftKey && (active === first || !panel.value.contains(active))) {
    e.preventDefault(); last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault(); first.focus()
  }
}

watchEffect((onCleanup) => {
  if (!props.modelValue) return
  lastActive = document.activeElement as HTMLElement | null
  document.addEventListener('keydown', onKeydown)
  // 等面板渲染后聚焦首个可聚焦元素（无可聚焦元素时聚焦面板本身）
  requestAnimationFrame(() => {
    const el = panel.value
    if (!el) return
    const first = el.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? el).focus()
  })
  onCleanup(() => {
    document.removeEventListener('keydown', onKeydown)
    lastActive?.focus?.()
    lastActive = null
  })
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createVNode(_Transition, { name: "wd-modal-fade" }, {
      default: _withCtx(() => [
        (__props.modelValue)
          ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              class: "wd-modal",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": __props.title || undefined
            }, [
              _createElementVNode("div", {
                class: "wd-modal__mask",
                onClick: _cache[0] || (_cache[0] = ($event: any) => (__props.closeOnMask && close()))
              }),
              _createElementVNode("div", {
                ref_key: "panel",
                ref: panel,
                class: "wd-modal__panel",
                tabindex: "-1",
                style: _normalizeStyle({ maxWidth: maxWidth.value })
              }, [
                _createElementVNode("div", _hoisted_2, [
                  _createElementVNode("div", _hoisted_3, _toDisplayString(__props.title), 1 /* TEXT */),
                  _createElementVNode("button", {
                    type: "button",
                    class: "wd-icon-btn",
                    "aria-label": "关闭",
                    onClick: close
                  }, [...(_cache[1] || (_cache[1] = [
                    _createElementVNode("svg", {
                      width: "15",
                      height: "15",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.6",
                      "stroke-linecap": "round"
                    }, [
                      _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                    ], -1 /* CACHED */)
                  ]))])
                ]),
                _createElementVNode("div", _hoisted_4, [
                  _renderSlot(_ctx.$slots, "default")
                ]),
                (_ctx.$slots.footer)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
                      _renderSlot(_ctx.$slots, "footer")
                    ]))
                  : _createCommentVNode("v-if", true)
              ], 4 /* STYLE */)
            ], 8 /* PROPS */, _hoisted_1))
          : _createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    })
  ]))
}
}

})

/* ---- WdNotification ---- */


const _hoisted_1 = { class: "wd-notification__body" }
const _hoisted_2 = {
  key: 0,
  class: "wd-notification__title"
}
const _hoisted_3 = {
  key: 1,
  class: "wd-notification__desc"
}


export const WdNotification = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdNotification' },
  __name: 'WdNotification',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    title: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' },
    variant: { type: String, required: false, default: 'info' }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

function close() {
  emit('update:modelValue', false)
}

watchEffect((onCleanup) => {
  if (!props.modelValue) return
  const fn = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }
  document.addEventListener('keydown', fn)
  onCleanup(() => document.removeEventListener('keydown', fn))
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
    _createVNode(_Transition, { name: "wd-notification-fade" }, {
      default: _withCtx(() => [
        (__props.modelValue)
          ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              class: _normalizeClass(["wd-notification", `wd-notification--${__props.variant}`]),
              role: "alert"
            }, [
              _createElementVNode("span", {
                class: _normalizeClass(["wd-notification__icon wd-dot wd-dot--lg", `wd-dot--${__props.variant}`])
              }, null, 2 /* CLASS */),
              _createElementVNode("div", _hoisted_1, [
                (__props.title)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_2, _toDisplayString(__props.title), 1 /* TEXT */))
                  : _createCommentVNode("v-if", true),
                (__props.description || _ctx.$slots.default)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
                      _renderSlot(_ctx.$slots, "default", {}, () => [
                        _createTextVNode(_toDisplayString(__props.description), 1 /* TEXT */)
                      ])
                    ]))
                  : _createCommentVNode("v-if", true)
              ]),
              _createElementVNode("button", {
                type: "button",
                class: "wd-icon-btn wd-icon-btn--ghost wd-icon-btn--sm",
                "aria-label": "关闭",
                onClick: close
              }, [...(_cache[0] || (_cache[0] = [
                _createElementVNode("svg", {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.6",
                  "stroke-linecap": "round"
                }, [
                  _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                ], -1 /* CACHED */)
              ]))])
            ], 2 /* CLASS */))
          : _createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    })
  ]))
}
}

})

/* ---- WdOtp ---- */


const _hoisted_1 = ["value", "disabled", "onInput", "onKeydown"]


export const WdOtp = /*@__PURE__*/_defineComponent({
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

/* ---- WdPagination ---- */


const _hoisted_1 = {
  class: "wd-pagination",
  "aria-label": "分页"
}
const _hoisted_2 = ["disabled"]
const _hoisted_3 = {
  key: 0,
  class: "wd-pagination__dots"
}
const _hoisted_4 = ["onClick"]
const _hoisted_5 = ["disabled"]


export const WdPagination = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdPagination' },
  __name: 'WdPagination',
  props: {
    modelValue: { type: Number, required: false, default: 1 },
    total: { type: Number, required: false, default: 0 },
    pageSize: { type: Number, required: false, default: 10 }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const range = computed<(number | '...')[]>(() => {
  const n = pageCount.value
  const cur = props.modelValue
  if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  const left = Math.max(2, cur - 1)
  const right = Math.min(n - 1, cur + 1)
  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < n - 1) pages.push('...')
  pages.push(n)
  return pages
})

function go(p: number) {
  const v = Math.min(Math.max(1, p), pageCount.value)
  if (v !== props.modelValue) emit('update:modelValue', v)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("nav", _hoisted_1, [
    _createElementVNode("button", {
      type: "button",
      class: "wd-pagination__btn",
      "data-wd-hover": "",
      disabled: __props.modelValue <= 1,
      "aria-label": "上一页",
      onClick: _cache[0] || (_cache[0] = ($event: any) => (go(__props.modelValue - 1)))
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
        _createElementVNode("path", { d: "m15 18-6-6 6-6" })
      ], -1 /* CACHED */)
    ]))], 8 /* PROPS */, _hoisted_2),
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(range.value, (p, i) => {
      return (_openBlock(), _createElementBlock(_Fragment, { key: i }, [
        (p === '...')
          ? (_openBlock(), _createElementBlock("span", _hoisted_3, "…"))
          : (_openBlock(), _createElementBlock("button", {
              key: 1,
              type: "button",
              class: _normalizeClass(["wd-pagination__btn", { 'wd-pagination__btn--active': p === __props.modelValue }]),
              onClick: ($event: any) => (go(p as number))
            }, _toDisplayString(p), 11 /* TEXT, CLASS, PROPS */, _hoisted_4))
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */)),
    _createElementVNode("button", {
      type: "button",
      class: "wd-pagination__btn",
      disabled: __props.modelValue >= pageCount.value,
      "aria-label": "下一页",
      onClick: _cache[1] || (_cache[1] = ($event: any) => (go(__props.modelValue + 1)))
    }, [...(_cache[3] || (_cache[3] = [
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
    ]))], 8 /* PROPS */, _hoisted_5)
  ]))
}
}

})

/* ---- WdPostItem ---- */


const _hoisted_1 = { class: "wd-post-item__title" }
const _hoisted_2 = {
  key: 0,
  class: "wd-post-item__emoji"
}
const _hoisted_3 = {
  key: 0,
  class: "wd-post-item__summary"
}
const _hoisted_4 = {
  key: 1,
  class: "wd-post-item__tags"
}


export const WdPostItem = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdPostItem' },
  __name: 'WdPostItem',
  props: {
    title: { type: String, required: true },
    summary: { type: String, required: false },
    tags: { type: Array, required: false, default: () => [] },
    emoji: { type: String, required: false },
    href: { type: String, required: false }
  },
  setup(__props: any) {

/**
 * WdPostItem — 文章条目
 * 反向迭代（源：w-run/blog 的文章列表项）
 * 刻意不含日期字段（便于批量导入、不暴露新旧）
 */




return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_resolveDynamicComponent(__props.href ? 'a' : 'div'), {
    href: __props.href,
    class: "wd-post-item"
  }, {
    default: _withCtx(() => [
      _createElementVNode("h3", _hoisted_1, [
        (__props.emoji)
          ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(__props.emoji), 1 /* TEXT */))
          : _createCommentVNode("v-if", true),
        _createTextVNode(_toDisplayString(__props.title), 1 /* TEXT */)
      ]),
      (__props.summary)
        ? (_openBlock(), _createElementBlock("p", _hoisted_3, _toDisplayString(__props.summary), 1 /* TEXT */))
        : _createCommentVNode("v-if", true),
      (__props.tags.length)
        ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.tags, (t) => {
              return (_openBlock(), _createElementBlock("span", {
                key: t,
                class: "wd-tag wd-tag--sm wd-tag--gray"
              }, _toDisplayString(t), 1 /* TEXT */))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : _createCommentVNode("v-if", true)
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href"]))
}
}

})

/* ---- WdProgress ---- */


const _hoisted_1 = ["aria-valuenow"]


export const WdProgress = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdProgress' },
  __name: 'WdProgress',
  props: {
    value: { type: Number, required: false, default: 0 },
    thin: { type: Boolean, required: false, default: false },
    onDark: { type: Boolean, required: false, default: false }
  },
  setup(__props: any) {



const props = __props

const percent = computed(() => Math.max(0, Math.min(100, props.value)))
const classes = computed(() => [
  'wd-progress',
  props.thin ? 'wd-progress--thin' : '',
  props.onDark ? 'wd-progress--on-dark' : '',
])

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(classes.value),
    role: "progressbar",
    "aria-valuenow": percent.value,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, [
    _createElementVNode("span", {
      class: "wd-progress__bar",
      style: _normalizeStyle({ width: percent.value + '%' })
    }, null, 4 /* STYLE */)
  ], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

})

/* ---- WdRadioGroup ---- */


const _hoisted_1 = {
  class: "wd-radio-group",
  role: "radiogroup"
}
const _hoisted_2 = ["aria-checked", "disabled", "onClick"]
const _hoisted_3 = { class: "wd-radio__label" }


type Option = string | { label: string; value: string | number }


export const WdRadioGroup = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdRadioGroup' },
  __name: 'WdRadioGroup',
  props: {
    modelValue: { type: [String, Number], required: false, default: '' },
    options: { type: Array, required: false, default: () => [] },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)

function pick(value: string | number) {
  if (!props.disabled) emit('update:modelValue', value)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (o) => {
      return (_openBlock(), _createElementBlock("button", {
        key: o.value,
        type: "button",
        role: "radio",
        class: _normalizeClass(["wd-radio", { 'wd-radio--checked': __props.modelValue === o.value, 'wd-radio--disabled': __props.disabled }]),
        "aria-checked": __props.modelValue === o.value,
        disabled: __props.disabled,
        onClick: ($event: any) => (pick(o.value))
      }, [
        _cache[0] || (_cache[0] = _createElementVNode("span", { class: "wd-radio__dot" }, [
          _createElementVNode("span", { class: "wd-radio__inner" })
        ], -1 /* CACHED */)),
        _createElementVNode("span", _hoisted_3, _toDisplayString(o.label), 1 /* TEXT */)
      ], 10 /* CLASS, PROPS */, _hoisted_2))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})

/* ---- WdRate ---- */


const _hoisted_1 = ["aria-label", "aria-disabled"]
const _hoisted_2 = ["aria-checked", "aria-label", "tabindex", "disabled", "onPointerenter", "onClick"]


export const WdRate = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdRate' },
  __name: 'WdRate',
  props: {
    modelValue: { type: Number, required: false, default: 0 },
    count: { type: Number, required: false, default: 5 },
    disabled: { type: Boolean, required: false, default: false },
    clearable: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

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
  const next = props.modelValue === i + 1 ? (props.clearable ? 0 : i + 1) : i + 1
  emit('update:modelValue', next)
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
  return (_openBlock(), _createElementBlock("div", {
    ref_key: "root",
    ref: root,
    class: _normalizeClass(["wd-rate", { 'wd-rate--disabled': __props.disabled }]),
    role: "radiogroup",
    "aria-label": `评分，共 ${__props.count} 星，当前 ${__props.modelValue} 星`,
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
        "aria-checked": i === __props.modelValue,
        "aria-label": `${i} 星`,
        tabindex: __props.disabled ? -1 : i === (__props.modelValue || (hover.value >= 0 ? hover.value + 1 : 1)) ? 0 : -1,
        disabled: __props.disabled,
        onPointerenter: ($event: any) => (onEnter(i - 1, $event)),
        onPointerleave: _cache[0] || (_cache[0] = ($event: any) => (onLeave($event))),
        onClick: ($event: any) => (pick(i - 1))
      }, [...(_cache[2] || (_cache[2] = [
        _createElementVNode("svg", {
          width: "22",
          height: "22",
          viewBox: "0 0 24 24",
          fill: "currentColor"
        }, [
          _createElementVNode("path", { d: "M12 2.8l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 16.9l-5.6 2.9 1.2-6.2L3 9.3l6.3-.8z" })
        ], -1 /* CACHED */)
      ]))], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_2))
    }), 128 /* KEYED_FRAGMENT */))
  ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1))
}
}

})

/* ---- WdResult ---- */


const _hoisted_1 = { class: "wd-result__icon" }
const _hoisted_2 = {
  key: 0,
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}
const _hoisted_3 = {
  key: 1,
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}
const _hoisted_4 = {
  key: 2,
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.6",
  "stroke-linecap": "round"
}
const _hoisted_5 = {
  key: 3,
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.4",
  "stroke-linecap": "round"
}
const _hoisted_6 = {
  key: 0,
  class: "wd-result__title"
}
const _hoisted_7 = {
  key: 1,
  class: "wd-result__desc"
}
const _hoisted_8 = {
  key: 2,
  class: "wd-result__extra"
}


export const WdResult = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdResult' },
  __name: 'WdResult',
  props: {
    status: { type: String, required: false, default: 'info' },
    title: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' }
  },
  setup(__props: any) {





return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-result", `wd-result--${__props.status}`])
  }, [
    _createElementVNode("div", _hoisted_1, [
      _renderSlot(_ctx.$slots, "icon", {}, () => [
        (__props.status === 'success')
          ? (_openBlock(), _createElementBlock("svg", _hoisted_2, [...(_cache[0] || (_cache[0] = [
              _createElementVNode("path", { d: "m4.5 12.5 5 5 10-11" }, null, -1 /* CACHED */)
            ]))]))
          : (__props.status === 'warning')
            ? (_openBlock(), _createElementBlock("svg", _hoisted_3, [...(_cache[1] || (_cache[1] = [
                _createElementVNode("path", { d: "M12 8v5M12 16.5h.01M10.3 4.2 3.6 16.1A2 2 0 0 0 5.3 19h13.4a2 2 0 0 0 1.7-2.9L13.7 4.2a2 2 0 0 0-3.4 0z" }, null, -1 /* CACHED */)
              ]))]))
            : (__props.status === 'error')
              ? (_openBlock(), _createElementBlock("svg", _hoisted_4, [...(_cache[2] || (_cache[2] = [
                  _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" }, null, -1 /* CACHED */)
                ]))]))
              : (_openBlock(), _createElementBlock("svg", _hoisted_5, [...(_cache[3] || (_cache[3] = [
                  _createElementVNode("path", { d: "M12 11v6M12 7.5h.01" }, null, -1 /* CACHED */),
                  _createElementVNode("circle", {
                    cx: "12",
                    cy: "12",
                    r: "9"
                  }, null, -1 /* CACHED */)
                ]))]))
      ])
    ]),
    (__props.title)
      ? (_openBlock(), _createElementBlock("div", _hoisted_6, _toDisplayString(__props.title), 1 /* TEXT */))
      : _createCommentVNode("v-if", true),
    (__props.description || _ctx.$slots.default)
      ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
          _renderSlot(_ctx.$slots, "default", {}, () => [
            _createTextVNode(_toDisplayString(__props.description), 1 /* TEXT */)
          ])
        ]))
      : _createCommentVNode("v-if", true),
    (_ctx.$slots.extra)
      ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
          _renderSlot(_ctx.$slots, "extra")
        ]))
      : _createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

})

/* ---- WdSegmented ---- */


const _hoisted_1 = ["aria-hidden"]
const _hoisted_2 = ["aria-selected", "tabindex", "onClick"]
const _hoisted_3 = {
  key: 0,
  class: "wd-segmented-picker"
}
const _hoisted_4 = ["aria-expanded"]
const _hoisted_5 = { class: "wd-segmented-picker__label" }
const _hoisted_6 = { class: "wd-segmented-picker__meta" }
const _hoisted_7 = {
  key: 0,
  class: "wd-segmented-picker__panel",
  role: "listbox"
}
const _hoisted_8 = ["aria-selected", "onClick"]
const _hoisted_9 = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "none",
  "aria-hidden": "true"
}


type Option = string | { label: string; value: string | number }
type Mode = 'flat' | 'scroll' | 'dropdown'


export const WdSegmented = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSegmented' },
  __name: 'WdSegmented',
  props: {
    modelValue: { type: [String, Number], required: false, default: '' },
    options: { type: Array, required: false, default: () => [] },
    block: { type: Boolean, required: false, default: false },
    tone: { type: String, required: false, default: 'light' },
    overflow: { type: String, required: false, default: 'wrap' },
    overflowMax: { type: Number, required: false, default: 15 }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)
const activeLabel = computed(
  () => items.value.find((o) => o.value === props.modelValue)?.label ?? '',
)

const wrap = ref<HTMLElement>()
const track = ref<HTMLElement>()
const slider = ref<HTMLElement>()

const mode = ref<Mode>('flat')
const canLeft = ref(false)
const canRight = ref(false)
const dropdownOpen = ref(false)

/* ---------------- 滑块（选中项平移） ---------------- */
function updateSlider() {
  const t = track.value
  const s = slider.value
  if (!t || !s || mode.value === 'dropdown') return
  const active = t.querySelector<HTMLElement>('.wd-segmented__item--active')
  if (!active) return
  // 滑块与激活项同处 track 坐标系；offsetLeft/Top 不受 transform 影响
  // → 位移是绝对值，永不累积漂移
  s.style.transform = `translate(${active.offsetLeft - s.offsetLeft}px, ${active.offsetTop - s.offsetTop}px)`
  s.style.width = `${active.offsetWidth}px`
  s.style.height = `${active.offsetHeight}px`
}

/* ---------------- 滚动/自动模式：模式判定 ---------------- */
function measure() {
  const w = wrap.value
  const t = track.value
  if (!t || !w) return
  if (props.overflow === 'wrap') {
    mode.value = 'flat'
    return
  }
  if (props.overflow === 'scroll') {
    mode.value = 'scroll'
  } else {
    // auto：内容自然宽度 vs 容器可用宽度
    // 注意不能用 track.clientWidth —— 它是 inline-flex，宽度随内容，永远「放得下」
    const cs = getComputedStyle(t)
    const pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0)
    const gap = parseFloat(cs.columnGap) || parseFloat(cs.gap) || 0
    const kids = Array.from(t.querySelectorAll<HTMLElement>('.wd-segmented__item'))
    const content = kids.reduce((sum, k) => sum + k.offsetWidth, 0) + gap * Math.max(0, kids.length - 1) + pad
    const wcs = getComputedStyle(w)
    const available =
      w.clientWidth - (parseFloat(wcs.paddingLeft) || 0) - (parseFloat(wcs.paddingRight) || 0)
    if (content <= available + 1) mode.value = 'flat'
    else if (kids.length > props.overflowMax) mode.value = 'dropdown'
    else mode.value = 'scroll'
  }
  nextTick(() => {
    updateSlider()
    updateFades()
  })
}

/* ---------------- 渐隐提示 ---------------- */
function updateFades() {
  const t = track.value
  if (!t || mode.value !== 'scroll') {
    canLeft.value = false
    canRight.value = false
    return
  }
  const max = t.scrollWidth - t.clientWidth
  canLeft.value = t.scrollLeft > 1
  canRight.value = max > 1 && t.scrollLeft < max - 1
}

/** 把选中项平滑滚入视野（不改变页面滚动位置） */
function scrollActiveIntoView() {
  const t = track.value
  if (!t || mode.value !== 'scroll') return
  const align = () => {
    const active = t.querySelector<HTMLElement>('.wd-segmented__item--active')
    if (!active) return
    const pad = 8
    const left = active.offsetLeft - pad
    const right = active.offsetLeft + active.offsetWidth + pad
    if (left < t.scrollLeft) t.scrollTo({ left, behavior: 'smooth' })
    else if (right > t.scrollLeft + t.clientWidth) t.scrollTo({ left: right - t.clientWidth, behavior: 'smooth' })
  }
  align()
  // 兜底：smooth 结束后若仍未对齐（字体加载/布局变化），再校正一次
  t.addEventListener('scrollend', align, { once: true })
}

/* ---------------- 下拉模式 ---------------- */
function pick(v: string | number) {
  emit('update:modelValue', v)
  dropdownOpen.value = false
}
function onDocClick(e: MouseEvent) {
  if (wrap.value && !wrap.value.contains(e.target as Node)) dropdownOpen.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') dropdownOpen.value = false
}

let ro: ResizeObserver | undefined

onMounted(async () => {
  await nextTick()
  measure()
  window.addEventListener('resize', measure)
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
  // 容器尺寸变化（侧栏展开/窗口缩放）时重新判定模式
  if (typeof ResizeObserver !== 'undefined' && wrap.value) {
    ro = new ResizeObserver(() => measure())
    ro.observe(wrap.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
  ro?.disconnect()
})

watch(
  () => props.modelValue,
  () =>
    nextTick(() => {
      updateSlider()
      scrollActiveIntoView()
    }),
)

watch(items, () =>
  nextTick(() => {
    measure()
  }),
)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    ref_key: "wrap",
    ref: wrap,
    class: _normalizeClass(["wd-segmented-wrap", {
      'wd-segmented-wrap--auto': __props.overflow === 'auto',
      'wd-segmented-wrap--scroll': mode.value === 'scroll',
      'wd-segmented-wrap--measuring': mode.value === 'dropdown',
      'wd-segmented-wrap--fade-l': canLeft.value,
      'wd-segmented-wrap--fade-r': canRight.value,
    }])
  }, [
    _createElementVNode("div", {
      ref_key: "track",
      ref: track,
      class: _normalizeClass(["wd-segmented", { 'wd-segmented--block': __props.block, 'wd-segmented--dark': __props.tone === 'dark' }]),
      "aria-hidden": mode.value === 'dropdown',
      role: "tablist",
      onScroll: updateFades
    }, [
      _createElementVNode("span", {
        ref_key: "slider",
        ref: slider,
        class: "wd-segmented__slider"
      }, null, 512 /* NEED_PATCH */),
      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (o) => {
        return (_openBlock(), _createElementBlock("button", {
          key: o.value,
          type: "button",
          role: "tab",
          class: _normalizeClass(["wd-segmented__item", { 'wd-segmented__item--active': o.value === __props.modelValue }]),
          "aria-selected": o.value === __props.modelValue,
          tabindex: mode.value === 'dropdown' ? -1 : 0,
          onClick: ($event: any) => (emit('update:modelValue', o.value))
        }, _toDisplayString(o.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_2))
      }), 128 /* KEYED_FRAGMENT */))
    ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1),
    _createCommentVNode(" 选项过多：降级为下拉筛选 "),
    (mode.value === 'dropdown')
      ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
          _createElementVNode("button", {
            type: "button",
            class: "wd-segmented-picker__trigger",
            "aria-haspopup": 'listbox',
            "aria-expanded": dropdownOpen.value,
            onClick: _cache[0] || (_cache[0] = ($event: any) => (dropdownOpen.value = !dropdownOpen.value))
          }, [
            _createElementVNode("span", _hoisted_5, _toDisplayString(activeLabel.value), 1 /* TEXT */),
            _createElementVNode("span", _hoisted_6, _toDisplayString(items.value.length) + " 项", 1 /* TEXT */),
            (_openBlock(), _createElementBlock("svg", {
              class: _normalizeClass(["wd-segmented-picker__caret", { 'is-open': dropdownOpen.value }]),
              viewBox: "0 0 24 24",
              width: "16",
              height: "16",
              fill: "none",
              "aria-hidden": "true"
            }, [...(_cache[1] || (_cache[1] = [
              _createElementVNode("path", {
                d: "M6 9l6 6 6-6",
                stroke: "currentColor",
                "stroke-width": "2.2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, null, -1 /* CACHED */)
            ]))], 2 /* CLASS */))
          ], 8 /* PROPS */, _hoisted_4),
          (dropdownOpen.value)
            ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (o) => {
                  return (_openBlock(), _createElementBlock("button", {
                    key: o.value,
                    type: "button",
                    role: "option",
                    "aria-selected": o.value === __props.modelValue,
                    class: _normalizeClass(["wd-segmented-picker__option", { 'wd-segmented-picker__option--active': o.value === __props.modelValue }]),
                    onClick: ($event: any) => (pick(o.value))
                  }, [
                    _createElementVNode("span", null, _toDisplayString(o.label), 1 /* TEXT */),
                    (o.value === __props.modelValue)
                      ? (_openBlock(), _createElementBlock("svg", _hoisted_9, [...(_cache[2] || (_cache[2] = [
                          _createElementVNode("path", {
                            d: "M5 13l4 4L19 7",
                            stroke: "currentColor",
                            "stroke-width": "2.4",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          }, null, -1 /* CACHED */)
                        ]))]))
                      : _createCommentVNode("v-if", true)
                  ], 10 /* CLASS, PROPS */, _hoisted_8))
                }), 128 /* KEYED_FRAGMENT */))
              ]))
            : _createCommentVNode("v-if", true)
        ]))
      : _createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

})

/* ---- WdSelect ---- */


const _hoisted_1 = ["disabled"]
const _hoisted_2 = {
  key: 0,
  class: "wd-select__value"
}
const _hoisted_3 = {
  key: 1,
  class: "wd-select__placeholder"
}
const _hoisted_4 = {
  key: 0,
  class: "wd-select__menu",
  role: "listbox"
}
const _hoisted_5 = ["aria-selected", "onClick"]
const _hoisted_6 = {
  key: 0,
  class: "wd-select__option-mark",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "3",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}


// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。
type Option = string | { label: string; value: string | number }


export const WdSelect = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSelect' },
  __name: 'WdSelect',
  props: {
    modelValue: { type: [String, Number], required: false, default: '' },
    options: { type: Array, required: false, default: () => [] },
    placeholder: { type: String, required: false, default: '请选择' },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {

const POP_DURATION = { enter: 200, leave: 140 }




const props = __props

const emit = __emit

const open = ref(false)
const root = ref<HTMLElement>()

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)
const current = computed(() => items.value.find((o) => o.value === props.modelValue))

function pick(value: string | number) {
  emit('update:modelValue', value)
  open.value = false
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
    class: _normalizeClass(["wd-select", { 'wd-select--open': open.value, 'wd-select--disabled': __props.disabled }])
  }, [
    _createElementVNode("button", {
      type: "button",
      class: _normalizeClass(["wd-select__trigger", { 'wd-select__trigger--lg': _ctx.size === 'lg', 'wd-select__trigger--sm': _ctx.size === 'sm' }]),
      disabled: __props.disabled,
      onClick: _cache[0] || (_cache[0] = ($event: any) => (open.value = !open.value))
    }, [
      (current.value)
        ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(current.value.label), 1 /* TEXT */))
        : (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(__props.placeholder), 1 /* TEXT */)),
      (_openBlock(), _createElementBlock("svg", {
        class: _normalizeClass(["wd-chevron", { 'wd-chevron--open': open.value }]),
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2.4",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, [...(_cache[1] || (_cache[1] = [
        _createElementVNode("path", { d: "m6 9 6 6 6-6" }, null, -1 /* CACHED */)
      ]))], 2 /* CLASS */))
    ], 10 /* CLASS, PROPS */, _hoisted_1),
    _createVNode(_Transition, {
      name: "wd-pop",
      duration: POP_DURATION
    }, {
      default: _withCtx(() => [
        (open.value)
          ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (o) => {
                return (_openBlock(), _createElementBlock("button", {
                  key: o.value,
                  type: "button",
                  role: "option",
                  class: _normalizeClass(["wd-select__option", { 'wd-select__option--active': o.value === __props.modelValue }]),
                  "aria-selected": o.value === __props.modelValue,
                  onClick: ($event: any) => (pick(o.value))
                }, [
                  _createElementVNode("span", null, _toDisplayString(o.label), 1 /* TEXT */),
                  (o.value === __props.modelValue)
                    ? (_openBlock(), _createElementBlock("svg", _hoisted_6, [...(_cache[2] || (_cache[2] = [
                        _createElementVNode("path", { d: "m4.5 12.5 5 5 10-11" }, null, -1 /* CACHED */)
                      ]))]))
                    : _createCommentVNode("v-if", true)
                ], 10 /* CLASS, PROPS */, _hoisted_5))
              }), 128 /* KEYED_FRAGMENT */))
            ]))
          : _createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    })
  ], 2 /* CLASS */))
}
}

})

/* ---- WdSkeleton ---- */



export const WdSkeleton = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSkeleton' },
  __name: 'WdSkeleton',
  props: {
    variant: { type: String, required: false, default: 'text' },
    width: { type: [Number, String], required: false, default: '' },
    height: { type: [Number, String], required: false, default: '' },
    count: { type: Number, required: false, default: 3 }
  },
  setup(__props: any) {



const props = __props

function toSize(v: number | string): string {
  if (v === '' || v === undefined || v === null) return ''
  return typeof v === 'number' ? `${v}px` : v
}

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.variant === 'circle') {
    const s = toSize(props.width) || '48px'
    style.width = s
    style.height = toSize(props.height) || s
  } else {
    if (props.width) style.width = toSize(props.width)
    if (props.height) style.height = toSize(props.height)
    if (props.variant === 'rect' && !props.height) style.height = '80px'
  }
  return style
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-skeleton", `wd-skeleton--${__props.variant}`]),
    "aria-hidden": "true"
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.count, (i) => {
      return (_openBlock(), _createElementBlock("span", {
        key: i,
        class: _normalizeClass(["wd-skeleton__item", { 'wd-skeleton__item--text': __props.variant === 'text' }]),
        style: _normalizeStyle(itemStyle.value)
      }, null, 6 /* CLASS, STYLE */))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}
}

})

/* ---- WdSlider ---- */


const _hoisted_1 = { class: "wd-slider" }
const _hoisted_2 = ["min", "max", "step", "value"]
const _hoisted_3 = {
  key: 0,
  class: "wd-slider__value"
}


export const WdSlider = /*@__PURE__*/_defineComponent({
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

function onInput(e: Event) {
  emit('update:modelValue', Number((e.target as HTMLInputElement).value))
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("input", {
      type: "range",
      min: __props.min,
      max: __props.max,
      step: __props.step,
      value: __props.modelValue,
      style: _normalizeStyle(trackStyle.value),
      onInput: onInput
    }, null, 44 /* STYLE, PROPS, NEED_HYDRATION */, _hoisted_2),
    (__props.showValue)
      ? (_openBlock(), _createElementBlock("span", _hoisted_3, _toDisplayString(__props.modelValue), 1 /* TEXT */))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})

/* ---- WdSortableList ---- */


const _hoisted_1 = { class: "wd-sortable" }
const _hoisted_2 = ["onDragstart", "onDragover", "onDrop"]
const _hoisted_3 = { class: "wd-sortable__label" }


type Item = string | { label: string }


export const WdSortableList = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSortableList' },
  __name: 'WdSortableList',
  props: {
    modelValue: { type: Array, required: false, default: () => [] }
  },
  emits: ["update:modelValue", "change"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const dragIndex = ref(-1)
const overIndex = ref(-1)

function labelOf(it: Item) {
  return typeof it === 'string' ? it : it.label
}

function onDragStart(i: number) {
  dragIndex.value = i
}
function onDragOver(i: number) {
  if (dragIndex.value < 0 || i === dragIndex.value) return
  overIndex.value = i
}
function onDrop(i: number) {
  if (dragIndex.value < 0 || i === dragIndex.value || !props.modelValue.length) return
  const arr = [...props.modelValue]
  const [moved] = arr.splice(dragIndex.value, 1)
  arr.splice(i, 0, moved)
  emit('update:modelValue', arr)
  emit('change', arr)
  reset()
}
function reset() {
  dragIndex.value = -1
  overIndex.value = -1
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.modelValue, (it, i) => {
      return (_openBlock(), _createElementBlock("div", {
        key: i,
        class: _normalizeClass(["wd-sortable__item", { 'wd-sortable__item--drag': dragIndex.value === i, 'wd-sortable__item--over': overIndex.value === i }]),
        draggable: "true",
        onDragstart: ($event: any) => (onDragStart(i)),
        onDragover: _withModifiers(($event: any) => (onDragOver(i)), ["prevent"]),
        onDrop: _withModifiers(($event: any) => (onDrop(i)), ["prevent"]),
        onDragend: reset
      }, [
        _cache[0] || (_cache[0] = _createStaticVNode("<span class=\"wd-sortable__handle\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><circle cx=\"9\" cy=\"6\" r=\"1.6\"></circle><circle cx=\"15\" cy=\"6\" r=\"1.6\"></circle><circle cx=\"9\" cy=\"12\" r=\"1.6\"></circle><circle cx=\"15\" cy=\"12\" r=\"1.6\"></circle><circle cx=\"9\" cy=\"18\" r=\"1.6\"></circle><circle cx=\"15\" cy=\"18\" r=\"1.6\"></circle></svg></span>", 1)),
        _createElementVNode("span", _hoisted_3, _toDisplayString(labelOf(it)), 1 /* TEXT */)
      ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_2))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})

/* ---- WdSpace ---- */



export const WdSpace = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSpace' },
  __name: 'WdSpace',
  props: {
    size: { type: [String, Number], required: false, default: 'md' },
    direction: { type: String, required: false, default: 'row' },
    wrap: { type: Boolean, required: false, default: false },
    between: { type: Boolean, required: false, default: false },
    center: { type: Boolean, required: false, default: false },
    grow: { type: Boolean, required: false, default: false }
  },
  setup(__props: any) {



const props = __props

const gap = computed(() => {
  if (typeof props.size === 'number') return `${props.size}px`
  return { sm: 'var(--wd-space-2)', md: 'var(--wd-space-3)', lg: 'var(--wd-space-6)' }[props.size]
})

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-space", {
      'wd-space--col': __props.direction === 'col',
      'wd-space--wrap': __props.wrap,
      'wd-space--between': __props.between,
      'wd-space--center': __props.center,
      'wd-space--grow': __props.grow,
    }]),
    style: _normalizeStyle({ gap: gap.value })
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 6 /* CLASS, STYLE */))
}
}

})

/* ---- WdSpinner ---- */


export const WdSpinner = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSpinner' },
  __name: 'WdSpinner',
  props: {
    size: { type: String, required: false, default: 'md' }
  },
  setup(__props: any) {





return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(["wd-spinner", __props.size !== 'md' ? `wd-spinner--${__props.size}` : '']),
    role: "status",
    "aria-label": "加载中"
  }, null, 2 /* CLASS */))
}
}

})

/* ---- WdSteps ---- */


const _hoisted_1 = { class: "wd-steps" }
const _hoisted_2 = { class: "wd-steps__dot" }
const _hoisted_3 = {
  key: 0,
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "3.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}
const _hoisted_4 = { class: "wd-steps__label" }
const _hoisted_5 = {
  key: 0,
  class: "wd-steps__desc"
}


type Step = string | { title: string; desc?: string }


export const WdSteps = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSteps' },
  __name: 'WdSteps',
  props: {
    steps: { type: Array, required: false, default: () => [] },
    current: { type: Number, required: false, default: 0 }
  },
  setup(__props: any) {



const props = __props

const items = computed(() =>
  props.steps.map((s) => (typeof s === 'string' ? { title: s, desc: '' } : { desc: '', ...s })),
)

function state(i: number) {
  if (i < props.current) return 'finish'
  if (i === props.current) return 'process'
  return 'wait'
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (s, i) => {
      return (_openBlock(), _createElementBlock(_Fragment, { key: i }, [
        _createElementVNode("div", {
          class: _normalizeClass(["wd-steps__item", `wd-steps__item--${state(i)}`])
        }, [
          _createElementVNode("span", _hoisted_2, [
            (state(i) === 'finish')
              ? (_openBlock(), _createElementBlock("svg", _hoisted_3, [...(_cache[0] || (_cache[0] = [
                  _createElementVNode("path", { d: "m4.5 12.5 5 5 10-11" }, null, -1 /* CACHED */)
                ]))]))
              : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                  _createTextVNode(_toDisplayString(i + 1), 1 /* TEXT */)
                ], 64 /* STABLE_FRAGMENT */))
          ]),
          _createElementVNode("span", _hoisted_4, [
            _createTextVNode(_toDisplayString(s.title) + " ", 1 /* TEXT */),
            (s.desc)
              ? (_openBlock(), _createElementBlock("em", _hoisted_5, _toDisplayString(s.desc), 1 /* TEXT */))
              : _createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */),
        (i < items.value.length - 1)
          ? (_openBlock(), _createElementBlock("span", {
              key: 0,
              class: _normalizeClass(["wd-steps__bar", { 'wd-steps__bar--done': i < __props.current }])
            }, null, 2 /* CLASS */))
          : _createCommentVNode("v-if", true)
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})

/* ---- WdSwitch ---- */


const _hoisted_1 = ["aria-checked", "disabled"]


export const WdSwitch = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSwitch' },
  __name: 'WdSwitch',
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {





const emit = __emit

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("button", {
    type: "button",
    role: "switch",
    class: _normalizeClass(["wd-switch", { 'wd-switch--off': !__props.modelValue }]),
    "aria-checked": __props.modelValue,
    disabled: __props.disabled,
    onClick: _cache[0] || (_cache[0] = ($event: any) => (emit('update:modelValue', !__props.modelValue)))
  }, [...(_cache[1] || (_cache[1] = [
    _createElementVNode("span", { class: "wd-switch__knob" }, null, -1 /* CACHED */)
  ]))], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

})

/* ---- WdTable ---- */


const _hoisted_1 = { class: "wd-table-wrap" }
const _hoisted_2 = ["aria-sort", "onClick"]
const _hoisted_3 = {
  key: 0,
  class: "wd-table__sort"
}
const _hoisted_4 = {
  key: 0,
  d: "M12 5l7 7H5l7-7z"
}
const _hoisted_5 = {
  key: 1,
  d: "M12 19l-7-7h14l-7 7z"
}
const _hoisted_6 = {
  key: 1,
  class: "wd-table__empty"
}


export interface WdTableColumn {
  key: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}


export const WdTable = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTable' },
  __name: 'WdTable',
  props: {
    columns: { type: Array, required: false, default: () => [] },
    rows: { type: Array, required: false, default: () => [] },
    striped: { type: Boolean, required: false, default: true },
    emptyText: { type: String, required: false, default: '暂无数据' }
  },
  setup(__props: any) {



const props = __props

const sortKey = ref('')
const sortDir = ref<'asc' | 'desc'>('asc')

const sorted = computed(() => {
  if (!sortKey.value) return props.rows
  return [...props.rows].sort((a, b) => {
    const av = String(a[sortKey.value] ?? ''), bv = String(b[sortKey.value] ?? '')
    const cmp = av.localeCompare(bv, 'zh-CN', { numeric: true })
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

function toggleSort(key: string, col: WdTableColumn) {
  if (!col.sortable) return
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (props.rows.length)
      ? (_openBlock(), _createElementBlock("table", {
          key: 0,
          class: _normalizeClass(["wd-table", { 'wd-table--striped': __props.striped }])
        }, [
          _createElementVNode("thead", null, [
            _createElementVNode("tr", null, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.columns, (col) => {
                return (_openBlock(), _createElementBlock("th", {
                  key: col.key,
                  style: _normalizeStyle(col.width ? { width: col.width } : undefined),
                  class: _normalizeClass(["wd-table__th", { 'wd-table__th--sort': col.sortable }]),
                  "aria-sort": sortKey.value === col.key ? (sortDir.value === 'asc' ? 'ascending' : 'descending') : 'none',
                  onClick: ($event: any) => (toggleSort(col.key, col))
                }, [
                  _createTextVNode(_toDisplayString(col.title) + " ", 1 /* TEXT */),
                  (col.sortable)
                    ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
                        (_openBlock(), _createElementBlock("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          style: _normalizeStyle({ color: sortKey.value === col.key ? 'var(--wd-red)' : 'var(--wd-ink-3)' })
                        }, [
                          (sortKey.value !== col.key || sortDir.value === 'asc')
                            ? (_openBlock(), _createElementBlock("path", _hoisted_4))
                            : (_openBlock(), _createElementBlock("path", _hoisted_5))
                        ], 4 /* STYLE */))
                      ]))
                    : _createCommentVNode("v-if", true)
                ], 14 /* CLASS, STYLE, PROPS */, _hoisted_2))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ]),
          _createElementVNode("tbody", null, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(sorted.value, (row, i) => {
              return (_openBlock(), _createElementBlock("tr", { key: i }, [
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(props.columns, (col) => {
                  return (_openBlock(), _createElementBlock("td", {
                    key: col.key,
                    style: _normalizeStyle(col.align ? { textAlign: col.align } : undefined)
                  }, [
                    _renderSlot(_ctx.$slots, `cell-${col.key}`, {
                      row: row,
                      value: row[col.key]
                    }, () => [
                      _createTextVNode(_toDisplayString(row[col.key]), 1 /* TEXT */)
                    ])
                  ], 4 /* STYLE */))
                }), 128 /* KEYED_FRAGMENT */))
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ], 2 /* CLASS */))
      : (_openBlock(), _createElementBlock("div", _hoisted_6, _toDisplayString(__props.emptyText), 1 /* TEXT */))
  ]))
}
}

})

/* ---- WdTabs ---- */


const _hoisted_1 = ["aria-selected", "onClick"]


type Tab = string | { label: string; value: string | number }


export const WdTabs = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTabs' },
  __name: 'WdTabs',
  props: {
    modelValue: { type: [String, Number], required: false, default: '' },
    tabs: { type: Array, required: false, default: () => [] },
    block: { type: Boolean, required: false, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const items = computed(() =>
  props.tabs.map((t) => (typeof t === 'string' ? { label: t, value: t } : t)),
)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["wd-tabs", { 'wd-tabs--block': __props.block }]),
    role: "tablist"
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(items.value, (t) => {
      return (_openBlock(), _createElementBlock("button", {
        key: t.value,
        type: "button",
        role: "tab",
        class: _normalizeClass(["wd-tabs__item", { 'wd-tabs__item--active': t.value === __props.modelValue }]),
        "data-wd-hover": "",
        "aria-selected": t.value === __props.modelValue,
        onClick: ($event: any) => (emit('update:modelValue', t.value))
      }, _toDisplayString(t.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_1))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}
}

})

/* ---- WdTag ---- */


const _hoisted_1 = {
  key: 0,
  class: "wd-tag__dot"
}


export const WdTag = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTag' },
  __name: 'WdTag',
  props: {
    variant: { type: String, required: false, default: 'tint' },
    size: { type: String, required: false },
    dot: { type: Boolean, required: false, default: false }
  },
  setup(__props: any) {





return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(["wd-tag", [`wd-tag--${__props.variant}`, { 'wd-tag--lg': __props.size === 'lg', 'wd-tag--sm': __props.size === 'sm' }]]),
    "data-wd-hover": ""
  }, [
    (__props.dot)
      ? (_openBlock(), _createElementBlock("i", _hoisted_1))
      : _createCommentVNode("v-if", true),
    _renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}
}

})

/* ---- WdTimeline ---- */


const _hoisted_1 = {
  key: 0,
  class: "wd-timeline__period"
}
const _hoisted_2 = { class: "wd-timeline__body" }
const _hoisted_3 = { class: "wd-timeline__title" }
const _hoisted_4 = {
  key: 0,
  class: "wd-timeline__desc"
}


export const WdTimeline = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTimeline' },
  __name: 'WdTimeline',
  props: {
    items: { type: Array, required: true },
    line: { type: Boolean, required: false, default: false }
  },
  setup(__props: any) {

/**
 * WdTimeline — 时间线
 * 反向迭代（源：w-run/blog 的 About 经历区块）
 */




return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("ul", {
    class: _normalizeClass(["wd-timeline", { 'wd-timeline--line': __props.line }])
  }, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.items, (it, i) => {
      return (_openBlock(), _createElementBlock("li", {
        key: i,
        class: "wd-timeline__item"
      }, [
        (it.period)
          ? (_openBlock(), _createElementBlock("span", _hoisted_1, _toDisplayString(it.period), 1 /* TEXT */))
          : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_2, [
          _createElementVNode("h3", _hoisted_3, _toDisplayString(it.title), 1 /* TEXT */),
          (it.desc)
            ? (_openBlock(), _createElementBlock("p", _hoisted_4, _toDisplayString(it.desc), 1 /* TEXT */))
            : _createCommentVNode("v-if", true)
        ])
      ]))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}
}

})

/* ---- WdTooltip ---- */


const _hoisted_1 = {
  key: 0,
  class: "wd-tooltip__bubble",
  role: "tooltip"
}


export const WdTooltip = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdTooltip' },
  __name: 'WdTooltip',
  props: {
    content: { type: String, required: false, default: '' },
    placement: { type: String, required: false, default: 'top' }
  },
  setup(__props: any) {





const open = ref(false)

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(["wd-tooltip", [`wd-tooltip--${__props.placement}`, { 'wd-tooltip--open': open.value }]]),
    onMouseenter: _cache[0] || (_cache[0] = ($event: any) => (open.value = true)),
    onMouseleave: _cache[1] || (_cache[1] = ($event: any) => (open.value = false)),
    onFocusin: _cache[2] || (_cache[2] = ($event: any) => (open.value = true)),
    onFocusout: _cache[3] || (_cache[3] = ($event: any) => (open.value = false))
  }, [
    _renderSlot(_ctx.$slots, "default"),
    _createVNode(_Transition, { name: "wd-pop" }, {
      default: _withCtx(() => [
        (open.value)
          ? (_openBlock(), _createElementBlock("span", _hoisted_1, _toDisplayString(__props.content), 1 /* TEXT */))
          : _createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    })
  ], 34 /* CLASS, NEED_HYDRATION */))
}
}

})

/* ---- WdUpload ---- */


const _hoisted_1 = { class: "wd-upload" }
const _hoisted_2 = {
  key: 0,
  class: "wd-upload__hint"
}
const _hoisted_3 = ["accept", "multiple"]
const _hoisted_4 = {
  key: 0,
  class: "wd-upload__list"
}
const _hoisted_5 = { class: "wd-upload__info" }
const _hoisted_6 = { class: "wd-upload__name" }
const _hoisted_7 = { class: "wd-upload__meta" }
const _hoisted_8 = {
  key: 0,
  class: "wd-upload__progress"
}
const _hoisted_9 = ["onClick"]


export interface WdUploadFile {
  name: string
  size: number
  percent: number
}


export const WdUpload = /*@__PURE__*/_defineComponent({
  ...{ name: 'WdUpload' },
  __name: 'WdUpload',
  props: {
    accept: { type: String, required: false, default: '*' },
    multiple: { type: Boolean, required: false, default: false },
    hint: { type: String, required: false, default: '' }
  },
  emits: ["change"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const files = ref<WdUploadFile[]>([])
const dragging = ref(false)
const input = ref<HTMLInputElement>()

function fmtSize(n: number) {
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(1)} MB`
}

function addFiles(list: FileList | File[]) {
  for (const f of Array.from(list)) {
    if (!props.multiple && files.value.length >= 1) files.value = []
    const item: WdUploadFile = { name: f.name, size: f.size, percent: 0 }
    files.value.push(item)
    emit('change', files.value)
    // 演示进度：接入真实上传时替换为实际进度
    const timer = window.setInterval(() => {
      item.percent = Math.min(100, item.percent + Math.round(12 + Math.random() * 16))
      if (item.percent >= 100) window.clearInterval(timer)
    }, 120)
  }
}

function openPicker() {
  input.value?.click()
}
function onPick(e: Event) {
  const target = e.target as HTMLInputElement
  addFiles(target.files || [])
  target.value = ''
}
function onDrop(e: DragEvent) {
  e.preventDefault()
  dragging.value = false
  if (e.dataTransfer) addFiles(e.dataTransfer.files)
}
function remove(i: number) {
  files.value.splice(i, 1)
  emit('change', files.value)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", {
      class: _normalizeClass(["wd-upload__zone", { 'wd-upload__zone--over': dragging.value }]),
      onClick: openPicker,
      onDragover: _cache[0] || (_cache[0] = _withModifiers(($event: any) => (dragging.value = true), ["prevent"])),
      onDragleave: _cache[1] || (_cache[1] = ($event: any) => (dragging.value = false)),
      onDrop: onDrop
    }, [
      _cache[2] || (_cache[2] = _createStaticVNode("<span class=\"wd-upload__icon\"><svg width=\"34\" height=\"34\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 16V4m0 0-4 4m4-4 4 4\"></path><path d=\"M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4\"></path></svg></span><span class=\"wd-upload__hint\"><strong>点击选择</strong> 或拖拽文件到这里</span>", 2)),
      (__props.hint)
        ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(__props.hint), 1 /* TEXT */))
        : _createCommentVNode("v-if", true),
      _cache[3] || (_cache[3] = _createElementVNode("span", { class: "wd-upload__browse" }, "浏览文件", -1 /* CACHED */)),
      _createElementVNode("input", {
        ref_key: "input",
        ref: input,
        class: "wd-upload__input",
        type: "file",
        accept: __props.accept,
        multiple: __props.multiple,
        onChange: onPick
      }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_3)
    ], 34 /* CLASS, NEED_HYDRATION */),
    (files.value.length)
      ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(files.value, (f, i) => {
            return (_openBlock(), _createElementBlock("div", {
              key: i,
              class: "wd-upload__item"
            }, [
              _cache[5] || (_cache[5] = _createElementVNode("span", { class: "wd-upload__file-icon" }, [
                _createElementVNode("svg", {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "currentColor"
                }, [
                  _createElementVNode("path", { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" })
                ])
              ], -1 /* CACHED */)),
              _createElementVNode("div", _hoisted_5, [
                _createElementVNode("div", _hoisted_6, _toDisplayString(f.name), 1 /* TEXT */),
                _createElementVNode("div", _hoisted_7, _toDisplayString(fmtSize(f.size)) + " · " + _toDisplayString(f.percent >= 100 ? '已完成' : '上传中 ' + f.percent + '%'), 1 /* TEXT */),
                (f.percent < 100)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
                      _createElementVNode("span", {
                        class: "wd-upload__progress-bar",
                        style: _normalizeStyle({ width: f.percent + '%' })
                      }, null, 4 /* STYLE */)
                    ]))
                  : _createCommentVNode("v-if", true)
              ]),
              _createElementVNode("button", {
                type: "button",
                class: "wd-upload__remove",
                "aria-label": "移除",
                onClick: _withModifiers(($event: any) => (remove(i)), ["stop"])
              }, [...(_cache[4] || (_cache[4] = [
                _createElementVNode("svg", {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.6",
                  "stroke-linecap": "round"
                }, [
                  _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                ], -1 /* CACHED */)
              ]))], 8 /* PROPS */, _hoisted_9)
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})
export const ALL = [WdAiMessage, WdAlert, WdAvatar, WdAvatarGroup, WdBadge, WdBreadcrumb, WdButton, WdCard, WdCarousel, WdCheckbox, WdCollapse, WdContainer, WdDatePicker, WdDrawer, WdDropdown, WdEmpty, WdExplorer, WdFileList, WdGrid, WdImagePreview, WdInput, WdListItem, WdModal, WdNotification, WdOtp, WdPagination, WdPostItem, WdProgress, WdRadioGroup, WdRate, WdResult, WdSegmented, WdSelect, WdSkeleton, WdSlider, WdSortableList, WdSpace, WdSpinner, WdSteps, WdSwitch, WdTable, WdTabs, WdTag, WdTimeline, WdTooltip, WdUpload]
export default ALL
