<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。
import { popDuration } from './pop-duration'
/** 过渡时长：尊重系统「减弱动态效果」，否则用它兜底 transitionend 丢失的情况 */
const POP_DURATION = popDuration()


defineOptions({ name: 'WdDatePicker' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
  }>(),
  { modelValue: '', placeholder: '选择日期', disabled: false },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const open = ref(false)
const root = ref<HTMLElement>()
const view = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))

const WEEK = ['一', '二', '三', '四', '五', '六', '日']

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}
function fmt(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const monthLabel = computed(() => `${view.value.getFullYear()} 年 ${view.value.getMonth() + 1} 月`)

const days = computed(() => {
  const first = view.value
  const startIdx = (first.getDay() + 6) % 7 // 周一为第一列
  const start = new Date(first)
  start.setDate(1 - startIdx)
  const today = fmt(new Date())
  const list: { key: string; label: number; muted: boolean; today: boolean; selected: boolean }[] = []
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

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
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

    <Transition name="wd-pop" :duration="POP_DURATION">
      <div v-if="open" class="wd-datepicker__panel">
        <div class="wd-datepicker__head">
          <span class="wd-datepicker__month">{{ monthLabel }}</span>
          <span class="wd-datepicker__nav">
            <button type="button" class="wd-icon-btn wd-icon-btn--sm" aria-label="上个月" @click="prevMonth">
              <wd-icon name="chevron-left" :size="14" />
            </button>
            <button type="button" class="wd-icon-btn wd-icon-btn--sm" aria-label="下个月" @click="nextMonth">
              <wd-icon name="chevron-right" :size="14" />
            </button>
          </span>
        </div>
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
            }"
            @click="pick(d.key)"
          >
            {{ d.label }}
          </button>
        </div>
        <div class="wd-datepicker__foot">
          <button type="button" class="wd-datepicker__todaybtn" @click="pickToday">回到今天</button>
        </div>
      </div>
    </Transition>
  </div>
</template>
