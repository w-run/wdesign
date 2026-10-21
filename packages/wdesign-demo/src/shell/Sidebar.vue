<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { WdNav } from "@wdesign";
import { routes } from "../router";

/**
 * 演示站的侧栏 —— 用组件库自己的 WdNav 搭。
 *
 * 之前这里是手写的 `.side-link` 列表：等于自建了一套导航样式，字号/行高/选中态
 * 都和 WdNav 不一样，演示站反而成了"组件库之外的一版设计"。
 * 用自己的组件，改了 WdNav 演示站立刻跟着变，也顺带当了一回真实用例。
 */
const route = useRoute();
const dark = ref(false);

/**
 * 每一项一个图标 —— 参考集的侧栏是图标驱动的，76 项全用同一组图标
 * （或退回首字母占位）会变成一列没有信息量的方块/字母。
 * 名字全部取自 `packages/icons/icons/outlined/`，只允许真实存在的。
 */
const PAGE_ICON: Record<string, string> = {
  "affix": "anchor",
  "ai-message": "bot",
  "alert": "info-circle",
  "audio-player": "headphones",
  "avatar": "avatar-female",
  "backtop": "go-top",
  "badge": "circle-alt",
  "breadcrumb": "chevron-right",
  "button": "button",
  "calendar": "calendar-alt",
  "card": "card",
  "carousel": "image",
  "cascader": "hierarchy",
  "checkbox": "check-square",
  "collapse": "chevrons-down",
  "color-picker": "brush",
  "command": "command",
  "container": "layout",
  "danmaku": "message-topic",
  "date-picker": "calendar",
  "datetime-picker": "calendar-check",
  "descriptions": "list-right",
  "divider": "hr-line",
  "drawer": "list-left",
  "dropdown": "chevron-down",
  "empty": "box-ok",
  "explorer": "folder-manage",
  "file-list": "folder-line",
  "form": "edit",
  "grid": "layout-grid",
  "group": "user-group",
  "image-preview": "camera",
  "input": "input",
  "list-item": "list",
  "markdown": "markdown",
  "media-card": "camera-pc",
  "mentions": "at",
  "modal": "maximize",
  "nav": "menu",
  "notification": "bell",
  "otp": "keypad-pin",
  "pagination": "list-left",
  "popconfirm": "help-circle",
  "popover": "message-square",
  "post-item": "file-edit",
  "progress": "activity",
  "qrcode": "hash",
  "radio": "circle",
  "rate": "award",
  "result": "check-circle",
  "scrollbar": "align-right",
  "segmented": "columns",
  "select": "list",
  "skeleton": "dots-horizontal",
  "slider": "align-justify",
  "sortable-list": "dots-drag",
  "space": "centered-horizontal",
  "spinner": "activity",
  "splitter": "columns",
  "statistic": "chart",
  "steps": "flag",
  "switch": "sliders-box",
  "table": "bar-chart",
  "tabs": "columns",
  "tag": "tag",
  "time-picker": "clock",
  "timeline": "history",
  "toast": "message-circle",
  "tooltip": "message",
  "transfer": "box-back",
  "tree": "git-branch",
  "upload": "cloud-upload",
  "video-player": "play-circle",
  "virtual-list": "list-alt",
  "watermark": "droplet"
};

/** WdNavItem 的形状（组件库没 re-export 这个类型，演示站自己声明） */
interface NavItem {
  key: string;
  label: string;
  href: string;
  group: string;
  icon: string;
}

const items = computed<NavItem[]>(() =>
  routes
    .filter((r) => (r.meta as { group?: string } | undefined)?.group)
    .map((r) => {
      const meta = r.meta as { group: string; title: string; order?: number };
      const slug = r.path.replace(/^\//, "");
      return {
        key: r.path,
        label: meta.title,
        href: `#${r.path}`,
        group: meta.group,
        icon: PAGE_ICON[slug] ?? "dots-circle",
      };
    }),
);

/**
 * 首屏只展开"当前项所在的分组"，其余收起 —— 76 项一屏放不下，
 * 全展开等于让用户自己往下刨。之后点分组头可自由开合，
 * 换页时 WdNav 会自动把目标分组展开并把当前项滚进视野。
 */
const defaultCollapsed = computed(() => {
  const groups = [...new Set(items.value.map((i) => i.group))];
  const activeGroup = items.value.find((i) => i.key === route.path)?.group;
  return groups.filter((g) => g !== activeGroup);
});

function toggleDark() {
  dark.value = !dark.value;
  document.documentElement.dataset.theme = dark.value ? "dark" : "light";
}

/**
 * 慢放：把动效时长整体拉长，方便在远程桌面 / 低帧率链路上看清过渡。
 * 只是给 <html> 挂 data-motion，令牌值由 shell.scss 覆盖。
 */
const slowMotion = ref(false);

/**
 * 演示站默认**绕过系统的"减少动态效果"**。
 *
 * 为什么：远程桌面 / 部分 Windows 环境的 prefers-reduced-motion 默认就是 reduce，
 * 系统级把所有 animation / transition 压成 0.01ms —— 结果是"这个库看起来完全没有动效"。
 * 但这是个**演示动效的地方**，看不到动效等于没法验收，所以这里默认打开慢放。
 * 用户仍可点 ⏱ 关掉（关掉后回到系统行为）。
 */
onMounted(() => {
  /*
   * 动效开关的优先级（从高到低）：
   *   1. URL 参数：?motion=slow 强制播放（时长拉长 5~8 倍）、?motion=off 强制关闭
   *      —— 给"换台电脑看"或"录屏演示"用，不用改系统设置
   *   2. 系统 prefers-reduced-motion：reduce 时默认打开慢放
   *      （远程桌面 / 部分 Windows 默认就是 reduce，会把所有动画压成 0.01ms）
   *   3. 都不命中：正常播放
   */
  const forced = new URLSearchParams(location.search).get("motion");
  const osReduce =
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  const on = forced === "slow" || (forced !== "off" && osReduce);
  slowMotion.value = on;
  if (on) document.documentElement.dataset.motion = "slow";
  else delete document.documentElement.dataset.motion;
});

function toggleMotion() {
  slowMotion.value = !slowMotion.value;
  if (slowMotion.value) document.documentElement.dataset.motion = "slow";
  else delete document.documentElement.dataset.motion;
}
</script>

<template>
  <WdNav
    class="demo-side"
    direction="vertical"
    :items="items"
    :active="route.path"
    brand="WDesign"
    collapsible-groups
    :default-collapsed-groups="defaultCollapsed"
  >
    <template #footer>
      <span class="side-version">v1.0</span>
      <button
        class="side-theme"
        type="button"
        :class="{ 'is-on': slowMotion }"
        title="慢放动效（远程看不清过渡时用）"
        @click="toggleMotion"
      >
        ⏱
      </button>
      <button class="side-theme" type="button" title="切换主题" @click="toggleDark">
        {{ dark ? "☀" : "☾" }}
      </button>
    </template>
  </WdNav>
</template>
