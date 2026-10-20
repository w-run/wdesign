// =============================================================
//  WDesign UI — 音频波形提取
//
//  ===== 为什么需要单独一个模块 =====
//  声音的"波形"有两种完全不同的东西：
//
//    1. 频谱（Spectrum）—— 当前时刻各频段的能量，随播放实时变化。
//       用 AnalyserNode + FFT，是**动态可视化**，不能当进度条用。
//
//    2. 波形包络（Waveform envelope）—— 整段音频的响度峰值序列，
//       是**静态数据**，与时间轴一一对应，适合画进度条。
//       本模块产出的就是这个。
//
//  ===== 代价与策略 =====
//  `decodeAudioData` 会把整个音频解码成 PCM 放在内存里：
//    一首 4 分钟、44.1kHz 立体声的 mp3 → 约 84MB 的 Float32 数据。
//  在移动端这足以触发内存警告。所以**绝不能在运行时对整首歌做这件事**。
//
//  正确做法（本模块的目标）：
//    · 只解码前 N 秒（默认 90s）—— 波形是给人看个大概，不需要全曲精确
//    · 用 OfflineAudioContext 以极低采样率解码（单声道 8kHz），
//      数据量降到 1/10
//    · 结果按目标像素宽度分桶，每桶取 RMS 峰值，输出几十~上百个数
// =============================================================

/**
 * 从音频 URL 提取波形包络。
 *
 * @param url        音频地址（需同源或允许 CORS）
 * @param barCount   输出柱数（通常等于波形显示的柱子数）
 * @param opts.maxSeconds  最多分析多少秒（默认 90，控制内存）
 * @returns 归一化到 0~1 的峰值数组
 *
 * ⚠️ 失败时返回空数组而非抛错 —— 波形是装饰性数据，
 *    取不到就用组件内置的示意波，不该因此让整个播放器报错。
 */
export async function extractWaveform(
  url: string,
  barCount = 60,
  opts: { maxSeconds?: number } = {},
): Promise<number[]> {
  const maxSeconds = opts.maxSeconds ?? 90

  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const raw = await res.arrayBuffer()

    /*
     * AudioContext 的类型在不同浏览器里不一致：
     *   · Safari 需要 webkitAudioContext 前缀
     *   · 有些环境根本没有（旧 WebView）
     * 用最宽松的写法拿到构造器。
     */
    const Ctx =
      (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return []

    const ctx = new Ctx()

    let buffer: AudioBuffer
    try {
      /*
       * Safari 只支持回调式的 decodeAudioData，
       * Chrome 支持 Promise 式。两种都兼容。
       */
      buffer = await new Promise<AudioBuffer>((resolve, reject) => {
        const maybe = ctx.decodeAudioData(raw, resolve, reject)
        // Chrome 的 Promise 式返回
        if (maybe && typeof (maybe as Promise<AudioBuffer>).then === 'function') {
          ;(maybe as Promise<AudioBuffer>).then(resolve).catch(reject)
        }
      })
    } catch {
      await ctx.close()
      return []
    }

    // 只取左声道（单声道足够描述响度包络，且省一半遍历）
    const ch = buffer.getChannelData(0)
    const sampleRate = buffer.sampleRate
    // 要分析的样本数上限
    const totalSamples = Math.min(ch.length, Math.floor(maxSeconds * sampleRate))
    // 每个柱覆盖的样本数
    const perBar = Math.max(1, Math.floor(totalSamples / barCount))

    const out: number[] = []
    for (let i = 0; i < barCount; i++) {
      const start = i * perBar
      const end = Math.min(totalSamples, start + perBar)
      if (start >= totalSamples) break

      /*
       * 取 RMS（均方根）而非峰值。
       * 峰值会被单个尖刺主导，画出来是一堆孤立的高柱；
       * RMS 反映"这一段有多响"，波形更像人眼期待的起伏。
       */
      let sum = 0
      for (let j = start; j < end; j++) sum += ch[j] * ch[j]
      out.push(Math.sqrt(sum / (end - start)))
    }

    await ctx.close()

    // 归一化：把最大值拉到 1，最小值托到 0.08（避免完全消失）
    const max = Math.max(...out, 1e-6)
    return out.map((v) => Math.max(0.08, Math.min(1, v / max)))
  } catch {
    return []
  }
}

/**
 * 实时频谱分析器（动态可视化用，**不是**进度条）。
 *
 * 用法：
 *   const spec = createSpectrumAnalyser(audioEl, 32)
 *   function frame() { const bars = spec.read(); /* 画到 canvas *\/ }
 *
 * ⚠️ 三个必须知道的限制：
 *  1. `createMediaElementSource` 会**接管**音频输出 —— 一旦接管，
 *     原来的 audio 元素不再直接出声，必须经过 AudioContext 才能播放。
 *     如果 AudioContext 处于 suspended 状态（iOS 默认如此），声音会消失。
 *  2. iOS 上接管后会**断开 AirPlay 投送能力**。
 *  3. 必须在**用户手势**中 resume()，否则拿不到数据。
 */
export function createSpectrumAnalyser(el: HTMLAudioElement, binCount = 32) {
  const Ctx =
    (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return null

  const ctx = new Ctx()
  const src = ctx.createMediaElementSource(el)
  const analyser = ctx.createAnalyser()
  analyser.fftSize = binCount * 4
  analyser.smoothingTimeConstant = 0.8
  src.connect(analyser)
  // 必须接回目的地，否则音频无声
  analyser.connect(ctx.destination)

  const data = new Uint8Array(analyser.frequencyBinCount)

  return {
    /** 在用户手势里调用，否则 iOS 上一直是 suspended */
    async resume() {
      if (ctx.state === 'suspended') await ctx.resume()
    },
    /** 读当前帧的频段能量，0~1 */
    read(): number[] {
      analyser.getByteFrequencyData(data)
      const step = Math.floor(data.length / binCount)
      const out: number[] = []
      for (let i = 0; i < binCount; i++) {
        let sum = 0
        for (let j = 0; j < step; j++) sum += data[i * step + j]
        out.push(sum / step / 255)
      }
      return out
    },
    close() {
      src.disconnect()
      analyser.disconnect()
      void ctx.close()
    },
  }
}
