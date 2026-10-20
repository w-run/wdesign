<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAnchoredPosition } from './anchor'

defineOptions({ name: 'WdTooltip' })

const props = withDefaults(
  defineProps<{
    content?: string
    placement?: 'top' | 'bottom'
  }>(),
  { content: '', placement: 'top' },
)

const open = ref(false)
const anchorEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)

/**
 * Teleport 到 body + fixed 定位。
 *
 * 之前用 position:absolute 挂在触发器旁边，一旦祖先有 overflow:hidden
 * （表格单元格、卡片、滚动区）气泡就被裁掉 —— 而 tooltip 恰恰最常出现在
 * 这些地方。传送到 body 是唯一可靠解，代价是必须用 JS 量坐标。
 */
const { pos } = useAnchoredPosition(open, anchorEl, panelEl, {
  placement: props.placement === 'top' ? 'top-start' : 'bottom-start',
  gap: 8,
})

const style = computed(() => ({
  top: pos.value.top + 'px',
  left: pos.value.left + 'px',
}))
</script>

<template>
  <span
    ref="anchorEl"
    class="wd-tooltip"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @focusin="open = true"
    @focusout="open = false"
  >
    <slot />
  </span>

  <Teleport to="body">
    <!--
      显隐用 .is-open + display，不用 <Transition>：
      时钟停摆时 enter-from 会残留，气泡卡在半透明或永不消失。

      ⚠️ 不能用 v-show：它把 `display:none` 写成**内联样式**，
      优先级高于 `.is-open { display: block }`，结果永远显示不出来。
      改为「节点常驻 + 只靠类切换」，display 完全交给 CSS。
    -->
    <span
      ref="panelEl"
      class="wd-tooltip__bubble"
      :class="{ 'is-open': open }"
      :style="style"
      role="tooltip"
    >{{ content }}</span>
  </Teleport>
</template>
