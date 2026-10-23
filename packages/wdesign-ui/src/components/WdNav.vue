<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, nextTick, ref, watch } from 'vue'

defineOptions({ name: 'WdNav' })

export interface WdNavItem {
  /** 唯一标识（用于 v-model:active） */
  key: string
  /** 显示文字 */
  label?: string
  /** 图标名（wd-icon） */
  icon?: string
  /** 链接地址；不传则视为按钮，点击只触发事件 */
  href?: string
  disabled?: boolean
  /** 右上角小圆点（有新内容时提示） */
  dot?: boolean
  /** 数字角标（未读数 / 待办数）。与 dot 二选一，数量型信息用 badge */
  badge?: number | string
  /** 内部分组标题（仅竖栏有意义） */
  group?: string
}

const props = withDefaults(
  defineProps<{
    /** 未激活时的取向：横栏（顶部）/ 竖栏（侧边） */
    direction?: 'horizontal' | 'vertical'
    /** 导航项列表，每一项的 key 必须唯一 */
    items?: WdNavItem[]
    /** 当前激活项 key */
    active?: string
    /** 品牌区文字（可被 #brand 插槽覆盖） */
    brand?: string
    /**
     * 竖栏折叠成纯图标（宽度收窄）。
     * 横栏此项无效。
     */
    collapsed?: boolean
    /**
     * 竖栏强制纯图标（不显示文字，但仍保留 title 提示）。
     * 与 collapsed 的区别：collapsed 是"可展开的收起状态"，
     * iconOnly 是"永远只有图标"。
     */
    iconOnly?: boolean
    /** 是否吸顶 / 吸附在容器顶部（横栏） */
    sticky?: boolean
    /** 尺寸 */
    size?: 'sm' | 'md'
    /**
     * 分组可折叠（仅竖栏）。
     *
     * 导航一长（比如文档站侧栏几十项），眼睛找不到落点 ——
     * 分组能收起来之后，一屏内就能看清"有哪几类"，需要时再展开。
     */
    collapsibleGroups?: boolean
    /** 默认收起的分组名（配合 collapsibleGroups） */
    defaultCollapsedGroups?: string[]
    /**
     * 当前项变化时自动滚进可视区（默认开）。
     * 侧栏几十项时，从别处跳进一个深项，不做这件事就等于"看不见当前在哪"。
     */
    scrollActiveIntoView?: boolean
  }>(),
  {
    direction: 'horizontal',
    items: () => [],
    active: '',
    brand: '',
    collapsed: false,
    iconOnly: false,
    sticky: true,
    size: 'md',
    collapsibleGroups: false,
    defaultCollapsedGroups: () => [],
    scrollActiveIntoView: true,
  },
)

const emit = defineEmits<{
  /** 点击导航项时触发，参数为该项目的 key，用于 v-model:active */
  'update:active': [key: string]
  /** 点击可用导航项时触发，参数为该项完整数据；禁用项不触发 */
  select: [item: WdNavItem]
  /** 点击折叠按钮时触发，参数为期望的折叠状态，用于 v-model:collapsed */
  'update:collapsed': [value: boolean]
}>()

const isVertical = computed(() => props.direction === 'vertical')

/** 折叠时是否只剩图标 */
const thin = computed(() => isVertical.value && (props.collapsed || props.iconOnly))

function onSelect(item: WdNavItem, e: MouseEvent) {
  if (item.disabled) {
    e.preventDefault()
    return
  }
  emit('update:active', item.key)
  emit('select', item)
}

/** 收起的分组名集合（内部维护；分组名重复时以第一个为准） */
/*
 * 键盘导航：竖栏 ↑↓、横栏 ←→、Home/End 到首末项。
 * 导航是一组同类控件，只能用 Tab 一个个过是最低标准；
 * 方向键在组内移动才是列表该有的行为。
 */
const navEl = ref<HTMLElement | null>(null)

function onNavKeydown(e: KeyboardEvent) {
  const forward = isVertical.value ? 'ArrowDown' : 'ArrowRight'
  const backward = isVertical.value ? 'ArrowUp' : 'ArrowLeft'
  if (![forward, backward, 'Home', 'End'].includes(e.key)) return
  const list = Array.from(
    navEl.value?.querySelectorAll<HTMLElement>('.wd-nav__item:not(:disabled)') ?? [],
  )
  if (!list.length) return
  const cur = list.indexOf(document.activeElement as HTMLElement)
  let next = cur
  if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = list.length - 1
  else if (e.key === forward) next = Math.min(list.length - 1, cur + 1)
  else next = Math.max(0, cur - 1)
  if (next !== cur) {
    e.preventDefault()
    list[next]?.focus()
  }
}

const collapsedGroups = ref<Set<string>>(new Set(props.defaultCollapsedGroups))

function isGroupCollapsed(title: string) {
  return collapsedGroups.value.has(title)
}

/** 收起的分组不渲染子项（v-for 里过滤，避免 v-if 和 v-for 写在同一节点上） */
function visibleItems(g: { title: string; items: WdNavItem[] }) {
  if (!props.collapsibleGroups || !g.title) return g.items
  return isGroupCollapsed(g.title) ? [] : g.items
}

function toggleGroup(title: string) {
  const next = new Set(collapsedGroups.value)
  if (next.has(title)) next.delete(title)
  else next.add(title)
  collapsedGroups.value = next
}

function toggleCollapse() {
  if (props.iconOnly) return
  emit('update:collapsed', !props.collapsed)
}

/** 列表容器（用于把当前项滚进可视区） */
const listEl = ref<HTMLElement | null>(null)

/**
 * active 变化时做两件事（竖栏才有意义）：
 *   1. 它所在分组被收起 → 展开（否则当前项被藏在收起的分组里，等于丢了）
 *   2. 把它滚进可视区（侧栏几十项时，跳进一个深项要能看见自己在哪）
 */
watch(
  () => props.active,
  async (key) => {
    if (!key) return
    if (props.collapsibleGroups) {
      const item = props.items.find((it) => it.key === key)
      if (item?.group && collapsedGroups.value.has(item.group)) {
        const next = new Set(collapsedGroups.value)
        next.delete(item.group)
        collapsedGroups.value = next
      }
    }
    if (!props.scrollActiveIntoView) return
    await nextTick()
    listEl.value?.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' })
  },
  { immediate: true },
)

/**
 * 按 group 分组（仅竖栏用）。
 * 没有 group 的项归到一组（group 为空字符串）。
 */
const groups = computed(() => {
  if (!isVertical.value) return [{ title: '', items: props.items }]
  const map = new Map<string, WdNavItem[]>()
  for (const it of props.items) {
    const g = it.group ?? ''
    if (!map.has(g)) map.set(g, [])
    map.get(g)!.push(it)
  }
  return [...map.entries()].map(([title, items]) => ({ title, items }))
})

/**
 * 图标的默认尺寸：横栏略小，竖栏略大（竖栏是点击主体）。
 *
 * 纯图标态（iconOnly / collapsed）再大一档：没有文字兜底时，
 * 图标是唯一语义 —— 17px 塞在 46px 的圆里会显得又小又"扁"，
 * 视觉重量撑不起点击目标。
 */
const iconSize = computed(() => {
  if (isVertical.value) {
    if (thin.value) return props.size === 'sm' ? 19 : 21
    return props.size === 'sm' ? 17 : 19
  }
  return props.size === 'sm' ? 14 : 16
})
</script>

<template>
  <nav
    ref="navEl"
    class="wd-nav"
    :class="[
      `wd-nav--${direction}`,
      `wd-nav--${size}`,
      {
        'is-collapsed': thin,
        'is-sticky': sticky && !isVertical,
      },
    ]"
    :aria-label="brand || '导航'"
    @keydown="onNavKeydown"
  >
    <!-- 品牌区 -->
    <div class="wd-nav__brand">
      <slot name="brand">
        <span v-if="brand" class="wd-nav__brand-text">{{ brand }}</span>
      </slot>
      <!-- 竖栏折叠按钮：放在品牌下方，与图标竖直对齐 -->
      <button
        v-if="isVertical && !iconOnly && (collapsed || items.length)"
        type="button"
        class="wd-nav__collapse"
        :aria-label="collapsed ? '展开导航' : '收起导航'"
        :aria-expanded="!collapsed"
        @click="toggleCollapse"
      >
        <wd-icon
          :name="collapsed ? 'arrow-right' : 'arrow-left'"
          :size="13"
        />
      </button>
    </div>

    <!-- 导航项 -->
    <div ref="listEl" class="wd-nav__list">
      <template v-for="(g, gi) in groups" :key="gi">
        <!-- 分组头：可折叠时是个按钮，点击收起/展开这一组 -->
        <button
          v-if="g.title && !thin && collapsibleGroups"
          type="button"
          class="wd-nav__group is-toggle"
          :class="{ 'is-collapsed': isGroupCollapsed(g.title) }"
          :aria-expanded="!isGroupCollapsed(g.title)"
          @click="toggleGroup(g.title)"
        >
          <span>{{ g.title }}</span>
          <wd-icon class="wd-nav__group-arrow" name="chevron-down" :size="12" />
        </button>
        <div v-else-if="g.title && !thin" class="wd-nav__group">{{ g.title }}</div>

        <component
          :is="it.href ? 'a' : 'button'"
          v-for="it in visibleItems(g)"
          :key="it.key"
          class="wd-nav__item"
          :class="{
            'is-active': it.key === active,
            'is-disabled': it.disabled,
          }"
          :href="it.href"
          :type="it.href ? undefined : 'button'"
          :aria-current="it.key === active ? 'page' : undefined"
          :title="thin && it.label ? it.label : undefined"
          @click="onSelect(it, $event)"
        >
          <!--
            图标容器只在需要时渲染：
              · 有 icon → 显示图标
              · 竖栏无 icon → 显示首字占位（竖栏靠图标辨识，必须有视觉锚点）
              · **横栏无 icon → 什么都不显示**（横栏靠文字辨识，
                加首字占位会出现"指 指南"这种重复）
          -->
          <span v-if="it.icon || isVertical" class="wd-nav__icon">
            <wd-icon v-if="it.icon" :name="it.icon" :size="iconSize" />
            <span v-else class="wd-nav__icon-fallback">{{ (it.label || '?').slice(0, 1) }}</span>
            <span v-if="it.dot" class="wd-nav__dot"></span>
            <i v-if="it.badge" class="wd-nav__badge">{{ it.badge }}</i>
          </span>
          <span v-if="!thin && it.label" class="wd-nav__label">{{ it.label }}</span>
        </component>
      </template>
    </div>

    <!-- 底部区（主题切换 / 用户 / 退出） -->
    <div v-if="$slots.footer" class="wd-nav__footer">
      <slot name="footer" />
    </div>
  </nav>
</template>
