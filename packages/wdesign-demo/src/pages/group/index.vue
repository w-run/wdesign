<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdGroup, WdIcon, WdInput } from "@wdesign";

/** 分段选择：选中项靠 primary 底色表达，不靠加粗或下划线 */
const ranges = ["日", "周", "月", "年"];
const range = ref("月");

const query = ref("");
</script>

<template>
  <DemoPage
    name="Group"
    desc="组合容器：三种形态 · 方向 · 尺寸 · 等分 · 图标工具栏 · 输入组合 · 分段选择"
  >
    <DemoBlock title="三种形态" desc="capsule 是浅底胶囊，joined 靠子项底色拼合，inset 是凹槽里浮起的分段">
      <DemoRow :gap="16">
        <WdGroup variant="capsule" label="时间范围">
          <WdButton variant="ghost">日</WdButton>
          <WdButton variant="ghost">周</WdButton>
          <WdButton variant="primary">月</WdButton>
        </WdGroup>
        <WdGroup variant="joined">
          <WdButton variant="ghost">概览</WdButton>
          <WdButton variant="ghost">明细</WdButton>
          <WdButton variant="primary">导出</WdButton>
        </WdGroup>
        <WdGroup variant="inset">
          <WdButton variant="ghost">全部</WdButton>
          <WdButton variant="ghost">进行中</WdButton>
          <WdButton variant="ghost">已完成</WdButton>
        </WdGroup>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="尺寸" desc="整组只设一次尺寸，子项高度与内距自动跟随，不用逐个调">
      <DemoRow :gap="16">
        <WdGroup variant="capsule" size="sm">
          <WdButton variant="ghost" size="sm">上一步</WdButton>
          <WdButton variant="primary" size="sm">下一步</WdButton>
        </WdGroup>
        <WdGroup variant="capsule" size="md">
          <WdButton variant="ghost">上一步</WdButton>
          <WdButton variant="primary">下一步</WdButton>
        </WdGroup>
        <WdGroup variant="capsule" size="lg">
          <WdButton variant="ghost" size="lg">上一步</WdButton>
          <WdButton variant="primary" size="lg">下一步</WdButton>
        </WdGroup>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="等分与通栏" desc="equal 让每段等宽，block 撑满容器；两段宽度不一时开着 equal 才不会歪">
      <WdGroup variant="joined" equal block>
        <WdButton variant="ghost">日</WdButton>
        <WdButton variant="ghost">周</WdButton>
        <WdButton variant="ghost">月</WdButton>
        <WdButton variant="primary">年</WdButton>
      </WdGroup>
      <WdGroup variant="inset" equal block>
        <WdButton variant="ghost">待处理</WdButton>
        <WdButton variant="ghost">处理中</WdButton>
        <WdButton variant="ghost">已解决</WdButton>
      </WdGroup>
    </DemoBlock>

    <DemoBlock title="纵向与禁用" desc="direction 为 col 时分段纵向堆叠；disabled 整组变灰且不响应点击">
      <DemoRow :gap="16">
        <WdGroup variant="joined" direction="col" class="half">
          <WdButton variant="ghost">上一步</WdButton>
          <WdButton variant="ghost">下一步</WdButton>
          <WdButton variant="primary">提交</WdButton>
        </WdGroup>
        <WdGroup variant="capsule" direction="col" disabled class="half">
          <WdButton variant="ghost">不可点</WdButton>
          <WdButton variant="ghost">整组禁用</WdButton>
        </WdGroup>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="图标工具栏" desc="图标按钮拼成一条工具条，seamless 压掉子项自己的框，避免框里套框">
      <DemoRow :gap="16">
        <WdGroup variant="inset">
          <WdButton variant="ghost" icon-only><WdIcon name="plus" :size="16" /></WdButton>
          <WdButton variant="ghost" icon-only><WdIcon name="minus" :size="16" /></WdButton>
          <WdButton variant="ghost" icon-only><WdIcon name="check" :size="16" /></WdButton>
          <WdButton variant="ghost" icon-only><WdIcon name="close" :size="16" /></WdButton>
        </WdGroup>
        <WdGroup variant="capsule">
          <WdButton variant="ghost" icon-only><WdIcon name="arrow-left" :size="16" /></WdButton>
          <WdButton variant="ghost" icon-only><WdIcon name="arrow-right" :size="16" /></WdButton>
          <WdButton variant="primary" icon-only><WdIcon name="search" :size="16" /></WdButton>
        </WdGroup>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="输入框 + 按钮"
      desc="组合容器真正省事的地方：输入框与按钮共用一条外框。seamless（默认开）统一压掉子项自带的边框与圆角，否则就是胶囊里套胶囊"
    >
      <WdGroup variant="capsule" label="站内搜索">
        <WdInput v-model="query" placeholder="搜索组件" />
        <WdButton variant="primary">搜索</WdButton>
      </WdGroup>
      <p class="cap">关键词：{{ query || "（空）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="分段选择"
      desc="选中态用 primary 表达，切换只改一个 ref；label 是给读屏的 aria-label，界面上不会出现可见文字 —— 要看得见的分组名请自己在组外写标题"
    >
      <WdGroup variant="inset" label="时间范围">
        <WdButton
          v-for="r in ranges"
          :key="r"
          :variant="range === r ? 'primary' : 'ghost'"
          @click="range = r"
        >
          {{ r }}
        </WdButton>
      </WdGroup>
      <p class="cap">当前粒度：{{ range }}</p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.half {
  flex: 1 1 0;
  min-width: 0;
}

.cap {
  margin: 0;
  font-size: var(--wd-fs-sm);
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
