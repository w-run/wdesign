/**
 * .vue 文件的类型声明（无 vue-tsc 时的降级方案）。
 *
 * ===== 为什么需要 =====
 * 正常项目用 `vue-tsc` 会给每个 .vue 生成精确类型。
 * 但本环境的 vue-tsc 2.x 在 Node 22 + aarch64 下跑不起来
 * （报 ERR_PACKAGE_PATH_NOT_EXPORTED / 依赖缺失），
 * 于是 tsc 完全无法解析 `.vue` 导入 —— 报 149 个 TS2307。
 *
 * 这个 shim 让 tsc 至少能**继续检查所有 .ts 模块**，
 * 代价是 .vue 的类型被放宽为 any。
 *
 * ⚠️ 这是妥协，不是正解。真正的收益（组件 props 类型校验）
 *    必须等 vue-tsc 可用后才能拿到。
 *    它现在能做的：保证内部 .ts 工具模块（anchor / overlay /
 *    controllable / markdown …）的类型是干净的 —— 那是纯逻辑，
 *    出错影响最大。
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
