<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

defineOptions({ name: 'WdAiMessage' })

interface Action {
  label: string
  variant?: 'primary' | 'tint' | 'ghost'
}

const props = withDefaults(
  defineProps<{
    content?: string
    self?: boolean
    /** 深度思考中（三点脉动） */
    thinking?: boolean
    /** 流式输出 */
    streaming?: boolean
    /** 每个字符的间隔 ms */
    speed?: number
    actions?: Action[]
  }>(),
  { content: '', self: false, thinking: false, streaming: false, speed: 24, actions: () => [] },
)

const emit = defineEmits<{
  (e: 'action', label: string): void
  (e: 'stream-end'): void
}>()

const shown = ref('')
let timer: number | null = null

function stop() {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
}

function start() {
  stop()
  shown.value = ''
  let i = 0
  timer = window.setInterval(() => {
    i += 1
    shown.value = props.content.slice(0, i)
    if (i >= props.content.length) {
      stop()
      emit('stream-end')
    }
  }, Math.max(8, props.speed))
}

watch(
  () => props.streaming,
  (v) => {
    if (v) start()
    else {
      stop()
      shown.value = props.content
    }
  },
  { immediate: true },
)

watch(
  () => props.content,
  (v) => {
    if (!props.streaming) shown.value = v
  },
)

onBeforeUnmount(stop)
</script>

<template>
  <div class="wd-ai-msg" :class="{ 'wd-ai-msg--self': self }">
    <span class="wd-ai-msg__avatar">{{ self ? '我' : 'AI' }}</span>
    <div class="wd-ai-msg__bubble">
      <div v-if="thinking" class="wd-ai-msg__thinking"><i></i><i></i><i></i>深度思考中…</div>
      <p class="wd-ai-msg__text">{{ shown }}<span v-if="streaming && shown.length < content.length" class="wd-ai-msg__cursor">▍</span></p>
      <div v-if="actions.length" class="wd-ai-msg__actions">
        <button
          v-for="a in actions"
          :key="a.label"
          type="button"
          class="wd-btn"
          :class="[`wd-btn--${a.variant || 'ghost'}`, 'wd-btn--sm']"
          @click="emit('action', a.label)"
        >
          {{ a.label }}
        </button>
      </div>
    </div>
  </div>
</template>
