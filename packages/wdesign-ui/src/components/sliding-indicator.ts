// =============================================================
//  滑动指示器（Segmented / TabBar 共用）
//
//  为什么抽出来：
//    分段控件和底部导航本质是同一种交互 —— "一排等宽选项 + 一个会平移的
//    高亮块"。两块各写一份 place()，第一个改动必然会漏掉第二个
//    （本项目已经吃过"两处同名字体/两套尺寸机制"的亏）。
//
//  首帧为什么要禁过渡：
//    页面加载时滑块初始在 x=0，若首次设置 transform 就带 transition，
//    用户会看到"从左滑进来"的一帧 —— 那是初始状态，不是状态变化。
//    用类名 `.is-initial` 关过渡，双 rAF + setTimeout 兜底移除
//    （无头 / 后台标签页里 rAF 不回调，只靠它滑块会永远停在无过渡状态）。
// =============================================================
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

export interface SlidingIndicatorOptions {
  /** 轨道（相对定位容器） */
  track: Ref<HTMLElement | null | undefined>
  /** 滑块元素 */
  slider: Ref<HTMLElement | null | undefined>
  /** 激活项的选择器，默认 `.is-on` */
  activeSelector?: string
  /** 依赖项：变化时重新落位（通常是 modelValue / items） */
  watchSource?: () => unknown
}

export function useSlidingIndicator(opts: SlidingIndicatorOptions) {
  const settled = ref(false)
  let resizeOb: ResizeObserver | null = null

  function place(active: HTMLElement, s: HTMLElement) {
    // 滑块与激活项同处 track 坐标系；offset* 不受 transform 影响，绝对值不漂移
    s.style.transform = `translate(${active.offsetLeft - s.offsetLeft}px, ${active.offsetTop - s.offsetTop}px)`
    s.style.width = `${active.offsetWidth}px`
    s.style.height = `${active.offsetHeight}px`
  }

  function update() {
    const t = opts.track.value
    const s = opts.slider.value
    if (!t || !s) return
    const active = t.querySelector<HTMLElement>(opts.activeSelector ?? '.is-on')
    if (!active) return

    if (!settled.value) {
      s.classList.add('is-initial')
      place(active, s)
      const settle = () => {
        if (settled.value) return
        s.classList.remove('is-initial')
        settled.value = true
      }
      requestAnimationFrame(settle)
      setTimeout(settle, 60)
      return
    }
    place(active, s)
  }

  if (opts.watchSource) watch(opts.watchSource, () => nextTick(update))

  onMounted(() => {
    nextTick(update)
    // 尺寸变化（字体加载完成、窗口缩放）也要重算，否则滑块停在旧位置
    if (typeof ResizeObserver !== 'undefined' && opts.track.value) {
      resizeOb = new ResizeObserver(() => update())
      resizeOb.observe(opts.track.value)
    }
  })

  onBeforeUnmount(() => {
    resizeOb?.disconnect()
    resizeOb = null
  })

  return { update, settled }
}
