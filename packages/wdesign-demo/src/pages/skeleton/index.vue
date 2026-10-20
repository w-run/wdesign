<script setup lang="ts">
import { onMounted, ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdButton, WdSkeleton } from "@wdesign";

/** 模拟首屏请求：1.4s 后返回 */
const loading = ref(true);
let timer: ReturnType<typeof setTimeout> | undefined;

function reload() {
  loading.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => {
    loading.value = false;
  }, 1400);
}

onMounted(() => {
  timer = setTimeout(() => {
    loading.value = false;
  }, 1400);
});
</script>

<template>
  <DemoPage
    name="Skeleton"
    desc="骨架屏：文本占位 · 列表骨架 · 图区块 · 加载切换"
  >
    <DemoBlock
      title="文本占位"
      desc="加载中用 Skeleton 占位，别让空白等于没数据 —— 骨架保住版式高度，数据到位时不会整屏跳动"
    >
      <WdSkeleton variant="text" :count="4" />
    </DemoBlock>

    <DemoBlock
      title="列表行骨架"
      desc="circle 加两行 text 拼出「头像 + 标题 + 摘要」，与真实列表的行高对齐才不跳"
    >
      <div class="list">
        <div v-for="i in 3" :key="i" class="list__row">
          <div class="list__avatar">
            <WdSkeleton variant="circle" :width="36" :count="1" />
          </div>
          <div class="list__body">
            <WdSkeleton variant="text" :count="1" width="42%" />
            <WdSkeleton variant="text" :count="1" width="72%" />
          </div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      title="图区块"
      desc="rect 用于封面、图表、缩略图这类有固定宽高比的区域，height 给多少就占多少"
    >
      <WdSkeleton variant="rect" :height="96" :count="1" width="100%" />
      <WdSkeleton variant="rect" :height="120" :count="1" width="60%" />
    </DemoBlock>

    <DemoBlock
      title="加载切换"
      desc="真数据回来后再整体替换骨架，比先渲染空列表再往里填更稳；SWR 场景可保留旧数据同时显示骨架"
    >
      <WdButton variant="tint" size="sm" @click="reload">重新加载</WdButton>
      <template v-if="loading">
        <div class="list__row">
          <div class="list__avatar">
            <WdSkeleton variant="circle" :width="36" :count="1" />
          </div>
          <div class="list__body">
            <WdSkeleton variant="text" :count="1" width="46%" />
            <WdSkeleton variant="text" :count="2" />
          </div>
        </div>
      </template>
      <div v-else class="card">
        <p class="card__title">构建 #4821 已通过</p>
        <p class="card__text">
          分支 release/1.4 · 触发人 王一舟 · 耗时 3 分 12 秒 · 产物 4 个
        </p>
      </div>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list__row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

/* 骨架根节点是 width:100% 的列容器，圆形占位要单独固定宽度，否则会被 flex 压扁 */
.list__avatar {
  flex: none;
  width: 36px;
}

.list__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 18px;
  border-radius: var(--wd-radius-lg);
  background: var(--wd-field);
}

.card__title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--wd-ink);
}

.card__text {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--wd-ink-2);
}
</style>
