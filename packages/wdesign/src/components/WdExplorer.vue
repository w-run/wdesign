<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ name: 'WdExplorer' })

export interface WdExplorerFile {
  name: string
  size?: number
  modified?: string
}
export interface WdExplorerFolder {
  name: string
  files: WdExplorerFile[]
}

const props = withDefaults(
  defineProps<{
    folders?: WdExplorerFolder[]
  }>(),
  { folders: () => [] },
)

const emit = defineEmits<{ (e: 'select', file: WdExplorerFile): void }>()

const active = ref(0)
const current = computed(() => props.folders[active.value] || { name: '', files: [] })

function fmtSize(n?: number) {
  if (!n) return '—'
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(1)} MB`
}
</script>

<template>
  <div class="wd-explorer">
    <div class="wd-explorer__side">
      <button
        v-for="(f, i) in folders"
        :key="i"
        type="button"
        class="wd-explorer__folder"
        :class="{ 'wd-explorer__folder--active': i === active }"
        @click="active = i"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"></path></svg>
        <span>{{ f.name }}</span>
        <span class="wd-explorer__count">{{ f.files.length }}</span>
      </button>
    </div>

    <div class="wd-explorer__main">
      <div class="wd-explorer__path">
        <span class="wd-explorer__crumb" @click="active = 0">全部文件</span>
        <span class="wd-explorer__sep">/</span>
        <span class="wd-explorer__crumb wd-explorer__crumb--cur">{{ current.name }}</span>
      </div>
      <table class="wd-table">
        <thead>
          <tr><th>名称</th><th style="width: 90px;">大小</th><th style="width: 110px;">修改时间</th></tr>
        </thead>
        <tbody>
          <tr v-for="(f, i) in current.files" :key="i" @click="emit('select', f)">
            <td>
              <span class="wd-explorer__file-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path></svg>
              </span>
              {{ f.name }}
            </td>
            <td>{{ fmtSize(f.size) }}</td>
            <td>{{ f.modified || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
