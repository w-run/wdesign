<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'WdSteps' })

type Step = string | { title: string; desc?: string }

const props = withDefaults(
  defineProps<{
    steps?: Step[]
    current?: number
  }>(),
  { steps: () => [], current: 0 },
)

const items = computed(() =>
  props.steps.map((s) => (typeof s === 'string' ? { title: s, desc: '' } : { desc: '', ...s })),
)

function state(i: number) {
  if (i < props.current) return 'finish'
  if (i === props.current) return 'process'
  return 'wait'
}
</script>

<template>
  <div class="wd-steps">
    <template v-for="(s, i) in items" :key="i">
      <div class="wd-steps__item" :class="`wd-steps__item--${state(i)}`">
        <span class="wd-steps__dot">
          <wd-icon v-if="state(i) === 'finish'" name="check" :size="13" />
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span class="wd-steps__label">
          {{ s.title }}
          <em v-if="s.desc" class="wd-steps__desc">{{ s.desc }}</em>
        </span>
      </div>
      <span
        v-if="i < items.length - 1"
        class="wd-steps__bar"
        :class="{ 'wd-steps__bar--done': i < current }"
      ></span>
    </template>
  </div>
</template>
