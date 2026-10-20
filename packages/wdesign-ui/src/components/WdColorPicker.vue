<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, nextTick, ref, watch } from 'vue'
import { useAnchoredPosition, useDismiss } from './anchor'
import { useOverlayLayer } from './overlay-stack'

defineOptions({ name: 'WdColorPicker' })

/* 透明度（alpha 通道）暂未实现：面板只有 HEX / RGB 两个输入，
   将来接 alpha 时再加 showAlpha prop，别在半成品状态暴露给文档 */
const props = withDefaults(
  defineProps<{
    /** 受控色值，格式 #RRGGBB 或 #RGB */
    modelValue?: string
    /** 非受控初始值 */
    defaultValue?: string
    /** 预设色板 */
    presets?: string[]
    /** 是否允许输入色值 */
    editable?: boolean
    /** 尺寸档 sm|md|lg，只改变色块直径（28/34/42px） */
    size?: 'sm' | 'md' | 'lg'
    /** 禁用：不展开浮层，也不参与键盘聚焦 */
    disabled?: boolean
  }>(),
  {
    modelValue: undefined,
    defaultValue: '#D62839',
    presets: () => [
      '#D62839', '#E8590C', '#F2A93B', '#4CAF50', '#2E9E8F',
      '#3B82F6', '#6366F1', '#8B5CF6', '#D946A0', '#191B1F',
      '#6B7280', '#FFFFFF',
    ],
    editable: true,
    size: 'md',
    disabled: false,
  },
)

const emit = defineEmits<{
  /** v-model 更新：参数为归一化后的 #RRGGBB，非法输入不发 */
  'update:modelValue': [value: string]
  /** 取色结果变化时触发，拖动色板与色相条期间会连续触发，参数同 v-model */
  change: [value: string]
}>()

/* ---------------- 受控 / 非受控 ---------------- */
const inner = ref(props.defaultValue)
const isControlled = computed(() => props.modelValue !== undefined)
const color = computed(() => {
  const raw = isControlled.value ? props.modelValue! : inner.value
  return normalizeHex(raw) || '#000000'
})

function commit(v: string) {
  const n = normalizeHex(v)
  if (!n) return
  if (!isControlled.value) inner.value = n
  emit('update:modelValue', n)
  emit('change', n)
}

/* ---------------- 颜色工具 ---------------- */

/** 归一化为 #RRGGBB；非法返回 null */
function normalizeHex(input: string): string | null {
  if (!input) return null
  let s = input.trim().replace(/^#/, '')
  if (/^[0-9a-f]{3}$/i.test(s)) {
    s = s.split('').map((c) => c + c).join('')
  }
  if (!/^[0-9a-f]{6}$/i.test(s)) return null
  return '#' + s.toUpperCase()
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const s = hex.replace('#', '')
  return {
    r: parseInt(s.slice(0, 2), 16),
    g: parseInt(s.slice(2, 4), 16),
    b: parseInt(s.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  const h = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0')
  return ('#' + h(r) + h(g) + h(b)).toUpperCase()
}

/** RGB → HSV（h: 0-360, s/v: 0-1） */
function rgbToHsv(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s: max === 0 ? 0 : d / max, v: max }
}

/** HSV → RGB */
function hsvToRgb(h: number, s: number, v: number) {
  const c = v * s
  const hp = (h % 360) / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))
  let r = 0, g = 0, b = 0
  if (hp < 1) { r = c; g = x }
  else if (hp < 2) { r = x; g = c }
  else if (hp < 3) { g = c; b = x }
  else if (hp < 4) { g = x; b = c }
  else if (hp < 5) { r = x; b = c }
  else { r = c; b = x }
  const m = v - c
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 }
}

/**
 * 当前色的 HSV。
 *
 * ⚠️ 不能直接用 `computed(() => rgbToHsv(color))` ——
 * 用户在色板上拖动时，hue/sat 的微小变化会被 hex 的 8 位量化吃掉，
 * 表现为"拖到某些位置时色块不动"（抖动）。所以拖动期间以本地 HSV 为准。
 */
const localHsv = ref<{ h: number; s: number; v: number } | null>(null)

watch(
  () => color.value,
  (v) => {
    // 外部改色时才覆盖本地 HSV；自身拖动产生的变化不回灌
    const { r, g, b } = hexToRgb(v)
    const next = rgbToHsv(r, g, b)
    const cur = localHsv.value
    if (!cur || Math.abs(cur.h - next.h) > 0.5 || Math.abs(cur.s - next.s) > 0.01 || Math.abs(cur.v - next.v) > 0.01) {
      localHsv.value = next
    }
  },
  { immediate: true },
)

const hsv = computed(() => localHsv.value ?? { h: 0, s: 0, v: 1 })

const hexText = ref('')
watch(
  () => color.value,
  (v) => { hexText.value = v },
  { immediate: true },
)

/* ---------------- 面板 ---------------- */
const open = ref(false)
const mounted = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)

const { pos } = useAnchoredPosition(open, rootEl, panelEl, {
  placement: 'bottom-start',
  gap: 8,
})

const panelStyle = computed(() => ({
  top: pos.value.top + 'px',
  left: pos.value.left + 'px',
}))

function toggle() {
  if (props.disabled) return
  if (open.value) close()
  else {
    mounted.value = true
    open.value = true
  }
}

function close() {
  open.value = false
  window.setTimeout(() => { if (!open.value) mounted.value = false }, 200)
}

useDismiss([rootEl, panelEl], close, open)
useOverlayLayer(open, panelEl, () => { close(); return true })

/* ---------------- 饱和度/明度面板拖动 ---------------- */
const svEl = ref<HTMLElement | null>(null)
let svDragging = false

function updateSv(e: PointerEvent) {
  const el = svEl.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const s = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
  const v = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
  localHsv.value = { ...hsv.value, s, v }
  const { r: rr, g, b } = hsvToRgb(hsv.value.h, s, v)
  commit(rgbToHex(rr, g, b))
}

function onSvDown(e: PointerEvent) {
  svDragging = true
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  updateSv(e)
}
function onSvMove(e: PointerEvent) {
  if (svDragging) updateSv(e)
}
function onSvUp(e: PointerEvent) {
  svDragging = false
  ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
}

/* ---------------- 色相条 ---------------- */
const hueEl = ref<HTMLElement | null>(null)
let hueDragging = false

function updateHue(e: PointerEvent) {
  const el = hueEl.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const h = Math.min(359.999, Math.max(0, ((e.clientX - r.left) / r.width) * 360))
  localHsv.value = { ...hsv.value, h }
  const { r: rr, g, b } = hsvToRgb(h, hsv.value.s, hsv.value.v)
  commit(rgbToHex(rr, g, b))
}

function onHueDown(e: PointerEvent) {
  hueDragging = true
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  updateHue(e)
}
function onHueMove(e: PointerEvent) {
  if (hueDragging) updateHue(e)
}
function onHueUp(e: PointerEvent) {
  hueDragging = false
  ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
}

/* ---------------- 色值输入 ---------------- */
function onHexInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value
  hexText.value = raw
  const n = normalizeHex(raw)
  if (n) {
    const { r, g, b } = hexToRgb(n)
    localHsv.value = rgbToHsv(r, g, b)
    commit(n)
  }
}

function onHexBlur() {
  // 非法输入还原成当前色，避免输入框留着一个无效值
  hexText.value = color.value
}

const rgbText = computed(() => {
  const { r, g, b } = hexToRgb(color.value)
  return `${r}, ${g}, ${b}`
})

/* ---------------- 预设色 ---------------- */
function pickPreset(c: string) {
  const n = normalizeHex(c)
  if (!n) return
  const { r, g, b } = hexToRgb(n)
  localHsv.value = rgbToHsv(r, g, b)
  commit(n)
}

/** 当前色相下的纯色，用作 SV 面板底色 */
const pureHue = computed(() => {
  const { r, g, b } = hsvToRgb(hsv.value.h, 1, 1)
  return rgbToHex(r, g, b)
})

const knobs = computed(() => ({
  svLeft: `${hsv.value.s * 100}%`,
  svTop: `${(1 - hsv.value.v) * 100}%`,
  hueLeft: `${(hsv.value.h / 360) * 100}%`,
}))

const sizePx = computed(() => ({ sm: 28, md: 34, lg: 42 }[props.size]))

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
  else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
}
</script>

<template>
  <div
    ref="rootEl"
    class="wd-colorpicker"
    :class="[`wd-colorpicker--${size}`, { 'is-open': open, 'is-disabled': disabled }]"
    :tabindex="disabled ? -1 : 0"
    role="button"
    :aria-label="`颜色 ${color}`"
    :aria-expanded="open"
    @click="toggle"
    @keydown="onKeydown"
  >
    <span
      class="wd-colorpicker__swatch"
      :style="{ background: color, width: sizePx + 'px', height: sizePx + 'px' }"
    >
      <!-- 浅色系的色块在白底上看不清边界，加一圈内描边压住 -->
      <span class="wd-colorpicker__swatch-inner"></span>
    </span>
    <span v-if="editable" class="wd-colorpicker__value">{{ color }}</span>
    <wd-icon class="wd-colorpicker__caret" name="chevron-down" :size="14" />
  </div>

  <Teleport to="body">
    <div
      v-if="mounted"
      ref="panelEl"
      class="wd-colorpicker__panel"
      :class="{ 'is-open': open }"
      :style="panelStyle"
      role="dialog"
      aria-label="选择颜色"
    >
      <!-- 饱和度/明度面板：白→色相、透明→黑 两层渐变叠加 -->
      <div
        ref="svEl"
        class="wd-colorpicker__sv"
        :style="{ background: pureHue }"
        @pointerdown="onSvDown"
        @pointermove="onSvMove"
        @pointerup="onSvUp"
        @pointercancel="onSvUp"
      >
        <span class="wd-colorpicker__sv-white"></span>
        <span class="wd-colorpicker__sv-black"></span>
        <span
          class="wd-colorpicker__knob"
          :style="{ left: knobs.svLeft, top: knobs.svTop }"
        ></span>
      </div>

      <!-- 色相条 -->
      <div
        ref="hueEl"
        class="wd-colorpicker__hue"
        @pointerdown="onHueDown"
        @pointermove="onHueMove"
        @pointerup="onHueUp"
        @pointercancel="onHueUp"
      >
        <span class="wd-colorpicker__knob wd-colorpicker__knob--hue" :style="{ left: knobs.hueLeft }"></span>
      </div>

      <!-- 色值输入 -->
      <div class="wd-colorpicker__inputs">
        <label class="wd-colorpicker__field">
          <span>HEX</span>
          <input
            :value="hexText"
            maxlength="7"
            spellcheck="false"
            @input="onHexInput"
            @blur="onHexBlur"
          />
        </label>
        <label class="wd-colorpicker__field">
          <span>RGB</span>
          <input :value="rgbText" readonly />
        </label>
      </div>

      <!-- 预设 -->
      <div class="wd-colorpicker__presets">
        <button
          v-for="c in presets"
          :key="c"
          type="button"
          class="wd-colorpicker__preset"
          :class="{ 'is-active': normalizeHex(c) === color }"
          :style="{ background: c }"
          :aria-label="c"
          @click="pickPreset(c)"
        ></button>
      </div>
    </div>
  </Teleport>
</template>
