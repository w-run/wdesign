<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdAvatar' })

const props = withDefaults(
  defineProps<{
    /** 名称：取首字作头像文字，空则显示 ? */
    name?: string
    /** 0 = 根据名字自动分配（6 组淡彩，同一个人永远同色） */
    tone?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    /** 深色底，用于 +N 这类辅助头像 */
    dark?: boolean
    /** 尺寸档 sm|md|lg */
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { name: '', tone: 0, dark: false, size: 'md' },
)

const label = computed(() => {
  const n = props.name.trim()
  if (!n) return '?'
  if (n.startsWith('+')) return n
  return n.charAt(0)
})

const resolvedTone = computed(() => {
  if (props.tone) return props.tone
  if (!props.name) return 0
  /*
   * 完整算完再取模。
   * 之前是**每轮循环都 %6**，高位信息被反复丢掉，几个字的名字很容易撞到同一色
   * （实测前 6 个中文名只出现 3 种颜色）。
   */
  let hash = 0
  for (const ch of props.name) hash = (hash * 31 + ch.charCodeAt(0)) | 0
  return ((Math.abs(hash) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6
})

const classes = computed(() => [
  'wd-avatar',
  resolvedTone.value ? `wd-avatar--tone-${resolvedTone.value}` : '',
  props.dark ? 'wd-avatar--dark' : '',
  props.size === 'sm' ? 'wd-avatar--sm' : '',
])
</script>

<template>
  <span :class="classes">{{ label }}</span>
</template>
