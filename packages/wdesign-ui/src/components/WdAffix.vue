<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ name: 'WdAffix' })

const props = withDefaults(
  defineProps<{
    /**
     * 吸附位置：
     *  top    — 滚动到阈值后吸在顶部
     *  bottom — 吸在底部
     */
    position?: 'top' | 'bottom'
    /** 距视口边缘的距离 */
    offset?: number
    /** 滚动多少后开始吸附；不传则用元素自身位置 */
    target?: number | string
    /** 吸附时是否撑满原宽度（避免 fixed 后宽度塌陷） */
    keepWidth?: boolean
    /** 滚动容器选择器；不传则监听 window */
    container?: string
    /** 吸附时的 z-index */
    zIndex?: number
  }>(),
  {
    position: 'top',
    offset: 0,
    target: undefined,
    keepWidth: true,
    container: '',
    zIndex: 900,
  },
)

const emit = defineEmits<{ change: [affixed: boolean] }>()

const root = ref<HTMLElement | null>(null)
const affixed = ref(false)
/**
 * 吸附时用于占位的尺寸，避免脱离文档流后布局跳动。
 * left 也在吸附前记录 —— 吸附后元素已脱离文档流，
 * 再读 getBoundingClientRect 拿到的是 fixed 后的位置，不能用来定位。
 */
const placeholder = ref({ width: 0, height: 0, left: 0 })
/** 元素原始位置（文档坐标），用于判断是否到达阈值 */
const naturalTop = ref(0)

let scrollEl: HTMLElement | Window | null = null
let raf = 0

function readScrollTop(): number {
  if (!scrollEl || scrollEl === window) {
    return window.scrollY ?? window.pageYOffset ?? 0
  }
  return (scrollEl as HTMLElement).scrollTop
}

/** 滚动容器顶部在文档中的位置（容器内滚动时阈值要相对容器算） */
function containerTop(): number {
  if (!scrollEl || scrollEl === window) return 0
  return (scrollEl as HTMLElement).getBoundingClientRect().top
}

function measure() {
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  placeholder.value = { width: r.width, height: r.height, left: r.left }
  /*
   * naturalTop 记录的是「未吸附状态下元素顶端距滚动起点多远」。
   * 用 rect.top - containerTop() + scrollTop 换算成滚动坐标系，
   * 这样容器滚动时也能得到稳定的阈值。
   */
  naturalTop.value = r.top - containerTop() + readScrollTop()
}

function computeThreshold(): number {
  if (typeof props.target === 'number') return props.target
  if (typeof props.target === 'string' && props.target) {
    const el = document.querySelector<HTMLElement>(props.target)
    if (el) return el.getBoundingClientRect().bottom
  }
  // 没指定就用元素自身位置：吸顶时"元素顶部到达 offset"即触发
  return props.position === 'top' ? naturalTop.value - props.offset : 0
}

function update() {
  raf = 0
  const sTop = readScrollTop()
  const threshold = computeThreshold()

  let next: boolean
  if (props.position === 'top') {
    next = sTop >= threshold
  } else {
    /*
     * 吸底：元素底部进入视口下方才触发。
     * 用「滚动到底还剩多少」判断比用绝对坐标稳 ——
     * 内容高度变化时不需要重新测量。
     */
    const el = scrollEl && scrollEl !== window ? (scrollEl as HTMLElement) : document.documentElement
    const viewH = scrollEl && scrollEl !== window
      ? (scrollEl as HTMLElement).clientHeight
      : window.innerHeight
    const maxScroll = el.scrollHeight - viewH
    next = maxScroll - sTop <= threshold
  }

  if (next !== affixed.value) {
    // 吸附前先量一次，保证占位尺寸是「未吸附」状态的真实尺寸
    if (next) measure()
    affixed.value = next
    emit('change', next)
  }
}

function schedule() {
  if (raf) return
  raf = requestAnimationFrame(update)
  // rAF 在后台/无头环境不回调，setTimeout 兜底
  window.setTimeout(() => { if (raf) { cancelAnimationFrame(raf); raf = 0; update() } }, 40)
}

const style = computed(() => {
  if (!affixed.value) return {}
  const s: Record<string, string> = {
    position: 'fixed',
    /*
     * left 用**吸附前记录的值**，不能现读 rect。
     * 吸附后 root 已被 fixed 接管，rect.left 会等于 fixed 后的位置，
     * 发生"每帧左移一点"的漂移。
     */
    left: placeholder.value.left + 'px',
    zIndex: String(props.zIndex),
  }
  if (props.keepWidth) s.width = placeholder.value.width + 'px'
  if (props.position === 'top') s.top = props.offset + 'px'
  else s.bottom = props.offset + 'px'
  return s
})

onMounted(() => {
  scrollEl = props.container
    ? document.querySelector<HTMLElement>(props.container) ?? window
    : window
  scrollEl.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  // 首次测量延一帧：等字体/layout 稳定，否则量到的是过渡态尺寸
  requestAnimationFrame(() => { measure(); update() })
  // rAF 不回调时兜底
  window.setTimeout(() => { measure(); update() }, 60)
})

onBeforeUnmount(() => {
  scrollEl?.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="root" class="wd-affix" :class="{ 'is-affixed': affixed }">
    <!-- 吸附时用占位撑住原空间，避免页面内容跳动 -->
    <div
      v-if="affixed"
      class="wd-affix__placeholder"
      :style="{ width: placeholder.width + 'px', height: placeholder.height + 'px' }"
      aria-hidden="true"
    ></div>
    <div class="wd-affix__content" :style="style">
      <slot />
    </div>
  </div>
</template>
