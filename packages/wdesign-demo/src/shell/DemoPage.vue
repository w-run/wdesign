<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  /** 组件名（不含 Wd 前缀），显示在页面标题 */
  name: string;
  /** 一句话说明 */
  desc?: string;
  /** 该页覆盖的组件（用于显示「本页包含」） */
  covers?: string[];
}>();

const scroller = computed(() => document.querySelector(".demo-main"));
</script>

<template>
  <article class="demo-page">
    <header class="demo-page__head">
      <h1 class="demo-page__title">{{ name }}</h1>
      <p v-if="desc" class="demo-page__desc">{{ desc }}</p>
    </header>
    <div class="demo-page__body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.demo-page {
  max-width: 1080px;
}

.demo-page__head {
  margin-bottom: 24px;
}

.demo-page__title {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -.025em;
  color: var(--wd-ink);
}

.demo-page__desc {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--wd-ink-2);
}

.demo-page__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
