import { defineComponent as _defineComponent } from 'vue'
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, withModifiers as _withModifiers, normalizeClass as _normalizeClass, createStaticVNode as _createStaticVNode } from "vue"

const _hoisted_1 = { class: "wd-sortable" }
const _hoisted_2 = ["onDragstart", "onDragover", "onDrop"]
const _hoisted_3 = { class: "wd-sortable__label" }

import { ref } from 'vue'

type Item = string | { label: string }


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdSortableList' },
  __name: 'WdSortableList',
  props: {
    modelValue: { type: Array, required: false, default: () => [] }
  },
  emits: ["update:modelValue", "change"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

const dragIndex = ref(-1)
const overIndex = ref(-1)

function labelOf(it: Item) {
  return typeof it === 'string' ? it : it.label
}

function onDragStart(i: number) {
  dragIndex.value = i
}
function onDragOver(i: number) {
  if (dragIndex.value < 0 || i === dragIndex.value) return
  overIndex.value = i
}
function onDrop(i: number) {
  if (dragIndex.value < 0 || i === dragIndex.value || !props.modelValue.length) return
  const arr = [...props.modelValue]
  const [moved] = arr.splice(dragIndex.value, 1)
  arr.splice(i, 0, moved)
  emit('update:modelValue', arr)
  emit('change', arr)
  reset()
}
function reset() {
  dragIndex.value = -1
  overIndex.value = -1
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(__props.modelValue, (it, i) => {
      return (_openBlock(), _createElementBlock("div", {
        key: i,
        class: _normalizeClass(["wd-sortable__item", { 'wd-sortable__item--drag': dragIndex.value === i, 'wd-sortable__item--over': overIndex.value === i }]),
        draggable: "true",
        onDragstart: ($event: any) => (onDragStart(i)),
        onDragover: _withModifiers(($event: any) => (onDragOver(i)), ["prevent"]),
        onDrop: _withModifiers(($event: any) => (onDrop(i)), ["prevent"]),
        onDragend: reset
      }, [
        _cache[0] || (_cache[0] = _createStaticVNode("<span class=\"wd-sortable__handle\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><circle cx=\"9\" cy=\"6\" r=\"1.6\"></circle><circle cx=\"15\" cy=\"6\" r=\"1.6\"></circle><circle cx=\"9\" cy=\"12\" r=\"1.6\"></circle><circle cx=\"15\" cy=\"12\" r=\"1.6\"></circle><circle cx=\"9\" cy=\"18\" r=\"1.6\"></circle><circle cx=\"15\" cy=\"18\" r=\"1.6\"></circle></svg></span>", 1)),
        _createElementVNode("span", _hoisted_3, _toDisplayString(labelOf(it)), 1 /* TEXT */)
      ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_2))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

})