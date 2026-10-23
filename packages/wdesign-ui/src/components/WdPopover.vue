<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, nextTick, ref, watch } from 'vue'
import { useAnchoredPosition, useDismiss } from './anchor'
import { useOverlayLayer } from './overlay-stack'

defineOptions({ name: 'WdPopover' })

const props = withDefaults(
  defineProps<{
    /**
     * 触发方式：
     *  click  — 点击切换（默认，适合带交互内容的气泡）
     *  hover  — 悬停（适合纯展示说明）
     *  manual — 完全受控，由 v-model:open 驱动
     */
    trigger?: 'click' | 'hover' | 'manual'
    /** 气泡标题（留空则不显示标题栏） */
    title?: string
    /** 浮层相对触发器的对齐方位，空间不足时自动翻转 */
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'bottom-center'
    /** 与触发器的间距 */
    gap?: number
    /** 面板宽度，不传则自适应内容 */
    width?: number
    /** 显示关闭按钮 */
    closable?: boolean
    /** 是否禁用，禁用后点击与悬停都不弹出，且会关掉已打开的浮层 */
    disabled?: boolean
    /** 点击面板内部是否关闭 */
    closeOnContent?: boolean
  }>(),
  {
    trigger: 'click',
    title: '',
    placement: 'bottom-start',
    gap: 8,
    width: undefined,
    closable: false,
    disabled: false,
    closeOnContent: false,
  },
)

/** 受控/非受控：显式传 open 就走受控，否则组件自己管 */
const emit = defineEmits<{
  /** 显隐变化时触发，参数为是否打开；trigger 为 manual 时靠它做完全受控 */
  'update:open': [value: boolean]
  /** 浮层打开后触发 */
  open: []
  /** 浮层关闭后触发（点外部 / Esc / 关闭按钮 / closeOnContent 点内容） */
  close: []
}>()

const open = ref(false)

const anchorEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)
/** 节点是否已挂载（关闭动画/首帧都需要它先存在） */
const mounted = ref(false)

const { pos, actual } = useAnchoredPosition(open, anchorEl, panelEl, {
  placement: props.placement,
  gap: props.gap,
  width: props.width,
})

const style = computed(() => ({
  top: pos.value.top + 'px',
  left: pos.value.left + 'px',
}))

function show() {
  if (props.disabled || open.value) return
  mounted.value = true
  open.value = true
  emit('open')
  emit('update:open', true)
}

function hide() {
  if (!open.value) return
  open.value = false
  emit('close')
  emit('update:open', false)
}

function toggle() {
  if (props.disabled) return
  if (open.value) hide()
  else show()
}

/* ---------------- 触发方式 ---------------- */
let hoverTimer = 0

function onEnter() {
  if (props.trigger !== 'hover') return
  clearTimeout(hoverTimer)
  show()
}

function onLeave() {
  if (props.trigger !== 'hover') return
  // 延迟关闭，给用户从触发器移到面板的时间（面板与触发器之间有 gap）
  clearTimeout(hoverTimer)
  hoverTimer = window.setTimeout(() => {
    // 指针已经进入面板则取消关闭
    if (panelEl.value?.matches(':hover')) return
    hide()
  }, 120)
}

function onClick() {
  if (props.trigger === 'click') toggle()
}

/** 面板内部点击：默认不关闭，只有 closeOnContent 才关 */
function onPanelClick(e: MouseEvent) {
  if (!props.closeOnContent) return
  // 点击的是可交互元素时不关闭，避免"点个按钮气泡就没了"
  const t = e.target as HTMLElement
  if (t.closest('button, a, input, select, textarea, [role="button"]')) return
  hide()
}

watch(
  () => props.disabled,
  (v) => { if (v) hide() },
)

/* ---------------- 关闭行为 ---------------- */
/** 点击外部关闭：统一走 anchor.ts（含面板与触发器两个受保护区域） */
useDismiss([anchorEl, panelEl], hide, open)

/** Esc 只关最上层：接入全局层栈，避免嵌套时一次关掉全部 */
useOverlayLayer(open, panelEl, () => { hide(); return true })

/**
 * 关闭后卸载节点。
 *
 * 为什么延迟卸载：留一点时间给 CSS 的过渡（关闭时面板还要淡出）。
 * 但不能依赖 transitionend —— 无头/后台环境下动画时钟停摆，
 * transitionend 永远不来，节点会永久残留。
 */
watch(open, async (v) => {
  if (v) {
    await nextTick()
    // 面板刚挂载时尺寸可能还是 0（图片/异步内容），下一帧再量一次
    nextTick(() => {})
    return
  }
  window.setTimeout(() => {
    if (!open.value) mounted.value = false
  }, 200)
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) hide()
}
</script>

<template>
  <span
    ref="anchorEl"
    class="wd-popover"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @click="onClick"
    @keydown="onKeydown"
  >
    <slot name="trigger">
      <button type="button" class="wd-popover__default-trigger">{{ title || '详情' }}</button>
    </slot>
  </span>

  <Teleport to="body">
    <div
      v-if="mounted"
      ref="panelEl"
      class="wd-popover__panel"
      :class="{ 'is-open': open }"
      :style="style"
      :data-placement="actual"
      role="dialog"
      :aria-label="title || undefined"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @click="onPanelClick"
    >
      <div v-if="title || closable" class="wd-popover__head">
        <span class="wd-popover__title">{{ title }}</span>
        <button
          v-if="closable"
          type="button"
          class="wd-popover__close"
          aria-label="关闭"
          @click="hide"
        >
          <wd-icon name="close" :size="14" />
        </button>
      </div>

      <div class="wd-popover__body">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
