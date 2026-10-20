<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdSpinner' })

const props = withDefaults(
  defineProps<{
    /** 尺寸档位，或直接给像素值（数字 = px） */
    size?: 'sm' | 'md' | 'lg' | number
  }>(),
  { size: 'md' },
)

/**
 * 同时支持档位与像素：
 *   size="lg" / size="sm"   → 用预设档位
 *   :size="36"              → 直接 36px
 * 早先只接受档位，传数字会静默落到默认 28px（三种"不同尺寸"看起来一样）。
 */
const PRESET: Record<string, string> = { sm: '18px', md: '28px', lg: '40px' }

const style = computed(() => {
  if (typeof props.size === 'number') {
    const px = Math.max(8, props.size)
    // 线宽随手径走，保持视觉一致（约 11%）
    const bw = Math.max(2, Math.round(px * 0.11 * 10) / 10)
    return { width: `${px}px`, height: `${px}px`, borderWidth: `${bw}px` }
  }
  return {}
})

const cls = computed(() => (typeof props.size === 'string' && props.size !== 'md' ? `wd-spinner--${props.size}` : ''))
</script>

<template>
  <span class="wd-spinner" :class="cls" :style="style" role="status" aria-label="加载中"></span>
</template>
