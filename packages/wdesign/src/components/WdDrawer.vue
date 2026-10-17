<script setup lang="ts">
import { computed, watchEffect } from 'vue'

defineOptions({ name: 'WdDrawer' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    side?: 'right' | 'left'
    closeOnMask?: boolean
  }>(),
  { modelValue: false, title: '', side: 'right', closeOnMask: true },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const classes = computed(() => ['wd-drawer', props.side === 'left' ? 'wd-drawer--left' : ''])

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
    <Transition name="wd-drawer-fade">
      <div v-if="modelValue" :class="classes" role="dialog" aria-modal="true">
        <div class="wd-drawer__mask" @click="closeOnMask && close()"></div>
        <div class="wd-drawer__panel">
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
    </Transition>
  </Teleport>
</template>
