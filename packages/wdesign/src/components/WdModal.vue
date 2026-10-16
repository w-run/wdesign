<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

defineOptions({ name: 'WdModal' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    width?: number | string
    closeOnMask?: boolean
  }>(),
  { modelValue: false, title: '', width: 440, closeOnMask: true },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const panel = ref<HTMLElement | null>(null)
let lastActive: HTMLElement | null = null

const maxWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
)

function close() {
  emit('update:modelValue', false)
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * 无障碍焦点管理：
 * 打开时把焦点移入面板并记住来源，Tab 在面板内循环（焦点陷阱），
 * 关闭后归还焦点——否则键盘/读屏用户会「tab 到背后的页面」而失去上下文。
 */
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
</script>

<template>
  <Teleport to="body">
    <Transition name="wd-modal-fade">
    <div v-if="modelValue" class="wd-modal" role="dialog" aria-modal="true" :aria-label="title || undefined">
      <div class="wd-modal__mask" @click="closeOnMask && close()"></div>
      <div ref="panel" class="wd-modal__panel" tabindex="-1" :style="{ maxWidth }">
        <div class="wd-modal__head">
          <div class="wd-modal__title">{{ title }}</div>
          <button type="button" class="wd-icon-btn" aria-label="关闭" @click="close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
          </button>
        </div>
        <div class="wd-modal__body"><slot /></div>
        <div v-if="$slots.footer" class="wd-modal__foot"><slot name="footer" /></div>
      </div>
    </div>
    </Transition>
  </Teleport>
</template>
