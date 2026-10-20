<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdTabs } from "@wdesign";

const tab = ref("overview");
const blockTab = ref("all");

/** 文档页签：中间两个可关，说明页钉住，归档只读 */
const docTabs = ref([
  { label: "订单-2024Q3.xlsx", value: "order-q3", closable: true },
  { label: "退款流水.csv", value: "refund", closable: true },
  { label: "对账口径说明", value: "readme", closable: false },
  { label: "归档（只读）", value: "archived", closable: false, disabled: true },
]);
const doc = ref("order-q3");
let seq = 0;

function onClose(value: string | number) {
  const i = docTabs.value.findIndex((t) => t.value === value);
  if (i < 0) return;
  docTabs.value.splice(i, 1);
  if (doc.value === value) doc.value = docTabs.value[0]?.value ?? "";
}

function onAdd() {
  seq += 1;
  const value = `untitled-${seq}`;
  docTabs.value.push({ label: `未命名 ${seq}`, value, closable: true });
  doc.value = value;
}
</script>

<template>
  <DemoPage name="Tabs" desc="页签：基础 · 等宽 · 可关闭可新建 · 内容切换">
    <DemoBlock
      title="基础"
      desc="tabs 传字符串数组时 label 与 value 相同，适合枚举固定的少量分组"
    >
      <WdTabs v-model="tab" :tabs="['概览', '变更记录', '附件']" />
      <p class="hint">当前页签：{{ tab }}</p>
    </DemoBlock>

    <DemoBlock
      title="等宽铺满"
      desc="block 让每个页签等分容器宽度，用在详情页顶部做主导航；行内模式则按文字宽度收拢"
    >
      <WdTabs
        v-model="blockTab"
        block
        :tabs="['全部订单', '待付款', '待发货', '已完成']"
      />
    </DemoBlock>

    <DemoBlock
      title="可关闭与可新建"
      desc="组件级 closable 打开 × 后，条目写 closable: false 能钉住常驻页签；disabled 的条目既不可点也不显示 ×"
    >
      <WdTabs
        v-model="doc"
        :tabs="docTabs"
        closable
        addable
        @close="onClose"
        @add="onAdd"
      />
      <p class="hint">当前文档：{{ doc }}（共 {{ docTabs.length }} 个页签）</p>
    </DemoBlock>

    <DemoBlock
      title="驱动内容切换"
      desc="v-model 只负责选中值，内容由业务自己渲染 —— 数据量大的页签建议按需渲染而非全部挂载"
    >
      <WdTabs v-model="tab" :tabs="['概览', '变更记录', '附件']" />
      <div class="panel">
        <p v-if="tab === '概览'" class="panel__text">
          订单 W-20240921-0417 · 客户：杭州云栖智能 · 金额 ¥248,600 · 状态：待发货
        </p>
        <p v-else-if="tab === '变更记录'" class="panel__text">
          2024-09-23 14:02 王一舟 调整收货地址；2024-09-22 09:15 系统 生成发货单
        </p>
        <p v-else class="panel__text">共 3 个附件：报价单.pdf · 验收单.pdf · 物流面单.png</p>
      </div>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.hint {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.panel {
  padding: 14px 16px;
  border-radius: var(--wd-radius-md);
  background: var(--wd-field);
}

.panel__text {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--wd-ink-2);
}
</style>
