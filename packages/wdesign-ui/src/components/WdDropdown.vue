<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useOverlayLayer } from './overlay-stack'
import { useAnchoredPosition, useDismiss } from './anchor'

// 显式声明过渡时长：<Transition> 依赖 transitionend 收尾，若该事件因
// 渲染器暂停/动画时钟冻结而丢失，元素会永远停在 enter-from（视觉上=从不显示）。
// 给出 duration 让 Vue 用定时器兜底，动画时钟停摆也不会卡在首帧。
import { popDuration } from './pop-duration'
/** 过渡时长：尊重系统「减弱动态效果」，否则用它兜底 transitionend 丢失的情况 */
const POP_DURATION = popDuration()


defineOptions({ name: 'WdDropdown' })

export interface WdDropdownItem {
  label: string
  value: string | number
  danger?: boolean
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** 菜单项数组，每项含 label / value，可选 danger、disabled */
    items?: WdDropdownItem[]
  }>(),
  { items: () => [] },
)

/** 点击可用菜单项后触发，参数为该菜单项的 value，随后自动关闭浮层 */
const emit = defineEmits<{ (e: 'select', value: string | number): void }>()

const open = ref(false)

const root = ref<HTMLElement>()
const triggerEl = ref<HTMLElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)
/** 点击外部关闭：统一走 anchor.ts 的实现（mousedown，比 click 更早、更可靠） */
useDismiss([root], () => { open.value = false }, open)


/**
 * Teleport 到 body + fixed 定位，避免被祖先 overflow:hidden 裁切
 * （表格单元格、卡片里是常态，不是边缘情况）。
 */
const { pos } = useAnchoredPosition(open, triggerEl, menuEl, {
  placement: 'bottom-start',
  gap: 6,
  matchWidth: false,
})

/**
 * 挂到全局层栈：弹窗里再打开下拉时，按 Esc 只关下拉，
 * 不会连弹窗一起关掉。
 */
useOverlayLayer(open, root, () => { open.value = false; return true })

function pick(item: WdDropdownItem) {
  if (item.disabled) return
  emit('select', item.value)
  open.value = false
}

function onKey(e: KeyboardEvent) {
}
onMounted(() => {
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <span ref="root" class="wd-dropdown">
    <span ref="triggerEl" class="wd-dropdown__trigger" role="button" tabindex="0" :aria-haspopup="true" :aria-expanded="open" @keydown.enter.prevent="open = !open" @keydown.space.prevent="open = !open" @click="open = !open"><slot /></span>
  </span>

  <Teleport to="body">
    <div
      ref="menuEl"
      class="wd-dropdown__menu"
      :class="{ 'is-open': open }"
      :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
      role="menu"
    >
        <button
          v-for="it in props.items"
          :key="it.value"
          type="button"
          role="menuitem"
          class="wd-dropdown__item"
          data-wd-hover
          :class="{ 'wd-dropdown__item--danger': it.danger, 'wd-dropdown__item--disabled': it.disabled }"
          @click="pick(it)"
        >
          {{ it.label }}
        </button>
    </div>
  </Teleport>
</template>
