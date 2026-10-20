<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdCheckbox } from "@wdesign";

const agree = ref(true);
const newsletter = ref(false);
const terms = ref(false);

const green = ref(true);
const blue = ref(false);
const violet = ref(true);

/** 非受控：不传 v-model，组件自己持有勾选状态 */
const lastChange = ref("（尚未点击）");

function onChange(v: boolean) {
  lastChange.value = v ? "选中" : "取消";
}
</script>

<template>
  <DemoPage
    name="Checkbox"
    desc="复选框：受控 / 非受控 · 自定义选中色 · 禁用态 · 富文本标签"
  >
    <DemoBlock
      title="受控"
      desc="v-model 绑定布尔值；只想展示固定状态时直接传 model-value，不必为它建 ref"
    >
      <DemoRow>
        <WdCheckbox v-model="agree" label="我已阅读并同意《服务条款》" />
        <WdCheckbox v-model="newsletter" label="订阅更新邮件" />
        <WdCheckbox :model-value="true" label="固定选中" />
      </DemoRow>
      <p class="cap">
        同意：{{ agree ? "是" : "否" }} / 订阅：{{ newsletter ? "是" : "否" }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="自定义选中色"
      desc="color 收任意 CSS 颜色，hover 与禁用态都由它派生 —— 不会出现「选中是绿、悬停变红」这种串色"
    >
      <DemoRow>
        <WdCheckbox v-model="green" label="绿色" color="var(--wd-rainbow-green)" />
        <WdCheckbox v-model="blue" label="蓝色" color="var(--wd-rainbow-blue)" />
        <WdCheckbox v-model="violet" label="紫色" color="var(--wd-rainbow-violet)" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="禁用态"
      desc="禁用后不可点击，选中态保留原有的颜色深浅，只是整体压暗一档"
    >
      <DemoRow>
        <WdCheckbox :model-value="true" disabled label="禁用 · 已选" />
        <WdCheckbox :model-value="false" disabled label="禁用 · 未选" />
        <WdCheckbox
          :model-value="true"
          disabled
          color="var(--wd-rainbow-green)"
          label="禁用 · 自定义色"
        />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="非受控与富文本标签"
      desc="不传 v-model 时用 defaultValue 起手，只在 change 里取值；默认插槽可以放链接或强调，label 只是纯文本简写"
    >
      <DemoRow>
        <WdCheckbox :default-value="true" label="非受控复选框" @change="onChange" />
        <WdCheckbox v-model="terms">
          我已阅读并同意 <strong>《服务条款》</strong>
        </WdCheckbox>
      </DemoRow>
      <p class="cap">最近 change：{{ lastChange }}</p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.cap {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
