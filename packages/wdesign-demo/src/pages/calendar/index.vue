<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdCalendar } from "@wdesign";

const single = ref("");
const range = ref("");
const marked = ref("");

/** 当前月的日期键 */
function keyOf(day: number) {
  const d = new Date();
  const p = (n: number) => (n < 10 ? "0" + n : String(n));
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(day)}`;
}

/** 生理期场景：一段连续日期 + 同日的其他标记 */
const marks = (() => {
  const m: Record<string, Array<{ color: string; label?: string }>> = {};
  for (let d = 8; d <= 12; d++) m[keyOf(d)] = [{ color: "#E05361", label: "经期" }];
  for (let d = 8; d <= 9; d++) m[keyOf(d)].push({ color: "#0DBC79", label: "服药" });
  m[keyOf(15)] = [{ color: "#3B7FD4", label: "体检" }];
  return m;
})();

/** 农历示例：只给 1~20 号，留一半空白便于对比行高 */
const lunar = (() => {
  const names = ["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十",
                 "十一","十二","十三","十四","十五","十六","十七","十八","十九","二十"];
  const t: Record<string, string> = {};
  for (let d = 1; d <= 20; d++) t[keyOf(d)] = names[d - 1];
  t[keyOf(1)] = "国庆";
  return t;
})();
</script>

<template>
  <DemoPage
    name="Calendar"
    desc="日历：单日 / 区间 / 多标记 / 农历 · 点击年月可快速跳转"
  >
    <DemoBlock title="单日选择" desc="点击年月标题弹出年份与月份选择器">
      <WdCalendar v-model="single" />
      <p class="demo-val">已选：{{ single || "（未选）" }}</p>
    </DemoBlock>

    <DemoBlock title="区间选择" desc="点两下选起止；先点晚的再点早的会自动交换">
      <WdCalendar v-model="range" mode="range" :clearable="false" />
      <p class="demo-val">已选：{{ range || "（未选）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="日期标记与农历"
      desc="标记点在右上角，同日可挂多个；底部为农历/节假日。数字始终在格子中心，翻月不跳动"
    >
      <WdCalendar v-model="marked" :marks="marks" :texts="lunar" :clearable="false" />
      <DemoRow :gap="14">
        <span class="demo-legend"><i style="background: #e05361"></i>经期</span>
        <span class="demo-legend"><i style="background: #0dbc79"></i>服药</span>
        <span class="demo-legend"><i style="background: #3b7fd4"></i>体检</span>
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

.demo-legend {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--wd-ink-2);
}

.demo-legend i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}
</style>
