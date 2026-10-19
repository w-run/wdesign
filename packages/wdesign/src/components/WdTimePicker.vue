<script setup lang="ts">
import { computed, ref } from 'vue'
import { useControllable } from './controllable'

defineOptions({ name: 'WdTimePicker' })

const props = withDefaults(
  defineProps<{
    /** 受控值，'HH:mm' 或 'HH:mm:ss' */
    modelValue?: string
    /** 非受控初值 */
    defaultValue?: string
    /** 是否含秒 */
    second?: boolean
    /** 12 小时制（显示 AM/PM） */
    hour12?: boolean
    /** 分钟步进（如 5 → 00/05/10…） */
    minuteStep?: number
    /** 小时范围 [起始, 结束]，跨零点用 start > end（如 [22, 6]） */
    hourRange?: [number, number]
    /** 最小可选时间 'HH:mm' */
    min?: string
    /** 最大可选时间 'HH:mm' */
    max?: string
    /** 禁用 */
    disabled?: boolean
    /** 尺寸 */
    size?: 'sm' | 'md'
  }>(),
  {
    defaultValue: '',
    second: false,
    hour12: false,
    minuteStep: 1,
    hourRange: () => [0, 23],
    min: '',
    max: '',
    disabled: false,
    size: 'md',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const { value, set } = useControllable<string>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: '',
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

/* ---------------- 时间解析 ---------------- */

function pad(n: number) {
  return n < 10 ? '0' + n : String(n)
}

/** 解析 'HH:mm[:ss]' → [h, m, s]，非法返回 null */
function parseTime(s: string): [number, number, number] | null {
  const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(s.trim())
  if (!m) return null
  const h = Number(m[1])
  const mi = Number(m[2])
  const se = m[3] ? Number(m[3]) : 0
  if (h > 23 || mi > 59 || se > 59) return null
  return [h, mi, se]
}

function format(h: number, m: number, s: number) {
  return props.second ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}`
}

const parts = computed(() => parseTime(value.value) ?? [0, 0, 0])

/* ---------------- 选项生成 ---------------- */

/** 小时列表：支持跨零点范围（如 22 → 6） */
const hours = computed(() => {
  const [start, end] = props.hourRange
  const out: number[] = []
  if (start <= end) {
    for (let h = start; h <= end; h++) out.push(h)
  } else {
    // 跨零点：22,23,0,1,...,6
    for (let h = start; h <= 23; h++) out.push(h)
    for (let h = 0; h <= end; h++) out.push(h)
  }
  return out
})

const minutes = computed(() => {
  const step = Math.max(1, Math.min(30, props.minuteStep))
  const out: number[] = []
  for (let m = 0; m < 60; m += step) out.push(m)
  return out
})

const seconds = computed(() => Array.from({ length: 60 }, (_, i) => i))

/* ---------------- 可用性判断 ---------------- */

/**
 * 某小时是否可选。
 *
 * ⚠️ 只比较到分钟级——min/max 是 'HH:mm' 格式，
 *    拿它和纯小时比需要先对齐到当天的边界，
 *    否则「min=09:30、小时=09」会被错误禁用。
 */
function hourDisabled(h: number): boolean {
  const [minH, minM] = props.min ? (parseTime(props.min) ?? [-1, -1]) : [-1, -1]
  const [maxH, maxM] = props.max ? (parseTime(props.max) ?? [99, 99]) : [99, 99]
  const [curH, curM] = parts.value

  // 小时本身超出范围
  if (minH >= 0 && h < minH) return true
  if (maxH < 99 && h > maxH) return true
  // 同小时下，当前分钟超出边界 → 该小时整体仍可选（用户还能改分钟）
  return false
}

function minuteDisabled(h: number, m: number): boolean {
  const [minH, minM] = props.min ? (parseTime(props.min) ?? [-1, -1]) : [-1, -1]
  const [maxH, maxM] = props.max ? (parseTime(props.max) ?? [99, 99]) : [99, 99]
  if (minH >= 0 && (h < minH || (h === minH && m < minM))) return true
  if (maxH < 99 && (h > maxH || (h === maxH && m > maxM))) return true
  return false
}

function secondDisabled(_h: number, _m: number, s: number): boolean {
  // 秒级通常不做边界限制，保留接口以便扩展
  return s < 0
}

/* ---------------- 选择 ---------------- */

/**
 * 点击某个值后的新时间。
 *
 * ⚠️ 关键：改小时时要**夹紧分钟**。
 *    例如 min=10:30，用户原先在 10:45，把小时改成 09 后
 *    09:45 会低于 min —— 此时应把分钟拉回 min 的 30。
 *    不做这一步会产出 UI 上无法表达的值。
 */
function pickHour(h: number) {
  const [, m, s] = parts.value
  let nm = m
  const [minH, minM] = props.min ? (parseTime(props.min) ?? [-1, -1]) : [-1, -1]
  if (minH >= 0 && h === minH && nm < minM) nm = minM
  set(format(h, nm, s))
  syncOpenPart('hour')
}

function pickMinute(m: number) {
  const [h, , s] = parts.value
  if (minuteDisabled(h, m)) return
  set(format(h, m, s))
  syncOpenPart('minute')
}

function pickSecond(s: number) {
  const [h, m] = parts.value
  set(format(h, m, s))
}

/** 打开某列时的滚动定位钩子 */
const activePart = ref<'hour' | 'minute' | 'second'>('hour')
function syncOpenPart(p: 'hour' | 'minute' | 'second') {
  activePart.value = p
}

/* ---------------- 打开 / 关闭 ---------------- */
const open = ref(false)

function toggle() {
  if (props.disabled) return
  open.value = !open.value
}

function onBlur(e: FocusEvent) {
  // 焦点移出整个组件才关闭，避免点内部选项时误关
  const root = e.currentTarget as HTMLElement
  if (!root.contains(e.relatedTarget as Node)) open.value = false
}

const display = computed(() => value.value || '--:--')
</script>

<template>
  <div
    class="wd-time-picker"
    :class="[`wd-time-picker--${size}`, { 'is-open': open, 'is-disabled': disabled }]"
    tabindex="-1"
    @blur="onBlur"
  >
    <button
      type="button"
      class="wd-time-picker__trigger"
      :aria-expanded="open"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="wd-time-picker__value">{{ display }}</span>
      <wd-icon name="clock" :size="15" class="wd-time-picker__icon" />
    </button>

    <div v-if="open" class="wd-time-picker__panel">
      <!-- 时 -->
      <div class="wd-time-picker__col" role="listbox" aria-label="小时">
        <button
          v-for="h in hours"
          :key="h"
          type="button"
          role="option"
          class="wd-time-picker__opt"
          :class="{ 'is-on': h === parts[0], 'is-off': hourDisabled(h) }"
          :aria-selected="h === parts[0]"
          :disabled="hourDisabled(h)"
          @click="pickHour(h)"
        >{{ pad(h) }}</button>
      </div>

      <span class="wd-time-picker__sep">:</span>

      <!-- 分 -->
      <div class="wd-time-picker__col" role="listbox" aria-label="分钟">
        <button
          v-for="m in minutes"
          :key="m"
          type="button"
          role="option"
          class="wd-time-picker__opt"
          :class="{ 'is-on': m === parts[1], 'is-off': minuteDisabled(parts[0], m) }"
          :aria-selected="m === parts[1]"
          :disabled="minuteDisabled(parts[0], m)"
          @click="pickMinute(m)"
        >{{ pad(m) }}</button>
      </div>

      <template v-if="second">
        <span class="wd-time-picker__sep">:</span>
        <div class="wd-time-picker__col" role="listbox" aria-label="秒">
          <button
            v-for="s in seconds"
            :key="s"
            type="button"
            role="option"
            class="wd-time-picker__opt"
            :class="{ 'is-on': s === parts[2], 'is-off': secondDisabled(parts[0], parts[1], s) }"
            :aria-selected="s === parts[2]"
            :disabled="secondDisabled(parts[0], parts[1], s)"
            @click="pickSecond(s)"
          >{{ pad(s) }}</button>
        </div>
      </template>
    </div>
  </div>
</template>
