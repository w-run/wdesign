<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdFileList } from "@wdesign";

/** 目录树：文件夹靠 children 嵌套，展开状态由组件内部维护 */
const tree = [
  {
    name: "packages",
    type: "folder" as const,
    children: [
      {
        name: "wdesign-ui",
        type: "folder" as const,
        children: [
          { name: "index.ts", type: "file" as const, size: 4096 },
          { name: "components", type: "folder" as const, children: [{ name: "WdButton.vue", type: "file" as const, size: 8192 }] },
        ],
      },
      { name: "wdesign-icons", type: "folder" as const, children: [{ name: "registry.ts", type: "file" as const, size: 2048 }] },
    ],
  },
  { name: "pnpm-workspace.yaml", type: "file" as const, size: 186 },
  { name: "AGENTS.md", type: "file" as const, size: 5120 },
];

/** 单层附件列表：不带 children 就不会有展开箭头 */
const attachments = [
  { name: "报价单-W20240921.pdf", type: "file" as const, size: 1564672 },
  { name: "验收单-已盖章.pdf", type: "file" as const, size: 892928 },
  { name: "物流面单-顺丰.png", type: "file" as const, size: 245760 },
];

const picked = ref("");

function onSelect(item: { name: string }) {
  picked.value = item.name;
}
</script>

<template>
  <DemoPage name="FileList" desc="文件列表：目录树 · 单层附件 · 选中回调">
    <DemoBlock
      title="目录树"
      desc="type 为 folder 的条目才能展开，缩进按层级自动累加；适合上传后预览整个目录结构"
    >
      <WdFileList :items="tree" />
    </DemoBlock>

    <DemoBlock
      title="单层附件"
      desc="全部是 file 时不渲染展开箭头，视觉上就是一份普通附件清单"
    >
      <WdFileList :items="attachments" />
    </DemoBlock>

    <DemoBlock
      title="选中回调"
      desc="点击文件触发 select 交给业务处理（下载 / 预览）；点击文件夹只切换展开，不触发回调"
    >
      <WdFileList :items="attachments" @select="onSelect" />
      <p class="hint">{{ picked ? `待预览：${picked}` : "点击任意文件试试" }}</p>
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
