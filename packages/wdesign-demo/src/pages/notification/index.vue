<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdNotification, WdButton } from "@wdesign";

type Variant = "info" | "success" | "warning" | "danger";

/** 全页共用一个实例：同时只存在一条通知，文案与语气都从这里改 */
const open = ref(false);
const variant = ref<Variant>("info");
const title = ref("");
const description = ref("");

function show(v: Variant, t: string, d = "") {
  variant.value = v;
  title.value = t;
  description.value = d;
  open.value = true;
}

const LONG_DESC =
  "我们把团队权限从旧的 roles 表迁到了 workspace_members，历史角色已自动映射。" +
  "自定义角色需要管理员再确认一次作用范围，确认前成员只保留只读权限。";

function showLong() {
  show("info", "工作区设置已迁移", LONG_DESC);
}
</script>

<template>
  <DemoPage name="Notification" desc="通知：四种语气 · 标题与描述 · 关闭回写">
    <DemoBlock title="四种语气" desc="v-model 控制显隐，通知常驻到被关闭为止；语气要和事件的严重程度对齐">
      <DemoRow>
        <WdButton variant="tint" @click="show('info', '有新的评审意见', 'design-review 里新增 3 条评论。')">
          info
        </WdButton>
        <WdButton variant="primary" @click="show('success', '部署完成', '生产环境已切到 v1.4.0。')">
          success
        </WdButton>
        <WdButton variant="tint" @click="show('warning', '配额不足', '本月构建时长已用掉 92%。')">
          warning
        </WdButton>
        <WdButton variant="dark" @click="show('danger', '同步失败', '令牌校验未通过，请重新授权后重试。')">
          danger
        </WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="标题与描述" desc="一句话结论用纯标题就够；需要交代原因或下一步动作时再补描述">
      <DemoRow>
        <WdButton variant="tint" size="sm" @click="show('success', '已保存')">仅标题</WdButton>
        <WdButton
          variant="tint"
          size="sm"
          @click="show('warning', '存储空间将满', '描述补的是原因和建议动作，不要写成第二个标题。')"
        >
          标题 + 描述
        </WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="长描述" desc="通知适合承载两三行说明；超过三行就该换 Modal 或跳转到详情页">
      <DemoRow>
        <WdButton variant="ghost" size="sm" @click="showLong">打开长文案</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="关闭方式" desc="右上角关闭按钮与 Esc 都会把 false 回写给 v-model，显隐状态始终留在调用方">
      <DemoRow>
        <WdButton variant="tint" @click="show('info', '试试点右上角的关闭按钮', '也可以直接按 Esc。')">
          打开
        </WdButton>
        <span>{{ open ? "当前有通知显示中" : "当前没有通知" }}</span>
      </DemoRow>
    </DemoBlock>

    <WdNotification
      v-model="open"
      :title="title"
      :description="description"
      :variant="variant"
    />
  </DemoPage>
</template>
