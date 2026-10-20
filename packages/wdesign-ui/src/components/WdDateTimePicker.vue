<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, ref } from 'vue'
import { useControllable } from './controllable'
import WdCalendar from './WdCalendar.vue'
import WdTimePicker from './WdTimePicker.vue'

defineOptions({ name: 'WdDateTimePicker' })

const props = withDefaults(
  defineProps<{
    /**
     * 受控值：'YYYY-MM-DD HH:mm' 或 'YYYY-MM-DD HH:mm:ss'
     * 日期部分为空时值为空字符串（不选日期就没有时间可谈）
     */
    modelValue?: string
    defaultValue?: string
    /** 是否含秒 */
    second?: boolean
    /** 分钟步进 */
    minuteStep?: number
    /** 最小日期时间 */
    min?: string
    /** 最大日期时间 */
    max?: string
    /** 禁用 */
    disabled?: boolean
    /** 尺寸 */
    size?: 'sm' | 'md'
    /** 每周起始 */
    weekStart?: 0 | 1
  }>(),
  {
    defaultValue: '',
    second: false,
    minuteStep: 1,
    min: '',
    max: '',
    disabled: false,
    size: 'md',
    weekStart: 1,
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

/* ---------------- 值拆解 ---------------- */

/** 'YYYY-MM-DD HH:mm[:ss]' → { date, time } */
function split(v: string): { date: string; time: string } {
  const s = v.trim()
  if (!s) return { date: '', time: '' }
  const [d, t] = s.split(/\s+/)
  return { date: d || '', time: t || '' }
}

const parts = computed(() => split(value.value))

/* ---------------- 交互 ---------------- */

/**
 * 选日期：保留已有时间。
 *
 * ⚠️ 这里有个容易搞错的地方：
 *    先选了时间、再改日期时，**不能把时间丢掉**。
 *    用户填 "2026-10-20 14:30"，改成 10-21 应该得到 "2026-10-21 14:30"，
 *    而不是 "2026-10-21"。
 *    反过来，如果还没选过时间，就只给日期 —— 让用户意识到"时间还没填"。
 */
function onDate(d: string) {
  const t = parts.value.time
  set(t ? `${d} ${t}` : d)
}

/** 选时间：没有日期时自动补今天（不然字符串格式不完整） */
function onTime(t: string) {
  const d = parts.value.date
  if (!d) {
    const now = new Date()
    const p = (n: number) => (n < 10 ? '0' + n : String(n))
    const today = `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`
    set(`${today} ${t}`)
    return
  }
  set(`${d} ${t}`)
}

function clear() {
  set('')
}

const display = computed(() => {
  const { date, time } = parts.value
  if (!date) return ''
  return time ? `${date} ${time}` : date
})
</script>

<template>
  <div
    class="wd-datetime-picker"
    :class="[`wd-datetime-picker--${size}`, { 'is-disabled': disabled }]"
  >
    <!-- 合并触发器：显示完整值 -->
    <div class="wd-datetime-picker__field">
      <span v-if="display" class="wd-datetime-picker__text">{{ display }}</span>
      <span v-else class="wd-datetime-picker__placeholder">选择日期与时间</span>
      <button
        v-if="display && !disabled"
        type="button"
        class="wd-datetime-picker__clear"
        aria-label="清空"
        @click="clear"
      >
        <wd-icon name="close" :size="12" />
      </button>
    </div>

    <!-- 两个子控件并排：日期靠日历，时间靠三列面板 -->
    <div class="wd-datetime-picker__row">
      <wd-calendar
        :model-value="parts.date"
        :week-start="weekStart"
        :size="size"
        :clearable="false"
        :show-today="false"
        @update:model-value="onDate"
      />
      <div class="wd-datetime-picker__side">
        <div class="wd-datetime-picker__side-label">时间</div>
        <wd-time-picker
          :model-value="parts.time"
          :second="second"
          :minute-step="minuteStep"
          :min="min"
          :max="max"
          :size="size"
          @update:model-value="onTime"
        />
      </div>
    </div>
  </div>
</template>
