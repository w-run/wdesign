<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdNav, WdIcon, WdButton } from "@wdesign";

const topActive = ref("overview");
const topItems: { key: string; label: string; dot?: boolean; disabled?: boolean }[] = [
  { key: "overview", label: "概览" },
  { key: "orders", label: "订单", dot: true },
  { key: "finance", label: "财务" },
  { key: "report", label: "报表" },
  { key: "archive", label: "归档", disabled: true },
];

const sideActive = ref("dashboard");
const collapsed = ref(false);
const sideItems: {
  key: string;
  label: string;
  icon: string;
  group: string;
  dot?: boolean;
}[] = [
  { key: "dashboard", label: "工作台", icon: "layout-dashboard", group: "核心" },
  { key: "orders", label: "订单管理", icon: "shopping-bag", group: "核心", dot: true },
  { key: "customers", label: "客户档案", icon: "user-group", group: "核心" },
  { key: "billing", label: "账单与发票", icon: "card", group: "财务" },
  { key: "reports", label: "经营报表", icon: "bar-chart", group: "财务" },
  { key: "members", label: "成员与权限", icon: "user-settings", group: "设置" },
];

const iconActive = ref("inbox");
const iconItems: { key: string; label: string; icon: string; dot?: boolean }[] = [
  { key: "inbox", label: "收件箱", icon: "message-square", dot: true },
  { key: "docs", label: "文档", icon: "file" },
  { key: "schedule", label: "日程", icon: "calendar" },
  { key: "settings", label: "设置", icon: "settings" },
];

const smActive = ref("week");
const smItems: { key: string; label: string }[] = [
  { key: "day", label: "日报" },
  { key: "week", label: "周报" },
  { key: "month", label: "月报" },
];

const mdActive = ref("all");
const mdItems: { key: string; label: string; dot?: boolean; disabled?: boolean }[] = [
  { key: "all", label: "全部任务" },
  { key: "mine", label: "我负责的", dot: true },
  { key: "review", label: "待我审批" },
  { key: "closed", label: "已归档", disabled: true },
];
</script>

<template>
  <DemoPage name="Nav" desc="导航：横栏 / 竖栏 · 分组 · 折叠与纯图标 · 状态与尺寸">
    <DemoBlock
      title="横向导航"
      desc="横栏默认 sticky，滚动时吸在内容区顶部；品牌区用 brand，右侧操作放 #footer 插槽"
    >
      <WdNav v-model:active="topActive" :items="topItems" brand="WDesign 控制台" size="sm">
        <template #footer>
          <WdButton variant="ghost" size="sm" icon-only aria-label="搜索">
            <WdIcon name="search" :size="15" />
          </WdButton>
          <WdButton variant="ghost" size="sm" icon-only aria-label="通知">
            <WdIcon name="bell" :size="15" />
          </WdButton>
        </template>
      </WdNav>
    </DemoBlock>

    <DemoBlock
      title="竖向导航与折叠"
      desc="group 生成分组标题；点品牌区箭头或外部按钮都能收起成 60px 纯图标，v-model:collapsed 双向同步"
    >
      <DemoRow :gap="12">
        <WdButton variant="tint" size="sm" @click="collapsed = !collapsed">
          {{ collapsed ? "展开侧栏" : "收起侧栏" }}
        </WdButton>
      </DemoRow>
      <div class="nav-stage">
        <WdNav
          v-model:active="sideActive"
          v-model:collapsed="collapsed"
          direction="vertical"
          :items="sideItems"
          brand="有赞中台"
        >
          <template #footer>
            <WdButton variant="ghost" size="sm" icon-only aria-label="退出登录">
              <WdIcon name="log-out" :size="16" />
            </WdButton>
          </template>
        </WdNav>
      </div>
    </DemoBlock>

    <DemoBlock
      title="纯图标竖栏"
      desc="iconOnly 与 collapsed 不同：前者永远只有图标（保留 title 提示），后者只是可展开的收起状态"
    >
      <div class="nav-stage nav-stage--short">
        <WdNav
          v-model:active="iconActive"
          direction="vertical"
          icon-only
          size="sm"
          :items="iconItems"
        />
      </div>
    </DemoBlock>

    <DemoBlock
      title="尺寸与状态"
      desc="size 只有 sm / md 两档；dot 是新内容提示点，disabled 项保留位置但不响应点击。这两条关掉了 sticky 避免叠在页面顶部"
    >
      <WdNav v-model:active="smActive" :items="smItems" size="sm" :sticky="false" />
      <WdNav v-model:active="mdActive" :items="mdItems" :sticky="false" />
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.nav-stage {
  display: flex;
  gap: 20px;
  height: 420px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: var(--wd-radius-lg);
  /* 竖栏自身是卡片白，垫一层控件灰才看得出面板边界 */
  background: var(--wd-field);
}

.nav-stage--short {
  height: 300px;
}
</style>
