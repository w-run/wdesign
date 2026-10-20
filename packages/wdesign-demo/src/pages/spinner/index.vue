<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdSpinner } from "@wdesign";
</script>

<template>
  <DemoPage name="Spinner" desc="加载指示：三档尺寸 · 任意像素 · 与文案并排">
    <DemoBlock title="尺寸档位" desc="sm 用于行内和按钮旁，md 是默认，lg 用于整块区域的加载占位">
      <DemoRow :gap="20">
        <WdSpinner size="sm" />
        <WdSpinner size="md" />
        <WdSpinner size="lg" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="任意像素" desc="size 收数字时按像素算，线宽按大约 11% 自动跟随，不必手调粗细">
      <DemoRow :gap="20">
        <WdSpinner :size="14" />
        <WdSpinner :size="32" />
        <WdSpinner :size="56" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="与文案并排" desc="一块内容在加载时给出「在等什么」，比只转圈更容易让人安心">
      <DemoRow :gap="10">
        <WdSpinner size="sm" />
        <span>正在加载组件列表…</span>
      </DemoRow>
      <DemoRow :gap="12">
        <WdSpinner :size="20" />
        <span>正在校验 595 个图标（约 3 秒）</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="不会被压扁" desc="spinner 自身 flex:none，放进 flex 行里即使旁边文案很长也不会被挤压变形">
      <DemoRow :gap="12" align="flex-start">
        <WdSpinner />
        <span>生成预览中：正在把当前主题令牌展开成 CSS 变量，完成后会自动刷新右侧面板，无需手动操作。</span>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
