<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ name: 'WdCarousel' })

export interface WdCarouselItem {
  label?: string
  src?: string
  alt?: string
}

const props = withDefaults(
  defineProps<{
    items?: WdCarouselItem[]
    height?: number
    autoplay?: number
    showDots?: boolean
    showArrows?: boolean
    /** 首尾无缝循环（默认开启）：末张→首张不倒退整条轨道 */
    loop?: boolean
  }>(),
  { items: () => [], height: 260, autoplay: 0, showDots: true, showArrows: true, loop: true },
)

const PALETTE = ['var(--wd-tint-2)', 'var(--wd-success-soft)', 'var(--wd-warning-soft)', 'var(--wd-field)']

const root = ref<HTMLElement | null>(null)
const n = () => props.items.length
const looping = () => props.loop && n() > 1

/**
 * 无缝循环：在首尾各克隆一张 —— [末] 1 2 3 [首]
 * 滑到克隆位后，等 transitionend 再**无动画**跳回真身，
 * 于是末→首、首→末都看不出倒退。
 */
const slides = computed(() => {
  const list = props.items
  if (!list.length) return []
  if (!looping()) return list.map((it, i) => ({ it, real: i, key: 'r' + i }))
  return [
    { it: list[list.length - 1], real: list.length - 1, key: 'c-head' },
    ...list.map((it, i) => ({ it, real: i, key: 'r' + i })),
    { it: list[0], real: 0, key: 'c-tail' },
  ]
})

/** 轨道位置（有 loop 时整体右移一格，pos=1 对应急真实第 0 张） */
const pos = ref(looping() ? 1 : 0)
const animating = ref(true)
const dragX = ref(0)

const current = computed(() => {
  const total = n() || 1
  return ((pos.value - (looping() ? 1 : 0)) % total + total) % total
})

const trackStyle = computed(() => ({
  transform: `translateX(calc(-${pos.value * 100}% + ${dragX.value}px))`,
  transition: animating.value ? undefined : 'none',
}))

function go(i: number) {
  if (!n()) return
  animating.value = true
  pos.value = (looping() ? 1 : 0) + i
  scheduleSettle()
  restart()
}

function next() {
  if (!n()) return
  animating.value = true
  pos.value += 1
  if (!looping()) pos.value = pos.value % n()
  scheduleSettle()
  restart()
}

function prev() {
  if (!n()) return
  animating.value = true
  pos.value -= 1
  if (!looping()) pos.value = (pos.value + n()) % n()
  scheduleSettle()
  restart()
}

/**
 * 过渡结束：站在克隆位就无动画跳回真身。
 * ⚠️ 不能只依赖 transitionend —— 动画时钟停摆（后台标签页、无头渲染、
 * 系统「减弱动态效果」）时该事件不会来，位置会一路累积（-900%、-1200%…）。
 * 因此另设一个兜底定时器，时长取 CSS 过渡的 0.45s + 余量。
 */
const SETTLE_MS = 500
let settleTimer: number | null = null

function scheduleSettle() {
  if (settleTimer) window.clearTimeout(settleTimer)
  if (!looping()) return
  settleTimer = window.setTimeout(normalize, SETTLE_MS)
}

function normalize() {
  if (!looping()) return
  if (pos.value === 0) jumpTo(n())
  else if (pos.value === n() + 1) jumpTo(1)
}

function onTransitionEnd() {
  if (settleTimer) { window.clearTimeout(settleTimer); settleTimer = null }
  normalize()
}

function jumpTo(target: number) {
  animating.value = false
  pos.value = target
  // 两帧后恢复动画，确保「瞬时归位」不被合成到同一次绘制里
  requestAnimationFrame(() => requestAnimationFrame(() => { animating.value = true }))
}

let timer: number | null = null
function restart() {
  stop()
  if (props.autoplay > 0 && n() > 1) timer = window.setInterval(next, props.autoplay)
}
function stop() {
  if (timer) { window.clearInterval(timer); timer = null }
}
onMounted(() => {
  pos.value = looping() ? 1 : 0
  restart()
})
onBeforeUnmount(() => { stop(); detach(); if (settleTimer) window.clearTimeout(settleTimer) })

/* ---------------- 滑动手势 ---------------- */
const THRESHOLD = 40
let startX = 0, startY = 0, swiping = false, decided = false

function onDown(e: PointerEvent) {
  if (n() < 2) return
  if (e.pointerType === 'mouse' && e.button !== 0) return
  swiping = true; decided = false
  startX = e.clientX; startY = e.clientY
  try { (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId) } catch { /* ignore */ }
  window.addEventListener('pointermove', onMove, { passive: false })
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

function onMove(e: PointerEvent) {
  if (!swiping) return
  const dx = e.clientX - startX, dy = e.clientY - startY
  if (!decided) {
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
    if (Math.abs(dy) > Math.abs(dx)) { end(false); return }
    decided = true
    stop()
  }
  if (e.cancelable) e.preventDefault()
  dragX.value = dx
}

function onUp(e: PointerEvent) {
  if (!swiping) return
  const dx = e.clientX - startX
  if (decided && Math.abs(dx) > THRESHOLD) {
    if (dx < 0) next(); else prev()
  }
  end(true)
}

function end(again: boolean) {
  swiping = false; decided = false; dragX.value = 0
  detach()
  if (again) restart()
}

function detach() {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('pointercancel', onUp)
}
</script>

<template>
  <div
    ref="root"
    class="wd-carousel"
    :style="{ height: height + 'px' }"
    @mouseenter="stop"
    @mouseleave="restart"
    @pointerdown="onDown"
  >
    <div class="wd-carousel__track" :style="trackStyle" @transitionend="onTransitionEnd">
      <div
        v-for="s in slides"
        :key="s.key"
        class="wd-carousel__slide"
        :style="{ background: PALETTE[s.real % PALETTE.length] }"
      >
        <slot name="item" :item="s.it" :index="s.real">
          <img v-if="s.it.src" :src="s.it.src" :alt="s.it.alt || ''" class="wd-carousel__img" draggable="false" />
          <span v-else class="wd-carousel__label">{{ s.it.label || `Slide ${s.real + 1}` }}</span>
        </slot>
      </div>
    </div>

    <button
      v-if="showArrows && items.length > 1"
      type="button"
      class="wd-icon-btn wd-carousel__arrow wd-carousel__arrow--prev"
      aria-label="上一张" @pointerdown.stop @click="prev"
    >
      <wd-icon name="chevron-left" :size="15" />
    </button>
    <button
      v-if="showArrows && items.length > 1"
      type="button"
      class="wd-icon-btn wd-carousel__arrow wd-carousel__arrow--next"
      aria-label="下一张" @pointerdown.stop @click="next"
    >
      <wd-icon name="chevron-right" :size="15" />
    </button>

    <div v-if="showDots && items.length > 1" class="wd-carousel__dots">
      <button
        v-for="(_, i) in items"
        :key="i"
        type="button"
        class="wd-carousel__dot"
        :class="{ 'wd-carousel__dot--active': i === current }"
        :aria-label="`第 ${i + 1} 张`"
        @pointerdown.stop @click="go(i)"
      ></button>
    </div>
  </div>
</template>
