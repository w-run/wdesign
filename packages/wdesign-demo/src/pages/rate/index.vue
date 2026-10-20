<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdRate } from "@wdesign";

const score = ref(3);
const big = ref(4);
const ten = ref(7);
const heart = ref(2);
const fire = ref(3);
const locked = ref(5);
</script>

<template>
  <DemoPage
    name="Rate"
    desc="评分：星标打分 · 颗数与尺寸 · 自定义图标与配色 · 禁用态"
  >
    <DemoBlock
      title="基础"
      desc="点第 N 颗星就是 N 分；再点同一颗星清零（clearable 默认开启），误点不用刷新页面"
    >
      <WdRate v-model="score" />
      <p class="cap">当前评分：{{ score }} / 5</p>
    </DemoBlock>

    <DemoBlock
      title="颗数与尺寸"
      desc="count 决定总颗数，size 直接给像素；十星制要把 size 调小，否则一行放不下"
    >
      <DemoRow :gap="24">
        <WdRate v-model="score" :size="28" />
        <WdRate v-model="big" :size="18" />
      </DemoRow>
      <WdRate v-model="ten" :count="10" :size="16" />
      <p class="cap">五档 {{ score }} 分 / 十档 {{ ten }} 分</p>
    </DemoBlock>

    <DemoBlock
      title="自定义图标与配色"
      desc="icon 取图标名（需要有实心变体，星/心/火这类更有语义的形状），color 与 colorOff 分别管选中与未选中"
    >
      <DemoRow :gap="24">
        <WdRate
          v-model="heart"
          icon="heart"
          color="var(--wd-rainbow-pink)"
          color-off="var(--wd-ink-5)"
        />
        <WdRate
          v-model="fire"
          icon="fire"
          color="var(--wd-rainbow-orange)"
          color-off="var(--wd-ink-5)"
        />
      </DemoRow>
      <p class="cap">喜欢 {{ heart }} / 热度 {{ fire }}</p>
    </DemoBlock>

    <DemoBlock
      title="只读展示与不可清空"
      desc="disabled 只用于展示已有评分，不可点击；clearable=false 时同一颗星再点也不会归零，适合必填项"
    >
      <DemoRow :gap="24">
        <WdRate :model-value="4" disabled />
        <WdRate :model-value="3" :size="18" disabled />
      </DemoRow>
      <WdRate v-model="locked" :clearable="false" />
      <p class="cap">必填项固定 {{ locked }} 分，点同一颗星只会重新落分</p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.cap {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
