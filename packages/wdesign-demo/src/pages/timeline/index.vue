<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdTimeline } from "@wdesign";

/* 版本里程碑：active 强调当前版本，其余按时间倒序 */
const releaseItems = [
  { period: "2026 Q4", title: "设计系统 v2.4", desc: "令牌层重构，深色主题对比度修正", active: true },
  { period: "2026 Q3", title: "组件扩充到 76 个", desc: "补齐数据展示与反馈类组件" },
  { period: "2026 Q2", title: "构建体系升级", desc: "常驻构建服务 + 内容指纹 + 冒烟测试" },
  { period: "2026 Q1", title: "首个公开版本", desc: "20 个基础组件，确立无边框设计语言" },
];

/* 流水线：颜色 + 图标区分结果，disabled 表示还没走到 */
const pipelineItems = [
  { period: "10:02", title: "开始构建", desc: "拉取源码并校验依赖锁文件", color: "var(--wd-rainbow-blue)", icon: "package" },
  { period: "10:14", title: "单测通过", desc: "381 项断言全部通过", color: "var(--wd-success)", icon: "check" },
  { period: "10:20", title: "灰度发布中", desc: "5% 流量已切到新版本", color: "var(--wd-warning)", active: true },
  { period: "—", title: "等待人工审批", desc: "全量发布需要负责人确认", color: "var(--wd-ink-3)", disabled: true },
];

/* 可折叠：点击节点展开 detail */
const auditItems = [
  {
    period: "2026-10-17",
    title: "权限变更",
    desc: "3 个账号被加入「订单管理」角色",
    detail: "操作人：陈一鸣；来源 IP：10.12.4.31；变更后生效时间 09:32，影响 12 个门店的订单编辑权限。",
  },
  {
    period: "2026-10-15",
    title: "价格批量调整",
    desc: "华东区 28 个 SKU 上调 3%",
    detail: "通过批量导入执行，失败 0 条；新价格自次日 00:00 起生效，已同步到收银端。",
  },
  {
    period: "2026-10-11",
    title: "数据导出",
    desc: "导出 9 月全量订单明细",
    detail: "导出人：林小满；文件 128 MB，包含 12.6 万条订单，保留 7 天后自动清理。",
  },
];

const tip = ref("点开任意一条查看详情");

function onItemClick(item: { title: string }) {
  tip.value = `正在查看：${item.title}`;
}

/* 周会节奏：横向一排看流程 */
const weekItems = [
  { period: "周一", title: "需求评审" },
  { period: "周二", title: "技术方案" },
  { period: "周三", title: "开发" },
  { period: "周四", title: "联调" },
  { period: "周五", title: "上线" },
];
</script>

<template>
  <DemoPage name="Timeline" desc="时间轴：纵向 · 节点着色 · 可折叠详情 · 交替与横向">
    <DemoBlock title="基础纵向" desc="纵向单列按时间倒序，line 画出贯穿轴线，active 高亮当前所处阶段">
      <WdTimeline :items="releaseItems" line />
    </DemoBlock>

    <DemoBlock title="节点着色与图标" desc="line-style=dashed 换成虚线；color 改节点颜色，icon 用 WdIcon 替代圆点，disabled 置灰">
      <WdTimeline :items="pipelineItems" line-style="dashed" />
    </DemoBlock>

    <DemoBlock title="可折叠详情" desc="collapsible 让带 detail 的节点可点开，点击会回传 item-click，适合审计日志">
      <WdTimeline :items="auditItems" collapsible line @item-click="onItemClick" />
      <span class="hint">{{ tip }}</span>
    </DemoBlock>

    <DemoBlock title="交替与横向" desc="alternate 左右交替节省纵向空间，horizontal 适合流程阶段这类线性推进">
      <WdTimeline :items="releaseItems" mode="alternate" line />
      <WdTimeline :items="weekItems" mode="horizontal" line size="sm" />
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.hint {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
