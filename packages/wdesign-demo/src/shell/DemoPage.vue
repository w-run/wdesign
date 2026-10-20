<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

/**
 * demo 页面的外壳：标题 + 说明 + 内容区。
 *
 * 「本页包含」直接读路由 meta.covers —— 变体合并的页面（Avatar + AvatarGroup、
 * Form + FormItem）在 router.ts 里已经声明了覆盖范围，页面自己不用再重复一遍。
 */
const props = defineProps<{
  /** 组件名（不含 Wd 前缀），显示在页面标题 */
  name: string;
  /** 一句话说明 */
  desc?: string;
}>();

const route = useRoute();

const covers = computed<string[]>(() => (route.meta?.covers as string[] | undefined) ?? []);
</script>

<template>
  <article class="demo-page">
    <header class="demo-page__head">
      <h1 class="demo-page__title">{{ props.name }}</h1>
      <p v-if="props.desc" class="demo-page__desc">{{ props.desc }}</p>
      <p v-if="covers.length" class="demo-page__covers">
        本页包含：{{ covers.join(" · ") }}
      </p>
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
  letter-spacing: -0.025em;
  color: var(--wd-ink);
}

.demo-page__desc {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--wd-ink-2);
}

/* 变体合并的页面（Avatar + AvatarGroup 等）把覆盖范围显式列出来 */
.demo-page__covers {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--wd-ink-3);
}

.demo-page__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
