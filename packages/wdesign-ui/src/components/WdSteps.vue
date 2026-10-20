<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed } from 'vue'

defineOptions({ name: 'WdSteps' })

type Step = string | { title: string; desc?: string }

const props = withDefaults(
  defineProps<{
    /** 步骤数据：纯文本，或 { title, desc } 对象 */
    steps?: Step[]
    /** 当前步骤序号（从 0 开始）：之前为已完成、本身为进行中、之后为待进行 */
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
