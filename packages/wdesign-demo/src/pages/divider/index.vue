<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdCard, WdDivider } from "@wdesign";
</script>

<template>
  <DemoPage name="Divider" desc="分隔线：水平 · 带文字对齐 · 虚线 · 垂直">
    <DemoBlock title="水平分隔" desc="区块之间优先靠留白分层，只有内容差异较小时才需要一条线">
      <WdCard padding="sm">订单概览</WdCard>
      <WdDivider :spacing="4" />
      <WdCard padding="sm">物流详情</WdCard>
    </DemoBlock>

    <DemoBlock title="带文字与对齐" desc="文字把线断开，既能分组又不用额外写小标题">
      <WdDivider align="left">今天</WdDivider>
      <WdDivider>居中分组</WdDivider>
      <WdDivider align="right">更早</WdDivider>
    </DemoBlock>

    <DemoBlock title="线型与间距" desc="spacing 控制上下留白，dashed 表示弱分组，不打断阅读节奏">
      <WdDivider :spacing="4" />
      <WdDivider :spacing="4" variant="dashed" />
      <WdDivider :spacing="24">大间距</WdDivider>
    </DemoBlock>

    <DemoBlock title="垂直分隔" desc="用在行内的并列项之间，例如面包屑与工具条，不能用在块级内容之间">
      <DemoRow :gap="10">
        <span class="crumb">概览</span>
        <WdDivider direction="vertical" />
        <span class="crumb">成员</span>
        <WdDivider direction="vertical" />
        <span class="crumb">设置</span>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.crumb {
  font-size: 13px;
  color: var(--wd-ink-2);
}
</style>
