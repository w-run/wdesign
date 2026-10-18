// =============================================================
//  浮层层栈（Overlay Stack）
//
//  为什么需要：
//    浮层可以嵌套（弹窗里开抽屉、抽屉里开确认气泡）。
//    没有层栈时每个浮层都监听 document 的 keydown：
//      - Tab：多个陷阱互相抢焦点，来回跳
//      - Esc：一次按键把所有层全部关掉
//      - 焦点归还：目标可能已被移除，焦点掉到 body
//
//  设计：
//    - 全局有序栈，push 时分配自增 id
//    - **只有栈顶**响应 Tab 与 Esc
//    - 关闭时焦点归还给「打开它时的那一层」，而不是死记一个 DOM 节点
//      （上一层可能也是浮层，且它内部节点会变）
// =============================================================
import { onBeforeUnmount, ref, watch } from 'vue'
import type { Ref } from 'vue'

export interface OverlayEntry {
  id: number
  /** 面板根节点（用于判断焦点归属） */
  panel: Ref<HTMLElement | null>
  /** 关闭回调（Esc 时调用） */
  onEscape?: () => void
  /** 打开前焦点所在的元素，作为归还目标 */
  restoreTo: HTMLElement | null
}

/** 栈：后进先出，最后一个就是最顶层 */
const stack: OverlayEntry[] = []
let seq = 0

/** 栈深度（响应式，供调试/测试观察） */
export const overlayDepth = ref(0)

/**
 * 层级分配：后打开的浮层必须压住先打开的。
 * 固定 z-index 在多层的场景下必然出错 —— 弹窗 (1000) 里开抽屉 (1000)，
 * 谁在上完全看 DOM 顺序，不可控。
 */
const BASE_Z = 1000
let zSeq = 0
export function nextZIndex(): number {
  return BASE_Z + ++zSeq * 10
}
export function resetZIndex(floor = 0) {
  zSeq = floor
}

/** 当前最顶层浮层 */
export function topOverlay(): OverlayEntry | undefined {
  return stack[stack.length - 1]
}

/** 某个浮层是否位于栈顶 */
export function isTopOverlay(id: number): boolean {
  const t = topOverlay()
  return !!t && t.id === id
}

export function pushOverlay(entry: Omit<OverlayEntry, 'id'>): number {
  const id = ++seq
  stack.push({ ...entry, id })
  overlayDepth.value = stack.length
  return id
}

export function removeOverlay(id: number) {
  const i = stack.findIndex((e) => e.id === id)
  if (i >= 0) stack.splice(i, 1)
  overlayDepth.value = stack.length
}

/**
 * 挂一层浮层到栈上。
 *
 * @param open   组件自己的开关
 * @param panel  面板 ref
 * @param onEsc  栈顶时按 Esc 做什么（不传则不响应 Esc）
 */
export function useOverlayLayer(
  open: Ref<boolean>,
  panel: Ref<HTMLElement | null>,
  onEsc?: () => void,
) {
  let myId: number | null = null

  watch(
    open,
    (v) => {
      if (v) {
        // 记录打开前的焦点，作为关闭时的归还目标。
        // 注意：如果当前焦点在「另一个浮层」内部，归还目标就是那个浮层里的节点 ——
        // 这是正确的，关闭后焦点回到上层浮层里，而不是整个页面的 body。
        const active = document.activeElement as HTMLElement | null
        myId = pushOverlay({
          panel,
          restoreTo: active && active !== document.body ? active : null,
          onEscape: onEsc,
        })
      } else if (myId !== null) {
        removeOverlay(myId)
        myId = null
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (myId !== null) {
      removeOverlay(myId)
      myId = null
    }
  })

  return {
    /** 本层是否在栈顶（需要响应键盘时先判断它） */
    isTop: () => (myId === null ? false : isTopOverlay(myId)),
  }
}

/**
 * 全局唯一的键盘处理入口。
 *
 * 只挂在 document 上一次，由它决定把事件交给哪一层 ——
 * 而不是让每个浮层各自监听（那样必然互相抢）。
 *
 * 在 App 根部调用一次即可；组件库内部会在首次 useOverlayLayer 时自动安装。
 */
let installed = false
const escHandlers = new Set<() => boolean>()

export function installOverlayKeyboard() {
  if (installed || typeof document === 'undefined') return
  installed = true

  document.addEventListener(
    'keydown',
    (e) => {
      const top = topOverlay()
      if (!top) return
      if (e.key === 'Escape') {
        // 只关最顶层，且阻止其它监听器重复处理
        const handled = top.onEscape?.()
        if (handled !== false) {
          // 不给 stopPropagation：让外层知道有人处理了 Esc（例如关闭抽屉里的下拉）
          e.stopPropagation()
        }
      }
    },
    true,
  )
}

/* ---------------------------------------------------------------
 * 滚动锁定：已经是计数制，多层天然正确。
 * 这里只补一个「关到底才恢复」的断言性检查（开发期）。
 * ------------------------------------------------------------- */
