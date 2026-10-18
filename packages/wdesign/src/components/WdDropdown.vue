<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useOverlayLayer } from './overlay-stack'

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
    items?: WdDropdownItem[]
  }>(),
  { items: () => [] },
)

const emit = defineEmits<{ (e: 'select', value: string | number): void }>()

const open = ref(false)
const root = ref<HTMLElement>()

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

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <span ref="root" class="wd-dropdown">
    <span class="wd-dropdown__trigger" role="button" tabindex="0" :aria-haspopup="true" :aria-expanded="open" @keydown.enter.prevent="open = !open" @keydown.space.prevent="open = !open" @click="open = !open"><slot /></span>
    <Transition name="wd-pop" :duration="POP_DURATION">
      <div v-if="open" class="wd-dropdown__menu" role="menu">
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
    </Transition>
  </span>
</template>
