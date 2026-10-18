// =============================================================
//  浮层锚定定位（把面板传送到 body 后仍贴着触发器）
//
//  为什么必须 Teleport：
//    面板用 position:absolute 时会被任何祖先的 overflow:hidden 裁掉。
//    这个库的浮层经常出现在表格单元格、卡片、滚动容器里，
//    被裁是必然发生的，不是边缘情况。
//
//  ⭐ 核心决策：用「文档坐标 + position: absolute」，不用「视口坐标 + fixed」
//
//  之前用 fixed + getBoundingClientRect()，在缩放/滚动时偏移巨大。原因是：
//    · getBoundingClientRect() 返回**布局视口**坐标
//    · position: fixed 相对**视觉视口**定位
//    两者只在「无缩放、无平移」时才等价。移动端双指缩放、iOS 地址栏伸缩、
//    soft keyboard、页面 zoom 都会让它们分离，偏移量正好是
//    visualViewport.offsetLeft/offsetTop。
//    想靠 visualViewport 换算补回来，等于手工重实现浏览器的坐标变换，
//    而且每一帧都要重算 —— 又慢又容易错。
//
//  改用文档坐标后：
//    target 定位 = rect.left + scrollX / rect.top + scrollY
//    浮层 position: absolute → 参照系就是文档原点，与 rect 的参照系同源。
//    **页面滚动、双指缩放、地址栏伸缩都不需要重算** —— 浏览器会把
//    absolute 元素和它的锚点一起变换，相对关系天然守恒。
//
//  唯一还需要重算的情况：
//    · 锚点在**内部滚动容器**里滚动（容器滚 → 锚点文档坐标变了 → 面板不跟）
//    · 视口尺寸变化导致「放不下需要翻转」（键盘弹出等）
//    · 面板自身尺寸变化（异步加载选项后高度从 0 变 300px）
//
//  ⚠️ 前提：body 不能有 transform / position:relative / zoom，
//     否则 absolute 的参照系不再是文档原点。本库的全局样式不设这些。
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

/** 当前滚动偏移（兼容旧 Safari） */
function scrollOffset() {
  const x = window.scrollX ?? window.pageXOffset ?? document.documentElement.scrollLeft ?? 0
  const y = window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0
  return { x, y }
}

/** 视口尺寸：优先 visualViewport（键盘/缩放时它是真实可见区域） */
function viewportSize() {
  const vv = window.visualViewport
  if (vv) return { width: vv.width, height: vv.height }
  return { width: window.innerWidth, height: window.innerHeight }
}

/**
 * 计算面板位置。
 * 返回 **文档坐标**（配合 position: absolute 使用），以及实际采用的 placement
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
    const el = anchor.value
    if (!el) return
    // 布局视口坐标 —— 只用来判断「放不放得下」，不直接用于定位
    const a = el.getBoundingClientRect()
    const pr = panel.value?.getBoundingClientRect()

    const gap = options.gap ?? 6
    const pw = options.matchWidth ? a.width : (options.width ?? pr?.width ?? 0)
    const ph = pr?.height ?? 0

    const vp = viewportSize()
    const s = scrollOffset()

    /*
     * 两套坐标各司其职：
     *   视口坐标（a.top/a.bottom）→ 判断是否放得下、是否需要翻转
     *   文档坐标（+ scrollY）       → 最终写进 top/left
     *
     * 混用会出错：文档坐标做翻转判断会把"页面已滚过的距离"算进可用空间，
     * 页面滚到很下面时会误判为"下面放不下"。
     */
    const vTop = a.top
    const vBottom = a.bottom
    const dTop = a.top + s.y
    const dBottom = a.bottom + s.y
    const dLeft = a.left + s.x
    const dRight = a.right + s.x

    let placement = options.placement || 'bottom-start'

    const wantBottom = placement.startsWith('bottom')
    const fitsBelow = vBottom + gap + ph <= vp.height - 8
    const fitsAbove = vTop - gap - ph >= 8
    const goBottom = wantBottom ? fitsBelow || !fitsAbove : !fitsAbove && fitsBelow

    let top: number
    if (goBottom) {
      top = dBottom + gap
      placement = placement.replace('top', 'bottom') as Placement
    } else {
      top = dTop - gap - ph
      placement = placement.replace('bottom', 'top') as Placement
    }

    let left: number
    if (placement.endsWith('start')) left = dLeft
    else if (placement.endsWith('end')) left = dRight - pw
    else left = dLeft + a.width / 2 - pw / 2

    /*
     * 水平夹进可见区域。
     * 注意夹的边界要换算回**文档坐标**：可见区右边 = scrollX + vp.width。
     */
    const minLeft = s.x + 8
    const maxLeft = s.x + vp.width - pw - 8
    left = Math.max(minLeft, Math.min(left, Math.max(minLeft, maxLeft)))

    pos.value = { top, left }
    actual.value = placement
  }

  /** 合并同一帧内的多次调用，避免滚动时反复强制布局 */
  let raf = 0
  let timer = 0
  function schedule() {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = 0
      place()
    })
    // rAF 在后台标签页 / 动画时钟停摆时不回调，补一个兜底
    clearTimeout(timer)
    timer = window.setTimeout(place, 32)
  }

  /**
   * 滚动监听。
   *
   * ⚠️ 页面级滚动其实**不需要**重算（absolute 会自动跟随），
   * 这里保留是为了覆盖「锚点在内部滚动容器里滚动」的情况 ——
   * 那种情况下锚点的文档坐标会变，但面板不会跟着动。
   * 重算是幂等的，页面滚动时算出同样的值，代价只有一次 rect 读取。
   */
  function onScroll(e: Event) {
    const t = e.target as Node | null
    // 面板自身的滚动（下拉选项列表）不该触发重定位
    if (t && panel.value && panel.value.contains(t)) return
    schedule()
  }

  /**
   * 视口变化必须监听：
   * 键盘弹出 / 地址栏伸缩 / 双指缩放后「放得下」的判断会变，
   * 可能需要翻转或夹取。这类变化 window.resize 不一定触发。
   */
  let vv: VisualViewport | null = null

  function bind() {
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', schedule)
    vv = window.visualViewport ?? null
    if (vv) {
      vv.addEventListener('resize', schedule)
      vv.addEventListener('scroll', schedule)
    }
  }
  function unbind() {
    window.removeEventListener('scroll', onScroll, true)
    window.removeEventListener('resize', schedule)
    if (vv) {
      vv.removeEventListener('resize', schedule)
      vv.removeEventListener('scroll', schedule)
      vv = null
    }
    if (raf) { cancelAnimationFrame(raf); raf = 0 }
    clearTimeout(timer)
  }

  watch(open, async (v) => {
    if (v) {
      await nextTick()
      place()
      bind()
      schedule()
    } else {
      unbind()
    }
  })

  /**
   * 面板尺寸变化时重算。
   * Select 的选项异步加载后高度从 0 变 300px，
   * 不重算的话向上翻转的判断会用旧高度，面板被截掉一半。
   */
  let ro: ResizeObserver | null = null
  watch(panel, (el) => {
    ro?.disconnect()
    if (el && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => schedule())
      ro.observe(el)
    }
  })
  onBeforeUnmount(() => { ro?.disconnect(); ro = null })

  onMounted(() => { if (open.value) { place(); bind() } })
  onBeforeUnmount(unbind)

  return { pos, place: schedule, actual }
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
