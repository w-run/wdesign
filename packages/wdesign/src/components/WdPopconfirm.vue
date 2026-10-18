<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { popDuration } from './pop-duration'

const POP_DURATION = popDuration()

defineOptions({ name: 'WdPopconfirm' })

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    okText?: string
    cancelText?: string
    variant?: 'default' | 'danger'
    placement?: 'top' | 'bottom'
    disabled?: boolean
    width?: number
  }>(),
  {
    title: '确定执行此操作？',
    description: '',
    okText: '确定',
    cancelText: '取消',
    variant: 'default',
    placement: 'top',
    disabled: false,
    width: 240,
  },
)

const emit = defineEmits<{ (e: 'confirm'): void; (e: 'cancel'): void }>()

const open = ref(false)
/** 只要打开过一次就保持节点存在，之后靠 .is-open 类做过渡 */
const mounted = ref(false)
const trigger = ref<HTMLElement | null>(null)
const bubble = ref<HTMLElement | null>(null)
const pos = ref({ top: 0, left: 0 })

/**
 * 用 fixed 定位：气泡常出现在表格/列表里，父级一旦 overflow:hidden 就会被裁掉。
 * fixed + 滚动时跟随重算，能稳定浮在最上层。
 */
function place() {
  const t = trigger.value?.getBoundingClientRect()
  if (!t) return
  const w = props.width
  let left = t.left + t.width / 2 - w / 2
  left = Math.max(8, Math.min(left, window.innerWidth - w - 8))
  const gap = 10
  const top = props.placement === 'top' ? t.top - gap : t.bottom + gap
  pos.value = { top, left }
}

async function show() {
  if (props.disabled) return
  mounted.value = true
  await nextTick()
  place()
  // 下一帧再加 is-open，让 CSS 过渡有起点
  requestAnimationFrame(() => {
    open.value = true
    bubble.value?.querySelector<HTMLElement>('[data-ok]')?.focus?.()
  })
  // rAF 在时钟停摆时不回调 —— 兜底直接置位（此处只是视觉，状态必须正确）
  setTimeout(() => { if (!open.value) open.value = true }, 60)
}

function hide() {
  open.value = false
}

function confirm() { hide(); emit('confirm') }
function cancel() { hide(); emit('cancel') }

function onDocDown(e: MouseEvent) {
  if (!open.value) return
  const target = e.target as Node
  if (bubble.value?.contains(target) || trigger.value?.contains(target)) return
  hide()
}

function onKey(e: KeyboardEvent) {
  if (open.value && e.key === 'Escape') hide()
}

watch(open, (v) => {
  if (v) {
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
  } else {
    window.removeEventListener('scroll', place, true)
    window.removeEventListener('resize', place)
  }
})

document.addEventListener('mousedown', onDocDown)
document.addEventListener('keydown', onKey)
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocDown)
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', place, true)
  window.removeEventListener('resize', place)
})

const bubbleStyle = computed(() => ({
  top: pos.value.top + 'px',
  left: pos.value.left + 'px',
  width: props.width + 'px',
  transform: props.placement === 'top' ? 'translateY(-100%)' : undefined,
}))
</script>

<template>
  <span
    ref="trigger"
    class="wd-popconfirm"
    :class="{ 'wd-popconfirm--open': open }"
    @click="open ? hide() : show()"
  >
    <slot />
  </span>

  <Teleport to="body">
    <!--
      不用 <Transition>：它的 enter 阶段依赖 nextFrame，动画时钟停摆时
      （后台标签页 / 无头渲染 / 系统减弱动效）不会推进，enter-from 类
      会永久残留并叠加 leave 类，导致元素卡在半透明且无法销毁。
      改为常驻节点 + .is-open 类驱动 CSS 过渡，状态始终由我们掌握。
    -->
    <div
      v-show="mounted"
      ref="bubble"
      class="wd-popconfirm__bubble"
      :class="{ 'is-open': open }"
      :style="bubbleStyle"
      role="dialog"
      :aria-label="title"
      :aria-hidden="!open"
      @click.stop
    >
      <div class="wd-popconfirm__title">
        <span v-if="variant === 'danger'" class="wd-popconfirm__icon" aria-hidden="true">
          <wd-icon name="warning-circle" :size="14" />
        </span>
        {{ title }}
      </div>
      <p v-if="description" class="wd-popconfirm__desc">{{ description }}</p>
      <div class="wd-popconfirm__actions">
        <button type="button" class="wd-btn wd-btn--tint wd-btn--sm" @click="cancel">{{ cancelText }}</button>
        <button
          type="button"
          data-ok
          class="wd-btn wd-btn--sm wd-btn--primary"
          :class="{ 'wd-popconfirm__ok--danger': variant === 'danger' }"
          @click="confirm"
        >{{ okText }}</button>
      </div>
    </div>
  </Teleport>
</template>
