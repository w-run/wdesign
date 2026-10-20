<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { ref } from 'vue'

defineOptions({ name: 'WdUpload' })

export interface WdUploadFile {
  name: string
  size: number
  percent: number
}

const props = withDefaults(
  defineProps<{
    /** 可选文件类型，同原生 input 的 accept，默认 * 不限 */
    accept?: string
    /** 允许一次选多个文件（仍受 maxCount 限制） */
    multiple?: boolean
    /** 选择区里的补充说明文字 */
    hint?: string
    /** 最多几个文件（0 = 不限） */
    maxCount?: number
    /** 单文件大小上限（字节，0 = 不限） */
    maxSize?: number
    /** 是否显示文件列表 */
    showList?: boolean
  }>(),
  { accept: '*', multiple: false, hint: '', maxCount: 0, maxSize: 0, showList: true },
)

const emit = defineEmits<{
  /** 文件列表变化时触发（新增或移除），files 为当前列表 */
  (e: 'change', files: WdUploadFile[]): void
  /** 超出数量或体积上限时触发，reason 说明原因，file 为被拒收的文件 */
  (e: 'exceed', reason: 'count' | 'size', file: File): void
}>()

/** 校验失败等提示 */
const error = ref('')

const files = ref<WdUploadFile[]>([])
const dragging = ref(false)
const input = ref<HTMLInputElement>()

function fmtSize(n: number) {
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(1)} MB`
}

function addFiles(list: FileList | File[]) {
  error.value = ''
  for (const f of Array.from(list)) {
    // 数量上限：超出直接拒收并提示
    if (props.maxCount > 0 && files.value.length >= props.maxCount) {
      error.value = `最多上传 ${props.maxCount} 个文件`
      emit('exceed', 'count', f)
      break
    }
    // 体积上限
    if (props.maxSize > 0 && f.size > props.maxSize) {
      error.value = `${f.name} 超过 ${fmtSize(props.maxSize)} 上限`
      emit('exceed', 'size', f)
      continue
    }
    if (!props.multiple && files.value.length >= 1) files.value = []
    const item: WdUploadFile = { name: f.name, size: f.size, percent: 0 }
    files.value.push(item)
    emit('change', files.value)
    // 演示进度：接入真实上传时替换为实际进度
    const timer = window.setInterval(() => {
      item.percent = Math.min(100, item.percent + Math.round(12 + Math.random() * 16))
      if (item.percent >= 100) window.clearInterval(timer)
    }, 120)
  }
}

function openPicker() {
  input.value?.click()
}
function onPick(e: Event) {
  const target = e.target as HTMLInputElement
  addFiles(target.files || [])
  target.value = ''
}
function onDrop(e: DragEvent) {
  e.preventDefault()
  dragging.value = false
  if (e.dataTransfer) addFiles(e.dataTransfer.files)
}
function remove(i: number) {
  files.value.splice(i, 1)
  emit('change', files.value)
}
</script>

<template>
  <div class="wd-upload">
    <div
      class="wd-upload__zone"
      :class="{ 'wd-upload__zone--over': dragging }"
      @click="openPicker"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop="onDrop"
    >
      <span class="wd-upload__icon">
        <wd-icon name="upload" :size="30" />
      </span>
      <span class="wd-upload__hint"><strong>点击选择</strong> 或拖拽文件到这里</span>
      <span v-if="hint" class="wd-upload__hint">{{ hint }}</span>
      <span class="wd-upload__browse">浏览文件</span>
      <input ref="input" class="wd-upload__input" type="file" :accept="accept" :multiple="multiple" @change="onPick" />
      <span v-if="error" class="wd-upload__error">{{ error }}</span>
    </div>

    <div v-if="showList && files.length" class="wd-upload__list">
      <div v-for="(f, i) in files" :key="i" class="wd-upload__item">
        <span class="wd-upload__file-icon">
          <wd-icon name="file" :size="16" />
        </span>
        <div class="wd-upload__info">
          <div class="wd-upload__name">{{ f.name }}</div>
          <div class="wd-upload__meta">{{ fmtSize(f.size) }} · {{ f.percent >= 100 ? '已完成' : '上传中 ' + f.percent + '%' }}</div>
          <div v-if="f.percent < 100" class="wd-upload__progress">
            <span class="wd-upload__progress-bar" :style="{ width: f.percent + '%' }"></span>
          </div>
        </div>
        <button type="button" class="wd-upload__remove" aria-label="移除" @click.stop="remove(i)">
          <wd-icon name="close" :size="13" />
        </button>
      </div>
    </div>
  </div>
</template>
