<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { ref } from 'vue'

defineOptions({ name: 'WdAlert' })

withDefaults(
  defineProps<{
    /** 严重程度：决定指示点与整体配色 */
    variant?: 'info' | 'success' | 'warning' | 'danger'
    /** 标题；不传则只有描述 */
    title?: string
    /** 描述文字；也可用默认插槽接管 */
    description?: string
    /** 显示关闭按钮，点击后隐藏整条提示 */
    closable?: boolean
  }>(),
  { variant: 'info', title: '', description: '', closable: false },
)

const emit = defineEmits<{
  /** 点击关闭按钮后触发；组件已自行隐藏，外部需同步状态时监听 */
  (e: 'close'): void
}>()

const visible = ref(true)

function close() {
  visible.value = false
  emit('close')
}
</script>

<template>
  <div v-if="visible" class="wd-alert" :class="`wd-alert--${variant}`" role="alert">
    <span class="wd-alert__icon wd-dot wd-dot--lg" :class="`wd-dot--${variant}`"></span>
    <div class="wd-alert__body">
      <div v-if="title" class="wd-alert__title">{{ title }}</div>
      <div v-if="description || $slots.default" class="wd-alert__desc">
        <slot>{{ description }}</slot>
      </div>
    </div>
    <button v-if="closable" type="button" class="wd-alert__close" aria-label="关闭" @click="close">
      <wd-icon name="warning-circle" :size="14" />
    </button>
  </div>
</template>
