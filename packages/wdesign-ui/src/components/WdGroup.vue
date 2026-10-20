<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'WdGroup' })

const props = withDefaults(
  defineProps<{
    /**
     * 外观形态：
     *  capsule — 整体胶囊，内部分段（默认）
     *  joined  — 外缘圆角，内部直角拼合
     *  inset   — 内嵌：容器提供底色，子项透明浮在上面
     */
    variant?: 'capsule' | 'joined' | 'inset'
    /** 排列方向 */
    direction?: 'row' | 'col'
    /** 整体尺寸（影响高度与内距，子项可覆盖） */
    size?: 'sm' | 'md' | 'lg'
    /** 撑满容器 */
    block?: boolean
    /** 禁用整组 */
    disabled?: boolean
    /** 等分每一段 */
    equal?: boolean
    /** 语义化标签 */
    label?: string
    /**
     * 子项自动去边框。
     * 组合容器的核心：外部提供一个统一的框，子项自身的边框/外框要压掉，
     * 否则「框里套框」。默认开启。
     */
    seamless?: boolean
  }>(),
  {
    variant: 'capsule',
    direction: 'row',
    size: 'md',
    block: false,
    disabled: false,
    equal: false,
    label: '',
    seamless: true,
  },
)

/**
 * 自动给首/中/尾打标记。
 *
 * 为什么用 JS 而不是纯 CSS：
 *   子项数量不定、且可能被 v-if 动态增删。
 *   CSS 的 :first-child / :last-child 在插槽包了一层 wrapper 时会失效，
 *   而给每个真实子节点直接加 class 最稳（也便于内部控件覆盖样式时定位）。
 */
const root = ref<HTMLElement | null>(null)

function markChildren() {
  const el = root.value
  if (!el) return
  // 只处理直接子节点里的元素（跳过注释与文本节点）
  const kids = Array.from(el.children) as HTMLElement[]
  const n = kids.length
  kids.forEach((c, i) => {
    c.classList.toggle('wd-group__item', true)
    c.classList.toggle('wd-group__item--first', i === 0)
    c.classList.toggle('wd-group__item--last', i === n - 1)
    c.classList.toggle('wd-group__item--middle', i > 0 && i < n - 1)
    c.classList.toggle('wd-group__item--only', n === 1)
  })
}

onMounted(markChildren)

// 子项增删（v-if / v-for 变化）后重新标记
watch(
  () => (root.value ? Array.from(root.value.children).length : 0),
  () => markChildren(),
)

const classes = computed(() => [
  'wd-group',
  `wd-group--${props.variant}`,
  `wd-group--${props.direction}`,
  `wd-group--${props.size}`,
  {
    'wd-group--block': props.block,
    'wd-group--disabled': props.disabled,
    'wd-group--equal': props.equal,
    'wd-group--seamless': props.seamless,
  },
])
</script>

<template>
  <div
    ref="root"
    :class="classes"
    role="group"
    :aria-label="label || undefined"
    :aria-disabled="disabled || undefined"
  >
    <slot />
  </div>
</template>
