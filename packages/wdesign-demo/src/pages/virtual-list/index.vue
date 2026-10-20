<script setup lang="ts">
import { computed, ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdVirtualList, WdButton, WdTag } from "@wdesign";

/** 一万条单据：DOM 只渲染可视区那十几行，滚动位置由 translateY 扛 */
const rows = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  code: "WD-" + String(i + 1).padStart(5, "0"),
  name: ["入库单", "出库单", "调拨单", "盘点单"][i % 4],
  status: ["待处理", "进行中", "已完成"][i % 3],
  progress: ((i * 37) % 100) + "%",
}));

/* 固定行高才算得准虚拟窗口：height 320 / itemHeight 36 + 上下各 6 行缓冲 */
const ITEM_H = 36;
const VIEW_H = 320;
const BUFFER = 6;
const domRows = computed(() => Math.ceil(VIEW_H / ITEM_H) + BUFFER * 2);

const vlist = ref<{
  scrollToIndex: (index: number, align?: "start" | "center" | "end") => void;
  scrollToTop: () => void;
} | null>(null);

const offset = ref(0);
const endTip = ref("尚未触底");

function onScroll(top: number) {
  offset.value = Math.round(top);
}

function onReachEnd() {
  endTip.value = "已滚到第 10000 条";
}

const shortRows = rows.slice(0, 12);
</script>

<template>
  <DemoPage name="VirtualList" desc="虚拟列表：一万条只渲染可视区 · 滚动监听 · 定位跳转">
    <DemoBlock :span="2" title="可视区渲染" desc="固定行高才能精确算出窗口，一万条数据也只挂十几个节点">
      <WdVirtualList :items="rows" :item-height="ITEM_H" :height="VIEW_H" :buffer="BUFFER" item-key="id">
        <template #default="{ item, index }">
          <div class="vrow">
            <span class="vrow__idx">{{ index + 1 }}</span>
            <span class="vrow__code">{{ item.code }}</span>
            <span class="vrow__name">{{ item.name }}</span>
            <WdTag :variant="item.status === '已完成' ? 'tint' : 'gray'" size="sm">{{ item.status }}</WdTag>
            <span class="vrow__pct">{{ item.progress }}</span>
          </div>
        </template>
      </WdVirtualList>
      <span class="hint">共 {{ rows.length }} 条 · 每行 {{ ITEM_H }}px · 实际渲染约 {{ domRows }} 行</span>
    </DemoBlock>

    <DemoBlock :span="2" title="滚动监听与触底" desc="scroll 回传偏移量，reach-end 在贴近底部时触发一次，可用于分页加载">
      <WdVirtualList
        :items="rows"
        :item-height="ITEM_H"
        :height="260"
        item-key="id"
        @scroll="onScroll"
        @reach-end="onReachEnd"
      >
        <template #default="{ item, index }">
          <div class="vrow">
            <span class="vrow__idx">{{ index + 1 }}</span>
            <span class="vrow__code">{{ item.code }}</span>
            <span class="vrow__name">{{ item.name }}</span>
            <span class="vrow__pct">{{ item.progress }}</span>
          </div>
        </template>
      </WdVirtualList>
      <span class="hint">当前滚动偏移 {{ offset }}px · {{ endTip }}</span>
    </DemoBlock>

    <DemoBlock :span="2" title="定位跳转" desc="组件暴露 scrollToIndex / scrollToTop，配合锚点做「跳到第 N 条」">
      <WdVirtualList ref="vlist" :items="rows" :item-height="ITEM_H" :height="240" item-key="id">
        <template #default="{ item, index }">
          <div class="vrow">
            <span class="vrow__idx">{{ index + 1 }}</span>
            <span class="vrow__code">{{ item.code }}</span>
            <span class="vrow__name">{{ item.name }}</span>
          </div>
        </template>
      </WdVirtualList>
      <DemoRow :gap="10">
        <WdButton variant="ghost" size="sm" @click="vlist?.scrollToIndex(0)">回到第 1 条</WdButton>
        <WdButton variant="ghost" size="sm" @click="vlist?.scrollToIndex(4999)">跳到第 5000 条</WdButton>
        <WdButton variant="ghost" size="sm" @click="vlist?.scrollToIndex(9999, 'end')">跳到末尾</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock :span="2" title="隐藏滚动条与空状态" desc="hideScrollbar 只是不画滚动条，滚轮与触控手势照常可用">
      <WdVirtualList :items="shortRows" :item-height="ITEM_H" :height="180" item-key="id" hide-scrollbar>
        <template #default="{ item }">
          <div class="vrow">
            <span class="vrow__code">{{ item.code }}</span>
            <span class="vrow__name">{{ item.name }}</span>
          </div>
        </template>
      </WdVirtualList>
      <WdVirtualList :items="[]" :height="120" empty-text="当前筛选条件下没有单据" />
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.hint {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.vrow {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
  padding: 0 14px;
  font-size: 13px;
  color: var(--wd-ink);
}

.vrow__idx {
  width: 52px;
  color: var(--wd-ink-3);
  font-variant-numeric: tabular-nums;
}

.vrow__code {
  width: 110px;
  font-variant-numeric: tabular-nums;
}

.vrow__name {
  flex: 1;
}

.vrow__pct {
  color: var(--wd-ink-2);
  font-variant-numeric: tabular-nums;
}
</style>
