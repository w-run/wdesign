import type { RouteRecordRaw } from "vue-router";

/**
 * 路由表：每个组件一个页面。
 *
 * meta 决定侧栏索引的分类与排序：
 *   group  分类名（侧栏分组标题）
 *   title  显示名（组件名，不含 Wd 前缀）
 *   order  组内排序，数字小的靠前
 *   covers 该页覆盖的组件（变体合并时用，如 Avatar + AvatarGroup）
 */
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("./pages/home/index.vue"),
    meta: { title: "首页" },
  },

  /* ---------- 基础 ---------- */
  {
    path: "/button",
    name: "button",
    component: () => import("./pages/button/index.vue"),
    meta: { group: "基础", title: "Button", order: 1, covers: ["WdButton"] },
  },
  {
    path: "/avatar",
    name: "avatar",
    component: () => import("./pages/avatar/index.vue"),
    meta: {
      group: "基础",
      title: "Avatar",
      order: 2,
      covers: ["WdAvatar", "WdAvatarGroup"],
    },
  },

  /* ---------- 表单 ---------- */
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("./pages/calendar/index.vue"),
    meta: { group: "表单", title: "Calendar", order: 1, covers: ["WdCalendar"] },
  },
];
