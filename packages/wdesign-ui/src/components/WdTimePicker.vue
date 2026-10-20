<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, nextTick, ref, watch } from 'vue'
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
  /** 时间变化时触发，value 为 'HH:mm' 或 'HH:mm:ss'（配合 v-model） */
  'update:modelValue': [value: string]
  /** 用户选定时间后触发，value 同 v-model */
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

/* ---------------- 滚动吸附 ---------------- */
/**
 * 列滚动时自动吸附到最近的一项，并把选中值同步出去。
 *
 * 交互模型（参考 iOS 时间选择器）：
 *   · 用户滚动 → 松手后自动对齐到最近的选项
 *   · 对齐的同时**选中该项**，不需要再点一下
 *
 * ===== 为什么要"吸附"而不是纯自由滚动 =====
 * 自由滚动时选项可能停在半格位置，看起来"没选中任何值"。
 * 吸附保证每次停下都恰好落在某一项上，视觉和语义都清晰。
 */
const ITEM_H = 34 + 3 // 选项高 34 + gap 3

/**
 * 处理某一列的滚动结束。
 *
 * 用 debounce 而非 scrollend 事件：
 *   scrollend 在 Safari 上支持较晚（16.4+），
 *   而 scroll + 150ms 静默判定在所有浏览器都可靠。
 */
let scrollTimers: Record<string, number> = {}

/**
 * 「正在程序化滚动」标记。
 *
 * ⚠️ 必须有：对齐时调用 scrollTo 会再次触发 scroll 事件，
 *    于是又进一次吸附 → 又算一次 idx → 又 scrollTo ……
 *    形成自我激发的循环，最终停在某个意外位置
 *    （实测滚到 45 分却选中 40 分，且 scrollTop 回落）。
 *
 *    这里在 scrollTo 期间设标记，忽略由此产生的 scroll。
 */
const programmatic: Record<string, boolean> = {}

function onColScroll(part: 'hour' | 'minute' | 'second', e: Event) {
  const el = e.currentTarget as HTMLElement
  // 程序化滚动引起的事件，忽略
  if (programmatic[part]) return
  if (scrollTimers[part]) window.clearTimeout(scrollTimers[part])
  scrollTimers[part] = window.setTimeout(() => {
    /*
     * ===== 换算（列有 padding-block，必须计入） =====
     *
     * 列的上下各有 PAD 的 padding，所以第 i 项中心的**内容坐标**是：
     *
     *      centerOf(i) = PAD + i * ITEM_H + ITEM_H / 2
     *
     * 它出现在视口中心的条件：
     *
     *      scrollTop + clientHeight / 2 === centerOf(i)
     *  =>  scrollTop = PAD + i * ITEM_H + ITEM_H/2 - clientHeight/2
     *
     * 反过来求居中项：
     *
     *      i = round((scrollTop + clientHeight/2 - ITEM_H/2 - PAD) / ITEM_H)
     *
     * ⚠️ 两个方向必须用**同一个** PAD 值，否则吸附后来回跳。
     * ⚠️ PAD 从实际样式里读，不硬编码 —— CSS 改了这里自动跟随。
     */
    const PAD = parseFloat(getComputedStyle(el).paddingTop) || 0
    const scrollToCenter = (i: number) =>
      PAD + i * ITEM_H + ITEM_H / 2 - el.clientHeight / 2

    const idx = Math.round(
      (el.scrollTop + el.clientHeight / 2 - ITEM_H / 2 - PAD) / ITEM_H,
    )
    const opts = [...el.querySelectorAll<HTMLElement>('.wd-time-picker__opt')]
    const target = opts[idx]
    if (!target) return

    // 选中（跳过禁用项，滚到它上面就回退）
    const val = Number(target.textContent)
    if (part === 'hour') pickHour(val)
    else if (part === 'minute') pickMinute(val)
    else pickSecond(val)

    // 对齐：把该项精确滚到中心（期间忽略 scroll 事件）
    programmatic[part] = true
    el.scrollTo({ top: scrollToCenter(idx), behavior: 'smooth' })
    window.setTimeout(() => {
      programmatic[part] = false
    }, 400)
  }, 150)
}

/* ---------------- 打开 / 关闭 ---------------- */
const open = ref(false)

/** 列元素引用，打开时需要按当前值定位 */
const hourCol = ref<HTMLElement | null>(null)
const minuteCol = ref<HTMLElement | null>(null)
const secondCol = ref<HTMLElement | null>(null)

/**
 * 打开面板时，把三列滚到当前值的**正中**。
 *
 * ⚠️ 必须用 nextTick 等 DOM 渲染完 ——
 *    面板是 v-if 控制的，刚设 open=true 时元素还不存在，
 *    此时 scrollTop 写不进去（元素为 null）。
 */
watch(open, async (v) => {
  if (!v) return
  await nextTick()
  const [h, m, sec] = parts.value

  /**
   * 把某一列滚到指定值。
   * ⚠️ 公式与 onColScroll 里的 scrollToCenter 完全一致 ——
   *    两处必须同源，否则打开时的位置和吸附后的位置会差半格。
   */
  const scrollToVal = (col: HTMLElement | null, val: number, list: number[]) => {
    if (!col) return
    const idx = list.indexOf(val)
    if (idx < 0) return
    const PAD = parseFloat(getComputedStyle(col).paddingTop) || 0
    col.scrollTop = PAD + idx * ITEM_H + ITEM_H / 2 - col.clientHeight / 2
  }

  scrollToVal(hourCol.value, h, hours.value)
  scrollToVal(minuteCol.value, m, minutes.value)
  scrollToVal(secondCol.value, sec, seconds.value)
})

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
      <div
        ref="hourCol"
        class="wd-time-picker__col"
        role="listbox"
        aria-label="小时"
        @scroll.passive="onColScroll('hour', $event)"
      >
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
      <div
        ref="minuteCol"
        class="wd-time-picker__col"
        role="listbox"
        aria-label="分钟"
        @scroll.passive="onColScroll('minute', $event)"
      >
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
        <div
          ref="secondCol"
          class="wd-time-picker__col"
          role="listbox"
          aria-label="秒"
          @scroll.passive="onColScroll('second', $event)"
        >
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
