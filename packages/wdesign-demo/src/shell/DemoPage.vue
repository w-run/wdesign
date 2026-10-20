<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

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
  </article>
</template>

<style scoped>
.demo-page {
  /* 收窄到 960：面板满宽时不至于把三个小按钮摊成一条 1000px 的空白带 */
  max-width: 960px;
  margin: 0 auto;
  padding-top: clamp(28px, 4vw, 56px);
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
  font-weight: 700;
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
  font-size: clamp(34px, 3.4vw, 46px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: var(--wd-ink);
}

.demo-page__desc {
  max-width: 62ch;
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.75;
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
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--wd-ink-3);
}

/*
 * 内容区用两列网格，而不是一列堆叠。
 *
 * 单列时每张卡片都是 900 宽、里面只有三五个按钮，右边一大片死白 ——
 * 这就是"小气吧啦"的直接来源：密度低、留白不成形。
 * 参考图（dashboard / 卡片墙）都是网格：一屏能扫到三四块，留白被自然填满。
 *
 * 宽内容（表格、播放器、日历…）用 DemoBlock 的 span=2 跨两列。
 */
.demo-page__body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
  align-items: start;
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
</style>
