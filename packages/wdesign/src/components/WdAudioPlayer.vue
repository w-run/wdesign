<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { formatDuration } from './time'

defineOptions({ name: 'WdAudioPlayer' })

const props = withDefaults(
  defineProps<{
    /** 音频地址 */
    src?: string
    /** 标题 */
    title?: string
    /** 副标题（作者 / 专辑 / 说明） */
    subtitle?: string
    /** 封面图 */
    cover?: string
    /** 循环 */
    loop?: boolean
    /** 显示音量 */
    volume?: boolean
    /** 显示倍速 */
    playbackRate?: boolean
    /** 显示下载按钮 */
    downloadable?: boolean
    /** 紧凑模式：更矮，适合列表内嵌 */
    compact?: boolean
    /** 初始音量 0-1 */
    initialVolume?: number
    /** 波形（0-1 的数组）；给了就画波形而不是细进度线 */
    waveform?: number[]
    /** 图标风格。默认 outlined —— 音频条在浅色卡片上，细线更贴合正文排版层次 */
    iconStyle?: 'filled' | 'outlined'
  }>(),
  {
    src: '',
    title: '',
    subtitle: '',
    cover: '',
    loop: false,
    volume: true,
    playbackRate: true,
    downloadable: false,
    compact: false,
    initialVolume: 1,
    waveform: () => [],
    iconStyle: 'outlined',
  },
)

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'ended'): void
  (e: 'timeupdate', current: number, duration: number): void
  (e: 'error', msg: string): void
}>()

const audio = ref<HTMLAudioElement | null>(null)
const playing = ref(false)
const current = ref(0)
const duration = ref(0)
const buffered = ref(0)
const volume = ref(props.initialVolume)
const muted = ref(false)
const rate = ref(1)
const ready = ref(false)
const errMsg = ref('')
const rateOpen = ref(false)


const progress = computed(() => (duration.value > 0 ? (current.value / duration.value) * 100 : 0))
const bufferedPct = computed(() => (duration.value > 0 ? (buffered.value / duration.value) * 100 : 0))
const remain = computed(() => Math.max(0, duration.value - current.value))

/** 波形柱：未给 waveform 时按固定规律生成一条稳定的示意波 */
const bars = computed(() => {
  if (props.waveform.length) return props.waveform
  return null
})

function togglePlay() {
  const a = audio.value
  if (!a) return
  if (a.paused) a.play().catch((e) => { errMsg.value = '播放失败：' + e.message })
  else a.pause()
}

/** 让拖动的进度在拖动中不跳回（拖动时暂停 timeupdate 覆盖） */
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

watch(() => props.src, () => {
  errMsg.value = ''
  ready.value = false
  current.value = 0
  duration.value = 0
  buffered.value = 0
})

defineExpose({ play: () => audio.value?.play(), pause: () => audio.value?.pause() })
</script>

<template>
  <div class="wd-audio" :class="{ 'wd-audio--compact': compact, 'wd-audio--playing': playing }">
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
      @loadedmetadata="ready = true; onTimeUpdate()"
      @error="onError"
    ></audio>

    <!-- 封面 -->
    <div v-if="cover || !compact || $slots.cover" class="wd-audio__cover">
      <slot name="cover">
        <img v-if="cover" :src="cover" alt="" />
        <wd-icon v-else name="music" :variant="iconStyle" :size="compact ? 16 : 20" />
      </slot>
      <!-- 播放中的跳动指示 -->
      <span v-if="playing" class="wd-audio__pulse"><i></i><i></i><i></i></span>
    </div>

    <button type="button" class="wd-audio__play" :aria-label="playing ? '暂停' : '播放'" @click="togglePlay">
      <wd-icon v-if="playing" name="pause" :variant="iconStyle" :size="16" />
      <wd-icon v-else name="play" :variant="iconStyle" :size="16" />
    </button>

    <div class="wd-audio__main">
      <div v-if="title || subtitle || $slots.info" class="wd-audio__meta">
        <span class="wd-audio__title">{{ title }}</span>
        <span v-if="subtitle" class="wd-audio__subtitle">{{ subtitle }}</span>
        <!-- 标题下方扩展位：歌词、标签、作者链接等 -->
        <slot name="info" />
      </div>

      <!-- 波形模式 -->
      <div
        v-if="bars"
        class="wd-audio__wave"
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
          v-for="(h, i) in bars"
          :key="i"
          class="wd-audio__wave-bar"
          :class="{ 'is-on': (i / bars.length) * 100 <= shownPct }"
          :style="{ height: Math.max(12, h * 100) + '%' }"
        ></span>
      </div>

      <!-- 进度线模式 -->
      <div
        v-else
        class="wd-audio__scrub"
        role="slider"
        tabindex="0"
        aria-label="播放进度"
        :aria-valuenow="Math.round(shownPct)"
        aria-valuemin="0"
        aria-valuemax="100"
        @click="seekTo"
        @keydown="onScrubKey"
      >
        <span class="wd-audio__track"></span>
        <span class="wd-audio__buffer" :style="{ width: bufferedPct + '%' }"></span>
        <span class="wd-audio__played" :style="{ width: shownPct + '%' }"></span>
        <span class="wd-audio__knob" :style="{ left: shownPct + '%' }"></span>
      </div>

      <div class="wd-audio__time">
        <span>{{ formatDuration(current) }}</span>
        <span class="wd-audio__time-sep">/</span>
        <span>{{ formatDuration(duration) }}</span>
        <span v-if="errMsg" class="wd-audio__err">{{ errMsg }}</span>
        <!-- 时间行右侧扩展位 -->
        <slot name="extra" />
      </div>
    </div>

    <div v-if="!compact" class="wd-audio__side">
      <div v-if="volume" class="wd-audio__vol">
        <button type="button" class="wd-audio__ibtn" :aria-label="muted ? '取消静音' : '静音'" @click="toggleMute">
          <wd-icon v-if="muted || volume === 0" name="volume-mute" :variant="iconStyle" :size="15" />
          <wd-icon v-else name="volume-up" :variant="iconStyle" :size="15" />
        </button>
        <div class="wd-audio__vol-track" @click="setVolume">
          <span class="wd-audio__vol-fill" :style="{ width: (muted ? 0 : volume * 100) + '%' }"></span>
        </div>
      </div>

      <div v-if="playbackRate" class="wd-audio__rate">
        <button type="button" class="wd-audio__ibtn wd-audio__ibtn--text" @click="rateOpen = !rateOpen">
          {{ rate }}×
        </button>
        <div v-if="rateOpen" class="wd-audio__rate-menu">
          <button
            v-for="r in [0.75, 1, 1.25, 1.5, 2]"
            :key="r"
            type="button"
            :class="{ 'is-on': r === rate }"
            @click="setRate(r)"
          >{{ r }}×</button>
        </div>
      </div>

      <a v-if="downloadable" class="wd-audio__ibtn" :href="src" download aria-label="下载">
        <wd-icon name="download" :variant="iconStyle" :size="15" />
      </a>
      <!-- 右侧扩展位：收藏 / 加入队列 / 分享等 -->
      <slot name="actions" />
    </div>
  </div>
</template>
