<script setup lang="ts">
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
  }>(),
  { items: () => [], height: 260, autoplay: 0, showDots: true, showArrows: true },
)

const PALETTE = ['var(--wd-tint-2)', 'var(--wd-success-soft)', 'var(--wd-warning-soft)', 'var(--wd-field)']

const index = ref(0)
const root = ref<HTMLElement | null>(null)

/** 拖动中的水平位移（px），用于跟手反馈 */
const dragX = ref(0)

const trackStyle = computed(() => ({
  transform: `translateX(calc(-${index.value * 100}% + ${dragX.value}px))`,
  transition: dragX.value === 0 ? undefined : 'none',
}))

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
onBeforeUnmount(() => {
  stop()
  detach()
})

/* ---------------------------------------------------------------
 * 滑动切换：Pointer Events
 * `touch-action: pan-y` 已在样式里声明，横向手势由我们接管、
 * 纵向滚动仍交给浏览器。原先只有箭头和圆点，触屏滑不动。
 * --------------------------------------------------------------- */
const THRESHOLD = 40          // 超过这个位移才翻页
let startX = 0
let startY = 0
let swiping = false
let decided = false
let pid = -1

function onDown(e: PointerEvent) {
  if (props.items.length < 2) return
  if (e.pointerType === 'mouse' && e.button !== 0) return
  swiping = true
  decided = false
  startX = e.clientX
  startY = e.clientY
  pid = e.pointerId
  // 同 WdSortableList：捕获失败不应中断手势
  try {
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  } catch { /* ignore */ }
  window.addEventListener('pointermove', onMove, { passive: false })
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

function onMove(e: PointerEvent) {
  if (!swiping) return
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  if (!decided) {
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
    // 纵向优先 → 交还给页面滚动
    if (Math.abs(dy) > Math.abs(dx)) { end(false); return }
    decided = true
    stop()                    // 手势开始后暂停自动播放
  }
  if (e.cancelable) e.preventDefault()
  // 首尾加阻尼，避免拖出空白
  const atEdge = (index.value === 0 && dx > 0) ||
                 (index.value === props.items.length - 1 && dx < 0)
  dragX.value = atEdge ? dx * 0.35 : dx
}

function onUp(e: PointerEvent) {
  if (!swiping) return
  const dx = e.clientX - startX
  if (decided && Math.abs(dx) > THRESHOLD) {
    go(index.value + (dx < 0 ? 1 : -1))
  }
  end(true)
}

function end(restart: boolean) {
  swiping = false
  decided = false
  dragX.value = 0
  detach()
  if (restart) start()
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
    @mouseleave="start"
    @pointerdown="onDown"
  >
    <div class="wd-carousel__track" :style="trackStyle">
      <div
        v-for="(it, i) in items"
        :key="i"
        class="wd-carousel__slide"
        :style="{ background: PALETTE[i % PALETTE.length] }"
      >
        <slot name="item" :item="it" :index="i">
          <img v-if="it.src" :src="it.src" :alt="it.alt || ''" class="wd-carousel__img" draggable="false" />
          <span v-else class="wd-carousel__label">{{ it.label || `Slide ${i + 1}` }}</span>
        </slot>
      </div>
    </div>

    <button
      v-if="showArrows && items.length > 1"
      type="button"
      class="wd-icon-btn wd-carousel__arrow wd-carousel__arrow--prev"
      aria-label="上一张"
      @pointerdown.stop
      @click="go(index - 1)"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
    </button>
    <button
      v-if="showArrows && items.length > 1"
      type="button"
      class="wd-icon-btn wd-carousel__arrow wd-carousel__arrow--next"
      aria-label="下一张"
      @pointerdown.stop
      @click="go(index + 1)"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>
    </button>

    <div v-if="showDots && items.length > 1" class="wd-carousel__dots">
      <button
        v-for="(_, i) in items"
        :key="i"
        type="button"
        class="wd-carousel__dot"
        :class="{ 'wd-carousel__dot--active': i === index }"
        :aria-label="`第 ${i + 1} 张`"
        @pointerdown.stop
        @click="go(i)"
      ></button>
    </div>
  </div>
</template>
