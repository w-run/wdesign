<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'

defineOptions({ name: 'WdStatBar' })

/** 一组里的单个统计项 */
export interface StatBarItem {
  /** 数值（数字或已格式化的字符串） */
  value: number | string
  /** 说明文字 */
  label: string
  /** 前缀：货币符号等 */
  prefix?: string
  /** 后缀：单位、百分号 */
  suffix?: string
  /** 环比文案，如 "12%" */
  trend?: string
  /** 趋势方向：up 绿 / down 红 */
  dir?: 'up' | 'down'
}

withDefaults(
  defineProps<{
    /** 2~4 组最佳，再多就挤 */
    items: StatBarItem[]
    /** 尺寸档：sm 用于表格上方、md 默认、lg 用于页面顶部 */
    size?: 'sm' | 'md' | 'lg'
    /**
     * 是否带浅灰底 + 圆角（参考界面里那种"统计条"）。
     * 关掉就是裸的三列数字，适合直接贴在卡片顶部。
     */
    surface?: boolean
  }>(),
  { size: 'md', surface: true },
)
</script>

<template>
  <div
    class="wd-stat-bar"
    :class="[`wd-stat-bar--${size}`, { 'wd-stat-bar--surface': surface }]"
  >
    <div v-for="(it, i) in items" :key="i" class="wd-stat-bar__item">
      <div class="wd-stat-bar__value">
        <span v-if="it.prefix" class="wd-stat-bar__affix">{{ it.prefix }}</span>
        <span class="wd-stat-bar__num">{{ it.value }}</span>
        <span v-if="it.suffix" class="wd-stat-bar__affix">{{ it.suffix }}</span>
        <span
          v-if="it.trend"
          class="wd-stat-bar__trend"
          :class="`wd-stat-bar__trend--${it.dir || 'up'}`"
        >
          <wd-icon :name="it.dir === 'down' ? 'arrow-down-right' : 'arrow-up-right'" :size="11" />
          {{ it.trend }}
        </span>
      </div>
      <p class="wd-stat-bar__label">{{ it.label }}</p>
    </div>
  </div>
</template>
