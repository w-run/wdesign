<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useDismiss } from './anchor'
import { useOverlayLayer } from './overlay-stack'

defineOptions({ name: 'WdSegmented' })

type Option = string | { label: string; value: string | number }
type Mode = 'flat' | 'scroll' | 'dropdown'

const props = withDefaults(
  defineProps<{
    /** v-model 绑的选中值 */
    modelValue?: string | number
    /** 选项列表，字符串即 label 与 value 相同 */
    options?: Option[]
    /** 占满父级宽度 */
    block?: boolean
    /** 明暗外观，深色背景用 dark */
    tone?: 'light' | 'dark'
    /**
     * 溢出模式：选项过多、单行放不下时的表现
     *   'wrap'   换行（默认，适合少量选项）
     *   'scroll' 始终单行横向滚动 —— 两端渐隐提示，选中项自动滚入视野
     *   'auto'   自动分档：放得下 → 铺开；放不下且 ≤ overflowMax → 滚动；更多 → 下拉
     *            （判据是「实测宽度是否放得下」，而非选项个数，避免长标签误判）
     */
    overflow?: 'wrap' | 'scroll' | 'auto'
    /** auto 模式下，超过多少个选项就从「滚动」降级为「下拉」 */
    overflowMax?: number
  }>(),
  { modelValue: '', options: () => [], block: false, tone: 'light', overflow: 'wrap', overflowMax: 15 },
)

const emit = defineEmits<{
  /** 点击选项时触发，参数为新选中值，用于 v-model */
  (e: 'update:modelValue', value: string | number): void
}>()

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)
const activeLabel = computed(
  () => items.value.find((o) => o.value === props.modelValue)?.label ?? '',
)

const wrap = ref<HTMLElement>()
/** 点击外部关闭 */
const track = ref<HTMLElement>()
const slider = ref<HTMLElement>()

const mode = ref<Mode>('flat')
const canLeft = ref(false)
const canRight = ref(false)
const dropdownOpen = ref(false)
/** 点击外部关闭：统一走 anchor.ts（click 事件，与触发器一致） */
useDismiss([wrap], () => { dropdownOpen.value = false }, dropdownOpen)



/** 层栈：Esc 只关最上层 */
useOverlayLayer(dropdownOpen, wrap, () => { dropdownOpen.value = false; return true })

/* ---------------- 滑块（选中项平移） ---------------- */
/**
 * 首帧禁过渡。
 *
 * 为什么需要：页面加载时滑块初始在 x=0（CSS 的 left:0），
 * 若首次设置 transform 时已有 transition，用户会看到一个
 * 「从左滑到选中项」的动画 —— 那是初始状态，不是状态变化。
 *
 * ⚠️ 踩坑记录：
 * 最初用 `s.style.transition = 'none'` → rAF 里恢复。两个问题：
 *   1. rAF 在无头/后台环境**完全不回调**（document.hidden=true 时
 *      浏览器不调度渲染帧），滑块永远停在 transition:none
 *   2. `sliderPlaced` 是模块级变量，多个实例共享 —— 第一个实例
 *      置位后，第二个实例就跳过了首帧处理
 *
 * 现在改用**类名 + CSS** 控制，不碰内联样式：
 *   · 首帧给滑块加 `.is-initial`，CSS 里 `transition: none`
 *   · 用双 rAF + setTimeout 双保险移除（任一先到即可）
 *   · 标志位改成每个实例自己的 ref
 */
const sliderSettled = ref(false)

function updateSlider() {
  const t = track.value
  const s = slider.value
  if (!t || !s || mode.value === 'dropdown') return
  const active = t.querySelector<HTMLElement>('.wd-segmented__item--active')
  if (!active) return

  if (!sliderSettled.value) {
    s.classList.add('is-initial')
    place(active, s)
    const settle = () => {
      if (sliderSettled.value) return
      s.classList.remove('is-initial')
      sliderSettled.value = true
    }
    // rAF 优先（有渲染的环境最准），setTimeout 兜底（后台/无头环境）
    requestAnimationFrame(settle)
    setTimeout(settle, 60)
    return
  }
  place(active, s)
}

/** 把滑块移到激活项的位置（绝对值，不累积漂移） */
function place(active: HTMLElement, s: HTMLElement) {
  // 滑块与激活项同处 track 坐标系；offsetLeft/Top 不受 transform 影响
  s.style.transform = `translate(${active.offsetLeft - s.offsetLeft}px, ${active.offsetTop - s.offsetTop}px)`
  s.style.width = `${active.offsetWidth}px`
  s.style.height = `${active.offsetHeight}px`
}

/* ---------------- 滚动/自动模式：模式判定 ---------------- */
function measure() {
  const w = wrap.value
  const t = track.value
  if (!t || !w) return

  /*
   * ⚠️ 这里每条分支都必须走到 updateSlider()。
   *
   * 曾经 `overflow === 'wrap'`（默认值）分支直接 `return` 了 ——
   * 于是**默认模式的分段控制在初始化时滑块从不定位**，
   * 必须点一下别的选项（触发 watch(modelValue)）才出现。
   * 非默认模式反而正常，所以这个 bug 很容易被忽略。
   *
   * 统一在函数末尾 nextTick 里更新，任何分支都不提前返回。
   */
  if (props.overflow === 'wrap') {
    mode.value = 'flat'
  } else if (props.overflow === 'scroll') {
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
function onKey(e: KeyboardEvent) {
  // Esc 由层栈统一调度（见下方 useOverlayLayer），这里不再单独处理
}

let ro: ResizeObserver | undefined

onMounted(async () => {
  await nextTick()
  measure()
  window.addEventListener('resize', measure)
  document.addEventListener('keydown', onKey)
  // 容器尺寸变化（侧栏展开/窗口缩放）时重新判定模式
  if (typeof ResizeObserver !== 'undefined' && wrap.value) {
    ro = new ResizeObserver(() => measure())
    ro.observe(wrap.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
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
</script>

<template>
  <div
    ref="wrap"
    class="wd-segmented-wrap"
    :class="{
      'wd-segmented-wrap--auto': overflow === 'auto',
      'wd-segmented-wrap--scroll': mode === 'scroll',
      'wd-segmented-wrap--measuring': mode === 'dropdown',
      'wd-segmented-wrap--fade-l': canLeft,
      'wd-segmented-wrap--fade-r': canRight,
    }"
  >
    <div
      ref="track"
      class="wd-segmented"
      :class="{ 'wd-segmented--block': block, 'wd-segmented--dark': tone === 'dark' }"
      :aria-hidden="mode === 'dropdown'"
      role="tablist"
      @scroll="updateFades"
    >
      <span ref="slider" class="wd-segmented__slider"></span>
      <button
        v-for="o in items"
        :key="o.value"
        type="button"
        role="tab"
        class="wd-segmented__item"
        :class="{ 'wd-segmented__item--active': o.value === modelValue }"
        :aria-selected="o.value === modelValue"
        :tabindex="mode === 'dropdown' ? -1 : 0"
        @click="emit('update:modelValue', o.value)"
      >
        {{ o.label }}
      </button>
    </div>

    <!-- 选项过多：降级为下拉筛选 -->
    <div v-if="mode === 'dropdown'" class="wd-segmented-picker">
      <button
        type="button"
        class="wd-segmented-picker__trigger"
        :aria-haspopup="'listbox'"
        :aria-expanded="dropdownOpen"
        @click="dropdownOpen = !dropdownOpen"
      >
        <span class="wd-segmented-picker__label">{{ activeLabel }}</span>
        <span class="wd-segmented-picker__meta">{{ items.length }} 项</span>
        <wd-icon class="wd-segmented-picker__caret" :class="{ 'is-open': dropdownOpen }" name="chevron-down" :size="16" />
      </button>
      <div v-if="dropdownOpen" class="wd-segmented-picker__panel" role="listbox">
        <button
          v-for="o in items"
          :key="o.value"
          type="button"
          role="option"
          :aria-selected="o.value === modelValue"
          class="wd-segmented-picker__option"
          :class="{ 'wd-segmented-picker__option--active': o.value === modelValue }"
          @click="pick(o.value)"
        >
          <span>{{ o.label }}</span>
          <wd-icon v-if="o.value === modelValue" name="check" :size="15" />
        </button>
      </div>
    </div>
  </div>
</template>
