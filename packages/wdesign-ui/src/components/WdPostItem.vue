<script setup lang="ts">
/**
 * WdPostItem — 文章条目
 * 反向迭代（源：w-run/blog 的文章列表项）
 * 刻意不含日期字段（便于批量导入、不暴露新旧）
 */
defineOptions({ name: 'WdPostItem' })

withDefaults(
  defineProps<{
    /** 标题文字，必填 */
    title: string
    /** 摘要文字，留空则该行不渲染 */
    summary?: string
    /** 标签列表，以灰色小标签排在摘要下方 */
    tags?: string[]
    /** 标题前的小图标，传 emoji 字符，留空则不显示 */
    emoji?: string
    /** 链接地址，传了整条渲染为 a 标签，否则为普通容器 */
    href?: string
  }>(),
  { tags: () => [] },
)
</script>

<template>
  <component :is="href ? 'a' : 'div'" :href="href" class="wd-post-item">
    <h3 class="wd-post-item__title">
      <span v-if="emoji" class="wd-post-item__emoji">{{ emoji }}</span>{{ title }}
    </h3>
    <p v-if="summary" class="wd-post-item__summary">{{ summary }}</p>
    <div v-if="tags.length" class="wd-post-item__tags">
      <span v-for="t in tags" :key="t" class="wd-tag wd-tag--sm wd-tag--gray">{{ t }}</span>
    </div>
  </component>
</template>
