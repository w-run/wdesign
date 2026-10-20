<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'WdTree' })

export interface WdTreeNode {
  /** 唯一标识（缺省用 label） */
  key?: string | number
  label: string
  children?: WdTreeNode[]
  disabled?: boolean
  /** 前置图标：用 slot#icon 自定义时可不填 */
  icon?: string
  /** 是否为叶子（children 为空但想显示成可展开时用） */
  isLeaf?: boolean
  /** 业务数据 */
  data?: unknown
}

const props = withDefaults(
  defineProps<{
    nodes?: WdTreeNode[]
    /** 已展开的 key */
    expandedKeys?: (string | number)[]
    /** 选中（单选高亮）的 key */
    selectedKey?: string | number | null
    /** 勾选模式：显示复选框 */
    checkable?: boolean
    /** 已勾选的 key */
    checkedKeys?: (string | number)[]
    /** 勾选是否级联到父子 */
    cascade?: boolean
    /** 支持多选（配合 checkable） */
    showLine?: boolean
    /** 空数据文案 */
    emptyText?: string
    /** 每级缩进（px） */
    indent?: number
  }>(),
  {
    nodes: () => [],
    expandedKeys: () => [],
    selectedKey: null,
    checkable: false,
    checkedKeys: () => [],
    cascade: true,
    showLine: false,
    emptyText: '暂无数据',
    indent: 18,
  },
)

const emit = defineEmits<{
  (e: 'update:expandedKeys', keys: (string | number)[]): void
  (e: 'update:selectedKey', key: string | number): void
  (e: 'update:checkedKeys', keys: (string | number)[]): void
  (e: 'select', node: WdTreeNode): void
  (e: 'check', node: WdTreeNode, checked: boolean): void
  (e: 'expand', node: WdTreeNode, expanded: boolean): void
}>()

const keyOf = (n: WdTreeNode): string | number => n.key ?? n.label

/** 内部维护展开态（受控时以上层为准） */
const innerExpanded = ref<(string | number)[]>([...props.expandedKeys])
const expanded = computed(() => (props.expandedKeys ? props.expandedKeys : innerExpanded.value))

function isExpanded(k: string | number) {
  return expanded.value.includes(k)
}

const innerChecked = ref<(string | number)[]>([...props.checkedKeys])
const checked = computed(() => (props.checkedKeys ? props.checkedKeys : innerChecked.value))
const isChecked = (k: string | number) => checked.value.includes(k)

/** 搜集某节点下所有 key（含自身） */
function collectKeys(n: WdTreeNode, out: (string | number)[] = []) {
  out.push(keyOf(n))
  n.children?.forEach((c) => collectKeys(c, out))
  return out
}

/** 祖先链：返回某 key 的所有祖先节点 */
function ancestry(target: string | number, list = props.nodes, trail: WdTreeNode[] = []): WdTreeNode[] {
  for (const n of list) {
    if (keyOf(n) === target) return trail
    if (n.children) {
      const r = ancestry(target, n.children, [...trail, n])
      if (r.length || keyOf(n) === target) return r
    }
  }
  return []
}

function toggleExpand(n: WdTreeNode) {
  const k = keyOf(n)
  const next = isExpanded(k) ? expanded.value.filter((x) => x !== k) : [...expanded.value, k]
  if (!props.expandedKeys) innerExpanded.value = next
  emit('update:expandedKeys', next)
  emit('expand', n, !isExpanded(k))
}

function select(n: WdTreeNode) {
  if (n.disabled) return
  emit('update:selectedKey', keyOf(n))
  emit('select', n)
}

/**
 * 勾选：级联模式下
 *  - 勾父 → 子全勾
 *  - 勾子 → 父看情况（子全勾则父勾，否则父取消）
 * 特意不做「半选」的完整建模，半选只用于视觉（部分子被勾）。
 */
function toggleCheck(n: WdTreeNode) {
  if (n.disabled) return
  const k = keyOf(n)
  const on = !isChecked(k)
  let next = new Set(checked.value)

  const setDeep = (node: WdTreeNode, v: boolean) => {
    const kk = keyOf(node)
    if (v) next.add(kk)
    else next.delete(kk)
    node.children?.forEach((c) => setDeep(c, v))
  }

  if (props.cascade) setDeep(n, on)
  else on ? next.add(k) : next.delete(k)

  if (props.cascade) {
    // 自底向上修正祖先：子节点全勾则勾父，否则不勾
    let chain = ancestry(k)
    for (let i = chain.length - 1; i >= 0; i--) {
      const p = chain[i]
      const kids = p.children || []
      const all = kids.length > 0 && kids.every((c) => next.has(keyOf(c)))
      all ? next.add(keyOf(p)) : next.delete(keyOf(p))
    }
  }

  const arr = [...next]
  if (!props.checkedKeys) innerChecked.value = arr
  emit('update:checkedKeys', arr)
  emit('check', n, on)
}

/** 半选：有子节点被勾但未全勾 */
function isIndeterminate(n: WdTreeNode): boolean {
  if (!props.checkable || !props.cascade) return false
  const kids = n.children || []
  if (!kids.length) return false
  const on = kids.filter((c) => isChecked(keyOf(c))).length
  return on > 0 && on < kids.length
}

/** 扁平化可见节点，供键盘上下导航 */
const flat = computed(() => {
  const out: { node: WdTreeNode; depth: number; parent: WdTreeNode | null }[] = []
  const walk = (list: WdTreeNode[], depth: number, parent: WdTreeNode | null) => {
    for (const n of list) {
      out.push({ node: n, depth, parent })
      if (n.children?.length && isExpanded(keyOf(n))) walk(n.children, depth + 1, n)
    }
  }
  walk(props.nodes, 0, null)
  return out
})

const focusKey = ref<string | number | null>(null)
const treeEl = ref<HTMLElement | null>(null)

/** 按 key 把焦点落到对应节点上 */
function focusNode(k: string | number) {
  focusKey.value = k
  treeEl.value
    ?.querySelector<HTMLElement>(`[data-k="${CSS.escape(String(k))}"]`)
    ?.focus()
}

function moveFocus(dir: 1 | -1) {
  const list = flat.value.filter((x) => !x.node.disabled)
  if (!list.length) return
  /**
   * 焦点起点优先取当前实际焦点的节点，其次 focusKey，最后回落到选中项。
   * 否则用户点选某项后按方向键，会从列表第一项开始跳而不是从选中项相邻处开始。
   */
  const curKey =
    (document.activeElement as HTMLElement | null)?.getAttribute?.('data-k') ??
    (focusKey.value !== null ? String(focusKey.value) : null) ??
    (props.selectedKey !== null && props.selectedKey !== undefined ? String(props.selectedKey) : null)

  const i = list.findIndex((x) => String(keyOf(x.node)) === curKey)
  const next = i < 0 ? 0 : Math.min(list.length - 1, Math.max(0, i + dir))
  focusNode(keyOf(list[next].node))
}

function onKeydown(e: KeyboardEvent, entry: { node: WdTreeNode }) {
  const n = entry.node
  const k = keyOf(n)
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); moveFocus(1); break
    case 'ArrowUp': e.preventDefault(); moveFocus(-1); break
    case 'ArrowRight':
      e.preventDefault()
      if (n.children?.length && !isExpanded(k)) toggleExpand(n)
      else moveFocus(1)
      break
    case 'ArrowLeft': {
      e.preventDefault()
      const parent = flat.value.find((x) => keyOf(x.node) === k)?.parent
      if (n.children?.length && isExpanded(k)) toggleExpand(n)
      else if (parent) focusNode(keyOf(parent))
      break
    }
    case 'Enter':
    case ' ':
      e.preventDefault()
      select(n)
      break
  }
}

watch(
  () => props.expandedKeys,
  (v) => { if (v) innerExpanded.value = [...v] },
)
watch(
  () => props.checkedKeys,
  (v) => { if (v) innerChecked.value = [...v] },
)

const depthPad = (d: number) => `${d * props.indent + 8}px`

/**
 * 引导线的水平位置：取「父级箭头中心」。
 * 箭头宽 16px，父级 paddingLeft = d*indent+8，所以子级线在
 * (d-1)*indent + 8 + 8 处 —— 与父级箭头视觉中心对齐。
 */
function lineX(depth: number) {
  if (!depth) return '0px'
  return `${(depth - 1) * props.indent + 8 + 8}px`
}
</script>

<template>
  <div
    ref="treeEl"
    class="wd-tree"
    :class="{ 'wd-tree--line': showLine }"
    role="tree"
    @keydown.self.prevent
  >
    <template v-for="entry in flat" :key="keyOf(entry.node)">
      <div
        class="wd-tree__node"
        role="treeitem"
        :data-k="keyOf(entry.node)"
        :tabindex="entry.node.disabled ? -1 : 0"
        :aria-expanded="entry.node.children?.length ? isExpanded(keyOf(entry.node)) : undefined"
        :aria-selected="selectedKey === keyOf(entry.node)"
        :aria-disabled="entry.node.disabled || undefined"
        :class="{
          'wd-tree__node--selected': selectedKey === keyOf(entry.node),
          'wd-tree__node--disabled': entry.node.disabled,
        }"
        :style="{ paddingLeft: depthPad(entry.depth), '--wd-tree-line-x': lineX(entry.depth) }"
        @click="select(entry.node)"
        @keydown="onKeydown($event, entry)"
      >
        <span
          class="wd-tree__arrow"
          :class="{ 'wd-tree__arrow--open': isExpanded(keyOf(entry.node)), 'wd-tree__arrow--leaf': !entry.node.children?.length }"
          @click.stop="entry.node.children?.length && toggleExpand(entry.node)"
        >
          <wd-icon v-if="entry.node.children?.length" name="chevron-right" :size="10" />
        </span>

        <label v-if="checkable" class="wd-tree__check" @click.stop>
          <input
            type="checkbox"
            :checked="isChecked(keyOf(entry.node))"
            :indeterminate.prop="isIndeterminate(entry.node)"
            :disabled="entry.node.disabled"
            @change="toggleCheck(entry.node)"
          />
        </label>

        <span v-if="entry.node.icon || $slots.icon" class="wd-tree__icon">
          <slot name="icon" :node="entry.node">{{ entry.node.icon }}</slot>
        </span>

        <span class="wd-tree__label">
          <slot name="label" :node="entry.node">{{ entry.node.label }}</slot>
        </span>

        <span v-if="$slots.extra" class="wd-tree__extra" @click.stop>
          <slot name="extra" :node="entry.node" />
        </span>
      </div>
    </template>

    <div v-if="!flat.length" class="wd-tree__empty">{{ emptyText }}</div>
  </div>
</template>
