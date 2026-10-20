import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./shell/App.vue";
import { routes } from "./router";
import "@wdesign/styles/index.scss";
import "./shell/shell.scss";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
