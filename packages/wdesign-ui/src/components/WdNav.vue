<script setup lang="ts">
import { computed, ref } from 'vue'

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
  /** 内部分组标题（仅竖栏有意义） */
  group?: string
}

const props = withDefaults(
  defineProps<{
    /** 未激活时的取向：横栏（顶部）/ 竖栏（侧边） */
    direction?: 'horizontal' | 'vertical'
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
  },
)

const emit = defineEmits<{
  'update:active': [key: string]
  select: [item: WdNavItem]
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

function toggleCollapse() {
  if (props.iconOnly) return
  emit('update:collapsed', !props.collapsed)
}

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

/** 图标的默认尺寸：横栏略小，竖栏略大（竖栏是点击主体） */
const iconSize = computed(() => {
  if (isVertical.value) return props.size === 'sm' ? 17 : 19
  return props.size === 'sm' ? 14 : 16
})
</script>

<template>
  <nav
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
    <div class="wd-nav__list">
      <template v-for="(g, gi) in groups" :key="gi">
        <div v-if="g.title && !thin" class="wd-nav__group">{{ g.title }}</div>

        <component
          :is="it.href ? 'a' : 'button'"
          v-for="it in g.items"
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
