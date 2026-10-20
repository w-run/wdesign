import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
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
