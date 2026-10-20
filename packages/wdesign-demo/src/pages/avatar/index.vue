<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdAvatar, WdAvatarGroup } from "@wdesign";

/**
 * 头像组的数据必须走 ref —— 之前直接写在模板里（`:names="[林小满, …]"`），
 * 中文没加引号，被当成标识符求值成 undefined，
 * 头像组于是渲染出一排「?」：不报错、不告警，只是全错。
 */
const members = ["林小满", "王一舟", "周可", "李默", "赵雪"];
const duo = ["林小满", "王一舟"];
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

    <DemoBlock
      title="明度档位"
      desc="tone 全部落在中性灰族里，只做明度区分；tone 0（默认）= 按名字自动分配"
    >
      <DemoRow :gap="12">
        <WdAvatar name="甲" :tone="1" />
        <WdAvatar name="乙" :tone="2" />
        <WdAvatar name="丙" :tone="3" />
        <WdAvatar name="深" dark />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="尺寸"
      desc="只有 sm / md / lg 三档 —— 尺寸由令牌决定，不接受任意像素值"
    >
      <DemoRow :gap="12" align="flex-end">
        <WdAvatar name="小" size="sm" />
        <WdAvatar name="中" size="md" />
        <WdAvatar name="大" size="lg" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="头像组" desc="max 控制最多显示几个，其余折叠成 +N">
      <DemoRow :gap="12">
        <WdAvatarGroup :names="members" :max="3" />
        <WdAvatarGroup :names="duo" :max="5" />
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
