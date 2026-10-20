<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdCard, WdGrid, WdTag } from "@wdesign";
</script>

<template>
  <DemoPage name="Card" desc="卡片：三种底色 · 三档内距 · 可悬停 · 内容结构">
    <DemoBlock title="变体" desc="default 是最常用的白卡，tint 用于次要信息，dark 用于需要压过页面的一小块">
      <WdGrid :columns="3" gap="md">
        <WdCard>
          <div class="wd-card__title">默认卡片</div>
          <div class="wd-card__meta">白底 + 单层浅阴影</div>
        </WdCard>
        <WdCard variant="tint">
          <div class="wd-card__title">浅色卡片</div>
          <div class="wd-card__meta">同一层信息里的次要块</div>
        </WdCard>
        <WdCard variant="dark">
          <div class="wd-card__title">深色卡片</div>
          <div class="wd-card__meta">需要强调的一小块区域</div>
        </WdCard>
      </WdGrid>
    </DemoBlock>

    <DemoBlock title="内距档位" desc="内距跟着信息密度走：紧凑列表用 sm，正文块用 md，空状态或统计用 lg">
      <WdGrid :columns="3" gap="md">
        <WdCard padding="sm">
          <div class="wd-card__title">padding sm</div>
          <div class="wd-card__meta">紧凑列表与信息条</div>
        </WdCard>
        <WdCard>
          <div class="wd-card__title">padding md</div>
          <div class="wd-card__meta">默认正文块</div>
        </WdCard>
        <WdCard padding="lg">
          <div class="wd-card__title">padding lg</div>
          <div class="wd-card__meta">留白更多的展示卡</div>
        </WdCard>
      </WdGrid>
    </DemoBlock>

    <DemoBlock title="可悬停" desc="hoverable 会在指针移入时抬起卡片，只在整张卡可点击的场合开启">
      <WdGrid :columns="3" gap="md">
        <WdCard hoverable>
          <div class="wd-card__title">最近打开</div>
          <div class="wd-card__meta">整卡可点击</div>
        </WdCard>
        <WdCard hoverable variant="tint">
          <div class="wd-card__title">常用模板</div>
          <div class="wd-card__meta">整卡可点击</div>
        </WdCard>
        <WdCard>
          <div class="wd-card__title">不可点击</div>
          <div class="wd-card__meta">没有 hover 反馈</div>
        </WdCard>
      </WdGrid>
    </DemoBlock>

    <DemoBlock title="内容结构" desc="标题、说明、数字三层，卡内文字量控制在一屏能看完的范围内">
      <WdGrid :columns="3" gap="md">
        <WdCard>
          <div class="wd-card__title">今日任务</div>
          <div class="wd-card__meta">还有 3 项待完成</div>
          <div class="wd-card__stat">12</div>
        </WdCard>
        <WdCard>
          <div class="wd-card__title">本周专注</div>
          <div class="wd-card__meta">较上周增加 18%</div>
          <div class="wd-card__stat">26h</div>
        </WdCard>
        <WdCard variant="tint">
          <div class="wd-card__title">当前版本</div>
          <div class="wd-card__meta">最近一次发布于今天</div>
          <DemoRow :gap="8">
            <WdTag size="sm">正式版</WdTag>
            <WdTag size="sm" variant="gray">76 组件</WdTag>
          </DemoRow>
        </WdCard>
      </WdGrid>
    </DemoBlock>
  </DemoPage>
</template>
