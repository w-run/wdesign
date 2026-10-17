import { defineComponent as _defineComponent } from 'vue'
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createTextVNode as _createTextVNode, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, withModifiers as _withModifiers, normalizeClass as _normalizeClass, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle, createStaticVNode as _createStaticVNode } from "vue"

const _hoisted_1 = { class: "wd-upload" }
const _hoisted_2 = {
  key: 0,
  class: "wd-upload__hint"
}
const _hoisted_3 = ["accept", "multiple"]
const _hoisted_4 = {
  key: 1,
  class: "wd-upload__error"
}
const _hoisted_5 = {
  key: 0,
  class: "wd-upload__list"
}
const _hoisted_6 = { class: "wd-upload__info" }
const _hoisted_7 = { class: "wd-upload__name" }
const _hoisted_8 = { class: "wd-upload__meta" }
const _hoisted_9 = {
  key: 0,
  class: "wd-upload__progress"
}
const _hoisted_10 = ["onClick"]

import { ref } from 'vue'

export interface WdUploadFile {
  name: string
  size: number
  percent: number
}


export default /*@__PURE__*/_defineComponent({
  ...{ name: 'WdUpload' },
  __name: 'WdUpload',
  props: {
    accept: { type: String, required: false, default: '*' },
    multiple: { type: Boolean, required: false, default: false },
    hint: { type: String, required: false, default: '' },
    maxCount: { type: Number, required: false, default: 0 },
    maxSize: { type: Number, required: false, default: 0 },
    showList: { type: Boolean, required: false, default: true }
  },
  emits: ["change", "exceed"],
  setup(__props: any, { emit: __emit }) {



const props = __props

const emit = __emit

/** 校验失败等提示 */
const error = ref('')

const files = ref<WdUploadFile[]>([])
const dragging = ref(false)
const input = ref<HTMLInputElement>()

function fmtSize(n: number) {
  if (n < 1024) return `${n} B`
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1048576).toFixed(1)} MB`
}

function addFiles(list: FileList | File[]) {
  error.value = ''
  for (const f of Array.from(list)) {
    // 数量上限：超出直接拒收并提示
    if (props.maxCount > 0 && files.value.length >= props.maxCount) {
      error.value = `最多上传 ${props.maxCount} 个文件`
      emit('exceed', 'count', f)
      break
    }
    // 体积上限
    if (props.maxSize > 0 && f.size > props.maxSize) {
      error.value = `${f.name} 超过 ${fmtSize(props.maxSize)} 上限`
      emit('exceed', 'size', f)
      continue
    }
    if (!props.multiple && files.value.length >= 1) files.value = []
    const item: WdUploadFile = { name: f.name, size: f.size, percent: 0 }
    files.value.push(item)
    emit('change', files.value)
    // 演示进度：接入真实上传时替换为实际进度
    const timer = window.setInterval(() => {
      item.percent = Math.min(100, item.percent + Math.round(12 + Math.random() * 16))
      if (item.percent >= 100) window.clearInterval(timer)
    }, 120)
  }
}

function openPicker() {
  input.value?.click()
}
function onPick(e: Event) {
  const target = e.target as HTMLInputElement
  addFiles(target.files || [])
  target.value = ''
}
function onDrop(e: DragEvent) {
  e.preventDefault()
  dragging.value = false
  if (e.dataTransfer) addFiles(e.dataTransfer.files)
}
function remove(i: number) {
  files.value.splice(i, 1)
  emit('change', files.value)
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", {
      class: _normalizeClass(["wd-upload__zone", { 'wd-upload__zone--over': dragging.value }]),
      onClick: openPicker,
      onDragover: _cache[0] || (_cache[0] = _withModifiers(($event: any) => (dragging.value = true), ["prevent"])),
      onDragleave: _cache[1] || (_cache[1] = ($event: any) => (dragging.value = false)),
      onDrop: onDrop
    }, [
      _cache[2] || (_cache[2] = _createStaticVNode("<span class=\"wd-upload__icon\"><svg width=\"34\" height=\"34\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 16V4m0 0-4 4m4-4 4 4\"></path><path d=\"M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4\"></path></svg></span><span class=\"wd-upload__hint\"><strong>点击选择</strong> 或拖拽文件到这里</span>", 2)),
      (__props.hint)
        ? (_openBlock(), _createElementBlock("span", _hoisted_2, _toDisplayString(__props.hint), 1 /* TEXT */))
        : _createCommentVNode("v-if", true),
      _cache[3] || (_cache[3] = _createElementVNode("span", { class: "wd-upload__browse" }, "浏览文件", -1 /* CACHED */)),
      _createElementVNode("input", {
        ref_key: "input",
        ref: input,
        class: "wd-upload__input",
        type: "file",
        accept: __props.accept,
        multiple: __props.multiple,
        onChange: onPick
      }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_3),
      (error.value)
        ? (_openBlock(), _createElementBlock("span", _hoisted_4, _toDisplayString(error.value), 1 /* TEXT */))
        : _createCommentVNode("v-if", true)
    ], 34 /* CLASS, NEED_HYDRATION */),
    (__props.showList && files.value.length)
      ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(files.value, (f, i) => {
            return (_openBlock(), _createElementBlock("div", {
              key: i,
              class: "wd-upload__item"
            }, [
              _cache[5] || (_cache[5] = _createElementVNode("span", { class: "wd-upload__file-icon" }, [
                _createElementVNode("svg", {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "currentColor"
                }, [
                  _createElementVNode("path", { d: "M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" })
                ])
              ], -1 /* CACHED */)),
              _createElementVNode("div", _hoisted_6, [
                _createElementVNode("div", _hoisted_7, _toDisplayString(f.name), 1 /* TEXT */),
                _createElementVNode("div", _hoisted_8, _toDisplayString(fmtSize(f.size)) + " · " + _toDisplayString(f.percent >= 100 ? '已完成' : '上传中 ' + f.percent + '%'), 1 /* TEXT */),
                (f.percent < 100)
                  ? (_openBlock(), _createElementBlock("div", _hoisted_9, [
                      _createElementVNode("span", {
                        class: "wd-upload__progress-bar",
                        style: _normalizeStyle({ width: f.percent + '%' })
                      }, null, 4 /* STYLE */)
                    ]))
                  : _createCommentVNode("v-if", true)
              ]),
              _createElementVNode("button", {
                type: "button",
                class: "wd-upload__remove",
                "aria-label": "移除",
                onClick: _withModifiers(($event: any) => (remove(i)), ["stop"])
              }, [...(_cache[4] || (_cache[4] = [
                _createElementVNode("svg", {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.6",
                  "stroke-linecap": "round"
                }, [
                  _createElementVNode("path", { d: "M6 6l12 12M18 6 6 18" })
                ], -1 /* CACHED */)
              ]))], 8 /* PROPS */, _hoisted_10)
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : _createCommentVNode("v-if", true)
  ]))
}
}

})