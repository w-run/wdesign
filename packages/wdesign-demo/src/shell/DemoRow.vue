<script setup lang="ts">
import { computed } from "vue";

/**
 * 横向排列的示例行。
 *
 * ⚠️ 曾经写成 `:style="{ gap: gap + px, flexWrap: wrap ? wrap : nowrap }"` ——
 * `px` / `nowrap` 在模板里都是未定义标识符，拼出来的 style 全是非法值，
 * 浏览器整条丢弃：gap 变成 0、flex-wrap 变成不换行，而且**不报错**，
 * 只在控制台留一句 Vue warn。
 *
 * align 默认是 flex-start：一排里放尺寸不同的卡片（音频 card、媒体卡）时，
 * 居中对齐会让它们各自飘在不同高度上，顶对齐才像"同一组"。
 */
const props = withDefaults(
  defineProps<{ gap?: number; align?: string; wrap?: boolean }>(),
  { gap: 16, align: "flex-start", wrap: true },
);

const style = computed(() => ({
  gap: `${props.gap}px`,
  alignItems: props.align,
  flexWrap: props.wrap ? "wrap" : "nowrap",
}));
</script>

<template>
  <div class="demo-row" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
}
</style>
