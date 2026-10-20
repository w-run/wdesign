import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode } from "vue"

const _hoisted_1 = { class: "wd-avatars" }

import { computed } from 'vue'
import WdAvatar from './WdAvatar'


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdAvatarGroup' },
  __name: 'WdAvatarGroup',
  props: {
    names: { type: Array, required: false, default: () => [] },
    max: { type: Number, required: false, default: 3 }
  },
  setup(__props: any) {



const props = __props

const shown = computed(() => props.names.slice(0, props.max))
const rest = computed(() => Math.max(0, props.names.length - props.max))

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("span", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(shown.value, (name, index) => {
      return (_openBlock(), _createBlock(WdAvatar, {
        key: index,
        name: name
      }, null, 8 /* PROPS */, ["name"]))
    }), 128 /* KEYED_FRAGMENT */)),
    (rest.value)
      ? (_openBlock(), _createBlock(WdAvatar, {
          key: 0,
          name: `+${rest.value}`,
          dark: ""
        }, null, 8 /* PROPS */, ["name"]))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})