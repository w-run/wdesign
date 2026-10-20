<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdDropdown, WdButton, WdIcon } from "@wdesign";

const picked = ref("尚未选择");

function onSelect(value: string | number) {
  picked.value = `已选择：${value}`;
}

/** 普通菜单 */
const menu = [
  { label: "编辑", value: "编辑" },
  { label: "复制链接", value: "复制链接" },
  { label: "移动到…", value: "移动到" },
];

/** 含危险项：danger 只改视觉，不拦点击，二次确认要自己加 */
const dangerMenu = [
  { label: "归档", value: "归档" },
  { label: "删除", value: "删除", danger: true },
];

/** 含禁用项：disabled 的项点了不会触发 select */
const mixedMenu = [
  { label: "查看详情", value: "查看详情" },
  { label: "转让所有权", value: "转让所有权", disabled: true },
  { label: "退出工作区", value: "退出工作区" },
];
</script>

<template>
  <DemoPage name="Dropdown" desc="下拉菜单：items 驱动 · 危险项 · 禁用项 · 自定义触发器">
    <DemoBlock title="基础菜单" desc="items 里每项需要 label 与 value；选中后抛 select，菜单自动收起">
      <DemoRow>
        <WdDropdown :items="menu" @select="onSelect">
          <WdButton variant="tint" size="sm">
            更多操作
            <WdIcon name="arrow-down" :size="12" />
          </WdButton>
        </WdDropdown>
        <span>{{ picked }}</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="危险项" desc="danger 只把文案染成警告色，真正的二次确认请让 WdPopconfirm 承担">
      <DemoRow>
        <WdDropdown :items="dangerMenu" @select="onSelect">
          <WdButton variant="dark" size="sm">记录操作</WdButton>
        </WdDropdown>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="禁用项" desc="disabled 的项保留在列表里但不响应点击，比直接隐藏更能说明「为什么不能做」">
      <DemoRow>
        <WdDropdown :items="mixedMenu" @select="onSelect">
          <WdButton variant="tint" size="sm">工作区</WdButton>
        </WdDropdown>
        <span>转让所有权需要管理员权限，所以置灰而不是隐藏</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="图标触发器" desc="触发器可以是任意内容，做成 icon-only 的「⋯」按钮能省一行宽度">
      <DemoRow>
        <WdDropdown :items="menu" @select="onSelect">
          <WdButton variant="ghost" icon-only aria-label="更多">
            <WdIcon name="dots-horizontal" :size="16" />
          </WdButton>
        </WdDropdown>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
