<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdTooltip, WdButton, WdIcon } from "@wdesign";
</script>

<template>
  <DemoPage name="Tooltip" desc="文字提示：悬停即现 · 上下两个方向 · 纯文本内容">
    <DemoBlock title="方向" desc="默认 top；元素上方贴着视口边缘时改用 bottom，别让气泡自己翻转">
      <DemoRow>
        <WdTooltip content="保存并关闭" placement="top">
          <WdButton variant="primary" size="sm">上方提示</WdButton>
        </WdTooltip>
        <WdTooltip content="导出为 CSV" placement="bottom">
          <WdButton variant="tint" size="sm">下方提示</WdButton>
        </WdTooltip>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="任意触发器" desc="默认插槽就是要挂提示的元素，按钮、图标按钮、纯文字都行">
      <DemoRow>
        <WdTooltip content="仅自己可见">
          <WdButton variant="ghost" icon-only aria-label="可见范围">
            <WdIcon name="info-circle" :size="16" />
          </WdButton>
        </WdTooltip>
        <WdTooltip content="更多操作">
          <WdButton variant="ghost" icon-only aria-label="更多">
            <WdIcon name="dots-horizontal" :size="16" />
          </WdButton>
        </WdTooltip>
        <WdTooltip content="表格里的指标口径见文档">
          <span>悬停这段文字</span>
        </WdTooltip>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="键盘可达" desc="触发器获得焦点时也会显示，所以别把提示内容写成操作说明，它读屏也会念">
      <DemoRow>
        <WdTooltip content="Tab 到我这里也会出现">
          <WdButton variant="tint" size="sm">用 Tab 键试试</WdButton>
        </WdTooltip>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="内容长度" desc="气泡是单行不换行的，超过二十来个字就该换 Popover 承载">
      <DemoRow>
        <WdTooltip content="单行短句最合适">
          <WdButton variant="ghost" size="sm">短文案</WdButton>
        </WdTooltip>
        <WdTooltip content="这段已经偏长，气泡会横向拉得很宽，影响阅读">
          <WdButton variant="ghost" size="sm">偏长文案</WdButton>
        </WdTooltip>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
