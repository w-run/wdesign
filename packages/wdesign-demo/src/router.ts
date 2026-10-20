import type { RouteRecordRaw } from "vue-router";

/**
 * 路由表：每个组件一个页面。
 *
 * 页面文件按「页面名」组织：./pages/<name>/index.vue
 * 侧栏索引由 meta 决定（分类 + 顺序）。
 */
export interface PageMeta {
  /** 分类，用于侧栏分组 */
  group: string;
  /** 显示名（组件名，不含 Wd 前缀） */
  title: string;
  /** 组内排序，数字小的靠前 */
  order: number;
  /** 该页覆盖的组件（用于检索） */
  covers?: string[];
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("./pages/home/index.vue"),
    meta: { group: "", title: "首页", order: 0 },
  },
];

export const pages: Array<{ path: string; meta: PageMeta }> = [];
