<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdCard, WdGrid, WdTag } from "@wdesign";

/** 卡内列表：状态用标签收口，行数一多就该换表格 */
const rows = [
  { label: "设计令牌", state: "已同步", ok: true },
  { label: "组件文档", state: "待更新", ok: false },
  { label: "示例页面", state: "已同步", ok: true },
];
</script>

<template>
  <DemoPage
    name="Card"
    desc="卡片：三种底色 · 三档内距 · 可悬停 · 内容结构 · 头身脚组合 · 长文案边界"
  >
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

    <DemoBlock
      title="头 · 身 · 脚"
      desc="卡片没有头部插槽，层次靠间距和一个主行动建立：标题与状态同一行、一句说明、按钮靠右 —— 主行动永远在最右"
    >
      <WdCard>
        <div class="panel__head">
          <span class="panel__title">发布设置</span>
          <WdTag size="sm">草稿</WdTag>
        </div>
        <p class="panel__desc">选择发布范围后可以立刻上线，也可以先存草稿。</p>
        <DemoRow :gap="8" class="panel__foot">
          <WdButton variant="ghost" size="sm">存草稿</WdButton>
          <WdButton variant="primary" size="sm">发布</WdButton>
        </DemoRow>
      </WdCard>
    </DemoBlock>

    <DemoBlock
      title="卡内列表"
      desc="一列信息靠留白分组，不用逐行画线；行数超过五六行就该换成表格或独立列表页，卡片撑不下这个信息量"
    >
      <WdCard>
        <div class="rows">
          <div v-for="row in rows" :key="row.label" class="rows__item">
            <span class="rows__label">{{ row.label }}</span>
            <WdTag size="sm" :variant="row.ok ? 'gray' : 'tint'">{{ row.state }}</WdTag>
          </div>
        </div>
      </WdCard>
    </DemoBlock>

    <DemoBlock
      title="边界：文案很长时"
      desc="卡片不裁切也不限高：长文案把整张卡拉高，同一行里另一张就空出半截。标题控一行、说明控两行，完整内容留给详情页"
    >
      <DemoRow :gap="16" align="stretch">
        <WdCard class="tight">
          <div class="panel__title">标题控一行</div>
          <p class="panel__desc">说明控制在两行以内，卡片只承担「扫一眼知道是什么」的职责。</p>
        </WdCard>
        <WdCard class="tight">
          <div class="panel__title">这是一个明显过长、注定要折成三行的卡片标题</div>
          <p class="panel__desc">
            说明也跟着变长，于是同一行里高度被最长的那张撑开，另一张底部会留出一大块空白。
          </p>
        </WdCard>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.panel__title {
  font-size: var(--wd-fs-lg);
  font-weight: 700;
  color: var(--wd-ink);
}

.panel__desc {
  margin: 8px 0 16px;
  font-size: var(--wd-fs-caption);
  line-height: 1.65;
  color: var(--wd-ink-2);
}

.panel__foot {
  justify-content: flex-end;
}

.rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rows__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.rows__label {
  font-size: var(--wd-fs-ui);
  color: var(--wd-ink);
}

.tight {
  width: 240px;
}
</style>
