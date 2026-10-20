<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdTag } from "@wdesign";
</script>

<template>
  <DemoPage name="Tag" desc="标签：三种底色 · 三档尺寸 · 圆点态">
    <DemoBlock title="变体" desc="tint 用于分类，gray 用于次要信息，dark 用在小面积强调">
      <DemoRow>
        <WdTag>设计</WdTag>
        <WdTag variant="gray">草稿</WdTag>
        <WdTag variant="dark">置顶</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="尺寸" desc="sm 跟在列表项后面不抢视线，lg 留给筛选区里可点的标签">
      <DemoRow>
        <WdTag size="sm">sm</WdTag>
        <WdTag>md</WdTag>
        <WdTag size="lg">lg</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="圆点态" desc="dot 用来表达状态，圆点比纯文字更容易被扫到">
      <DemoRow>
        <WdTag dot>运行中</WdTag>
        <WdTag variant="gray" dot>待处理</WdTag>
        <WdTag variant="dark" dot>已归档</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="标签组" desc="一组标签的整齐度取决于间距一致，用固定 gap 而不是随手给 margin">
      <DemoRow :gap="8">
        <WdTag size="sm" variant="gray">Vue</WdTag>
        <WdTag size="sm" variant="gray">TypeScript</WdTag>
        <WdTag size="sm" variant="gray">SCSS</WdTag>
        <WdTag size="sm" variant="gray">Vite</WdTag>
        <WdTag size="sm" variant="gray">pnpm</WdTag>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
