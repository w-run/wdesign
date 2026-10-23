<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { nextTick, ref } from 'vue'
import { useOverlayLayer } from './overlay-stack'
import { useAnchoredPosition, useDismiss } from './anchor'
import WdCalendar from './WdCalendar.vue'

defineOptions({ name: 'WdDatePicker' })

/*
 * ⚠️ 这个组件只是「触发器 + 浮层」，日期网格必须交给 WdCalendar。
 *
 * 之前这里自己画了一套格子（WEEK / days / monthLabel / month 网格），
 * 和 Calendar 是两份实现，于是每加一个能力都要写两遍、修一个 bug 要修两处：
 *   · 年月快跳：Calendar 有滚轮弹层，这边又做了个 12 格月视图
 *   · min/max：两边各算一遍，规则稍有出入就是「面板和独立日历不一致」
 *   · 键盘、interval、周起始、农历/标记：这边一概没有
 * 现在统一走 WdCalendar —— 面板长什么样，就是 Calendar 长什么样。
 */
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
    /** 是否显示底部「清空」 */
    clearable?: boolean
    /** 是否显示底部「今天」 */
    showToday?: boolean
    /** 尺寸，与 Input / Select / Cascader 一致 */
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    modelValue: '',
    placeholder: '选择日期',
    disabled: false,
    min: '',
    max: '',
    clearable: true,
    showToday: true,
    size: 'md',
  },
)

/** 点选某天后触发，参数为 'YYYY-MM-DD' 字符串，同时用于 v-model 并关闭浮层 */
const emit = defineEmits<{
  /** 选中日期变化时触发，格式 'YYYY-MM-DD'；清空时为空字符串 */
  (e: 'update:modelValue', value: string): void
  /** 与 Calendar 一致：选中/清空都发，参数同 v-model */
  (e: 'change', value: string): void
}>()

const open = ref(false)

const root = ref<HTMLElement>()
const panelEl = ref<HTMLElement | null>(null)
const calEl = ref<{ $el: HTMLElement } | null>(null)
/** 点击外部关闭：统一走 anchor.ts 的实现（mousedown，比 click 更早、更可靠） */
/* ⚠️ 面板 Teleport 到 body，必须把 panelEl 也登记为"内部" —— 只登记 root 时，面板里的每一次点击都被判成"点外面"，先关面板、选中事件永远收不到 */
useDismiss([root, panelEl], () => { open.value = false }, open)

/** Panel 宽度 = Calendar sm（284）+ 1px 边框 ×2，宽高都交给内容撑 */
const PANEL_WIDTH = 286

/** Teleport 到 body + fixed 定位，避免被祖先 overflow:hidden 裁切 */
const { pos, actual } = useAnchoredPosition(open, root, panelEl, {
  placement: 'bottom-start',
  gap: 8,
  width: PANEL_WIDTH,
})

/** 层栈：Esc 只关最上层（年月弹层开着时先关它） */
useOverlayLayer(open, root, () => { open.value = false; return true })

/**
 * 当前展示月份。由 DatePicker 持有、双向绑给 Calendar ——
 * Calendar 只在挂载时按 modelValue 初始化一次，面板常驻 DOM（显示/隐藏切换），
 * 不接管的话第二次打开会停在上次翻到的月份，而不是当前选中的月份。
 */
const month = ref('')

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

function monthOf(key: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(key) ? key.slice(0, 7) : ''
}

function toggle() {
  if (props.disabled) return
  open.value = !open.value
  if (!open.value) return
  const now = new Date()
  month.value =
    monthOf(props.modelValue) || `${now.getFullYear()}-${pad(now.getMonth() + 1)}`
  // 键盘可选：焦点交给日历，方向键 / PageUp / PageDown 直接可用
  nextTick(() => calEl.value?.$el?.focus())
}

function onPick(value: string) {
  emit('update:modelValue', value)
  emit('change', value)
  open.value = false
}
</script>

<template>
  <div ref="root" class="wd-datepicker" :class="[`wd-datepicker--${size}`, { 'wd-datepicker--open': open }]">
    <button
      type="button"
      class="wd-datepicker__trigger"
      :disabled="disabled"
      aria-haspopup="dialog"
      :aria-expanded="open"
      @click="toggle"
    >
      <span v-if="modelValue" class="wd-datepicker__value">{{ modelValue }}</span>
      <span v-else class="wd-datepicker__placeholder">{{ placeholder }}</span>
      <wd-icon class="wd-datepicker__icon" name="calendar" :size="15" aria-hidden="true" />
    </button>
  </div>

  <Teleport to="body">
    <div
      ref="panelEl"
      class="wd-datepicker__panel"
      :class="{ 'is-open': open }"
      :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
      :data-placement="actual"
      role="dialog"
      aria-label="选择日期"
    >
      <!--
        日期面板唯一实现 = WdCalendar。
        这里只做三件事：传 min/max、接 change 关面板、把「今天/清空」决定权交给调用方。
      -->
      <WdCalendar
        ref="calEl"
        v-model:month="month"
        :model-value="modelValue"
        :min="min"
        :max="max"
        :clearable="clearable"
        :show-today="showToday"
        size="sm"
        @change="onPick"
      />
    </div>
  </Teleport>
</template>
