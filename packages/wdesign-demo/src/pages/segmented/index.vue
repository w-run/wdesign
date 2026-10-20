<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdSegmented } from "@wdesign";

const period = ref("周");

const view = ref("列表");

/** 条目多到一行放不下时，用来看 overflow 的两档降级表现 */
const stages = [
  "全部",
  "待办",
  "进行中",
  "已阻塞",
  "待评审",
  "已完成",
  "已归档",
  "我参与的",
  "我创建的",
  "本周新增",
  "已逾期",
];
const stageScroll = ref("待评审");
const stageAuto = ref("全部");
const stageFlat = ref("列表");
</script>

<template>
  <DemoPage
    name="Segmented"
    desc="分段控制：单选切换视图 · 等宽 / 深色 · 溢出时滚动或降级下拉"
  >
    <DemoBlock
      title="基础"
      desc="选项少时铺开排列，选中项由一块底板平移过去 —— 切换时眼睛能跟上「从哪到哪」，不是硬切换"
    >
      <WdSegmented v-model="period" :options="['日', '周', '月', '年']" />
      <p class="cap">当前周期：{{ period }}</p>
    </DemoBlock>

    <DemoBlock
      title="等宽与深色"
      desc="block 让每项等分整行宽度，放在卡片里对齐更稳；tone=dark 用于深色底或需要压重心的工具栏"
    >
      <WdSegmented v-model="period" :options="['日', '周', '月', '年']" block />
      <DemoRow>
        <WdSegmented v-model="view" :options="['列表', '卡片', '看板']" tone="dark" />
      </DemoRow>
      <p class="cap">当前视图：{{ view }}</p>
    </DemoBlock>

    <DemoBlock
      title="条目多：单行横向滚动"
      desc="overflow=scroll 永远单行，两端渐隐提示还有内容，选中项会自动滚进视野 —— 比换行更省高度"
    >
      <WdSegmented v-model="stageScroll" :options="stages" overflow="scroll" />
      <p class="cap">当前阶段：{{ stageScroll }}</p>
    </DemoBlock>

    <DemoBlock
      title="自动降级：放得下就铺开，放不下就滚动或下拉"
      desc="overflow=auto 按实测宽度判断而非选项个数（长标签不会误判）；放不下且项数超过 overflowMax 才降级为下拉，避免一条挤满的长条"
    >
      <WdSegmented v-model="stageFlat" :options="['列表', '卡片', '看板']" overflow="auto" />
      <WdSegmented
        v-model="stageAuto"
        :options="stages"
        overflow="auto"
        :overflow-max="6"
      />
      <p class="cap">当前阶段：{{ stageAuto }}</p>
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
