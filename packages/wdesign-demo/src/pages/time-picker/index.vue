<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdTimePicker } from "@wdesign";

const basic = ref("");
const withSecond = ref("08:30:15");
const stepByFive = ref("");
const smallSize = ref("");
const mediumSize = ref("");
const night = ref("");
const workHours = ref("");
const locked = ref("09:00");
</script>

<template>
  <DemoPage
    name="TimePicker"
    desc="时间选择：滚动吸附 · 时分秒 · 步进与范围限制 · 两档尺寸"
  >
    <DemoBlock
      title="基础"
      desc="时分两列滚动，松手自动吸附到最近一格并直接选中，没有「确认」按钮要再点一次"
    >
      <WdTimePicker v-model="basic" />
      <p class="demo-val">已选：{{ basic || "（未选）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="含秒"
      desc="second 打开第三列，值的格式随之变成 HH:mm:ss，适合日志、监控这类需要秒的场景"
    >
      <WdTimePicker v-model="withSecond" second />
      <p class="demo-val">已选：{{ withSecond || "（未选）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="分钟步进与尺寸"
      desc="minuteStep 只列出关键分钟，滚动距离更短；size 只有 sm 与 md，sm 用于紧凑工具栏"
    >
      <DemoRow :gap="14">
        <WdTimePicker v-model="stepByFive" :minute-step="5" />
        <WdTimePicker v-model="smallSize" size="sm" />
        <WdTimePicker v-model="mediumSize" size="md" />
      </DemoRow>
      <p class="demo-val">
        步进 5 分钟：{{ stepByFive || "（未选）" }} ｜ sm：{{ smallSize || "（未选）" }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="可选范围"
      desc="hourRange 支持跨零点，写 [22, 6] 就是夜里十点到次日六点；min/max 用 HH:mm 卡住边界"
    >
      <DemoRow :gap="14">
        <WdTimePicker v-model="night" :hour-range="[22, 6]" :minute-step="30" />
        <WdTimePicker v-model="workHours" min="09:00" max="18:00" :minute-step="15" />
      </DemoRow>
      <p class="demo-val">
        夜间时段：{{ night || "（未选）" }} ｜ 工作时段：{{ workHours || "（未选）" }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="禁用"
      desc="禁用后触发器不可展开，已取值仍正常显示，用于「时间由排班系统写死」"
    >
      <WdTimePicker v-model="locked" size="sm" disabled />
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
