/* =============================================================
 *  demo 镜像（第 8 段）：Carousel / Sortable / Otp / ImagePreview
 *  FileList / Explorer / AiMessage —— 追加到 demo-extra.js 末尾
 * ============================================================= */

const WdCarousel = {
  name: 'WdCarousel',
  props: {
    items: { type: Array, default: () => [] },
    height: { type: Number, default: 260 },
    autoplay: { type: Number, default: 0 },
    showDots: { type: Boolean, default: true },
    showArrows: { type: Boolean, default: true },
  },
  data() {
    return { index: 0 }
  },
  computed: {
    trackStyle() {
      return { transform: 'translateX(-' + this.index * 100 + '%)' }
    },
  },
  mounted() {
    this.start()
  },
  beforeUnmount() {
    this.stop()
  },
  methods: {
    pal(i) {
      return ['var(--wd-tint-2)', 'var(--wd-success-soft)', 'var(--wd-warning-soft)', 'var(--wd-field)'][i % 4]
    },
    go(i) {
      const n = this.items.length
      if (!n) return
      this.index = ((i % n) + n) % n
    },
    start() {
      this.stop()
      if (this.autoplay > 0 && this.items.length > 1) {
        this._timer = setInterval(() => this.go(this.index + 1), this.autoplay)
      }
    },
    stop() {
      if (this._timer) {
        clearInterval(this._timer)
        this._timer = null
      }
    },
  },
  template: `
    <div class="wd-carousel" :style="{ height: height + 'px' }" @mouseenter="stop" @mouseleave="start">
      <div class="wd-carousel__track" :style="trackStyle">
        <div v-for="(it, i) in items" :key="i" class="wd-carousel__slide" :style="{ background: pal(i) }">
          <slot name="item" :item="it" :index="i">
            <img v-if="it.src" :src="it.src" :alt="it.alt || ''" class="wd-carousel__img" />
            <span v-else class="wd-carousel__label">{{ it.label || 'Slide ' + (i + 1) }}</span>
          </slot>
        </div>
      </div>
      <button v-if="showArrows && items.length > 1" type="button" class="wd-carousel__arrow wd-carousel__arrow--prev" @click="go(index - 1)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
      </button>
      <button v-if="showArrows && items.length > 1" type="button" class="wd-carousel__arrow wd-carousel__arrow--next" @click="go(index + 1)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>
      </button>
      <div v-if="showDots && items.length > 1" class="wd-carousel__dots">
        <button v-for="(_, i) in items" :key="i" type="button" class="wd-carousel__dot"
          :class="{ 'wd-carousel__dot--active': i === index }" @click="go(i)"></button>
      </div>
    </div>`,
}

const WdSortableList = {
  name: 'WdSortableList',
  props: {
    modelValue: { type: Array, default: () => [] },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return { dragIndex: -1, overIndex: -1 }
  },
  methods: {
    labelOf(it) {
      return typeof it === 'string' ? it : it.label
    },
    onDragStart(i) {
      this.dragIndex = i
    },
    onDragOver(i) {
      if (this.dragIndex < 0 || i === this.dragIndex) return
      this.overIndex = i
    },
    onDrop(i) {
      if (this.dragIndex < 0 || i === this.dragIndex || !this.modelValue.length) return
      const arr = this.modelValue.slice()
      const moved = arr.splice(this.dragIndex, 1)[0]
      arr.splice(i, 0, moved)
      this.$emit('update:modelValue', arr)
      this.$emit('change', arr)
      this.reset()
    },
    reset() {
      this.dragIndex = -1
      this.overIndex = -1
    },
  },
  template: `
    <div class="wd-sortable">
      <div v-for="(it, i) in modelValue" :key="i" class="wd-sortable__item"
        :class="{ 'wd-sortable__item--drag': dragIndex === i, 'wd-sortable__item--over': overIndex === i }"
        draggable="true"
        @dragstart="onDragStart(i)" @dragover.prevent="onDragOver(i)"
        @drop.prevent="onDrop(i)" @dragend="reset">
        <span class="wd-sortable__handle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6"></circle><circle cx="15" cy="6" r="1.6"></circle><circle cx="9" cy="12" r="1.6"></circle><circle cx="15" cy="12" r="1.6"></circle><circle cx="9" cy="18" r="1.6"></circle><circle cx="15" cy="18" r="1.6"></circle></svg>
        </span>
        <span class="wd-sortable__label">{{ labelOf(it) }}</span>
      </div>
    </div>`,
}

const WdOtp = {
  name: 'WdOtp',
  props: {
    modelValue: { type: String, default: '' },
    length: { type: Number, default: 6 },
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  methods: {
    charAt(i) {
      return this.modelValue[i] || ''
    },
    onInput(i, e) {
      const el = e.target
      const next = String(el.value).replace(/\D/g, '').slice(-1)
      const arr = this.modelValue.split('')
      arr[i] = next
      this.$emit('update:modelValue', arr.join('').slice(0, this.length))
      if (next && i < this.length - 1 && this.$refs.boxes) this.$refs.boxes[i + 1].focus()
    },
    onKeydown(i, e) {
      if (e.key === 'Backspace' && !this.charAt(i) && i > 0) {
        const arr = this.modelValue.split('')
        arr[i - 1] = ''
        this.$emit('update:modelValue', arr.join(''))
        if (this.$refs.boxes) this.$refs.boxes[i - 1].focus()
      }
      if (e.key === 'ArrowLeft' && i > 0 && this.$refs.boxes) this.$refs.boxes[i - 1].focus()
      if (e.key === 'ArrowRight' && i < this.length - 1 && this.$refs.boxes) this.$refs.boxes[i + 1].focus()
    },
    onPaste(e) {
      e.preventDefault()
      const text = ((e.clipboardData && e.clipboardData.getData('text')) || '').replace(/\D/g, '').slice(0, this.length)
      if (!text) return
      this.$emit('update:modelValue', text)
      if (this.$refs.boxes) this.$refs.boxes[Math.min(text.length, this.length - 1)].focus()
    },
  },
  template: `
    <div class="wd-otp" @paste="onPaste">
      <input v-for="i in length" :key="i" ref="boxes" class="wd-otp__box"
        :value="charAt(i - 1)" :disabled="disabled" inputmode="numeric" maxlength="1"
        @input="onInput(i - 1, $event)" @keydown="onKeydown(i - 1, $event)" />
    </div>`,
}

const WdImagePreview = {
  name: 'WdImagePreview',
  props: {
    src: { type: String, default: '' },
    list: { type: Array, default: () => [] },
    alt: { type: String, default: '' },
    index: { type: Number, default: 0 },
  },
  data() {
    return { open: false, cur: 0, scale: 1, rotate: 0 }
  },
  computed: {
    images() {
      if (this.list.length) return this.list
      return this.src ? [this.src] : []
    },
  },
  mounted() {
    this.cur = this.index
  },
  methods: {
    view(i) {
      const n = this.images.length
      if (!n) return
      this.cur = ((i % n) + n) % n
      this.scale = 1
      this.rotate = 0
    },
    zoom(d) {
      this.scale = Math.min(4, Math.max(0.4, Math.round((this.scale + d) * 100) / 100))
    },
    resetView() {
      this.scale = 1
      this.rotate = 0
    },
    openPreview() {
      if (!this.images.length) return
      this.resetView()
      this.open = true
    },
  },
  template: `
    <span class="wd-image-preview" @click="openPreview">
      <slot>
        <img v-if="src" :src="src" :alt="alt" class="wd-image-preview__thumb" />
      </slot>
    </span>
    <transition name="wd-preview-fade">
      <div v-if="open" class="wd-preview">
        <div class="wd-preview__mask" @click="open = false"></div>
        <div class="wd-preview__stage" @wheel.prevent="zoom($event.deltaY > 0 ? -0.15 : 0.15)">
          <img class="wd-preview__img" :src="images[cur]" :alt="alt"
            :style="{ transform: 'scale(' + scale + ') rotate(' + rotate + 'deg)' }" />
        </div>
        <div v-if="images.length > 1" class="wd-preview__count">{{ cur + 1 }} / {{ images.length }}</div>
        <div class="wd-preview__toolbar">
          <button v-if="images.length > 1" type="button" class="wd-preview__btn" @click="view(cur - 1)">‹</button>
          <button type="button" class="wd-preview__btn" @click="rotate = (rotate + 90) % 360">↻</button>
          <button type="button" class="wd-preview__btn" @click="zoom(-0.25)">−</button>
          <button type="button" class="wd-preview__btn" @click="zoom(0.25)">＋</button>
          <button type="button" class="wd-preview__btn" @click="resetView">1:1</button>
          <button v-if="images.length > 1" type="button" class="wd-preview__btn" @click="view(cur + 1)">›</button>
          <button type="button" class="wd-preview__btn" @click="open = false">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
          </button>
        </div>
      </div>
    </transition>`,
}

const WdFileList = {
  name: 'WdFileList',
  props: { items: { type: Array, default: () => [] } },
  emits: ['select'],
  data() {
    return { openPaths: [] }
  },
  computed: {
    rows() {
      const out = []
      const walk = (nodes, depth, base) => {
        ;(nodes || []).forEach((n, i) => {
          const path = base + i + '/'
          out.push({ node: n, depth, path })
          if (n.type === 'folder' && this.openPaths.indexOf(path) !== -1) {
            walk(n.children, depth + 1, path)
          }
        })
      }
      walk(this.items, 0, '')
      return out
    },
  },
  methods: {
    onRow(row) {
      if (row.node.type === 'folder') {
        const at = this.openPaths.indexOf(row.path)
        if (at === -1) this.openPaths.push(row.path)
        else this.openPaths.splice(at, 1)
      } else {
        this.$emit('select', row.node)
      }
    },
    fmtSize(n) {
      if (!n) return ''
      if (n < 1024) return n + ' B'
      if (n < 1048576) return (n / 1024).toFixed(1) + ' KB'
      return (n / 1048576).toFixed(1) + ' MB'
    },
  },
  template: `
    <div class="wd-file-list">
      <div v-for="row in rows" :key="row.path" class="wd-file-list__row"
        :class="'wd-file-list__row--' + (row.node.type || 'file')"
        :style="{ paddingLeft: 12 + row.depth * 18 + 'px' }" @click="onRow(row)">
        <span v-if="row.node.type === 'folder'" class="wd-file-list__chevron"
          :class="{ 'wd-file-list__chevron--open': openPaths.indexOf(row.path) !== -1 }">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>
        </span>
        <span class="wd-file-list__icon">
          <svg v-if="row.node.type === 'folder'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"></path></svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path></svg>
        </span>
        <span class="wd-file-list__name">{{ row.node.name }}</span>
        <span class="wd-file-list__size">{{ fmtSize(row.node.size) }}</span>
      </div>
    </div>`,
}

const WdExplorer = {
  name: 'WdExplorer',
  props: { folders: { type: Array, default: () => [] } },
  emits: ['select'],
  data() {
    return { active: 0 }
  },
  computed: {
    current() {
      return this.folders[this.active] || { name: '', files: [] }
    },
  },
  methods: {
    fmtSize(n) {
      if (!n) return '—'
      if (n < 1024) return n + ' B'
      if (n < 1048576) return (n / 1024).toFixed(1) + ' KB'
      return (n / 1048576).toFixed(1) + ' MB'
    },
  },
  template: `
    <div class="wd-explorer">
      <div class="wd-explorer__side">
        <button v-for="(f, i) in folders" :key="i" type="button" class="wd-explorer__folder"
          :class="{ 'wd-explorer__folder--active': i === active }" @click="active = i">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"></path></svg>
          <span>{{ f.name }}</span>
          <span class="wd-explorer__count">{{ f.files.length }}</span>
        </button>
      </div>
      <div class="wd-explorer__main">
        <div class="wd-explorer__path">
          <span class="wd-explorer__crumb" @click="active = 0">全部文件</span>
          <span class="wd-explorer__sep">/</span>
          <span class="wd-explorer__crumb wd-explorer__crumb--cur">{{ current.name }}</span>
        </div>
        <table class="wd-table">
          <thead><tr><th>名称</th><th style="width: 90px;">大小</th><th style="width: 110px;">修改时间</th></tr></thead>
          <tbody>
            <tr v-for="(f, i) in current.files" :key="i" @click="$emit('select', f)">
              <td>
                <span class="wd-explorer__file-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path></svg>
                </span>
                {{ f.name }}
              </td>
              <td>{{ fmtSize(f.size) }}</td>
              <td>{{ f.modified || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`,
}

const WdAiMessage = {
  name: 'WdAiMessage',
  props: {
    content: { type: String, default: '' },
    self: Boolean,
    thinking: Boolean,
    streaming: Boolean,
    speed: { type: Number, default: 24 },
    actions: { type: Array, default: () => [] },
  },
  emits: ['action', 'stream-end'],
  data() {
    return { shown: '' }
  },
  watch: {
    streaming(v) {
      if (v) this.start()
      else {
        this.stop()
        this.shown = this.content
      }
    },
    content(v) {
      if (!this.streaming) this.shown = v
    },
  },
  mounted() {
    if (this.streaming) this.start()
    else this.shown = this.content
  },
  beforeUnmount() {
    this.stop()
  },
  methods: {
    start() {
      this.stop()
      this.shown = ''
      let i = 0
      this._timer = setInterval(() => {
        i += 1
        this.shown = this.content.slice(0, i)
        if (i >= this.content.length) {
          this.stop()
          this.$emit('stream-end')
        }
      }, Math.max(8, this.speed))
    },
    stop() {
      if (this._timer) {
        clearInterval(this._timer)
        this._timer = null
      }
    },
  },
  template: `
    <div class="wd-ai-msg" :class="{ 'wd-ai-msg--self': self }">
      <span class="wd-ai-msg__avatar">{{ self ? '我' : 'AI' }}</span>
      <div class="wd-ai-msg__bubble">
        <div v-if="thinking" class="wd-ai-msg__thinking"><i></i><i></i><i></i>深度思考中…</div>
        <p class="wd-ai-msg__text">{{ shown }}<span v-if="streaming && shown.length < content.length" class="wd-ai-msg__cursor">▍</span></p>
        <div v-if="actions.length" class="wd-ai-msg__actions">
          <button v-for="a in actions" :key="a.label" type="button" class="wd-btn"
            :class="['wd-btn--' + (a.variant || 'ghost'), 'wd-btn--sm']"
            @click="$emit('action', a.label)">{{ a.label }}</button>
        </div>
      </div>
    </div>`,
}

window.WD_EXTRA_COMPONENTS = (window.WD_EXTRA_COMPONENTS || []).concat([
  WdCarousel, WdSortableList, WdOtp, WdImagePreview,
  WdFileList, WdExplorer, WdAiMessage,
])
