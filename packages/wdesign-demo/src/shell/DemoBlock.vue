<script setup lang="ts">
/**
 * demo 页面的标准区块。
 *
 * 版式语言照抄 iSH 存档那版（那版"有设计感"的关键就在这个面板）：
 *   · 标题 11.5px 全大写 + .12em 字距 + 前面一根 18×2 的彩色短杠
 *     —— 全站 76 页 × 4 块 ≈ 300 个面板，如果每块都染主题红，
 *        红就失去"强调"的意义了；所以用彩虹色按顺序轮换，
 *        它不承载语义，只做版面锚点（见 COLOR-DISCIPLINE.md）
 *   · 白卡 + shadow-sm，hover 抬到 shadow-hover
 *   · 上内距 26 / 侧 30：之前 24/28 配 15px 标题，显得又挤又小
 *
 * ⚠️ 入场只做位移不做透明度。用 opacity 做入场的话，在无头渲染 /
 *    后台标签页 / 动画时钟停摆的环境里会卡在起始帧——元素永久不可见。
 *    纯 transform 即使停摆也只是位置差几像素，内容照常可读。
 */
const props = withDefaults(
  defineProps<{
    /** 区块标题 */
    title?: string;
    /** 补充说明 */
    desc?: string;
    /** 跨列：1 = 半宽（默认），2 = 整宽（表格 / 播放器 / 日历这类宽内容） */
    span?: 1 | 2;
  }>(),
  { span: 1 },
);
</script>

<template>
  <section class="demo-block" :class="{ 'demo-block--wide': props.span === 2 }">
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
  padding: 26px 30px 28px;
  /* 用 30px 大扩散的柔影，而不是 12px 的小影：浅灰底上小影几乎看不见，
     卡片会"贴"在背景上，整页像一块白板 */
  box-shadow: var(--wd-shadow);
  transition:
    box-shadow var(--wd-dur-slow) var(--wd-ease-out),
    transform var(--wd-dur-slow) var(--wd-ease-out);
}

.demo-block:hover {
  box-shadow: var(--wd-shadow-hover);
}

/* 宽内容跨满两列 */
.demo-block--wide {
  grid-column: 1 / -1;
}

.demo-block__head {
  margin-bottom: 20px;
}

.demo-block__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  /* 标题用深灰不用主题红：300 个面板全红等于没有强调 */
  color: var(--wd-ink-2);
}

/* 标题前的彩色短杠：按面板顺序轮换色相，给每一块自己的坐标 */
.demo-block__title::before {
  content: "";
  display: inline-block;
  width: 18px;
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
  font-size: 13px;
  line-height: 1.65;
  color: var(--wd-ink-3);
}

.demo-block__body {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
