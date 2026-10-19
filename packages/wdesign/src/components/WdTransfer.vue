<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'WdTransfer' })

export interface WdTransferItem {
  /** 唯一标识 */
  key: string | number
  /** 显示文本 */
  label: string
  /** 次级说明 */
  desc?: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** 全部数据源 */
    data?: WdTransferItem[]
    /** 受控：右侧已选 key */
    modelValue?: (string | number)[]
    /** 左侧标题 */
    sourceTitle?: string
    /** 右侧标题 */
    targetTitle?: string
    /** 左侧搜索占位 */
    searchPlaceholder?: string
    /** 单侧列表高度 */
    height?: number
    /** 是否可搜索 */
    filterable?: boolean
    disabled?: boolean
  }>(),
  {
    data: () => [],
    modelValue: undefined,
    sourceTitle: '待选',
    targetTitle: '已选',
    searchPlaceholder: '搜索',
    height: 280,
    filterable: true,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  change: [value: (string | number)[], direction: 'right' | 'left']
}>()

const inner = ref<(string | number)[]>([])
const isControlled = computed(() => props.modelValue !== undefined)
const selectedKeys = computed(() => (isControlled.value ? props.modelValue! : inner.value))

/* ---------------- 搜索 ---------------- */
const leftQuery = ref('')
const rightQuery = ref('')

function match(item: WdTransferItem, q: string) {
  if (!q.trim()) return true
  const s = q.trim().toLowerCase()
  return item.label.toLowerCase().includes(s) || (item.desc ?? '').toLowerCase().includes(s)
}

const selectedSet = computed(() => new Set(selectedKeys.value))

const leftList = computed(() =>
  props.data.filter((d) => !selectedSet.value.has(d.key) && match(d, leftQuery.value)),
)
const rightList = computed(() =>
  props.data.filter((d) => selectedSet.value.has(d.key) && match(d, rightQuery.value)),
)

/* ---------------- 勾选（左右各自独立） ---------------- */
const leftChecked = ref(new Set<string | number>())
const rightChecked = ref(new Set<string | number>())

function toggleCheck(side: 'left' | 'right', key: string | number) {
  const set = side === 'left' ? leftChecked : rightChecked
  const next = new Set(set.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  set.value = next
}

function checkAll(side: 'left' | 'right', list: WdTransferItem[]) {
  const set = side === 'left' ? leftChecked : rightChecked
  const enabled = list.filter((d) => !d.disabled).map((d) => d.key)
  const allOn = enabled.length > 0 && enabled.every((k) => set.value.has(k))
  const next = new Set(set.value)
  enabled.forEach((k) => (allOn ? next.delete(k) : next.add(k)))
  set.value = next
}

function isAllChecked(list: WdTransferItem[], set: Set<string | number>) {
  const enabled = list.filter((d) => !d.disabled)
  return enabled.length > 0 && enabled.every((d) => set.has(d.key))
}

/* ---------------- 移动 ---------------- */
function move(dir: 'right' | 'left') {
  if (props.disabled) return
  const from = dir === 'right' ? leftChecked.value : rightChecked.value
  if (from.size === 0) return

  const keys = [...from]
  let next: (string | number)[]
  if (dir === 'right') {
    next = [...selectedKeys.value, ...keys.filter((k) => !selectedSet.value.has(k))]
  } else {
    const drop = new Set(keys)
    next = selectedKeys.value.filter((k) => !drop.has(k))
  }

  if (!isControlled.value) inner.value = next
  emit('update:modelValue', next)
  emit('change', next, dir)

  // 移动后清空对应侧的勾选，避免"移完还勾着"造成误解
  if (dir === 'right') leftChecked.value = new Set()
  else rightChecked.value = new Set()
}

const canMoveRight = computed(() => leftChecked.value.size > 0 && !props.disabled)
const canMoveLeft = computed(() => rightChecked.value.size > 0 && !props.disabled)
</script>

<template>
  <div class="wd-transfer" :class="{ 'is-disabled': disabled }">
    <!-- ---------------- 左侧：待选 ---------------- -->
    <div class="wd-transfer__panel">
      <div class="wd-transfer__head">
        <label class="wd-transfer__check-all">
          <input
            type="checkbox"
            :checked="isAllChecked(leftList, leftChecked)"
            :indeterminate.prop="leftChecked.size > 0 && !isAllChecked(leftList, leftChecked)"
            @change="checkAll('left', leftList)"
          />
          <span>{{ sourceTitle }}</span>
        </label>
        <!--
          计数语义：默认显示总数，有勾选时显示"已勾 M / 共 N"。
          ⚠️ 之前左右都写 `勾选数 / 列表长度`，
          右侧列表长度就是已选总数，于是出现"0/2"这种
          看起来像"一个都没选"的误导文案 —— 实际是有 2 项已选。
        -->
        <span class="wd-transfer__count">
          <template v-if="leftChecked.size">{{ leftChecked.size }} / </template>{{ leftList.length }} 项
        </span>
      </div>

      <div v-if="filterable" class="wd-transfer__search">
        <wd-input v-model="leftQuery" :placeholder="searchPlaceholder" size="sm" clearable />
      </div>

      <div class="wd-transfer__list" :style="{ height: height + 'px' }">
        <p v-if="leftList.length === 0" class="wd-transfer__empty">
          {{ data.length === 0 ? '暂无数据' : '没有可移动项' }}
        </p>
        <!--
          ⚠️ 必须显式绑 @click。
          把原生 <input> 换成 <span> 后，<label> 失去了默认的"点击转发"行为
          （label 只对表单控件生效），所以点击整行不再触发任何逻辑。
        -->
        <label
          v-for="d in leftList"
          :key="d.key"
          class="wd-transfer__item"
          :class="{ 'is-checked': leftChecked.has(d.key), 'is-disabled': d.disabled }"
          @click="!d.disabled && !disabled && toggleCheck('left', d.key)"
        >
          <!--
            自定义圆形勾选指示器，不用原生 checkbox。
            原生框在各平台字形/尺寸不一，且方形与全站「圆形优先」冲突。
            role=checkbox + aria-checked 保证无障碍语义不丢。
          -->
          <span
            class="wd-transfer__tick"
            :class="{ 'is-on': leftChecked.has(d.key) }"
            role="checkbox"
            :aria-checked="leftChecked.has(d.key)"
            :aria-disabled="d.disabled || disabled"
          >
            <wd-icon v-if="leftChecked.has(d.key)" name="check" :size="10" />
          </span>
          <span class="wd-transfer__label">
            {{ d.label }}
            <span v-if="d.desc" class="wd-transfer__desc">{{ d.desc }}</span>
          </span>
        </label>
      </div>
    </div>

    <!-- ---------------- 中间按钮 ---------------- -->
    <div class="wd-transfer__ops">
      <button
        type="button"
        class="wd-transfer__op"
        :disabled="!canMoveRight"
        aria-label="移入右侧"
        @click="move('right')"
      >
        <wd-icon name="arrow-right" :size="16" />
      </button>
      <button
        type="button"
        class="wd-transfer__op"
        :disabled="!canMoveLeft"
        aria-label="移回左侧"
        @click="move('left')"
      >
        <wd-icon name="arrow-left" :size="16" />
      </button>
    </div>

    <!-- ---------------- 右侧：已选 ---------------- -->
    <div class="wd-transfer__panel">
      <div class="wd-transfer__head">
        <label class="wd-transfer__check-all">
          <input
            type="checkbox"
            :checked="isAllChecked(rightList, rightChecked)"
            :indeterminate.prop="rightChecked.size > 0 && !isAllChecked(rightList, rightChecked)"
            @change="checkAll('right', rightList)"
          />
          <span>{{ targetTitle }}</span>
        </label>
        <!-- 右侧：列表长度本身就是"已选总数"，不再重复表达 -->
        <span class="wd-transfer__count">
          <template v-if="rightChecked.size">已勾 {{ rightChecked.size }} · </template>共 {{ rightList.length }} 项
        </span>
      </div>

      <div v-if="filterable" class="wd-transfer__search">
        <wd-input v-model="rightQuery" :placeholder="searchPlaceholder" size="sm" clearable />
      </div>

      <div class="wd-transfer__list" :style="{ height: height + 'px' }">
        <p v-if="rightList.length === 0" class="wd-transfer__empty">还没有选中项</p>
        <label
          v-for="d in rightList"
          :key="d.key"
          class="wd-transfer__item"
          :class="{ 'is-checked': rightChecked.has(d.key), 'is-disabled': d.disabled }"
          @click="!d.disabled && !disabled && toggleCheck('right', d.key)"
        >
          <span
            class="wd-transfer__tick"
            :class="{ 'is-on': rightChecked.has(d.key) }"
            role="checkbox"
            :aria-checked="rightChecked.has(d.key)"
            :aria-disabled="d.disabled || disabled"
          >
            <wd-icon v-if="rightChecked.has(d.key)" name="check" :size="10" />
          </span>
          <span class="wd-transfer__label">
            {{ d.label }}
            <span v-if="d.desc" class="wd-transfer__desc">{{ d.desc }}</span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>
