<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdColorPicker } from "@wdesign";

const color = ref("#D62839");
const small = ref("#3B7FD4");
const medium = ref("#0DBC79");
const large = ref("#8B55C0");

/** 非受控：不传 v-model，组件自己持有色值 */
const lastChange = ref("（尚未取色）");

const brandPresets = ["#D62839", "#0DBC79", "#3B7FD4", "#7C3AED", "#191B1F", "#FFFFFF"];

function onChange(v: string) {
  lastChange.value = v;
}
</script>

<template>
  <DemoPage
    name="ColorPicker"
    desc="取色器：SV 面板 + 色相条 · 预设色板 · 三档尺寸 · 只读与禁用"
  >
    <DemoBlock
      title="受控"
      desc="v-model 传 #RRGGBB 字符串；点开是饱和度/明度面板加色相条，也能直接敲 HEX"
    >
      <DemoRow>
        <WdColorPicker v-model="color" />
      </DemoRow>
      <p class="cap">当前色值：{{ color }}</p>
    </DemoBlock>

    <DemoBlock
      title="三档尺寸"
      desc="sm 适合表格里的色块单元格，lg 适合主题设置页的主色选择；editable 关掉后只剩色块，省宽度"
    >
      <DemoRow :gap="24">
        <WdColorPicker v-model="small" size="sm" />
        <WdColorPicker v-model="medium" />
        <WdColorPicker v-model="large" size="lg" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="自定义预设色板"
      desc="presets 换成品牌色，常用色一次点中，不必每次去拖色相条；面板里仍然可以自由取任意颜色"
    >
      <DemoRow>
        <WdColorPicker v-model="color" :presets="brandPresets" />
      </DemoRow>
      <p class="cap">写回主题色：{{ color }}</p>
    </DemoBlock>

    <DemoBlock
      title="只读展示与禁用"
      desc="editable=false 只留色块；disabled 连面板都不展开，用于无权限修改的只读场景"
    >
      <DemoRow :gap="24">
        <WdColorPicker v-model="medium" :editable="false" />
        <WdColorPicker model-value="#D62839" disabled />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="不传 v-model 也能工作"
      desc="非受控用 defaultValue 起手，色值由组件自己记；父级只在 change 时同步一次，适合纯本地调色试色"
    >
      <DemoRow>
        <WdColorPicker default-value="#2E9E8F" @change="onChange" />
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
