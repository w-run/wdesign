// =============================================================
//  WDesign Icons — 图标注册表（缓存 + 预加载）
//
//  为什么需要它：
//    WdIcon 是**异步取 SVG** 的（Vite glob / window.WD_ICONS 都返回 Promise）。
//    直接渲染会有一帧空白 —— 图标"晚一拍"出现，在导航栏/控制条里像闪一下。
//    更糟的是每个图标实例都各查一次，同一图标渲染 10 次就查 10 次。
//
//  这个注册表做三件事：
//    1. **缓存**：解析过的 SVG 字符串进 Map，重复请求零成本
//    2. **预加载**：preloadIcons([...]) 在首屏渲染前把关键图标灌进缓存，
//       之后 WdIcon 走同步路径，首帧即有内容
//    3. **同步读**：getIcon() 命中即返回字符串，未命中返回 undefined
//
//  预加载仍然是"按需"的 —— 只加载你点名的图标，不是 595 个全量。
// =============================================================

/** SVG 字符串缓存，key = `${style}/${name}` */
const cache = new Map<string, string>()

/** 正在加载中的 Promise，避免同一图标并发重复请求 */
const inflight = new Map<string, Promise<string | undefined>>()

type InlineMap = Record<string, string>

/** 非构建环境的内联数据（icons.data.js 注入 window.WD_ICONS） */
function inlineData(): InlineMap | undefined {
  return (globalThis as { WD_ICONS?: InlineMap }).WD_ICONS
}

/**
 * 构建期收集的加载器。
 * 由 Vite 插件在打包时注入；纯浏览器环境下为 undefined，
 * 此时全部走 window.WD_ICONS。
 */
let loaders: Record<string, () => Promise<string>> = {}

/** 供 Vite 侧注入 glob 结果（也可在应用启动时手动注入） */
export function registerLoaders(map: Record<string, () => Promise<string>>) {
  loaders = map
}

export type IconStyle = 'outlined' | 'filled'

/** 按请求顺序解析（filled 缺失自动回落 outlined） */
function styleOrder(style: IconStyle): IconStyle[] {
  return style === 'filled' ? ['filled', 'outlined'] : ['outlined', 'filled']
}

/**
 * 同步读取已缓存的图标。
 * 返回 undefined 表示尚未加载 —— 调用方应回退到异步 getIcon。
 */
export function getIconSync(name: string, style: IconStyle = 'outlined'): string | undefined {
  for (const st of styleOrder(style)) {
    const hit = cache.get(`${st}/${name}`)
    if (hit) return hit
  }
  return undefined
}

/**
 * 异步取图标（带缓存）。
 * 缓存命中时不产生任何 IO，直接 resolve —— 所以可以放心在渲染里调用。
 */
export function getIcon(name: string, style: IconStyle = 'outlined'): Promise<string | undefined> {
  const hit = getIconSync(name, style)
  if (hit) return Promise.resolve(hit)

  const key = `${style}/${name}`
  const pending = inflight.get(key)
  if (pending) return pending

  const task = (async () => {
    const inline = inlineData()
    for (const st of styleOrder(style)) {
      const path = `../icons/${st}/${name}.svg`
      // 1) 构建期 glob
      if (loaders[path]) {
        try {
          const raw = await loaders[path]()
          cache.set(`${st}/${name}`, raw)
          return raw
        } catch {
          // 单个图标失败不阻断回退链
        }
      }
      // 2) 内联数据
      const raw = inline?.[`${st}/${name}`]
      if (raw) {
        cache.set(`${st}/${name}`, raw)
        return raw
      }
    }
    return undefined
  })()

  inflight.set(key, task)
  task.finally(() => inflight.delete(key))
  return task
}

/**
 * 预加载一批图标。
 *
 *   await preloadIcons(['play', 'pause', 'skip-next'], 'filled')
 *
 * 在 App 挂载前 await 一次，之后这些图标全部走同步路径，首帧不会空白。
 * 不 await 也可以 —— 只是首帧仍会短暂空白。
 *
 * @returns 成功加载的数量
 */
export async function preloadIcons(
  names: string[],
  style: IconStyle = 'outlined',
): Promise<number> {
  const results = await Promise.all(names.map((n) => getIcon(n, style)))
  return results.filter(Boolean).length
}

/**
 * 同步批量注入（配合 SSR / 内联数据使用）。
 * 传入 `{ 'outlined/play': '<svg …>' }` 形状的对象即可。
 */
export function injectIcons(map: InlineMap) {
  for (const [k, v] of Object.entries(map)) {
    if (v) cache.set(k, v)
  }
}

/** 清空缓存（测试用） */
export function clearIconCache() {
  cache.clear()
  inflight.clear()
}

/** 当前已缓存的图标数量（调试用） */
export function cachedIconCount(): number {
  return cache.size
}
