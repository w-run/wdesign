<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdSortableList } from "@wdesign";

type Item = string | { label: string };

const steps = ref<string[]>(["需求评审", "原型设计", "接口联调", "视觉走查", "灰度发布"]);

const tasks = ref<{ label: string }[]>([
  { label: "整理埋点清单" },
  { label: "补充空状态文案" },
  { label: "校对暗色对比度" },
  { label: "补齐键盘焦点环" },
]);

const DEFAULT_ORDER = ["写周报", "约项目评审", "跑回归"];
const ordered = ref<string[]>([...DEFAULT_ORDER]);
const lastOrder = ref("");

function labelOf(item: Item) {
  return typeof item === "string" ? item : item.label;
}

function onChange(items: Item[]) {
  lastOrder.value = items.map(labelOf).join(" → ");
}

function restore() {
  ordered.value = [...DEFAULT_ORDER];
  lastOrder.value = "";
}
</script>

<template>
  <DemoPage
    name="SortableList"
    desc="拖拽排序：按住即拖 · 插入位高亮 · 结果可直接落库"
  >
    <DemoBlock
      title="基础"
      desc="按住任意一行上下拖动，超过 4px 才算开始拖，蓝色横线标出松手后的落点"
    >
      <WdSortableList v-model="steps" />
      <p class="demo-val">当前顺序：{{ steps.join(" → ") }}</p>
    </DemoBlock>

    <DemoBlock
      title="对象项"
      desc="元素可以是字符串，也可以是 { label }；组件只读 label 用于展示，业务字段跟着数组一起走"
    >
      <WdSortableList v-model="tasks" />
      <p class="demo-val">
        当前顺序：{{ tasks.map((t) => t.label).join(" → ") }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="排序结果回显"
      desc="change 抛出的就是重排后的新数组，可直接提交；一键还原方便反复对比"
    >
      <WdSortableList v-model="ordered" @change="onChange" />
      <DemoRow :gap="12">
        <WdButton variant="tint" size="sm" @click="restore">还原初始顺序</WdButton>
        <span class="demo-val">最近一次 change：{{ lastOrder || "（还没拖过）" }}</span>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.demo-val {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
