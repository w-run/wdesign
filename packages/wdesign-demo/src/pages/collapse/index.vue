<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdCollapse, WdTag } from "@wdesign";

/* 基础多开：modelValue 是展开项的索引数组，可以同时展开多项 */
const basicOpen = ref<number[]>([0]);
const settingItems = [
  { title: "外观设置", content: "主题色、字体与圆角都通过 CSS 变量统一控制，切换主题时无需刷新页面。" },
  { title: "通知设置", content: "可以选择接收哪些提醒，以及 22:00–08:00 的静默时段。" },
  { title: "数据与缓存", content: "本地缓存在网络恢复后自动续传，单次上限 200 MB。" },
  { title: "危险操作", content: "包含清空数据、删除项目等不可逆操作，需要二次确认。" },
];

/* 手风琴：同一时刻只留一项展开 */
const accordionOpen = ref<number[]>([0]);
const faqItems = [
  { title: "为什么表格数据不刷新？", content: "先确认 rows 是新数组；同引用修改内部字段时表格不会重算，需整体替换。" },
  { title: "分页切换后当前页越界怎么办？", content: "改变每页条数时组件会自己把当前页夹回最后一页，无需手动纠正。" },
  { title: "树形表格能排序吗？", content: "树形模式下排序会被忽略，层级结构一排序就散架了。" },
];

/* 手风琴 + 不允许全收：已展开的那项点不掉，适合必须保留上下文的步骤说明 */
const keptOpen = ref<number[]>([0]);

/* 自定义内容：插槽名是 item-<index> */
const customOpen = ref<number[]>([0, 1]);
const customItems = [
  { title: "订单状态" },
  { title: "发货信息" },
  { title: "退款记录", content: "当前无退款记录。" },
];
</script>

<template>
  <DemoPage name="Collapse" desc="折叠面板：多开 · 手风琴 · 禁止全收 · 自定义面板内容">
    <DemoBlock title="基础多开" desc="v-model 绑的是展开项索引数组，默认允许多项同时展开">
      <WdCollapse v-model="basicOpen" :items="settingItems" />
      <span class="hint">当前展开 {{ basicOpen.length }} 项</span>
    </DemoBlock>

    <DemoBlock title="手风琴" desc="accordion 打开新项会自动收起上一项，再点已展开项则全部收起">
      <WdCollapse v-model="accordionOpen" :items="faqItems" accordion />
    </DemoBlock>

    <DemoBlock title="手风琴且不可全收" desc="collapsible=false 时当前项点不掉，保证至少有一项始终可见">
      <WdCollapse v-model="keptOpen" :items="faqItems" accordion :collapsible="false" />
      <span class="hint">点击已展开项不会有变化，展开索引恒为 [{{ keptOpen.join(",") }}]</span>
    </DemoBlock>

    <DemoBlock title="自定义面板内容" desc="用 #item-索引 插槽替换默认文本，可以塞表格、标签、按钮等任意内容">
      <WdCollapse v-model="customOpen" :items="customItems">
        <template #item-0>
          <span class="row">
            <WdTag variant="tint" size="sm">已发货</WdTag>
            <span class="row__text">WD-20261017-0042 · 顺丰 SF7712004388</span>
          </span>
          <span class="row">
            <WdTag variant="gray" size="sm">预计送达</WdTag>
            <span class="row__text">2026-10-19 18:00 前</span>
          </span>
        </template>
        <template #item-1="{ item }">
          <span class="row__text">{{ item.title }}：仓库已出库，等待快递揽收。</span>
        </template>
      </WdCollapse>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.hint {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.row + .row {
  margin-top: 8px;
}

.row__text {
  font-size: 13px;
  color: var(--wd-ink-2);
}
</style>
