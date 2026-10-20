<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdSteps } from "@wdesign";

/** 字符串简写：只有标题 */
const deploySteps = ["提交变更", "构建镜像", "灰度发布", "全量上线", "回归验证"];

/** 对象写法：带一行说明，用来放时间 / 负责人 / 当前动作 */
const orderSteps = [
  { title: "提交申请", desc: "09-23 10:24 · 李默" },
  { title: "主管审批", desc: "09-23 10:41 · 王一舟" },
  { title: "财务复核", desc: "进行中 · 待张倩处理" },
  { title: "打款完成", desc: "预计 1 个工作日" },
];
</script>

<template>
  <DemoPage name="Steps" desc="步骤条：基础 · 带说明 · 进度对比 · 完成态">
    <DemoBlock
      title="基础"
      desc="current 从 0 开始，0 表示第一步正在进行；前面的步骤显示对勾，后面的置灰"
    >
      <WdSteps :steps="deploySteps" :current="1" />
    </DemoBlock>

    <DemoBlock
      title="带说明的分步"
      desc="desc 用来承载时间、责任人或当前动作，比把状态塞进标题更好扫读"
    >
      <WdSteps :steps="orderSteps" :current="2" />
    </DemoBlock>

    <DemoBlock
      title="三种进度对照"
      desc="同一组步骤换 current 就能表达未开始、进行中、已完成；进度感靠连线而非颜色堆叠"
    >
      <WdSteps :steps="deploySteps" :current="0" />
      <WdSteps :steps="deploySteps" :current="2" />
      <WdSteps :steps="deploySteps" :current="5" />
    </DemoBlock>

    <DemoBlock
      title="越界不报错"
      desc="current 超过步数时全部按已完成渲染，异步流程里不必手动夹取上限"
    >
      <WdSteps :steps="orderSteps" :current="9" />
    </DemoBlock>
  </DemoPage>
</template>
