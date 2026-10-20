<script setup lang="ts">
/** 横向排列的示例行 */
withDefaults(defineProps<{ gap?: number; align?: string; wrap?: boolean }>(), {
  gap: 12,
  align: "center",
  wrap: true,
});
</script>

<template>
  <div
    class="demo-row"
    :style="{ gap: gap + px, alignItems: align, flexWrap: wrap ? wrap : nowrap }"
  >
    <slot />
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
}
</style>
