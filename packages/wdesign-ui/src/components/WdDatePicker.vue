<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useOverlayLayer } from './overlay-stack'
import { useAnchoredPosition, useDismiss } from './anchor'

// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。
import { popDuration } from './pop-duration'
/** 过渡时长：尊重系统「减弱动态效果」，否则用它兜底 transitionend 丢失的情况 */
const POP_DURATION = popDuration()


defineOptions({ name: 'WdDatePicker' })

const props = withDefaults(
  defineProps<{
    /** v-model 绑定的日期字符串，格式 'YYYY-MM-DD'，空字符串表示未选 */
    modelValue?: string
    /** 未选值时触发器里显示的占位文字 */
    placeholder?: string
    /** 禁用：触发器不可点击，浮层无法打开 */
    disabled?: boolean
    /** 最早可选日期（含），格式 YYYY-MM-DD */
    min?: string
    /** 最晚可选日期（含），格式 YYYY-MM-DD */
    max?: string
    /** 尺寸，与 Input / Select / Cascader 一致 */
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { modelValue: '', placeholder: '选择日期', disabled: false, size: 'md', min: '', max: '' },
)

/** 点选某天后触发，参数为 'YYYY-MM-DD' 字符串，同时用于 v-model 并关闭浮层 */
const emit = defineEmits<{
  /** 选中日期变化时触发，格式 'YYYY-MM-DD'；清空时为空字符串 */
  (e: 'update:modelValue', value: string): void
}>()

const open = ref(false)

const root = ref<HTMLElement>()
const panelEl = ref<HTMLElement | null>(null)
/** 点击外部关闭：统一走 anchor.ts 的实现（mousedown，比 click 更早、更可靠） */
/* ⚠️ 面板 Teleport 到 body，必须把 panelEl 也登记为"内部" —— 只登记 root 时，面板里的每一次点击都被判成"点外面"，先关面板、选中事件永远收不到 */
useDismiss([root, panelEl], () => { open.value = false }, open)


/** Teleport 到 body + fixed 定位，避免被祖先 overflow:hidden 裁切 */
const { pos } = useAnchoredPosition(open, root, panelEl, {
  placement: 'bottom-start',
  gap: 8,
  width: 302,
})

/** 层栈：Esc 只关最上层 */
useOverlayLayer(open, root, () => { open.value = false; return true })
const view = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))

const WEEK = ['一', '二', '三', '四', '五', '六', '日']

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}
function fmt(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const monthLabel = computed(() => `${view.value.getFullYear()} 年 ${view.value.getMonth() + 1} 月`)

/*
 * 年月视图。
 * 只按"上个月/下个月"翻，回看两年前要点 24 次 —— 标题点开直接给 12 个月网格，
 * 年份用两侧箭头按年翻（参考 Calendar 里的 picker 交互）。
 */
const viewMode = ref<'day' | 'month'>('day')
const MONTHS = Array.from({ length: 12 }, (_, i) => `${i + 1} 月`)

function toggleMonthView() {
  viewMode.value = viewMode.value === 'day' ? 'month' : 'day'
}
function pickMonth(m: number) {
  view.value = new Date(view.value.getFullYear(), m, 1)
  viewMode.value = 'day'
}
function prevYear() {
  view.value = new Date(view.value.getFullYear() - 1, view.value.getMonth(), 1)
}
function nextYear() {
  view.value = new Date(view.value.getFullYear() + 1, view.value.getMonth(), 1)
}

const days = computed(() => {
  const first = view.value
  const startIdx = (first.getDay() + 6) % 7 // 周一为第一列
  const start = new Date(first)
  start.setDate(1 - startIdx)
  const today = fmt(new Date())
  const list: {
    key: string
    label: number
    muted: boolean
    today: boolean
    selected: boolean
    disabled: boolean
  }[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = fmt(d)
    list.push({
      key,
      label: d.getDate(),
      muted: d.getMonth() !== first.getMonth(),
      today: key === today,
      selected: key === props.modelValue,
      // min / max 之外的日子灰掉且不可点（表单里最常见的约束）
      disabled: (!!props.min && key < props.min) || (!!props.max && key > props.max),
    })
  }
  return list
})

function prevMonth() {
  view.value = new Date(view.value.getFullYear(), view.value.getMonth() - 1, 1)
}
function nextMonth() {
  view.value = new Date(view.value.getFullYear(), view.value.getMonth() + 1, 1)
}
function pick(key: string) {
  if (props.min && key < props.min) return
  if (props.max && key > props.max) return
  emit('update:modelValue', key)
  open.value = false
}
function pickToday() {
  const now = new Date()
  view.value = new Date(now.getFullYear(), now.getMonth(), 1)
  pick(fmt(now))
}

function toggle() {
  if (props.disabled) return
  open.value = !open.value
  if (open.value && props.modelValue) {
    const d = new Date(props.modelValue)
    if (!Number.isNaN(d.getTime())) {
      view.value = new Date(d.getFullYear(), d.getMonth(), 1)
    }
  }
}

function onKey(e: KeyboardEvent) {
}
onMounted(() => {
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="wd-datepicker" :class="{ 'wd-datepicker--open': open }">
    <button type="button" class="wd-datepicker__trigger" :disabled="disabled" @click="toggle">
      <span v-if="modelValue" class="wd-datepicker__value">{{ modelValue }}</span>
      <span v-else class="wd-datepicker__placeholder">{{ placeholder }}</span>
      <wd-icon class="wd-datepicker__icon" name="calendar" :size="15" />
    </button>

  </div>

  <Teleport to="body">
    <div
      ref="panelEl"
      class="wd-datepicker__panel"
      :class="{ 'is-open': open }"
      :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
    >
        <div class="wd-datepicker__head">
          <button
            type="button"
            class="wd-datepicker__month"
            :aria-expanded="viewMode === 'month'"
            aria-label="选择年份和月份"
            @click="toggleMonthView"
          >
            {{ monthLabel }}
            <wd-icon :name="viewMode === 'month' ? 'chevron-up' : 'chevron-down'" :size="13" />
          </button>
          <span class="wd-datepicker__nav">
            <button
              type="button"
              class="wd-icon-btn wd-icon-btn--sm"
              :aria-label="viewMode === 'month' ? '上一年' : '上个月'"
              @click="viewMode === 'month' ? prevYear() : prevMonth()"
            >
              <wd-icon name="chevron-left" :size="14" />
            </button>
            <button
              type="button"
              class="wd-icon-btn wd-icon-btn--sm"
              :aria-label="viewMode === 'month' ? '下一年' : '下个月'"
              @click="viewMode === 'month' ? nextYear() : nextMonth()"
            >
              <wd-icon name="chevron-right" :size="14" />
            </button>
          </span>
        </div>

        <!-- 月视图：12 个月网格，点一下回到日视图 -->
        <div v-if="viewMode === 'month'" class="wd-datepicker__months">
          <button
            v-for="(m, i) in MONTHS"
            :key="m"
            type="button"
            class="wd-datepicker__month-item"
            :class="{ 'is-on': i === view.value.getMonth() }"
            @click="pickMonth(i)"
          >
            {{ m }}
          </button>
        </div>

        <template v-else>
        <div class="wd-datepicker__week"><span v-for="w in WEEK" :key="w">{{ w }}</span></div>
        <div class="wd-datepicker__grid">
          <button
            v-for="d in days"
            :key="d.key"
            type="button"
            class="wd-datepicker__day"
            :class="{
              'wd-datepicker__day--muted': d.muted,
              'wd-datepicker__day--today': d.today,
              'wd-datepicker__day--selected': d.selected,
              'wd-datepicker__day--disabled': d.disabled,
            }"
            :disabled="d.disabled"
            @click="pick(d.key)"
          >
            {{ d.label }}
          </button>
        </div>
        </template>
        <div class="wd-datepicker__foot">
          <button type="button" class="wd-datepicker__todaybtn" @click="pickToday">回到今天</button>
        </div>
    </div>
  </Teleport>
</template>
