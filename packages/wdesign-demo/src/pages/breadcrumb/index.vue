<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdBreadcrumb } from "@wdesign";

const trail = [
  { label: "工作台", value: "home" },
  { label: "客户档案", value: "customers" },
  { label: "上海云仓", value: "c-1024" },
  { label: "合同详情" },
];

const shortTrail = [
  { label: "订单中心", value: "orders" },
  { label: "退款单" },
];

const picked = ref("尚未点击");

function onPick(value: string | number) {
  picked.value = `回传标识：${value}`;
}
</script>

<template>
  <DemoPage name="Breadcrumb" desc="面包屑：层级路径 · 自定义分隔符 · 选中回传">
    <DemoBlock
      title="基础"
      desc="最后一项是当前页，点击不触发 select —— 路径的终点是「你在哪」，不是链接"
    >
      <WdBreadcrumb :items="trail" />
    </DemoBlock>

    <DemoBlock
      title="自定义分隔符"
      desc="separator 只换符号，间距和字色由组件统一控制，不用再写 CSS"
    >
      <WdBreadcrumb :items="trail" separator="›" />
      <WdBreadcrumb :items="trail" separator="·" />
      <WdBreadcrumb :items="shortTrail" />
    </DemoBlock>

    <DemoBlock
      title="层级回传"
      desc="每级带 value，点前置层级触发 select；用回传标识跳转或回填筛选，而不是拿显示文字做判断"
    >
      <WdBreadcrumb :items="trail" @select="onPick" />
      <p class="crumb-echo">{{ picked }}</p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.crumb-echo {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
