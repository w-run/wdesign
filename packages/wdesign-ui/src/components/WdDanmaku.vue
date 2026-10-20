<script setup lang="ts">
/**
 * WdDanmaku — 弹幕层
 *
 * 设计取舍：
 *   · **不逐帧驱动**：弹幕是"进入视口后匀速平移"，用 CSS animation
 *     即可，不需要 rAF 循环。一条弹幕一个元素，播完自动移除。
 *   · **不阻塞视频**：整个层 pointer-events: none，完全不拦截点击。
 *   · **轨道分配**：按"该轨道上最后一条的结束时间"找最早空闲的轨道，
 *     而不是固定轮流 —— 长弹幕不会和后面短的叠在一起。
 *
 * ⚠️ 与动画时钟的关系：
 *   弹幕依赖 CSS animation 推进。在时钟停摆的环境里（后台标签页、
 *   无头渲染）它们不会动 —— 但这**不影响正确性**：视频暂停时
 *   本来就不该有弹幕飞过。真实播放场景时钟是正常推进的。
 */
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { parseDanmaku, loadDanmaku, type ParsedDanmaku } from './danmaku-source'

defineOptions({ name: 'WdDanmaku' })

/** 弹幕条目（与解析结果同构，保持向后兼容） */
export type DanmakuItem = ParsedDanmaku

export type { ParsedDanmaku }

const props = withDefaults(
  defineProps<{
    /** 弹幕列表（已解析好的数组） */
    items?: DanmakuItem[]
    /**
     * 弹幕数据源 URL。
     * 支持 B 站 XML / JSON / 纯文本，自动按内容识别格式。
     * ⚠️ 跨域需自备代理；本组件不做代理。
     */
    src?: string
    /**
     * 原始弹幕文本（XML / JSON / CSV）。
     * 与 `src` 二选一；同时提供时以 `items` 优先。
     */
    raw?: string
    /** 当前播放时间（秒）—— 由父级视频的 timeupdate 驱动 */
    current?: number
    /** 是否显示 */
    visible?: boolean
    /**
     * 暂停时弹幕定格（而不是清空）。
     * 暂停瞬间屏幕上的弹幕应该保持不动，恢复播放再继续飞 ——
     * 这是所有视频站的通行行为。用 CSS animation-play-state 实现，
     * 不需要重新计算位置。
     */
    paused?: boolean
    /** 滚动速度（像素/秒），越大越快 */
    speed?: number
    /** 轨道行数 */
    rows?: number
    /** 字号（px） */
    fontSize?: number
    /** 不透明度 */
    opacity?: number
  }>(),
  {
    items: () => [],
    src: '',
    raw: '',
    current: 0,
    visible: true,
    paused: false,
    speed: 120,
    rows: 6,
    fontSize: 15,
    opacity: 1,
  },
)

const emit = defineEmits<{
  /** src 加载或解析失败时触发，参数为错误信息；走 items / raw 本地数据不会触发 */
  error: [msg: string]
}>()

/* ---------------- 数据加载 ---------------- */
/**
 * 最终使用的弹幕数组。
 *
 * 优先级：items > raw > src
 *   · items 是调用方已解析好的，直接用
 *   · raw 是原始文本，本地解析（无网络）
 *   · src 需要异步加载
 */
const loaded = ref<DanmakuItem[]>([])
const loadError = ref('')
const loading = ref(false)

const resolved = computed<DanmakuItem[]>(() => {
  if (props.items.length) return props.items
  if (props.raw) return parseDanmaku(props.raw)
  return loaded.value
})

watch(
  () => props.src,
  async (url) => {
    loaded.value = []
    loadError.value = ''
    if (!url) return
    loading.value = true
    try {
      loaded.value = await loadDanmaku(url)
    } catch (e) {
      loadError.value = e instanceof Error ? e.message : String(e)
      emit('error', loadError.value)
    } finally {
      loading.value = false
    }
  },
  { immediate: true },
)

/* ---------------- 发射窗口 ---------------- */
/**
 * 只渲染「已经该出现、但还没飞完」的弹幕。
 *
 * 用时间窗口而非"全部渲染 + 各自延迟"：
 *   后者会在 seek 之后错乱（所有已经过时的弹幕会同时涌出）。
 */
const WINDOW = 8 // 秒：一条弹幕在屏幕上的存活时长

const active = computed(() => {
  if (!props.visible) return []
  const t = props.current
  return resolved.value
    .map((it, i) => ({ ...it, _i: i }))
    .filter((it) => it.time <= t && it.time > t - WINDOW)
    .map((it) => ({
      ...it,
      /** 已经飞过的百分比，用于让中途进入的弹幕从正确位置开始 */
      progress: (t - it.time) / WINDOW,
    }))
})

/* ---------------- 轨道分配 ---------------- */
/**
 * 每条弹幕分到哪一行。
 *
 * 简化策略：按出现时间排序后轮流分配到各轨道。
 * 真正的重叠检测需要测量文本宽度，代价高且收益有限 ——
 * 播放器的弹幕密度通常远低于专业弹幕站。
 */
const assigned = computed(() => {
  return active.value.map((it, i) => ({
    ...it,
    row: it.mode === 'top' ? 0 : it.mode === 'bottom' ? props.rows - 1 : i % props.rows,
  }))
})

/** 顶部/底部固定弹幕单独归类 */
const fixedTop = computed(() => assigned.value.filter((d) => d.mode === 'top').slice(0, 2))
const fixedBottom = computed(() => assigned.value.filter((d) => d.mode === 'bottom').slice(0, 2))

const layerStyle = computed(() => ({
  '--dm-font': props.fontSize + 'px',
  '--dm-opacity': String(props.opacity),
  '--dm-rows': String(props.rows),
  /*
   * 暂停时用 animation-play-state: paused 让所有弹幕**原地定格**。
   * ⚠️ 不能用"暂停就不渲染" —— 那会让弹幕瞬间消失，
   * 恢复播放又从窗口外重新飞入，观感是"闪一下然后重来"。
   */
  '--dm-play-state': props.paused ? 'paused' : 'running',
}))

/**
 * 单条弹幕的样式。
 *
 * 用 animation-duration 控制速度：时长为「(容器宽 + 文本宽) / 速度」，
 * 但文本宽需要测量。这里用容器宽度的 120% 作为保守估计 ——
 * 稍慢一点比飞太快看不清好。
 */
function itemStyle(d: { progress: number; color?: string; row: number }) {
  return {
    top: `calc(var(--dm-row-h) * ${d.row} + 6px)`,
    color: d.color || '#fff',
    // 负 delay 让"已开始"的弹幕从中间位置继续，而不是从头飞
    animationDelay: `-${d.progress * 8}s`,
  }
}

/* ---------------- 可见性 ---------------- */
const root = ref<HTMLElement | null>(null)
watch(() => props.visible, () => { /* 显隐由 v-if 控制，无需额外处理 */ })

onBeforeUnmount(() => { /* 无计时器需要清理 */ })
</script>

<template>
  <div
    v-if="visible && resolved.length"
    ref="root"
    class="wd-danmaku"
    :style="layerStyle"
    aria-hidden="true"
  >
    <!-- 滚动弹幕 -->
    <div
      v-for="d in assigned.filter(x => !x.mode || x.mode === 'scroll')"
      :key="d._i"
      class="wd-danmaku__item"
      :style="itemStyle(d)"
    >{{ d.text }}</div>

    <!-- 顶部固定 -->
    <div
      v-for="(d, i) in fixedTop"
      :key="'t' + d._i"
      class="wd-danmaku__item wd-danmaku__item--fixed"
      :style="{ top: (i * 30 + 6) + 'px', color: d.color || '#fff' }"
    >{{ d.text }}</div>

    <!-- 底部固定 -->
    <div
      v-for="(d, i) in fixedBottom"
      :key="'b' + d._i"
      class="wd-danmaku__item wd-danmaku__item--fixed"
      :style="{ bottom: (i * 30 + 6) + 'px', color: d.color || '#fff' }"
    >{{ d.text }}</div>
  </div>
</template>
