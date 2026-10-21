<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed } from 'vue'

defineOptions({ name: 'WdTabBar' })

/** 底部导航项 */
export interface TabBarItem {
  /** 唯一键 */
  key: string
  /** 文案 */
  label: string
  /** 图标名（wd-icon） */
  icon: string
  /** 选中态图标（可选，填充图标更适合表示"当前"） */
  activeIcon?: string
  /** 角标数字 */
  badge?: number | string
}

const props = withDefaults(
  defineProps<{
    /** 导航项，2~5 个 */
    items: TabBarItem[]
    /** 当前选中项 key */
    modelValue?: string
    /**
     * 悬浮胶囊形态：脱离边缘、带阴影、圆角全圆（参考移动端 App）。
     * 关掉就是贴在容器底部的通栏。
     */
    floating?: boolean
    /** 右侧独立的圆形「+」按钮 */
    fab?: boolean
    /** FAB 图标名 */
    fabIcon?: string
  }>(),
  { modelValue: '', floating: true, fab: false, fabIcon: 'plus' },
)

const emit = defineEmits<{
  /** 切换选中项 */
  (e: 'update:modelValue', key: string): void
  /** 点击 FAB */
  (e: 'fab'): void
}>()

const activeKey = computed(() => props.modelValue)
</script>

<template>
  <div class="wd-tab-bar" :class="{ 'wd-tab-bar--floating': floating, 'wd-tab-bar--with-fab': fab }">
    <div class="wd-tab-bar__rail" role="tablist">
      <button
        v-for="it in items"
        :key="it.key"
        type="button"
        role="tab"
        class="wd-tab-bar__item"
        :class="{ 'is-on': it.key === activeKey }"
        :aria-selected="it.key === activeKey"
        @click="emit('update:modelValue', it.key)"
      >
        <span class="wd-tab-bar__icon">
          <wd-icon :name="it.key === activeKey && it.activeIcon ? it.activeIcon : it.icon" :size="22" />
          <i v-if="it.badge" class="wd-tab-bar__badge">{{ it.badge }}</i>
        </span>
        <span class="wd-tab-bar__label">{{ it.label }}</span>
      </button>
    </div>

    <button v-if="fab" type="button" class="wd-tab-bar__fab" aria-label="新建" @click="emit('fab')">
      <wd-icon :name="fabIcon" :size="24" />
    </button>
  </div>
</template>
