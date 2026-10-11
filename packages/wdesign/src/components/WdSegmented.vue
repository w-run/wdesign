<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'WdSegmented' })

type Option = string | { label: string; value: string | number }

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    options?: Option[]
    block?: boolean
    tone?: 'light' | 'dark'
  }>(),
  { modelValue: '', options: () => [], block: false, tone: 'light' },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()

const items = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
)

const track = ref<HTMLElement>()
const slider = ref<HTMLElement>()

/** 选中滑块：测量激活项的位置/宽度，平移过渡 */
function updateSlider() {
  const t = track.value
  const s = slider.value
  if (!t || !s) return
  const active = t.querySelector<HTMLElement>('.wd-segmented__item--active')
  if (!active) return
  // 以滑块自身静止位置为基准计算位移（兼容各环境 padding/offsetParent 差异）
  s.style.transform = 'none'
  void s.offsetHeight
  const base = s.getBoundingClientRect()
  const ar = active.getBoundingClientRect()
  s.style.transform = `translate(${ar.left - base.left}px, ${ar.top - base.top}px)`
  s.style.width = `${ar.width}px`
  s.style.height = `${ar.height}px`
}

onMounted(() => {
  updateSlider()
  window.addEventListener('resize', updateSlider)
})
onBeforeUnmount(() => window.removeEventListener('resize', updateSlider))
watch(() => props.modelValue, () => nextTick(updateSlider))
watch(items, () => nextTick(updateSlider))
</script>

<template>
  <div
    ref="track"
    class="wd-segmented"
    :class="{ 'wd-segmented--block': block, 'wd-segmented--dark': tone === 'dark' }"
    role="tablist"
  >
    <span ref="slider" class="wd-segmented__slider"></span>
    <button
      v-for="o in items"
      :key="o.value"
      type="button"
      role="tab"
      class="wd-segmented__item"
      :class="{ 'wd-segmented__item--active': o.value === modelValue }"
      :aria-selected="o.value === modelValue"
      @click="emit('update:modelValue', o.value)"
    >
      {{ o.label }}
    </button>
  </div>
</template>
