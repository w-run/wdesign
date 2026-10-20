<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdOtp } from "@wdesign";

const code = ref("");
const separate = ref("");
const pill = ref("");
const underline = ref("");
const short = ref("");
const lastChange = ref("");

function onChange(value: string) {
  lastChange.value = value;
}
</script>

<template>
  <DemoPage
    name="Otp"
    desc="验证码输入：三种形态 · 定长分段 · 逐格自动前移"
  >
    <DemoBlock
      title="基础"
      desc="每格只收一位数字，输入后焦点自动前移，退格回到上一格；整段验证码可直接粘贴铺满"
    >
      <WdOtp v-model="code" :length="6" @change="onChange" />
      <p class="demo-val">
        已输入：{{ code || "（空）" }} ｜ 最近一次 change：{{ lastChange || "（无）" }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="三种形态"
      desc="separate 是独立方块，pill 首尾圆头拼接更紧凑，underline 只留底线、与下划线表单成套"
    >
      <DemoRow :gap="20">
        <WdOtp v-model="separate" :length="6" variant="separate" />
        <WdOtp v-model="pill" :length="6" variant="pill" />
        <WdOtp v-model="underline" :length="6" variant="underline" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="定长分段"
      desc="格数由 length 决定，四位常见于短信短码，位数少时单格可以更大"
    >
      <WdOtp v-model="short" :length="4" />
      <p class="demo-val">已输入：{{ short || "（空）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="禁用"
      desc="禁用态保留已填内容，只拦截输入，用于「验证码已发送、冷却中」"
    >
      <WdOtp model-value="1234" :length="6" disabled />
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
