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

    /* ---------- 区间选择 ---------- */
    /**
     * 区间模式：'range' 时 modelValue 是 `start~end` 格式的字符串，
     * 或者用 v-model:range 绑定 [start, end] 数组。
     *
     * 交互：第一次点击设起点，第二次点击设终点（若早于起点则自动交换）。
     * 第三次点击重新开始。
     */
    mode?: 'single' | 'range'

    /* ---------- 标记 ---------- */
    /**
     * 日期标记：同一天可挂多个标记（如生理期 + 服药提醒 + 体检）。
     *
     * 数据结构：
     *   { '2026-10-12': [{ color: '#E05361', label: '经期' }] }
     *
     * 或者用简写 `marks: { '2026-10-12': '#E05361' }`（单色点）。
     *
     * 渲染：单元格底部最多显示 3 个点，超出显示 `+N`。
     */
    marks?: Record<string, MarkInput[] | string>

    /** 标记点的直径（px） */
    markSize?: number
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
    mode: 'single',
    marks: () => ({}),
    markSize: 5,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  'update:month': [value: string]
}>()

/** 单个标记 */
export interface DateMark {
  /** 圆点颜色 */
  color?: string
  /** 无障碍标签（视觉上不显示，只给读屏） */
  label?: string
}
/** marks 允许简写：直接给颜色字符串 */
export type MarkInput = DateMark | string

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
  /** 区间模式：是否为起点 / 终点 / 区间内 */
  isRangeStart: boolean
  isRangeEnd: boolean
  inRange: boolean
  /** 该日的标记列表 */
  marks: DateMark[]
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
    const isRange = props.mode === 'range'
    const { start, end } = isRange ? rangeSelected.value : { start: '', end: '' }

    return {
      key,
      day: d.getDate(),
      inMonth,
      isToday: key === tk,
      // 区间模式下"选中"由起终点单独表达，避免整块高亮混淆
      isSelected: isRange ? false : key === sel,
      isRangeStart: isRange && key === start,
      isRangeEnd: isRange && key === end,
      inRange: isRange && !!start && !!end && key >= start && key <= end,
      marks: marksOf(key),
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

/* ---------------- 区间选择 ---------------- */
/**
 * 区间选择的状态机。
 *
 * 只存"起点"，终点由 pending 表示：
 *   空 → 点第一下 → 只有 start
 *       → 点第二下 → 有 start + end，完成
 *       → 点第三下 → 重置为新的 start
 *
 * ⚠️ 不把半选状态放进 modelValue：
 *    那样每次点击都会 emit 一个残缺的区间，
 *    父组件拿到的值会在"有起点没终点"和"完整区间"之间跳变。
 */
const rangeStart = ref('')
const rangeEnd = ref('')

const rangeSelected = computed(() => {
  if (props.mode !== 'range') return { start: '', end: '' }
  // 受控：从 modelValue 解析 `start~end`
  const mv = props.modelValue || ''
  if (mv.includes('~')) {
    const [a, b] = mv.split('~')
    return { start: a || '', end: b || '' }
  }
  // 非受控：用本地状态
  return { start: rangeStart.value, end: rangeEnd.value }
})

/** 单元格是否处于区间内（含端点） */
function inRange(key: string): boolean {
  const { start, end } = rangeSelected.value
  if (!start || !end) return false
  return key >= start && key <= end
}

function pickRange(cell: Cell) {
  const { start, end } = rangeSelected.value

  // 已有完整区间 → 重新开始
  if (start && end) {
    rangeStart.value = cell.key
    rangeEnd.value = ''
    if (!isControlled.value) inner.value = cell.key
    emit('update:modelValue', cell.key)
    emit('change', cell.key)
    return
  }

  // 只有起点（或没有）→ 设终点
  const a = start || cell.key
  const b = cell.key
  // 自动交换：先点晚的再点早的，区间应该仍然正确
  const [s1, s2] = a <= b ? [a, b] : [b, a]

  rangeStart.value = s1
  rangeEnd.value = s2
  if (!isControlled.value) inner.value = `${s1}~${s2}`
  emit('update:modelValue', `${s1}~${s2}`)
  emit('change', `${s1}~${s2}`)
}

/* ---------------- 标记 ---------------- */
/**
 * 取某天的标记列表。
 * 兼容两种输入：`{ color: '#f00' }[]` 或直接 `'#f00'`。
 */
function marksOf(key: string): DateMark[] {
  const raw = props.marks[key]
  if (!raw) return []
  const arr = Array.isArray(raw) ? raw : [raw]
  return arr.map((m) => (typeof m === 'string' ? { color: m } : m))
}

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

  // 区间模式走单独的状态机
  if (props.mode === 'range') {
    pickRange(cell)
    if (!cell.inMonth) {
      const d = parseKey(cell.key)
      if (d) view.value = { y: d.getFullYear(), m: d.getMonth() }
    }
    return
  }

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
          'is-range-start': c.isRangeStart,
          'is-range-end': c.isRangeEnd,
          'in-range': c.inRange && !c.isRangeStart && !c.isRangeEnd,
          'has-marks': c.marks.length > 0,
        }"
        role="gridcell"
        :aria-selected="c.isSelected || c.isRangeStart || c.isRangeEnd"
        :disabled="c.disabled"
        @click="pick(c)"
      >
        <span class="wd-calendar__day">{{ c.day }}</span>

        <!--
          标记点：同一天可挂多个（如生理期 + 服药提醒）。
          最多显示 3 个，超出显示 +N —— 再多就失去辨识意义了。
        -->
        <span v-if="c.marks.length" class="wd-calendar__marks" aria-hidden="true">
          <i
            v-for="(m, i) in c.marks.slice(0, 3)"
            :key="i"
            class="wd-calendar__mark"
            :style="{
              background: m.color || 'var(--wd-red)',
              width: markSize + 'px',
              height: markSize + 'px',
            }"
          ></i>
          <span v-if="c.marks.length > 3" class="wd-calendar__mark-more">
            +{{ c.marks.length - 3 }}
          </span>
        </span>
      </button>
    </div>

    <!-- 底部操作 -->
    <div v-if="clearable || showToday" class="wd-calendar__foot">
      <button v-if="clearable" type="button" class="wd-calendar__action" @click="clear">清空</button>
      <button v-if="showToday" type="button" class="wd-calendar__action" @click="goToday">今天</button>
    </div>
  </div>
</template>
