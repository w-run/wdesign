<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdPopover, WdButton } from "@wdesign";
</script>

<template>
  <DemoPage name="Popover" desc="气泡卡片：点击或悬停触发 · 六种方位 · 宽度与关闭行为">
    <DemoBlock
      title="点击触发（默认）"
      desc="默认插槽是面板内容、#trigger 是触发器；trigger 还支持 manual，但它需要父级受控 open，组件未暴露该 prop，这里只演示 click 与 hover"
    >
      <DemoRow>
        <WdPopover title="筛选条件" closable placement="bottom-start">
          <template #trigger>
            <WdButton variant="tint" size="sm">筛选</WdButton>
          </template>
          <span>先选维度再看结果：状态、负责人、更新时间三者可叠加。</span>
          <span>点右上角的关闭按钮或再点一次触发器收起。</span>
        </WdPopover>
        <WdPopover title="导出格式" placement="bottom-start">
          <template #trigger>
            <WdButton variant="primary" size="sm">导出</WdButton>
          </template>
          <span>CSV 适合再加工，XLSX 保留单元格样式。</span>
        </WdPopover>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="悬停触发" desc="hover 适合纯展示说明；指针离开会延迟 120ms 关闭，方便移到面板里继续看">
      <DemoRow>
        <WdPopover trigger="hover" placement="bottom-start" :gap="10">
          <template #trigger>
            <WdButton variant="ghost" size="sm">悬停看说明</WdButton>
          </template>
          <span>悬停触发不带交互，别在里面放按钮或表单 —— 那属于点击触发的用法。</span>
        </WdPopover>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="方位" desc="默认 bottom-start；右边缘的触发器用 bottom-end，否则气泡会溢出视口被夹回来错位">
      <DemoRow>
        <WdPopover placement="bottom-start" title="bottom-start">
          <template #trigger>
            <WdButton variant="tint" size="sm">左下</WdButton>
          </template>
          <span>气泡左边缘和触发器左边缘对齐。</span>
        </WdPopover>
        <WdPopover placement="bottom-end" title="bottom-end">
          <template #trigger>
            <WdButton variant="tint" size="sm">右下</WdButton>
          </template>
          <span>气泡右边缘和触发器右边缘对齐。</span>
        </WdPopover>
        <WdPopover placement="bottom-center" title="bottom-center">
          <template #trigger>
            <WdButton variant="tint" size="sm">居中</WdButton>
          </template>
          <span>居中对齐，适合图标触发器。</span>
        </WdPopover>
        <WdPopover placement="top-start" title="top-start">
          <template #trigger>
            <WdButton variant="tint" size="sm">上方</WdButton>
          </template>
          <span>下方空间不够时可以主动指定上方。</span>
        </WdPopover>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="宽度与点击关闭" desc="width 固定面板宽（不传则自适应）；closeOnContent 让点面板空白处即关闭，点按钮不算">
      <DemoRow>
        <WdPopover :width="280" :close-on-content="true" title="点面板内任意文字关闭" placement="bottom-start">
          <template #trigger>
            <WdButton variant="dark" size="sm">固定宽度 280</WdButton>
          </template>
          <span>面板宽度固定后，多行文案的行长更稳定，也便于放窄表格。</span>
          <span>点这段文字，面板会关闭。</span>
        </WdPopover>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
