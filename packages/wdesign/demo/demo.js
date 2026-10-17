/* =============================================================
 *  wdesign — demo components
 *  （与 src/components/*.vue 对应的运行时镜像，仅用于演示页；
 *    项目内请直接使用 SFC 组件）
 * ============================================================= */
const { createApp } = Vue

const WdButton = {
  name: 'WdButton',
  emits: ['click'],
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
  template: `<button data-wd-hover :class="classes" type="button" :disabled="disabled" @click="$emit('click', $event)"><slot></slot></button>`,
}

const WdTag = {
  name: 'WdTag',
  props: {
    variant: { type: String, default: 'tint' },
    dot: Boolean,
    size: { type: String, default: 'md' },
  },
  template: `<span class="wd-tag" data-wd-hover :class="['wd-tag--' + variant, { 'wd-tag--lg': size === 'lg', 'wd-tag--sm': size === 'sm' }]"><i v-if="dot" class="wd-tag__dot"></i><slot></slot></span>`,
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
  template: `<div :class="classes" data-wd-hover><slot></slot></div>`,
}

const WdInput = {
  name: 'WdInput',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    shape: { type: String, default: 'pill' },
    type: { type: String, default: 'text' },
    disabled: Boolean,
    size: { type: String, default: 'md' },
  },
  emits: ['update:modelValue'],
  template: `
    <label class="wd-input" :class="{ 'wd-input--rounded': shape === 'rounded', 'wd-input--lg': size === 'lg', 'wd-input--sm': size === 'sm' }">
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
    <div class="wd-list-item" data-wd-hover :class="{ 'wd-list-item--clickable': clickable }"
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
    factor() {
      // 光学补偿（与 wdesign-icons/src/optical.js 同源规则）
      const TALL = window.__WD_OPTICAL_TALL
      if (!TALL) return 1
      if (TALL.has(this.name)) return 1.14
      const ink = (window.__WD_INK || {})[this.name]
      if (ink !== undefined && ink < 0.13) return 1.08
      if (ink !== undefined && ink > 0.55) return 0.97
      return 1
    },
    sizePx() {
      const base = typeof this.size === 'number' ? this.size : parseFloat(this.size) || 24
      const px = Math.round(base * this.factor * 100) / 100
      return px + 'px'
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
      dropPick: '',
      tab2: '标签一',
      editableTabs: [
        { label: '标签一', value: '标签一' },
        { label: '标签二', value: '标签二' },
        { label: '固定', value: '固定', closable: false },
      ],
      page2: 5,
      page3: 12,
      tableSel: [],
      tableLoading: false,
      city: '',
      cityOptions: ['北京','上海','广州','深圳','杭州','成都','武汉','西安','南京','重庆'],
      tagsPick: ['Vue'],
      skillOptions: ['Vue','React','TypeScript','SCSS','Node.js','Design','Rust','Go'],
      btnLoading: false,
      kw: '',
      bio: '',
      formModel: { name: '', email: '', role: '', agree: false },
      formRules: {
        name: [
          { required: true, message: '请填写姓名' },
          { min: 2, max: 12, message: '姓名需 2–12 个字符' },
        ],
        email: [
          { required: true, message: '请填写邮箱' },
          { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式不正确' },
        ],
        role: [{ required: true, message: '请选择角色' }],
        agree: [
          { validator: (v) => (v === true ? true : '请先同意条款'), message: '请先同意条款' },
        ],
      },

      email: '',
      pwd: '',
      sliderFine: 3.5,
      rate10: 7,
      collapseOpen: [0],
      collapseItems: [
        { title: '常见问题', content: '这里是回答内容。' },
        { title: '更新日志', content: 'v1.4 修复了若干视觉问题。' },
        { title: '联系方式', content: 'dev@w-run.net' },
      ],
      timelineItems: [
        { period: '10-08', title: '创建仓库', desc: '初始化 WDesign 设计系统' },
        { period: '10-12', title: '发布 v1.0', desc: '46 个组件全部就绪' },
        { period: '10-17', title: '视觉迭代', desc: '对比度修复、图标光学归一' },
      ],
      manyTags: ['全部','设计','前端','后端','运维','产品','测试','数据','安全','文档'],
      segVal3: '全部',
      segVal4: '全部',
      drawerRight: false,
      drawerLeft: false,
      modalWide: false,
      previewSrc: '',
      previewList: [],

      sliderVal: 56,
      rate: 3,
      otp: '',
      drawer: false,
      sortItems: [
        { id: 1, label: '设计规范' },
        { id: 2, label: '组件清单' },
        { id: 3, label: '发布计划' },
      ],
      fileNodes: [
        { name: 'src', type: 'folder', children: [
          { name: 'components', type: 'folder', children: [
            { name: 'WdButton.vue', type: 'file', size: 1229 },
            { name: 'WdCard.vue', type: 'file', size: 876 },
          ] },
          { name: 'index.scss', type: 'file', size: 3482 },
        ] },
        { name: 'README.md', type: 'file', size: 5120 },
      ],
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
        { key: 'name', title: '仓库', sortable: true },
        { key: 'lang', title: '语言' },
        { key: 'stars', title: 'Stars', align: 'right', sortable: true },
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
      segVal: '月',
      segVal2: '列表',
      noticeOpen: false,
      noticeTitle: '',
      noticeDesc: '',
      noticeVariant: 'info',
      dark: false,
      carouselItems: [
        { src: 'images/dark.jpg', alt: '深色模式预览' },
        { src: 'images/components.jpg', alt: '扩展组件' },
        { src: 'images/markdown.jpg', alt: 'Markdown 样式' },
      ],
      previewList: ['images/dark.jpg', 'images/components.jpg', 'images/markdown.jpg'],
      sortableItems: ['接口文档', '视觉规范', '组件库', '图标库', '字体包'],
      otpVal: '',
      fileTree: [
        { name: 'src', type: 'folder', children: [
          { name: 'components', type: 'folder', children: [
            { name: 'WdButton.vue', type: 'file', size: 712 },
            { name: 'WdTable.vue', type: 'file', size: 2834 },
          ]},
          { name: 'styles', type: 'folder', children: [
            { name: 'tokens.scss', type: 'file', size: 4312 },
          ]},
          { name: 'index.ts', type: 'file', size: 312 },
        ]},
        { name: 'README.md', type: 'file', size: 9563 },
        { name: 'LICENSE', type: 'file', size: 1064 },
      ],
      explorerFolders: [
        { name: '设计', files: [ { name: '规范页.html', size: 28332, modified: '今天 09:12' }, { name: '设计摘要.md', size: 4152, modified: '昨天 18:40' }, { name: '字体方案.txt', size: 642, modified: '10-09' } ] },
        { name: '代码', files: [ { name: 'wdesign.ts', size: 1342, modified: '今天 08:03' }, { name: 'tokens.json', size: 3408, modified: '昨天 21:15' }, { name: 'package.json', size: 670, modified: '10-11' } ] },
        { name: '图片', files: [ { name: 'preview-dark.png', size: 398000, modified: '今天 10:02' }, { name: 'preview-light.png', size: 374000, modified: '今天 10:02' } ] },
      ],
      aiText: '这是 WDesign 的第 42 次发布：\n\n1. 深色主题包已上线（data-theme=\"dark\"）\n2. 分段控制改为平滑滑块\n3. Toast 调整为半透明浮层\n\n后续还有：图片预览、AI 消息、资源管理器。\n感谢使用。',
      aiReasoning: '1. 检查 38 个组件的 token 使用情况 → 无硬编码\n2. 分段控制暗色轨道与滑块配色统一\n3. AI 消息的思考链与正文分离展示\n4. 输出：本轮无破坏性变更，可放心升级。',
      aiStreaming: false,
      aiThinking: true,
      aiActions: [
        { label: '重试', variant: 'tint' },
        { label: '复制' },
        { label: '停止生成', variant: 'ghost' },
      ],
      files: [
        { name: '季度汇报.pdf', size: '12 MB' },
        { name: '品牌规范.fig', size: '94 MB' },
        { name: '页面设计稿.png', size: '10 MB' },
      ],
    }
  },
  methods: {
    closeTab(v) {
      const i = this.editableTabs.findIndex(t => t.value === v)
      if (i < 0) return
      this.editableTabs.splice(i, 1)
      if (this.tab2 === v && this.editableTabs.length) {
        this.tab2 = this.editableTabs[Math.max(0, i - 1)].value
      }
    },
    addTab() {
      const n = this.editableTabs.length + 1
      const label = '新标签 ' + n
      this.editableTabs.push({ label, value: label })
      this.tab2 = label
    },
    toggleTableLoading() {
      this.tableLoading = true
      setTimeout(() => { this.tableLoading = false }, 1600)
    },
    fakeSubmit() {
      this.btnLoading = true
      setTimeout(() => { this.btnLoading = false }, 1500)
    },
    onFormSubmit(model) {
      this.formSubmitted = JSON.stringify(model)
      this.$nextTick(() => {
        if (window.WD_TOAST) window.WD_TOAST.success('校验通过，已提交')
      })
    },
    onMenu(v) {
      window.WD_TOAST.info('选择：' + v)
    },
    onCrumb(v) {
      window.WD_TOAST.info('跳转：' + v)
    },
    notice(v) {
      const map = {
        success: { t: '构建完成', d: 'wdesign v1.5.0 打包成功，用时 42s。', v: 'success' },
        warning: { t: '存储将满', d: '剩余空间不足 10%，请及时清理。', v: 'warning' },
        danger: { t: '同步失败', d: '无法连接远程仓库，请检查网络。', v: 'danger' },
      }
      const m = map[v]
      this.noticeTitle = m.t
      this.noticeDesc = m.d
      this.noticeVariant = m.v
      this.noticeOpen = true
    },
    toggleDark() {
      this.dark = !this.dark
      document.documentElement.setAttribute('data-theme', this.dark ? 'dark' : 'light')
      document.documentElement.style.colorScheme = this.dark ? 'dark' : 'light'
      window.WD_TOAST.info(this.dark ? '已切换深色模式' : '已切换浅色模式')
    },
    startAi() {
      this.resetAi()
      this.aiThinking = true
      this.aiReasoningStreaming = true
      const ms = (this.aiReasoning || '').length * 40 + 400
      clearTimeout(this._aiTimer)
      this._aiTimer = setTimeout(() => {
        this.aiReasoningStreaming = false
        this.aiThinking = false
        this.aiStreaming = true
      }, ms)
    },
    resetAi() {
      clearTimeout(this._aiTimer)
      this.aiReasoningStreaming = false
      this.aiThinking = true
      this.aiStreaming = false
    },
    onAiAction(label) {
      window.WD_TOAST.info('AI 操作：' + label)
    },
    onFileSelect(f) {
      window.WD_TOAST.info('打开文件：' + f.name)
    },
    onExplorerSelect(f) {
      window.WD_TOAST.info('选中：' + f.name)
    },
    pop(type) {
      const names = { info: '信息', success: '成功', warning: '警告', danger: '危险' }
      window.WD_TOAST[type]('这是一条' + names[type] + '提示')
    },
  },
})

// 优先注册**真实组件**（components.js，由 src/components/*.vue 编译而来）；
// 镜像只在真实组件缺失时兜底 —— 镜像漏了 props 会让人误以为组件本身坏了。
const REAL = window.WD_REAL || { ALL: [] }
if (REAL.ALL.length) {
  for (const c of REAL.ALL) if (c && c.name) app.component(c.name, c)
  console.log('[demo] 真实组件', REAL.ALL.length, '个')
} else {
  for (const c of [WdIcon, WdButton, WdTag, WdCard, WdInput, WdSwitch, WdProgress, WdAvatar, WdAvatarGroup, WdListItem]) {
    app.component(c.name, c)
  }
  ;(window.WD_EXTRA_COMPONENTS || []).forEach((c) => app.component(c.name, c))
  console.warn('[demo] 未找到 components.js，回退到镜像组件')
}

window.__WD_APP__ = app
app.mount('#app')

// ---- 悬停状态增强（与库内 src/hover.ts 同源逻辑，此处内联以便离线演示）----
;(function addHoverDemo() {
  var CLASS = 'is-hover', SEL = '[data-wd-hover], .wd-hoverable'
  var useHover = window.matchMedia('(hover: hover)').matches
  var cur = null, timer = null, scrollTimer = null, scrolling = false
  function clear(el) {
    var node = el || cur
    if (node) node.classList.remove(CLASS)
    if (node === cur) cur = null
  }
  function clearAll() {
    document.querySelectorAll('.' + CLASS).forEach(function (n) { n.classList.remove(CLASS) })
    cur = null
  }
  document.addEventListener('pointerover', function (e) {
    if (!useHover || scrolling || e.pointerType === 'touch') return
    var el = e.target && e.target.closest && e.target.closest(SEL)
    if (!el || el === cur || (cur && cur.contains(el))) return
    clear(); cur = el; el.classList.add(CLASS)
  }, { passive: true })
  document.addEventListener('pointerout', function (e) {
    if (!useHover) return
    var el = e.target && e.target.closest && e.target.closest(SEL)
    if (!el) return
    var to = e.relatedTarget
    if (to && el.contains(to)) return
    clear(el)
  }, { passive: true })
  document.addEventListener('pointerdown', function (e) {
    if (useHover || e.pointerType !== 'touch') return
    var el = e.target && e.target.closest && e.target.closest(SEL)
    if (!el) return
    clear(); cur = el; el.classList.add(CLASS)
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () { clear(el) }, 120)
  }, { passive: true })
  window.addEventListener('scroll', function () {
    scrolling = true; clearAll()
    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(function () { scrolling = false }, 160)
  }, { passive: true, capture: true })
  window.addEventListener('blur', clearAll)
  window.__wdAddHover = function () { return function stop() { clearAll() } }
})()

