<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdStatistic, WdButton, WdIcon } from "@wdesign";

/* 数值变化会重新触发滚动动画，这里用按钮模拟实时成交额上报 */
const gmv = ref(286400);

function addGmv() {
  gmv.value += 12800;
}
</script>

<template>
  <DemoPage name="Statistic" desc="统计数值：入场计数动画 · 前后缀与精度 · 千分位 · 底部说明">
    <DemoBlock title="基础与计数动画" desc="默认从 0 滚到目标值，数值变化时会重新跑一遍，用于实时看板">
      <DemoRow :gap="32" align="flex-end">
        <WdStatistic title="今日成交额（元）" :value="gmv" />
        <WdStatistic title="昨日成交额（元）" :value="241900" />
        <WdButton variant="ghost" size="sm" @click="addGmv">入账 1.28 万</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="前后缀与精度" desc="prefix 放货币符号，suffix 放单位；precision 控制小数位，separator 默认打开千分位">
      <DemoRow :gap="32" align="flex-end">
        <WdStatistic title="订单金额" :value="1286.5" prefix="¥" :precision="2" />
        <WdStatistic title="转化率" :value="32.7" suffix="%" :precision="1" />
        <WdStatistic title="活跃门店" :value="1268" suffix="家" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="关闭动画与自定义时长" desc="已有确定结果（如报表快照）不必滚动，animated=false 直接给值；时长按信息量调，越大越有仪式感">
      <DemoRow :gap="32" align="flex-end">
        <WdStatistic title="累计访问（不滚动）" :value="1284560" :animated="false" />
        <WdStatistic title="延迟发货率" :value="0.42" suffix="%" :precision="2" :animated="false" />
        <WdStatistic title="库存周转（慢速）" :value="18.6" suffix="天" :precision="1" :duration="2200" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="底部说明插槽" desc="环比、口径说明这类附属信息放 #footer，不污染主数值的视觉层级">
      <DemoRow :gap="32" align="flex-start">
        <WdStatistic title="本月 GMV（元）" :value="2418600">
          <template #footer>
            <span class="trend">
              <WdIcon name="trending-up" :size="13" :style="{ color: 'var(--wd-success)' }" />
              环比 +12.4%
            </span>
          </template>
        </WdStatistic>
        <WdStatistic title="退款金额（元）" :value="18420">
          <template #footer>
            <span class="trend">
              <WdIcon name="trending-down" :size="13" :style="{ color: 'var(--wd-red)' }" />
              环比 -3.1%
            </span>
          </template>
        </WdStatistic>
        <WdStatistic title="客单价（元）" :value="86.4" :precision="1">
          <template #footer>
            <span class="trend">统计口径：已支付订单</span>
          </template>
        </WdStatistic>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
