<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdUpload } from "@wdesign";

interface PickFile {
  name: string;
  size: number;
  percent: number;
}

const single = ref<PickFile[]>([]);
const images = ref<PickFile[]>([]);
const limited = ref<PickFile[]>([]);
const quiet = ref<PickFile[]>([]);
const exceedMsg = ref("");

function onSingle(files: PickFile[]) {
  single.value = files;
}
function onImages(files: PickFile[]) {
  images.value = files;
}
function onLimited(files: PickFile[]) {
  limited.value = files;
}
function onQuiet(files: PickFile[]) {
  quiet.value = files;
}

function onExceed(reason: string, file: File) {
  exceedMsg.value =
    reason === "count"
      ? `数量已达上限，${file.name} 没有加入`
      : `${file.name} 超过 1 MB，已拒收`;
}
</script>

<template>
  <DemoPage
    name="Upload"
    desc="文件上传：点击/拖拽 · 多选 · 数量与体积上限 · 可隐藏列表"
  >
    <DemoBlock
      title="基础"
      desc="点击选文件或直接拖进虚线框；列表里的进度条是组件内置的模拟进度，接真实接口时替换即可"
    >
      <WdUpload @change="onSingle" />
      <p class="demo-val">当前 {{ single.length }} 个文件</p>
    </DemoBlock>

    <DemoBlock
      title="多选与数量上限"
      desc="multiple 允许多选，maxCount 到顶后新文件被拒收并给出提示，避免用户以为已传成功"
    >
      <WdUpload
        multiple
        accept="image/*"
        :max-count="3"
        hint="最多 3 张图片"
        @change="onImages"
        @exceed="onExceed"
      />
      <p class="demo-val">当前 {{ images.length }} / 3 张，超额提示：{{ exceedMsg || "（未触发）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="体积上限"
      desc="maxSize 以字节计，超限文件不进列表，只通过 exceed 抛原因，交给页面决定怎么提示"
    >
      <WdUpload :max-size="1048576" hint="单个文件不超过 1 MB" @change="onLimited" />
      <p class="demo-val">当前 {{ limited.length }} 个文件，超额提示：{{ exceedMsg || "（未触发）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="不显示文件列表"
      desc="showList=false 时只保留上传区，列表改由外部渲染，适合嵌进表格行里"
    >
      <WdUpload :show-list="false" multiple @change="onQuiet" />
      <DemoRow :gap="10">
        <span class="demo-val">已提交 {{ quiet.length }} 个</span>
        <span class="demo-val">{{ quiet.map((f) => f.name).join("、") || "（无）" }}</span>
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
