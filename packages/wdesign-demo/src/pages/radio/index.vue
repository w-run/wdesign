<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdRadioGroup } from "@wdesign";

const plan = ref("专业版");
const planOptions = ["基础版", "专业版", "团队版"];

const layoutOptions = [
  { label: "卡片视图", value: "card" },
  { label: "列表视图", value: "list" },
  { label: "表格视图", value: "table" },
];
const layout = ref("list");

/** 非受控：不传 v-model，组件自己持有选中值 */
const lastChange = ref("（尚未选择）");

function onChange(v: string | number) {
  lastChange.value = String(v) || "（空）";
}
</script>

<template>
  <DemoPage
    name="Radio"
    desc="单选组：互斥选项 · 字符串 / 对象两种 options · 禁用 · 非受控"
  >
    <DemoBlock
      title="字符串简写"
      desc="options 直接给字符串时值等于文案；选项不多、值不需要英文 code 的场景这样最省事"
    >
      <WdRadioGroup v-model="plan" :options="planOptions" />
      <p class="cap">当前方案：{{ plan || "（未选）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="对象写法"
      desc="{label, value} 把「给后端看的 code」和「给用户看的文案」拆开；纯字符串写法做不到这一点"
    >
      <WdRadioGroup v-model="layout" :options="layoutOptions" />
      <p class="cap">当前视图：{{ layout }}</p>
    </DemoBlock>

    <DemoBlock
      title="整组禁用"
      desc="disabled 落在组上，一次关掉全部选项；已选项仍然可见，方便对照只读态的样子"
    >
      <WdRadioGroup :model-value="'选项一'" :options="['选项一', '选项二']" disabled />
    </DemoBlock>

    <DemoBlock
      title="不传 v-model 也能工作"
      desc="非受控用 defaultValue 起手，选中值由组件自己记；表单提交前只在 change 里收集一次"
    >
      <WdRadioGroup
        :options="['个人', '企业', '政府']"
        default-value="个人"
        @change="onChange"
      />
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
