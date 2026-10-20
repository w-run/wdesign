<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdTransfer } from "@wdesign";

const roles = [
  { key: "pm", label: "产品经理" },
  { key: "fe", label: "前端工程师" },
  { key: "be", label: "后端工程师" },
  { key: "de", label: "交互设计" },
  { key: "qa", label: "测试工程师" },
];

const people = [
  { key: "lin", label: "林珊", desc: "产品 · 负责需求评审" },
  { key: "chen", label: "陈默", desc: "前端 · 组件库维护" },
  { key: "zhao", label: "赵一鸣", desc: "设计 · 视觉规范" },
  { key: "wang", label: "王皓", desc: "后端 · 暂不参与", disabled: true },
  { key: "li", label: "李雨桐", desc: "测试 · 回归验证" },
];

const picked = ref<(string | number)[]>(["fe"]);
const members = ref<(string | number)[]>(["chen"]);
const plain = ref<(string | number)[]>([]);
const logged = ref<(string | number)[]>([]);
const lastMove = ref("");
const lastCount = ref(0);

function onChange(values: (string | number)[], direction: "right" | "left") {
  lastMove.value =
    direction === "right"
      ? `移入 ${values.length - lastCount.value} 项`
      : `移出 ${lastCount.value - values.length} 项`;
  lastCount.value = values.length;
}
</script>

<template>
  <DemoPage
    name="Transfer"
    desc="穿梭框：左右两栏勾选搬运 · 搜索过滤 · 禁用项 · 变更方向回显"
  >
    <DemoBlock :span="2"
      title="基础"
      desc="左侧待选、右侧已选，勾选后点中间箭头搬运；count 会区分「已勾几项」和「共几项」"
    >
      <WdTransfer
        v-model="picked"
        :data="roles"
        source-title="全部角色"
        target-title="已分配"
        :height="200"
      />
      <p class="demo-val">已选 key：{{ picked.join(", ") || "（空）" }}</p>
    </DemoBlock>

    <DemoBlock :span="2"
      title="描述与禁用项"
      desc="desc 补充身份信息，搜索会同时匹配 label 与 desc；disabled 的人无论怎么勾都不会被搬走"
    >
      <WdTransfer
        v-model="members"
        :data="people"
        source-title="可选成员"
        target-title="已加入项目"
        search-placeholder="搜姓名或职责"
        :height="220"
      />
      <p class="demo-val">项目成员：{{ members.length }} 人</p>
    </DemoBlock>

    <DemoBlock :span="2"
      title="关闭搜索 · 紧凑高度"
      desc="数据量少时关掉 filterable，height 收到 160，两栏并排也不占满屏"
    >
      <WdTransfer
        v-model="plain"
        :data="roles"
        :filterable="false"
        :height="160"
        source-title="待选"
        target-title="已选"
      />
    </DemoBlock>

    <DemoBlock :span="2"
      title="变更方向回显"
      desc="change 的第二个参数说明这次是移入还是移出，便于做操作日志或埋点"
    >
      <WdTransfer
        v-model="logged"
        :data="roles"
        :height="180"
        @change="onChange"
      />
      <DemoRow :gap="12">
        <span class="demo-val">当前已选 {{ logged.length }} 项</span>
        <span class="demo-val">最近动作：{{ lastMove || "（还没动）" }}</span>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.demo-val {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
