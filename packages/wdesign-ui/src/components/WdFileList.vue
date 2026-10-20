<script setup lang="ts">
import { WdIcon } from '@w-run/wdesign-icons'
import { computed, ref } from 'vue'

defineOptions({ name: 'WdFileList' })

export interface WdFileNode {
  name: string
  type?: 'file' | 'folder'
  size?: number
  children?: WdFileNode[]
}

const props = withDefaults(
  defineProps<{
    items?: WdFileNode[]
  }>(),
  { items: () => [] },
)

const emit = defineEmits<{ (e: 'select', item: WdFileNode): void }>()

const openPaths = ref<Set<string>>(new Set())

/** 扁平化：只展开 openPaths 命中的层级（避免递归组件） */
const rows = computed(() => {
  const out: { node: WdFileNode; depth: number; path: string }[] = []
  const walk = (nodes: WdFileNode[], depth: number, base: string) => {
    nodes.forEach((n, i) => {
      const path = `${base}${i}/`
      out.push({ node: n, depth, path })
      if (n.type === 'folder' && openPaths.value.has(path)) {
        walk(n.children || [], depth + 1, path)
      }
    })
  }
  walk(props.items, 0, '')
  return out
})

function onRow(row: { node: WdFileNode; path: string }) {
  if (row.node.type === 'folder') {
    const s = new Set(openPaths.value)
    if (s.has(row.path)) s.delete(row.path)
    else s.add(row.path)
    openPaths.value = s
  } else {
    emit('select', row.node)
  }
}

function fmtSize(n?: number) {
  if (!n) return ''
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(1)} MB`
}
</script>

<template>
  <div class="wd-file-list">
    <div
      v-for="row in rows"
      :key="row.path"
      class="wd-file-list__row"
      :class="`wd-file-list__row--${row.node.type || 'file'}`"
      :style="{ paddingLeft: 12 + row.depth * 20 + 'px' }"
      @click="onRow(row)"
    >
      <!-- 箭头列始终占位：文件夹与文件的图标保持同列对齐 -->
      <span class="wd-file-list__chevron wd-chevron wd-chevron--right" :class="{ 'wd-chevron--open': openPaths.has(row.path) }">
        <wd-icon v-if="row.node.type === 'folder'" name="chevron-down" :size="12" />
      </span>
      <span class="wd-file-list__icon">
        <wd-icon v-if="row.node.type === 'folder'" name="folder" :size="14" />
        <wd-icon v-else name="file" :size="12" />
      </span>
      <span class="wd-file-list__name">{{ row.node.name }}</span>
      <span class="wd-file-list__size">{{ fmtSize(row.node.size) }}</span>
    </div>
  </div>
</template>
