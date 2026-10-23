<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useOverlayLayer } from './overlay-stack'
import { useAnchoredPosition, useDismiss } from './anchor'
import { uid } from './uid'
import { useControllable } from './controllable'

// <Transition> 依赖 transitionend 收尾；事件丢失时元素会停在 enter-from。
// 显式给 duration，让 Vue 用定时器兜底。
import { popDuration } from './pop-duration'
/** 过渡时长：尊重系统「减弱动态效果」，否则用它兜底 transitionend 丢失的情况 */
const POP_DURATION = popDuration()

defineOptions({ name: 'WdSelect' })

/** listbox id + 选项 id：触发器的 aria-controls / aria-activedescendant 都指向它们 */
const listboxId = uid('wd-select-listbox')
const optId = (i: number) => `${listboxId}-opt-${i}`

type OptionValue = string | number
type Option = string | { label: string; value: OptionValue; disabled?: boolean }
type Model = OptionValue | OptionValue[]

const props = withDefaults(
  defineProps<{
    /** 单选时是值，多选时是数组 */
    modelValue?: Model
    /** 非受控模式的初始值（不传 modelValue 时生效） */
    defaultValue?: Model
    /** 选项列表，字符串即 label 与 value 相同；对象项可带 disabled */
    options?: Option[]
    /** 无选中值时显示的占位文字 */
    placeholder?: string
    /** 禁用后不可展开、不可移除标签 */
    disabled?: boolean
    /** 触发器尺寸档 sm | md | lg */
    size?: 'lg' | 'md' | 'sm'
    /** 多选 */
    multiple?: boolean
    /** 可输入关键字过滤 */
    filterable?: boolean
    /** 有值时显示清除按钮 */
    clearable?: boolean
    /** 多选时最多显示几个标签，其余收成 +N */
    maxTagCount?: number
  }>(),
  {
    /* ⚠️ 不给 modelValue 默认值，否则无法区分受控/非受控 */
    options: () => [],
    placeholder: '请选择',
    disabled: false,
    size: 'md',
    multiple: false,
    filterable: false,
    clearable: false,
    maxTagCount: 3,
  },
)

const emit = defineEmits<{
  /** 选中值变化时触发，单选为值、多选为数组，用于 v-model */
  (e: 'update:modelValue', value: Model): void
  /** 选中值变化时触发，参数同 update:modelValue，非受控模式监听它 */
  (e: 'change', value: Model): void
  /** 点击清除按钮后触发，此时值已清空 */
  (e: 'clear'): void
}>()

const open = ref(false)
const root = ref<HTMLElement>()
const triggerEl = ref<HTMLElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)

/** Teleport 到 body + fixed 定位，避免被祖先 overflow:hidden 裁切 */
const { pos } = useAnchoredPosition(open, triggerEl, menuEl, {
  placement: 'bottom-start',
  gap: 6,
  matchWidth: true,
})


/** 层栈：Esc 只关最上层（弹窗里的选择器不会连带关弹窗） */
useOverlayLayer(open, root, () => { open.value = false; return true })
const search = ref('')

/** 点击外部关闭：顺带清空搜索词，否则下次打开还留着上次的过滤条件 */
useDismiss([root], () => {
  open.value = false
  search.value = ''
}, open)

const searchEl = ref<HTMLInputElement | null>(null)
const activeIndex = ref(-1)

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o, disabled: false } : { disabled: false, ...o })),
)

/**
 * 受控 / 非受控。
 *
 * ⚠️ fallback 与 Model 的类型随 multiple 变化：
 *   单选是 OptionValue（'' 表示空），多选是 OptionValue[]。
 *   所以用 computed 包一层默认值，不能写死。
 */
const { value: ctlValue, set } = useControllable<Model>({
  modelValue: computed(() => props.modelValue),
  defaultValue: computed(() => props.defaultValue),
  fallback: (props.multiple ? [] : '') as Model,
  /**
   * ⚠️ 这里只能 emit，不能调上面的 set ——
   * set 内部又会回调 onChange，等于自己调自己，
   * 选中任何一项都会抛 `RangeError: Maximum call stack size exceeded`，
   * 而且 v-model 永远不更新（界面停在初始值）。
   */
  onChange: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

/** 当前选中值集合（统一成数组便于判断） */
const selected = computed<OptionValue[]>(() => {
  const v = ctlValue.value
  if (props.multiple) return Array.isArray(v) ? v : []
  return v === '' || v === undefined || Array.isArray(v) ? [] : [v as OptionValue]
})

const selectedItems = computed(() => selected.value.map((v) => items.value.find((o) => o.value === v)).filter(Boolean) as typeof items.value)

/** 过滤后的选项（filterable） */
const visible = computed(() => {
  const kw = search.value.trim().toLowerCase()
  if (!kw || !props.filterable) return items.value
  return items.value.filter((o) => String(o.label).toLowerCase().includes(kw))
})

const hasValue = computed(() => selected.value.length > 0)
const showClear = computed(() => props.clearable && hasValue.value && !props.disabled)

/** 多选时触发器里显示的标签（超出 maxTagCount 折叠） */
const shownTags = computed(() => selectedItems.value.slice(0, props.maxTagCount))
const overflowCount = computed(() => Math.max(0, selectedItems.value.length - props.maxTagCount))

const singleLabel = computed(() => selectedItems.value[0]?.label ?? '')

function toggle(v: OptionValue) {
  const opt = items.value.find((o) => o.value === v)
  if (opt?.disabled) return

  if (props.multiple) {
    /*
     * ⚠️ 局部变量不能叫 `set` —— 会遮蔽上面 useControllable 解构出来的 set()，
     * 于是 `set(next)` 变成"把 Set 实例当函数调用"，抛 TypeError，
     * 表现就是**多选点了没反应**（面板不关、标签不变、控制台才报错）。
     */
    const picked = new Set(selected.value)
    picked.has(v) ? picked.delete(v) : picked.add(v)
    set(Array.from(picked))
    // 多选不关闭面板，便于连续选择
  } else {
    set(v)
    open.value = false
  }
  search.value = ''
}

function removeTag(v: OptionValue, e: MouseEvent) {
  e.stopPropagation()
  if (props.disabled) return
  const next = selected.value.filter((x) => x !== v)
  set(next)
}

function clear(e?: MouseEvent) {
  e?.stopPropagation()
  const next = props.multiple ? [] : ''
  set(next)
  emit('clear')
}

async function toggleOpen() {
  if (props.disabled) return
  open.value = !open.value
  if (open.value) {
    activeIndex.value = Math.max(0, visible.value.findIndex((o) => o.value === selected.value[0]))
    await nextTick()
    if (props.filterable) searchEl.value?.focus()
  } else {
    search.value = ''
  }
}

/* ---- 键盘操作 ---- */
function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  if (!open.value && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
    e.preventDefault(); toggleOpen(); return
  }
  if (!open.value) return
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const n = visible.value.length
    if (!n) return
    const dir = e.key === 'ArrowDown' ? 1 : -1
    activeIndex.value = (activeIndex.value + dir + n) % n
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const opt = visible.value[activeIndex.value]
    if (opt) toggle(opt.value)
  }
}



// 选项变化后把高亮索引夹到范围内
watch(visible, (list) => {
  if (activeIndex.value >= list.length) activeIndex.value = list.length - 1
})
</script>

<template>
  <div
    ref="root"
    class="wd-select"
    :class="{ 'wd-select--open': open, 'wd-select--disabled': disabled, 'wd-select--multiple': multiple }"
    @keydown="onKeydown"
  >
    <button
      ref="triggerEl"
      type="button"
      class="wd-select__trigger"
      :class="[`wd-select__trigger--${size}`, { 'wd-select__trigger--tags': multiple && hasValue }]"
      :disabled="disabled"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-activedescendant="open && activeIndex >= 0 ? optId(activeIndex) : undefined"
      @click="toggleOpen"
    >
      <!-- 多选：标签堆叠 -->
      <template v-if="multiple && hasValue">
        <span class="wd-select__tags">
          <span v-for="o in shownTags" :key="o.value" class="wd-select__tag">
            {{ o.label }}
            <button
              v-if="!disabled"
              type="button"
              class="wd-select__tag-x"
              :aria-label="`移除 ${o.label}`"
              @click="removeTag(o.value, $event)"
            >
              <wd-icon name="close" :size="12" />
            </button>
          </span>
          <span v-if="overflowCount" class="wd-select__tag wd-select__tag--more">+{{ overflowCount }}</span>
        </span>
      </template>

      <!-- 单选 -->
      <span v-else-if="!multiple && hasValue" class="wd-select__value">{{ singleLabel }}</span>
      <span v-else class="wd-select__placeholder">{{ placeholder }}</span>

      <span class="wd-select__actions">
        <button
          v-if="showClear"
          type="button"
          class="wd-select__clear"
          aria-label="清除"
          @click="clear"
        >
          <wd-icon name="close" :size="12" />
        </button>
        <wd-icon class="wd-chevron" :class="{ 'wd-chevron--open': open }" name="chevron-down" :size="14" />
      </span>
    </button>

  </div>

  <Teleport to="body">
    <div
      ref="menuEl"
      class="wd-select__menu"
      :class="{ 'is-open': open }"
      :style="{ top: pos.top + 'px', left: pos.left + 'px', minWidth: '220px' }"
      :id="listboxId"
      role="listbox"
      :aria-multiselectable="multiple || undefined"
    >
        <!-- 搜索框 -->
        <div v-if="filterable" class="wd-select__search">
          <input
            ref="searchEl"
            v-model="search"
            type="text"
            placeholder="输入关键字筛选…"
            @click.stop
          />
        </div>

        <button
          v-for="(o, i) in visible"
          :key="o.value"
          type="button"
          :id="optId(i)"
          role="option"
          class="wd-select__option"
          :class="{
            'wd-select__option--active': selected.includes(o.value),
            'wd-select__option--hover': i === activeIndex,
            'wd-select__option--disabled': o.disabled,
          }"
          :aria-selected="selected.includes(o.value)"
          :disabled="o.disabled"
          @click="toggle(o.value)"
          @mouseenter="activeIndex = i"
        >
          <span>{{ o.label }}</span>
          <wd-icon v-if="selected.includes(o.value)" class="wd-select__option-mark" name="check" :size="14" />
        </button>

        <div v-if="!visible.length" class="wd-select__empty">无匹配项</div>
    </div>
  </Teleport>
</template>
