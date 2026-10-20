<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, onBeforeUnmount, ref } from 'vue'

defineOptions({ name: 'WdSortableList' })

type Item = string | { label: string }

const props = withDefaults(
  defineProps<{
    modelValue?: Item[]
  }>(),
  { modelValue: () => [] },
)

const emit = defineEmits<{
  (e: 'update:modelValue', items: Item[]): void
  (e: 'change', items: Item[]): void
}>()

const list = ref<HTMLElement | null>(null)

function labelOf(it: Item) {
  return typeof it === 'string' ? it : it.label
}

/* ---------------------------------------------------------------
 * 拖动实现：Pointer Events（而非 HTML5 拖放）
 *
 * 原先用 draggable + dragstart/dragover/drop —— 这套 API 在**触屏**和
 * 部分内嵌 WebView 中根本不触发，表现为「拖不动」。Pointer Events
 * 统一覆盖鼠标 / 触摸 / 触控笔，且能自己控制阈值与插入位置。
 * --------------------------------------------------------------- */

const DRAG_THRESHOLD = 4

const dragging = ref(false)
const fromIndex = ref(-1)
const overIndex = ref(-1)
const ghost = ref<{ top: number; left: number; width: number; label: string } | null>(null)

let startY = 0
let startX = 0
let armed = false

function itemEls(): HTMLElement[] {
  if (!list.value) return []
  return Array.from(list.value.querySelectorAll<HTMLElement>('.wd-sortable__item'))
}

function computeOver(y: number): number {
  const els = itemEls()
  for (let i = 0; i < els.length; i++) {
    const r = els[i].getBoundingClientRect()
    if (y < r.top + r.height / 2) return i
  }
  return els.length
}

function onPointerDown(e: PointerEvent, i: number) {
  if (e.button !== undefined && e.button !== 0) return
  armed = true
  dragging.value = false
  fromIndex.value = i
  startY = e.clientY
  startX = e.clientX
  // setPointerCapture 在元素未真正处于活动指针状态时会抛 NotFoundError，
  // 且会中断整个 handler —— 必须包起来，不能让捕获失败拖垮拖拽本身。
  try {
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  } catch { /* 忽略：window 上的监听已足够 */ }
  window.addEventListener('pointermove', onPointerMove, { passive: false })
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(e: PointerEvent) {
  if (!armed) return
  if (!dragging.value) {
    if (Math.abs(e.clientY - startY) < DRAG_THRESHOLD &&
        Math.abs(e.clientX - startX) < DRAG_THRESHOLD) return
    dragging.value = true
    const el = itemEls()[fromIndex.value]
    if (el) {
      const r = el.getBoundingClientRect()
      /*
       * 记录「抓取点在元素内的相对位置」。
       *
       * ⚠️ 不能像之前那样在 move 里写死 `e.clientY - 20`：
       *   rect.top 是元素顶部，clientY 是指针位置，
       *   两者相差一个"手指按在元素哪个高度"的量。
       *   写死 20px 会让克隆块在拖动开始的瞬间**向上跳**，
       *   而且行高变化时跳得更厉害（实测偏移接近 30px）。
       * 记住 grabOffsetY，move 时保持同样的相对位置即可。
       */
      grabOffsetY = e.clientY - r.top
      ghost.value = {
        top: r.top,
        left: r.left,
        width: r.width,
        label: labelOf(props.modelValue[fromIndex.value]),
      }
    }
  }
  if (e.cancelable) e.preventDefault()
  if (ghost.value) ghost.value.top = e.clientY - grabOffsetY
  overIndex.value = computeOver(e.clientY)
}

function onPointerUp() {
  if (dragging.value && fromIndex.value >= 0 && overIndex.value >= 0) {
    let to = overIndex.value
    if (to > fromIndex.value) to -= 1
    if (to !== fromIndex.value) {
      const arr = [...props.modelValue]
      const [moved] = arr.splice(fromIndex.value, 1)
      arr.splice(to, 0, moved)
      emit('update:modelValue', arr)
      emit('change', arr)
    }
  }
  cleanup()
}

function cleanup() {
  armed = false
  dragging.value = false
  fromIndex.value = -1
  overIndex.value = -1
  ghost.value = null
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
}

onBeforeUnmount(cleanup)

const dropLineTop = computed(() => {
  if (!dragging.value || overIndex.value < 0 || !list.value) return null
  const els = itemEls()
  if (!els.length) return null
  const base = list.value.getBoundingClientRect()
  const i = overIndex.value
  return i < els.length
    ? els[i].getBoundingClientRect().top - base.top
    : els[els.length - 1].getBoundingClientRect().bottom - base.top
})
</script>

<template>
  <div class="wd-sortable" ref="list" :class="{ 'wd-sortable--dragging': dragging }">
    <div
      v-for="(it, i) in modelValue"
      :key="i"
      class="wd-sortable__item"
      :class="{
        'wd-sortable__item--drag': dragging && fromIndex === i,
        'wd-sortable__item--over': dragging && overIndex === i && fromIndex !== i,
      }"
      @pointerdown="onPointerDown($event, i)"
    >
      <span class="wd-sortable__handle" aria-hidden="true">
        <wd-icon name="dots-drag" :size="14" />
      </span>
      <span class="wd-sortable__label">{{ labelOf(it) }}</span>
    </div>

    <div v-if="dropLineTop !== null" class="wd-sortable__drop-line" :style="{ top: dropLineTop + 'px' }"></div>
  </div>

  <Teleport to="body">
    <div
      v-if="ghost"
      class="wd-sortable__clone"
      :style="{ top: ghost.top + 'px', left: ghost.left + 'px', width: ghost.width + 'px' }"
    >
      <span class="wd-sortable__handle" aria-hidden="true">
        <wd-icon name="dots-drag" :size="14" />
      </span>
      <span class="wd-sortable__label">{{ ghost.label }}</span>
    </div>
  </Teleport>
</template>
