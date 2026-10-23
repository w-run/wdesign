<script setup lang="ts">
import { computed } from "vue";
import { routes } from "@/router";

/**
 * 首页：先把「这是什么」说清楚，再给一份索引。
 *
 * 版式照 iSH 存档那一版的首屏语言：
 *   上方 11.5px 全大写眉标 + 红点、clamp 大字宣言（两行，第二行压成灰）、
 *   上下内距给足（clamp 到 120），让标题悬在页面上部而不是贴着顶边。
 * 之前这里是两行占位文字，等于把整个演示站的门面空着。
 */
const groups = computed(() => {
  const out = new Map<string, Array<{ path: string; title: string; order: number }>>();
  for (const r of routes) {
    const meta = r.meta as { group?: string; title?: string; order?: number };
    if (!meta?.group) continue;
    if (!out.has(meta.group)) out.set(meta.group, []);
    out.get(meta.group)!.push({
      path: r.path,
      title: meta.title ?? String(r.name),
      order: meta.order ?? 99,
    });
  }
  for (const list of out.values()) list.sort((a, b) => a.order - b.order);
  return [...out.entries()];
});

const stats = [
  { value: "76", label: "Components" },
  { value: "595", label: "Icons" },
  { value: "141", label: "Tokens" },
];
</script>

<template>
  <div class="home">
    <header class="home__hero">
      <p class="home__eyebrow">
        <span class="home__dot" aria-hidden="true"></span>WDesign · Design System
      </p>
      <h1 class="home__title">
        <span>无边框，色块分层。</span>
        <span class="home__title-sub">一组件一页面，全部可交互。</span>
      </h1>
      <p class="home__desc">
        主题红 <code>#D62839</code> 只做点缀，区域靠底色与留白区分；
        全部尺寸、颜色、动效都从令牌取值，改一处即换肤。
      </p>
      <ul class="home__stats">
        <li v-for="s in stats" :key="s.label" class="home__stat">
          <b class="home__stat-value">{{ s.value }}</b>
          <span class="home__stat-label">{{ s.label }}</span>
        </li>
      </ul>
    </header>

    <section v-for="[group, items] in groups" :key="group" class="home__group">
      <h2 class="home__group-title">
        {{ group }}<span class="home__group-count">{{ items.length }}</span>
      </h2>
      <div class="home__links">
        <RouterLink v-for="it in items" :key="it.path" :to="it.path" class="home__link">
          {{ it.title }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  /* 首页同样吃满内容区宽度 */
  width: 100%;
  padding-bottom: 40px;

  /*
   * 首屏专用字阶。
   * --wd-fs-display 的上限 56 是「页面主标题」的档位；首页宣言要撑住一屏，
   * 单独开一档而不是在页面里写裸 68px —— 否则「全站字号只走令牌」就破了例。
   */
  --home-hero-size: clamp(40px, 5.4vw, 68px);
  --home-stat-size: clamp(28px, 2.4vw, 34px);
}

/* ---------------- 首屏 ---------------- */
.home__hero {
  /* 留白本身就是内容：标题悬在页面上部，不贴顶 */
  padding: clamp(48px, 9vw, 120px) 0 clamp(24px, 4vw, 56px);
}

.home__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 26px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--wd-ink-2);
}

.home__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--wd-red);
}

.home__title {
  display: flex;
  flex-direction: column;
  margin: 0 0 28px;
  font-size: var(--home-hero-size);
  font-weight: var(--wd-fw-black);
  line-height: 1.06;
  letter-spacing: -0.04em;
  color: var(--wd-ink);
}

/*
 * 第二行压成灰：层次靠明度，不靠颜色。
 *
 * ⚠️ 这里不能用 --wd-ink-3：#A5ADB8 落在 #F3F4F7 上只有 2.1:1，
 * 68px 的大字也够不上 3:1 的底线 —— 远看像「没加载出来的占位符」。
 * 换成 --wd-ink-2（≈5:1），两行之间仍有近黑的明度差，层级不掉。
 */
.home__title-sub {
  color: var(--wd-ink-2);
}

.home__desc {
  max-width: 62ch;
  margin: 0;
  font-size: 15px;
  line-height: 1.75;
  color: var(--wd-ink-2);
}

.home__desc code {
  padding: 2px 7px;
  border-radius: var(--wd-radius-xs);
  background: var(--wd-field);
  font-family: var(--wd-font-mono);
  font-size: 13px;
}

.home__stats {
  display: flex;
  gap: 56px;
  margin: 44px 0 0;
  padding: 0;
  list-style: none;
}

.home__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.home__stat-value {
  font-size: var(--home-stat-size);
  font-weight: var(--wd-fw-bold);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--wd-ink);
}

.home__stat-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wd-ink-3);
}

/* ---------------- 索引 ---------------- */
.home__group {
  margin-top: clamp(28px, 3vw, 44px);
}

.home__group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  font-size: 11.5px;
  font-weight: var(--wd-fw-bold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wd-ink-2);
}

.home__group-title::before {
  content: "";
  width: 18px;
  height: 2px;
  border-radius: var(--wd-radius-pill);
  background: var(--wd-ink-4);
}

.home__group-count {
  font-family: var(--wd-font-mono);
  font-size: 11px;
  letter-spacing: 0;
  color: var(--wd-ink-3);
}

.home__links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.home__link {
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 0 18px;
  border-radius: var(--wd-radius-pill);
  background: var(--wd-card);
  box-shadow: var(--wd-shadow-sm);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--wd-ink-2);
  text-decoration: none;
  transition:
    transform var(--wd-dur-slow) var(--wd-ease-spring-soft),
    box-shadow var(--wd-dur-slow) var(--wd-ease-out),
    color var(--wd-dur-fast) var(--wd-ease-smooth);
}

.home__link:hover {
  transform: translateY(-2px);
  box-shadow: var(--wd-shadow-hover);
  color: var(--wd-ink);
}
</style>
