// =============================================================
//  wdesign-icons — WDesign 图标库
//  595 个 SVG · 256×256 · currentColor · kebab-case
//
//  全量注册：
//    import WdIcons from 'wdesign-icons'
//    app.use(WdIcons)
//
//  按需引入：
//    import { WdIcon } from 'wdesign-icons'
// =============================================================
import type { App, Plugin } from 'vue'
import WdIcon from './WdIcon.vue'
import { opticalFactor, DEFAULT_OPTICAL } from './optical'

export { opticalFactor, DEFAULT_OPTICAL }
export { OPTICAL_TALL, OPTICAL_LIGHT, OPTICAL_HEAVY } from './optical'

export { WdIcon }

// ---- 图标注册表：缓存 + 预加载 ----
export {
  preloadIcons,
  getIcon,
  getIconSync,
  injectIcons,
  registerLoaders,
  clearIconCache,
  cachedIconCount,
} from './registry'
export type { IconStyle } from './registry'

const WdIcons: Plugin = {
  install(app: App) {
    app.component('WdIcon', WdIcon)
  },
}

export default WdIcons
