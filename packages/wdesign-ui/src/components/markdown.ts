// =============================================================
//  WDesign — 轻量 Markdown 解析
//
//  为什么自己写而不引 marked / markdown-it：
//    · 本库定位是「零依赖」（除 vue 外只有图标包）
//    · 引一个 30KB+ 的 parser 只为渲染说明文字，代价过高
//    · 真正需要完整 CommonMark 的场景，使用者可以自己渲染好 HTML
//      再传 `html` 给 WdMarkdown（组件同时支持）
//
//  支持范围（覆盖 95% 的文档/评论场景）：
//    标题 # ~ ######、段落、加粗 **x**、斜体 *x*、行内代码 `x`
//    代码块 ```、引用 >、无序列表 -/*/+、有序列表 1.
//    分割线 ---、链接 [t](u)、图片 ![a](u)、删除线 ~~x~~
//    表格（| a | b | + 分隔行）
//    自动链接裸 URL
//
//  不支持（有意为之）：
//    HTML 块内联、脚注、定义列表、任务列表的勾选交互
//    —— 这些要么需要完整 parser，要么属于交互组件范畴
//
//  ⚠️ 安全：所有文本都经过 escapeHtml()。
//     本解析器**不信任输入**，因为它常被用来渲染用户/AI 生成的内容。
// =============================================================

/** HTML 转义。所有用户文本都必须过这一层 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 内联元素解析。
 * ⚠️ 顺序很重要：先处理 code（避免代码里的 * 被当粗体），
 * 再把已生成的 HTML 用占位符保护起来，最后才处理强调。
 */
function inline(text: string): string {
  // 1. 行内代码先走，其内容不再参与后续解析
  const codes: string[] = []
  let out = text.replace(/`([^`]+)`/g, (_, code: string) => {
    codes.push(code)
    return `\u0000CODE${codes.length - 1}\u0000`
  })

  // 2. 转义剩余文本
  out = escapeHtml(out)

  // 3. 图片（必须在链接之前，否则 ![a](u) 会被链接规则先吃掉）
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_, alt: string, src: string, title?: string) =>
      `<img src="${src}" alt="${alt}"${title ? ` title="${title}"` : ''} loading="lazy">`)

  // 4. 链接
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_, label: string, href: string, title?: string) => {
      // 外链自动加 target/rel；站内锚点与相对路径不加
      const external = /^https?:\/\//i.test(href)
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${title ? ` title="${title}"` : ''}${attrs}>${label}</a>`
    })

  // 5. 自动链接裸 URL（排除已在 <a href> 里的）
  out = out.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (m, pre: string, url: string) =>
    pre + `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)

  // 6. 强调
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/__([^_]+)__/g, '<strong>$1</strong>')
  /*
   * 强调：两侧星号**内侧不能是空白**。
   *
   * 否则 `a * b * c` 这种数学写法会被误判成斜体
   * （实测确实如此）。CommonMark 对左右分隔符有类似约束：
   * 只有「左分隔符后面不是空白 + 右分隔符前面不是空白」才算强调。
   */
  out = out.replace(/(^|[^*])\*(\S[^*\n]*?\S|\S)\*(?=[^*]|$)/g, '$1<em>$2</em>')
  out = out.replace(/(^|[^_])_(\S[^_\n]*?\S|\S)_(?=[^_]|$)/g, '$1<em>$2</em>')
  out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>')

  // 7. 行内代码回填（内容已转义，防止代码里的 <> 破坏结构）
  out = out.replace(/\u0000CODE(\d+)\u0000/g, (_, i: string) =>
    `<code>${escapeHtml(codes[Number(i)])}</code>`)

  return out
}

/** 表格：连续两行以上、含 | 且第二行是分隔行 */
function isTableSep(line: string): boolean {
  return /^\s*\|?[\s:-]*-[\s:|-]*\|?\s*$/.test(line) && line.includes('-')
}

function splitRow(line: string): string[] {
  let s = line.trim()
  if (s.startsWith('|')) s = s.slice(1)
  if (s.endsWith('|')) s = s.slice(0, -1)
  return s.split('|').map((c) => c.trim())
}

/**
 * 主解析。
 * 按行扫描 + 状态机，避免正则跨行匹配带来的回溯问题。
 */
export function parseMarkdown(src: string): string {
  const lines = src.replace(/\r\n?/g, '\n').split('\n')
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // ---- 代码块 ``` ----
    const fence = line.match(/^\s*(```|~~~)(.*)$/)
    if (fence) {
      const marker = fence[1]
      const lang = fence[2].trim()
      const buf: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith(marker)) {
        buf.push(lines[i])
        i++
      }
      i++ // 跳过结束围栏
      const cls = lang ? ` class="language-${escapeHtml(lang)}"` : ''
      out.push(`<pre><code${cls}>${escapeHtml(buf.join('\n'))}</code></pre>`)
      continue
    }

    // ---- 分割线 ----
    if (/^\s*([-*_])\s*(\1\s*){2,}$/.test(line)) {
      out.push('<hr>')
      i++
      continue
    }

    // ---- 标题 ----
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      const lv = h[1].length
      out.push(`<h${lv}>${inline(h[2].trim())}</h${lv}>`)
      i++
      continue
    }

    // ---- 引用 > ----
    if (/^\s*>/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''))
        i++
      }
      // 递归解析引用内部，支持嵌套
      out.push(`<blockquote>${parseMarkdown(buf.join('\n'))}</blockquote>`)
      continue
    }

    // ---- 表格 ----
    if (line.includes('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const head = splitRow(line)
      // 对齐方式：:-- 左 / --: 右 / :-: 中
      const aligns = splitRow(lines[i + 1]).map((c) => {
        const l = c.startsWith(':')
        const r = c.endsWith(':')
        if (l && r) return 'center'
        if (r) return 'right'
        if (l) return 'left'
        return ''
      })
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') {
        rows.push(splitRow(lines[i]))
        i++
      }
      const th = head.map((c, k) =>
        `<th${aligns[k] ? ` style="text-align:${aligns[k]}"` : ''}>${inline(c)}</th>`).join('')
      const tb = rows.map((r) =>
        '<tr>' + head.map((_, k) =>
          `<td${aligns[k] ? ` style="text-align:${aligns[k]}"` : ''}>${inline(r[k] ?? '')}</td>`).join('') + '</tr>'
      ).join('')
      out.push(`<table><thead><tr>${th}</tr></thead><tbody>${tb}</tbody></table>`)
      continue
    }

    // ---- 列表（有序 / 无序）----
    const ul = line.match(/^\s*([-*+])\s+(.*)$/)
    const ol = line.match(/^\s*(\d+)[.)]\s+(.*)$/)
    if (ul || ol) {
      const ordered = !!ol
      const items: string[] = []
      // 用同一个正则持续匹配同类型列表项
      const re = ordered ? /^\s*(\d+)[.)]\s+(.*)$/ : /^\s*([-*+])\s+(.*)$/
      while (i < lines.length) {
        const m = lines[i].match(re)
        if (!m) break
        items.push(m[2])
        i++
      }
      const tag = ordered ? 'ol' : 'ul'
      out.push(`<${tag}>` + items.map((t) => `<li>${inline(t)}</li>`).join('') + `</${tag}>`)
      continue
    }

    // ---- 空行 ----
    if (line.trim() === '') {
      i++
      continue
    }

    // ---- 段落：连续非空行合并 ----
    const buf: string[] = []
    while (i < lines.length) {
      const l = lines[i]
      if (l.trim() === '') break
      // 遇到块级语法起始就停
      if (/^(#{1,6}\s|>|```|~~~)/.test(l)) break
      if (/^\s*([-*+]|\d+[.)])\s+/.test(l)) break
      if (/^\s*([-*_])\s*(\1\s*){2,}$/.test(l)) break
      buf.push(l)
      i++
    }
    if (buf.length) out.push(`<p>${inline(buf.join('\n')).replace(/\n/g, '<br>')}</p>`)
  }

  return out.join('\n')
}
