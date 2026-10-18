<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'WdScrollbar' })

const props = withDefaults(
  defineProps<{
    /** 容器最大高度；不传则由外部样式控制 */
    maxHeight?: string | number
    /** 滚动条粗细 */
    size?: number
    /** 常显还是滚动时才显示 */
    always?: boolean
    /** 是否原生滚动（无障碍更好，样式由浏览器决定） */
    native?: boolean
  }>(),
  { maxHeight: undefined, size: 8, always: false, native: false },
)

const wrap = ref<HTMLElement | null>(null)
const view = ref<HTMLElement | null>(null)

/** 滑块几何（px / 比例） */
const thumb = ref({ top: 0, height: 0 })
const showThumb = ref(false)
const hovering = ref(false)
const dragging = ref(false)

/** 内容是否真的溢出 */
const overflow = ref(false)
let ro: ResizeObserver | null = null
let mo: MutationObserver | null = null

function measure() {
  const v = view.value
  const w = wrap.value
  if (!v || !w) return
  const { scrollHeight, clientHeight, scrollTop } = v
  overflow.value = scrollHeight > clientHeight + 1
  if (!overflow.value) {
    showThumb.value = false
    return
  }
  /*
   * 滑块高度按「可视区 / 内容总高」比例算，但要设最小高度：
   * 内容极长时比例会小于手指能抓的尺寸（实测 <16px 就很难拖）。
   */
  const trackH = w.clientHeight
  const ratio = clientHeight / scrollHeight
  const h = Math.max(28, Math.round(trackH * ratio))
  const maxTop = trackH - h
  const maxScroll = scrollHeight - clientHeight
  const top = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0
  thumb.value = { top, height: h }
  showThumb.value = true
}

function onScroll() {
  measure()
}

/* ---------------- 拖动 ---------------- */
let dragStartY = 0
let dragStartTop = 0

function onThumbDown(e: PointerEvent) {
  const v = view.value
  const w = wrap.value
  if (!v || !w) return
  e.preventDefault()
  dragging.value = true
  dragStartY = e.clientY
  dragStartTop = thumb.value.top
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
}

function onThumbMove(e: PointerEvent) {
  if (!dragging.value) return
  const v = view.value
  const w = wrap.value
  if (!v || !w) return
  const delta = e.clientY - dragStartY
  const maxTop = w.clientHeight - thumb.value.height
  if (maxTop <= 0) return
  const nextTop = Math.max(0, Math.min(dragStartTop + delta, maxTop))
  const maxScroll = v.scrollHeight - v.clientHeight
  v.scrollTop = (nextTop / maxTop) * maxScroll
}

function onThumbUp(e: PointerEvent) {
  dragging.value = false
  ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
}

/** 点击轨道空白处：翻页跳转（不是直接跳到底，符合滚动条直觉） */
function onTrackDown(e: MouseEvent) {
  const v = view.value
  const w = wrap.value
  if (!v || !w) return
  const rect = w.getBoundingClientRect()
  const y = e.clientY - rect.top
  const page = v.clientHeight
  if (y < thumb.value.top) v.scrollTop -= page
  else v.scrollTop += page
  measure()
}

/** 滚轮事件不需要拦：原生滚动已经工作，只需同步滑块 */

watch(
  () => props.maxHeight,
  () => nextTick(measure),
)

onMounted(async () => {
  await nextTick()
  measure()
  const v = view.value
  const w = wrap.value
  if (!v || !w) return

  v.addEventListener('scroll', onScroll, { passive: true })
  w.addEventListener('mouseenter', () => { hovering.value = true })
  w.addEventListener('mouseleave', () => { hovering.value = false })

  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => measure())
    ro.observe(v)
    ro.observe(w)
  }
  /*
   * 内容变化（v-if 增删、图片加载撑高）时 scrollHeight 会变，
   * ResizeObserver 只观察元素自身尺寸，观察不到内部内容变高 ——
   * 所以再挂一个 MutationObserver 兜住。
   */
  if (typeof MutationObserver !== 'undefined') {
    mo = new MutationObserver(() => measure())
    mo.observe(v, { childList: true, subtree: true, characterData: true })
  }
})

onBeforeUnmount(() => {
  view.value?.removeEventListener('scroll', onScroll)
  ro?.disconnect()
  mo?.disconnect()
})

const wrapStyle = computed(() => {
  if (props.maxHeight === undefined) return {}
  return {
    maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
  }
})

const visible = computed(() => props.always || hovering.value || dragging.value)
</script>

<template>
  <div
    ref="wrap"
    class="wd-scrollbar"
    :class="{ 'is-hover': visible, 'is-overflow': overflow }"
    :style="wrapStyle"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div ref="view" class="wd-scrollbar__view" :class="{ 'is-native': native }">
      <slot />
    </div>

    <!--
      自定义滑块。
      ⚠️ 原生滚动条用 CSS 隐藏（scrollbar-width: none + ::-webkit-scrollbar），
      但**滚动能力完全保留** —— 用 JS 模拟滚动会丢失惯性、键盘、触控板支持。
      这是本组件最容易写错的地方：要「只换外观，不换滚动机制」。
    -->
    <div
      v-if="!native && overflow"
      class="wd-scrollbar__track"
      :class="{ 'is-visible': visible }"
      :style="{ width: size + 'px' }"
      @mousedown.self="onTrackDown"
    >
      <div
        class="wd-scrollbar__thumb"
        :class="{ 'is-dragging': dragging }"
        :style="{ top: thumb.top + 'px', height: thumb.height + 'px' }"
        @pointerdown="onThumbDown"
        @pointermove="onThumbMove"
        @pointerup="onThumbUp"
        @pointercancel="onThumbUp"
      ></div>
    </div>
  </div>
</template>
