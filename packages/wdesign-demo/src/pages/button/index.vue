<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton } from "@wdesign";

const loading = ref(false);

async function fakeSubmit() {
  loading.value = true;
  await new Promise((r) => setTimeout(r, 1500));
  loading.value = false;
}
</script>

<template>
  <DemoPage name="Button" desc="按钮：六种变体 · 三档尺寸 · 图标态 · 加载态">
    <DemoBlock title="变体" desc="primary 是主行动，其余按视觉权重递减">
      <DemoRow>
        <WdButton variant="primary">主按钮</WdButton>
        <WdButton variant="tint">次级</WdButton>
        <WdButton variant="dark">深色</WdButton>
        <WdButton variant="ghost">幽灵</WdButton>
        <WdButton variant="primary" disabled>禁用</WdButton>
        <WdButton variant="tint" disabled>禁用</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="尺寸" desc="sm 用于密集工具栏，lg 用于页面的主 CTA">
      <DemoRow>
        <WdButton variant="primary" size="lg">大尺寸</WdButton>
        <WdButton variant="primary" size="md">中尺寸</WdButton>
        <WdButton variant="primary" size="sm">小尺寸</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="图标态与通栏">
      <DemoRow>
        <WdButton variant="dark" icon-only>+</WdButton>
        <WdButton variant="tint" icon-only>×</WdButton>
        <WdButton variant="ghost" icon-only>⋯</WdButton>
      </DemoRow>
      <WdButton variant="primary" block>block 通栏按钮</WdButton>
    </DemoBlock>

    <DemoBlock title="加载态" desc="loading 时自动禁用点击，防止重复提交">
      <DemoRow>
        <WdButton variant="primary" loading>提交中</WdButton>
        <WdButton variant="tint" loading loading-text="保存中…">保存</WdButton>
        <WdButton variant="dark" :loading="loading" @click="fakeSubmit">
          点我加载 1.5s
        </WdButton>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
