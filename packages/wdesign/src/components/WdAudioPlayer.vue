<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { formatDuration } from './time'

defineOptions({ name: 'WdAudioPlayer' })

const props = withDefaults(
  defineProps<{
    /** 音频地址 */
    src?: string
    /**
     * 卡片形态。去掉封面之后，波形应当升格为视觉主体 ——
     * 参考主流音乐 App：波形取代封面占据主位置，控件在下方分层。
     *
     *  card   — 竖版卡片：波形为主体，标题在上、控件在下（默认推荐）
     *  bar    — 横条：封面 + 标题 + 细进度，适合列表内嵌
     *  mini   — 迷你横条：单行极简，适合固定底栏
     */
    variant?: 'card' | 'bar' | 'mini'
    /** 兼容旧用法：等同于 variant="mini" */
    compact?: boolean
    /** 标题 */
    title?: string
    /** 副标题（作者 / 专辑 / 说明） */
    subtitle?: string
    /** 封面；不给则显示占位图形 */
    cover?: string
    loop?: boolean
    /** 显示音量（mini 不显示） */
    volume?: boolean
    /** 显示倍速 */
    playbackRate?: boolean
    /** 显示下载 */
    downloadable?: boolean
    /** 显示上一首/下一首 */
    navigable?: boolean
    /** 初始音量 0-1 */
    initialVolume?: number
    /** 波形（0-1 数组）；不给则用细进度线 */
    waveform?: number[]
    /**
     * 反色卡片（深色底、文字反白）。
     * 用于需要强调的单曲展示，视觉上从页面中"跳出来"。
     */
    inverse?: boolean
    /** 显示时间标签 */
    showTime?: boolean
    /** 图标风格 */
    iconStyle?: 'filled' | 'outlined'
  }>(),
  {
    variant: 'card',
    compact: false,
    title: '',
    subtitle: '',
    cover: '',
    loop: false,
    volume: true,
    playbackRate: true,
    downloadable: false,
    navigable: true,
    initialVolume: 1,
    waveform: () => [],
    inverse: false,
    showTime: true,
    iconStyle: 'filled',
  },
)

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'ended'): void
  (e: 'timeupdate', current: number, duration: number): void
  (e: 'error', msg: string): void
  (e: 'prev'): void
  (e: 'next'): void
}>()

/* ---------------- 兼容旧 API ---------------- */
const mode = computed<'card' | 'bar' | 'mini'>(() => (props.compact ? 'mini' : props.variant))

const audio = ref<HTMLAudioElement | null>(null)
const playing = ref(false)
const current = ref(0)
const duration = ref(0)
const buffered = ref(0)
const volume = ref(props.initialVolume)
const muted = ref(false)
const rate = ref(1)
const errMsg = ref('')
const rateOpen = ref(false)

const progress = computed(() =>
  duration.value > 0 ? (current.value / duration.value) * 100 : 0,
)
const bufferedPct = computed(() =>
  duration.value > 0 ? (buffered.value / duration.value) * 100 : 0,
)

/**
 * 是否有封面。
 *
 * 大部分 web 音频（播客 / 语音记录 / 提示音）没有音乐封面，
 * 所以「无封面」反而是主场景 —— card 形态必须两种情况都好看：
 *   有封面 → 封面当视觉主体，波形缩成细密的一条（参考白色版）
 *   无封面 → 波形升格为主体，占据原封面的位置（参考绿色版）
 */
const hasCover = computed(() => !!props.cover)

/* ---------------- 波形 ---------------- */
/**
 * 波形柱。
 *
 * 参考图的核心规律：**波形就是去掉封面后的「封面」**。
 * 它必须占据主位置、够高、够密 —— 之前把它做成 30px 高的一行装饰，
 * 所以整个卡片看起来像列表项而不是播放器。
 */
/**
 * 波形密度随主体变化：
 *   无封面（波形是主体）→ 30 根，粗、间距大，像参考图的绿色版
 *   有封面（波形是辅助）→ 90 根，细密，像白色版
 */
const WAVE_BARS_THICK = 30
const WAVE_BARS_FINE = 60

const bars = computed(() => {
  if (props.waveform.length) return props.waveform
  return null
})

/** 没有真实波形数据时，生成一条稳定可复现的示意波（不用随机，避免每次重渲染跳动） */
const waveCount = computed(() => (hasCover.value ? WAVE_BARS_FINE : WAVE_BARS_THICK))

const demoWave = computed(() =>
  Array.from({ length: waveCount.value }, (_, i) => {
    const t = i / waveCount.value
    // 几个不同频率的正弦叠加：模拟人声/音乐的起伏，中间略高、两端收敛
    const v =
      Math.abs(Math.sin(t * 9.2) * 0.42) +
      Math.abs(Math.sin(t * 23.7 + 1.3) * 0.28) +
      Math.abs(Math.sin(t * 4.1 + 2.7) * 0.3)
    const envelope = Math.sin(Math.PI * t) * 0.35 + 0.65
    return Math.min(1, Math.max(0.06, v * envelope))
  }),
)

const waveBars = computed(() => {
  if (props.waveform.length) return props.waveform
  return demoWave.value
})

/* ---------------- 播放控制 ---------------- */
function togglePlay() {
  const a = audio.value
  if (!a) return
  if (a.paused) a.play().catch((e) => { errMsg.value = '播放失败：' + e.message })
  else a.pause()
}

const dragging = ref(false)
const dragPct = ref(0)
const shownPct = computed(() => (dragging.value ? dragPct.value : progress.value))

function pctFrom(e: MouseEvent, el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
}

function seekTo(e: MouseEvent) {
  const a = audio.value
  if (!a || !duration.value) return
  const t = pctFrom(e, e.currentTarget as HTMLElement) * duration.value
  a.currentTime = t
  current.value = t
}

function onScrubKey(e: KeyboardEvent) {
  const a = audio.value
  if (!a) return
  if (e.key === 'ArrowRight') { a.currentTime = Math.min(a.duration || 0, a.currentTime + 5); e.preventDefault() }
  else if (e.key === 'ArrowLeft') { a.currentTime = Math.max(0, a.currentTime - 5); e.preventDefault() }
  else if (e.key === ' ' || e.key === 'Enter') { togglePlay(); e.preventDefault() }
}

function onTimeUpdate() {
  const a = audio.value
  if (!a) return
  if (!dragging.value) current.value = a.currentTime
  duration.value = a.duration || 0
  emit('timeupdate', current.value, duration.value)
}

function onProgress() {
  const a = audio.value
  if (!a || !a.buffered.length) return
  buffered.value = a.buffered.end(a.buffered.length - 1)
}

function setVolume(e: MouseEvent) {
  const a = audio.value
  if (!a) return
  const r = pctFrom(e, e.currentTarget as HTMLElement)
  volume.value = r
  a.volume = r
  a.muted = r === 0
  muted.value = a.muted
}

function toggleMute() {
  const a = audio.value
  if (!a) return
  a.muted = !a.muted
  muted.value = a.muted
  if (!a.muted && a.volume === 0) { a.volume = 0.5; volume.value = 0.5 }
}

function setRate(r: number) {
  const a = audio.value
  if (!a) return
  a.playbackRate = r
  rate.value = r
  rateOpen.value = false
}

function onError() {
  const a = audio.value
  const map: Record<number, string> = { 1: '加载被中断', 2: '网络错误', 3: '解码失败', 4: '地址不支持' }
  errMsg.value = map[a?.error?.code || 0] || '音频加载失败'
  emit('error', errMsg.value)
}

/** 剩余时间（参考图里右侧显示的是 -3:56 这种倒计时） */
/**
 * 右侧时间。
 * 参考图显示的是倒计时（-3:56），信息量比总时长更大；
 * 但未加载出时长时留空 —— `-:--` 的占位反而干扰阅读。
 */
const remainText = computed(() =>
  duration.value > 0 ? '-' + formatDuration(Math.max(0, duration.value - current.value)) : '',
)

watch(() => props.src, () => {
  errMsg.value = ''
  current.value = 0
  duration.value = 0
  buffered.value = 0
})

onBeforeUnmount(() => { /* 媒体元素随组件销毁，无需额外清理 */ })

defineExpose({ play: () => audio.value?.play(), pause: () => audio.value?.pause() })
</script>

<template>
  <div
    class="wd-audio"
    :class="[
      `wd-audio--${mode}`,
      {
        'wd-audio--playing': playing,
        'wd-audio--inverse': inverse,
        'has-cover': hasCover,
      },
    ]"
  >
    <audio
      ref="audio"
      :src="src"
      :loop="loop"
      preload="metadata"
      @play="playing = true; emit('play')"
      @pause="playing = false; emit('pause')"
      @ended="playing = false; emit('ended')"
      @timeupdate="onTimeUpdate"
      @progress="onProgress"
      @loadedmetadata="onTimeUpdate"
      @error="onError"
    ></audio>

    <!-- ==================== 竖版卡片 ==================== -->
    <template v-if="mode === 'card'">
      <!-- 顶部：有封面时封面在左、标题在右（横向排布，见样式说明） -->
      <div class="wd-audio__top">
        <div v-if="hasCover" class="wd-audio__hero-cover">
          <slot name="cover"><img :src="cover" alt="" /></slot>
          <span v-if="playing" class="wd-audio__hero-badge"><i></i><i></i><i></i></span>
        </div>
        <div class="wd-audio__head">
          <div class="wd-audio__title">{{ title }}</div>
          <div v-if="subtitle" class="wd-audio__subtitle">{{ subtitle }}</div>
          <slot name="info" />
        </div>
        <div class="wd-audio__top-extra">
          <slot name="actions" />
        </div>
      </div>

      <!--
        视觉主体：
          有封面 → 大封面（正方形，圆角），波形在下方缩成细密一条
          无封面 → 波形升格为主体，高度显著加大，取代封面的位置
        这是两种参考设计的核心差异，由一个 hasCover 分支切换。
      -->
      <div
        class="wd-audio__wave"
        :class="hasCover ? 'wd-audio__wave--fine' : 'wd-audio__wave--hero'"
        role="slider"
        tabindex="0"
        aria-label="播放进度"
        :aria-valuenow="Math.round(shownPct)"
        aria-valuemin="0"
        aria-valuemax="100"
        @click="seekTo"
        @keydown="onScrubKey"
      >
        <span
          v-for="(h, i) in waveBars"
          :key="i"
          class="wd-audio__wave-bar"
          :class="{ 'is-on': (i / waveBars.length) * 100 <= shownPct }"
          :style="{ height: '100%', transform: `scaleY(${h})` }"
        ></span>
      </div>

      <div v-if="showTime" class="wd-audio__times">
        <span>{{ formatDuration(current) }}</span>
        <span class="wd-audio__remain">{{ remainText }}</span>
      </div>

      <!-- 控件：播放键为绝对主体，其余次级且弱化 -->
      <div class="wd-audio__controls">
        <!--
          倍速菜单必须以**这个按钮**为锚点。
          ⚠️ 之前菜单写在 controls 之后、用 `left:50%; bottom:74px` 定位，
          那是以整张卡片为参照 —— 于是它跑到卡片正中偏上（"跑到音频卡片上方"）。
          现在把菜单挪进按钮的 wrapper，定位上下文就是按钮本身。
        -->
        <span v-if="playbackRate" class="wd-audio__rate-anchor">
          <button
            type="button"
            class="wd-audio__ctl wd-audio__ctl--text"
            :aria-label="`倍速 ${rate}x`"
            @click="rateOpen = !rateOpen"
          >{{ rate }}×</button>
          <div v-if="rateOpen" class="wd-audio__rate-menu wd-audio__rate-menu--card">
            <button v-for="r in [0.75, 1, 1.25, 1.5, 2]" :key="r" type="button"
              :class="{ 'is-on': r === rate }" @click="setRate(r)">{{ r }}×</button>
          </div>
        </span>
        <span v-else class="wd-audio__ctl-spacer"></span>

        <button v-if="navigable" type="button" class="wd-audio__ctl" aria-label="上一首" @click="emit('prev')">
          <wd-icon name="skip-previous" :variant="iconStyle" :size="24" />
        </button>

        <button type="button" class="wd-audio__main-btn" :aria-label="playing ? '暂停' : '播放'" @click="togglePlay">
          <wd-icon :name="playing ? 'pause' : 'play'" :variant="iconStyle" :size="25" />
        </button>

        <button v-if="navigable" type="button" class="wd-audio__ctl" aria-label="下一首" @click="emit('next')">
          <wd-icon name="skip-next" :variant="iconStyle" :size="24" />
        </button>

        <button
          v-if="volume"
          type="button"
          class="wd-audio__ctl"
          :aria-label="muted ? '取消静音' : '静音'"
          @click="toggleMute"
        >
          <wd-icon :name="muted ? 'volume-mute' : 'volume-up'" :variant="iconStyle" :size="24" />
        </button>
        <span v-else class="wd-audio__ctl-spacer"></span>
      </div>

      <div v-if="errMsg" class="wd-audio__err">{{ errMsg }}</div>
    </template>

    <!-- ==================== 横条 ==================== -->
    <template v-else-if="mode === 'bar'">
      <!--  封面即播放键：一块可点击区域，不再并排两个元素 -->
      <button
        type="button"
        class="wd-audio__cover"
        :aria-label="playing ? '暂停' : '播放'"
        @click="togglePlay"
      >
        <slot name="cover">
          <img v-if="cover" :src="cover" alt="" />
          <wd-icon v-else class="wd-audio__cover-placeholder" name="music" :variant="iconStyle" :size="22" />
        </slot>
        <span class="wd-audio__cover-play">
          <wd-icon :name="playing ? 'pause' : 'play'" :variant="iconStyle" :size="16" />
        </span>
        <span v-if="playing" class="wd-audio__pulse"><i></i><i></i><i></i></span>
      </button>

      <div class="wd-audio__main">
        <div v-if="title || subtitle || $slots.info" class="wd-audio__meta">
          <span class="wd-audio__title">{{ title }}</span>
          <span v-if="subtitle" class="wd-audio__subtitle">{{ subtitle }}</span>
          <slot name="info" />
        </div>

        <!--
          时间与进度条**同一行**，不单独占一行。
          ⚠️ 之前时间另起一行，导致右侧内容比左侧封面高出两行，
          封面显得"矮了一截"，整条重心偏上。
          现在：已播时间 → 进度条 → 总时长，三者垂直居中于一行。
        -->
        <div class="wd-audio__progress-row">
          <span class="wd-audio__time-cur">{{ formatDuration(current) }}</span>

          <div v-if="bars" class="wd-audio__wave" role="slider" tabindex="0" aria-label="播放进度"
            :aria-valuenow="Math.round(shownPct)" @click="seekTo" @keydown="onScrubKey">
            <span v-for="(h, i) in bars" :key="i" class="wd-audio__wave-bar"
              :class="{ 'is-on': (i / bars.length) * 100 <= shownPct }"
              :style="{ height: '100%', transform: `scaleY(${h})` }"></span>
          </div>

          <div v-else class="wd-audio__scrub" role="slider" tabindex="0" aria-label="播放进度"
            :aria-valuenow="Math.round(shownPct)" @click="seekTo" @keydown="onScrubKey">
            <span class="wd-audio__track"></span>
            <span class="wd-audio__buffer" :style="{ width: bufferedPct + '%' }"></span>
            <span class="wd-audio__played" :style="{ width: shownPct + '%' }"></span>
            <span class="wd-audio__knob" :style="{ left: shownPct + '%' }"></span>
          </div>

          <span class="wd-audio__time-total">{{ formatDuration(duration) }}</span>
          <span v-if="errMsg" class="wd-audio__err">{{ errMsg }}</span>
        </div>
        <slot name="extra" />
      </div>

      <div class="wd-audio__side">
        <div v-if="volume" class="wd-audio__vol">
          <button type="button" class="wd-audio__ibtn" :aria-label="muted ? '取消静音' : '静音'" @click="toggleMute">
            <wd-icon :name="muted ? 'volume-mute' : 'volume-up'" :variant="iconStyle" :size="15" />
          </button>
          <div class="wd-audio__vol-track" @click="setVolume">
            <span class="wd-audio__vol-fill" :style="{ width: (muted ? 0 : volume * 100) + '%' }"></span>
          </div>
        </div>

        <div v-if="playbackRate" class="wd-audio__rate">
          <button type="button" class="wd-audio__ibtn wd-audio__ibtn--text" @click="rateOpen = !rateOpen">{{ rate }}×</button>
          <div v-if="rateOpen" class="wd-audio__rate-menu">
            <button v-for="r in [0.75, 1, 1.25, 1.5, 2]" :key="r" type="button"
              :class="{ 'is-on': r === rate }" @click="setRate(r)">{{ r }}×</button>
          </div>
        </div>

        <a v-if="downloadable" class="wd-audio__ibtn" :href="src" download aria-label="下载">
          <wd-icon name="download" :variant="iconStyle" :size="15" />
        </a>
        <slot name="actions" />
      </div>
    </template>

    <!-- ==================== 迷你横条 ==================== -->
    <template v-else>
      <button type="button" class="wd-audio__mini-play" :aria-label="playing ? '暂停' : '播放'" @click="togglePlay">
        <wd-icon :name="playing ? 'pause' : 'play'" :variant="iconStyle" :size="14" />
      </button>

      <div class="wd-audio__mini-main">
        <div class="wd-audio__mini-text">
          <span class="wd-audio__title">{{ title }}</span>
          <span v-if="subtitle" class="wd-audio__subtitle">{{ subtitle }}</span>
        </div>
        <div class="wd-audio__mini-progress" role="slider" tabindex="0" aria-label="播放进度"
          :aria-valuenow="Math.round(shownPct)" @click="seekTo" @keydown="onScrubKey">
          <span class="wd-audio__mini-track">
            <span class="wd-audio__mini-fill" :style="{ width: shownPct + '%' }"></span>
          </span>
        </div>
      </div>

      <span class="wd-audio__mini-time">{{ formatDuration(current) }} / {{ formatDuration(duration) }}</span>
    </template>
  </div>
</template>
