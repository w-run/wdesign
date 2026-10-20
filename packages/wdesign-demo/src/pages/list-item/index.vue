<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdCard, WdIcon, WdListItem, WdTag } from "@wdesign";

const picked = ref("");

/** 基础：标题撑中间，meta 贴右 */
const files = [
  { title: "设计令牌对照表.xlsx", meta: "2.1 MB" },
  { title: "2026 Q4 迭代计划.docx", meta: "486 KB" },
  { title: "组件验收清单.md", meta: "37 KB" },
];

/** 右侧附加信息：#extra 塞标签，行内对齐 */
const tasks = [
  { title: "季度复盘文档", meta: "3 人协作", tag: "草稿" },
  { title: "首页改版评审", meta: "明天 10:00", tag: "待确认" },
  { title: "图标归一方案", meta: "本周五截止", tag: "已通过" },
];
</script>

<template>
  <DemoPage name="ListItem" desc="列表条目：图标 · 右侧附加信息 · 可点击态">
    <DemoBlock
      title="基础"
      desc="title 占满中间，meta 贴右；clickable 默认开启，整行可点且 hover 有胶囊底色"
    >
      <WdCard padding="sm">
        <div class="wd-list">
          <WdListItem
            v-for="f in files"
            :key="f.title"
            :title="f.title"
            :meta="f.meta"
            @click="picked = f.title"
          />
        </div>
      </WdCard>
      <p class="demo-val">最近点击：{{ picked || "（还没点过）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="带图标"
      desc="#icon 插槽里的图标自动套一层 38px 圆形浅底，图标交给 WdIcon，跟着 currentColor 走"
    >
      <WdCard padding="sm">
        <div class="wd-list">
          <WdListItem title="设计资源" meta="18 个文件夹" @click="picked = '设计资源'">
            <template #icon>
              <WdIcon name="folder" :size="16" />
            </template>
          </WdListItem>
          <WdListItem title="图标源文件" meta="595 枚" @click="picked = '图标源文件'">
            <template #icon>
              <WdIcon name="image" :size="16" />
            </template>
          </WdListItem>
          <WdListItem title="共享给前端组" meta="最近更新 3 天前" @click="picked = '共享给前端组'">
            <template #icon>
              <WdIcon name="share-nodes" :size="16" />
            </template>
          </WdListItem>
          <WdListItem title="回收站" meta="保留 30 天" @click="picked = '回收站'">
            <template #icon>
              <WdIcon name="trash" :size="16" />
            </template>
          </WdListItem>
        </div>
      </WdCard>
    </DemoBlock>

    <DemoBlock
      title="右侧附加信息"
      desc="#extra 排在 meta 之后，塞徽标或标签都行，行内对齐不会挤掉右侧留白"
    >
      <WdCard padding="sm">
        <div class="wd-list">
          <WdListItem
            v-for="t in tasks"
            :key="t.title"
            :title="t.title"
            :meta="t.meta"
            @click="picked = t.title"
          >
            <template #icon>
              <WdIcon name="file-edit" :size="16" />
            </template>
            <template #extra>
              <WdTag variant="gray" size="sm">{{ t.tag }}</WdTag>
            </template>
          </WdListItem>
        </div>
      </WdCard>
    </DemoBlock>

    <DemoBlock
      title="可点击与纯展示"
      desc="clickable 设为 false 后去掉手型光标与 hover 底色，纯展示行不再给出「这一点能点」的暗示"
    >
      <WdCard padding="sm">
        <div class="wd-list">
          <WdListItem title="存储用量" meta="12.4 GB / 20 GB" :clickable="false">
            <template #icon>
              <WdIcon name="hard-drive" :size="16" />
            </template>
          </WdListItem>
          <WdListItem title="管理存储空间" meta="前往设置" @click="picked = '管理存储空间'">
            <template #icon>
              <WdIcon name="settings" :size="16" />
            </template>
            <template #extra>
              <WdIcon name="chevron-right" :size="14" />
            </template>
          </WdListItem>
        </div>
      </WdCard>
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
