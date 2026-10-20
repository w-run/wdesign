<script setup lang="ts">
/**
 * demo 页面的标准区块。
 * 每个组件页由若干 DemoBlock 组成，各自带标题与说明。
 */
defineProps<{
  /** 区块标题 */
  title?: string
  /** 补充说明 */
  desc?: string
}>();
</script>

<template>
  <section class="demo-block">
    <header v-if="title || desc" class="demo-block__head">
      <h3 v-if="title" class="demo-block__title">{{ title }}</h3>
      <p v-if="desc" class="demo-block__desc">{{ desc }}</p>
    </header>
    <div class="demo-block__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.demo-block {
  background: var(--wd-card);
  border-radius: var(--wd-radius-lg);
  padding: 24px 28px;
}

.demo-block + .demo-block {
  margin-top: 16px;
}

.demo-block__head {
  margin-bottom: 18px;
}

.demo-block__title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: var(--wd-ink);
}

.demo-block__desc {
  margin: 6px 0 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}

.demo-block__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
