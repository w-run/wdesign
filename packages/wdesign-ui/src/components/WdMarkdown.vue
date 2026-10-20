<script setup lang="ts">
import { computed } from 'vue'
import { parseMarkdown } from './markdown'

defineOptions({ name: 'WdMarkdown' })

const props = withDefaults(
  defineProps<{
    /** Markdown 源文本 */
    source?: string
    /**
     * 已渲染好的 HTML。
     * 传了这个就完全跳过内置解析 —— 适合已经有完整 Markdown
     * 处理管线（marked / markdown-it + 自定义插件）的场景。
     *
     * ⚠️ 这是**唯一**会把原始 HTML 注入的地方，调用方必须自行保证安全。
     */
    html?: string
    /** 去掉外层 .wd-markdown 的左右内距（嵌在已有 padding 的卡片里时用） */
    flush?: boolean
  }>(),
  { source: '', html: '', flush: false },
)

/**
 * 渲染结果。
 *
 * 安全说明：内置解析器（markdown.ts）会把所有文本都 escape，
 * 因此 `source` 路径是安全的；`html` 路径则信任调用方。
 * 这个区分很重要 —— WdMarkdown 常用来渲染 AI 生成的回复，
 * 直接 v-html 原始输入会有 XSS 风险。
 */
const rendered = computed(() =>
  props.html ? props.html : parseMarkdown(props.source),
)
</script>

<template>
  <article class="wd-markdown" :class="{ 'wd-markdown--flush': flush }" v-html="rendered"></article>
</template>
