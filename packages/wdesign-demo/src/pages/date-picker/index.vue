<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdDatePicker } from "@wdesign";

const date = ref("");
const small = ref("");
const medium = ref("");
const large = ref("");
const custom = ref("");
const ranged = ref("");
</script>

<template>
  <DemoPage
    name="DatePicker"
    desc="日期选择：月历面板 · 三档尺寸 · 占位与禁用"
  >
    <DemoBlock
      title="基础"
      desc="点触发器弹出月历，选完立即回填并收起；翻月靠标题右侧的箭头，底部可一键回到今天"
    >
      <WdDatePicker v-model="date" />
      <p class="demo-val">已选：{{ date || "（未选）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="三档尺寸"
      desc="size 与 Input 对齐：sm 用于表格上方的筛选条，md 是默认，lg 用于表单首项"
    >
      <DemoRow :gap="14">
        <WdDatePicker v-model="small" size="sm" />
        <WdDatePicker v-model="medium" size="md" />
        <WdDatePicker v-model="large" size="lg" />
      </DemoRow>
      <p class="demo-val">
        sm：{{ small || "（未选）" }} ｜ md：{{ medium || "（未选）" }} ｜ lg：{{ large || "（未选）" }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="可选范围 · 年月快跳"
      desc="min / max 限制可选取值（超出范围的日子划掉且点不动）；点标题可以展开 12 个月网格，两侧箭头按年翻 —— 回看两年前不用点 24 次"
    >
      <DemoRow :gap="14">
        <WdDatePicker v-model="ranged" min="2026-10-01" max="2026-12-31" placeholder="只能选本季度" />
      </DemoRow>
      <p class="demo-val">季度内日期：{{ ranged || "（未选）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="占位与禁用"
      desc="placeholder 只在没选值时出现；禁用后触发器点不动，适合「日期由流程决定」的场景"
    >
      <DemoRow :gap="14">
        <WdDatePicker v-model="custom" placeholder="请选择归档日期" />
        <WdDatePicker model-value="2026-10-21" disabled />
      </DemoRow>
      <p class="demo-val">归档日期：{{ custom || "（未选）" }}</p>
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
