<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

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

/* ---------------- 选中滑块（与 WdSegmented 同一套做法） ---------------- */
/**
 * Tabs 与 Segmented 视觉几乎一致，但之前 Tabs 只有"选中项换底色"，
 * 切换时是硬切。这里补一个平滑滑动的指示块，让两者行为对齐。
 *
 * 用 offsetLeft/offsetWidth 而非 getBoundingClientRect：
 *   offset* 是相对 offsetParent 的布局值，不受 transform 影响，
 *   而滑块本身就是被 transform 移动的 —— 用 rect 会读到上一帧的位置。
 */
const root = ref<HTMLElement | null>(null)
const slider = ref<HTMLElement | null>(null)
const sliderReady = ref(false)

function updateSlider() {
  const r = root.value
  const s = slider.value
  if (!r || !s) return
  const active = r.querySelector<HTMLElement>('.wd-tabs__item--active')
  if (!active) { s.style.opacity = '0'; return }
  s.style.opacity = '1'
  s.style.width = active.offsetWidth + 'px'
  s.style.height = active.offsetHeight + 'px'
  s.style.transform = `translate(${active.offsetLeft - s.offsetLeft}px, ${active.offsetTop - s.offsetTop}px)`
}

/**
 * 首帧禁过渡：页面加载时滑块应从 0 直接落位，而不是"滑进来"。
 * 与 Segmented 踩过的坑一致 —— 用类名控制而非内联 transition，
 * 且 rAF 在后台/无头环境不回调，必须用 setTimeout 兜底。
 */
function settleSlider() {
  if (sliderReady.value) return
  slider.value?.classList.remove('is-initial')
  sliderReady.value = true
}

onMounted(async () => {
  slider.value?.classList.add('is-initial')
  await nextTick()
  updateSlider()
  requestAnimationFrame(settleSlider)
  window.setTimeout(settleSlider, 60)
  window.addEventListener('resize', updateSlider)
})

watch(() => props.modelValue, () => nextTick(updateSlider))
watch(() => props.tabs, () => nextTick(updateSlider), { deep: true })
</script>

<template>
  <div
    ref="root"
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
    <span ref="slider" class="wd-tabs__slider"></span>

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
        <wd-icon name="close" :size="10" />
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
      <wd-icon name="plus" :size="14" />
    </button>
  </div>
</template>
