<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { watchEffect } from 'vue'
import { popDuration } from './pop-duration'

const POP_DURATION = popDuration()

defineOptions({ name: 'WdNotification' })

const props = withDefaults(
  defineProps<{
    /** 是否显示通知，用于 v-model 控制显隐 */
    modelValue?: boolean
    /** 标题文字，留空则只显示描述 */
    title?: string
    /** 描述正文，也可用默认插槽传入富内容 */
    description?: string
    /** 语义类型，决定左侧圆点配色：信息 / 成功 / 警告 / 危险 */
    variant?: 'info' | 'success' | 'warning' | 'danger'
  }>(),
  { modelValue: false, title: '', description: '', variant: 'info' },
)

const emit = defineEmits<{
  /** 关闭时触发（关闭按钮或 Esc），参数恒为 false，用于 v-model */
  (e: 'update:modelValue', value: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}

watchEffect((onCleanup) => {
  if (!props.modelValue) return
  const fn = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }
  document.addEventListener('keydown', fn)
  onCleanup(() => document.removeEventListener('keydown', fn))
})
</script>

<template>
  <Teleport to="body">
    <Transition name="wd-notification-fade" :duration="POP_DURATION">
      <div v-if="modelValue" class="wd-notification" :class="`wd-notification--${variant}`" role="alert">
        <span class="wd-notification__icon wd-dot wd-dot--lg" :class="`wd-dot--${variant}`"></span>
        <div class="wd-notification__body">
          <div v-if="title" class="wd-notification__title">{{ title }}</div>
          <div v-if="description || $slots.default" class="wd-notification__desc"><slot>{{ description }}</slot></div>
        </div>
        <button type="button" class="wd-icon-btn wd-icon-btn--ghost wd-icon-btn--sm" aria-label="关闭" @click="close">
          <wd-icon name="close" :size="13" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
