<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

defineOptions({ name: 'WdAccordion' })

const props = withDefaults(
  defineProps<{
    /**
     * 展开模式：
     *  multiple — 可同时展开多项（默认）
     *  single   — 手风琴，同时只开一项
     */
    mode?: 'multiple' | 'single'
    /** 受控：当前展开项的 key 数组 */
    modelValue?: string[]
    /** 默认展开（非受控） */
    defaultOpen?: string[]
    /** 是否允许全部收起（single 模式下通常不允许） */
    collapsible?: boolean
  }>(),
  {
    mode: 'multiple',
    modelValue: undefined,
    defaultOpen: () => [],
    collapsible: true,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()

/** 受控/非受控：显式传 modelValue 即受控 */
const inner = ref<string[]>([...props.defaultOpen])
const isControlled = computed(() => props.modelValue !== undefined)
const openKeys = computed(() => (isControlled.value ? props.modelValue! : inner.value))

function toggle(key: string) {
  const cur = openKeys.value
  const has = cur.includes(key)
  let next: string[]

  if (props.mode === 'single') {
    if (has) {
      // single 模式下不允许全部收起时，点已展开项保持原状
      next = props.collapsible ? [] : cur
    } else {
      next = [key]
    }
  } else {
    next = has ? cur.filter((k) => k !== key) : [...cur, key]
  }

  if (!isControlled.value) inner.value = next
  emit('update:modelValue', next)
}

/** 状态 + 操作通过 provide 下发给 WdAccordionItem */
provide('wd-accordion', {
  isOpen: (key: string) => openKeys.value.includes(key),
  toggle,
  mode: computed(() => props.mode),
})

watch(
  () => props.modelValue,
  (v) => { if (v !== undefined) inner.value = [...v] },
)
</script>

<template>
  <div class="wd-accordion" :class="`wd-accordion--${mode}`">
    <slot />
  </div>
</template>
