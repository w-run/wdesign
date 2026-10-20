<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "./Sidebar.vue";

const route = useRoute();
const main = ref<HTMLElement | null>(null);

/**
 * 换页回到顶部。
 *
 * 侧栏有 70+ 项，翻到页面底部再点下一个组件时，滚动位置会原地保留 ——
 * 新页面直接从中间开始显示，看起来像"页面内容缺了一块"。
 */
watch(
  () => route.path,
  async () => {
    await nextTick();
    main.value?.scrollTo({ top: 0 });
  },
);
</script>

<template>
  <div class="demo-shell">
    <Sidebar />
    <main ref="main" class="demo-main">
      <RouterView />
    </main>
  </div>
</template>
