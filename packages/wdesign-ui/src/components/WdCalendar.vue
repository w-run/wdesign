<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

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

    /**
     * 紧凑模式：不显示底部文字。
     */
    compact?: boolean

    /**
     * 日期下方的附属文字，如农历、节假日、价格。
     *
     *     texts: { '2026-10-01': '国庆' }
     *
     * 显示规则（优先级）：
     *   · 默认显示文字
     *   · 该日有标记点时也显示（标记点在右上角，两者不冲突）
     *   · compact 模式不显示
     */
    texts?: Record<string, string>
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
    compact: false,
    texts: () => ({}),
  },
)

const emit = defineEmits<{
  /** v-model 更新：单日模式为 'YYYY-MM-DD'，区间模式为 `start~end`；清空时为空字符串 */
  'update:modelValue': [value: string]
  /** 选中日期变化时触发，参数格式同 v-model；区间模式只点了一下起点也会触发 */
  change: [value: string]
  /** 翻月时触发，参数为 'YYYY-MM'：点上一月 / 下一月、年月浮层跳转、PageUp / PageDown 都会发 */
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
  /** 底部的附属文字（农历/节假日） */
  text: string
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
      /*
       * 区间内部：只有真的选完（非 pending）才铺底条。
       * 半选状态下只高亮起点，不预判终点 ——
       * 否则鼠标还没移到终点，中间就凭空出现一条色带。
       */
      inRange:
        isRange &&
        !rangePending.value &&
        !!start &&
        !!end &&
        key > start &&
        key < end,
      marks: marksOf(key),
      text: props.compact ? '' : (props.texts[key] || ''),
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

/**
 * 是否处于"已点起点、等终点"的中间态。
 *
 * ⚠️ 不能用 `start && end` 判断"区间已完成" ——
 *    点第一下时如果只看这个条件，`start === end` 会被误判成
 *    "已经有完整区间了"，于是第二次点击变成"重新开始"，
 *    表现为区间永远选不起来（实测：第一次得 8~8，第二次直接变回单日）。
 *
 *    必须额外记一个 pending 标志，把"选了一半"和"选完了"分开。
 */
const rangePending = ref(false)

/* ---------------- 年月选择弹层 ---------------- */
/**
 * 点击标题里的年月可以跳到任意年月 —— 不必逐月翻。
 *
 * 交互参考移动端的"滚轮选择器"：
 *   · 左侧列：年份（当前年 ±30）
 *   · 右侧列：月份 01-12
 *   · 点击即切换，点外部关闭
 *
 * 为什么要做这个：
 *   选 3 年前的日期要点 36 次「上一月」。改成弹层后两次点击到位。
 */
const root = ref<HTMLElement | null>(null)
const pickerOpen = ref(false)
const yearList = computed(() => {
  const cur = new Date().getFullYear()
  const out: number[] = []
  // 当前年往前 30 年、往后 10 年，覆盖绝大多数业务场景
  for (let y = cur - 30; y <= cur + 10; y++) out.push(y)
  return out
})

function openPicker() {
  pickerOpen.value = true
}

function closePicker() {
  pickerOpen.value = false
}

function pickYear(y: number) {
  view.value = { y, m: view.value.m }
  emit('update:month', `${y}-${pad(view.value.m + 1)}`)
  // 选完年继续留在弹层里选月，体验更顺
}

function pickMonth(m: number) {
  view.value = { y: view.value.y, m }
  emit('update:month', `${view.value.y}-${pad(m + 1)}`)
  pickerOpen.value = false
}

/** 点外部关闭 */
function onDocClick(e: MouseEvent) {
  const root2 = root.value
  if (root2 && !root2.contains(e.target as Node)) pickerOpen.value = false
}

watch(pickerOpen, (v) => {
  if (v) document.addEventListener('click', onDocClick, true)
  else document.removeEventListener('click', onDocClick, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick, true)
})

/** 弹层打开时把当前年月滚到可见位置 */
const yearColRef = ref<HTMLElement | null>(null)
const monthColRef = ref<HTMLElement | null>(null)

watch(pickerOpen, async (v) => {
  if (!v) return
  await nextTick()
  const yEl = yearColRef.value?.querySelector<HTMLElement>('.is-on')
  yEl?.scrollIntoView({ block: 'center' })
  const mEl = monthColRef.value?.querySelector<HTMLElement>('.is-on')
  mEl?.scrollIntoView({ block: 'center' })
})

const rangeSelected = computed(() => {
  if (props.mode !== 'range') return { start: '', end: '', pending: false }
  // 受控：从 modelValue 解析 `start~end`
  const mv = props.modelValue || ''
  if (mv.includes('~')) {
    const [a, b] = mv.split('~')
    return { start: a || '', end: b || '', pending: rangePending.value }
  }
  // 非受控：用本地状态
  return { start: rangeStart.value, end: rangeEnd.value, pending: rangePending.value }
})

/** 单元格是否处于区间内（含端点） */
function inRange(key: string): boolean {
  const { start, end } = rangeSelected.value
  if (!start || !end) return false
  return key >= start && key <= end
}

/**
 * 区间选择的三个状态：
 *
 *   ① 空        → 点第一下：记起点，进入"选择中"（pending = true）
 *   ② 选择中    → 点第二下：定终点，退出 pending
 *   ③ 已完成    → 点第三下：清空重来，回到 ①
 *
 * ⚠️ 判断依据是 `rangePending`，不是 `start && end` ——
 *    后者在"起点=终点"时无法区分状态 ② 和 ③。
 */
function pickRange(cell: Cell) {
  const { start, pending } = rangeSelected.value

  // ③ 已完成 → 开始新的选择
  if (!pending) {
    rangeStart.value = cell.key
    rangeEnd.value = ''
    rangePending.value = true
    if (!isControlled.value) inner.value = cell.key
    emit('update:modelValue', cell.key)
    emit('change', cell.key)
    return
  }

  // ② 选择中 → 定终点
  const a = start || cell.key
  const b = cell.key
  // 自动交换：先点晚的再点早的，区间仍然正确
  const [s1, s2] = a <= b ? [a, b] : [b, a]

  rangeStart.value = s1
  rangeEnd.value = s2
  rangePending.value = false
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
    ref="root"
    class="wd-calendar"
    :class="[
      `wd-calendar--${size}`,
      {
        // 区间已选完（非 pending）才画端点色带
        'is-range-complete': mode === 'range' && !rangePending && !!rangeSelected.start && !!rangeSelected.end,
        'wd-calendar--compact': compact,
      },
    ]"
    tabindex="0"
    role="grid"
    :aria-label="monthLabel"
    @keydown="onKeydown"
  >
    <!-- 头部：翻月 -->
    <!--
      头部：参考「2026/07」式的排版 —— 大号年份 + 主色斜杠 + 月份，整体左对齐；
      翻页按钮收在右侧，不再左右夹着标题。
      这样标题是绝对的时间锚点，翻页只是附带的次要操作。
    -->
    <div class="wd-calendar__head">
      <button
        type="button"
        class="wd-calendar__month"
        :aria-expanded="pickerOpen"
        aria-label="选择年份和月份"
        @click.stop="openPicker"
      >
        <span class="wd-calendar__year">{{ view.y }}</span>
        <span class="wd-calendar__slash" aria-hidden="true">/</span>
        <span class="wd-calendar__mon">{{ pad(view.m + 1) }}</span>
        <wd-icon name="chevron-down" :size="14" class="wd-calendar__month-caret" />
      </button>
      <div class="wd-calendar__navs">
        <button type="button" class="wd-calendar__nav" aria-label="上个月" @click="shiftMonth(-1)">
          <wd-icon name="chevron-left" :size="15" />
        </button>
        <button type="button" class="wd-calendar__nav" aria-label="下个月" @click="shiftMonth(1)">
          <wd-icon name="chevron-right" :size="15" />
        </button>
      </div>
    </div>

    <!-- 年月快速选择弹层 -->
    <div v-if="pickerOpen" class="wd-calendar__picker" @click.stop>
      <div class="wd-calendar__picker-col" ref="yearColRef">
        <button
          v-for="y in yearList"
          :key="y"
          type="button"
          class="wd-calendar__picker-opt"
          :class="{ 'is-on': y === view.y }"
          @click="pickYear(y)"
        >{{ y }}</button>
      </div>
      <div class="wd-calendar__picker-col" ref="monthColRef">
        <button
          v-for="m in 12"
          :key="m"
          type="button"
          class="wd-calendar__picker-opt"
          :class="{ 'is-on': m - 1 === view.m }"
          @click="pickMonth(m - 1)"
        >{{ pad(m) }}</button>
      </div>
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

        <!-- 今天：底部圆角短横线（压在文字层上，不占位） -->
        <span v-if="c.isToday" class="wd-calendar__today-bar" aria-hidden="true"></span>

        <!-- 底部附属文字（农历/节假日）：绝对定位，不占位，不影响行高 -->
        <span v-if="c.text" class="wd-calendar__text" aria-hidden="true">{{ c.text }}</span>

        <!--
          标记点：右上角，最多 3 个，超出 +N
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
