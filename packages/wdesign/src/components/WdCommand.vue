<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'WdCommand' })

export interface WdCommandItem {
  /** 唯一标识 */
  key: string
  label: string
  /** 补充说明（显示在右侧或下方） */
  hint?: string
  /** 分组名 */
  group?: string
  /**
   * 图标名（wdesign-icons 的名字，如 file / folder / trash），
   * 由 WdIcon 渲染。不要传 emoji —— 各平台字形、粗细、基线不一致，
   * 且无法跟随 currentColor 变色，深浅主题下表现不可控。
   */
  icon?: string
  /** 快捷键提示，如 ⌘K */
  shortcut?: string
  /** 关键词（label 之外的额外匹配词） */
  keywords?: string[]
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    items?: WdCommandItem[]
    placeholder?: string
    /** 无匹配时文案 */
    emptyText?: string
    /** 自动聚焦输入框 */
    autofocus?: boolean
    /** 最大显示高度（px） */
    maxHeight?: number
  }>(),
  {
    modelValue: false,
    items: () => [],
    placeholder: '输入命令或搜索…',
    emptyText: '没有匹配的结果',
    autofocus: true,
    maxHeight: 380,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'select', item: WdCommandItem): void
  /** 输入变化（可用于远程搜索） */
  (e: 'search', q: string): void
}>()

const q = ref('')
const activeIdx = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)
const listEl = ref<HTMLElement | null>(null)

/**
 * 匹配：label / hint / keywords 任一包含查询词即命中。
 * 同时给一个简单的相关度打分——前缀命中 > 包含命中，
 * 这样输入 "de" 时 "Delete" 排在 "Undo delete" 前面。
 */
function score(item: WdCommandItem, needle: string): number {
  const low = needle.toLowerCase()
  const label = item.label.toLowerCase()
  if (label.startsWith(low)) return 0
  if (label.includes(low)) return 1
  if (item.hint?.toLowerCase().includes(low)) return 2
  if (item.keywords?.some((k) => k.toLowerCase().includes(low))) return 3
  return -1
}

const filtered = computed(() => {
  const needle = q.value.trim()
  if (!needle) return props.items
  return props.items
    .map((it) => ({ it, s: score(it, needle) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => a.s - b.s)
    .map((x) => x.it)
})

/** 按 group 分组，保持原顺序 */
const groups = computed(() => {
  const out: { name: string; items: WdCommandItem[] }[] = []
  const idx = new Map<string, number>()
  for (const it of filtered.value) {
    const g = it.group || ''
    if (!idx.has(g)) {
      idx.set(g, out.length)
      out.push({ name: g, items: [] })
    }
    out[idx.get(g)!].items.push(it)
  }
  return out
})

/** 扁平索引，键盘上下移动用 */
const flatFiltered = computed(() => filtered.value.filter((i) => !i.disabled))

watch(filtered, () => { activeIdx.value = 0 })
watch(q, (v) => emit('search', v))

function close() {
  emit('update:modelValue', false)
  q.value = ''
}

function choose(it?: WdCommandItem) {
  const target = it ?? flatFiltered.value[activeIdx.value]
  if (!target || target.disabled) return
  emit('select', target)
  close()
}

function move(dir: 1 | -1) {
  const n = flatFiltered.value.length
  if (!n) return
  activeIdx.value = (activeIdx.value + dir + n) % n
  nextTick(() => {
    listEl.value
      ?.querySelector<HTMLElement>(`[data-idx="${activeIdx.value}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  })
}

/** 当前高亮项在扁平列表里的序号（渲染时用） */
function idxOf(item: WdCommandItem) {
  return flatFiltered.value.indexOf(item)
}

function onKey(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); move(1); break
    case 'ArrowUp': e.preventDefault(); move(-1); break
    case 'Enter': e.preventDefault(); choose(); break
    case 'Escape': e.preventDefault(); close(); break
  }
}

/**
 * 全局 ⌘K / Ctrl+K 唤起。
 * 默认开：命令面板的价值就在「随手可呼出」，每次都要显式传参太啰嗦。
 */
function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    emit('update:modelValue', !props.modelValue)
  }
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGlobalKey)
})

watch(
  () => props.modelValue,
  async (v) => {
    if (v) {
      q.value = ''
      activeIdx.value = 0
      await nextTick()
      if (props.autofocus) inputEl.value?.focus()
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="wd-command" role="dialog" aria-modal="true" aria-label="命令面板">
      <div class="wd-command__mask" @click="close" />

      <div class="wd-command__panel" :style="{ maxHeight: maxHeight + 'px' }">
        <div class="wd-command__input-row">
          <svg class="wd-command__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.2-3.2"></path></svg>
          <input
            ref="inputEl"
            v-model="q"
            class="wd-command__input"
            :placeholder="placeholder"
            type="text"
            spellcheck="false"
            autocomplete="off"
            @keydown="onKey"
          />
          <kbd class="wd-command__esc">ESC</kbd>
        </div>

        <div ref="listEl" class="wd-command__list">
          <template v-for="g in groups" :key="g.name">
            <div v-if="g.name" class="wd-command__group">{{ g.name }}</div>
            <button
              v-for="it in g.items"
              :key="it.key"
              type="button"
              class="wd-command__item"
              :data-idx="idxOf(it)"
              :class="{
                'wd-command__item--active': idxOf(it) === activeIdx,
                'wd-command__item--disabled': it.disabled,
              }"
              :disabled="it.disabled"
              @click="choose(it)"
              @mousemove="!it.disabled && (activeIdx = idxOf(it))"
            >
              <span v-if="it.icon || $slots.icon" class="wd-command__item-icon">
                <slot name="icon" :item="it">
                  <wd-icon :name="it.icon!" :size="16" />
                </slot>
              </span>
              <span class="wd-command__item-main">
                <span class="wd-command__item-label">{{ it.label }}</span>
                <span v-if="it.hint" class="wd-command__item-hint">{{ it.hint }}</span>
              </span>
              <kbd v-if="it.shortcut" class="wd-command__item-shortcut">{{ it.shortcut }}</kbd>
            </button>
          </template>

          <div v-if="!filtered.length" class="wd-command__empty">{{ emptyText }}</div>
        </div>

        <div class="wd-command__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> 选择</span>
          <span><kbd>↵</kbd> 确认</span>
          <span><kbd>esc</kbd> 关闭</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
