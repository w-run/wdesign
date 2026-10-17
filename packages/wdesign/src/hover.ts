// =============================================================
//  WDesign — addHover：用状态类替代 :hover 的渐进增强
//
//  为什么需要它
//  ------------
//  1) 触屏上 :hover 在 tap 之后会一直保持，直到用户点别处 —— 按钮、列表行、
//     菜单项都会「卡在悬停态」。靠 `@media (hover: hover)` 能屏蔽掉这个问题，
//     但代价是触屏完全没有悬停反馈。
//  2) `:hover` 不可编程：分不清「鼠标真的停在上面」还是「刚才点过一下」，
//     也没法做延迟、滚动抑制、指针离开窗口时的复位。
//
//  addHover 把悬停变成一个由 JS 维护的 `.is-hover` 状态类：
//    · 只有指针真的进入元素时才亮
//    · 指针离开、按下、滚动、窗口失焦、触摸抬起 —— 一律立即清除
//    · 触屏上按下瞬间给一个短暂高亮（相当于 :active 的视觉回授），随后消失
//
//  用法
//  ----
//    import { addHover } from '@w-run/wdesign'
//    const stop = addHover()          // 整页委托，一次即可
//    addHover(document.querySelector('#panel'))   // 也可只作用于子树
//    stop()                            // 卸载
//
//  CSS 一侧：组件样式里除了 `:hover` 还生成了 `.is-hover` 选择器，
//  两者共享同一份声明，所以**没有 JS 时桌面端行为完全不变**。
// =============================================================

export interface AddHoverOptions {
  /** 状态类名，默认 is-hover */
  className?: string
  /** 触屏按下时的高亮时长（ms），默认 120；设 0 关闭 */
  touchFeedback?: number
  /** 滚动时是否抑制悬停（避免滚动中沿途点亮），默认 true */
  suppressOnScroll?: boolean
}

/** 真正带悬停能力的指针 */
function supportsHover(): boolean {
  return typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(hover: hover)').matches
    : false
}

export function addHover(root?: HTMLElement | Document, options: AddHoverOptions = {}) {
  if (typeof window === 'undefined') return () => {}

  const {
    className = 'is-hover',
    touchFeedback = 120,
    suppressOnScroll = true,
  } = options

  const target = (root ?? document) as HTMLElement | Document
  const useNativeHover = supportsHover()

  let current: HTMLElement | null = null
  let touchTimer: number | undefined
  let scrolling = false
  let scrollTimer: number | undefined

  function clear(el?: HTMLElement | null) {
    const node = el ?? current
    if (node) node.classList.remove(className)
    if (node === current) current = null
  }

  function clearAll() {
    target.querySelectorAll(`.${className}`).forEach((el) => el.classList.remove(className))
    // ⚠️ 必须单独清 current：它可能不在 querySelectorAll 的结果里
    // （自定义 root / 刚被移出文档 / 事件桩环境下），否则滚动后状态残留。
    if (current) current.classList.remove(className)
    current = null
  }

  // ---- 指针悬停（仅 hover-capable 设备）----
  function onPointerOver(e: PointerEvent) {
    if (!useNativeHover || scrolling) return
    if (e.pointerType === 'touch') return
    const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-wd-hover], .wd-hoverable')
    if (!el || el === current) return
    // 避免同一元素内部移动时反复切换
    if (current && current.contains(el)) return
    clear()
    current = el
    el.classList.add(className)
  }

  function onPointerOut(e: PointerEvent) {
    if (!useNativeHover) return
    const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-wd-hover], .wd-hoverable')
    if (!el) return
    // 指针移入子元素时不算离开
    const to = e.relatedTarget as Node | null
    if (to && el.contains(to)) return
    clear(el)
  }

  // ---- 触屏：按下给一次短暂高亮 + 抬起/移出立即清除 ----
  function onPointerDown(e: PointerEvent) {
    if (useNativeHover || touchFeedback <= 0) return
    if (e.pointerType !== 'touch') return
    const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('[data-wd-hover], .wd-hoverable')
    if (!el) return
    if (touchTimer) window.clearTimeout(touchTimer)
    clear()
    current = el
    el.classList.add(className)
    touchTimer = window.setTimeout(() => clear(el), touchFeedback)
  }

  function onPointerUp() {
    if (useNativeHover) return
    if (touchTimer) window.clearTimeout(touchTimer)
    touchTimer = window.setTimeout(() => clear(), touchFeedback)
  }

  // ---- 全局复位：按下 / 滚动 / 失焦 / 页面隐藏 ----
  function onScroll() {
    if (!suppressOnScroll) return
    scrolling = true
    clearAll()
    if (scrollTimer) window.clearTimeout(scrollTimer)
    scrollTimer = window.setTimeout(() => { scrolling = false }, 160)
  }

  function onBlur() { clearAll() }

  function onVisibility() { if (document.hidden) clearAll() }

  const el = target as HTMLElement
  const add = (el.addEventListener ? el : document)
  add.addEventListener('pointerover', onPointerOver as EventListener, { passive: true })
  add.addEventListener('pointerout', onPointerOut as EventListener, { passive: true })
  add.addEventListener('pointerdown', onPointerDown as EventListener, { passive: true })
  add.addEventListener('pointerup', onPointerUp as EventListener, { passive: true })
  add.addEventListener('pointercancel', onPointerUp as EventListener, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true, capture: true })
  window.addEventListener('blur', onBlur)
  document.addEventListener('visibilitychange', onVisibility)

  return function stop() {
    add.removeEventListener('pointerover', onPointerOver as EventListener)
    add.removeEventListener('pointerout', onPointerOut as EventListener)
    add.removeEventListener('pointerdown', onPointerDown as EventListener)
    add.removeEventListener('pointerup', onPointerUp as EventListener)
    add.removeEventListener('pointercancel', onPointerUp as EventListener)
    window.removeEventListener('scroll', onScroll, { capture: true })
    window.removeEventListener('blur', onBlur)
    document.removeEventListener('visibilitychange', onVisibility)
    if (touchTimer) window.clearTimeout(touchTimer)
    if (scrollTimer) window.clearTimeout(scrollTimer)
    clearAll()
  }
}

export default addHover
