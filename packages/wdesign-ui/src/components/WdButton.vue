<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdButton' })

const props = withDefaults(
  defineProps<{
    /** 视觉变体：primary 实心主色 / tint 浅底 / dark 深底 / ghost 无底 */
    variant?: 'primary' | 'tint' | 'dark' | 'ghost'
    /** 尺寸档 sm|md|lg */
    size?: 'lg' | 'md' | 'sm'
    /** 禁用：不可点击，也不触发 click */
    disabled?: boolean
    /** 图标按钮：正方形，只容一个图标 */
    iconOnly?: boolean
    /** 撑满父级宽度 */
    block?: boolean
    /** 加载中：自动禁用点击并显示转圈 */
    loading?: boolean
    /** 加载中的提示文字（覆盖默认的「保留原文字 + 转圈」） */
    loadingText?: string
    /** 提交型按钮（在 form 内触发提交） */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    iconOnly: false,
    block: false,
    loading: false,
    loadingText: '',
    type: 'button',
  },
)

const emit = defineEmits<{
  /** 点击时触发，参数为原始 MouseEvent；disabled 或 loading 时不触发 */
  (e: 'click', event: MouseEvent): void
}>()

const classes = computed(() => [
  'wd-btn',
  `wd-btn--${props.variant}`,
  `wd-btn--${props.size}`,
  {
    'wd-btn--icon': props.iconOnly,
    'wd-btn--block': props.block,
    'wd-btn--loading': props.loading,
  },
])

function onClick(e: MouseEvent) {
  // 加载中拦截点击：避免重复提交（这是 loading 最主要的用途）
  if (props.loading || props.disabled) return
  emit('click', e)
}
</script>

<template>
  <button
    data-wd-hover
    :class="classes"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <span v-if="loading" class="wd-btn__spinner" aria-hidden="true"></span>
    <template v-if="loading && loadingText">{{ loadingText }}</template>
    <slot v-else />
  </button>
</template>
