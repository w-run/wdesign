<script setup lang="ts">
import WdDanmaku from './WdDanmaku.vue'
import type { DanmakuItem } from './WdDanmaku.vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { formatDuration } from './time'

defineOptions({ name: 'WdVideoPlayer' })

export interface WdEpisode {
  /** 集标识（传给调用方用于换源） */
  key: string | number
  /** 显示名，如「第 1 集」 */
  label: string
  /** 可选：该集是否有特别标记（如 VIP / 预告） */
  tag?: string
  /** 可选：播放地址。给了就由组件自己切源 */
  src?: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** 视频地址（点播）。m3u8 需调用方自行接 hls.js */
    src?: string
    /** 播放模式：vod 点播 / live 直播 */
    mode?: 'vod' | 'live'
    /** 封面 */
    poster?: string
    /** 标题（显示在顶部渐变条里） */
    title?: string
    /**
     * 控件可见策略：
     *  auto   — 播放中鼠标静止 2.6s 后全部淡出（默认，最不打扰观看）
     *  always — 一直显示
     */
    controlsMode?: 'auto' | 'always'
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    /** 显示倍速（点播才有意义） */
    rates?: number[]
    /** 选集列表 */
    episodes?: WdEpisode[]
    /** 当前集 key */
    currentEpisode?: string | number
    /** 显示上下集按钮 */
    episodeNav?: boolean
    /** 显示选集面板 */
    playlist?: boolean
    /** 显示画中画 */
    pip?: boolean
    /**
     * m3u8 播放策略。默认 'auto'：**原生优先**。
     *
     * 现实情况（2026）：
     *   Safari / iOS       — 原生支持，无需任何库
     *   Chrome 142+        — 原生支持
     *   Chrome ≤141 / FF / Edge — 不支持，需 hls.js
     *
     * 所以 hls.js 只在「原生不行 + 页面确实加载了 Hls + 有标准 MediaSource」
     * 时才启用。不加载 hls.js 也不影响主流浏览器 —— 省掉 400KB 依赖。
     *
     *  'auto'   — 原生优先，失败/不支持时用 hls.js（若有）
     *  'native' — 只用原生
     *  'hlsjs'  — 强制 hls.js（需页面已加载 Hls 全局）
     *  'off'    — 完全交给浏览器
     */
    hls?: 'auto' | 'native' | 'hlsjs' | 'off'
    /** 直播时停留在最新位置（滑出窗口后自动追到实时边缘） */
    liveSync?: boolean
    /**
     * 控件图标风格。
     * 默认 filled —— 播放器控件压在视频画面上，底衬是半透明深色渐变，
     * 描边图标（outlined）的细线在这种背景下容易被压没，实心块更稳、
     * 16-18px 下辨识度更高。信息类图标（如侧栏导航）仍应保持 outlined。
     * 缺失 filled 变体的图标会由 WdIcon 自动回退 outlined。
     */
    iconStyle?: 'filled' | 'outlined'
    /** 弹幕列表（已解析） */
    danmaku?: DanmakuItem[]
    /**
     * 弹幕数据源 URL。支持 B 站 XML / JSON / 纯文本，自动识别。
     * ⚠️ 跨域需自备代理。
     */
    danmakuSrc?: string
    /** 原始弹幕文本（XML / JSON / CSV），本地解析 */
    danmakuRaw?: string
    /** 弹幕开关 */
    danmakuOn?: boolean
    /** 弹幕滚动速度（px/s，仅作参考，实际由 CSS 时长控制） */
    danmakuSpeed?: number
    /** 弹幕轨道行数 */
    danmakuRows?: number
  }>(),
  {
    src: '',
    mode: 'vod',
    poster: '',
    title: '',
    controlsMode: 'auto',
    autoplay: false,
    loop: false,
    muted: false,
    rates: () => [0.75, 1, 1.25, 1.5, 2],
    episodes: () => [],
    currentEpisode: undefined,
    episodeNav: true,
    playlist: true,
    pip: true,
    hls: 'auto',
    liveSync: true,
    iconStyle: 'filled',
    danmaku: () => [],
    danmakuSrc: '',
    danmakuRaw: '',
    danmakuOn: true,
    danmakuSpeed: 120,
    danmakuRows: 6,
  },
)

/** 三种弹幕来源任一存在即视为"有弹幕" */
const hasDanmaku = computed(
  () => props.danmaku.length > 0 || !!props.danmakuSrc || !!props.danmakuRaw,
)

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'ended'): void
  (e: 'timeupdate', current: number, duration: number): void
  (e: 'error', msg: string): void
  /** 切集（组件只发事件，换源交给调用方；若 episode 带 src 则组件自行切换） */
  (e: 'change-episode', ep: WdEpisode, index: number): void
  (e: 'rate-change', rate: number): void
  (e: 'update:danmakuOn', value: boolean): void
}>()

const video = ref<HTMLVideoElement | null>(null)
const wrap = ref<HTMLElement | null>(null)

const playing = ref(false)
const current = ref(0)
const duration = ref(0)
const buffered = ref(0)
const volume = ref(1)
const muted = ref(props.muted)
const rate = ref(1)
const ready = ref(false)
const errMsg = ref('')
const isFullscreen = ref(false)

const isLive = computed(() => props.mode === 'live')

/* ---------------- HLS ---------------- */
type HlsCtor = new (cfg?: Record<string, unknown>) => {
  attachMedia(el: HTMLMediaElement): void
  loadSource(src: string): void
  startLoad(startPosition?: number): void
  destroy(): void
  on(evt: string, cb: (...a: unknown[]) => void): void
  recoverMediaError(): void
}
let hls: InstanceType<HlsCtor> | null = null
const HLS = (globalThis as { Hls?: HlsCtor }).Hls
const isM3u8 = computed(() => /\.m3u8(\?|$)/i.test(props.src))

/**
 * 加载超时兜底。
 * 有些失败不会有 error 事件（如源被拦截、networkState=NO_SOURCE），
 * 界面会永远停在转圈上 —— 用户看不出是"在加载"还是"已经挂了"。
 */
let loadTimer: ReturnType<typeof setTimeout> | undefined
function armLoadTimeout() {
  if (loadTimer) clearTimeout(loadTimer)
  loadTimer = setTimeout(() => {
    const v = video.value
    // 已经有元数据/画面就不算超时（readyState >= 1 即有 metadata）
    if (ready.value || (v && v.readyState >= 1) || errMsg.value) return
    errMsg.value = '加载超时，请检查地址或网络'
    emit('error', errMsg.value)
  }, 15000)
}
function clearLoadTimeout() {
  if (loadTimer) { clearTimeout(loadTimer); loadTimer = undefined }
}

function destroyHls() {
  if (hls) { try { hls.destroy() } catch { /* 忽略 */ } hls = null }
}

/**
 * 是否支持原生 HLS 播放。
 *
 * 顺序很重要：**原生优先，失败再降级 hls.js**。
 * 之前写反了（有 MSE 就强推 hls.js），导致在原生支持 HLS 的 WebKit 上
 * 反而播不了 —— 实测同一地址直接在地址栏打开能播，组件里却不能。
 * 浏览器的原生 HLS 走系统解码器，比 MSE+hls.js 更稳，没有理由不用。
 */
const canNativeHls = () => {
  const v = document.createElement('video')
  return !!v.canPlayType('application/vnd.apple.mpegurl')
}

/**
 * hls.js 只认标准 MediaSource。
 * ⚠️ ManagedMediaSource（iOS 17.1+）**不是**它的替代品 ——
 * 之前把它也算进来是错的：iOS 上 typeof MediaSource === 'undefined'，
 * hls.js 根本跑不起来，强行选它必然失败。
 */
const hasMSE = () => typeof MediaSource !== 'undefined'

/** 原生播放 HLS 失败时，标记为需要降级 */
let tryFallbackHls = false

function mountSource() {
  const v = video.value
  if (!v) return
  destroyHls()
  clearLoadTimeout()
  v.removeAttribute('src')
  v.load()
  errMsg.value = ''
  tryFallbackHls = false

  // 非 m3u8（mp4/webm）或明确关闭 HLS 处理 → 直接交给浏览器
  if (props.hls === 'off' || !isM3u8.value) {
    v.src = props.src
    // ⚠️ 设完 src 立即重申内联属性：load() 会重置 iOS 的内联判定
    enforceInline()
    return
  }

  // 强制 hls.js
  if (props.hls === 'hlsjs') {
    attachHls()
    return
  }

  // 1) 原生优先（Safari / iOS / 支持 HLS 的 WebKit）
  if (canNativeHls()) {
    // 标记：若原生播放报错，error 处理里会降级到 hls.js
    tryFallbackHls = !!HLS && hasMSE()
    v.src = props.src
    return
  }

  // 2) 原生不支持 → hls.js
  if (HLS && hasMSE()) {
    attachHls()
    return
  }

  // 3) 都没有：交给浏览器，失败由 error 兜底提示
  v.src = props.src
}

/** 用 hls.js 挂载（MSE） */
function attachHls() {
  const v = video.value
  if (!v || !HLS) return
  hls = new HLS({
    // 直播从近边缘起播，别从头拉一堆积压分片
    liveSyncDurationCount: props.liveSync ? 3 : 6,
    enableWorker: true,
    lowLatencyMode: false,
  })
  // ⚠️ 顺序：先 loadSource 再 attachMedia。
  // 反过来（attach 后靠 MEDIA_ATTACHED 事件再 load）在部分实现里
  // 事件会早于监听器注册，导致永远不 load —— 表现为"一直转圈"。
  hls.on('hlsError' as never, ((_e: unknown, data: { fatal?: boolean; type?: string }) => {
    if (!data?.fatal) return
    if (data.type === 'mediaError') { hls?.recoverMediaError(); return }
    errMsg.value = '直播流连接失败'
    emit('error', errMsg.value)
  }) as never)
  hls.loadSource(props.src)
  hls.attachMedia(v)
}


/* ---------------- 控件显隐 ---------------- */
/** 暂停 / 刚进入 / 有面板打开 / 有焦点时，控件必须保持可见 */
const hovering = ref(false)
const panelOpen = ref<'' | 'playlist' | 'rate'>('')
const barVisible = computed(
  () =>
    props.controlsMode === 'always' ||
    !playing.value ||
    hovering.value ||
    panelOpen.value !== '' ||
    !ready.value,
)

let hideTimer: ReturnType<typeof setTimeout> | undefined
function poke() {
  hovering.value = true
  if (hideTimer) clearTimeout(hideTimer)
  if (props.controlsMode === 'auto' && playing.value && !panelOpen.value) {
    hideTimer = setTimeout(() => { hovering.value = false }, 2600)
  }
}
function onLeave() {
  if (hideTimer) clearTimeout(hideTimer)
  hovering.value = false
}

/**
 * 控件显隐不靠 CSS :hover —— 触屏没有 hover，且我们需要「鼠标静止才隐藏」。
 * 全屏时隐藏鼠标指针，避免光标停在画面上碍眼。
 */
const showCursor = computed(() => !isFullscreen.value || barVisible.value)

/* ---------------- 播放控制 ---------------- */
function togglePlay() {
  const v = video.value
  if (!v) return
  if (v.paused) {
    // 直播/点播都是用户点播放才开始真正拉流，超时计时从此刻起算
    if (!ready.value) armLoadTimeout()
    v.play().catch((e) => { errMsg.value = '播放失败：' + e.message })
  } else {
    v.pause()
  }
}


const progress = computed(() => {
  // 直播的 duration 是 Infinity，算出来是 NaN —— 必须挡掉，
  // 否则 style.width 会变成 "NaN%"（无效声明被丢弃，进度条不动）
  if (isLive.value || !isFinite(duration.value) || duration.value <= 0) return 0
  return (current.value / duration.value) * 100
})
const bufferedPct = computed(() => (duration.value > 0 ? (buffered.value / duration.value) * 100 : 0))
const remain = computed(() => Math.max(0, duration.value - current.value))

/** 直播显示当前时刻（每秒跳），比"已直播 00:00"有意义 */
const liveClock = ref('')
let clockTimer: ReturnType<typeof setInterval> | undefined
function tickClock() {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  liveClock.value = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}
watch(playing, (v) => {
  if (v && isLive.value) {
    tickClock()
    clockTimer = setInterval(tickClock, 1000)
  } else if (clockTimer) {
    clearInterval(clockTimer)
    clockTimer = undefined
  }
})

function onTimeUpdate() {
  const v = video.value
  if (!v) return
  // 能正常走时间轴说明源没问题，清掉之前的超时/错误提示
  if (errMsg.value && v.readyState >= 2) errMsg.value = ''
  current.value = v.currentTime
  duration.value = v.duration || 0
  emit('timeupdate', current.value, duration.value)
}

function onProgressEvt() {
  const v = video.value
  if (!v || !v.buffered.length) return
  buffered.value = v.buffered.end(v.buffered.length - 1)
}

/* ---------------- 进度拖动 ---------------- */
const dragging = ref(false)

function ratioFrom(e: MouseEvent | Touch, el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
}

function seekAt(e: MouseEvent) {
  const v = video.value
  if (!v || isLive.value || !duration.value) return
  const t = ratioFrom(e, e.currentTarget as HTMLElement) * duration.value
  v.currentTime = t
  current.value = t
}

function onScrubKey(e: KeyboardEvent) {
  const v = video.value
  if (!v) return
  if (e.key === 'ArrowRight' && !isLive.value) { v.currentTime = Math.min(v.duration || 0, v.currentTime + 5); e.preventDefault() }
  else if (e.key === 'ArrowLeft' && !isLive.value) { v.currentTime = Math.max(0, v.currentTime - 5); e.preventDefault() }
  else if (e.key === ' ' || e.key === 'Enter') { togglePlay(); e.preventDefault() }
}

/* ---------------- 音量 ---------------- */
function setVolumeAt(e: MouseEvent) {
  const v = video.value
  if (!v) return
  const r = ratioFrom(e, e.currentTarget as HTMLElement)
  volume.value = r
  v.volume = r
  v.muted = r === 0
  muted.value = v.muted
}
function toggleMute() {
  const v = video.value
  if (!v) return
  v.muted = !v.muted
  muted.value = v.muted
  if (!v.muted && v.volume === 0) { v.volume = 0.5; volume.value = 0.5 }
}

/* ---------------- 倍速 / 面板 ---------------- */
function setRate(r: number) {
  const v = video.value
  if (!v) return
  v.playbackRate = r
  rate.value = r
  panelOpen.value = ''
  emit('rateChange', r)
}

function togglePanel(p: 'playlist' | 'rate') {
  panelOpen.value = panelOpen.value === p ? '' : p
}

/* ---------------- 选集 ---------------- */
const epIndex = computed(() =>
  props.episodes.findIndex((e) => e.key === props.currentEpisode),
)
const hasPrev = computed(() => props.episodeNav && epIndex.value > 0)
const hasNext = computed(
  () => props.episodeNav && epIndex.value >= 0 && epIndex.value < props.episodes.length - 1,
)

function goEpisode(ep: WdEpisode | undefined, idx: number) {
  if (!ep || ep.disabled) return
  emit('changeEpisode', ep, idx)
  // 组件只负责发事件；若该集自带 src 则顺手切源
  if (ep.src && video.value) {
    video.value.src = ep.src
    video.value.play().catch(() => {})
  }
  panelOpen.value = ''
}

function prevEpisode() { if (hasPrev.value) goEpisode(props.episodes[epIndex.value - 1], epIndex.value - 1) }
function nextEpisode() { if (hasNext.value) goEpisode(props.episodes[epIndex.value + 1], epIndex.value + 1) }

/* ---------------- 画中画 / 全屏 ---------------- */
async function togglePip() {
  const v = video.value
  if (!v || !document.pictureInPictureEnabled) return
  try {
    if (document.pictureInPictureElement) await document.exitPictureInPicture()
    else await v.requestPictureInPicture()
  } catch { errMsg.value = '画中画不可用' }
}

function toggleFullscreen() {
  const el = wrap.value
  if (!el) return
  if (document.fullscreenElement) document.exitFullscreen()
  else el.requestFullscreen?.().catch(() => { errMsg.value = '全屏被拒绝（需用户手势）' })
}

function onFsChange() {
  isFullscreen.value = !!document.fullscreenElement
  poke()
}

/* ---------------- 错误 ---------------- */
function onError() {
  const v = video.value

  // 原生 HLS 播放失败 → 若还有 hls.js 这条路，降级再试一次
  if (tryFallbackHls && HLS && hasMSE()) {
    tryFallbackHls = false
    attachHls()
    return
  }

  const map: Record<number, string> = { 1: '加载被中断', 2: '网络错误', 3: '解码失败', 4: '地址不支持或格式不兼容' }
  errMsg.value = map[v?.error?.code || 0] || '视频加载失败'
  emit('error', errMsg.value)
}

/* ---------------- 生命周期 ---------------- */
watch(() => props.src, async () => {
  ready.value = false
  current.value = 0
  duration.value = 0
  buffered.value = 0
  await nextTick()
  mountSource()
})

// 首次挂载：等 video 元素就绪后再决定用哪种方式加载
/**
 * iOS 内联播放的强制设置。
 *
 * ⚠️ 为什么模板上写了 playsinline 还不够：
 *   1. Vue 对 `webkit-playsinline` 这类连字符小写属性，在某些编译路径下
 *      会被当成普通 attribute 丢掉（不报错）。
 *   2. **`v.load()` 会重置内联判定** —— iOS 在加载新源时重新决定
 *      要不要走系统全屏播放器。所以每次挂源之后都必须重新设置一遍。
 *   3. iOS 10+ 认 `playsinline`，iOS 9 认 `webkit-playsinline`，
 *      微信/QQ 的 X5 内核认 `x5-playsinline`，三个都要设。
 *
 * 任一缺失，iOS 就会在点击播放时进入系统全屏 ——
 * 表现正是"视频弹出去、我们的控件消失"。
 */
function enforceInline() {
  const v = video.value
  if (!v) return
  v.setAttribute('playsinline', 'true')
  v.setAttribute('webkit-playsinline', 'true')
  v.setAttribute('x5-playsinline', 'true')
  v.setAttribute('x5-video-player-type', 'h5')
  v.setAttribute('disablepictureinpicture', 'true')
  v.setAttribute('disableremoteplayback', 'true')
  // 非标准属性：部分老 WebView 只认这个 JS 属性
  ;(v as unknown as Record<string, unknown>).playsInline = true
  // iOS Safari 的另一条路径：显式声明不要内联以外的方式
  ;(v as unknown as Record<string, unknown>).webkitPlaysInline = true
}

onMounted(() => {
  // 先设属性，再挂源 —— 顺序不能反
  enforceInline()
  mountSource()
  if (props.autoplay) armLoadTimeout()
  document.addEventListener('fullscreenchange', onFsChange)

  /*
   * 兜底：iOS 会在 load / 切换源时重新判定内联，
   * 所以监听这几个事件，每次发生后立刻把属性再写一遍。
   * 用 { passive: true } 避免影响滚动性能。
   */
  const v = video.value
  if (v) {
    for (const evt of ['loadstart', 'loadedmetadata', 'canplay', 'play'] as const) {
      v.addEventListener(evt, enforceInline, { passive: true })
    }
  }
})

watch(() => props.muted, (m) => { if (video.value) video.value.muted = m })

onBeforeUnmount(() => {
  if (hideTimer) clearTimeout(hideTimer)
  if (clockTimer) clearInterval(clockTimer)
  clearLoadTimeout()
  destroyHls()
  document.removeEventListener('fullscreenchange', onFsChange)
})
</script>

<template>
  <div
    ref="wrap"
    class="wd-vplayer"
    :class="{ 'is-playing': playing, 'is-fullscreen': isFullscreen, 'no-cursor': !showCursor }"
    @mousemove="poke"
    @mouseleave="onLeave"
    @touchstart.passive="poke"
  >
    <video
      ref="video"
      class="wd-vplayer__el"
      :poster="poster"
      :loop="loop"
      :muted="muted"
      :autoplay="autoplay"
      playsinline
      webkit-playsinline
      x5-playsinline
      disablepictureinpicture
      disableremoteplayback
      preload="metadata"
      @click="togglePlay"
      @dblclick="toggleFullscreen"
      @play="playing = true; poke(); emit('play')"
      @pause="playing = false; emit('pause')"
      @ended="playing = false; emit('ended')"
      @timeupdate="onTimeUpdate"
      @progress="onProgressEvt"
      @loadedmetadata="ready = true; errMsg = ''; clearLoadTimeout(); onTimeUpdate()"
      @canplay="ready = true; errMsg = ''; clearLoadTimeout()"
      @playing="errMsg = ''"
      @error="onError"
    ></video>

    <!-- ===== 点击层：整个画面可暂停（鼠标指针不显示） ===== -->
    <div class="wd-vplayer__hit" @click="togglePlay"></div>

    <!-- ===== 顶部渐变条：标题 + 直播标识 ===== -->
    <div class="wd-vplayer__top" :class="{ 'is-visible': barVisible }">
      <span v-if="title" class="wd-vplayer__title">{{ title }}</span>
      <span v-if="isLive" class="wd-vplayer__live">
        <i class="wd-vplayer__live-dot"></i>直播
      </span>
      <!-- 顶部右侧：清晰度切换、弹幕开关、片源等 -->
      <span class="wd-vplayer__spacer"></span>
      <slot name="top-right" />
    </div>

    <!-- ===== 弹幕层（内置） ===== -->
    <wd-danmaku
      v-if="hasDanmaku"
      :items="danmaku"
      :src="danmakuSrc"
      :raw="danmakuRaw"
      :current="current"
      :visible="danmakuOn"
      :paused="!playing"
      :rows="danmakuRows"
    />

    <!-- ===== 画面覆盖层：自定义字幕 / 水印 ===== -->
    <div class="wd-vplayer__overlay">
      <slot name="overlay" :playing="playing" :current="current" :duration="duration" />
    </div>

    <!-- ===== 中央大播放按钮（未播放时） ===== -->
    <button
      v-if="!playing && !errMsg"
      type="button"
      class="wd-vplayer__big"
      aria-label="播放"
      @click.stop="togglePlay"
    >
      <wd-icon name="play" :variant="iconStyle" :size="30" />
    </button>

    <!-- 加载中 -->
    <div v-if="!ready && !errMsg" class="wd-vplayer__loading" aria-hidden="true">
      <span class="wd-vplayer__spinner"></span>
    </div>

    <!-- 错误 -->
    <div v-if="errMsg" class="wd-vplayer__error">
      <wd-icon name="warning-circle" :variant="iconStyle" :size="22" />
      <span>{{ errMsg }}</span>
    </div>

    <!-- ===== 底部长条（全部控件） ===== -->
    <div class="wd-vplayer__bottom" :class="{ 'is-visible': barVisible }">
      <slot name="above-controls" />
      <!-- 进度条（点播） -->
      <div
        v-if="!isLive"
        class="wd-vplayer__scrub"
        role="slider"
        tabindex="0"
        aria-label="播放进度"
        :aria-valuenow="Math.round(progress)"
        aria-valuemin="0"
        aria-valuemax="100"
        @click.stop="seekAt"
        @keydown="onScrubKey"
      >
        <span class="wd-vplayer__track"></span>
        <span class="wd-vplayer__buffer" :style="{ width: bufferedPct + '%' }"></span>
        <span class="wd-vplayer__played" :style="{ width: progress + '%' }"></span>
        <span class="wd-vplayer__knob" :style="{ left: progress + '%' }"></span>
      </div>
      <!-- 直播：不做进度条，只显示一条「实时」细线 -->
      <div v-else class="wd-vplayer__live-bar">
        <span></span>
      </div>

      <div class="wd-vplayer__row">
        <!-- 控制条最左：极少用，留给自定义入口 -->
        <slot name="controls-start" />
        <button type="button" class="wd-vplayer__btn" :aria-label="playing ? '暂停' : '播放'" @click.stop="togglePlay">
          <wd-icon :name="playing ? 'pause' : 'play'" :variant="iconStyle" :size="18" />
        </button>

        <!-- 上下集 -->
        <template v-if="episodeNav && episodes.length">
          <button
            type="button"
            class="wd-vplayer__btn"
            :disabled="!hasPrev"
            aria-label="上一集"
            @click.stop="prevEpisode"
          >
            <wd-icon name="skip-previous" :variant="iconStyle" :size="17" />
          </button>
          <button
            type="button"
            class="wd-vplayer__btn"
            :disabled="!hasNext"
            aria-label="下一集"
            @click.stop="nextEpisode"
          >
            <wd-icon name="skip-next" :variant="iconStyle" :size="17" />
          </button>
        </template>

        <span v-if="!isLive" class="wd-vplayer__time">
          {{ formatDuration(current) }} / {{ formatDuration(duration) }}
        </span>
        <!-- 直播的 currentTime 是相对起播的偏移，不是节目时间，
             显示 "已直播 00:00" 会让用户困惑 → 改显示当前时刻 -->
        <span v-else class="wd-vplayer__time">{{ liveClock }}</span>

        <span class="wd-vplayer__spacer"></span>

        <!-- 弹幕开关 -->
        <button
          v-if="hasDanmaku"
          type="button"
          class="wd-vplayer__btn wd-vplayer__btn--text"
          :class="{ 'is-muted': !danmakuOn }"
          :aria-pressed="danmakuOn"
          aria-label="弹幕"
          @click.stop="emit('update:danmakuOn', !danmakuOn)"
        >
          弹
        </button>

        <!-- 右侧扩展位：字幕、音轨、清晰度等（在原生控件之前） -->
        <slot name="controls-end" />

        <!-- 音量：hover 展开滑条，避免长期占宽 -->
        <div class="wd-vplayer__vol">
          <button type="button" class="wd-vplayer__btn" :aria-label="muted ? '取消静音' : '静音'" @click.stop="toggleMute">
            <wd-icon :name="muted ? 'volume-mute' : 'volume-up'" :variant="iconStyle" :size="17" />
          </button>
          <div class="wd-vplayer__vol-slider" @click.stop="setVolumeAt">
            <span class="wd-vplayer__vol-fill" :style="{ width: (muted ? 0 : volume * 100) + '%' }"></span>
          </div>
        </div>

        <!-- 倍速（点播） -->
        <div v-if="!isLive" class="wd-vplayer__panel-wrap">
          <button
            type="button"
            class="wd-vplayer__btn wd-vplayer__btn--text"
            :aria-expanded="panelOpen === 'rate'"
            aria-label="倍速"
            @click.stop="togglePanel('rate')"
          >{{ rate }}×</button>
          <div v-if="panelOpen === 'rate'" class="wd-vplayer__panel wd-vplayer__panel--rates" @click.stop>
            <button
              v-for="r in rates"
              :key="r"
              type="button"
              :class="{ 'is-on': r === rate }"
              @click="setRate(r)"
            >{{ r }}×</button>
          </div>
        </div>

        <!-- 选集 -->
        <div v-if="playlist && episodes.length" class="wd-vplayer__panel-wrap">
          <button
            type="button"
            class="wd-vplayer__btn"
            :aria-expanded="panelOpen === 'playlist'"
            aria-label="选集"
            @click.stop="togglePanel('playlist')"
          >
            <wd-icon name="playlist" :variant="iconStyle" :size="17" />
          </button>
          <div v-if="panelOpen === 'playlist'" class="wd-vplayer__panel wd-vplayer__panel--eps" @click.stop>
            <div class="wd-vplayer__eps-head">选集 · 共 {{ episodes.length }} 集</div>
            <div class="wd-vplayer__eps-grid">
              <button
                v-for="(ep, i) in episodes"
                :key="ep.key"
                type="button"
                class="wd-vplayer__ep"
                :class="{ 'is-on': ep.key === currentEpisode, 'is-off': ep.disabled }"
                :disabled="ep.disabled"
                @click="goEpisode(ep, i)"
              >
                <span>{{ ep.label }}</span>
                <i v-if="ep.tag" class="wd-vplayer__ep-tag">{{ ep.tag }}</i>
              </button>
            </div>
          </div>
        </div>

        <button v-if="pip" type="button" class="wd-vplayer__btn" aria-label="画中画" @click.stop="togglePip">
          <wd-icon name="pip" :variant="iconStyle" :size="17" />
        </button>

        <button type="button" class="wd-vplayer__btn" aria-label="全屏" @click.stop="toggleFullscreen">
          <wd-icon name="maximize" :variant="iconStyle" :size="17" />
        </button>
      </div>
    </div>
  </div>
</template>
