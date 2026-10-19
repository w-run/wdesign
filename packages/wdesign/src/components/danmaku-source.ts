// =============================================================
//  WDesign UI — Danmaku 数据源解析
//
//  支持三种格式：
//    1. **B 站 XML**（`<d p="...">文本</d>`）—— 事实上的行业标准，
//       Bilibili、AcFun、以及绝大多数第三方弹幕站都用这个格式
//    2. **JSON 数组**（`[{time, text, color, mode}]`）—— 本项目自有格式
//    3. **纯文本**（每行 `秒数,模式,颜色,文本`，CSV 风格）
//
//  ===== B 站 XML 的 p 属性格式 =====
//   p="时间,模式,字号,颜色,时间戳,池,用户hash,行号"
//   例如 p="12.345,1,25,16777215,1699999999,0,abc123,0"
//
//   时间：秒（浮点）
//   模式：1/2/3 = 滚动（右→左），4 = 底部固定，5 = 顶部固定，
//         6 = 逆向滚动，7 = 高级定位，8 = 代码弹幕，9 = BAS 弹幕
//   颜色：**十进制整数**的 RGB（16777215 = #FFFFFF）
// =============================================================

export interface ParsedDanmaku {
  /** 出现时间（秒） */
  time: number
  /** 文本 */
  text: string
  /** 颜色（#RRGGBB） */
  color?: string
  /** 轨道模式 */
  mode?: 'scroll' | 'top' | 'bottom'
}

/** 十进制 RGB 转 #RRGGBB */
function decToHex(dec: number): string {
  const n = Math.max(0, Math.min(0xffffff, dec | 0))
  return '#' + n.toString(16).padStart(6, '0').toUpperCase()
}

/**
 * 解析 B 站 XML 弹幕。
 *
 * 用正则而非 DOMParser：
 *   · DOMParser 只在浏览器可用，Node/测试环境没有
 *   · 弹幕 XML 结构极简单（只有 <d> 一种元素），正则足够
 *   · 几十万条弹幕时正则也比建 DOM 树快得多
 *
 * ⚠️ 文本里可能有 HTML 实体（&amp; &lt; 等），需要反转义。
 */
export function parseBiliXml(xml: string): ParsedDanmaku[] {
  const out: ParsedDanmaku[] = []
  // <d p="...">文本</d>
  const re = /<d\s+p="([^"]*)"[^>]*>([\s\S]*?)<\/d>/g
  let m: RegExpExecArray | null

  while ((m = re.exec(xml)) !== null) {
    const attrs = m[1].split(',')
    const text = unescapeHtml(m[2]).trim()
    if (!text) continue

    const time = parseFloat(attrs[0])
    if (!isFinite(time)) continue

    const modeNum = parseInt(attrs[1], 10)
    const colorDec = parseInt(attrs[3], 10)

    // 模式映射：4 = 底部，5 = 顶部，其余（1/2/3/6/7）都按滚动处理
    let mode: ParsedDanmaku['mode'] = 'scroll'
    if (modeNum === 4) mode = 'bottom'
    else if (modeNum === 5) mode = 'top'

    out.push({
      time,
      text,
      mode,
      // 白色（16777215）是默认值，不显式设置省一次属性
      color: isFinite(colorDec) && colorDec !== 0xffffff ? decToHex(colorDec) : undefined,
    })
  }

  // 按时间排序：播放时按序取用，排序能让「只渲染窗口内」的筛选更简单
  return out.sort((a, b) => a.time - b.time)
}

/** 反转义 XML/HTML 实体 */
function unescapeHtml(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

/**
 * 解析 JSON 数组。
 * 接受宽松格式：time 也可以是 `t`/`start`，text 也可以是 `content`/`body`。
 */
export function parseJson(json: unknown): ParsedDanmaku[] {
  if (!Array.isArray(json)) return []
  const out: ParsedDanmaku[] = []

  for (const raw of json) {
    if (!raw || typeof raw !== 'object') continue
    const o = raw as Record<string, unknown>
    const time = Number(o.time ?? o.t ?? o.start ?? o.stime)
    const text = String(o.text ?? o.content ?? o.body ?? '').trim()
    if (!isFinite(time) || !text) continue

    const modeRaw = o.mode
    const mode: ParsedDanmaku['mode'] =
      modeRaw === 'top' || modeRaw === 5 ? 'top'
      : modeRaw === 'bottom' || modeRaw === 4 ? 'bottom'
      : 'scroll'

    out.push({
      time,
      text,
      mode,
      color: typeof o.color === 'string' ? o.color : undefined,
    })
  }
  return out.sort((a, b) => a.time - b.time)
}

/**
 * 解析纯文本弹幕。
 * 每行：`时间,模式,颜色,文本`（模式与颜色可省略）
 *   12.5,,,#FFF 你好
 *   12.5,top,,置顶弹幕
 */
export function parseText(text: string): ParsedDanmaku[] {
  const out: ParsedDanmaku[] = []
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue

    const parts = t.split(',')
    if (parts.length < 2) continue

    const time = parseFloat(parts[0])
    if (!isFinite(time)) continue

    // 中间可能有空字段，从右往左找第一个非空作为文本
    const rest = parts.slice(1).join(',').trim()
    if (!rest) continue

    const modePart = (parts[1] || '').trim().toLowerCase()
    const colorPart = (parts[2] || '').trim()

    const textStart = rest.startsWith(modePart) || rest.startsWith(colorPart)
      ? rest.replace(/^[^,]*,?/, '').replace(/^[^,]*,?/, '')
      : rest

    out.push({
      time,
      text: textStart.trim() || rest,
      mode: modePart === 'top' ? 'top' : modePart === 'bottom' ? 'bottom' : 'scroll',
      color: /^#[0-9a-f]{3,8}$/i.test(colorPart) ? colorPart : undefined,
    })
  }
  return out.sort((a, b) => a.time - b.time)
}

/**
 * 自动识别格式并解析。
 *
 * 判定顺序：
 *   1. 含 `<d p=` 或 `<?xml` → B 站 XML
 *   2. 以 `[` 开头 → JSON
 *   3. 其余 → 纯文本
 */
export function parseDanmaku(input: string | unknown[]): ParsedDanmaku[] {
  if (Array.isArray(input)) return parseJson(input)
  if (typeof input !== 'string') return []

  const s = input.trim()
  if (!s) return []

  if (s.includes('<d p=') || s.startsWith('<?xml') || s.startsWith('<i>')) {
    return parseBiliXml(s)
  }
  if (s.startsWith('[') || s.startsWith('{')) {
    try {
      return parseJson(JSON.parse(s))
    } catch {
      // JSON 解析失败 → 回落到纯文本
    }
  }
  return parseText(s)
}

/**
 * 从 URL 加载弹幕。
 *
 * 支持：
 *   · .xml  → B 站格式
 *   · .json → JSON
 *   · 其余  → 纯文本
 *
 * ⚠️ 跨域：弹幕源大多不允许跨域读取，实际使用时应通过自己的后端代理。
 *    本函数不做代理，只负责「取回来 + 解析」。
 */
export async function loadDanmaku(url: string): Promise<ParsedDanmaku[]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`弹幕加载失败：HTTP ${res.status}`)
  const text = await res.text()
  return parseDanmaku(text)
}
