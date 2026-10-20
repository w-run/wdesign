import { defineComponent as _defineComponent } from 'vue'
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSpinner' },
  __name: 'WdSpinner',
  props: {
    size: { type: [String, Number], required: false, default: 'md' }
  },
  setup(__props: any) {



const props = __props

/**
 * 同时支持档位与像素：
 *   size="lg" / size="sm"   → 用预设档位
 *   :size="36"              → 直接 36px
 * 早先只接受档位，传数字会静默落到默认 28px（三种"不同尺寸"看起来一样）。
 */
const PRESET: Record<string, string> = { sm: '18px', md: '28px', lg: '40px' }

const style = computed(() => {
  if (typeof props.size === 'number') {
    const px = Math.max(8, props.size)
    // 线宽随手径走，保持视觉一致（约 11%）
    const bw = Math.max(2, Math.round(px * 0.11 * 10) / 10)
    return { width: `${px}px`, height: `${px}px`, borderWidth: `${bw}px` }
  }
  return {}
})

const cls = computed(() => (typeof props.size === 'string' && props.size !== 'md' ? `wd-spinner--${props.size}` : ''))

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(["wd-spinner", cls.value]),
    style: _normalizeStyle(style.value),
    role: "status",
    "aria-label": "加载中"
  }, null, 6 /* CLASS, STYLE */))
}
}

})