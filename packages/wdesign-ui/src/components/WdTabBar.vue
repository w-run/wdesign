<script setup lang="ts">
import { computed } from 'vue'
import { WdIcon } from '@w-run/wdesign-icons'
import WdSegmented from './WdSegmented.vue'

defineOptions({ name: 'WdTabBar' })

/** 底部导航项 */
export interface TabBarItem {
  /** 唯一键 */
  key: string
  /** 文案（iconOnly 时只用于无障碍标签） */
  label: string
  /** 图标名（wd-icon） */
  icon: string
  /** 选中态图标（可选，填充图标更适合表达"当前"） */
  activeIcon?: string
  /** 数字角标 */
  badge?: number | string
}

const props = withDefaults(
  defineProps<{
    /** 导航项，2~5 个 */
    items: TabBarItem[]
    /** 当前选中项 key */
    modelValue?: string
    /** 悬浮胶囊形态：脱离容器边缘、带阴影、圆角全圆 */
    floating?: boolean
    /** 右侧独立的圆形「+」按钮 */
    fab?: boolean
    /** FAB 图标名 */
    fabIcon?: string
    /** 纯图标形态：不显示文字，高亮收成圆，整条更窄 */
    iconOnly?: boolean
  }>(),
  { modelValue: '', floating: true, fab: false, fabIcon: 'plus', iconOnly: false },
)

const emit = defineEmits<{
  (e: 'update:modelValue', key: string): void
  (e: 'fab'): void
}>()

/**
 * ⚠️ 这里是 **WdSegmented 的预设**，不是另一套实现。
 *
 * 底部导航和分段控件本质相同：一排等宽项 + 一个会平移的高亮块。
 * 之前给 TabBar 单独写了一套滑块 / 角标 / 首帧处理 —— 结果两边时长、缓动、
 * 首帧策略开始漂移，还各自漏 bug（FAB 被塞进胶囊、文字贴边…）。
 * 现在所有"会动"的部分都归 Segmented，TabBar 只负责：
 * 胶囊外壳 + FAB + 数据映射。
 */
const options = computed(() =>
  props.items.map((it) => ({
    label: it.label,
    value: it.key,
    icon: it.icon,
    activeIcon: it.activeIcon,
    badge: it.badge,
  })),
)

function onSelect(v: string | number) {
  emit('update:modelValue', String(v))
}
</script>

<template>
  <div
    class="wd-tab-bar"
    :class="{
      'wd-tab-bar--floating': floating,
      'wd-tab-bar--with-fab': fab,
      'wd-tab-bar--icon-only': iconOnly,
    }"
  >
    <WdSegmented
      class="wd-tab-bar__seg"
      :model-value="modelValue"
      :options="options"
      layout="stack"
      :icon-only="iconOnly"
      :block="!iconOnly"
      @update:model-value="onSelect"
    />

    <button v-if="fab" type="button" class="wd-tab-bar__fab" aria-label="新建" @click="emit('fab')">
      <wd-icon :name="fabIcon" :size="24" />
    </button>
  </div>
</template>
