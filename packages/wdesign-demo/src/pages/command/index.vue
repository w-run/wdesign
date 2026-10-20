<script setup lang="ts">
import { computed, ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdCommand, WdButton, WdIcon } from "@wdesign";

interface CmdItem {
  key: string;
  label: string;
  hint?: string;
  group?: string;
  icon?: string;
  shortcut?: string;
  keywords?: string[];
  disabled?: boolean;
}

const appItems: CmdItem[] = [
  { key: "contract-new", label: "新建合同", hint: "从模板发起一份销售合同", group: "常用操作", icon: "file-plus", shortcut: "⌘N" },
  { key: "customer-new", label: "新建客户", hint: "录入企业客户与联系人", group: "常用操作", icon: "user-plus" },
  { key: "invoice", label: "开发票", hint: "为已成交订单开票", group: "常用操作", icon: "card", shortcut: "⌘I" },
  { key: "orders", label: "订单管理", hint: "查看全部订单", group: "跳转", icon: "shopping-bag" },
  { key: "reports", label: "经营报表", hint: "上月营收与回款", group: "跳转", icon: "bar-chart" },
  { key: "purge", label: "清空回收站", hint: "不可撤销，仅管理员可用", group: "危险操作", icon: "trash", disabled: true },
];

const docItems: CmdItem[] = [
  { key: "shortcut", label: "键盘快捷键", hint: "常用组合键一览", group: "帮助文档", icon: "keyboard", keywords: ["ctrl", "hotkey", "组合键"] },
  { key: "api", label: "开放接口说明", hint: "对接 ERP 的鉴权与限流", group: "帮助文档", icon: "terminal", keywords: ["api", "token", "erp"] },
  { key: "reimburse", label: "报销流程", hint: "差旅与招待费的审批链路", group: "制度", icon: "note", keywords: ["expense", "差旅"] },
];

const adminItems: CmdItem[] = [
  { key: "purge", label: "清空回收站", hint: "不可撤销，仅管理员可用", group: "危险操作", icon: "trash", disabled: true },
  { key: "rotate", label: "轮换 API 密钥", hint: "旧密钥立即失效", group: "危险操作", icon: "key" },
];

const open = ref(false);
const scenario = ref<"app" | "doc" | "admin">("app");
const emptyText = ref("没有匹配的命令");
const lastPick = ref("尚未选择");
const lastQuery = ref("");

const items = computed(() => {
  if (scenario.value === "doc") return docItems;
  if (scenario.value === "admin") return adminItems;
  return appItems;
});

function openWith(which: "app" | "doc" | "admin") {
  scenario.value = which;
  emptyText.value =
    which === "admin" ? "没有这条管理命令，换个关键词试试" : "没有匹配的命令";
  open.value = true;
}

function onPick(item: CmdItem) {
  lastPick.value = `${item.label} · ${item.key}`;
}

function onSearch(q: string) {
  lastQuery.value = q;
}
</script>

<template>
  <DemoPage name="Command" desc="命令面板：⌘K 唤起 · 分组与快捷键 · 模糊匹配 · 键盘选择">
    <DemoBlock
      title="命令面板"
      desc="全局 ⌘K / Ctrl+K 都能唤起，Esc 关闭；↑↓ 选择、回车确认。maxHeight 限制列表高度，超出后列表内部滚动"
    >
      <DemoRow :gap="12">
        <WdButton variant="dark" size="sm" @click="openWith('app')">
          <WdIcon name="command" :size="15" />
          打开命令面板
        </WdButton>
        <span class="cmd-hint">当前选中：{{ lastPick }}</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="搜索与关键词"
      desc="label 前缀命中排在包含命中之前；keywords 让别名也能搜到 —— 例如输入 ctrl 能命中「键盘快捷键」"
    >
      <DemoRow :gap="12">
        <WdButton variant="tint" size="sm" @click="openWith('doc')">
          <WdIcon name="search" :size="15" />
          搜索帮助文档
        </WdButton>
        <span class="cmd-hint">最近输入：{{ lastQuery || "（未输入）" }}</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="禁用项与空结果"
      desc="disabled 项灰显并跳过键盘选择（回车不会误触危险操作）；无匹配时显示 emptyText，按场景换文案"
    >
      <DemoRow :gap="12">
        <WdButton variant="ghost" size="sm" @click="openWith('admin')">
          <WdIcon name="shield-lock" :size="15" />
          打开管理命令
        </WdButton>
        <span class="cmd-hint">试试输入「备份」，会走到空结果态</span>
      </DemoRow>
    </DemoBlock>

    <WdCommand
      v-model="open"
      :items="items"
      :empty-text="emptyText"
      :max-height="340"
      placeholder="输入命令或搜索…"
      @select="onPick"
      @search="onSearch"
    />
  </DemoPage>
</template>

<style scoped>
.cmd-hint {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
