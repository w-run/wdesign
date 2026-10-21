/**
 * 直播 HLS 演示代理（只在 dev server 生效）。
 *
 * 为什么需要它：公网 m3u8 基本都不带 CORS 头，浏览器直连会被
 * 「No 'Access-Control-Allow-Origin'」拦掉；而且这类源站通常 302 到带签名
 * （IP / 时间绑定）的地址，前端即便拿到清单也拼不出可用的分片 URL。
 *
 * 做法：
 *   1. `/live?u=<encoded 上游地址>` —— node 侧 fetch（自动跟随 302）
 *   2. 返回 m3u8 时，把其中每一行 URI（分片 / 子清单）改写成同样走本代理的
 *      `/live?u=...`，前端永远只跟同源说话
 *   3. 顺手补 CORS 头
 */
export function liveProxy() {
  return {
    name: 'wd-live-proxy',
    configureServer(server) {
      server.middlewares.use('/live', async (req, res) => {
        try {
          const q = (req.url || '').split('?')[1] || ''
          const target = new URLSearchParams(q).get('u')
          if (!target) {
            res.statusCode = 400
            res.end('missing ?u=<url>')
            return
          }

          const upstream = await fetch(target, {
            redirect: 'follow',
            headers: { 'user-agent': 'Mozilla/5.0 (wdesign live proxy)' },
          })
          const ct = upstream.headers.get('content-type') || ''
          const isM3u8 = /mpegurl/i.test(ct) || /\.m3u8(\?|$)/i.test(target)

          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Cache-Control', 'no-store')

          if (isM3u8) {
            const text = await upstream.text()
            const base = upstream.url || target
            const rewritten = text
              .split(/\r?\n/)
              .map((line) => {
                const t = line.trim()
                if (!t || t.startsWith('#')) return line
                const abs = new URL(t, base).toString()
                return '/live?u=' + encodeURIComponent(abs)
              })
              .join('\n')
            res.setHeader('Content-Type', 'application/vnd.apple.mpegurl')
            res.end(rewritten)
            return
          }

          const buf = Buffer.from(await upstream.arrayBuffer())
          res.setHeader('Content-Type', ct || 'application/octet-stream')
          res.end(buf)
        } catch (e) {
          res.statusCode = 502
          res.end(String(e && e.message ? e.message : e))
        }
      })
    },
  }
}
