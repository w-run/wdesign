<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { routes } from "../router";

const route = useRoute();
const dark = ref(false);

/** 按 group 分组的路由列表 */
const groups = computed(() => {
  const out = new Map<string, Array<{ path: string; title: string; order: number }>>();
  for (const r of routes) {
    const m = r.meta as any;
    if (!m?.group) continue;
    const path = r.path === "/" ? "/" : "/" + String(r.path).replace(/^\//, "");
    if (!out.has(m.group)) out.set(m.group, []);
    out.get(m.group)!.push({ path, title: m.title, order: m.order ?? 99 });
  }
  for (const list of out.values()) list.sort((a, b) => a.order - b.order);
  return [...out.entries()];
});

function toggleDark() {
  dark.value = !dark.value;
  document.documentElement.dataset.theme = dark.value ? "dark" : "light";
}
</script>

<template>
  <aside class="demo-side">
    <RouterLink to="/" class="side-brand">
      WDesign<span class="side-brand-dot"></span>
    </RouterLink>

    <nav class="side-nav">
      <template v-for="grp in groups" :key="grp[0]">
        <div class="side-group">{{ grp[0] }}</div>
        <RouterLink
          v-for="it in grp[1]"
          :key="it.path"
          :to="it.path"
          class="side-link"
          :class="{ 'is-active': route.path === it.path }"
        >
          {{ it.title }}
        </RouterLink>
      </template>
    </nav>

    <div class="side-foot">
      <span class="side-version">v1.0</span>
      <button class="side-theme" type="button" @click="toggleDark" title="切换主题">
        {{ dark ? "☀" : "☾" }}
      </button>
    </div>
  </aside>
</template>
