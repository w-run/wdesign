<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdModal, WdButton } from "@wdesign";

const basic = ref(false);
const narrow = ref(false);
const wide = ref(false);
const strict = ref(false);
</script>

<template>
  <DemoPage name="Modal" desc="模态框：受控开关 · 自定义宽度 · 底部操作区">
    <DemoBlock title="基础" desc="modelValue 受控；footer 是可选插槽，不放就没有底部操作区">
      <DemoRow>
        <WdButton variant="primary" @click="basic = true">打开弹窗</WdButton>
      </DemoRow>
      <WdModal v-model="basic" title="重命名文件" width="440">
        <p>正文放在默认插槽里。遮罩点击、右上角关闭按钮、Esc 都能关闭。</p>
        <template #footer>
          <WdButton variant="tint" size="sm" @click="basic = false">取消</WdButton>
          <WdButton variant="primary" size="sm" @click="basic = false">保存</WdButton>
        </template>
      </WdModal>
    </DemoBlock>

    <DemoBlock title="宽度" desc="width 收数字（按 px）或字符串，数字走默认值最省心，字符串可写百分比之类的表达式">
      <DemoRow>
        <WdButton variant="tint" @click="narrow = true">窄 · 320</WdButton>
        <WdButton variant="tint" @click="wide = true">宽 · 680</WdButton>
      </DemoRow>
      <WdModal v-model="narrow" title="窄弹窗" :width="320">
        <p>确认类的短内容用窄弹窗，视线不必横向移动。</p>
      </WdModal>
      <WdModal v-model="wide" title="宽弹窗" :width="680">
        <p>表格、双列表单这类内容多的场景才需要加宽，超过 680 反而难读。</p>
        <template #footer>
          <WdButton variant="primary" size="sm" @click="wide = false">知道了</WdButton>
        </template>
      </WdModal>
    </DemoBlock>

    <DemoBlock
      title="点遮罩不关闭"
      desc="closeOnMask=false 用于表单填写场景，避免手滑丢输入；此时仍可用 Esc 或关闭按钮退出"
    >
      <DemoRow>
        <WdButton variant="dark" @click="strict = true">打开不可点遮罩关闭的弹窗</WdButton>
      </DemoRow>
      <WdModal v-model="strict" title="填写中请勿误关" :close-on-mask="false">
        <p>点遮罩没反应是预期的；要退出请点右上角关闭，或按 Esc。</p>
        <template #footer>
          <WdButton variant="primary" size="sm" @click="strict = false">完成</WdButton>
        </template>
      </WdModal>
    </DemoBlock>
  </DemoPage>
</template>
