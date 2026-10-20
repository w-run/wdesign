<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ name: 'WdBacktop' })

const props = withDefaults(
  defineProps<{
    /** 滚动多少像素后出现 */
    visibilityHeight?: number
    /** 距离视口右边 / 底边的距离 */
    right?: number
    bottom?: number
    /** 滚回顶部的时长（ms） */
    duration?: number
    /** 监听滚动的容器选择器；不传则监听 window */
    target?: string
    /** 是否即时定位（不滚动） */
    instant?: boolean
  }>(),
  {
    visibilityHeight: 320,
    right: 24,
    bottom: 24,
    duration: 420,
    target: '',
    instant: false,
  },
)

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const visible = ref(false)

/** 实际监听对象：window 或某个滚动容器 */
let scrollEl: HTMLElement | Window | null = null

function readScrollTop(): number {
  if (scrollEl === window || scrollEl === null) {
    return window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0
  }
  return (scrollEl as HTMLElement).scrollTop
}

function onScroll() {
  visible.value = readScrollTop() > props.visibilityHeight
}

/**
 * 平滑滚动。
 *
 * 为什么不用 `scrollTo({ behavior: 'smooth' })`：
 *   · Safari 15 之前不支持 behavior 参数（直接跳变，没有动画）
 *   · 无头/后台环境动画时钟停摆时它可能永不触发 scroll 事件
 *   · 无法控制时长
 * 自己用 rAF 插值，行为可控，且能处理 clock 停摆的兜底。
 */
let raf = 0

function scrollToTop() {
  const from = readScrollTop()
  if (from <= 0) return

  if (props.instant) {
    scrollTo(from > 0 ? 0 : 0, true)
    return
  }

  const start = performance.now()
  const dur = Math.max(1, props.duration)

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / dur)
    // easeOutCubic：起步快、收尾缓，符合「回到顶部」的直觉
    const eased = 1 - Math.pow(1 - t, 3)
    scrollTo(from * (1 - eased), true)
    if (t < 1) raf = requestAnimationFrame(step)
    else raf = 0
  }

  raf = requestAnimationFrame(step)

  /*
   * 兜底：rAF 在后台标签页 / 无头环境完全不回调（document.hidden=true
   * 时浏览器不调度渲染帧）。此时直接跳到顶部，避免"点了没反应"。
   */
  window.setTimeout(() => {
    if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
      if (readScrollTop() > 0) scrollTo(0, false)
    }
  }, dur + 120)
}

function scrollTo(top: number, smooth: boolean) {
  if (scrollEl === window || scrollEl === null) {
    // 直接改 scrollTop 而不是 scrollTo：后者在部分容器上忽略 behavior
    if (smooth) window.scrollTo({ top, behavior: 'auto' })
    else window.scrollTo(0, top)
  } else {
    ;(scrollEl as HTMLElement).scrollTop = top
  }
}

function onClick(e: MouseEvent) {
  scrollToTop()
  emit('click', e)
}

onMounted(() => {
  if (props.target) {
    scrollEl = document.querySelector<HTMLElement>(props.target)
    if (!scrollEl) {
      // 选择器写错时不该静默失效 —— 退回 window 至少按钮还能用
      scrollEl = window
    }
  } else {
    scrollEl = window
  }

  scrollEl.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  scrollEl?.removeEventListener('scroll', onScroll)
  if (raf) { cancelAnimationFrame(raf); raf = 0 }
})

const style = computed(() => ({
  right: props.right + 'px',
  bottom: props.bottom + 'px',
}))
</script>

<template>
  <button
    type="button"
    class="wd-backtop"
    :class="{ 'is-visible': visible }"
    :style="style"
    :aria-hidden="!visible"
    :tabindex="visible ? 0 : -1"
    aria-label="回到顶部"
    @click="onClick"
  >
    <slot>
      <wd-icon name="arrow-up" :size="18" />
    </slot>
  </button>
</template>
