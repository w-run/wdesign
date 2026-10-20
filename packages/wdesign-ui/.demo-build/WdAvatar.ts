import { defineComponent as _defineComponent } from 'vue'
import { toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

import { computed } from 'vue'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdAvatar' },
  __name: 'WdAvatar',
  props: {
    name: { type: String, required: false, default: '' },
    tone: { type: Number, required: false, default: 0 },
    dark: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: 'md' }
  },
  setup(__props: any) {



const props = __props

const label = computed(() => {
  const n = props.name.trim()
  if (!n) return '?'
  if (n.startsWith('+')) return n
  return n.charAt(0)
})

const resolvedTone = computed(() => {
  if (props.tone) return props.tone
  if (!props.name) return 0
  let hash = 0
  for (const ch of props.name) hash = (hash * 31 + ch.charCodeAt(0)) % 3
  return (hash + 1) as 1 | 2 | 3
})

const classes = computed(() => [
  'wd-avatar',
  resolvedTone.value ? `wd-avatar--tone-${resolvedTone.value}` : '',
  props.dark ? 'wd-avatar--dark' : '',
  props.size === 'sm' ? 'wd-avatar--sm' : '',
])

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", {
    class: _normalizeClass(classes.value)
  }, _toDisplayString(label.value), 3 /* TEXT, CLASS */))
}
}

})