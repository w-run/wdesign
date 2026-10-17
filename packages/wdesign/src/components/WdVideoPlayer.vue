<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

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
     * HLS(m3u8) 解析：
     *  'auto'  — 地址以 .m3u8 结尾时自动启用（浏览器原生支持则用原生，否则用 hls.js）
     *  'native'— 强制用浏览器原生（Safari / iOS）
     *  'hlsjs' — 强制用 hls.js（需页面已加载 Hls 全局）
     *  'off'   — 不处理
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
  },
)

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'ended'): void
  (e: 'timeupdate', current: number, duration: number): void
  (e: 'error', msg: string): void
  /** 切集（组件只发事件，换源交给调用方；若 episode 带 src 则组件自行切换） */
  (e: 'changeEpisode', ep: WdEpisode, index: number): void
  (e: 'rateChange', rate: number): void
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
    if (!ready.value && !errMsg.value) {
      errMsg.value = '加载超时，请检查地址或网络'
      emit('error', errMsg.value)
    }
  }, 15000)
}
function clearLoadTimeout() {
  if (loadTimer) { clearTimeout(loadTimer); loadTimer = undefined }
}

function destroyHls() {
  if (hls) { try { hls.destroy() } catch { /* 忽略 */ } hls = null }
}

/**
 * ⚠️ canPlayType 会「假阳性」：某些 WebKit/MSE 环境声称支持
 * application/vnd.apple.mpegurl，实际没有解码能力（实测 networkState=3、
 * currentSrc 为空、readyState 永远 0）。单凭它选原生路径会静默失败。
 *
 * 因此：只要页面上有 hls.js 且 MediaSource 可用，就优先走 hls.js ——
 * 行为可预期（可报错、可恢复），原生仅在 hls.js 缺席时使用。
 */
const hasMSE = () =>
  typeof MediaSource !== 'undefined' ||
  typeof (globalThis as { ManagedMediaSource?: unknown }).ManagedMediaSource !== 'undefined'

const canNativeHls = () => {
  const v = document.createElement('video')
  return !!v.canPlayType('application/vnd.apple.mpegurl') && !hasMSE()
}

/**
 * 挂载视频源。m3u8 的处理顺序：
 *   1. hls='off' → 直接交给浏览器
 *   2. 浏览器原生支持（Safari/iOS）且非强制 hlsjs → 原生
 *   3. 页面有 Hls 全局 → hls.js（MSE）
 *   4. 都没有 → 交回原生，失败则由 error 事件兜底提示
 */
function mountSource() {
  const v = video.value
  if (!v) return
  destroyHls()
  clearLoadTimeout()
  armLoadTimeout()
  v.removeAttribute('src')
  v.load()
  errMsg.value = ''

  if (props.hls === 'off' || !isM3u8.value) {
    v.src = props.src
    return
  }
  const forceJs = props.hls === 'hlsjs'
  if (!forceJs && canNativeHls()) {
    v.src = props.src
    return
  }
  if (HLS) {
    hls = new HLS({
      // 直播：从最近的边缘开始，别从头拉起一堆积压的分片
      liveSyncDurationCount: props.liveSync ? 3 : 6,
      enableWorker: true,
      lowLatencyMode: false,
    })
    hls.attachMedia(v)
    hls.on('hlsMediaAttached' as never, () => hls?.loadSource(props.src))
    hls.on('hlsError' as never, ((_e: unknown, data: { fatal?: boolean; type?: string }) => {
      if (!data?.fatal) return
      // 媒体错误可恢复一次，避免网络抖动直接判死
      if (data.type === 'mediaError') {
        hls?.recoverMediaError()
        return
      }
      errMsg.value = '直播流连接失败'
      emit('error', errMsg.value)
    }) as never)
    return
  }
  // 兜底：交给浏览器，不行会触发 error
  v.src = props.src
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
  if (v.paused) v.play().catch((e) => { errMsg.value = '播放失败：' + e.message })
  else v.pause()
}

function fmtTime(t: number): string {
  if (!isFinite(t) || t < 0) t = 0
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = Math.floor(t % 60)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

const progress = computed(() =>
  isLive.value || !duration.value ? 0 : (current.value / duration.value) * 100,
)
const bufferedPct = computed(() => (duration.value > 0 ? (buffered.value / duration.value) * 100 : 0))
const remain = computed(() => Math.max(0, duration.value - current.value))

function onTimeUpdate() {
  const v = video.value
  if (!v) return
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
onMounted(() => {
  mountSource()
  document.addEventListener('fullscreenchange', onFsChange)
})

watch(() => props.muted, (m) => { if (video.value) video.value.muted = m })

onBeforeUnmount(() => {
  if (hideTimer) clearTimeout(hideTimer)
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
      preload="metadata"
      @click="togglePlay"
      @dblclick="toggleFullscreen"
      @play="playing = true; poke(); emit('play')"
      @pause="playing = false; emit('pause')"
      @ended="playing = false; emit('ended')"
      @timeupdate="onTimeUpdate"
      @progress="onProgressEvt"
      @loadedmetadata="ready = true; clearLoadTimeout(); onTimeUpdate()"
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

    <!-- ===== 画面覆盖层：弹幕 / 自定义字幕 / 水印 ===== -->
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
          {{ fmtTime(current) }} / {{ fmtTime(duration) }}
        </span>
        <span v-else class="wd-vplayer__time">已直播 {{ fmtTime(current) }}</span>

        <span class="wd-vplayer__spacer"></span>

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
