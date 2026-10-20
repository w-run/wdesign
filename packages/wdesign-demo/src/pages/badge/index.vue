<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdBadge, WdButton, WdIcon } from "@wdesign";

const unread = ref(3);
</script>

<template>
  <DemoPage name="Badge" desc="徽标：数值上限 · 圆点态 · 灰度色调">
    <DemoBlock title="数值徽标" desc="value 挂在被标记元素的右上角，图标按钮是最常见的宿主">
      <DemoRow :gap="24">
        <WdBadge :value="3"><WdIcon name="bell" :size="22" /></WdBadge>
        <WdBadge :value="7"><WdIcon name="star" :size="22" /></WdBadge>
        <WdBadge :value="1"><WdIcon name="user" :size="22" /></WdBadge>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="数值上限" desc="超过 max 显示 max+，避免三位数把徽标撑变形">
      <DemoRow :gap="24">
        <WdBadge :value="8"><WdIcon name="file" :size="22" /></WdBadge>
        <WdBadge :value="120" :max="99"><WdIcon name="file" :size="22" /></WdBadge>
        <WdBadge :value="12" :max="9"><WdIcon name="file" :size="22" /></WdBadge>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="圆点与色调" desc="不关心具体数量时用 dot，gray 用于压低提示强度">
      <DemoRow :gap="24">
        <WdBadge dot><WdIcon name="bell" :size="22" /></WdBadge>
        <WdBadge dot tone="gray"><WdIcon name="file" :size="22" /></WdBadge>
        <WdBadge :value="4" tone="gray"><WdIcon name="settings" :size="22" /></WdBadge>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="数值变化" desc="只有数值变化时徽标才弹入一次，首屏静止，避免页面看起来在抖">
      <DemoRow :gap="16">
        <WdBadge :value="unread"><WdIcon name="bell" :size="22" /></WdBadge>
        <WdButton variant="tint" size="sm" @click="unread = unread + 1">收到一条</WdButton>
        <WdButton variant="ghost" size="sm" @click="unread = 0">全部已读</WdButton>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
