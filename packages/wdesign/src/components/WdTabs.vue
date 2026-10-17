<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'WdTabs' })

type Tab = string | { label: string; value: string | number; closable?: boolean; disabled?: boolean }

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    tabs?: Tab[]
    block?: boolean
    /** 每个页签可关闭（右上角 ×） */
    closable?: boolean
    /** 显示末尾的「+ 新建」按钮 */
    addable?: boolean
    /** 内容放不下时横向滚动（否则压缩） */
    scrollable?: boolean
  }>(),
  { modelValue: '', tabs: () => [], block: false, closable: false, addable: false, scrollable: true },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'close', value: string | number): void
  (e: 'add'): void
}>()

/** 首次交互后才允许激活项播放弹入动画（避免首屏渲染时抖动） */
const animReady = ref(false)
function select(v: string | number) {
  animReady.value = true
  emit('update:modelValue', v)
}

const items = computed(() =>
  props.tabs.map((t) => {
    const raw = typeof t === 'string' ? { label: t, value: t } : t
    // 优先级：条目显式 closable > 组件级 closable
    // 条目显式 false 要能覆盖组件级的 true（否则"固定"页签也会出现 ×）
    const canClose = 'closable' in raw ? raw.closable === true : props.closable
    return { label: raw.label, value: raw.value, closable: canClose, disabled: raw.disabled === true }
  }),
)

function close(t: { value: string | number }, e: MouseEvent) {
  e.stopPropagation()
  emit('close', t.value)
}

/** 键盘左右切换 */
function onKeydown(e: KeyboardEvent) {
  const list = items.value.filter((t) => !t.disabled)
  if (!list.length) return
  const cur = list.findIndex((t) => t.value === props.modelValue)
  let next = -1
  if (e.key === 'ArrowRight') next = (cur + 1) % list.length
  else if (e.key === 'ArrowLeft') next = (cur - 1 + list.length) % list.length
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = list.length - 1
  if (next < 0) return
  e.preventDefault()
  select(list[next].value)
}
</script>

<template>
  <div
    class="wd-tabs"
    :class="{
      'wd-tabs--block': block,
      'wd-tabs--anim-ready': animReady,
      'wd-tabs--scrollable': scrollable,
      'wd-tabs--closable': items.some(t => t.closable),
    }"
    role="tablist"
    @keydown="onKeydown"
  >
    <button
      v-for="t in items"
      :key="t.value"
      type="button"
      role="tab"
      class="wd-tabs__item"
      data-wd-hover
      :class="{
        'wd-tabs__item--active': t.value === modelValue,
        'wd-tabs__item--disabled': t.disabled,
      }"
      :aria-selected="t.value === modelValue"
      :disabled="t.disabled"
      :tabindex="t.value === modelValue ? 0 : -1"
      @click="select(t.value)"
    >
      <span class="wd-tabs__label">{{ t.label }}</span>
      <span
        v-if="t.closable && !t.disabled"
        class="wd-tabs__close"
        role="button"
        :aria-label="`关闭 ${t.label}`"
        @click="close(t, $event)"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
      </span>
    </button>

    <button
      v-if="addable"
      type="button"
      class="wd-tabs__add"
      aria-label="新建"
      data-wd-hover
      @click="emit('add')"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg>
    </button>
  </div>
</template>
