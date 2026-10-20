<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdCard, WdDivider, WdIcon } from "@wdesign";
</script>

<template>
  <DemoPage
    name="Divider"
    desc="分隔线：水平 · 带文字对齐 · 虚线 · 垂直 · 工具条与窄容器边界"
  >
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

    <DemoBlock
      title="工具条里的分组"
      desc="图标按钮之间用虚线竖线分组：线高只有 1em 并自动居中，所以它划分的是「同一行里的并列项」，块级内容之间仍然只能靠留白"
    >
      <DemoRow :gap="8" align="center">
        <WdButton variant="ghost" icon-only>
          <WdIcon name="arrow-left" :size="16" />
        </WdButton>
        <WdButton variant="ghost" icon-only>
          <WdIcon name="arrow-right" :size="16" />
        </WdButton>
        <WdDivider direction="vertical" variant="dashed" />
        <WdButton variant="ghost" icon-only>
          <WdIcon name="refresh" :size="16" />
        </WdButton>
        <WdButton variant="ghost" icon-only>
          <WdIcon name="save" :size="16" />
        </WdButton>
        <WdDivider direction="vertical" variant="dashed" />
        <WdButton variant="ghost" icon-only>
          <WdIcon name="trash" :size="16" />
        </WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="边界：窄容器里的文字"
      desc="两侧的线是 flex:1 分剩余空间，文字 nowrap 且不收缩；容器窄到放不下时线先被压成 0，再往下就溢出。分组文字控制在 8 字以内"
    >
      <div class="narrow">
        <WdDivider>设计系统 · 可访问性</WdDivider>
        <WdDivider align="left">很长的一段分组标题被塞进 240px 容器</WdDivider>
      </div>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.crumb {
  font-size: 13px;
  color: var(--wd-ink-2);
}

.narrow {
  width: 240px;
}
</style>
