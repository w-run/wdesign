// =============================================================
//  浮层锚定定位（把面板传送到 body 后仍贴着触发器）
//
//  为什么必须 Teleport：
//    面板用 position:absolute 时会被任何祖先的 overflow:hidden 裁掉。
//    这个库的浮层经常出现在表格单元格、卡片、滚动容器里，
//    被裁是必然发生的，不是边缘情况。
//
//  为什么不能用 CSS 定位：
//    Teleport 后面板在 body 下，与触发器不再有祖先关系，
//    absolute 无从参照。必须用 JS 量出触发器的屏幕坐标，
//    再以 position:fixed 摆放。
//
//  这套逻辑之前散落在 Popconfirm 里（手写 place()），
//  现在抽出来给 Dropdown / Select / DatePicker / Tooltip 共用。
// =============================================================
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

export type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'bottom-center'

export interface AnchorOptions {
  placement?: Placement
  /** 与触发器的间距（px） */
  gap?: number
  /** 面板宽度（不传则用面板自身宽度） */
  width?: number
  /** 是否与触发器同宽 */
  matchWidth?: boolean
}

/**
 * 计算面板位置。
 * 返回 fixed 定位的 top/left，以及实际采用的 placement
 * （空间不够时会自动翻转到另一侧）。
 */
export function useAnchoredPosition(
  open: Ref<boolean>,
  anchor: Ref<HTMLElement | null>,
  panel: Ref<HTMLElement | null>,
  options: AnchorOptions = {},
) {
  const pos = ref({ top: 0, left: 0 })
  /** 实际生效的方位（可能因空间不足翻转） */
  const actual = ref<Placement>(options.placement || 'bottom-start')

  function place() {
    const a = anchor.value?.getBoundingClientRect()
    const p = panel.value?.getBoundingClientRect()
    if (!a) return

    const gap = options.gap ?? 6
    const pw = options.matchWidth ? a.width : (options.width ?? p?.width ?? 0)
    const ph = p?.height ?? 0
    const vw = window.innerWidth
    const vh = window.innerHeight

    let placement = options.placement || 'bottom-start'
    let { top, left } = { top: 0, left: 0 }

    // 垂直：先按请求的方向放，放不下就翻到另一侧
    const wantBottom = placement.startsWith('bottom')
    const fitsBelow = a.bottom + gap + ph <= vh - 8
    const fitsAbove = a.top - gap - ph >= 8
    const goBottom = wantBottom ? fitsBelow || !fitsAbove : !fitsAbove && fitsBelow

    if (goBottom) {
      top = a.bottom + gap
      placement = placement.replace('top', 'bottom') as Placement
    } else {
      top = a.top - gap - ph
      placement = placement.replace('bottom', 'top') as Placement
    }

    // 水平：按对齐方式算，再夹进视口
    if (placement.endsWith('start')) left = a.left
    else if (placement.endsWith('end')) left = a.right - pw
    else left = a.left + a.width / 2 - pw / 2

    const maxLeft = vw - pw - 8
    left = Math.max(8, Math.min(left, Math.max(8, maxLeft)))

    pos.value = { top, left }
    actual.value = placement
  }

  /** 打开时挂监听，关闭时摘掉 —— 避免常驻 scroll 监听拖慢滚动 */
  function bind() {
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
  }
  function unbind() {
    window.removeEventListener('scroll', place, true)
    window.removeEventListener('resize', place)
  }

  watch(open, async (v) => {
    if (v) {
      await nextTick()
      place()
      bind()
      // 面板内容异步变化（如选项加载）时重新量一次
      requestAnimationFrame(place)
      setTimeout(place, 0) // rAF 在时钟停摆时不回调，补一个定时器兜底
    } else {
      unbind()
    }
  })

  onMounted(() => { if (open.value) bind() })
  onBeforeUnmount(unbind)

  return { pos, place, actual }
}

/**
 * 点击外部关闭。
 * 注意：Teleport 后面板不在触发器子树里，「是否在内部」要单独判断面板。
 * 这也是之前各组件各写一份容易漏的地方。
 */
export function useDismiss(
  refs: Ref<HTMLElement | null>[],
  close: () => void,
  enabled: Ref<boolean>,
  event: 'click' | 'mousedown' = 'click',
) {
  /**
   * 默认用 click 而不是 mousedown。
   *
   * 曾经改成 mousedown 想「更早响应」，结果和触发器的 click 打架：
   * 按下 → mousedown 判为外部 → 关闭；抬起 → click → 又打开。
   * 表现为「点了没反应」。三者（触发器 click、面板内点击、外部点击）
   * 用同一种事件类型才不会出现时序错位。
   *
   * mousedown 只在需要「拖动开始时立即关闭」的场景才显式传。
   */
  function onDoc(e: MouseEvent) {
    if (!enabled.value) return
    const t = e.target as Node
    if (refs.some((r) => r.value?.contains(t))) return
    close()
  }
  if (typeof document !== 'undefined') document.addEventListener(event, onDoc)
  onBeforeUnmount(() => {
    if (typeof document !== 'undefined') document.removeEventListener(event, onDoc)
  })
}
