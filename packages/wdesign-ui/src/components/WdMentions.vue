<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useAnchoredPosition, useDismiss } from './anchor'
import { useOverlayLayer } from './overlay-stack'

defineOptions({ name: 'WdMentions' })

export interface WdMentionUser {
  /** 唯一标识 */
  id: string | number
  /** 显示名 */
  label: string
  /** 次级说明（部门/邮箱等） */
  desc?: string
  /** 头像 */
  avatar?: string
  /** 插入文本时用的值，缺省用 label */
  value?: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** 受控文本 */
    modelValue?: string
    /** 非受控初值 */
    defaultValue?: string
    /** 候选人列表 */
    users?: WdMentionUser[]
    /** 输入区占位文字 */
    placeholder?: string
    /** 文本域行数 */
    rows?: number
    /** 禁用；不能输入也不弹候选浮层 */
    disabled?: boolean
    /** 触发字符 */
    trigger?: string
    /** 最多显示几个候选 */
    maxOptions?: number
  }>(),
  {
    modelValue: undefined,
    defaultValue: '',
    users: () => [],
    placeholder: '输入 @ 提及成员',
    rows: 3,
    disabled: false,
    trigger: '@',
    maxOptions: 8,
  },
)

const emit = defineEmits<{
  /** 文本变化时触发，参数为最新文本，用于 v-model */
  'update:modelValue': [value: string]
  /** 文本变化时触发，非受控模式监听它拿最新文本 */
  change: [value: string]
  /** 选中候选项后触发，参数为被选中的用户 */
  select: [user: WdMentionUser]
}>()

const inner = ref(props.defaultValue)
const isControlled = computed(() => props.modelValue !== undefined)
const text = computed(() => (isControlled.value ? props.modelValue! : inner.value))

const ta = ref<HTMLTextAreaElement | null>(null)
const rootEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)

/* ---------------- 触发检测 ---------------- */
/**
 * 当前正在输入的 mention 片段。
 * `start` 是触发字符在文本中的下标 —— 插入时要把 `@xxx` 整段替换掉。
 *
 * ⚠️ 不能简单用 `lastIndexOf('@')`：用户可能输入邮箱 a@b.com，
 * 或在 @ 后面又打了空格。必须校验「@ 之后到光标之间没有空白」。
 */
const activeQuery = ref<{ start: number; query: string } | null>(null)

/**
 * 检测光标前是否有一段 `@xxx`。
 *
 * ⚠️ 必须接受"当前输入值"参数，不能只读 `text.value`：
 * 受控模式（v-model）下 `text` 来自 `props.modelValue`，
 * 而父组件在同一个 tick 里还没把新值传回来 —— `detectMention()` 读到的是**旧文本**，
 * 于是刚敲下的 `@` 永远检测不到，浮层打不开（"Mentions 失效"就是这么来的）。
 */
function detectMention(value?: string) {
  const el = ta.value
  if (!el) return
  const pos = el.selectionStart ?? 0
  const before = (value ?? text.value).slice(0, pos)
  const at = before.lastIndexOf(props.trigger)
  if (at < 0) { activeQuery.value = null; return }

  const frag = before.slice(at + props.trigger.length)
  // @ 后面不能有空白，也不能跨行
  if (/\s/.test(frag) || frag.length > 20) { activeQuery.value = null; return }
  activeQuery.value = { start: at, query: frag }
}

const filtered = computed(() => {
  const q = activeQuery.value?.query ?? ''
  const list = props.users.filter((u) => !u.disabled)
  if (!q) return list.slice(0, props.maxOptions)
  const lower = q.toLowerCase()
  return list
    .filter((u) => u.label.toLowerCase().includes(lower) || (u.desc ?? '').toLowerCase().includes(lower))
    .slice(0, props.maxOptions)
})

const open = computed(() => activeQuery.value !== null && filtered.value.length > 0)

const { pos } = useAnchoredPosition(open, rootEl, panelEl, {
  placement: 'bottom-start',
  gap: 6,
})

const panelStyle = computed(() => ({
  top: pos.value.top + 'px',
  left: pos.value.left + 'px',
}))

/* ---------------- 高亮项 ---------------- */
const activeIndex = ref(0)
watch(filtered, () => { activeIndex.value = 0 })

/* ---------------- 插入 ---------------- */
function pick(user: WdMentionUser) {
  const a = activeQuery.value
  const el = ta.value
  if (!a || !el) return

  const insert = props.trigger + (user.value ?? user.label)
  const live = el.value
  const pos = el.selectionStart ?? live.length
  const before = live.slice(0, a.start)
  const after = live.slice(pos)
  // 末尾补空格，方便继续输入
  const next = before + insert + ' ' + after

  setText(next)
  emit('select', user)
  activeQuery.value = null

  // 光标放到插入内容之后
  nextTick(() => {
    const caret = (before + insert + ' ').length
    el.focus()
    el.setSelectionRange(caret, caret)
  })
}

function setText(v: string) {
  if (!isControlled.value) inner.value = v
  emit('update:modelValue', v)
  emit('change', v)
}

function onInput(e: Event) {
  const v = (e.target as HTMLTextAreaElement).value
  if (!isControlled.value) inner.value = v
  emit('update:modelValue', v)
  emit('change', v)
  // 把刚输入的值直接传进去，不要等 props 回流
  detectMention(v)
}

/* ---------------- 键盘 ---------------- */
function onKeydown(e: KeyboardEvent) {
  if (!open.value) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % filtered.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + filtered.value.length) % filtered.value.length
  } else if (e.key === 'Enter' || e.key === 'Tab') {
    e.preventDefault()
    pick(filtered.value[activeIndex.value])
  } else if (e.key === 'Escape') {
    e.preventDefault()
    activeQuery.value = null
  }
}

function onBlur() {
  // 延迟关闭，给点击候选项留时间（blur 先于 click 触发）
  window.setTimeout(() => {
    activeQuery.value = null
  }, 140)
}

useDismiss([rootEl, panelEl], () => { activeQuery.value = null }, open)
useOverlayLayer(open, panelEl, () => { activeQuery.value = null; return true })

const charCount = computed(() => text.value.length)
</script>

<template>
  <div ref="rootEl" class="wd-mentions" :class="{ 'is-disabled': disabled }">
    <textarea
      ref="ta"
      class="wd-mentions__input"
      :value="text"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      @keydown="onKeydown"
      @blur="onBlur"
      @click="detectMention"
    ></textarea>

    <div v-if="open" ref="panelEl" class="wd-mentions__panel" :style="panelStyle" role="listbox">
      <button
        v-for="(u, i) in filtered"
        :key="u.id"
        type="button"
        class="wd-mentions__option"
        :class="{ 'is-active': i === activeIndex }"
        role="option"
        :aria-selected="i === activeIndex"
        @mousedown.prevent
        @click="pick(u)"
        @mouseenter="activeIndex = i"
      >
        <span v-if="u.avatar" class="wd-mentions__avatar">
          <img :src="u.avatar" :alt="u.label" />
        </span>
        <span v-else class="wd-mentions__avatar wd-mentions__avatar--text">
          {{ u.label.slice(0, 1) }}
        </span>
        <span class="wd-mentions__label">
          {{ u.label }}
          <span v-if="u.desc" class="wd-mentions__desc">{{ u.desc }}</span>
        </span>
      </button>
    </div>

    <span v-if="charCount" class="wd-mentions__count">{{ charCount }}</span>
  </div>
</template>
