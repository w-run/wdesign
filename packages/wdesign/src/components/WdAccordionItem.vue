<script setup lang="ts">
import { computed, inject, ref } from 'vue'

defineOptions({ name: 'WdAccordionItem' })

const props = withDefaults(
  defineProps<{
    /** 唯一标识，不传则用标题 */
    name?: string
    title?: string
    /** 标题下方的一行说明 */
    description?: string
    disabled?: boolean
  }>(),
  { name: '', title: '', description: '', disabled: false },
)

interface AccordionCtx {
  isOpen: (key: string) => boolean
  toggle: (key: string) => void
}
const ctx = inject<AccordionCtx>('wd-accordion')

/**
 * 内部 id：用于 aria-controls / aria-labelledby 关联。
 *
 * ⚠️ 必须用 ref 固化。写成模块级 `let uid = 0` 再自增的话，
 * 每次组件重新渲染都会生成新 id，aria 关联断开，
 * 而且所有实例共享那个计数器（服务端渲染时还会跨请求串号）。
 */
const uid = `wd-acc-${Math.random().toString(36).slice(2, 9)}`

const key = computed(() => props.name || props.title || id)
const open = computed(() => (ctx ? ctx.isOpen(key.value) : false))

function onToggle() {
  if (props.disabled || !ctx) return
  ctx.toggle(key.value)
}
</script>

<template>
  <div
    class="wd-accordion__item"
    :class="{ 'is-open': open, 'is-disabled': disabled }"
  >
    <button
      :id="`${uid}-head`"
      type="button"
      class="wd-accordion__head"
      :aria-expanded="open"
      :aria-controls="`${uid}-body`"
      :disabled="disabled"
      @click="onToggle"
    >
      <span class="wd-accordion__title-wrap">
        <span class="wd-accordion__title">{{ title }}</span>
        <span v-if="description" class="wd-accordion__desc">{{ description }}</span>
      </span>
      <slot name="extra" />
      <wd-icon
        class="wd-accordion__chevron"
        :class="{ 'is-open': open }"
        name="chevron-down"
        :size="16"
      />
    </button>

    <div
      :id="`${uid}-body`"
      class="wd-accordion__body"
      role="region"
      :aria-labelledby="`${uid}-head`"
      :hidden="!open"
    >
      <div class="wd-accordion__inner">
        <slot />
      </div>
    </div>
  </div>
</template>
