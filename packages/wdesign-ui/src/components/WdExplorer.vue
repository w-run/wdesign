<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
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
    /** 初始视图：details 详情列表 / icons 图标网格 */
    view?: 'details' | 'icons'
  }>(),
  { folders: () => [], view: 'details' },
)

const emit = defineEmits<{ (e: 'select', file: WdExplorerFile): void }>()

const active = ref(0)
const mode = ref<'details' | 'icons'>(props.view)
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
      <div class="wd-explorer__side-title">文件夹</div>
      <button
        v-for="(f, i) in folders"
        :key="i"
        type="button"
        class="wd-explorer__folder"
        :class="{ 'wd-explorer__folder--active': i === active }"
        @click="active = i"
      >
        <wd-icon name="folder" :size="15" />
        <span class="wd-explorer__folder-name">{{ f.name }}</span>
        <span class="wd-explorer__count">{{ f.files.length }}</span>
      </button>
    </div>

    <div class="wd-explorer__main">
      <div class="wd-explorer__bar">
        <div class="wd-explorer__path">
          <span class="wd-explorer__crumb" @click="active = 0">全部文件</span>
          <span class="wd-explorer__sep">/</span>
          <span class="wd-explorer__crumb wd-explorer__crumb--cur">{{ current.name }}</span>
        </div>
        <div class="wd-explorer__views">
          <button
            type="button"
            class="wd-explorer__view-btn"
            :class="{ 'wd-explorer__view-btn--active': mode === 'details' }"
            title="详情"
            @click="mode = 'details'"
          >
            <wd-icon name="search" :size="15" />
          </button>
          <button
            type="button"
            class="wd-explorer__view-btn"
            :class="{ 'wd-explorer__view-btn--active': mode === 'icons' }"
            title="图标"
            @click="mode = 'icons'"
          >
            <wd-icon name="layout-grid" :size="15" />
          </button>
        </div>
      </div>

      <table v-if="mode === 'details'" class="wd-explorer__table">
        <colgroup>
          <col />
          <col style="width: 96px" />
          <col style="width: 118px" />
        </colgroup>
        <thead>
          <tr>
            <th>名称</th>
            <th class="is-num">大小</th>
            <th class="is-num">修改时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(f, i) in current.files" :key="i" @click="emit('select', f)">
            <td>
              <span class="wd-explorer__name">
                <span class="wd-explorer__file-chip">
                  <wd-icon name="file" :size="15" />
                </span>
                <span class="wd-explorer__file-name">{{ f.name }}</span>
              </span>
            </td>
            <td class="is-num">{{ fmtSize(f.size) }}</td>
            <td class="is-num">{{ f.modified || '—' }}</td>
          </tr>
        </tbody>
      </table>

      <div v-else class="wd-explorer__grid">
        <button
          v-for="(f, i) in current.files"
          :key="i"
          type="button"
          class="wd-explorer__tile"
          @click="emit('select', f)"
        >
          <span class="wd-explorer__tile-icon">
            <wd-icon name="folder-open" :size="22" />
          </span>
          <span class="wd-explorer__tile-name">{{ f.name }}</span>
          <span class="wd-explorer__tile-size">{{ fmtSize(f.size) }}</span>
        </button>
      </div>

      <div v-if="!current.files.length" class="wd-explorer__empty">此文件夹为空</div>
    </div>
  </div>
</template>
