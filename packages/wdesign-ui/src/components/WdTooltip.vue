<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useAnchoredPosition } from './anchor'

defineOptions({ name: 'WdTooltip' })

const props = withDefaults(
  defineProps<{
    /** 气泡文字（纯文本，不解析 HTML） */
    content?: string
    /** 气泡出现方向：top 在触发器上方，bottom 在下方 */
    placement?: 'top' | 'bottom'
    /**
     * 悬停多久后出现（ms）。
     *
     * 鼠标划过一排图标时，零延迟会让气泡疯狂闪烁 —— 200ms 是
     * 「停下来才算想看」的常用阈值。键盘聚焦不受它影响（必须立刻出现）。
     */
    delay?: number
  }>(),
  { content: '', placement: 'top', delay: 200 },
)

const open = ref(false)

/** 悬停延迟计时器：离开或聚焦时都要清掉，否则会出现"鼠标移开又弹出来" */
let showTimer: number | undefined

function clearTimer() {
  if (showTimer !== undefined) {
    clearTimeout(showTimer)
    showTimer = undefined
  }
}

function onHoverIn() {
  clearTimer()
  showTimer = window.setTimeout(() => { open.value = true }, props.delay)
}

function onHoverOut() {
  clearTimer()
  open.value = false
}

function onFocusIn() {
  clearTimer()
  open.value = true
}

onBeforeUnmount(clearTimer)
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
    @mouseenter="onHoverIn"
    @mouseleave="onHoverOut"
    @focusin="onFocusIn"
    @focusout="onHoverOut"
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
