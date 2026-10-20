import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { registerLoaders } from "@w-run/wdesign-icons";
import App from "./shell/App.vue";
import { routes } from "./router";
// 样式 + 字体入口（字体吃仓库内文件，见文件内注释）
import "./styles/index.scss";
import "./shell/shell.scss";

/**
 * 图标装载：把 595 个 SVG 以「原始字符串」的形式注册给图标注册表。
 *
 * 不注册的话 WdIcon 会渲染成空的 `<span class="wd-icon">` —— 不报错、
 * 控制台干净，只是图标全都不见了。演示站里几乎所有组件都用到图标，
 * 所以这一步是基础设施，缺了整个站看起来像"样式没生效"。
 *
 * 注册表的 key 约定是 `../icons/<style>/<name>.svg`（相对 icons 包 src），
 * 这里把 glob 得到的绝对相对路径翻译成那个形状。
 */
const svgModules = import.meta.glob("../../icons/icons/*/*.svg", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

const loaders: Record<string, () => Promise<string>> = {};
for (const [path, load] of Object.entries(svgModules)) {
  const m = path.match(/icons\/icons\/(outlined|filled)\/(.+)\.svg$/);
  if (m) loaders[`../icons/${m[1]}/${m[2]}.svg`] = load;
}
registerLoaders(loaders);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
