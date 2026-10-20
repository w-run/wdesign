<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdSlider } from "@wdesign";

const volume = ref(45);
const fine = ref(2.5);
const budget = ref(120);

/** 非受控：不传 v-model，组件自己持有当前位置 */
const lastChange = ref("（尚未拖动）");

function onChange(v: number) {
  lastChange.value = String(v);
}
</script>

<template>
  <DemoPage
    name="Slider"
    desc="滑块：拖动取值 · 范围与步长 · 隐藏数值 · 自定义主色"
  >
    <DemoBlock
      title="受控"
      desc="v-model 绑定数值，拖动即写回；右侧数值用 showValue 显示，方便用户确认落点"
    >
      <WdSlider v-model="volume" />
      <p class="cap">音量：{{ volume }}</p>
    </DemoBlock>

    <DemoBlock
      title="范围与步长"
      desc="min / max / step 一起决定颗粒度；step=0.5 这类小数步长适合评分、倍率，整数区间就别给小数"
    >
      <WdSlider v-model="fine" :min="0" :max="10" :step="0.5" />
      <WdSlider v-model="budget" :min="0" :max="500" :step="10" />
      <p class="cap">倍率：{{ fine }} / 预算：{{ budget }}</p>
    </DemoBlock>

    <DemoBlock
      title="外观：隐藏数值与换主色"
      desc="showValue=false 去掉右侧数字，数值交给外部标签；color 只换已填充段，未填充段固定用中性灰，换色也不会串色"
    >
      <WdSlider :model-value="30" :show-value="false" />
      <WdSlider v-model="budget" color="var(--wd-rainbow-teal)" :max="500" :step="10" />
    </DemoBlock>

    <DemoBlock
      title="不传 v-model 也能工作"
      desc="非受控用 defaultValue 起手，滑块位置由组件自己维护；父级只在 change 时读一次，省掉一个 ref"
    >
      <WdSlider :default-value="30" @change="onChange" />
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
