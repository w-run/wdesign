<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, ref, toRef, watchEffect } from 'vue'
import { useScrollLock, useFocusTrap } from './overlay'
import { nextZIndex } from './overlay-stack'
import { popDuration } from './pop-duration'

const POP_DURATION = popDuration()

// 显式给 duration：transitionend 在渲染器暂停/时钟停摆时会丢失，
// 导致元素永远停在 enter-from（或关闭时无法销毁）。
// 给 duration 让 Vue 用定时器兜底。

defineOptions({ name: 'WdDrawer' })

const props = withDefaults(
  defineProps<{
    /** 是否打开（v-model），打开时锁背景滚动并把焦点限制在抽屉内 */
    modelValue?: boolean
    /** 抽屉头部标题，留空则只剩关闭按钮 */
    title?: string
    /** 从哪一侧滑出 */
    side?: 'right' | 'left'
    /** 点击遮罩是否关闭，设为 false 时只能靠关闭按钮收起 */
    closeOnMask?: boolean
  }>(),
  { modelValue: false, title: '', side: 'right', closeOnMask: true },
)

/** 请求关闭时触发（关闭按钮、点遮罩、Esc），需写回 false 才真正收起 */
const emit = defineEmits<{
  /** 显隐状态变化时触发（v-model），true 为打开 */
  (e: 'update:modelValue', value: boolean): void
}>()

const classes = computed(() => ['wd-drawer', props.side === 'left' ? 'wd-drawer--left' : ''])

const panel = ref<HTMLElement | null>(null)
/** 打开过一次后节点常驻，靠 .is-open 控制显隐 */
const mounted = ref(false)
watchEffect(() => { if (props.modelValue) mounted.value = true })
const openRef = toRef(props, 'modelValue')

/** 每次打开重新取层级：后开的浮层压在先开的上面 */
const myZ = ref(0)
watchEffect(() => { if (props.modelValue) myZ.value = nextZIndex() })

/**
 * 抽屉和弹窗一样是"模态覆盖层"：
 *   - 打开时背景不该还能滚（不然滚的是抽屉背后的列表）
 *   - Tab 不该跑到背景里去（之前完全没有焦点管理）
 * 两者都用 overlay.ts 的统一实现。
 */
useScrollLock(openRef)
useFocusTrap(openRef, panel, () => { close(); return true; })

function close() {
  emit('update:modelValue', false)
}

</script>

<template>
  <Teleport to="body">
    <!-- 同 Modal：显隐由 .is-open + display 保证，不依赖 Transition 的时序 -->
    <div
      v-show="mounted"
      :class="[classes, { 'is-open': modelValue }]"
      role="dialog"
      aria-modal="true"
      :style="{ zIndex: myZ }"
    >
        <div class="wd-drawer__mask" @click="closeOnMask && close()"></div>
        <div ref="panel" class="wd-drawer__panel" tabindex="-1">
          <div class="wd-drawer__head">
            <div class="wd-drawer__title">{{ title }}</div>
            <button type="button" class="wd-icon-btn" aria-label="关闭" @click="close">
              <wd-icon name="close" :size="15" />
            </button>
          </div>
          <div class="wd-drawer__body"><slot /></div>
          <div v-if="$slots.footer" class="wd-drawer__foot"><slot name="footer" /></div>
        </div>
    </div>
  </Teleport>
</template>
