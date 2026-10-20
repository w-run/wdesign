<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdCard, WdContainer } from "@wdesign";
</script>

<template>
  <DemoPage name="Container" desc="页面容器：限宽居中 · 三档内间距">
    <DemoBlock title="限宽居中" desc="内容超过阅读宽度后两侧自动留白，眼睛不用来回扫视整行">
      <WdContainer max-width="720px" class="frame">
        <WdCard padding="sm">maxWidth 720px：容器自身居中，内容宽度锁在 720px 内</WdCard>
      </WdContainer>
    </DemoBlock>

    <DemoBlock title="多档宽度" desc="正文页窄、列表页宽，宽度按内容形态选，不要所有页面都用同一个值">
      <WdContainer max-width="360px" class="frame">
        <WdCard padding="sm">360px · 窄栏</WdCard>
      </WdContainer>
      <WdContainer max-width="480px" class="frame">
        <WdCard padding="sm">480px · 卡片列表</WdCard>
      </WdContainer>
      <WdContainer max-width="720px" class="frame">
        <WdCard padding="sm">720px · 正文阅读</WdCard>
      </WdContainer>
    </DemoBlock>

    <DemoBlock title="内间距档位" desc="pad 同时作用于上下与左右，避免内容贴到容器边缘">
      <WdContainer pad="sm" class="frame">
        <WdCard padding="sm">pad sm</WdCard>
      </WdContainer>
      <WdContainer pad="md" class="frame">
        <WdCard padding="sm">pad md</WdCard>
      </WdContainer>
      <WdContainer pad="lg" class="frame">
        <WdCard padding="sm">pad lg</WdCard>
      </WdContainer>
    </DemoBlock>

    <DemoBlock title="正文排版" desc="长段落套一层窄容器，行宽控制在 640px 左右时阅读最省力">
      <WdContainer max-width="640px" class="frame">
        <p class="para">
          设计系统的价值不在于把组件一次性做齐，而在于让每一次新增都沿用同一套间距、字号与色彩决策。
          当这些决策被写进令牌，页面之间的差异就只剩信息结构本身。
        </p>
      </WdContainer>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.frame {
  background: var(--wd-field);
  border-radius: var(--wd-radius-md);
}

.para {
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
  color: var(--wd-ink-2);
}
</style>
