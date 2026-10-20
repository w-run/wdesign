<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdExplorer } from "@wdesign";

/** 交付目录：文件名、体积（字节）、修改时间都按真实项目填 */
const folders = [
  {
    name: "设计交付",
    files: [
      { name: "WDesign-视觉规范-v2.3.pdf", size: 8421376, modified: "2024-09-18 15:22" },
      { name: "首页改版-桌面端.fig", size: 24117248, modified: "2024-09-20 10:04" },
      { name: "图标补齐清单.md", size: 6144, modified: "2024-09-21 09:37" },
    ],
  },
  {
    name: "合同归档",
    files: [
      { name: "云栖智能-年度框架合同.pdf", size: 3145728, modified: "2024-08-02 11:15" },
      { name: "补充协议-第二版.docx", size: 286720, modified: "2024-09-11 16:48" },
    ],
  },
  {
    name: "构建产物",
    files: [
      { name: "wdesign-ui-1.4.2.tgz", size: 1258291, modified: "2024-09-23 18:30" },
      { name: "wdesign-icons-1.4.0.tgz", size: 668467, modified: "2024-09-23 18:31" },
      { name: "build-report.json", size: 20480, modified: "2024-09-23 18:32" },
      { name: "sha256sums.txt", size: 1024, modified: "2024-09-23 18:32" },
    ],
  },
];

const picked = ref("");
const pickedSize = ref("");

function onSelect(file: { name: string; size?: number }) {
  picked.value = file.name;
  pickedSize.value = file.size ? `${(file.size / 1024).toFixed(1)} KB` : "体积未知";
}
</script>

<template>
  <DemoPage name="Explorer" desc="文件浏览器：详情视图 · 图标视图 · 选中回调">
    <DemoBlock
      title="详情视图"
      desc="默认 details，左栏文件夹带条目计数，右栏按名称 / 大小 / 修改时间排列，适合找具体文件"
    >
      <WdExplorer :folders="folders" />
    </DemoBlock>

    <DemoBlock
      title="图标视图"
      desc="icons 视图用瓦片呈现，扫缩略图比读文件名快；条目多、名字长时还是回详情视图"
    >
      <WdExplorer :folders="folders" view="icons" />
    </DemoBlock>

    <DemoBlock
      title="选中回调"
      desc="文件条目点击触发 select，文件夹切换由组件内部管理，父级只需关心最终选中的文件"
    >
      <WdExplorer :folders="folders" @select="onSelect" />
      <p class="hint">
        {{ picked ? `已选中：${picked}（${pickedSize}）` : "点击任意文件试试" }}
      </p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.hint {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
