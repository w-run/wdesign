<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useAnchoredPosition, useDismiss } from './anchor'
import { useOverlayLayer } from './overlay-stack'

defineOptions({ name: 'WdCascader' })

export interface WdCascaderOption {
  /** 值 */
  value: string | number
  /** 显示文本 */
  label: string
  /** 子级 */
  children?: WdCascaderOption[]
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** 选项树 */
    options?: WdCascaderOption[]
    /** 受控：选中的完整路径值数组，如 ['浙江','杭州','西湖'] */
    modelValue?: (string | number)[]
    placeholder?: string
    /** 允许选择任意层级（不传则只能选叶子） */
    changeOnSelect?: boolean
    disabled?: boolean
    clearable?: boolean
    size?: 'sm' | 'md' | 'lg'
    /** 展开时的面板最大高度 */
    maxHeight?: number
  }>(),
  {
    options: () => [],
    modelValue: undefined,
    placeholder: '请选择',
    changeOnSelect: false,
    disabled: false,
    clearable: true,
    size: 'md',
    maxHeight: 280,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  change: [value: (string | number)[], labels: string[]]
}>()

const open = ref(false)
const mounted = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)

const { pos } = useAnchoredPosition(open, rootEl, panelEl, {
  placement: 'bottom-start',
  gap: 6,
  matchWidth: true,
})

/** 受控/非受控 */
const inner = ref<(string | number)[]>([])
const isControlled = computed(() => props.modelValue !== undefined)
const selected = computed(() => (isControlled.value ? props.modelValue! : inner.value))

/* ---------------- 面板当前展开的路径 ---------------- */
/**
 * 面板里"正在浏览"的路径，与 selected 分离。
 * 用户可能只浏览不选（hover 展开子级），关闭时丢弃即可。
 */
const browsing = ref<(string | number)[]>([])

/** 每一层要展示的选项列表 */
const columns = computed<WdCascaderOption[][]>(() => {
  const out: WdCascaderOption[][] = [props.options]
  let level = props.options
  for (const v of browsing.value) {
    const hit = level.find((o) => o.value === v)
    if (!hit?.children?.length) break
    out.push(hit.children)
    level = hit.children
  }
  return out
})

/** 每层已选中的值（用于高亮） */
function pickedAt(level: number): string | number | undefined {
  return browsing.value[level]
}

/** 由值数组反查完整标签路径 */
function labelsOf(values: (string | number)[]): string[] {
  const out: string[] = []
  let level = props.options
  for (const v of values) {
    const hit = level.find((o) => o.value === v)
    if (!hit) break
    out.push(hit.label)
    level = hit.children ?? []
  }
  return out
}

const displayText = computed(() => labelsOf(selected.value).join(' / '))

/** 面板打开时，把 browsing 初始化到当前选中路径 */
watch(open, (v) => {
  if (v) {
    browsing.value = [...selected.value]
  }
})

function toggleOpen() {
  if (props.disabled) return
  if (open.value) close()
  else {
    mounted.value = true
    open.value = true
  }
}

function close() {
  open.value = false
  window.setTimeout(() => { if (!open.value) mounted.value = false }, 200)
}

/* ---------------- 选择 ---------------- */
function pick(level: number, opt: WdCascaderOption) {
  if (opt.disabled) return

  // 更新浏览路径：截断到当前层再追加
  const next = browsing.value.slice(0, level)
  next.push(opt.value)

  const hasChildren = !!opt.children?.length
  if (hasChildren) {
    browsing.value = next
    // 有子级时继续展开，不关闭；除非允许选任意层
    if (props.changeOnSelect) commit(next)
    return
  }

  browsing.value = next
  commit(next)
  close()
}

function commit(values: (string | number)[]) {
  if (!isControlled.value) inner.value = values
  emit('update:modelValue', values)
  emit('change', values, labelsOf(values))
}

function clear(e: MouseEvent) {
  e.stopPropagation()
  browsing.value = []
  if (!isControlled.value) inner.value = []
  emit('update:modelValue', [])
  emit('change', [], [])
}

/* ---------------- 键盘 ---------------- */
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { close(); return }
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
    e.preventDefault()
    if (!open.value) toggleOpen()
  }
}

useDismiss([rootEl, panelEl], close, open)
useOverlayLayer(open, panelEl, () => { close(); return true })

const style = computed(() => ({
  top: pos.value.top + 'px',
  left: pos.value.left + 'px',
  maxHeight: props.maxHeight + 'px',
}))

/** 面板挂载后量一次宽度（matchWidth 依赖 anchor 尺寸，已经处理） */
watch(open, async (v) => {
  if (v) {
    await nextTick()
    // 触发一次尺寸测量，让 anchor 的 ResizeObserver 生效
  }
})
</script>

<template>
  <div
    ref="rootEl"
    class="wd-cascader"
    :class="[`wd-cascader--${size}`, { 'is-open': open, 'is-disabled': disabled }]"
    :tabindex="disabled ? -1 : 0"
    role="combobox"
    :aria-expanded="open"
    aria-haspopup="listbox"
    @click="toggleOpen"
    @keydown="onKeydown"
  >
    <span class="wd-cascader__value" :class="{ 'is-placeholder': !displayText }">
      {{ displayText || placeholder }}
    </span>

    <!-- 清空：只在有值时出现，且不触发面板开关 -->
    <span
      v-if="clearable && displayText && !disabled"
      class="wd-cascader__clear"
      role="button"
      aria-label="清空"
      @click="clear"
    >
      <wd-icon name="close" :size="13" />
    </span>

    <wd-icon
      class="wd-cascader__caret"
      :class="{ 'is-open': open }"
      name="chevron-down"
      :size="15"
    />
  </div>

  <Teleport to="body">
    <div
      v-if="mounted"
      ref="panelEl"
      class="wd-cascader__panel"
      :class="{ 'is-open': open }"
      :style="style"
      role="listbox"
    >
      <!--
        多列并排：每一层一列。
        ⚠️ 用 flex 而不是绝对定位叠加 —— 列宽由内容决定，
        绝对定位需要预知每列宽度，多语言下会算错。
      -->
      <div
        v-for="(col, level) in columns"
        :key="level"
        class="wd-cascader__column"
      >
        <button
          v-for="opt in col"
          :key="opt.value"
          type="button"
          class="wd-cascader__option"
          :class="{
            'is-active': pickedAt(level) === opt.value,
            'is-selected': selected[level] === opt.value,
            'is-disabled': opt.disabled,
          }"
          :disabled="opt.disabled"
          role="option"
          :aria-selected="selected[level] === opt.value"
          @click.stop="pick(level, opt)"
        >
          <span class="wd-cascader__label">{{ opt.label }}</span>
          <wd-icon
            v-if="opt.children?.length"
            class="wd-cascader__arrow"
            name="chevron-right"
            :size="14"
          />
          <wd-icon
            v-else-if="selected[level] === opt.value"
            class="wd-cascader__check"
            name="check"
            :size="14"
          />
        </button>

        <p v-if="col.length === 0" class="wd-cascader__empty">暂无选项</p>
      </div>
    </div>
  </Teleport>
</template>
