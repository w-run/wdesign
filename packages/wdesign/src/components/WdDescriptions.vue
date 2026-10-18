<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdDescriptions' })

export interface WdDescriptionItem {
  label: string
  value?: string | number
  /** 值区插槽名（需要自定义渲染时用 #key="{ item }"） */
  key?: string
  /** 跨列：占满整行可写 99 */
  span?: number
  /** 值区次要说明 */
  hint?: string
}

const props = withDefaults(
  defineProps<{
    items?: WdDescriptionItem[]
    /** 每行几列 */
    columns?: number
    /** 竖排样式（标签在上） */
    vertical?: boolean
    /** 斑马纹底色 */
    striped?: boolean
    /** 标签与值之间加冒号 */
    colon?: boolean
    /** 单元格内边距大小 */
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    items: () => [],
    columns: 3,
    vertical: false,
    striped: false,
    colon: false,
    size: 'md',
  },
)

/**
 * 把条目按 span 打包成行，保证每行不超过 columns 列。
 * 不做 CSS Grid 自动流的原因：span 跨越需要「回填」——如果一个
 * span=2 的项后面只剩 1 列，CSS 会把它整行推到下一行并留空。
 * 自己分行可以精确控制，也能让条纹底色按行对齐。
 */
const rows = computed(() => {
  const out: WdDescriptionItem[][] = []
  const cols = Math.max(1, props.columns)
  let cur: WdDescriptionItem[] = []
  let used = 0
  for (const it of props.items) {
    const span = Math.min(it.span || 1, cols)
    // 当前行放不下且已有内容 → 换行
    if (used + span > cols && cur.length) {
      out.push(cur)
      cur = []
      used = 0
    }
    cur.push({ ...it, span })
    used += span
    if (used >= cols) {
      out.push(cur)
      cur = []
      used = 0
    }
  }
  if (cur.length) out.push(cur)
  return out
})

const styleVars = computed(() => ({ '--wd-desc-cols': String(Math.max(1, props.columns)) }))
</script>

<template>
  <div
    class="wd-descriptions"
    :class="{
      'wd-descriptions--vertical': vertical,
      'wd-descriptions--striped': striped,
      [`wd-descriptions--${size}`]: true,
    }"
    :style="styleVars"
  >
    <div v-for="(row, ri) in rows" :key="ri" class="wd-descriptions__row">
      <div
        v-for="(item, ci) in row"
        :key="ci"
        class="wd-descriptions__item"
        :style="{ '--wd-desc-span': String(item.span || 1) }"
      >
        <div class="wd-descriptions__label">
          {{ item.label }}<span v-if="colon" class="wd-descriptions__colon">：</span>
        </div>
        <div class="wd-descriptions__value">
          <slot :name="item.key || ''" :item="item" :value="item.value">{{ item.value ?? '—' }}</slot>
          <span v-if="item.hint" class="wd-descriptions__hint">{{ item.hint }}</span>
        </div>
      </div>
    </div>
    <div v-if="!items.length" class="wd-descriptions__empty">
      <slot name="empty">—</slot>
    </div>
  </div>
</template>
