<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { useRoute } from "vue-router";
import demoCode from "virtual:demo-code";
import { highlightTemplate } from "./highlight";

/**
 * 文档卡片：预览 + 源码。
 *
 * 源码不是手写的 —— 由 `tools/demo-code-plugin.mjs` 在构建期把本页
 * 这个 <DemoBlock> 的模板原文抽出来（`virtual:demo-code`），按注册顺序对齐。
 * 手写一份"示例代码"必然会跟 demo 漂移，那种不一致最难发现。
 *
 * 版式沿用 iSH 存档那套：11.5px 全大写标题 + 18×2 彩色短杠（按顺序轮换色相，
 * 不染红）、白卡 + 柔影 + hover 抬升。
 *
 * ⚠️ 入场只做位移不做透明度：opacity 入场在无头渲染 / 后台标签页 /
 *    动画时钟停摆的环境里会卡在起始帧，元素永久不可见（pitfalls 第 1 条）。
 */
const props = withDefaults(
  defineProps<{
    /** 区块标题 */
    title?: string;
    /** 补充说明 */
    desc?: string;
    /** 默认展开源码 */
    defaultOpen?: boolean;
  }>(),
  { defaultOpen: false },
);

/** 由 DemoPage 提供的自增序号，保证代码和卡片一一对应 */
const registerIndex = inject<(() => number) | null>("wd-demo-index", null);
const index = registerIndex ? registerIndex() : -1;

const route = useRoute();
const code = computed(() => demoCode[route.path]?.[index] ?? "");


const highlighted = computed(() => highlightTemplate(code.value));

const open = ref(props.defaultOpen);
const copied = ref<"" | "ok" | "fail">("");

async function copyCode() {
  try {
    await navigator.clipboard.writeText(code.value);
    copied.value = "ok";
  } catch {
    copied.value = "fail";
  }
  window.setTimeout(() => (copied.value = ""), 1600);
}
</script>

<template>
  <section class="demo-block">
    <header class="demo-block__head">
      <div class="demo-block__meta">
        <h3 v-if="title" class="demo-block__title">{{ title }}</h3>
        <p v-if="desc" class="demo-block__desc">{{ desc }}</p>
      </div>
      <button
        v-if="code"
        type="button"
        class="demo-block__more"
        :class="{ 'is-open': open }"
        :aria-expanded="open"
        @click="open = !open"
      >
        {{ open ? "收起代码" : "代码" }}
      </button>
    </header>

    <div class="demo-block__preview">
      <slot />
    </div>

    <div v-if="open && code" class="demo-block__code">
      <!-- v-html 的内容来自 highlightTemplate，所有文本都做过了转义 -->
      <pre class="demo-block__pre"><code v-html="highlighted"></code></pre>
      <button type="button" class="demo-block__copy" @click="copyCode">
        {{ copied === "ok" ? "已复制" : copied === "fail" ? "复制失败" : "复制" }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.demo-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /*
   * 宽度跟着内容走：三两个按钮的示例不该撑成 780px 的白条。
   * min-width 保证标题区不至于挤成一条；max-width 保证宽内容（表格/播放器）
   * 仍然吃满整列。代码面板展开时卡片会变宽 —— 那是用户主动要看的，
   * 而且源码本来就需要横向空间。
   */
  width: fit-content;
  min-width: 300px;
  max-width: 100%;
  background: var(--wd-card);
  border-radius: var(--wd-radius-lg);
  padding: 24px 28px 26px;
  box-shadow: var(--wd-shadow);
  transition:
    box-shadow var(--wd-dur-slow) var(--wd-ease-out),
    transform var(--wd-dur-slow) var(--wd-ease-out);
}

.demo-block:hover {
  box-shadow: var(--wd-shadow-hover);
  /* 只换阴影太"安静"，抬 2px 才有实体感；缓动用弹簧，收得干脆 */
  transform: translateY(-2px);
}

.demo-block__head {
  gap: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
}

.demo-block__meta {
  /* 说明限宽，否则它自己的 max-content 会把卡片撑宽 */
  max-width: 46ch;
}

.demo-block__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  /* 卡片标题走 heading 档（17px / 650）：和正文 14.5 拉开 1.17 倍，
     再靠字重差（650 vs 450）把层级压实 —— toC 界面的"设计感"主要来自这里 */
  font-size: var(--wd-fs-heading);
  font-weight: var(--wd-fw-semibold);
  letter-spacing: -0.015em;
  color: var(--wd-ink);
}

/* 标题前的彩色短杠：按卡片顺序轮换色相，给每一块自己的坐标 */
.demo-block__title::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 2px;
  border-radius: var(--wd-radius-pill);
  background: var(--wd-ink-4);
}

.demo-block:nth-child(8n + 1) .demo-block__title::before {
  background: var(--wd-rainbow-red);
}
.demo-block:nth-child(8n + 2) .demo-block__title::before {
  background: var(--wd-rainbow-orange);
}
.demo-block:nth-child(8n + 3) .demo-block__title::before {
  background: var(--wd-rainbow-amber);
}
.demo-block:nth-child(8n + 4) .demo-block__title::before {
  background: var(--wd-rainbow-green);
}
.demo-block:nth-child(8n + 5) .demo-block__title::before {
  background: var(--wd-rainbow-teal);
}
.demo-block:nth-child(8n + 6) .demo-block__title::before {
  background: var(--wd-rainbow-blue);
}
.demo-block:nth-child(8n + 7) .demo-block__title::before {
  background: var(--wd-rainbow-indigo);
}
.demo-block:nth-child(8n + 8) .demo-block__title::before {
  background: var(--wd-rainbow-violet);
}

.demo-block__desc {
  margin: 8px 0 0;
  font-size: var(--wd-fs-body);
  /* 行高 1.7 → 1.8：中文正文 14.5px 在 1.7 下密不透风，参考站都在 1.8 以上 */
  line-height: 1.8;
  font-weight: var(--wd-fw-regular);
  color: var(--wd-ink-2);
}

/* 代码开关：小胶囊，不跟内容抢注意力 */
.demo-block__more {
  flex: 0 0 auto;
  height: 26px;
  padding: 0 12px;
  border: 0;
  border-radius: var(--wd-radius-pill);
  background: var(--wd-field);
  font-family: var(--wd-font-family);
  font-size: 11.5px;
  font-weight: var(--wd-fw-semibold);
  letter-spacing: 0.04em;
  color: var(--wd-ink-2);
  cursor: pointer;
  transition:
    background var(--wd-dur-fast) var(--wd-ease-smooth),
    color var(--wd-dur-fast) var(--wd-ease-smooth);
}

.demo-block__more:hover {
  background: var(--wd-ink-5);
  color: var(--wd-ink);
}

.demo-block__more.is-open {
  background: var(--wd-ink);
  color: var(--wd-card);
}

.demo-block__preview {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* ---------------- 源码区 ---------------- */
.demo-block__code {
  position: relative;
  margin-top: 20px;
  border-radius: var(--wd-radius-md);
  background: var(--wd-field);
}

.demo-block__pre {
  margin: 0;
  padding: 18px 20px;
  /* 长示例别把一张卡撑成两屏高，超出内部滚动 */
  max-height: 420px;
  /* 源码横向限宽：否则一行长模板会把卡片顶到整列宽，白白撑开 */
  max-width: 660px;
  overflow: auto;
  font-family: var(--wd-font-mono);
  /* Monaspace 更宽更胀，代码块同字号降半档；中文走思源（92% size-adjust） */
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--wd-ink-2);
  tab-size: 2;
}

.demo-block__pre code {
  font-family: inherit;
}

/* 语法着色：只区分「标签 / 属性 / 字符串 / 插值」四类，够读就行。
   颜色取自装饰用的彩虹令牌（不承载语义），深色主题下同样成立。 */
.demo-block__pre :deep(.tk-tag) {
  color: var(--wd-ink);
  font-weight: var(--wd-fw-medium);
}

.demo-block__pre :deep(.tk-attr) {
  color: var(--wd-rainbow-indigo);
}

.demo-block__pre :deep(.tk-str) {
  color: var(--wd-rainbow-green);
}

.demo-block__pre :deep(.tk-interp) {
  color: var(--wd-rainbow-amber);
}

.demo-block__pre :deep(.tk-punct) {
  color: var(--wd-ink-4);
}

.demo-block__pre :deep(.tk-comment) {
  color: var(--wd-ink-4);
  font-style: italic;
}

.demo-block__copy {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 24px;
  padding: 0 10px;
  border: 0;
  border-radius: var(--wd-radius-xs);
  background: var(--wd-card);
  font-family: var(--wd-font-family);
  font-size: 11px;
  font-weight: var(--wd-fw-semibold);
  color: var(--wd-ink-2);
  cursor: pointer;
  box-shadow: var(--wd-shadow-sm);
  transition:
    color var(--wd-dur-fast) var(--wd-ease-smooth),
    background var(--wd-dur-fast) var(--wd-ease-smooth);
}

.demo-block__copy:hover {
  color: var(--wd-ink);
}
</style>
