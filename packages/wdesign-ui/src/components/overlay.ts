// =============================================================
//  浮层通用行为：滚动锁定 + 焦点陷阱
//
//  为什么抽出来：
//    Modal / Drawer / （将来）Popover 都需要这两件事，
//    各写一遍必然分叉 —— 这个库里「点击外部关闭」已经写了 5 份，
//    WdSelect 的 Esc 就是后来补的。别再重复那个错误。
// =============================================================
import { onBeforeUnmount, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useOverlayLayer, installOverlayKeyboard, topOverlay } from './overlay-stack'

/* ---------------------------------------------------------------
 * 滚动锁定
 *
 * 直接 body.style.overflow = 'hidden' 有个经典副作用：
 * 滚动条消失 → 页面宽度突变 → 内容横向跳一下。
 * 所以同时补 padding-right 抵消滚动条宽度。
 *
 * 嵌套浮层（Modal 里再开 Modal）用计数管理，
 * 否则内层关闭时会把外层的锁一起解掉。
 * ------------------------------------------------------------- */
let lockCount = 0
let savedOverflow = ''
let savedPadding = ''

function lockScroll() {
  if (lockCount === 0) {
    const body = document.body
    savedOverflow = body.style.overflow
    savedPadding = body.style.paddingRight
    // 计算滚动条宽度（移动端通常为 0，桌面端约 15px）
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
  }
  lockCount++
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow
    document.body.style.paddingRight = savedPadding
  }
}

/** 在组件里用：open 为 true 时锁定，false 或卸载时释放 */
export function useScrollLock(open: Ref<boolean>) {
  let locked = false

  const apply = (v: boolean) => {
    if (v && !locked) { lockScroll(); locked = true }
    else if (!v && locked) { unlockScroll(); locked = false }
  }

  watch(open, apply, { immediate: true })
  onBeforeUnmount(() => { if (locked) { unlockScroll(); locked = false } })
}

/* ---------------------------------------------------------------
 * 焦点陷阱
 *
 * 职责：
 *   1. 打开时记住来源元素，把焦点移入面板
 *   2. Tab / Shift+Tab 在面板内循环
 *   3. 关闭时把焦点还给来源元素
 *
 * 用 'keydown' 捕获阶段监听 document，比挂在面板上可靠：
 * 焦点万一跑到面板外（比如浏览器地址栏回来），仍能拉回。
 * ------------------------------------------------------------- */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap(
  open: Ref<boolean>,
  panel: Ref<HTMLElement | null>,
  onEsc?: () => void,
) {
  /**
   * 挂到全局层栈上。
   * 多层场景（弹窗里开抽屉）时，只有栈顶那层响应 Tab 与 Esc ——
   * 否则多个陷阱会互相抢焦点，Esc 会一次关掉所有层。
   */
  installOverlayKeyboard()
  const layer = useOverlayLayer(open, panel, onEsc)

  let restoreTo: HTMLElement | null = null

  function focusables(): HTMLElement[] {
    if (!panel.value) return []
    return Array.from(panel.value.querySelectorAll<HTMLElement>(FOCUSABLE))
      .filter((el) => el.offsetParent !== null || el === document.activeElement)
  }

  function onKeydown(e: KeyboardEvent) {
    if (!open.value || e.key !== 'Tab') return
    // 非栈顶：不参与 Tab 循环，把键盘留给上面那层
    if (!layer.isTop()) return

    const nodes = focusables()
    if (!nodes.length) {
      e.preventDefault()
      return
    }
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (e.shiftKey) {
      if (active === first || !panel.value?.contains(active)) {
        e.preventDefault()
        last.focus()
      }
    } else if (active === last || !panel.value?.contains(active)) {
      e.preventDefault()
      first.focus()
    }
  }

  watch(open, async (v) => {
    if (v) {
      restoreTo = document.activeElement as HTMLElement | null
      await Promise.resolve()
      setTimeout(() => {
        const nodes = focusables()
        if (nodes.length) nodes[0].focus()
        else panel.value?.focus?.()
      }, 0)
    } else if (restoreTo) {
      /*
       * 焦点归还。
       * 优先还给打开前的元素；它若已不在文档里（列表刷新等），
       * 退而求其次还给「当前栈顶浮层的面板」—— 多层嵌套时这样才回得到
       * 上一层，而不是直接掉到 body 上。
       */
      if (document.contains(restoreTo)) restoreTo.focus()
      else {
        const top = topOverlay()
        const el = top?.panel.value
        if (el) el.focus?.()
      }
      restoreTo = null
    }
  })

  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', onKeydown, true)
  }
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown, true)
    if (restoreTo && document.contains(restoreTo)) restoreTo.focus()
  })
}

/* ---------------------------------------------------------------
 * 点击外部关闭（同样只写一次）
 * ------------------------------------------------------------- */
export function useClickOutside(
  refs: Ref<HTMLElement | null>[],
  handler: () => void,
  enabled: Ref<boolean>,
  event: 'click' | 'mousedown' = 'mousedown',
) {
  function onDoc(e: MouseEvent) {
    if (!enabled.value) return
    const t = e.target as Node
    // 落在任意一个受保护区域内就不算外部
    if (refs.some((r) => r.value?.contains(t))) return
    handler()
  }
  if (typeof document !== 'undefined') document.addEventListener(event, onDoc)
  onBeforeUnmount(() => {
    if (typeof document !== 'undefined') document.removeEventListener(event, onDoc)
  })
}

/** 面板 ref 的便捷创建（配 useFocusTrap 用） */
export function usePanelRef() {
  return ref<HTMLElement | null>(null)
}
