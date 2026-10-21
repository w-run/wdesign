<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
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
    /**
     * 追加上右箭头（↗）—— 用于"了解更多 / 去某处"这类**链接型**按钮。
     *
     * 为什么固定右上而不是右：右上在全站统一表达"跳走 / 新开"，
     * 与"下一页 →"区分开；参考鸿蒙与 Apple 官网的入口按钮都这么用。
     * 纯图标时箭头 18px（按钮 44，圆里留得住），配文字时 15px（不能抢正文）。
     */
    arrow?: boolean
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
    arrow: false,
  },
)

/**
 * 箭头尺寸。
 *
 * ⚠️ 必须用 `:size` 传，不能用 CSS 覆盖 —— WdIcon 把尺寸写成内联 style，
 *    内联优先级高于样式表（之前 `.wd-btn--icon .wd-btn__arrow { width: 22px }`
 *    就因为这个一直没生效，看起来"图标还是小"）。
 *    纯图标：md 20 / lg 22 / sm 17；配文字：15。
 */
const arrowSize = computed(() => {
  if (!props.iconOnly) return 15
  return props.size === 'lg' ? 22 : props.size === 'sm' ? 17 : 20
})

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
    <template v-else>
      <slot />
      <wd-icon
        v-if="arrow"
        class="wd-btn__arrow"
        name="arrow-up-right"
        :size="arrowSize"
      />
    </template>
  </button>
</template>
