<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

defineOptions({ name: 'WdSplitter' })

const props = withDefaults(
  defineProps<{
    /** 方向：横向（左右分栏）/ 纵向（上下分栏） */
    direction?: 'horizontal' | 'vertical'
    /** 受控：主栏占用的百分比（0-100） */
    modelValue?: number
    /** 非受控初值 */
    defaultValue?: number
    /** 最小百分比 */
    min?: number
    /** 最大百分比 */
    max?: number
    /** 分隔条粗细（px） */
    size?: number
    /** 禁用拖拽 */
    disabled?: boolean
  }>(),
  {
    direction: 'horizontal',
    modelValue: undefined,
    defaultValue: 50,
    min: 10,
    max: 90,
    size: 6,
    disabled: false,
  },
)

const emit = defineEmits<{
  /** v-model 更新：拖拽结束或键盘调节结束时触发，参数为主栏百分比 */
  'update:modelValue': [value: number]
  /** 拖拽中持续触发（适合做实时预览） */
  resize: [value: number]
  /** 拖拽结束触发（适合做持久化） */
  resizeEnd: [value: number]
}>()

const root = ref<HTMLElement | null>(null)
const inner = ref(props.defaultValue)
const isControlled = computed(() => props.modelValue !== undefined)
const ratio = computed(() => (isControlled.value ? props.modelValue! : inner.value))

/**
 * 拖拽状态。
 *
 * ⚠️ 拖拽期间不要每帧 `setRatio` 再读回 props ——
 * 受控模式下父组件可能异步更新，读回的是旧值，会"拖不动"。
 * 所以拖拽中以本地 lastRatio 为准，结束时才 emit。
 */
let dragging = false
let lastRatio = 0

function clamp(v: number) {
  return Math.max(props.min, Math.min(props.max, v))
}

function apply(v: number, final = false) {
  const c = clamp(v)
  lastRatio = c
  if (!isControlled.value) inner.value = c
  emit('resize', c)
  if (final) {
    emit('update:modelValue', c)
    emit('resizeEnd', c)
  }
}

function ratioFromEvent(e: PointerEvent): number | null {
  const el = root.value
  if (!el) return null
  const r = el.getBoundingClientRect()
  if (props.direction === 'horizontal') {
    if (r.width === 0) return null
    return ((e.clientX - r.left) / r.width) * 100
  }
  if (r.height === 0) return null
  return ((e.clientY - r.top) / r.height) * 100
}

function onDown(e: PointerEvent) {
  if (props.disabled) return
  e.preventDefault()
  dragging = true
  lastRatio = ratio.value
  ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  document.body.style.cursor = props.direction === 'horizontal' ? 'col-resize' : 'row-resize'
  // 拖拽时禁止选中文本，否则会拖出一片蓝色选区
  document.body.style.userSelect = 'none'
}

function onMove(e: PointerEvent) {
  if (!dragging) return
  const v = ratioFromEvent(e)
  if (v !== null) apply(v)
}

function onUp(e: PointerEvent) {
  if (!dragging) return
  dragging = false
  ;(e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  emit('update:modelValue', lastRatio)
  emit('resizeEnd', lastRatio)
}

/* ---------------- 键盘 ---------------- */
function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  const step = e.shiftKey ? 10 : 2
  const forward = props.direction === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
  const back = props.direction === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
  if (e.key === forward) { e.preventDefault(); apply(ratio.value + step, true) }
  else if (e.key === back) { e.preventDefault(); apply(ratio.value - step, true) }
  else if (e.key === 'Home') { e.preventDefault(); apply(props.min, true) }
  else if (e.key === 'End') { e.preventDefault(); apply(props.max, true) }
}

/** 双击分隔条：回到初始比例 */
function onDblClick() {
  if (props.disabled) return
  apply(props.defaultValue, true)
}

onBeforeUnmount(() => {
  // 万一在拖拽中卸载，别把 body 的样式留在原地
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
})

watch(
  () => props.modelValue,
  (v) => { if (v !== undefined) lastRatio = v },
)

const firstStyle = computed(() =>
  props.direction === 'horizontal'
    ? { width: `calc(${ratio.value}% - ${props.size / 2}px)` }
    : { height: `calc(${ratio.value}% - ${props.size / 2}px)` },
)

const secondStyle = computed(() => ({ flex: '1 1 0', minWidth: '0', minHeight: '0' }))
</script>

<template>
  <div
    ref="root"
    class="wd-splitter"
    :class="[`wd-splitter--${direction}`, { 'is-dragging': dragging, 'is-disabled': disabled }]"
  >
    <div class="wd-splitter__pane" :style="firstStyle">
      <slot name="first" />
    </div>

    <!--
      分隔条：role="separator" + aria-valuenow 是无障碍标准做法，
      键盘左右/上下箭头可调节，Home/End 到两端。
    -->
    <div
      class="wd-splitter__bar"
      :style="direction === 'horizontal' ? { width: size + 'px' } : { height: size + 'px' }"
      role="separator"
      tabindex="0"
      :aria-orientation="direction === 'horizontal' ? 'vertical' : 'horizontal'"
      :aria-valuenow="Math.round(ratio)"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-label="`分隔条 ${Math.round(ratio)}%`"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
      @keydown="onKeydown"
      @dblclick="onDblClick"
    >
      <!-- 抓握提示：三根短横线，只有 hover/拖拽时才显形 -->
      <span class="wd-splitter__grip" :class="{ 'is-visible': !disabled }"></span>
    </div>

    <div class="wd-splitter__pane wd-splitter__pane--second" :style="secondStyle">
      <slot name="second" />
    </div>
  </div>
</template>
