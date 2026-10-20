<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdPagination } from "@wdesign";

const page = ref(1);
const log = ref("尚未翻页");

function onChange(p: number, size: number) {
  log.value = `第 ${p} 页 · 每页 ${size} 条`;
}

/* 每页条数：pageSize 单独受控，切档时分页会自己把越界的当前页夹回来 */
const pageSize = ref(10);
const sizePage = ref(1);
const total = 486;

/* 简洁模式 */
const simplePage = ref(3);

/* 折叠对比 */
const foldPage = ref(6);
</script>

<template>
  <DemoPage name="Pagination" desc="分页：基础 · 每页条数 · 简洁模式 · 页码折叠">
    <DemoBlock title="基础" desc="v-model 绑当前页，showTotal 显示区间与总数，翻页会回传 change(page, size)">
      <WdPagination v-model="page" :total="128" show-total @change="onChange" />
      <span class="hint">当前第 {{ page }} 页 · {{ log }}</span>
    </DemoBlock>

    <DemoBlock title="每页条数" desc="showSizeChanger 打开每页条数下拉，pageSizes 决定可选项；换档后当前页越界会自动夹回最后一页">
      <WdPagination
        v-model="sizePage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        show-total
        show-size-changer
      />
      <span class="hint">共 {{ total }} 条 · 每页 {{ pageSize }} 条 · 当前第 {{ sizePage }} 页</span>
    </DemoBlock>

    <DemoBlock title="简洁模式" desc="simple 只留上一页 / 页码 / 下一页，适合表格上方的窄工具栏">
      <WdPagination v-model="simplePage" :total="486" :page-size="20" simple />
      <span class="hint">第 {{ simplePage }} 页，共 25 页</span>
    </DemoBlock>

    <DemoBlock title="页码折叠" desc="默认 compact 会把远端页码收成省略号，页数不多时关掉它把全部页码摊平">
      <WdPagination v-model="foldPage" :total="120" :page-size="10" />
      <WdPagination v-model="foldPage" :total="120" :page-size="10" :compact="false" />
      <span class="hint">同一份 12 页数据，上为折叠、下为全部展开</span>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.hint {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
