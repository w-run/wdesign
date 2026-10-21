import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { demoCode } from "./tools/demo-code-plugin.mjs";
import { liveProxy } from "./tools/live-proxy.mjs";

export default defineConfig({
  // demoCode：构建期把每个页面 <DemoBlock> 的模板原文抽出来，
  // 给「预览 + 源码」的文档卡片用（见 tools/demo-code-plugin.mjs）
  // liveProxy：直播 m3u8 的同源代理（公网源没有 CORS，浏览器直连会被拦）
  plugins: [vue(), demoCode(), liveProxy()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // 直接指向组件库源码：改组件立即生效，无需先 build
      "@wdesign": fileURLToPath(new URL("../wdesign-ui/src", import.meta.url)),
    },
  },
  server: {
    port: 5273,
    host: true,
  },
});
