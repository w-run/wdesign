// =============================================================
//  弹层过渡时长
//
//  <Transition> 依赖 transitionend 或显式 :duration 收尾。
//  - 动画时钟停摆时（后台标签页 / 无头渲染）transitionend 不来，
//    靠 :duration 兜底；
//  - 但开启「减弱动态效果」时 CSS 的 transition-duration 只有 0.01ms，
//    若仍按 200ms 等待，用户会感到 200ms 的迟滞。
//  因此 duration 要跟着媒体查询走。
// =============================================================

const reduce = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * 取当前环境适用的过渡时长（毫秒）。
 *
 * ⚠️ reduced-motion 下用 1ms 而不是 0：Vue 内部对 duration 为 0 的处理是
 * 「不等待，立即 finish」，但在某些渲染时序下会与 CSS 的 0.01ms 过渡
 * 抢跑，导致 enter 类残留、元素卡在半透明状态。给 1ms 让它走正常收尾路径。
 */
export function popDuration(enter = 200, leave = 140) {
  return reduce() ? { enter: 1, leave: 1 } : { enter, leave }
}
