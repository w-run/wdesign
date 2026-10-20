<script setup lang="ts">
import { computed, ref, toRef, watchEffect } from 'vue'
import { useScrollLock, useFocusTrap } from './overlay'
import { nextZIndex } from './overlay-stack'
import { popDuration } from './pop-duration'

const POP_DURATION = popDuration()

// 显式给 duration：transitionend 在渲染器暂停/时钟停摆时会丢失，
// 导致元素永远停在 enter-from（或关闭时无法销毁）。
// 给 duration 让 Vue 用定时器兜底。

defineOptions({ name: 'WdModal' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    width?: number | string
    closeOnMask?: boolean
  }>(),
  { modelValue: false, title: '', width: 440, closeOnMask: true },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const panel = ref<HTMLElement | null>(null)

/** 打开过一次后节点常驻，之后靠 .is-open 控制显隐（见模板注释） */
const mounted = ref(false)
watchEffect(() => { if (props.modelValue) mounted.value = true })

/**
 * 滚动锁定 + 焦点陷阱。
 * 两者都抽在 overlay.ts —— 之前「点击外部关闭」在 5 个组件里各写一份，
 * 结果 WdSelect 的 Esc 是后来补的。共用的行为只该有一处实现。
 */
const openRef = toRef(props, 'modelValue')

/** 每次打开重新取层级：后开的浮层压在先开的上面 */
const myZ = ref(0)
watchEffect(() => { if (props.modelValue) myZ.value = nextZIndex() })
useScrollLock(openRef)
// Esc 交给层栈统一调度 —— 多层时只关最上层
useFocusTrap(openRef, panel, () => { close(); return true; })

const maxWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
)

function close() {
  emit('update:modelValue', false)
}


</script>

<template>
  <Teleport to="body">
    <!--
      不用 <Transition>：其 enter 阶段依赖 nextFrame，动画时钟停摆时
      （后台标签页 / 无头渲染 / 减弱动效）永不推进，enter-from 会残留，
      关闭时再叠 leave-* 就彻底销毁不掉 —— 表现为「弹窗关不掉、还挡着点击」。
      改为常驻节点 + .is-open 类，可见性交给 display，动画只负责好看。
    -->
    <div
      v-show="mounted"
      class="wd-modal"
      :class="{ 'is-open': modelValue }"
      role="dialog"
      aria-modal="true"
      :aria-label="title || undefined"
      :style="{ zIndex: myZ }"
      @transitionend.self="onLeaveEnd"
    >
      <div class="wd-modal__mask" @click="closeOnMask && close()"></div>
      <div ref="panel" class="wd-modal__panel" tabindex="-1" :style="{ maxWidth }">
        <div class="wd-modal__head">
          <div class="wd-modal__title">{{ title }}</div>
          <button type="button" class="wd-modal__close" aria-label="关闭" @click="close">
            <wd-icon name="close" :size="15" />
          </button>
        </div>
        <div class="wd-modal__body"><slot /></div>
        <div v-if="$slots.footer" class="wd-modal__foot"><slot name="footer" /></div>
      </div>
    </div>
  </Teleport>
</template>
