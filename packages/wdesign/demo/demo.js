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

/**
 * 图标预热：
 * icons.data.js 提供的是**同步**的 window.WD_ICONS，直接灌进注册表缓存，
 * 之后 WdIcon 全部走同步路径 —— 首帧就有图标，不会出现"先空后闪"。
 * 真实项目里若图标是异步 chunk，则改用 `await preloadIcons([...])` 后再 mount。
 */
if (window.WD_ICONS && window.WdIcons && window.WdIcons.injectIcons) {
  window.WdIcons.injectIcons(window.WD_ICONS)
}

const app = createApp({
  data() {
    return {
      popSeg: '全部',
      danmakuOn: true,
      otp2: '',
      otp3: '',
      /*
       * 彩虹序列：与 src/styles/_rainbow.scss 的 10 个色相一一对应。
       * red 就是主题红本身，green 是 #0DBC79（两个锚点色）。
       */
      rainbowColors: [
        { name: 'red',    label: '红' },
        { name: 'orange', label: '橙' },
        { name: 'amber',  label: '琥珀' },
        { name: 'lime',   label: '黄绿' },
        { name: 'green',  label: '绿' },
        { name: 'teal',   label: '青' },
        { name: 'blue',   label: '蓝' },
        { name: 'indigo', label: '靛' },
        { name: 'violet', label: '紫' },
        { name: 'pink',   label: '粉' },
      ],
      navTopActive: 'guide',
      navTopItems: [
        { key: 'guide', label: '指南' },
        { key: 'components', label: '组件' },
        { key: 'tokens', label: '令牌' },
        { key: 'icons', label: '图标' },
        { key: 'changelog', label: '更新', dot: true },
      ],
      navSideActive: 'dashboard',
      navCollapsed: false,
      navSideItems: [
        { key: 'dashboard', label: '概览', icon: 'layout-dashboard', group: '主导航' },
        { key: 'calendar', label: '日程', icon: 'calendar', group: '主导航' },
        { key: 'projects', label: '项目', icon: 'folder', group: '主导航' },
        { key: 'clients', label: '客户', icon: 'user-group', group: '主导航', dot: true },
        { key: 'files', label: '文件', icon: 'file', group: '资源' },
        { key: 'settings', label: '设置', icon: 'settings', group: '资源' },
      ],
      navIconActive: 'chart',
      navIconItems: [
        { key: 'chart', label: '概览', icon: 'layout-dashboard' },
        { key: 'calendar', label: '日程', icon: 'calendar' },
        { key: 'folder', label: '项目', icon: 'folder' },
        { key: 'users', label: '客户', icon: 'user-group', dot: true },
        { key: 'gear', label: '设置', icon: 'settings' },
      ],
      tlItems: [
        { period: '2026 Q4', title: '设计系统 v2', desc: '令牌层重构，dark 主题优先级修正', icon: 'star', active: true },
        { period: '2026 Q3', title: '组件扩充', desc: '从 49 个到 73 个，覆盖表单/数据/反馈' },
        { period: '2026 Q2', title: '构建体系', desc: '常驻构建服务 + 内容指纹 + 冒烟测试' },
      ],
      tlHorizontal: [
        { period: '周一', title: '需求评审' },
        { period: '周二', title: '技术方案' },
        { period: '周三', title: '开发' },
        { period: '周四', title: '联调' },
        { period: '周五', title: '上线' },
      ],
      tlColored: [
        { period: '10:02', title: '构建开始', color: '#3B82F6', icon: 'check' },
        { period: '10:14', title: '测试通过', color: '#4CAF50', icon: 'check' },
        { period: '10:20', title: '部署中', color: '#F2A93B', active: true },
        { period: '—', title: '等待审批', color: '#D62839', disabled: true },
      ],
      tlCollapsible: [
        { period: 'v1.0', title: '首个版本', desc: '基础组件 20 个', detail: '包含按钮、输入框、卡片、标签等基础组件，确立了无边框设计语言。' },
        { period: 'v1.4', title: '视觉成熟度', desc: '对比度与令牌修复', detail: '修复了 41 处红色文字对比度不足、锚点面令牌族缺口、说明文字过浅等问题。' },
        { period: 'v2.0', title: '当前', desc: '73 个组件', detail: '新增图表、编辑器、高级数据展示等组件，建立完整的测试与构建体系。' },
      ],
      treeCols: [
        { key: 'name', title: '名称', width: '240px' },
        { key: 'type', title: '类型', width: '120px' },
        { key: 'size', title: '体积', width: '100px', align: 'right' },
      ],
      treeRows: [
        { id: 's', name: 'src/components', type: '目录', size: '—', children: [
          { id: 's1', name: 'form', type: '目录', size: '—', children: [
            { id: 's1a', name: 'WdInput.vue', type: '组件', size: '4.2 KB' },
            { id: 's1b', name: 'WdSelect.vue', type: '组件', size: '8.1 KB' },
          ]},
          { id: 's2', name: 'data', type: '目录', size: '—', children: [
            { id: 's2a', name: 'WdTable.vue', type: '组件', size: '15.6 KB' },
            { id: 's2b', name: 'WdTree.vue', type: '组件', size: '9.3 KB' },
          ]},
        ]},
        { id: 'p', name: 'package.json', type: '文件', size: '1.1 KB' },
      ],
      expCols: [
        { key: 'name', title: '构建任务', width: '180px' },
        { key: 'status', title: '状态', width: '110px' },
        { key: 'time', title: '耗时', width: '100px', align: 'right' },
      ],
      expRows: [
        { id: 1, name: 'check:tokens', status: '通过', time: '0.2s', detail: '校验 111 个令牌，无未定义变量引用。' },
        { id: 2, name: 'build:demo', status: '通过', time: '12.4s', detail: '编译 73 个组件与 62 个样式文件。' },
        { id: 3, name: 'test:smoke', status: '通过', time: '3.1s', detail: '381 项断言全部通过。' },
      ],
      fixedCols: [
        { key: 'id', title: '编号', width: '90px', fixed: 'left' },
        { key: 'name', title: '组件名', width: '150px', fixed: 'left' },
        { key: 'desc', title: '说明', width: '320px' },
        { key: 'author', title: '负责人', width: '120px' },
        { key: 'updated', title: '更新时间', width: '140px' },
      ],
      fixedRows: Array.from({length:8},(_,i)=>({
        id: 'C' + String(i+1).padStart(3,'0'),
        name: ['WdButton','WdInput','WdTable','WdSelect','WdModal','WdTree','WdCard','WdTag'][i],
        desc: '组件说明文字，横向滚动时可以对比首列是否固定',
        author: ['林小满','陈一鸣','苏哲','周未'][i%4],
        updated: '2026-10-' + String(10+i).padStart(2,'0'),
      })),
      pickColor: '#D62839',
      pickColor2: '#3B82F6',
      mentionText: '',
      mentionUsers: [
        { id: 1, label: '林小满', desc: '设计' },
        { id: 2, label: '陈一鸣', desc: '前端' },
        { id: 3, label: '苏哲', desc: '后端' },
        { id: 4, label: '周未', desc: '产品' },
        { id: 5, label: '何川', desc: '测试' },
        { id: 6, label: '李维', desc: '运维' },
      ],
      calDate: '',
      calDate2: '',
      splitRatio: 50,
      cascVal: ['zj', 'hz', 'xh'],
      cascOptions: [
        { value: 'zj', label: '浙江', children: [
          { value: 'hz', label: '杭州', children: [
            { value: 'xh', label: '西湖区' },
            { value: 'sc', label: '上城区' },
            { value: 'bj', label: '滨江区' },
          ]},
          { value: 'nb', label: '宁波', children: [
            { value: 'hs', label: '海曙区' },
            { value: 'yz', label: '鄞州区' },
          ]},
        ]},
        { value: 'js', label: '江苏', children: [
          { value: 'nj', label: '南京', children: [
            { value: 'gl', label: '鼓楼区' },
            { value: 'xw', label: '玄武区' },
          ]},
          { value: 'sz', label: '苏州', children: [
            { value: 'gs', label: '姑苏区' },
          ]},
        ]},
      ],
      transferVal: [2, 4],
      transferData: [
        { key: 1, label: '林小满', desc: '设计' },
        { key: 2, label: '陈一鸣', desc: '前端' },
        { key: 3, label: '苏哲', desc: '后端' },
        { key: 4, label: '周未', desc: '产品' },
        { key: 5, label: '何川', desc: '测试' },
        { key: 6, label: '李维', desc: '运维' },
        { key: 7, label: '吴笛', desc: '数据' },
        { key: 8, label: '郑安', desc: '安全', disabled: true },
        { key: 9, label: '孙禾', desc: '算法' },
        { key: 10, label: '钱七', desc: '运营' },
      ],
      mdSample: `# 组件说明

**WdMarkdown** 用内置解析器渲染，不引第三方库。

## 支持的语法

- 标题、段落、**加粗**、*斜体*、~~删除线~~
- 行内代码 \`const a = 1\`
- 有序 / 无序列表、引用、分割线
- 表格与链接

> 所有文本都经过 escapeHtml，可直接渲染 AI 输出。

| 能力 | 状态 |
|:---|---:|
| 零依赖 | 是 |
| 安全转义 | 是 |

\`\`\`js
import { WdMarkdown } from '@w-run/wdesign'
\`\`\``,
      // 直接用 window.WDtoast：它是 Object.assign 出来的，带 .success/.warning 等属性方法。
      // 用包装函数会把属性方法丢掉（toast.success 变成 undefined）。
      toast: window.WDtoast || ((msg) => console.log(msg)),
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
      grpSearch: '', grpUrl: '', grpQ: '', grpTerm: '', grpMd: '', grpSm: '', grpLg: '',
      grpKind: '标题', grpMsg: '',
      ucLog: '',
      liveErr: '',
      channelIdx: 0,
      channels: ['CCTV-1', 'CCTV-2', 'CCTV-13'],
      quality: '1080P',
      danmaku: true,
      currentEp: 2,
      episodes: Array.from({ length: 24 }, (_, i) => ({
        key: i + 1,
        label: '第 ' + (i + 1) + ' 集',
        tag: i === 0 ? '免费' : i >= 20 ? 'VIP' : '',
      })),
      // 稳定的伪随机波形（固定种子，避免每次渲染抖动）
      waveform: Array.from({ length: 64 }, (_, i) => {
        const v = Math.abs(Math.sin(i * 0.7) * 0.6 + Math.sin(i * 0.23) * 0.4);
        return 0.18 + v * 0.82;
      }),
      vlistItems: Array.from({ length: 10000 }, (_, i) => ({
        id: i,
        name: '记录 ' + String(i + 1).padStart(5, '0'),
        meta: ['待处理', '进行中', '已完成'][i % 3] + ' · ' + ((i * 37) % 100) + '%',
      })),
      vlistRendered: 0,
      cmdOpen: false,
      cmdPicked: '',
      cmdItems: [
        { key: 'new-file', label: '新建文件', group: '文件', icon: 'file', shortcut: '⌘N' },
        { key: 'new-folder', label: '新建文件夹', group: '文件', icon: 'folder' },
        { key: 'open', label: '打开…', group: '文件', icon: 'folder-open', shortcut: '⌘O' },
        { key: 'save', label: '保存', group: '文件', icon: 'save', shortcut: '⌘S' },
        { key: 'delete', label: '删除', group: '编辑', icon: 'trash', hint: '不可撤销', keywords: ['remove', 'del'] },
        { key: 'undo', label: '撤销', group: '编辑', icon: 'undo', shortcut: '⌘Z', keywords: ['undo'] },
        { key: 'redo', label: '重做', group: '编辑', icon: 'redo', shortcut: '⇧⌘Z' },
        { key: 'theme', label: '切换主题', group: '视图', icon: 'palette', keywords: ['dark', 'light'] },
        { key: 'side', label: '切换侧边栏', group: '视图', icon: 'sidebar', shortcut: '⌘B' },
        { key: 'legacy', label: '旧版导出（已停用）', group: '视图', icon: 'clock', disabled: true },
      ],
      descItems: [
        { label: '订单号', value: 'WD-20261017-0042' },
        { label: '状态', value: '已发货' },
        { label: '下单时间', value: '2026-10-17 09:32' },
        { label: '客户', value: '林小满' },
        { label: '联系电话', value: '138****6621' },
        { label: '收货地址', value: '浙江省杭州市余杭区未来科技城 8 号楼', span: 1 },
        { label: '金额', value: '¥ 1,286.00' },
        { label: '支付方式', value: '微信支付' },
        { label: '备注', value: '工作日送达，请提前电话联系', span: 1 },
      ],
      descSpanItems: [
        { label: '项目名', value: 'WDesign' },
        { label: '版本', value: 'v1.4.2' },
        { label: '许可证', value: 'MIT' },
        { label: '技术栈', value: '', key: 'tags', span: 3 },
        { label: '仓库', value: 'github.com/w-run/wdesign', span: 2 },
        { label: '星标', value: '1.2k' },
      ],
      treeSelected: 'App.vue',
      treeExpanded: ['src', 'components'],
      treeChecked: ['components'],
      treeNodes: [
        { key: 'src', label: 'src', children: [
          { key: 'App.vue', label: 'App.vue' },
          { key: 'main.ts', label: 'main.ts' },
          { key: 'components', label: 'components', children: [
            { key: 'WdButton.vue', label: 'WdButton.vue' },
            { key: 'WdTree.vue', label: 'WdTree.vue' },
            { key: 'WdCommand.vue', label: 'WdCommand.vue' },
          ] },
          { key: 'styles', label: 'styles', children: [
            { key: '_tokens.scss', label: '_tokens.scss' },
            { key: '_vars.scss', label: '_vars.scss' },
          ] },
        ] },
        { key: 'package.json', label: 'package.json' },
        { key: 'README.md', label: 'README.md' },
        { key: 'legacy', label: 'legacy（只读）', disabled: true },
      ],

      statValue: 86400,
      lastAction: '',
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
      stepOpen: [0],
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
  mounted() {
    this.$nextTick(() => {
      this.syncVlistCount()
      const el = this.$refs.vlist?.$el
      if (el) el.addEventListener('scroll', () => this.syncVlistCount(), { passive: true })
    })
  },
  computed: {
    channel() { return this.channels[this.channelIdx] },
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
    bumpStat() {
      this.statValue += 1000
    },
    onDeleted() { this.lastAction = '已确认删除（危险操作）' },
    onPublished() { this.lastAction = '已确认发布' },
    onTreeCheck(node, checked) {
      console.log('check', node.label, checked)
    },
    onCmdPick(it) { this.cmdPicked = it.label },
    jumpVlist(i, align) {
      this.$refs.vlist?.scrollToIndex(i, align || 'start')
    },
    vlistTop() {
      this.$refs.vlist?.scrollToTop()
    },
    /** 统计虚拟列表实际渲染了多少个 DOM 行 */
    syncVlistCount() {
      const el = this.$refs.vlist?.$el || this.$refs.vlist
      const n = el?.querySelectorAll('.wd-vlist__item').length || 0
      if (n !== this.vlistRendered) this.vlistRendered = n
    },
    onChangeEp(ep, i) { this.currentEp = ep.key },
    grpSubmit() { this.grpMsg = '搜索：' + (this.grpSearch || '(空)') },
    uncontrolledLog(v) {
      this.ucLog = typeof v === 'boolean' ? (v ? '开' : '关') : String(v)
    },
    switchChannel() {
      this.channelIdx = (this.channelIdx + 1) % this.channels.length
      this.liveErr = ''
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
  for (const c of REAL.ALL) {
    if (!c || !c.name) continue
    app.component(c.name, c)
    /*
     * 别名：kebab 标签 -> Vue 的解析流程是
     *   <wd-qrcode>  →  camelize  →  'wdQrcode'  →  capitalize  →  'WdQrcode'
     * 而组件名是 `WdQRCode`（中间 QR 连续大写），两者对不上就渲染不出来。
     *
     * 这里按 Vue 的实际算法反推：把组件名转成 kebab，再转回来，
     * 得到 Vue 会查找的那个名字，然后注册成别名。
     */
    const kebab = c.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    const asVueResolves = kebab.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase())
      .replace(/^./, (ch) => ch.toUpperCase())
    if (asVueResolves !== c.name) app.component(asVueResolves, c)
  }
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

/* =============================================================
 *  彩虹点缀：按文档顺序给每个面板标题的小横线分配色相
 *
 *  这是"闯入色彩"的正确用法 —— 纯装饰、无语义，
 *  只为在黑白灰版面里提供视觉节奏与分区坐标。
 * ============================================================= */
;(function paintPanelAccents() {
  const CYCLE = [
    'red', 'orange', 'amber', 'lime', 'green',
    'teal', 'blue', 'indigo', 'violet', 'pink',
  ]
  function paint() {
    const panels = document.querySelectorAll('.demo-panel')
    panels.forEach((p, i) => {
      p.style.setProperty('--panel-accent', `var(--wd-rainbow-${CYCLE[i % CYCLE.length]})`)
    })
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint)
  } else {
    paint()
  }
  // Vue 挂载后 DOM 会重建一次，再补一遍
  window.addEventListener('load', paint)
  setTimeout(paint, 300)
})()
