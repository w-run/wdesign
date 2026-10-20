<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdAffix, WdIcon } from "@wdesign";

const footAffixed = ref(false);

const approvals = [
  { id: "HT-20416", title: "上海云仓 · 三方仓储服务合同", owner: "林小满", amount: "¥ 128,400", due: "今天 18:00" },
  { id: "HT-20417", title: "苏州代工厂 · 年度框架协议", owner: "王一舟", amount: "¥ 962,000", due: "明天 12:00" },
  { id: "HT-20418", title: "杭州仓 · 干线运输承运合同", owner: "周可", amount: "¥ 43,800", due: "10-27" },
  { id: "HT-20419", title: "广州分公司 · 办公室租赁", owner: "李默", amount: "¥ 318,000", due: "10-28" },
  { id: "HT-20420", title: "南京仓 · 装卸外包合同", owner: "赵雪", amount: "¥ 57,600", due: "10-29" },
  { id: "HT-20421", title: "年度 IT 运维外包服务", owner: "陈嘉", amount: "¥ 240,000", due: "10-30" },
  { id: "HT-20422", title: "成都仓 · 冷链设备采购", owner: "吴倩", amount: "¥ 175,300", due: "11-02" },
  { id: "HT-20423", title: "客户数据脱敏服务协议", owner: "孙途", amount: "¥ 88,000", due: "11-05" },
  { id: "HT-20424", title: "武汉仓 · 消防维保合同", owner: "郑楠", amount: "¥ 36,500", due: "11-06" },
  { id: "HT-20425", title: "包装耗材年度供货合同", owner: "何霖", amount: "¥ 412,000", due: "11-07" },
  { id: "HT-20426", title: "西安仓 · 库内作业外包", owner: "马骁", amount: "¥ 96,700", due: "11-08" },
  { id: "HT-20427", title: "第三方物流承运框架（华东）", owner: "林小满", amount: "¥ 1,280,000", due: "11-10" },
  { id: "HT-20428", title: "仓库监控系统升级改造", owner: "王一舟", amount: "¥ 154,900", due: "11-11" },
  { id: "HT-20429", title: "客服外包（在线）续约", owner: "周可", amount: "¥ 268,000", due: "11-12" },
  { id: "HT-20430", title: "厦门仓 · 跨境电商清关", owner: "李默", amount: "¥ 73,200", due: "11-13" },
  { id: "HT-20431", title: "办公家具采购（新职场）", owner: "赵雪", amount: "¥ 189,600", due: "11-14" },
  { id: "HT-20432", title: "税务咨询服务年度协议", owner: "陈嘉", amount: "¥ 120,000", due: "11-15" },
  { id: "HT-20433", title: "长沙仓 · 分拣线设备租赁", owner: "吴倩", amount: "¥ 340,000", due: "11-16" },
  { id: "HT-20434", title: "员工补充商业保险", owner: "孙途", amount: "¥ 96,000", due: "11-17" },
  { id: "HT-20435", title: "品牌视觉升级设计服务", owner: "郑楠", amount: "¥ 58,000", due: "11-18" },
  { id: "HT-20436", title: "合肥仓 · 屋面防水维修", owner: "何霖", amount: "¥ 27,800", due: "11-19" },
  { id: "HT-20437", title: "数据中台年度订阅", owner: "马骁", amount: "¥ 520,000", due: "11-20" },
];
</script>

<template>
  <DemoPage name="Affix" desc="固钉：吸顶 / 吸底 · 触发阈值 · 滚动容器（滚动页面查看效果）">
    <DemoBlock
      title="基础吸顶"
      desc="滚动页面查看效果：内容滚过工具栏后吸在 .demo-main 顶部 12px 处，原位置留等尺寸占位，页面不会跳动"
    >
      <WdAffix container=".demo-main" :offset="12">
        <div class="affix-bar">
          <WdIcon name="pin" :size="15" />
          <span>合同审批 · 22 条待处理 · 今日必须处理 3 条</span>
        </div>
      </WdAffix>
    </DemoBlock>

    <DemoBlock
      title="自定义触发阈值"
      desc="target 传数字表示滚过 240px 就吸附，不必等元素自身到顶；多处吸附时用 offset 错开，避免互相遮挡"
    >
      <WdAffix container=".demo-main" :target="240" :offset="68">
        <div class="affix-bar">
          <WdIcon name="flag" :size="15" />
          <span>滚过 240px 才吸附 · offset 68px</span>
        </div>
      </WdAffix>
    </DemoBlock>

    <DemoBlock
      title="吸底"
      desc="position 为 bottom 时贴在视口下沿，适合结算条、批量操作条；此时 target 表示「距离底部还剩多少像素」就提前吸附"
    >
      <WdAffix container=".demo-main" position="bottom" :offset="16" :target="120" @change="footAffixed = $event">
        <div class="affix-bar affix-bar--foot">
          <span>合计 ¥ 5,318,700 · 已选 9 个合同 · 待签</span>
        </div>
      </WdAffix>
      <p class="affix-note">当前状态：{{ footAffixed ? "已吸附在视口底部" : "随内容滚动" }}</p>
    </DemoBlock>

    <DemoBlock
      title="滚动内容"
      desc="吸附只看滚动距离，与内容多高无关；这批待办用来把页面撑到足够滚动的长度"
    >
      <div v-for="row in approvals" :key="row.id" class="approval-row">
        <span class="approval-row__id">{{ row.id }}</span>
        <span class="approval-row__title">{{ row.title }}</span>
        <span class="approval-row__owner">{{ row.owner }}</span>
        <span class="approval-row__amount">{{ row.amount }}</span>
        <span class="approval-row__due">{{ row.due }}</span>
      </div>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.affix-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--wd-radius-md);
  /* 未吸附时在卡片白上、吸附后在页面底色上，都要能看出边界 */
  background: var(--wd-field);
  color: var(--wd-ink);
  font-size: 13px;
}

.affix-bar--foot {
  justify-content: flex-end;
  background: var(--wd-dark);
  color: var(--wd-dark-text);
}

.affix-note {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.approval-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px solid var(--wd-ink-5);
  font-size: 13px;
  color: var(--wd-ink-2);
}

.approval-row__id {
  flex: none;
  width: 72px;
  font-family: var(--wd-font-mono);
  font-size: 12px;
  color: var(--wd-ink-3);
}

.approval-row__title {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--wd-ink);
}

.approval-row__owner {
  flex: none;
  width: 56px;
}

.approval-row__amount {
  flex: none;
  width: 96px;
  text-align: right;
}

.approval-row__due {
  flex: none;
  width: 72px;
  text-align: right;
  color: var(--wd-ink-3);
}
</style>
