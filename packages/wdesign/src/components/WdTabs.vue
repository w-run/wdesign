<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'WdTabs' })

type Tab = string | { label: string; value: string | number }

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    tabs?: Tab[]
    block?: boolean
  }>(),
  { modelValue: '', tabs: () => [], block: false },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()

/** 首次交互后才允许激活项播放弹入动画（避免首屏渲染时抖动） */
const animReady = ref(false)
function select(v: string | number) {
  animReady.value = true
  emit('update:modelValue', v)
}

const items = computed(() =>
  props.tabs.map((t) => (typeof t === 'string' ? { label: t, value: t } : t)),
)
</script>

<template>
  <div class="wd-tabs" :class="{ 'wd-tabs--block': block, 'wd-tabs--anim-ready': animReady }" role="tablist">
    <button
      v-for="t in items"
      :key="t.value"
      type="button"
      role="tab"
      class="wd-tabs__item"
      data-wd-hover
      :class="{ 'wd-tabs__item--active': t.value === modelValue }"
      :aria-selected="t.value === modelValue"
      @click="select(t.value)"
    >
      {{ t.label }}
    </button>
  </div>
</template>
