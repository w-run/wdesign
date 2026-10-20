<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdForm, WdFormItem, WdInput } from "@wdesign";

/* ---- 基础用法：必填 / 长度 / 正则 / 自定义校验 ---- */
const basic = ref({ name: "", email: "", invite: "" });

const basicRules = {
  name: [
    { required: true, message: "请填写姓名" },
    { min: 2, max: 12, message: "姓名需 2–12 个字符" },
  ],
  email: [
    { required: true, message: "请填写邮箱" },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "邮箱格式不正确" },
  ],
  invite: [
    { required: true, message: "请填写邀请码" },
    {
      validator: (v: unknown) => (v === "WD2026" ? true : "邀请码应为 WD2026"),
    },
  ],
};

/* ---- 标签位置对比 ---- */
const topModel = ref({ nick: "", mail: "" });
const leftModel = ref({ nick: "", mail: "" });

const posRules = {
  nick: [{ required: true, message: "请填写昵称" }],
  mail: [{ required: true, message: "请填写邮箱" }],
};

/* ---- 提交与校验结果回显 ---- */
const submitModel = ref({ name: "", email: "", invite: "" });
const submitted = ref("");
const validation = ref("（还没校验过）");
/** 换 key 重挂表单，等价于把内部错误状态一起清空 */
const formKey = ref(0);

function onSubmit(value: Record<string, unknown>) {
  submitted.value = JSON.stringify(value, null, 2);
}

function onValidate(ok: boolean, errors: Record<string, string>) {
  validation.value = ok
    ? "校验通过，没有错误"
    : `校验未通过：${Object.entries(errors)
        .map(([field, msg]) => `${field} → ${msg}`)
        .join("；")}`;
}

function resetSubmitForm() {
  submitModel.value = { name: "", email: "", invite: "" };
  submitted.value = "";
  validation.value = "（还没校验过）";
  formKey.value += 1;
}

/* ---- 整体禁用 ---- */
const locked = ref({ name: "林珊", email: "lin@w-run.net" });
</script>

<template>
  <DemoPage
    name="Form"
    desc="表单校验：规则分层 · 标签位置 · 提交结果回显 · 整体禁用"
  >
    <DemoBlock :span="2"
      title="基础用法"
      desc="rules 以字段名为键，必填、长度、正则、自定义校验可叠加；直接提交空表单看错误提示"
    >
      <WdForm v-model="basic" :rules="basicRules">
        <WdFormItem prop="name" label="姓名" hint="2–12 个字符">
          <WdInput v-model="basic.name" placeholder="请输入姓名" />
        </WdFormItem>
        <WdFormItem prop="email" label="邮箱" hint="用于接收构建通知">
          <WdInput v-model="basic.email" placeholder="name@example.com" />
        </WdFormItem>
        <WdFormItem prop="invite" label="邀请码" hint="内部试用需要，固定为 WD2026">
          <WdInput v-model="basic.invite" placeholder="请输入邀请码" />
        </WdFormItem>
        <WdButton variant="primary" type="submit">提交</WdButton>
      </WdForm>
    </DemoBlock>

    <DemoBlock :span="2"
      title="标签位置"
      desc="top 适合窄容器与移动端，left 适合字段多、需要纵向对齐扫读的后台表单"
    >
      <DemoRow :gap="24" align="flex-start">
        <div class="demo-col">
          <span class="demo-cap">labelPosition=top（默认）</span>
          <WdForm v-model="topModel" :rules="posRules">
            <WdFormItem prop="nick" label="昵称">
              <WdInput v-model="topModel.nick" placeholder="请输入昵称" />
            </WdFormItem>
            <WdFormItem prop="mail" label="邮箱">
              <WdInput v-model="topModel.mail" placeholder="name@example.com" />
            </WdFormItem>
          </WdForm>
        </div>
        <div class="demo-col">
          <span class="demo-cap">labelPosition=left + labelWidth=76px</span>
          <WdForm
            v-model="leftModel"
            :rules="posRules"
            label-position="left"
            label-width="76px"
          >
            <WdFormItem prop="nick" label="昵称">
              <WdInput v-model="leftModel.nick" placeholder="请输入昵称" />
            </WdFormItem>
            <WdFormItem prop="mail" label="邮箱">
              <WdInput v-model="leftModel.mail" placeholder="name@example.com" />
            </WdFormItem>
          </WdForm>
        </div>
      </DemoRow>
    </DemoBlock>

    <DemoBlock :span="2"
      title="提交与校验回显"
      desc="submit 只在全部通过后抛数据，validate 无论成败都抛结果，两个都能用来做页面反馈"
    >
      <WdForm
        :key="formKey"
        v-model="submitModel"
        :rules="basicRules"
        label-position="left"
        label-width="76px"
        @submit="onSubmit"
        @validate="onValidate"
      >
        <WdFormItem prop="name" label="姓名">
          <WdInput v-model="submitModel.name" placeholder="请输入姓名" />
        </WdFormItem>
        <WdFormItem prop="email" label="邮箱">
          <WdInput v-model="submitModel.email" placeholder="name@example.com" />
        </WdFormItem>
        <WdFormItem prop="invite" label="邀请码">
          <WdInput v-model="submitModel.invite" placeholder="WD2026" />
        </WdFormItem>
        <DemoRow :gap="10">
          <WdButton variant="primary" type="submit">校验并提交</WdButton>
          <WdButton variant="tint" @click="resetSubmitForm">重置</WdButton>
        </DemoRow>
      </WdForm>
      <pre class="demo-pre">校验结果：{{ validation }}</pre>
      <pre class="demo-pre">提交数据：{{ submitted || "（还没通过校验）" }}</pre>
    </DemoBlock>

    <DemoBlock :span="2"
      title="整体禁用"
      desc="给 WdForm 一个 disabled，内部所有控件一起只读，不必逐个传 prop"
    >
      <WdForm v-model="locked" disabled>
        <WdFormItem prop="name" label="姓名">
          <WdInput v-model="locked.name" />
        </WdFormItem>
        <WdFormItem prop="email" label="邮箱">
          <WdInput v-model="locked.email" />
        </WdFormItem>
      </WdForm>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.demo-col {
  display: flex;
  flex: 1 1 280px;
  flex-direction: column;
}

.demo-cap {
  margin-bottom: 10px;
  font-size: 12px;
  color: var(--wd-ink-2);
}

.demo-pre {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--wd-ink-2);
}
</style>
