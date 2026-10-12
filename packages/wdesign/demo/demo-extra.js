/* =============================================================
 *  WDesign — 进阶组件 demo 镜像（第 1/3 段）
 *  仅用于演示页；项目内请使用 src/components 下的 SFC
 * ============================================================= */

const WdCheckbox = {
  name: 'WdCheckbox',
  props: { modelValue: Boolean, label: { type: String, default: '' }, disabled: Boolean },
  emits: ['update:modelValue'],
  template: `
    <button type="button" role="checkbox" class="wd-checkbox"
      :class="{ 'wd-checkbox--checked': modelValue, 'wd-checkbox--disabled': disabled }"
      :aria-checked="modelValue" :disabled="disabled"
      @click="!disabled && $emit('update:modelValue', !modelValue)">
      <span class="wd-checkbox__box">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"></path></svg>
      </span>
      <span v-if="label || $slots.default" class="wd-checkbox__label"><slot>{{ label }}</slot></span>
    </button>`,
}

const WdRadioGroup = {
  name: 'WdRadioGroup',
  props: {
    modelValue: { type: [String, Number], default: '' },
    options: { type: Array, default: () => [] },
    disabled: Boolean,
    size: { type: String, default: 'md' },
  },
  emits: ['update:modelValue'],
  computed: {
    items() {
      return this.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o))
    },
  },
  template: `
    <div class="wd-radio-group" role="radiogroup">
      <button v-for="o in items" :key="o.value" type="button" role="radio" class="wd-radio"
        :class="{ 'wd-radio--checked': modelValue === o.value, 'wd-radio--disabled': disabled }"
        :disabled="disabled" @click="!disabled && $emit('update:modelValue', o.value)">
        <span class="wd-radio__dot"><span class="wd-radio__inner"></span></span>
        <span class="wd-radio__label">{{ o.label }}</span>
      </button>
    </div>`,
}

const WdSelect = {
  name: 'WdSelect',
  props: {
    modelValue: { type: [String, Number], default: '' },
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: '请选择' },
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return { open: false }
  },
  computed: {
    items() {
      return this.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o))
    },
    current() {
      return this.items.find((o) => o.value === this.modelValue)
    },
  },
  mounted() {
    this._onClick = (e) => {
      if (this.$el && !this.$el.contains(e.target)) this.open = false
    }
    this._onKey = (e) => {
      if (e.key === 'Escape') this.open = false
    }
    document.addEventListener('click', this._onClick)
    document.addEventListener('keydown', this._onKey)
  },
  beforeUnmount() {
    document.removeEventListener('click', this._onClick)
    document.removeEventListener('keydown', this._onKey)
  },
  methods: {
    pick(v) {
      this.$emit('update:modelValue', v)
      this.open = false
    },
  },
  template: `
    <div class="wd-select" :class="{ 'wd-select--open': open, 'wd-select--disabled': disabled }">
      <button type="button" class="wd-select__trigger" :class="{ 'wd-select__trigger--lg': size === 'lg', 'wd-select__trigger--sm': size === 'sm' }" :disabled="disabled" @click="open = !open">
        <span v-if="current" class="wd-select__value">{{ current.label }}</span>
        <span v-else class="wd-select__placeholder">{{ placeholder }}</span>
        <svg class="wd-chevron" :class="{ 'wd-chevron--open': open }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
      </button>
      <transition name="wd-select-pop">
        <div v-if="open" class="wd-select__menu">
          <button v-for="o in items" :key="o.value" type="button" class="wd-select__option"
            :class="{ 'wd-select__option--active': o.value === modelValue }" @click="pick(o.value)">
            <span>{{ o.label }}</span>
            <svg v-if="o.value === modelValue" class="wd-select__option-mark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"></path></svg>
          </button>
        </div>
      </transition>
    </div>`,
}

const WdTabs = {
  name: 'WdTabs',
  props: {
    modelValue: { type: [String, Number], default: '' },
    tabs: { type: Array, default: () => [] },
    block: Boolean,
  },
  emits: ['update:modelValue'],
  computed: {
    items() {
      return this.tabs.map((t) => (typeof t === 'string' ? { label: t, value: t } : t))
    },
  },
  template: `
    <div class="wd-tabs" :class="{ 'wd-tabs--block': block }">
      <button v-for="t in items" :key="t.value" type="button" class="wd-tabs__item"
        :class="{ 'wd-tabs__item--active': t.value === modelValue }"
        @click="$emit('update:modelValue', t.value)">{{ t.label }}</button>
    </div>`,
}

/* =============================================================
 *  demo 镜像（第 2/3 段）：Alert / Skeleton / Empty / Modal / Badge
 * ============================================================= */

const WdAlert = {
  name: 'WdAlert',
  props: {
    variant: { type: String, default: 'info' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    closable: Boolean,
  },
  emits: ['close'],
  data() {
    return { visible: true }
  },
  methods: {
    close() {
      this.visible = false
      this.$emit('close')
    },
  },
  template: `
    <div v-if="visible" class="wd-alert" :class="'wd-alert--' + variant">
      <span class="wd-alert__icon wd-dot wd-dot--lg" :class="'wd-dot--' + variant"></span>
      <div class="wd-alert__body">
        <div v-if="title" class="wd-alert__title">{{ title }}</div>
        <div v-if="description || $slots.default" class="wd-alert__desc"><slot>{{ description }}</slot></div>
      </div>
      <button v-if="closable" type="button" class="wd-alert__close" @click="close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
      </button>
    </div>`,
}

const WdSkeleton = {
  name: 'WdSkeleton',
  props: {
    variant: { type: String, default: 'text' },
    width: { type: [Number, String], default: '' },
    height: { type: [Number, String], default: '' },
    count: { type: Number, default: 3 },
  },
  computed: {
    itemStyle() {
      const style = {}
      const px = (v) => (typeof v === 'number' ? v + 'px' : v)
      if (this.variant === 'circle') {
        const s = px(this.width) || '48px'
        style.width = s
        style.height = px(this.height) || s
      } else {
        if (this.width) style.width = px(this.width)
        if (this.height) style.height = px(this.height)
        if (this.variant === 'rect' && !this.height) style.height = '80px'
      }
      return style
    },
  },
  template: `
    <div class="wd-skeleton" :class="'wd-skeleton--' + variant">
      <span v-for="i in count" :key="i" class="wd-skeleton__item"
        :class="{ 'wd-skeleton__item--text': variant === 'text' }" :style="itemStyle"></span>
    </div>`,
}

const WdEmpty = {
  name: 'WdEmpty',
  props: {
    title: { type: String, default: '暂无数据' },
    description: { type: String, default: '' },
  },
  template: `
    <div class="wd-empty">
      <div class="wd-empty__icon">
        <slot name="icon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 12h-6l-2 3h-4l-2-3H2"></path>
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
          </svg>
        </slot>
      </div>
      <div v-if="title" class="wd-empty__title">{{ title }}</div>
      <div v-if="description || $slots.description" class="wd-empty__desc"><slot name="description">{{ description }}</slot></div>
      <div v-if="$slots.action" class="wd-empty__action"><slot name="action"></slot></div>
    </div>`,
}

const WdModal = {
  name: 'WdModal',
  props: {
    modelValue: Boolean,
    title: { type: String, default: '' },
    width: { type: [Number, String], default: 440 },
    closeOnMask: { type: Boolean, default: true },
  },
  emits: ['update:modelValue'],
  computed: {
    maxWidth() {
      return typeof this.width === 'number' ? this.width + 'px' : this.width
    },
  },
  mounted() {
    this._onKey = (e) => {
      if (e.key === 'Escape' && this.modelValue) this.$emit('update:modelValue', false)
    }
    document.addEventListener('keydown', this._onKey)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this._onKey)
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false)
    },
  },
  template: `
    <transition name="wd-modal-fade">
    <div v-if="modelValue" class="wd-modal" role="dialog" aria-modal="true">
      <div class="wd-modal__mask" @click="closeOnMask && close()"></div>
      <div class="wd-modal__panel" :style="{ maxWidth: maxWidth }">
        <div class="wd-modal__head">
          <div class="wd-modal__title">{{ title }}</div>
          <button type="button" class="wd-icon-btn" aria-label="关闭" @click="close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
          </button>
        </div>
        <div class="wd-modal__body"><slot></slot></div>
        <div v-if="$slots.footer" class="wd-modal__foot"><slot name="footer"></slot></div>
      </div>
    </div>
    </transition>`,
}

const WdBadge = {
  name: 'WdBadge',
  props: {
    value: { type: [Number, String], default: '' },
    dot: Boolean,
    max: { type: Number, default: 99 },
    tone: { type: String, default: 'red' },
  },
  computed: {
    display() {
      if (typeof this.value === 'number' && this.max && this.value > this.max) return this.max + '+'
      return this.value
    },
    showCount() {
      return !this.dot && this.value !== '' && this.value !== undefined && this.value !== null
    },
  },
  template: `
    <span class="wd-badge" :class="tone === 'gray' ? 'wd-badge--gray' : ''">
      <slot></slot>
      <span v-if="dot" class="wd-badge__dot"></span>
      <span v-else-if="showCount" class="wd-badge__count">{{ display }}</span>
    </span>`,
}

/* =============================================================
 *  demo 镜像（第 3/3 段）：DatePicker / Tooltip / Dropdown /
 *  Pagination / Slider / Steps / Spinner + Toast + 注册表
 * ============================================================= */

const WdDatePicker = {
  name: 'WdDatePicker',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '选择日期' },
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    const now = new Date()
    return {
      open: false,
      view: new Date(now.getFullYear(), now.getMonth(), 1),
      WEEK: ['一', '二', '三', '四', '五', '六', '日'],
    }
  },
  computed: {
    monthLabel() {
      return this.view.getFullYear() + ' 年 ' + (this.view.getMonth() + 1) + ' 月'
    },
    days() {
      const first = this.view
      const startIdx = (first.getDay() + 6) % 7
      const start = new Date(first)
      start.setDate(1 - startIdx)
      const today = this.fmt(new Date())
      const list = []
      for (let i = 0; i < 42; i++) {
        const d = new Date(start)
        d.setDate(start.getDate() + i)
        const key = this.fmt(d)
        list.push({
          key,
          label: d.getDate(),
          muted: d.getMonth() !== first.getMonth(),
          today: key === today,
          selected: key === this.modelValue,
        })
      }
      return list
    },
  },
  mounted() {
    this._onClick = (e) => {
      if (this.$el && !this.$el.contains(e.target)) this.open = false
    }
    this._onKey = (e) => {
      if (e.key === 'Escape') this.open = false
    }
    document.addEventListener('click', this._onClick)
    document.addEventListener('keydown', this._onKey)
  },
  beforeUnmount() {
    document.removeEventListener('click', this._onClick)
    document.removeEventListener('keydown', this._onKey)
  },
  methods: {
    pad(n) {
      return n < 10 ? '0' + n : '' + n
    },
    fmt(d) {
      return d.getFullYear() + '-' + this.pad(d.getMonth() + 1) + '-' + this.pad(d.getDate())
    },
    prevMonth() {
      this.view = new Date(this.view.getFullYear(), this.view.getMonth() - 1, 1)
    },
    nextMonth() {
      this.view = new Date(this.view.getFullYear(), this.view.getMonth() + 1, 1)
    },
    toggle() {
      if (this.disabled) return
      this.open = !this.open
      if (this.open && this.modelValue) {
        const d = new Date(this.modelValue)
        if (!isNaN(d.getTime())) {
          this.view = new Date(d.getFullYear(), d.getMonth(), 1)
        }
      }
    },
    pick(key) {
      this.$emit('update:modelValue', key)
      this.open = false
    },
    pickToday() {
      const now = new Date()
      this.view = new Date(now.getFullYear(), now.getMonth(), 1)
      this.pick(this.fmt(now))
    },
  },
  template: `
    <div class="wd-datepicker" :class="{ 'wd-datepicker--open': open }">
      <button type="button" class="wd-datepicker__trigger" :disabled="disabled" @click="toggle">
        <span v-if="modelValue" class="wd-datepicker__value">{{ modelValue }}</span>
        <span v-else class="wd-datepicker__placeholder">{{ placeholder }}</span>
        <svg class="wd-datepicker__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="16" rx="4"></rect><path d="M3.5 10h17M8 3v4M16 3v4"></path></svg>
      </button>
      <transition name="wd-datepicker-pop">
        <div v-if="open" class="wd-datepicker__panel">
          <div class="wd-datepicker__head">
            <span class="wd-datepicker__month">{{ monthLabel }}</span>
            <span class="wd-datepicker__nav">
              <button type="button" class="wd-icon-btn wd-icon-btn--sm" @click="prevMonth">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
              </button>
              <button type="button" class="wd-icon-btn wd-icon-btn--sm" @click="nextMonth">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>
              </button>
            </span>
          </div>
          <div class="wd-datepicker__week"><span v-for="w in WEEK" :key="w">{{ w }}</span></div>
          <div class="wd-datepicker__grid">
            <button v-for="d in days" :key="d.key" type="button" class="wd-datepicker__day"
              :class="{ 'wd-datepicker__day--muted': d.muted, 'wd-datepicker__day--today': d.today, 'wd-datepicker__day--selected': d.selected }"
              @click="pick(d.key)">{{ d.label }}</button>
          </div>
          <div class="wd-datepicker__foot">
            <button type="button" class="wd-datepicker__todaybtn" @click="pickToday">回到今天</button>
          </div>
        </div>
      </transition>
    </div>`,
}

const WdTooltip = {
  name: 'WdTooltip',
  props: {
    content: { type: String, default: '' },
    placement: { type: String, default: 'top' },
  },
  data() {
    return { open: false }
  },
  template: `
    <span class="wd-tooltip" :class="['wd-tooltip--' + placement, { 'wd-tooltip--open': open }]"
      @mouseenter="open = true" @mouseleave="open = false" @focusin="open = true" @focusout="open = false">
      <slot></slot>
      <span class="wd-tooltip__bubble">{{ content }}</span>
    </span>`,
}

const WdDropdown = {
  name: 'WdDropdown',
  props: { items: { type: Array, default: () => [] } },
  emits: ['select'],
  data() {
    return { open: false }
  },
  mounted() {
    this._onClick = (e) => {
      if (this.$el && !this.$el.contains(e.target)) this.open = false
    }
    this._onKey = (e) => {
      if (e.key === 'Escape') this.open = false
    }
    document.addEventListener('click', this._onClick)
    document.addEventListener('keydown', this._onKey)
  },
  beforeUnmount() {
    document.removeEventListener('click', this._onClick)
    document.removeEventListener('keydown', this._onKey)
  },
  methods: {
    pick(it) {
      if (it.disabled) return
      this.$emit('select', it.value)
      this.open = false
    },
  },
  template: `
    <span class="wd-dropdown">
      <span class="wd-dropdown__trigger" role="button" tabindex="0" :aria-haspopup="true" :aria-expanded="open" @keydown.enter.prevent="open = !open" @keydown.space.prevent="open = !open" @click="open = !open"><slot></slot></span>
      <transition name="wd-dropdown-pop">
        <div v-if="open" class="wd-dropdown__menu">
          <button v-for="it in items" :key="it.value" type="button" class="wd-dropdown__item"
            :class="{ 'wd-dropdown__item--danger': it.danger, 'wd-dropdown__item--disabled': it.disabled }"
            @click="pick(it)">{{ it.label }}</button>
        </div>
      </transition>
    </span>`,
}

const WdPagination = {
  name: 'WdPagination',
  props: {
    modelValue: { type: Number, default: 1 },
    total: { type: Number, default: 0 },
    pageSize: { type: Number, default: 10 },
  },
  emits: ['update:modelValue'],
  computed: {
    pageCount() {
      return Math.max(1, Math.ceil(this.total / this.pageSize))
    },
    range() {
      const n = this.pageCount
      const cur = this.modelValue
      if (n <= 7) {
        const arr = []
        for (let i = 1; i <= n; i++) arr.push(i)
        return arr
      }
      const pages = [1]
      const left = Math.max(2, cur - 1)
      const right = Math.min(n - 1, cur + 1)
      if (left > 2) pages.push('...')
      for (let i = left; i <= right; i++) pages.push(i)
      if (right < n - 1) pages.push('...')
      pages.push(n)
      return pages
    },
  },
  methods: {
    go(p) {
      const v = Math.min(Math.max(1, p), this.pageCount)
      if (v !== this.modelValue) this.$emit('update:modelValue', v)
    },
  },
  template: `
    <nav class="wd-pagination">
      <button type="button" class="wd-pagination__btn" :disabled="modelValue <= 1" @click="go(modelValue - 1)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
      </button>
      <template v-for="(p, i) in range" :key="i">
        <span v-if="p === '...'" class="wd-pagination__dots">…</span>
        <button v-else type="button" class="wd-pagination__btn" :class="{ 'wd-pagination__btn--active': p === modelValue }" @click="go(p)">{{ p }}</button>
      </template>
      <button type="button" class="wd-pagination__btn" :disabled="modelValue >= pageCount" @click="go(modelValue + 1)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>
      </button>
    </nav>`,
}

const WdSlider = {
  name: 'WdSlider',
  props: {
    modelValue: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    showValue: { type: Boolean, default: true },
  },
  emits: ['update:modelValue'],
  computed: {
    percent() {
      const span = this.max - this.min || 1
      return Math.max(0, Math.min(100, ((this.modelValue - this.min) / span) * 100))
    },
    trackStyle() {
      return {
        background:
          'linear-gradient(to right, var(--wd-red) 0%, var(--wd-red) ' +
          this.percent +
          '%, var(--wd-tint-2) ' +
          this.percent +
          '%, var(--wd-tint-2) 100%)',
      }
    },
  },
  template: `
    <div class="wd-slider">
      <input type="range" :min="min" :max="max" :step="step" :value="modelValue" :style="trackStyle"
        @input="$emit('update:modelValue', Number($event.target.value))" />
      <span v-if="showValue" class="wd-slider__value">{{ modelValue }}</span>
    </div>`,
}

const WdSteps = {
  name: 'WdSteps',
  props: {
    steps: { type: Array, default: () => [] },
    current: { type: Number, default: 0 },
  },
  computed: {
    items() {
      return this.steps.map((s) => (typeof s === 'string' ? { title: s, desc: '' } : { desc: '', ...s }))
    },
  },
  methods: {
    state(i) {
      if (i < this.current) return 'finish'
      if (i === this.current) return 'process'
      return 'wait'
    },
  },
  template: `
    <div class="wd-steps">
      <template v-for="(s, i) in items" :key="i">
        <div class="wd-steps__item" :class="'wd-steps__item--' + state(i)">
          <span class="wd-steps__dot">
            <svg v-if="state(i) === 'finish'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"></path></svg>
            <template v-else>{{ i + 1 }}</template>
          </span>
          <span class="wd-steps__label">{{ s.title }}<em v-if="s.desc" class="wd-steps__desc">{{ s.desc }}</em></span>
        </div>
        <span v-if="i < items.length - 1" class="wd-steps__bar" :class="{ 'wd-steps__bar--done': i < current }"></span>
      </template>
    </div>`,
}

const WdSpinner = {
  name: 'WdSpinner',
  props: { size: { type: String, default: 'md' } },
  template: `<span class="wd-spinner" :class="size !== 'md' ? 'wd-spinner--' + size : ''"></span>`,
}

/* ---------------- Toast（镜像实现） ---------------- */
window.WD_TOAST = (() => {
  let container = null
  const MAX = 4
  function ensure() {
    if (!container || !document.body.contains(container)) {
      container = document.createElement('div')
      container.className = 'wd-toasts'
      document.body.appendChild(container)
    }
    return container
  }
  function show(message, options) {
    options = options || {}
    const type = options.type || 'info'
    const duration = options.duration || 2400
    const wrap = ensure()
    while (wrap.children.length >= MAX) wrap.removeChild(wrap.firstChild)
    const el = document.createElement('div')
    el.className = 'wd-toast wd-toast--' + type + ' wd-toast--enter'
    const dot = document.createElement('span')
    dot.className = 'wd-dot wd-dot--' + type
    const text = document.createElement('span')
    text.textContent = message
    el.appendChild(dot)
    el.appendChild(text)
    wrap.appendChild(el)
    requestAnimationFrame(() => el.classList.remove('wd-toast--enter'))
    let done = false
    const dismiss = () => {
      if (done) return
      done = true
      el.classList.add('wd-toast--leave')
      setTimeout(() => el.remove(), 260)
    }
    setTimeout(dismiss, duration)
    el.addEventListener('click', dismiss)
  }
  return {
    show,
    info: (m, o) => show(m, Object.assign({}, o, { type: 'info' })),
    success: (m, o) => show(m, Object.assign({}, o, { type: 'success' })),
    warning: (m, o) => show(m, Object.assign({}, o, { type: 'warning' })),
    danger: (m, o) => show(m, Object.assign({}, o, { type: 'danger' })),
  }
})()

window.WD_EXTRA_COMPONENTS = [
  WdCheckbox, WdRadioGroup, WdSelect, WdTabs,
  WdAlert, WdSkeleton, WdEmpty, WdModal, WdBadge,
  WdDatePicker, WdTooltip, WdDropdown, WdPagination, WdSlider, WdSteps, WdSpinner,
]

/* =============================================================
 *  demo 镜像（第 4/4 段）：Table / Breadcrumb / Collapse
 * ============================================================= */

const WdTable = {
  name: 'WdTable',
  props: {
    columns: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] },
    striped: { type: Boolean, default: true },
    emptyText: { type: String, default: '暂无数据' },
  },
  data() {
    return { sortKey: '', sortDir: 'asc' }
  },
  computed: {
    sorted() {
      if (!this.sortKey) return this.rows
      const dir = this.sortDir
      return this.rows.slice().sort((a, b) => {
        const av = String(a[this.sortKey] ?? '')
        const bv = String(b[this.sortKey] ?? '')
        const cmp = av.localeCompare(bv, 'zh-CN', { numeric: true })
        return dir === 'asc' ? cmp : -cmp
      })
    },
  },
  methods: {
    toggleSort(col) {
      if (!col.sortable) return
      if (this.sortKey === col.key) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = col.key
        this.sortDir = 'asc'
      }
    },
  },
  template: `
    <div class="wd-table-wrap">
      <table v-if="rows.length" class="wd-table" :class="{ 'wd-table--striped': striped }">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" :style="col.width ? { width: col.width } : null"
              class="wd-table__th" :class="{ 'wd-table__th--sort': col.sortable }"
              :aria-sort="sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'"
              @click="toggleSort(col)">
              {{ col.title }}
              <span v-if="col.sortable" class="wd-table__sort">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
                  :style="{ color: sortKey === col.key ? 'var(--wd-red)' : 'var(--wd-ink-3)' }">
                  <path v-if="sortKey !== col.key || sortDir === 'asc'" d="M12 5l7 7H5l7-7z"></path>
                  <path v-else d="M12 19l-7-7h14l-7 7z"></path>
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in sorted" :key="i">
            <td v-for="col in columns" :key="col.key" :style="col.align ? { textAlign: col.align } : null">
              <slot :name="'cell-' + col.key" :row="row" :value="row[col.key]">{{ row[col.key] }}</slot>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="wd-table__empty">{{ emptyText }}</div>
    </div>`,
}

const WdBreadcrumb = {
  name: 'WdBreadcrumb',
  props: {
    items: { type: Array, default: () => [] },
    separator: { type: String, default: '/' },
  },
  emits: ['select'],
  methods: {
    pick(item, index) {
      if (index === this.items.length - 1) return
      this.$emit('select', item.value !== undefined ? item.value : index, index)
    },
  },
  template: `
    <nav class="wd-breadcrumb">
      <template v-for="(item, i) in items" :key="i">
        <span v-if="i > 0" class="wd-breadcrumb__sep">{{ separator }}</span>
        <button type="button" class="wd-breadcrumb__item"
          :class="{ 'wd-breadcrumb__item--current': i === items.length - 1 }"
          @click="pick(item, i)">{{ item.label }}</button>
      </template>
    </nav>`,
}

const WdCollapse = {
  name: 'WdCollapse',
  props: {
    modelValue: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] },
  },
  emits: ['update:modelValue'],
  methods: {
    isOpen(i) {
      return this.modelValue.indexOf(i) !== -1
    },
    toggle(i) {
      const next = this.modelValue.slice()
      const at = next.indexOf(i)
      if (at === -1) next.push(i)
      else next.splice(at, 1)
      next.sort((a, b) => a - b)
      this.$emit('update:modelValue', next)
    },
  },
  template: `
    <div class="wd-collapse">
      <div v-for="(item, i) in items" :key="i" class="wd-collapse__item"
        :class="{ 'wd-collapse__item--open': isOpen(i) }">
        <button type="button" class="wd-collapse__head" :aria-expanded="isOpen(i)" @click="toggle(i)">
          <span>{{ item.title }}</span>
          <svg class="wd-chevron" :class="{ 'wd-chevron--open': isOpen(i) }" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
        </button>
        <div class="wd-collapse__body">
          <div class="wd-collapse__inner">
            <div class="wd-collapse__content">
              <slot :name="'item-' + i" :item="item">{{ item.content }}</slot>
            </div>
          </div>
        </div>
      </div>
    </div>`,
}

/* =============================================================
 *  demo 镜像（第 4/4 段 · 续）：Drawer / Result / Rate + 注册
 * ============================================================= */

const WdDrawer = {
  name: 'WdDrawer',
  props: {
    modelValue: Boolean,
    title: { type: String, default: '' },
    side: { type: String, default: 'right' },
    closeOnMask: { type: Boolean, default: true },
  },
  emits: ['update:modelValue'],
  mounted() {
    this._onKey = (e) => {
      if (e.key === 'Escape' && this.modelValue) this.$emit('update:modelValue', false)
    }
    document.addEventListener('keydown', this._onKey)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this._onKey)
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false)
    },
  },
  template: `
    <transition name="wd-drawer-fade">
      <div v-if="modelValue" class="wd-drawer" :class="side === 'left' ? 'wd-drawer--left' : ''" role="dialog" aria-modal="true" aria-label="抽屉">
        <div class="wd-drawer__mask" @click="closeOnMask && close()"></div>
        <div class="wd-drawer__panel">
          <div class="wd-drawer__head">
            <div class="wd-drawer__title">{{ title }}</div>
            <button type="button" class="wd-icon-btn" @click="close">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
            </button>
          </div>
          <div class="wd-drawer__body"><slot></slot></div>
        <div v-if="$slots.footer" class="wd-drawer__foot"><slot name="footer"></slot></div>
        </div>
      </div>
    </transition>`,
}

const WdResult = {
  name: 'WdResult',
  props: {
    status: { type: String, default: 'info' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  template: `
    <div class="wd-result" :class="'wd-result--' + status">
      <div class="wd-result__icon">
        <slot name="icon">
          <svg v-if="status === 'success'" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"></path></svg>
          <svg v-else-if="status === 'warning'" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v5M12 16.5h.01M10.3 4.2 3.6 16.1A2 2 0 0 0 5.3 19h13.4a2 2 0 0 0 1.7-2.9L13.7 4.2a2 2 0 0 0-3.4 0z"></path></svg>
          <svg v-else-if="status === 'error'" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
          <svg v-else width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 11v6M12 7.5h.01"></path><circle cx="12" cy="12" r="9"></circle></svg>
        </slot>
      </div>
      <div v-if="title" class="wd-result__title">{{ title }}</div>
      <div v-if="description || $slots.default" class="wd-result__desc"><slot>{{ description }}</slot></div>
      <div v-if="$slots.extra" class="wd-result__extra"><slot name="extra"></slot></div>
    </div>`,
}

const WdRate = {
  name: 'WdRate',
  props: {
    modelValue: { type: Number, default: 0 },
    count: { type: Number, default: 5 },
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return { hover: -1 }
  },
  methods: {
    isOn(i) {
      const n = this.hover >= 0 ? this.hover + 1 : this.modelValue
      return i <= n
    },
    pick(i) {
      if (this.disabled) return
      this.$emit('update:modelValue', this.modelValue === i + 1 ? 0 : i + 1)
    },
  },
  template: `
    <div class="wd-rate" :class="{ 'wd-rate--disabled': disabled }" @mouseleave="hover = -1">
      <button v-for="i in count" :key="i" type="button" class="wd-rate__item"
        :class="{ 'wd-rate__item--on': isOn(i) }"
        @mouseenter="hover = i - 1" @click="pick(i - 1)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.8l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 16.9l-5.6 2.9 1.2-6.2L3 9.3l6.3-.8z"></path></svg>
      </button>
    </div>`,
}

window.WD_EXTRA_COMPONENTS = (window.WD_EXTRA_COMPONENTS || []).concat([
  WdTable, WdBreadcrumb, WdCollapse, WdDrawer, WdResult, WdRate,
])


/* =============================================================
 *  demo 镜像（第 6 段）：Segmented / Upload / Notification
 * ============================================================= */

const WdSegmented = {
  name: 'WdSegmented',
  props: {
    modelValue: { type: [String, Number], default: '' },
    options: { type: Array, default: () => [] },
    block: Boolean,
    tone: { type: String, default: 'light' },
  },
  emits: ['update:modelValue'],
  computed: {
    items() {
      return this.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o))
    },
  },
  mounted() {
    this.updateSlider()
    this._onResize = () => this.updateSlider()
    window.addEventListener('resize', this._onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this._onResize)
  },
  watch: {
    modelValue() {
      this.$nextTick(() => this.updateSlider())
    },
    items() {
      this.$nextTick(() => this.updateSlider())
    },
  },
  methods: {
    updateSlider() {
      const t = this.$refs.track
      const s = this.$refs.slider
      if (!t || !s) return
      const active = t.querySelector('.wd-segmented__item--active')
      if (!active) return
      const dx = active.offsetLeft - s.offsetLeft
      const dy = active.offsetTop - s.offsetTop
      s.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)'
      s.style.width = active.offsetWidth + 'px'
      s.style.height = active.offsetHeight + 'px'
    },
  },
  template: `
    <div ref="track" class="wd-segmented"
      :class="{ 'wd-segmented--block': block, 'wd-segmented--dark': tone === 'dark' }">
      <span ref="slider" class="wd-segmented__slider"></span>
      <button v-for="o in items" :key="o.value" type="button" class="wd-segmented__item"
        :class="{ 'wd-segmented__item--active': o.value === modelValue }"
        @click="$emit('update:modelValue', o.value)">{{ o.label }}</button>
    </div>`,
}

const WdUpload = {
  name: 'WdUpload',
  props: {
    accept: { type: String, default: '*' },
    multiple: Boolean,
    hint: { type: String, default: '' },
  },
  emits: ['change'],
  data() {
    return { files: [], dragging: false }
  },
  methods: {
    fmtSize(n) {
      if (n < 1024) return n + ' B'
      if (n < 1048576) return (n / 1024).toFixed(1) + ' KB'
      return (n / 1048576).toFixed(1) + ' MB'
    },
    openPicker() {
      if (this.$refs.input) this.$refs.input.click()
    },
    addFiles(list) {
      const arr = Array.from(list || [])
      for (const f of arr) {
        if (!this.multiple && this.files.length >= 1) this.files = []
        const item = { name: f.name, size: f.size, percent: 0 }
        this.files.push(item)
        this.$emit('change', this.files.slice())
        const timer = setInterval(() => {
          item.percent = Math.min(100, item.percent + Math.round(12 + Math.random() * 16))
          if (item.percent >= 100) clearInterval(timer)
        }, 120)
      }
    },
    onPick(e) {
      this.addFiles(e.target.files)
      e.target.value = ''
    },
    onDrop(e) {
      e.preventDefault()
      this.dragging = false
      this.addFiles(e.dataTransfer.files)
    },
    remove(i) {
      this.files.splice(i, 1)
      this.$emit('change', this.files.slice())
    },
  },
  template: `
    <div class="wd-upload">
      <div class="wd-upload__zone" :class="{ 'wd-upload__zone--over': dragging }"
        @click="openPicker" @dragover.prevent="dragging = true" @dragleave="dragging = false" @drop="onDrop">
        <span class="wd-upload__icon">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4m0 0-4 4m4-4 4 4"></path><path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"></path></svg>
        </span>
        <span class="wd-upload__hint"><strong>点击选择</strong> 或拖拽文件到这里</span>
        <span v-if="hint" class="wd-upload__hint">{{ hint }}</span>
        <span class="wd-upload__browse">浏览文件</span>
        <input ref="input" class="wd-upload__input" type="file" :accept="accept" :multiple="multiple" @change="onPick" />
      </div>
      <div v-if="files.length" class="wd-upload__list">
        <div v-for="(f, i) in files" :key="i" class="wd-upload__item">
          <span class="wd-upload__file-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path></svg>
          </span>
          <div class="wd-upload__info">
            <div class="wd-upload__name">{{ f.name }}</div>
            <div class="wd-upload__meta">{{ fmtSize(f.size) }} · {{ f.percent >= 100 ? '已完成' : '上传中 ' + f.percent + '%' }}</div>
            <div v-if="f.percent < 100" class="wd-upload__progress">
              <span class="wd-upload__progress-bar" :style="{ width: f.percent + '%' }"></span>
            </div>
          </div>
          <button type="button" class="wd-upload__remove" @click.stop="remove(i)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
          </button>
        </div>
      </div>
    </div>`,
}

const WdNotification = {
  name: 'WdNotification',
  props: {
    modelValue: Boolean,
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    variant: { type: String, default: 'info' },
  },
  emits: ['update:modelValue'],
  mounted() {
    this._onKey = (e) => {
      if (e.key === 'Escape' && this.modelValue) this.$emit('update:modelValue', false)
    }
    document.addEventListener('keydown', this._onKey)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this._onKey)
  },
  template: `
    <transition name="wd-notification-fade">
      <div v-if="modelValue" class="wd-notification" :class="'wd-notification--' + variant">
        <span class="wd-notification__icon wd-dot wd-dot--lg" :class="'wd-dot--' + variant"></span>
        <div class="wd-notification__body">
          <div v-if="title" class="wd-notification__title">{{ title }}</div>
          <div v-if="description || $slots.default" class="wd-notification__desc"><slot>{{ description }}</slot></div>
        </div>
        <button type="button" class="wd-icon-btn wd-icon-btn--ghost wd-icon-btn--sm" @click="$emit('update:modelValue', false)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
    </transition>`,
}

window.WD_EXTRA_COMPONENTS = (window.WD_EXTRA_COMPONENTS || []).concat([
  WdSegmented, WdUpload, WdNotification,
])

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
    return { index: 0, touchX: null, touchDelta: 0, touchLock: false }
  },
  computed: {
    trackStyle() {
      return { transform: 'translateX(calc(-' + this.index * 100 + '% + ' + this.touchDelta + 'px))' }
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
    onTouchStart(e) {
      const t = e.touches && e.touches[0]
      if (!t) return
      this.stop()
      this.touchX = t.clientX
      this.touchDelta = 0
      this.touchLock = true
    },
    onTouchMove(e) {
      const t = e.touches && e.touches[0]
      if (!t || !this.touchLock) return
      const d = t.clientX - this.touchX
      const w = this.$el ? this.$el.offsetWidth : 1
      this.touchDelta = d / Math.max(1, w * 0.25) * 60   // 阻尼跟随
    },
    onTouchEnd() {
      this.touchLock = false
      const TH = 42
      if (this.touchDelta < -TH) this.go(this.index + 1)
      else if (this.touchDelta > TH) this.go(this.index - 1)
      this.touchDelta = 0
      this.start()
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
    <div class="wd-carousel" :class="{ 'wd-carousel--dragging': touchLock }" :style="{ height: height + 'px' }" @mouseenter="stop" @mouseleave="start"
      @touchstart.prevent="onTouchStart" @touchmove.prevent="onTouchMove" @touchend="onTouchEnd">
      <div class="wd-carousel__track" :style="trackStyle">
        <div v-for="(it, i) in items" :key="i" class="wd-carousel__slide" :style="{ background: pal(i) }">
          <slot name="item" :item="it" :index="i">
            <img v-if="it.src" :src="it.src" :alt="it.alt || ''" class="wd-carousel__img" />
            <span v-else class="wd-carousel__label">{{ it.label || 'Slide ' + (i + 1) }}</span>
          </slot>
        </div>
      </div>
      <button v-if="showArrows && items.length > 1" type="button" class="wd-icon-btn wd-carousel__arrow wd-carousel__arrow--prev" @click="go(index - 1)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
      </button>
      <button v-if="showArrows && items.length > 1" type="button" class="wd-icon-btn wd-carousel__arrow wd-carousel__arrow--next" @click="go(index + 1)">
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
    return { dragIndex: -1, overIndex: -1, pressed: -1, startX: 0, startY: 0, cloneEl: null }
  },
  computed: {
    lineTop() {
      if (this.overIndex < 0 || !this.$el) return -9999
      const items = this.$el.querySelectorAll('.wd-sortable__item')
      const el = items[Math.min(this.overIndex, items.length - 1)]
      return el ? el.offsetTop : -9999
    },
  },
  beforeUnmount() {
    this.detach()
    this.dropClone()
  },
  methods: {
    keyOf(it, i) {
      return typeof it === 'string' ? it : (it && it.value != null ? it.value : i)
    },
    labelOf(it) {
      return typeof it === 'string' ? it : (it && it.label)
    },
    /* ---------- 指针（鼠标 / 触摸统一） ---------- */
    onDown(i, e) {
      const t = e.touches ? e.touches[0] : e
      if (!t) return
      this.pressed = i
      this.startX = t.clientX
      this.startY = t.clientY
      window.addEventListener('mousemove', this.onMove)
      window.addEventListener('mouseup', this.onUp)
      window.addEventListener('touchmove', this.onMove, { passive: false })
      window.addEventListener('touchend', this.onUp)
      window.addEventListener('touchcancel', this.onUp)
    },
    onMove(e) {
      if (this.pressed < 0) return
      const t = e.touches ? e.touches[0] : e
      if (!t) return
      const dx = Math.abs(t.clientX - this.startX)
      const dy = Math.abs(t.clientY - this.startY)
      // 超过阈值才算拖动（避免误触）
      if (this.dragIndex < 0) {
        if (dx + dy < 6) return
        this.dragIndex = this.pressed
        this.overIndex = this.pressed
        this.makeClone(this.pressed, t.clientX, t.clientY)
        document.body.style.userSelect = 'none'
      }
      e.preventDefault()
      this.moveClone(t.clientX, t.clientY)
      const el = document.elementFromPoint(t.clientX, t.clientY)
      const item = el && el.closest ? el.closest('.wd-sortable__item') : null
      if (item && this.$el && this.$el.contains(item)) {
        const list = Array.prototype.slice.call(this.$el.querySelectorAll('.wd-sortable__item'))
        const idx = list.indexOf(item)
        if (idx > -1) this.overIndex = idx
      }
    },
    onUp(e) {
      const t = e.changedTouches ? e.changedTouches[0] : e
      const wasDrag = this.dragIndex >= 0
      if (wasDrag && this.overIndex >= 0 && this.overIndex !== this.dragIndex) {
        this.drop(this.overIndex)
      }
      this.pressed = -1
      this.dragIndex = -1
      this.overIndex = -1
      this.detach()
      this.dropClone()
      document.body.style.userSelect = ''
    },
    detach() {
      window.removeEventListener('mousemove', this.onMove)
      window.removeEventListener('mouseup', this.onUp)
      window.removeEventListener('touchmove', this.onMove)
      window.removeEventListener('touchend', this.onUp)
      window.removeEventListener('touchcancel', this.onUp)
    },
    /* ---------- 悬浮镜像 ---------- */
    makeClone(i, x, y) {
      const item = this.$el && this.$el.querySelectorAll('.wd-sortable__item')[i]
      if (!item) return
      const r = item.getBoundingClientRect()
      const c = item.cloneNode(true)
      c.classList.add('wd-sortable__clone')
      c.style.width = r.width + 'px'
      c.style.height = r.height + 'px'
      document.body.appendChild(c)
      this.cloneEl = c
      this.moveClone(x, y)
    },
    moveClone(x, y) {
      if (!this.cloneEl) return
      const r = this.cloneEl.getBoundingClientRect()
      this.cloneEl.style.left = (x - r.width / 2) + 'px'
      this.cloneEl.style.top = (y - r.height / 2) + 'px'
    },
    dropClone() {
      if (this.cloneEl) {
        this.cloneEl.remove()
        this.cloneEl = null
      }
    },
    /* ---------- 落位 ---------- */
    drop(i) {
      const arr = this.modelValue.slice()
      const moved = arr.splice(this.dragIndex, 1)[0]
      arr.splice(i, 0, moved)
      this.$emit('update:modelValue', arr)
      this.$emit('change', arr)
    },
  },
  template: `
    <div class="wd-sortable">
      <transition-group name="wd-sort" tag="div" class="wd-sortable__list">
        <div v-for="(it, i) in modelValue" :key="keyOf(it, i)" class="wd-sortable__item"
          :class="{ 'wd-sortable__item--drag': dragIndex === i, 'wd-sortable__item--over': dragIndex >= 0 && overIndex === i && dragIndex !== i }"
          @mousedown.prevent="onDown(i, $event)"
          @touchstart.prevent="onDown(i, $event)">
          <span class="wd-sortable__handle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6"></circle><circle cx="15" cy="6" r="1.6"></circle><circle cx="9" cy="12" r="1.6"></circle><circle cx="15" cy="12" r="1.6"></circle><circle cx="9" cy="18" r="1.6"></circle><circle cx="15" cy="18" r="1.6"></circle></svg>
          </span>
          <span class="wd-sortable__label">{{ labelOf(it) }}</span>
        </div>
      </transition-group>
      <div v-if="dragIndex >= 0 && overIndex >= 0 && dragIndex !== overIndex"
        class="wd-sortable__drop-line" :style="{ top: lineTop + 'px' }"></div>
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
        <img v-if="src || list.length" :src="src || images[0]" :alt="alt" class="wd-image-preview__thumb" />
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
          <button v-if="images.length > 1" type="button" class="wd-icon-btn wd-icon-btn--ghost wd-preview__btn" @click="view(cur - 1)">‹</button>
          <button type="button" class="wd-icon-btn wd-icon-btn--ghost wd-preview__btn" @click="rotate = (rotate + 90) % 360">↻</button>
          <button type="button" class="wd-icon-btn wd-icon-btn--ghost wd-preview__btn" @click="zoom(-0.25)">−</button>
          <button type="button" class="wd-icon-btn wd-icon-btn--ghost wd-preview__btn" @click="zoom(0.25)">＋</button>
          <button type="button" class="wd-icon-btn wd-icon-btn--ghost wd-preview__btn" @click="resetView">1:1</button>
          <button v-if="images.length > 1" type="button" class="wd-icon-btn wd-icon-btn--ghost wd-preview__btn" @click="view(cur + 1)">›</button>
          <button type="button" class="wd-icon-btn wd-icon-btn--ghost wd-preview__btn" @click="open = false">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>
          </button>
        </div>
      </div>
    </transition>`,
}

/* WDesign — Explorer + FileList demo mirrors（详情/图标双视图 + 对齐修复） */

const WdFileList = {
  name: 'WdFileList',
  props: { items: { type: Array, default: () => [] } },
  emits: ['select'],
  data() {
    return { open: new Set() }
  },
  computed: {
    flatRows() {
      const out = []
      const walk = (nodes, depth, base) => {
        ;(nodes || []).forEach((n, i) => {
          const path = base + i + '/'
          out.push({ node: n, depth, path })
          if (n.type === 'folder' && this.open.has(path)) {
            walk(n.children || [], depth + 1, path)
          }
        })
      }
      walk(this.items, 0, '')
      return out
    },
  },
  methods: {
    isOpen(path) {
      return this.open.has(path)
    },
    onRow(row) {
      if (row.node.type === 'folder') {
        const s = new Set(this.open)
        if (s.has(row.path)) s.delete(row.path)
        else s.add(row.path)
        this.open = s
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
      <div v-for="row in flatRows" :key="row.path"
        class="wd-file-list__row"
        :class="'wd-file-list__row--' + (row.node.type || 'file')"
        :style="{ paddingLeft: (12 + row.depth * 20) + 'px' }"
        @click="onRow(row)">
        <span class="wd-file-list__chevron wd-chevron wd-chevron--right" :class="{ 'wd-chevron--open': isOpen(row.path) }">
          <svg v-if="row.node.type === 'folder'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>
        </span>
        <span class="wd-file-list__icon">
          <svg v-if="row.node.type === 'folder'" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"></path></svg>
          <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path></svg>
        </span>
        <span class="wd-file-list__name">{{ row.node.name }}</span>
        <span class="wd-file-list__size">{{ fmtSize(row.node.size) }}</span>
      </div>
    </div>`,
}

const WdExplorer = {
  name: 'WdExplorer',
  props: {
    folders: { type: Array, default: () => [] },
    view: { type: String, default: 'details' },
  },
  emits: ['select'],
  data() {
    return { active: 0, mode: this.view || 'details' }
  },
  computed: {
    current() {
      return this.folders[this.active] || { name: '', files: [] }
    },
  },
  methods: {
    onFile(f) {
      this.$emit('select', f)
    },
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
        <div class="wd-explorer__side-title">文件夹</div>
        <button v-for="(f, i) in folders" :key="i" type="button" class="wd-explorer__folder"
          :class="{ 'wd-explorer__folder--active': i === active }"
          @click="active = i">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8a3 3 0 0 1 3-3h2.6c.5 0 1 .2 1.4.6l1 1c.4.4.9.6 1.4.6H18a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"></path></svg>
          <span class="wd-explorer__folder-name">{{ f.name }}</span>
          <span class="wd-explorer__count">{{ f.files.length }}</span>
        </button>
      </div>
      <div class="wd-explorer__main">
        <div class="wd-explorer__bar">
          <div class="wd-explorer__path">
            <span class="wd-explorer__crumb" @click="active = 0">全部文件</span>
            <span class="wd-explorer__sep">/</span>
            <span class="wd-explorer__crumb wd-explorer__crumb--cur">{{ current.name }}</span>
          </div>
          <div class="wd-explorer__views">
            <button type="button" class="wd-explorer__view-btn"
              :class="{ 'wd-explorer__view-btn--active': mode === 'details' }"
              title="详情" @click="mode = 'details'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <button type="button" class="wd-explorer__view-btn"
              :class="{ 'wd-explorer__view-btn--active': mode === 'icons' }"
              title="图标" @click="mode = 'icons'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round">
                <rect x="4" y="4" width="6.5" height="6.5" rx="2"></rect>
                <rect x="13.5" y="4" width="6.5" height="6.5" rx="2"></rect>
                <rect x="4" y="13.5" width="6.5" height="6.5" rx="2"></rect>
                <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2"></rect>
              </svg>
            </button>
          </div>
        </div>

        <table v-if="mode === 'details'" class="wd-explorer__table">
          <colgroup><col /><col style="width:96px" /><col style="width:118px" /></colgroup>
          <thead><tr><th>名称</th><th class="is-num">大小</th><th class="is-num">修改时间</th></tr></thead>
          <tbody>
            <tr v-for="(f, i) in current.files" :key="i" @click="onFile(f)">
              <td>
                <span class="wd-explorer__name">
                  <span class="wd-explorer__file-chip">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path></svg>
                  </span>
                  <span class="wd-explorer__file-name">{{ f.name }}</span>
                </span>
              </td>
              <td class="is-num">{{ fmtSize(f.size) }}</td>
              <td class="is-num">{{ f.modified || '—' }}</td>
            </tr>
          </tbody>
        </table>

        <div v-else class="wd-explorer__grid">
          <button v-for="(f, i) in current.files" :key="i" type="button" class="wd-explorer__tile" @click="onFile(f)">
            <span class="wd-explorer__tile-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4a2 2 0 0 1 2-2h6.6L20 7.4V20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path></svg>
            </span>
            <span class="wd-explorer__tile-name">{{ f.name }}</span>
            <span class="wd-explorer__tile-size">{{ fmtSize(f.size) }}</span>
          </button>
          <div v-if="!current.files.length" class="wd-explorer__empty">此文件夹为空</div>
        </div>
      </div>
    </div>`,
}

/* WDesign — WdAiMessage demo mirror（reasoning_content 与 content 分离） */

const WdAiMessage = {
  name: 'WdAiMessage',
  props: {
    content: { type: String, default: '' },
    reasoning: { type: String, default: '' },
    self: Boolean,
    thinking: Boolean,
    streaming: Boolean,
    reasoningStreaming: Boolean,
    speed: { type: Number, default: 24 },
    actions: { type: Array, default: () => [] },
    defaultReasoningOpen: { type: Boolean, default: true },
  },
  emits: ['action', 'stream-end', 'reasoning-end'],
  data() {
    return {
      shown: this.content,
      shownReasoning: this.reasoning,
      reasoningOpen: this.defaultReasoningOpen,
      _ct: null,
      _rt: null,
    }
  },
  watch: {
    content(v) {
      if (!this.streaming) this.shown = v
    },
    reasoning(v) {
      if (!this.reasoningStreaming) this.shownReasoning = v
    },
    streaming: {
      immediate: true,
      handler(v) {
        if (v) this.startContent()
        else {
          this.stopContent()
          this.shown = this.content
        }
      },
    },
    reasoningStreaming: {
      immediate: true,
      handler(v) {
        if (v) this.startReasoning()
        else {
          this.stopReasoning()
          this.shownReasoning = this.reasoning
        }
      },
    },
  },
  beforeUnmount() {
    this.stopContent()
    this.stopReasoning()
  },
  methods: {
    stopContent() {
      if (this._ct) {
        clearInterval(this._ct)
        this._ct = null
      }
    },
    stopReasoning() {
      if (this._rt) {
        clearInterval(this._rt)
        this._rt = null
      }
    },
    startContent() {
      this.stopContent()
      this.shown = ''
      let i = 0
      this._ct = setInterval(() => {
        i += 1
        this.shown = this.content.slice(0, i)
        if (i >= this.content.length) {
          this.stopContent()
          this.$emit('stream-end')
        }
      }, Math.max(8, this.speed))
    },
    startReasoning() {
      this.stopReasoning()
      this.shownReasoning = ''
      let i = 0
      this._rt = setInterval(() => {
        i += 1
        this.shownReasoning = this.reasoning.slice(0, i)
        if (i >= this.reasoning.length) {
          this.stopReasoning()
          this.$emit('reasoning-end')
          if (this.defaultReasoningOpen) this.reasoningOpen = false
        }
      }, Math.max(8, this.speed))
    },
  },
  template: `
    <div class="wd-ai-msg" :class="{ 'wd-ai-msg--self': self }">
      <span class="wd-ai-msg__avatar">{{ self ? '我' : 'AI' }}</span>
      <div class="wd-ai-msg__bubble">
        <div v-if="thinking && !shownReasoning" class="wd-ai-msg__thinking">
          <i></i><i></i><i></i>深度思考中…
        </div>
        <div v-if="shownReasoning" class="wd-ai-msg__reasoning"
          :class="{ 'wd-ai-msg__reasoning--open': reasoningOpen }">
          <button type="button" class="wd-ai-msg__reasoning-head" @click="reasoningOpen = !reasoningOpen">
            <svg class="wd-ai-msg__reasoning-spark" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l1.9 5.2 5.3 1.9-5.3 1.9L12 16.7l-1.9-5.2-5.3-1.9 5.3-1.9z"></path></svg>
            <span class="wd-ai-msg__reasoning-title">深度思考</span>
            <span class="wd-ai-msg__reasoning-state">{{ reasoningStreaming ? '进行中' : '已完成' }}</span>
            <span class="wd-chevron" :class="{ 'wd-chevron--open': reasoningOpen }">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
            </span>
          </button>
          <div class="wd-ai-msg__reasoning-body">
            <div class="wd-ai-msg__reasoning-inner">
              <p class="wd-ai-msg__reasoning-text">{{ shownReasoning }}<span v-if="reasoningStreaming" class="wd-ai-msg__cursor">▍</span></p>
            </div>
          </div>
        </div>
        <p v-if="content || shown" class="wd-ai-msg__text">{{ shown }}<span v-if="streaming && shown.length < content.length" class="wd-ai-msg__cursor">▍</span></p>
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

// ── 布局容器 · 演示镜像 ──
const WdSpace = {
  name: 'WdSpace',
  props: {
    size: { type: [String, Number], default: 'md' },
    direction: { type: String, default: 'row' },
    wrap: { type: Boolean, default: false },
    between: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    grow: { type: Boolean, default: false },
  },
  computed: {
    gap() {
      if (typeof this.size === 'number') return this.size + 'px'
      return { sm: 'var(--wd-space-2)', md: 'var(--wd-space-3)', lg: 'var(--wd-space-6)' }[this.size]
    },
  },
  template: `
    <div class="wd-space"
      :class="{ 'wd-space--col': direction === 'col', 'wd-space--wrap': wrap,
                'wd-space--between': between, 'wd-space--center': center, 'wd-space--grow': grow }"
      :style="{ gap }"><slot></slot></div>`,
}
const WdGrid = {
  name: 'WdGrid',
  props: {
    columns: { type: [Number, String], default: 1 },
    gap: { type: String, default: 'md' },
    gutter: { type: Number, default: 0 },
  },
  computed: {
    cols() {
      if (this.columns === 'auto') return 'repeat(auto-fit, minmax(200px, 1fr))'
      return 'repeat(' + this.columns + ', 1fr)'
    },
    gapValue() {
      if (this.gutter) return this.gutter + 'px'
      return ({ sm: 8, md: 16, lg: 24 }[this.gap] || 16) + 'px'
    },
  },
  template: `<div class="wd-grid" :style="{ gridTemplateColumns: cols, gap: gapValue }"><slot></slot></div>`,
}
const WdContainer = {
  name: 'WdContainer',
  props: {
    maxWidth: { type: String, default: '1200px' },
    pad: { type: String, default: 'md' },
  },
  template: `
    <div class="wd-container"
      :style="{ maxWidth, paddingInline: { sm: 'var(--wd-space-3)', md: 'var(--wd-space-4)', lg: 'var(--wd-space-6)' }[pad] }">
      <slot></slot>
    </div>`,
}
window.WD_EXTRA_COMPONENTS = (window.WD_EXTRA_COMPONENTS || []).concat([WdSpace, WdGrid, WdContainer])
