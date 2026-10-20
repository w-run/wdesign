<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdDateTimePicker } from "@wdesign";

const basic = ref("");
const precise = ref("2026-10-21 09:30:00");
const quarter = ref("");
const sunday = ref("");
const monday = ref("");
const smallSize = ref("");
</script>

<template>
  <DemoPage
    name="DateTimePicker"
    desc="日期时间选择：日历加三列时间 · 秒与步进 · 每周起始可切换"
  >
    <DemoBlock
      title="基础"
      desc="左边日历选日期、右边三列选时间，拼成 YYYY-MM-DD HH:mm；先选时间会补今天，先选日期则时间留空提醒补填"
    >
      <WdDateTimePicker v-model="basic" />
      <p class="demo-val">已选：{{ basic || "（未选）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="秒与分钟步进"
      desc="second 追加秒列，minuteStep=15 让分钟只落在刻钟上，减少误选"
    >
      <WdDateTimePicker v-model="precise" second />
      <DemoRow :gap="14">
        <WdDateTimePicker v-model="quarter" :minute-step="15" />
      </DemoRow>
      <p class="demo-val">
        含秒：{{ precise || "（未选）" }} ｜ 刻钟：{{ quarter || "（未选）" }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="每周起始"
      desc="weekStart=1 周一打头（默认，符合国内习惯），0 则周日打头，日历列顺序随之调整"
    >
      <DemoRow :gap="14" align="flex-start">
        <WdDateTimePicker v-model="monday" :week-start="1" size="sm" />
        <WdDateTimePicker v-model="sunday" :week-start="0" size="sm" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="尺寸与禁用"
      desc="sm 收窄整块宽度便于并排摆放；禁用后日历与时间列一起失去交互，值仍可读"
    >
      <DemoRow :gap="14" align="flex-start">
        <WdDateTimePicker v-model="smallSize" size="sm" />
        <WdDateTimePicker model-value="2026-10-21 09:30" disabled size="sm" />
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.demo-val {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
