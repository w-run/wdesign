<script setup lang="ts">
import { computed, provide } from "vue";
import { useRoute } from "vue-router";
import DemoApi from "./DemoApi.vue";

/**
 * demo 页面的外壳：眉标 + 大标题 + 说明 + 内容区。
 *
 * 版式语言照抄 iSH 存档里那套（用户认这一版）：
 *   眉标  11.5px 全大写 + .16em 字距 + 红点
 *   标题  clamp(34–46px) / 800 / -.035em / lh 1.08 —— 页面第一眼要有分量
 *   说明  15px / 1.75，限宽 62ch 保证可读
 *
 * 「本页包含」读路由 meta.covers —— 变体合并的页面（Avatar + AvatarGroup、
 * Form + FormItem）在 router.ts 里声明了覆盖范围，页面自己不用重复。
 *
 * 之前只有 32px 标题 + 14px 说明，和卡片里 15px 的小标之间没有层级过渡，
 * 整页读起来就是"一叠白盒子"，没有主次。
 */
const props = defineProps<{
  /** 组件名（不含 Wd 前缀），显示在页面标题 */
  name: string;
  /** 一句话说明 */
  desc?: string;
}>();

/**
 * 给 DemoBlock 发序号：源码面板要按"第几块"去取本页对应的模板原文。
 * setup 顺序 = 模板里的出现顺序，所以自增是确定性的；
 * 每次进页面 DemoPage 重建、计数归零。
 */
let blockSeq = 0;
provide("wd-demo-index", () => blockSeq++);


const route = useRoute();
const meta = computed(
  () => route.meta as { group?: string; covers?: string[]; order?: number },
);

const eyebrow = computed(() => {
  const group = meta.value.group ?? "组件";
  const order = meta.value.order;
  return order ? `${group} · ${String(order).padStart(2, "0")}` : group;
});

const covers = computed<string[]>(() => meta.value.covers ?? []);
</script>

<template>
  <article class="demo-page">
    <div class="demo-page__main">
      <header class="demo-page__head">
        <p class="demo-page__eyebrow">
          <span class="demo-page__dot" aria-hidden="true"></span>{{ eyebrow }}
        </p>
        <h1 class="demo-page__title">{{ props.name }}</h1>
        <p v-if="props.desc" class="demo-page__desc">{{ props.desc }}</p>
        <p v-if="covers.length" class="demo-page__covers">
          <span class="demo-page__covers-label">组件</span>{{ covers.join(" · ") }}
        </p>
      </header>
      <div class="demo-page__body">
        <slot />
      </div>
    </div>

    <aside class="demo-page__aside">
      <DemoApi />
    </aside>
  </article>
</template>

<style scoped>
/*
 * 左右双栏：主栏是单列的文档卡片，右栏是页内目录。
 *
 * 不限宽（吃满内容区），但正文行长靠右栏自然收住 ——
 * 单栏 + 全屏时会拉出 1500px 的行宽，读起来眼要来回扫。
 * 窄屏时右栏直接不显示，退回纯单栏。
 */
.demo-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(380px, 30vw);
  gap: clamp(28px, 3vw, 56px);
  align-items: start;
  width: 100%;
  padding-top: clamp(28px, 4vw, 56px);
}

.demo-page__aside {
  position: sticky;
  top: 12px;
  max-height: calc(100vh - 24px);
  padding: 8px 0 32px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
}

@media (max-width: 1180px) {
  .demo-page {
    grid-template-columns: minmax(0, 1fr);
  }

  /* 窄屏：API 落到正文下面，内容顺序不变（先看示例再看参数） */
  .demo-page__aside {
    position: static;
    max-height: none;
    overflow: visible;
    padding-top: 8px;
    box-shadow: inset 0 1px 0 var(--wd-ink-5);
  }
}

.demo-page__head {
  margin-bottom: clamp(28px, 3vw, 44px);
}

.demo-page__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  font-size: 11.5px;
  font-weight: var(--wd-fw-semibold);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--wd-ink-2);
}

.demo-page__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--wd-red);
}

.demo-page__title {
  margin: 0;
  font-size: var(--wd-fs-display);
  font-weight: var(--wd-fw-black);
  line-height: 1.02;
  letter-spacing: -0.045em;
  color: var(--wd-ink);
}

.demo-page__desc {
  max-width: 54ch;
  margin: 18px 0 0;
  /* 页面说明比卡片正文大一档（16 vs 14.5）—— 参考站的副标题都是正文的 1.2 倍，
     行高也放到 1.8（Apple / 鸿蒙首页都在 1.7~1.9 之间） */
  font-size: 16px;
  line-height: 1.8;
  font-weight: var(--wd-fw-regular);
  color: var(--wd-ink-2);
}

/* 覆盖范围：等宽字体、小一号、更淡，像脚注而不是正文 */
.demo-page__covers {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0 0;
  font-family: var(--wd-font-mono);
  font-size: 11.5px;
  letter-spacing: 0.02em;
  color: var(--wd-ink-2);
}

.demo-page__covers-label {
  padding: 3px 8px;
  border-radius: var(--wd-radius-xs);
  background: var(--wd-field);
  font-family: var(--wd-font-family);
  font-size: 10.5px;
  font-weight: var(--wd-fw-semibold);
  letter-spacing: 0.08em;
  /* 「组件」这个小标签原来是 ink-3（1.93:1，几乎看不见），提到 ink-2 */
  color: var(--wd-ink-2);
}

/*
 * 单栏：一页就是一列文档卡片，从上往下读。
 *
 * 试过卡片墙（按内容宽度 flex-wrap 排），信息密度是上去了，
 * 但代码面板一展开，右侧卡片被顶得参差不齐，读起来反而更累。
 * 组件文档的正确形态是"一条线"：标题 → 预览 → 代码 → 下一个。
 */
/*
 * 卡片宽度：**同一页内取齐**。
 * 各块按自身内容 fit-content 时，Edge 会参差不齐（610 / 420 / 300），
 * 左边缘对齐、右边缘像被啃过 —— 看着像手工摆的，不像成体系。
 * 用 inline-grid + max-content 列：列宽 = 本页最宽的那块，
 * 其余卡片跟着对齐，又不会撑满整列留出大片空白。
 */
.demo-page__body :deep(.demo-block) {
  /* 卡片撑满列宽：一页内所有卡片同宽（右边缘齐），又不会被 fit-content 收窄。
     必须走 :deep()：`.demo-block` 自己那条 `width: fit-content` 带 scoped 属性，
     权重更高，直接写会被盖掉。 */
  width: 100%;
}

.demo-page__body {
  /*
   * 必须是 1fr（占满可用宽度），不能用 max-content。
   * 用 max-content 时列宽 = 本页最宽那张卡片（约 613），剩下的空间就变成
   * 正文和右侧 API 卡之间的一条"东非大裂谷"。
   * 卡片宽度交给 `.demo-block { width: 100% }` 统一撑开，边缘照样齐。
   */
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: minmax(0, 1fr);
  /* 区块间距 28：参考站分区间距大于元素间距 */
  gap: 28px;
  width: 100%;
  min-width: 0;
}

/*
 * 入场：每块错开 40ms 往上沉一下。
 *
 * ⚠️ 只做 transform，不做 opacity —— 用透明度入场的写法在无头渲染、
 *    后台标签页、动画时钟停摆的环境里会卡在起始帧，元素永久不可见
 *    （这条坑在 .agents/memory/03-pitfalls.md 第 1 条记着）。
 *    纯位移即使停摆，最多只是位置差 10px，内容照常可读。
 */
@keyframes wd-demo-rise {
  from {
    transform: translateY(10px);
  }
  to {
    transform: none;
  }
}

.demo-page__body > * {
  animation: wd-demo-rise 0.5s var(--wd-ease-out) both;
}

.demo-page__body > :nth-child(2) {
  animation-delay: 0.04s;
}
.demo-page__body > :nth-child(3) {
  animation-delay: 0.08s;
}
.demo-page__body > :nth-child(4) {
  animation-delay: 0.12s;
}
.demo-page__body > :nth-child(5) {
  animation-delay: 0.16s;
}
.demo-page__body > :nth-child(n + 6) {
  animation-delay: 0.2s;
}

@media (prefers-reduced-motion: reduce) {
  .demo-page__body > * {
    animation: none;
  }
}
/*
 * 窄屏标题：--wd-fs-display 是 clamp(40px, 3.4vw, 56px)，内容列放不下 "DateTimePicker"，
 * 溢出后被裁成 "DateTimeP"。改成随视口收缩，并允许长单词断行兜底。
 */
@media (max-width: 720px) {
  .demo-page__title {
    /* 再收到 8.6vw："DateTimePicker" 这种长名字在 390 屏能整词落一行，
       而不是断成 "DateTimePic / ker" */
    font-size: clamp(26px, 8.6vw, 56px);
    letter-spacing: -0.03em;
    overflow-wrap: anywhere;
  }
}

</style>
