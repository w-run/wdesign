<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useDismiss } from './anchor'
import { popDuration } from './pop-duration'

const POP_DURATION = popDuration()

defineOptions({ name: 'WdPopconfirm' })

const props = withDefaults(
  defineProps<{
    /** 气泡标题，同时作为浮层的无障碍名称 */
    title?: string
    /** 补充说明，显示在标题下方，留空则不占位 */
    description?: string
    /** 确认按钮文案 */
    okText?: string
    /** 取消按钮文案 */
    cancelText?: string
    /** 语义类型，danger 时标题前带警告图标、确认按钮转为危险色 */
    variant?: 'default' | 'danger'
    /** 浮层相对触发器的位置，空间不足时自动翻转 */
    placement?: 'top' | 'bottom'
    /** 是否禁用，禁用后点击不弹出浮层 */
    disabled?: boolean
    /** 浮层宽度（px），超出视口时会被夹进可见区 */
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

const emit = defineEmits<{
  /** 点击确认按钮后触发，此时浮层已关闭 */
  (e: 'confirm'): void
  /** 点击取消按钮后触发，此时浮层已关闭；点外部或按 Esc 关闭不触发 */
  (e: 'cancel'): void
}>()

const open = ref(false)
/** 只要打开过一次就保持节点存在，之后靠 .is-open 类做过渡 */
const mounted = ref(false)
const trigger = ref<HTMLElement | null>(null)
const bubble = ref<HTMLElement | null>(null)
const pos = ref({ top: 0, left: 0 })

/**
 * 定位：**文档坐标 + position: absolute**（CSS 侧已同步）。
 *
 * ⚠️ 原来用 fixed + rect（视口坐标）。rect 是布局视口坐标，fixed 相对视觉视口，
 * 移动端缩放 / iOS 地址栏伸缩 / 软键盘会让两者分离 → 气泡偏移。
 * 而且它没有滚动监听，页面一滚气泡就停在原地。
 *
 * 改成文档坐标后：滚轮/缩放不需要重算，浏览器自动跟随。
 * 翻转判断仍用视口坐标（要判断的是"会不会跑出屏幕"）。
 */
function place() {
  const t = trigger.value?.getBoundingClientRect()
  if (!t) return
  const sx = window.scrollX ?? window.pageXOffset ?? 0
  const sy = window.scrollY ?? window.pageYOffset ?? 0
  const vv = window.visualViewport
  const vw = vv?.width ?? window.innerWidth

  const w = props.width
  let left = t.left + sx + t.width / 2 - w / 2
  // 夹进可见区：边界要换算回文档坐标
  const minLeft = sx + 8
  const maxLeft = sx + vw - w - 8
  left = Math.max(minLeft, Math.min(left, Math.max(minLeft, maxLeft)))

  const gap = 10
  const top = props.placement === 'top' ? t.top + sy - gap : t.bottom + sy + gap
  pos.value = { top, left }
}

/** 点击外部关闭：统一走 anchor.ts（含面板与触发器两个受保护区域） */
useDismiss([bubble, trigger], hide, open)

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

document.addEventListener('keydown', onKey)
onBeforeUnmount(() => {
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
