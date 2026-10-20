<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdCard, WdGrid } from "@wdesign";

const columns = ref(3);
</script>

<template>
  <DemoPage
    name="Grid"
    desc="栅格：固定列数 · 自适应列 · 三档间距 · 跨列混排 · 窄容器边界"
  >
    <DemoBlock title="固定列数" desc="列数写死时每个格子等宽，后台的指标卡最常用这种">
      <WdGrid :columns="3" gap="md">
        <WdCard padding="sm">栅格 1</WdCard>
        <WdCard padding="sm">栅格 2</WdCard>
        <WdCard padding="sm">栅格 3</WdCard>
        <WdCard padding="sm">栅格 4</WdCard>
        <WdCard padding="sm">栅格 5</WdCard>
        <WdCard padding="sm">栅格 6</WdCard>
      </WdGrid>
    </DemoBlock>

    <DemoBlock title="切换列数" desc="列数由状态驱动，换布局只是换一个数字，不用重写模板">
      <DemoRow :gap="8">
        <WdButton size="sm" :variant="columns === 1 ? 'primary' : 'ghost'" @click="columns = 1">1 列</WdButton>
        <WdButton size="sm" :variant="columns === 2 ? 'primary' : 'ghost'" @click="columns = 2">2 列</WdButton>
        <WdButton size="sm" :variant="columns === 4 ? 'primary' : 'ghost'" @click="columns = 4">4 列</WdButton>
      </DemoRow>
      <WdGrid :columns="columns" gap="md">
        <WdCard padding="sm">一</WdCard>
        <WdCard padding="sm">二</WdCard>
        <WdCard padding="sm">三</WdCard>
        <WdCard padding="sm">四</WdCard>
      </WdGrid>
    </DemoBlock>

    <DemoBlock title="自适应列" desc="columns 为 auto 时按最小 200px 自动增减列数，窄屏不用手写断点">
      <WdGrid columns="auto" gap="md">
        <WdCard padding="sm">自适应 1</WdCard>
        <WdCard padding="sm">自适应 2</WdCard>
        <WdCard padding="sm">自适应 3</WdCard>
        <WdCard padding="sm">自适应 4</WdCard>
      </WdGrid>
    </DemoBlock>

    <DemoBlock title="间距档位" desc="同一页面里栅格间距只取一棵阶梯里的值，视觉密度才统一">
      <span class="cap">gap sm = 8px</span>
      <WdGrid :columns="4" gap="sm">
        <WdCard padding="sm">A</WdCard>
        <WdCard padding="sm">B</WdCard>
        <WdCard padding="sm">C</WdCard>
        <WdCard padding="sm">D</WdCard>
      </WdGrid>
      <span class="cap">gap lg = 24px</span>
      <WdGrid :columns="4" gap="lg">
        <WdCard padding="sm">A</WdCard>
        <WdCard padding="sm">B</WdCard>
        <WdCard padding="sm">C</WdCard>
        <WdCard padding="sm">D</WdCard>
      </WdGrid>
    </DemoBlock>

    <DemoBlock
      title="跨列混排"
      desc="WdGrid 只负责列轨道，「占两列」交给子项自己的 grid-column —— 比给 Grid 加一个 colSpan prop 更灵活，子项也仍然是普通元素"
    >
      <WdGrid :columns="2" gap="md" class="grid-fixed">
        <WdCard padding="sm" class="span-2">
          <div class="wd-card__title">头条</div>
          <div class="wd-card__meta">跨两列的通栏卡，用来放概览</div>
        </WdCard>
        <WdCard padding="sm">指标 A</WdCard>
        <WdCard padding="sm">指标 B</WdCard>
      </WdGrid>
    </DemoBlock>

    <DemoBlock
      title="指标卡"
      desc="2 列是后台最常见的密度：一屏能放四张，每张只有一个数字和一句说明，扫读比表格快"
    >
      <WdGrid :columns="2" gap="md" class="grid-fixed">
        <WdCard padding="sm">
          <div class="wd-card__meta">本周新增</div>
          <div class="wd-card__stat">128</div>
        </WdCard>
        <WdCard padding="sm">
          <div class="wd-card__meta">活跃组件</div>
          <div class="wd-card__stat">76</div>
        </WdCard>
        <WdCard padding="sm">
          <div class="wd-card__meta">待修问题</div>
          <div class="wd-card__stat">9</div>
        </WdCard>
        <WdCard padding="sm">
          <div class="wd-card__meta">本月发布</div>
          <div class="wd-card__stat">4</div>
        </WdCard>
      </WdGrid>
    </DemoBlock>

    <DemoBlock
      title="边界：窄容器写死列数"
      desc="固定 4 列在 320px 容器里每格只剩 74px，四个字得折成两行；auto 会按 200px 最小宽自动降到 1 列 —— 容器宽度不确定时优先用 auto"
    >
      <div class="narrow">
        <span class="cap">:columns="4"</span>
        <WdGrid :columns="4" gap="sm">
          <WdCard padding="sm">活跃组件</WdCard>
          <WdCard padding="sm">活跃组件</WdCard>
          <WdCard padding="sm">活跃组件</WdCard>
          <WdCard padding="sm">活跃组件</WdCard>
        </WdGrid>
        <span class="cap">columns="auto"</span>
        <WdGrid columns="auto" gap="sm">
          <WdCard padding="sm">活跃组件</WdCard>
          <WdCard padding="sm">活跃组件</WdCard>
          <WdCard padding="sm">活跃组件</WdCard>
          <WdCard padding="sm">活跃组件</WdCard>
        </WdGrid>
      </div>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.cap {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.grid-fixed {
  min-width: 380px;
}

.span-2 {
  grid-column: span 2;
}

.narrow {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
}
</style>
