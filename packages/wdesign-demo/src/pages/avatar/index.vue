<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdAvatar, WdAvatarGroup } from "@wdesign";
</script>

<template>
  <DemoPage
    name="Avatar"
    desc="头像与头像组：自动配色 · 四档色相 · 尺寸档位 · 堆叠折叠"
  >
    <DemoBlock title="自动配色" desc="不指定 tone 时按名称哈希取色，同一名字颜色稳定">
      <DemoRow :gap="12">
        <WdAvatar name="林小满" />
        <WdAvatar name="王一舟" />
        <WdAvatar name="周可" />
        <WdAvatar name="李默" />
        <WdAvatar name="赵雪" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="色相档位" desc="tone 0–3 四个色相；dark 用于深色背景">
      <DemoRow :gap="12">
        <WdAvatar name="A" :tone="0" />
        <WdAvatar name="A" :tone="1" />
        <WdAvatar name="A" :tone="2" />
        <WdAvatar name="A" :tone="3" />
        <WdAvatar name="深" dark />
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="尺寸与堆叠">
      <DemoRow :gap="12">
        <WdAvatar name="小" :size="28" />
        <WdAvatar name="中" :size="40" />
        <WdAvatar name="大" :size="56" />
      </DemoRow>
      <DemoRow :gap="12">
        <WdAvatarGroup
          :names="[林小满, 王一舟, 周可, 李默, 赵雪]"
          :max="3"
        />
        <WdAvatarGroup
          :names="[林小满, 王一舟]"
          :max="5"
        />
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
