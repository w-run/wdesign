// =============================================================
//  共享工具：时间格式化
//
//  原来 WdAudioPlayer 与 WdVideoPlayer 各写一份 fmtTime，
//  实现还不完全一致（一个只到分秒，一个支持小时）。
//  媒体类组件共用一份，避免以后再分叉。
// =============================================================

/**
 * 秒 → 时间文本。
 *
 * @param seconds 秒数（可含小数）
 * @param forceHours 是否强制显示小时位（如 1:02:03）
 *
 * 行为：
 *   - 非法值（NaN / Infinity / 负数）→ "0:00"
 *   - < 1 小时 → "m:ss"
 *   - >= 1 小时 或 forceHours → "h:mm:ss"
 *
 * 直播的 duration 常是 Infinity，这里直接兜住，调用方不必再判。
 */
export function formatDuration(seconds: number, forceHours = false): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0
  const total = Math.floor(seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60

  const pad = (n: number) => String(n).padStart(2, '0')
  if (h > 0 || forceHours) return `${h}:${pad(m)}:${pad(s)}`
  return `${m}:${pad(s)}`
}
