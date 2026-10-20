<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdDescriptions, WdTag } from "@wdesign";

/* 订单详情：span 会把一项撑到多列，不够放时自动换行 */
const orderItems = [
  { label: "订单号", value: "WD-20261017-0042" },
  { label: "状态", value: "已发货" },
  { label: "下单时间", value: "2026-10-17 09:32" },
  { label: "客户", value: "林小满" },
  { label: "联系电话", value: "138****6621" },
  { label: "金额", value: "¥ 1,286.00" },
  { label: "收货地址", value: "浙江省杭州市余杭区未来科技城 8 号楼 1204 室", span: 2 },
  { label: "物流单号", value: "SF 7712 0043 8819" },
  { label: "备注", value: "工作日送达，请提前电话联系", hint: "客户自填" },
];

/* 竖排只取前四项，避免信息量把对比示例撑太长 */
const briefItems = orderItems.slice(0, 4);

/* 项目信息：技术栈用插槽渲染成标签，值区留空即可 */
const projectItems = [
  { label: "项目名", value: "WDesign" },
  { label: "版本", value: "v2.4.0" },
  { label: "许可证", value: "MIT" },
  { label: "技术栈", value: "", key: "stack", span: 3 },
  { label: "仓库地址", value: "github.com/w-run/wdesign", span: 2 },
  { label: "维护人", value: "林小满" },
];
</script>

<template>
  <DemoPage name="Descriptions" desc="描述列表：多列排布 · 竖排斑马纹 · 跨列 · 字段自定义渲染">
    <DemoBlock title="基础多列" desc="默认三列，colon 在标签后补冒号；hint 会在值下方补一行灰字说明">
      <WdDescriptions :items="orderItems" :columns="3" colon />
    </DemoBlock>

    <DemoBlock title="竖排与斑马纹" desc="vertical 把标签移到值上方，适合窄容器；striped 隔行铺底色便于横向读数">
      <WdDescriptions :items="briefItems" :columns="2" vertical striped />
    </DemoBlock>

    <DemoBlock title="跨列" desc="span 让一项占满多个列位，地址这类长文本不必挤在一格里换行">
      <WdDescriptions :items="orderItems" :columns="3" />
    </DemoBlock>

    <DemoBlock title="字段自定义渲染" desc="给条目指定 key，就能用同名插槽接管值区；尺寸档位 sm / md / lg 只影响单元格内边距">
      <WdDescriptions :items="projectItems" :columns="3" size="lg">
        <template #stack="{ item }">
          <DemoRow :gap="8">
            <WdTag variant="tint" size="sm">Vue 3</WdTag>
            <WdTag variant="tint" size="sm">TypeScript</WdTag>
            <WdTag variant="gray" size="sm">SCSS</WdTag>
            <span class="hint">{{ item.label }} 共 3 项</span>
          </DemoRow>
        </template>
      </WdDescriptions>
      <WdDescriptions :items="[]" :columns="3">
        <template #empty>该订单已归档，暂无详情</template>
      </WdDescriptions>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.hint {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
