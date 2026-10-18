<script setup lang="ts">
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'WdCalendar' })

const props = withDefaults(
  defineProps<{
    /** 受控：选中的日期（'YYYY-MM-DD'） */
    modelValue?: string
    /** 非受控初值 */
    defaultValue?: string
    /** 当前展示的月份（'YYYY-MM'），不传则跟随选中日期 */
    month?: string
    /** 每周起始：0=周日，1=周一 */
    weekStart?: 0 | 1
    /** 最小可选日期 */
    min?: string
    /** 最大可选日期 */
    max?: string
    /** 是否可清空 */
    clearable?: boolean
    /** 是否显示「今天」按钮 */
    showToday?: boolean
    /** 尺寸 */
    size?: 'sm' | 'md'
  }>(),
  {
    modelValue: undefined,
    defaultValue: '',
    month: '',
    weekStart: 1,
    min: '',
    max: '',
    clearable: true,
    showToday: true,
    size: 'md',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  'update:month': [value: string]
}>()

/* ---------------- 日期工具 ---------------- */

/** 'YYYY-MM-DD' 补零 */
function pad(n: number) {
  return n < 10 ? '0' + n : String(n)
}

function toKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function parseKey(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return isNaN(d.getTime()) ? null : d
}

function todayKey() {
  return toKey(new Date())
}

/* ---------------- 状态 ---------------- */
const inner = ref(props.defaultValue)
const isControlled = computed(() => props.modelValue !== undefined)
const selected = computed(() => (isControlled.value ? props.modelValue! : inner.value))

/**
 * 当前展示的月份。
 *
 * ⚠️ 用 { year, month } 两个数字而不是 Date：
 * Date 在月份边界（new Date(2026, -1, 1)）会自动回退到上一年，
 * 直接用 Date 做加减容易出现"翻月翻错年"。
 */
const view = ref<{ y: number; m: number }>({ y: 0, m: 0 })

function initView() {
  const base = props.month
    ? /^(\d{4})-(\d{2})$/.exec(props.month)
    : null
  if (base) {
    view.value = { y: Number(base[1]), m: Number(base[2]) - 1 }
    return
  }
  const sel = parseKey(selected.value)
  const d = sel ?? new Date()
  view.value = { y: d.getFullYear(), m: d.getMonth() }
}

initView()

watch(
  () => props.month,
  (v) => {
    const m = /^(\d{4})-(\d{2})$/.exec(v || '')
    if (m) view.value = { y: Number(m[1]), m: Number(m[2]) - 1 }
  },
)

/* ---------------- 网格 ---------------- */
const WEEK_LABELS = ['日', '一', '二', '三', '四', '五', '六']

const weekHeads = computed(() => {
  const arr = [...WEEK_LABELS]
  return props.weekStart === 1 ? [...arr.slice(1), arr[0]] : arr
})

interface Cell {
  key: string
  day: number
  inMonth: boolean
  isToday: boolean
  isSelected: boolean
  disabled: boolean
}

const cells = computed(() => {
  const { y, m } = view.value
  const first = new Date(y, m, 1)
  // 该月 1 号是周几（0=周日）
  const firstDow = first.getDay()
  // 需要回退多少天才能对齐到行首
  const lead = (firstDow - props.weekStart + 7) % 7

  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const prevMonthDays = new Date(y, m, 0).getDate()

  const out: Cell[] = []
  const tk = todayKey()
  const sel = selected.value
  const minD = parseKey(props.min)
  const maxD = parseKey(props.max)

  /*
   * ⚠️ 这里必须用 const 箭头函数，不能用 function 声明。
   *
   * 原来写的是 `function makeCell(...)` + `function startOfDay(...)`，放在
   * computed 回调的**末尾**。JS 的函数声明会提升，理论上没问题 ——
   * 但经过 esbuild/terser 的处理后，函数声明在部分构建形态下会被
   * 重排到引用点之后，导致 `makeCell is not a function` 或静默返回空数组。
   * 实测症状就是：月份标题正常（不依赖这两个函数），但整张网格是空的，
   * 且浏览器控制台没有任何报错 —— 极难定位。
   */
  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate())

  const makeCell = (d: Date, inMonth: boolean): Cell => {
    const key = toKey(d)
    return {
      key,
      day: d.getDate(),
      inMonth,
      isToday: key === tk,
      isSelected: key === sel,
      disabled:
        (!!minD && d < startOfDay(minD)) ||
        (!!maxD && d > startOfDay(maxD)),
    }
  }

  // 前导：上个月的尾巴
  for (let i = lead - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    const d = new Date(y, m - 1, day)
    out.push(makeCell(d, false))
  }
  // 当月
  for (let day = 1; day <= daysInMonth; day++) {
    out.push(makeCell(new Date(y, m, day), true))
  }
  // 补齐到 6 行 * 7 列 = 42，保证不同月份切换时高度不跳动
  while (out.length < 42) {
    const day = out.length - lead - daysInMonth + 1
    out.push(makeCell(new Date(y, m + 1, day), false))
  }

  return out
})

const monthLabel = computed(() => `${view.value.y} 年 ${view.value.m + 1} 月`)

/* ---------------- 交互 ---------------- */
function shiftMonth(delta: number) {
  let m = view.value.m + delta
  let y = view.value.y
  while (m < 0) { m += 12; y-- }
  while (m > 11) { m -= 12; y++ }
  view.value = { y, m }
  emit('update:month', `${y}-${pad(m + 1)}`)
}

function pick(cell: Cell) {
  if (cell.disabled) return
  if (!isControlled.value) inner.value = cell.key
  emit('update:modelValue', cell.key)
  emit('change', cell.key)
  // 点到上/下月的日期时顺带翻月，操作更顺
  if (!cell.inMonth) {
    const d = parseKey(cell.key)
    if (d) view.value = { y: d.getFullYear(), m: d.getMonth() }
  }
}

function goToday() {
  const d = new Date()
  view.value = { y: d.getFullYear(), m: d.getMonth() }
  pick({ key: toKey(d), day: d.getDate(), inMonth: true, isToday: true, isSelected: false, disabled: false })
}

function clear() {
  if (!isControlled.value) inner.value = ''
  emit('update:modelValue', '')
  emit('change', '')
}

function onKeydown(e: KeyboardEvent) {
  const cur = parseKey(selected.value) ?? new Date(view.value.y, view.value.m, 1)
  let next: Date | null = null
  if (e.key === 'ArrowLeft') next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() - 1)
  else if (e.key === 'ArrowRight') next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 1)
  else if (e.key === 'ArrowUp') next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() - 7)
  else if (e.key === 'ArrowDown') next = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 7)
  else if (e.key === 'PageUp') shiftMonth(-1)
  else if (e.key === 'PageDown') shiftMonth(1)
  if (next) {
    e.preventDefault()
    view.value = { y: next.getFullYear(), m: next.getMonth() }
    pick({ key: toKey(next), day: next.getDate(), inMonth: true, isToday: false, isSelected: false, disabled: false })
  }
}
</script>

<template>
  <div
    class="wd-calendar"
    :class="[`wd-calendar--${size}`]"
    tabindex="0"
    role="grid"
    :aria-label="monthLabel"
    @keydown="onKeydown"
  >
    <!-- 头部：翻月 -->
    <div class="wd-calendar__head">
      <button type="button" class="wd-calendar__nav" aria-label="上个月" @click="shiftMonth(-1)">
        <wd-icon name="chevron-left" :size="15" />
      </button>
      <span class="wd-calendar__month">{{ monthLabel }}</span>
      <button type="button" class="wd-calendar__nav" aria-label="下个月" @click="shiftMonth(1)">
        <wd-icon name="chevron-right" :size="15" />
      </button>
    </div>

    <!-- 星期表头 -->
    <div class="wd-calendar__week" role="row">
      <span v-for="w in weekHeads" :key="w" class="wd-calendar__weekday" role="columnheader">{{ w }}</span>
    </div>

    <!-- 日期网格 -->
    <div class="wd-calendar__grid" role="rowgroup">
      <button
        v-for="c in cells"
        :key="c.key"
        type="button"
        class="wd-calendar__cell"
        :class="{
          'is-out': !c.inMonth,
          'is-today': c.isToday,
          'is-selected': c.isSelected,
          'is-disabled': c.disabled,
        }"
        role="gridcell"
        :aria-selected="c.isSelected"
        :disabled="c.disabled"
        @click="pick(c)"
      >
        <span class="wd-calendar__day">{{ c.day }}</span>
      </button>
    </div>

    <!-- 底部操作 -->
    <div v-if="clearable || showToday" class="wd-calendar__foot">
      <button v-if="clearable" type="button" class="wd-calendar__action" @click="clear">清空</button>
      <button v-if="showToday" type="button" class="wd-calendar__action" @click="goToday">今天</button>
    </div>
  </div>
</template>
