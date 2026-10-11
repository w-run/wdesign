<script setup lang="ts">
defineOptions({ name: 'WdTable' })

export interface WdTableColumn {
  key: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(
  defineProps<{
    columns?: WdTableColumn[]
    rows?: Record<string, unknown>[]
    striped?: boolean
    emptyText?: string
  }>(),
  { columns: () => [], rows: () => [], striped: true, emptyText: '暂无数据' },
)
</script>

<template>
  <div class="wd-table-wrap">
    <table v-if="props.rows.length" class="wd-table" :class="{ 'wd-table--striped': striped }">
      <thead>
        <tr>
          <th
            v-for="col in props.columns"
            :key="col.key"
            :style="col.width ? { width: col.width } : undefined"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in props.rows" :key="i">
          <td
            v-for="col in props.columns"
            :key="col.key"
            :style="col.align ? { textAlign: col.align } : undefined"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">{{ row[col.key] }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="wd-table__empty">{{ emptyText }}</div>
  </div>
</template>
