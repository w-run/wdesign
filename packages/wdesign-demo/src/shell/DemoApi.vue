<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import componentApi from "virtual:component-api";

/**
 * 右栏 API：属性 / 事件 / 插槽。
 *
 * 数据来自 `virtual:component-api` —— 构建期解析组件源码的 TS 类型与 JSDoc
 * （tools/extract-api.mjs）。**一个字都不是手写的**：手写文档必然和代码分家。
 *
 * 版式：右栏是和左边 demo 卡同族的白卡（同样的大圆角 + 柔影），
 * 每条属性按「名字 + 默认值 / 类型 / 说明」三段排。
 * 早先是裸表格贴在页面底色上，380px 里挤四列，像一张缩小的 Excel，最难读。
 */
const route = useRoute();

const names = computed<string[]>(() =>
  ((route.meta?.covers as string[] | undefined) ?? []).filter((n) => /^Wd[A-Z]/.test(n)),
);

/**
 * 组件源码的注释里常用反引号标代码（如「默认 `不限`」）。
 * 右栏是纯文本渲染，反引号会原样露出来，所以统一去掉 ——
 * 不改成 <code> 是有意为之：说明文字来自源码，走 v-html 等于开一个注入口。
 */
function plain(text: string) {
  return (
    text
      .replace(/`/g, "")
      // 说明里常写 `sm | md | lg` 这种枚举，竖线在等宽字体里又细又矮，
      // 连起来读像 "smlmdllg"。正文用中点分隔，只有类型行保留竖线。
      .replace(/\s*\|\s*/g, " · ")
  );
}

/**
 * `withDefaults` 的默认值展示：
 *   () => []  →  []          函数式默认值去掉箭头
 *   ''        →  （空）      空字符串单独标注，否则胶囊里什么都没有，像 bug
 */
function formatDefault(raw: string) {
  const value = raw.replace(/^\(\)\s*=>\s*/, "").trim();
  if (value === "''" || value === '""') return "空字符串";
  // undefined 表示"没有默认值"，不该渲染成一个写着 undefined 的粉色胶囊
  if (value === "undefined") return "";
  if (value === "() => []" || value === "[]") return "[]";
  return value;
}

const comps = computed(() =>
  names.value
    .map((name) => {
      const api = componentApi[name];
      return api ? { name, api } : null;
    })
    .filter((c): c is { name: string; api: NonNullable<(typeof componentApi)[string]> } =>
      Boolean(c),
    ),
);
</script>

<template>
  <div v-if="comps.length" class="api">
    <section v-for="c in comps" :key="c.name" class="api__card">
      <header class="api__head">
        <h2 class="api__comp">{{ c.name }}</h2>
        <p class="api__summary">
          <span>{{ c.api.props.length }} 属性</span>
          <span>{{ c.api.emits.length }} 事件</span>
          <span>{{ c.api.slots.length }} 插槽</span>
        </p>
      </header>

      <!-- 属性 -->
      <div v-if="c.api.props.length" class="api__group">
        <h3 class="api__label">属性</h3>
        <div class="api__items">
          <article v-for="p in c.api.props" :key="p.name" class="api__item">
            <div class="api__line">
              <code class="api__name">{{ p.name }}</code>
              <code v-if="formatDefault(p.default)" class="api__default">{{ formatDefault(p.default) }}</code>
            </div>
            <code class="api__type">{{ p.type }}</code>
            <p v-if="p.desc" class="api__desc">{{ plain(p.desc) }}</p>
          </article>
        </div>
      </div>

      <!-- 事件 -->
      <div v-if="c.api.emits.length" class="api__group">
        <h3 class="api__label">事件</h3>
        <div class="api__items">
          <article v-for="e in c.api.emits" :key="e.name" class="api__item">
            <div class="api__line">
              <code class="api__name">{{ e.name }}</code>
            </div>
            <code v-if="e.params" class="api__type">{{ e.params }}</code>
            <p v-if="e.desc" class="api__desc">{{ plain(e.desc) }}</p>
          </article>
        </div>
      </div>

      <!-- 插槽 -->
      <div v-if="c.api.slots.length" class="api__group">
        <h3 class="api__label">插槽</h3>
        <div class="api__items">
          <article v-for="s in c.api.slots" :key="s.name" class="api__item">
            <div class="api__line">
              <code class="api__name">{{ s.name === "default" ? "default" : s.name }}</code>
              <span class="api__note">{{ s.name === "default" ? "默认插槽" : "具名" }}</span>
            </div>
          </article>
        </div>
      </div>

      <p class="api__source">
        源码 <code>packages/wdesign-ui/src/components/{{ c.name }}.vue</code>
      </p>
    </section>
  </div>
</template>

<style scoped>
/* 与左侧 demo 卡同族的白卡：大圆角、柔影 */
.api__card {
  background: var(--wd-card);
  border-radius: var(--wd-radius-lg);
  padding: 24px 26px 26px;
  box-shadow: var(--wd-shadow);
}

.api__card + .api__card {
  margin-top: 20px;
}

.api__head {
  padding-bottom: 14px;
}

.api__comp {
  display: inline-block;
  margin: 0;
  padding: 5px 11px;
  border-radius: var(--wd-radius-xs);
  background: var(--wd-field);
  font-family: var(--wd-font-mono);
  font-size: 13px;
  font-weight: var(--wd-fw-semibold);
  letter-spacing: -0.01em;
  color: var(--wd-ink);
}

.api__summary {
  display: flex;
  gap: 12px;
  margin: 12px 0 0;
  font-size: 11.5px;
  color: var(--wd-ink-3);
}

.api__group + .api__group {
  margin-top: 22px;
}

.api__label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 2px;
  font-size: 11px;
  font-weight: var(--wd-fw-bold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--wd-ink-2);
}

.api__label::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--wd-ink-5);
}

.api__item {
  padding: 11px 0;
  box-shadow: inset 0 -1px 0 var(--wd-ink-5);
}

.api__item:last-child {
  padding-bottom: 2px;
  box-shadow: none;
}

.api__line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.api__name {
  font-family: var(--wd-font-mono);
  font-size: var(--wd-fs-body);
  font-weight: var(--wd-fw-semibold);
  color: var(--wd-ink);
}

/* 默认值：右边的小胶囊，一眼看出"这个可以不传" */
.api__default {
  flex: 0 0 auto;
  max-width: 56%;
  padding: 2px 8px;
  border-radius: var(--wd-radius-pill);
  background: var(--wd-tint-1);
  font-family: var(--wd-font-mono);
  font-size: 11.5px;
  color: var(--wd-ink-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 类型单独一行：'primary' | 'tint' | 'dark' | 'ghost' 这种长联合类型
   挤在名字右边，名字会被压没 */
.api__type {
  display: block;
  margin-top: 4px;
  font-family: var(--wd-font-mono);
  font-size: 13px;
  line-height: 1.55;
  color: var(--wd-ink-2);
  word-break: break-word;
}

.api__desc {
  margin: 6px 0 0;
  font-size: 13.5px;
  line-height: 1.7;
  font-weight: var(--wd-fw-regular);
  color: var(--wd-ink-2);
}

/* 卡片底部标一行源码位置：既是"想深看"的出口，也让短 API 的卡片不至于空一截 */
.api__source {
  margin: 18px 0 0;
  padding-top: 12px;
  box-shadow: inset 0 1px 0 var(--wd-ink-5);
  font-size: 11.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}

.api__source code {
  font-family: var(--wd-font-mono);
  font-size: 11.5px;
  color: var(--wd-ink);
  word-break: break-all;
}

.api__note {
  font-size: 11.5px;
  color: var(--wd-ink-3);
}
</style>
