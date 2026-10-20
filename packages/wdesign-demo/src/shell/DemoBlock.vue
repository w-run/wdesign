<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { useRoute } from "vue-router";
import demoCode from "virtual:demo-code";

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
      <pre class="demo-block__pre"><code>{{ code }}</code></pre>
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
}

.demo-block__head {
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
  /* 参考集里卡片标题是 15~16px、正常大小写、600 字重；
     11.5px 全大写那套是"杂志小标"的路子，放在这里显得又小又用力 */
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
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
  margin: 7px 0 0;
  font-size: 13.5px;
  line-height: 1.65;
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
  font-weight: 700;
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
  font-size: 12.5px;
  line-height: 1.75;
  color: var(--wd-ink-2);
  tab-size: 2;
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
  font-weight: 700;
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
