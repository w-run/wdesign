/* =============================================================
 *  wdesign — demo components
 *  （与 src/components/*.vue 对应的运行时镜像，仅用于演示页；
 *    项目内请直接使用 SFC 组件）
 * ============================================================= */
const { createApp } = Vue

const WdButton = {
  name: 'WdButton',
  props: {
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    disabled: Boolean,
    iconOnly: Boolean,
    block: Boolean,
  },
  computed: {
    classes() {
      return [
        'wd-btn',
        'wd-btn--' + this.variant,
        'wd-btn--' + this.size,
        { 'wd-btn--icon': this.iconOnly, 'wd-btn--block': this.block },
      ]
    },
  },
  template: `<button :class="classes" type="button" :disabled="disabled"><slot></slot></button>`,
}

const WdTag = {
  name: 'WdTag',
  props: {
    variant: { type: String, default: 'tint' },
    dot: Boolean,
  },
  template: `<span class="wd-tag" :class="'wd-tag--' + variant"><i v-if="dot" class="wd-tag__dot"></i><slot></slot></span>`,
}

const WdCard = {
  name: 'WdCard',
  props: {
    variant: { type: String, default: 'default' },
    padding: { type: String, default: 'md' },
    hoverable: Boolean,
  },
  computed: {
    classes() {
      return [
        'wd-card',
        this.variant !== 'default' ? 'wd-card--' + this.variant : '',
        this.padding !== 'md' ? 'wd-card--pad-' + this.padding : '',
        this.hoverable ? 'wd-card--hoverable' : '',
      ]
    },
  },
  template: `<div :class="classes"><slot></slot></div>`,
}

const WdInput = {
  name: 'WdInput',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    shape: { type: String, default: 'pill' },
    type: { type: String, default: 'text' },
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  template: `
    <label class="wd-input" :class="{ 'wd-input--rounded': shape === 'rounded' }">
      <span v-if="$slots.icon" class="wd-input__icon"><slot name="icon"></slot></span>
      <input :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
             @input="$emit('update:modelValue', $event.target.value)" />
      <slot name="suffix"></slot>
    </label>`,
}

const WdSwitch = {
  name: 'WdSwitch',
  props: {
    modelValue: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  template: `
    <button type="button" role="switch" class="wd-switch" :class="{ 'wd-switch--off': !modelValue }"
            :aria-checked="modelValue" :disabled="disabled"
            @click="$emit('update:modelValue', !modelValue)">
      <span class="wd-switch__knob"></span>
    </button>`,
}

const WdProgress = {
  name: 'WdProgress',
  props: {
    value: { type: Number, default: 0 },
    thin: Boolean,
    onDark: Boolean,
  },
  computed: {
    percent() {
      return Math.max(0, Math.min(100, this.value))
    },
    classes() {
      return ['wd-progress', { 'wd-progress--thin': this.thin, 'wd-progress--on-dark': this.onDark }]
    },
  },
  template: `<div :class="classes" role="progressbar"><span class="wd-progress__bar" :style="{ width: percent + '%' }"></span></div>`,
}

const WdAvatar = {
  name: 'WdAvatar',
  props: {
    name: { type: String, default: '' },
    tone: { type: Number, default: 0 },
    dark: Boolean,
    size: { type: String, default: 'md' },
  },
  computed: {
    label() {
      const n = (this.name || '').trim()
      if (!n) return '?'
      return n.startsWith('+') ? n : n.charAt(0)
    },
    resolvedTone() {
      if (this.tone) return this.tone
      if (!this.name) return 0
      let hash = 0
      for (const ch of this.name) hash = (hash * 31 + ch.charCodeAt(0)) % 3
      return hash + 1
    },
    classes() {
      return [
        'wd-avatar',
        this.resolvedTone ? 'wd-avatar--tone-' + this.resolvedTone : '',
        this.dark ? 'wd-avatar--dark' : '',
        this.size === 'sm' ? 'wd-avatar--sm' : '',
      ]
    },
  },
  template: `<span :class="classes">{{ label }}</span>`,
}

const WdAvatarGroup = {
  name: 'WdAvatarGroup',
  components: { WdAvatar },
  props: {
    names: { type: Array, default: () => [] },
    max: { type: Number, default: 3 },
  },
  computed: {
    shown() {
      return this.names.slice(0, this.max)
    },
    rest() {
      return Math.max(0, this.names.length - this.max)
    },
  },
  template: `
    <span class="wd-avatars">
      <wd-avatar v-for="(name, i) in shown" :key="i" :name="name"></wd-avatar>
      <wd-avatar v-if="rest" :name="'+' + rest" dark></wd-avatar>
    </span>`,
}

const WdListItem = {
  name: 'WdListItem',
  props: {
    title: String,
    meta: String,
    clickable: { type: Boolean, default: true },
  },
  emits: ['click'],
  template: `
    <div class="wd-list-item" :class="{ 'wd-list-item--clickable': clickable }"
         @click="clickable && $emit('click', $event)">
      <span v-if="$slots.icon" class="wd-list-item__icon"><slot name="icon"></slot></span>
      <span class="wd-list-item__title">{{ title }}</span>
      <span v-if="meta" class="wd-list-item__meta">{{ meta }}</span>
      <slot name="extra"></slot>
    </div>`,
}

const WdIcon = {
  name: 'WdIcon',
  props: {
    name: { type: String, required: true },
    variant: { type: String, default: 'outlined' },
    size: { type: [Number, String], default: 24 },
    filled: Boolean,
  },
  computed: {
    svg() {
      const wanted = this.filled ? 'filled' : this.variant
      const order = wanted === 'filled' ? ['filled', 'outlined'] : ['outlined', 'filled']
      const map = window.WD_ICONS || {}
      for (const st of order) {
        const svg = map[st + '/' + this.name]
        if (svg) return svg
      }
      return ''
    },
    sizePx() {
      return typeof this.size === 'number' ? this.size + 'px' : this.size
    },
  },
  template: `<span class="wd-icon" :style="{ width: sizePx, height: sizePx }" v-html="svg"></span>`,
}

const app = createApp({
  data() {
    return {
      search: '',
      name: '林小满',
      on: true,
      wall: window.WD_ICON_WALL || [],
      iconCount: window.WD_ICON_COUNT || 0,
      agree: false,
      plan: '专业版',
      sortBy: '最近更新',
      tab: '概览',
      modalOpen: false,
      date: '',
      page: 3,
      volume: 56,
      menu: [
        { label: '编辑', value: 'edit' },
        { label: '复制', value: 'copy' },
        { label: '归档', value: 'archive', disabled: true },
        { label: '删除', value: 'delete', danger: true },
      ],
      stepItems: [
        { title: '创建', desc: '10-08' },
        { title: '构建', desc: '10-09' },
        { title: '部署', desc: '待执行' },
      ],
      crumbItems: [
        { label: '全部项目', value: 'root' },
        { label: 'wdesign', value: 'wdesign' },
        { label: 'components', value: 'components' },
      ],
      tableCols: [
        { key: 'name', title: '仓库' },
        { key: 'lang', title: '语言' },
        { key: 'stars', title: 'Stars', align: 'right' },
        { key: 'status', title: '状态' },
      ],
      tableRows: [
        { name: 'wdesign', lang: 'TypeScript', stars: 128, status: 'active' },
        { name: 'wdesign-icons', lang: 'SVG', stars: 56, status: 'active' },
        { name: 'legacy-ui', lang: 'Vue', stars: 3, status: 'archived' },
      ],
      collapseItems: [
        { title: '外观设置', content: '主题色、字体与圆角都通过 CSS 变量统一控制。' },
        { title: '通知设置', content: '可以选择接收哪些提醒，以及静默时段。' },
        { title: '危险操作', content: '包含清空数据、删除项目等不可逆操作。' },
      ],
      openItems: [0],
      rateVal: 4,
      drawerOpen: false,
      files: [
        { name: '季度汇报.pdf', size: '12 MB' },
        { name: '品牌规范.fig', size: '94 MB' },
        { name: '页面设计稿.png', size: '10 MB' },
      ],
    }
  },
  methods: {
    onMenu(v) {
      window.WD_TOAST.info('选择：' + v)
    },
    onCrumb(v) {
      window.WD_TOAST.info('跳转：' + v)
    },
    pop(type) {
      const names = { info: '信息', success: '成功', warning: '警告', danger: '危险' }
      window.WD_TOAST[type]('这是一条' + names[type] + '提示')
    },
  },
})

for (const c of [WdIcon, WdButton, WdTag, WdCard, WdInput, WdSwitch, WdProgress, WdAvatar, WdAvatarGroup, WdListItem]) {
  app.component(c.name, c)
}

;(window.WD_EXTRA_COMPONENTS || []).forEach((c) => app.component(c.name, c))

app.mount('#app')
