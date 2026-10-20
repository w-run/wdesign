<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdMentions } from "@wdesign";

const users = [
  { id: 1, label: "林珊", desc: "产品 · lin@w-run.net" },
  { id: 2, label: "陈默", desc: "前端 · chen@w-run.net" },
  { id: 3, label: "赵一鸣", desc: "设计 · zhao@w-run.net" },
  { id: 4, label: "王皓", desc: "后端 · wang@w-run.net", disabled: true },
  { id: 5, label: "李雨桐", desc: "测试 · li@w-run.net" },
];

const text = ref("");
const hashText = ref("");
const limitText = ref("");
const pickedText = ref("@林珊 需求文档更新了，麻烦再确认下这次的范围");
const picked = ref<string[]>([]);

function onSelect(user: { label: string }) {
  picked.value.push(user.label);
}
</script>

<template>
  <DemoPage
    name="Mentions"
    desc="提及输入：@ 触发候选 · 键盘选择 · 自定义触发符 · 候选上限"
  >
    <DemoBlock
      title="基础"
      desc="输入 @ 弹出候选，↑↓ 移动、Enter 确认、Esc 关闭；@ 后打空格则视为取消，输入邮箱不会误触发"
    >
      <WdMentions v-model="text" :users="users" :rows="4" @select="onSelect" />
      <p class="demo-val">
        已 @ 到：{{ picked.length ? picked.join("、") : "（还没选人）" }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="自定义触发符"
      desc="trigger 换成 #，适合标签、工单号这类语义，插入文本同样是「# + 显示值」"
    >
      <WdMentions
        v-model="hashText"
        :users="users"
        trigger="#"
        :rows="3"
        placeholder="输入 # 选择标签负责人"
      />
    </DemoBlock>

    <DemoBlock
      title="候选上限与禁用项"
      desc="maxOptions 只控制弹层露出几条，disabled 的人直接不进入候选，避免选了也无效"
    >
      <WdMentions
        v-model="limitText"
        :users="users"
        :max-options="2"
        :rows="3"
        placeholder="输入 @ 试试只露两条候选"
      />
    </DemoBlock>

    <DemoBlock
      title="禁用态"
      desc="禁用后整块只读，已提及的内容仍完整可见，用于「工单已归档」"
    >
      <WdMentions
        v-model="pickedText"
        :users="users"
        :rows="3"
        disabled
      />
      <DemoRow :gap="8">
        <span class="demo-tag">只读</span>
        <span class="demo-tag">{{ pickedText.length }} 字</span>
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

.demo-tag {
  font-size: 12px;
  color: var(--wd-ink-2);
}
</style>
