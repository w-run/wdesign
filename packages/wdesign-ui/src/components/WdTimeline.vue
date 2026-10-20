<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, ref } from 'vue'

defineOptions({ name: 'WdTimeline' })

export interface WdTimelineItem {
  /** 时间/阶段标签 */
  period?: string
  /** 标题 */
  title: string
  /** 描述 */
  desc?: string
  /** 节点颜色，默认主色 */
  color?: string
  /** 节点图标（用 WdIcon 名字，优先于圆点） */
  icon?: string
  /** 该节点是否高亮（强调"当前进度"） */
  active?: boolean
  /** 该节点是否禁用（置灰） */
  disabled?: boolean
  /** 可折叠时的子内容 */
  detail?: string
}

const props = withDefaults(
  defineProps<{
    /** 节点数据：按顺序渲染，颜色/图标/高亮等由单项字段控制 */
    items: WdTimelineItem[]
    /** 是否画贯穿竖线（老 API，等价于 line-style="solid"） */
    line?: boolean
    /**
     * 布局模式：
     *  vertical   — 纵向单列（默认）
     *  alternate  — 纵向但左右交替
     *  horizontal — 横向一排
     */
    mode?: 'vertical' | 'alternate' | 'horizontal'
    /** 连接线样式 */
    lineStyle?: 'solid' | 'dashed' | 'none'
    /** 节点大小 */
    size?: 'sm' | 'md'
    /** 是否允许点击节点展开 detail */
    collapsible?: boolean
  }>(),
  {
    line: false,
    mode: 'vertical',
    lineStyle: 'solid',
    size: 'md',
    collapsible: false,
  },
)

const emit = defineEmits<{
  /** 节点点击：collapsible 且该节点有 detail 时触发，参数为节点数据与序号 */
  'item-click': [item: WdTimelineItem, index: number]
}>()

/** 展开的项（collapsible 模式） */
const expanded = ref<Set<number>>(new Set())

function toggle(i: number, item: WdTimelineItem) {
  if (!props.collapsible || !item.detail) return
  const next = new Set(expanded.value)
  if (next.has(i)) next.delete(i)
  else next.add(i)
  expanded.value = next
  emit('item-click', item, i)
}

/**
 * 连接线样式最终值。
 *
 * 老 API 是 `line: boolean`（是否画贯穿线），新 API 是 `lineStyle`。
 * 兼容规则：
 *   · 显式传了 lineStyle('dashed' / 'none') → 用它
 *   · 否则若 line === false 且没传 lineStyle → **也不画线**（尊重老语义）
 *   · 其余情况用 solid
 *
 * 注：这里不能简单地让 lineStyle 默认 'solid' 就完事 ——
 * 老组件默认 line=false 表示"不画线"，直接给 solid 会改变既有视觉。
 */
const resolvedLine = computed(() => {
  if (props.lineStyle !== 'solid') return props.lineStyle
  // line 未显式传（undefined 经默认值变成 false）时按老语义不画
  return props.line ? 'solid' : 'none'
})

const isHorizontal = computed(() => props.mode === 'horizontal')
</script>

<template>
  <ul
    class="wd-timeline"
    :class="[
      `wd-timeline--${mode}`,
      `wd-timeline--line-${resolvedLine}`,
      `wd-timeline--${size}`,
    ]"
  >
    <li
      v-for="(it, i) in items"
      :key="i"
      class="wd-timeline__item"
      :class="{
        'is-active': it.active,
        'is-disabled': it.disabled,
        'is-clickable': collapsible && it.detail,
        'is-expanded': expanded.has(i),
        'is-last': i === items.length - 1,
      }"
      :style="it.color ? { '--tl-color': it.color } : undefined"
      @click="toggle(i, it)"
    >
      <!-- 节点 -->
      <span class="wd-timeline__node">
        <wd-icon v-if="it.icon" :name="it.icon" :size="size === 'sm' ? 11 : 13" />
        <span v-else class="wd-timeline__dot"></span>
      </span>

      <!-- 主体 -->
      <div class="wd-timeline__body">
        <span v-if="it.period" class="wd-timeline__period">{{ it.period }}</span>
        <h3 class="wd-timeline__title">
          {{ it.title }}
          <wd-icon
            v-if="collapsible && it.detail"
            class="wd-timeline__caret"
            :class="{ 'is-open': expanded.has(i) }"
            name="chevron-down"
            :size="13"
          />
        </h3>
        <p v-if="it.desc" class="wd-timeline__desc">{{ it.desc }}</p>

        <!--
          折叠内容用 v-show 而非 v-if：
          展开/收起是高频操作，保留 DOM 避免每次重建；
          同时 v-show 不参与 Transition，绕开动画时钟停摆的问题。
        -->
        <div
          v-if="collapsible && it.detail"
          v-show="expanded.has(i)"
          class="wd-timeline__detail"
        >
          {{ it.detail }}
        </div>
      </div>
    </li>
  </ul>
</template>
