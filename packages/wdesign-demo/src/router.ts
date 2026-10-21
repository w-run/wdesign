import type { RouteRecordRaw } from "vue-router";

/**
 * 路由表：每个组件一个页面。
 *
 * meta 决定侧栏索引的分类与排序：
 *   group  分类名（侧栏分组标题）
 *   title  显示名（组件名，不含 Wd 前缀）
 *   order  组内排序，数字小的靠前
 *   covers 该页覆盖的组件（变体合并时用，如 Avatar + AvatarGroup）
 *
 * ⚠️ 路由与页面文件必须成对出现，否则侧栏点进去是空白页。
 */
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("./pages/home/index.vue"),
    meta: { title: "首页" },
  },

  /* ---------- 基础 ---------- */
  {
    path: "/button",
    name: "button",
    component: () => import("./pages/button/index.vue"),
    meta: { group: "基础", title: "Button", order: 1, covers: ["WdButton"] },
  },
  {
    path: "/tag",
    name: "tag",
    component: () => import("./pages/tag/index.vue"),
    meta: { group: "基础", title: "Tag", order: 2, covers: ["WdTag"] },
  },
  {
    path: "/badge",
    name: "badge",
    component: () => import("./pages/badge/index.vue"),
    meta: { group: "基础", title: "Badge", order: 3, covers: ["WdBadge"] },
  },
  {
    path: "/avatar",
    name: "avatar",
    component: () => import("./pages/avatar/index.vue"),
    meta: {
      group: "基础",
      title: "Avatar",
      order: 4,
      covers: ["WdAvatar", "WdAvatarGroup"],
    },
  },
  {
    path: "/divider",
    name: "divider",
    component: () => import("./pages/divider/index.vue"),
    meta: { group: "基础", title: "Divider", order: 5, covers: ["WdDivider"] },
  },
  {
    path: "/space",
    name: "space",
    component: () => import("./pages/space/index.vue"),
    meta: { group: "基础", title: "Space", order: 6, covers: ["WdSpace"] },
  },
  {
    path: "/grid",
    name: "grid",
    component: () => import("./pages/grid/index.vue"),
    meta: { group: "基础", title: "Grid", order: 7, covers: ["WdGrid"] },
  },
  {
    path: "/container",
    name: "container",
    component: () => import("./pages/container/index.vue"),
    meta: { group: "基础", title: "Container", order: 8, covers: ["WdContainer"] },
  },
  {
    path: "/card",
    name: "card",
    component: () => import("./pages/card/index.vue"),
    meta: { group: "基础", title: "Card", order: 9, covers: ["WdCard"] },
  },
  {
    path: "/group",
    name: "group",
    component: () => import("./pages/group/index.vue"),
    meta: { group: "基础", title: "Group", order: 10, covers: ["WdGroup"] },
  },

  /* ---------- 表单 ---------- */
  {
    path: "/input",
    name: "input",
    component: () => import("./pages/input/index.vue"),
    meta: { group: "表单", title: "Input", order: 1, covers: ["WdInput"] },
  },
  {
    path: "/select",
    name: "select",
    component: () => import("./pages/select/index.vue"),
    meta: { group: "表单", title: "Select", order: 2, covers: ["WdSelect"] },
  },
  {
    path: "/cascader",
    name: "cascader",
    component: () => import("./pages/cascader/index.vue"),
    meta: { group: "表单", title: "Cascader", order: 3, covers: ["WdCascader"] },
  },
  {
    path: "/checkbox",
    name: "checkbox",
    component: () => import("./pages/checkbox/index.vue"),
    meta: { group: "表单", title: "Checkbox", order: 4, covers: ["WdCheckbox"] },
  },
  {
    path: "/switch",
    name: "switch",
    component: () => import("./pages/switch/index.vue"),
    meta: { group: "表单", title: "Switch", order: 5, covers: ["WdSwitch"] },
  },
  {
    path: "/radio",
    name: "radio",
    component: () => import("./pages/radio/index.vue"),
    meta: { group: "表单", title: "RadioGroup", order: 6, covers: ["WdRadioGroup"] },
  },
  {
    path: "/segmented",
    name: "segmented",
    component: () => import("./pages/segmented/index.vue"),
    meta: { group: "表单", title: "Segmented", order: 7, covers: ["WdSegmented"] },
  },
  {
    path: "/slider",
    name: "slider",
    component: () => import("./pages/slider/index.vue"),
    meta: { group: "表单", title: "Slider", order: 8, covers: ["WdSlider"] },
  },
  {
    path: "/rate",
    name: "rate",
    component: () => import("./pages/rate/index.vue"),
    meta: { group: "表单", title: "Rate", order: 9, covers: ["WdRate"] },
  },
  {
    path: "/color-picker",
    name: "color-picker",
    component: () => import("./pages/color-picker/index.vue"),
    meta: { group: "表单", title: "ColorPicker", order: 10, covers: ["WdColorPicker"] },
  },
  {
    path: "/otp",
    name: "otp",
    component: () => import("./pages/otp/index.vue"),
    meta: { group: "表单", title: "Otp", order: 11, covers: ["WdOtp"] },
  },
  {
    path: "/mentions",
    name: "mentions",
    component: () => import("./pages/mentions/index.vue"),
    meta: { group: "表单", title: "Mentions", order: 12, covers: ["WdMentions"] },
  },
  {
    path: "/upload",
    name: "upload",
    component: () => import("./pages/upload/index.vue"),
    meta: { group: "表单", title: "Upload", order: 13, covers: ["WdUpload"] },
  },
  {
    path: "/transfer",
    name: "transfer",
    component: () => import("./pages/transfer/index.vue"),
    meta: { group: "表单", title: "Transfer", order: 14, covers: ["WdTransfer"] },
  },
  {
    path: "/form",
    name: "form",
    component: () => import("./pages/form/index.vue"),
    meta: {
      group: "表单",
      title: "Form",
      order: 15,
      covers: ["WdForm", "WdFormItem"],
    },
  },
  {
    path: "/date-picker",
    name: "date-picker",
    component: () => import("./pages/date-picker/index.vue"),
    meta: { group: "表单", title: "DatePicker", order: 16, covers: ["WdDatePicker"] },
  },
  {
    path: "/time-picker",
    name: "time-picker",
    component: () => import("./pages/time-picker/index.vue"),
    meta: { group: "表单", title: "TimePicker", order: 17, covers: ["WdTimePicker"] },
  },
  {
    path: "/datetime-picker",
    name: "datetime-picker",
    component: () => import("./pages/datetime-picker/index.vue"),
    meta: {
      group: "表单",
      title: "DateTimePicker",
      order: 18,
      covers: ["WdDateTimePicker"],
    },
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("./pages/calendar/index.vue"),
    meta: { group: "表单", title: "Calendar", order: 19, covers: ["WdCalendar"] },
  },
  {
    path: "/sortable-list",
    name: "sortable-list",
    component: () => import("./pages/sortable-list/index.vue"),
    meta: {
      group: "表单",
      title: "SortableList",
      order: 20,
      covers: ["WdSortableList"],
    },
  },

  /* ---------- 数据展示 ---------- */
  {
    path: "/table",
    name: "table",
    component: () => import("./pages/table/index.vue"),
    meta: { group: "数据展示", title: "Table", order: 1, covers: ["WdTable"] },
  },
  {
    path: "/tree",
    name: "tree",
    component: () => import("./pages/tree/index.vue"),
    meta: { group: "数据展示", title: "Tree", order: 2, covers: ["WdTree"] },
  },
  {
    path: "/virtual-list",
    name: "virtual-list",
    component: () => import("./pages/virtual-list/index.vue"),
    meta: {
      group: "数据展示",
      title: "VirtualList",
      order: 3,
      covers: ["WdVirtualList"],
    },
  },
  {
    path: "/pagination",
    name: "pagination",
    component: () => import("./pages/pagination/index.vue"),
    meta: { group: "数据展示", title: "Pagination", order: 4, covers: ["WdPagination"] },
  },
  {
    path: "/descriptions",
    name: "descriptions",
    component: () => import("./pages/descriptions/index.vue"),
    meta: {
      group: "数据展示",
      title: "Descriptions",
      order: 5,
      covers: ["WdDescriptions"],
    },
  },
  {
    path: "/statistic",
    name: "statistic",
    component: () => import("./pages/statistic/index.vue"),
    meta: { group: "数据展示", title: "Statistic", order: 6, covers: ["WdStatistic"] },
  },
  {
    path: "/timeline",
    name: "timeline",
    component: () => import("./pages/timeline/index.vue"),
    meta: { group: "数据展示", title: "Timeline", order: 7, covers: ["WdTimeline"] },
  },
  {
    path: "/collapse",
    name: "collapse",
    component: () => import("./pages/collapse/index.vue"),
    meta: { group: "数据展示", title: "Collapse", order: 8, covers: ["WdCollapse"] },
  },
  {
    path: "/tabs",
    name: "tabs",
    component: () => import("./pages/tabs/index.vue"),
    meta: { group: "数据展示", title: "Tabs", order: 9, covers: ["WdTabs"] },
  },
  {
    path: "/tab-bar",
    name: "tab-bar",
    component: () => import("./pages/tab-bar/index.vue"),
    meta: { group: "数据展示", title: "TabBar", order: 10, covers: ["WdTabBar"] },
  },
  {
    path: "/steps",
    name: "steps",
    component: () => import("./pages/steps/index.vue"),
    meta: { group: "数据展示", title: "Steps", order: 10, covers: ["WdSteps"] },
  },
  {
    path: "/progress",
    name: "progress",
    component: () => import("./pages/progress/index.vue"),
    meta: { group: "数据展示", title: "Progress", order: 11, covers: ["WdProgress"] },
  },
  {
    path: "/skeleton",
    name: "skeleton",
    component: () => import("./pages/skeleton/index.vue"),
    meta: { group: "数据展示", title: "Skeleton", order: 12, covers: ["WdSkeleton"] },
  },
  {
    path: "/empty",
    name: "empty",
    component: () => import("./pages/empty/index.vue"),
    meta: { group: "数据展示", title: "Empty", order: 13, covers: ["WdEmpty"] },
  },
  {
    path: "/result",
    name: "result",
    component: () => import("./pages/result/index.vue"),
    meta: { group: "数据展示", title: "Result", order: 14, covers: ["WdResult"] },
  },
  {
    path: "/explorer",
    name: "explorer",
    component: () => import("./pages/explorer/index.vue"),
    meta: { group: "数据展示", title: "Explorer", order: 15, covers: ["WdExplorer"] },
  },
  {
    path: "/file-list",
    name: "file-list",
    component: () => import("./pages/file-list/index.vue"),
    meta: { group: "数据展示", title: "FileList", order: 16, covers: ["WdFileList"] },
  },
  {
    path: "/scrollbar",
    name: "scrollbar",
    component: () => import("./pages/scrollbar/index.vue"),
    meta: { group: "数据展示", title: "Scrollbar", order: 17, covers: ["WdScrollbar"] },
  },
  {
    path: "/splitter",
    name: "splitter",
    component: () => import("./pages/splitter/index.vue"),
    meta: { group: "数据展示", title: "Splitter", order: 18, covers: ["WdSplitter"] },
  },

  /* ---------- 反馈 ---------- */
  {
    path: "/alert",
    name: "alert",
    component: () => import("./pages/alert/index.vue"),
    meta: { group: "反馈", title: "Alert", order: 1, covers: ["WdAlert"] },
  },
  {
    path: "/modal",
    name: "modal",
    component: () => import("./pages/modal/index.vue"),
    meta: { group: "反馈", title: "Modal", order: 2, covers: ["WdModal"] },
  },
  {
    path: "/drawer",
    name: "drawer",
    component: () => import("./pages/drawer/index.vue"),
    meta: { group: "反馈", title: "Drawer", order: 3, covers: ["WdDrawer"] },
  },
  {
    path: "/notification",
    name: "notification",
    component: () => import("./pages/notification/index.vue"),
    meta: { group: "反馈", title: "Notification", order: 4, covers: ["WdNotification"] },
  },
  {
    path: "/toast",
    name: "toast",
    component: () => import("./pages/toast/index.vue"),
    meta: { group: "反馈", title: "Toast", order: 5, covers: ["toast()"] },
  },
  {
    path: "/popconfirm",
    name: "popconfirm",
    component: () => import("./pages/popconfirm/index.vue"),
    meta: { group: "反馈", title: "Popconfirm", order: 6, covers: ["WdPopconfirm"] },
  },
  {
    path: "/popover",
    name: "popover",
    component: () => import("./pages/popover/index.vue"),
    meta: { group: "反馈", title: "Popover", order: 7, covers: ["WdPopover"] },
  },
  {
    path: "/tooltip",
    name: "tooltip",
    component: () => import("./pages/tooltip/index.vue"),
    meta: { group: "反馈", title: "Tooltip", order: 8, covers: ["WdTooltip"] },
  },
  {
    path: "/dropdown",
    name: "dropdown",
    component: () => import("./pages/dropdown/index.vue"),
    meta: { group: "反馈", title: "Dropdown", order: 9, covers: ["WdDropdown"] },
  },
  {
    path: "/spinner",
    name: "spinner",
    component: () => import("./pages/spinner/index.vue"),
    meta: { group: "反馈", title: "Spinner", order: 10, covers: ["WdSpinner"] },
  },

  /* ---------- 导航 ---------- */
  {
    path: "/nav",
    name: "nav",
    component: () => import("./pages/nav/index.vue"),
    meta: { group: "导航", title: "Nav", order: 1, covers: ["WdNav"] },
  },
  {
    path: "/breadcrumb",
    name: "breadcrumb",
    component: () => import("./pages/breadcrumb/index.vue"),
    meta: { group: "导航", title: "Breadcrumb", order: 2, covers: ["WdBreadcrumb"] },
  },
  {
    path: "/command",
    name: "command",
    component: () => import("./pages/command/index.vue"),
    meta: { group: "导航", title: "Command", order: 3, covers: ["WdCommand"] },
  },
  {
    path: "/affix",
    name: "affix",
    component: () => import("./pages/affix/index.vue"),
    meta: { group: "导航", title: "Affix", order: 4, covers: ["WdAffix"] },
  },
  {
    path: "/backtop",
    name: "backtop",
    component: () => import("./pages/backtop/index.vue"),
    meta: { group: "导航", title: "Backtop", order: 5, covers: ["WdBacktop"] },
  },

  /* ---------- 媒体 ---------- */
  {
    path: "/carousel",
    name: "carousel",
    component: () => import("./pages/carousel/index.vue"),
    meta: { group: "媒体", title: "Carousel", order: 1, covers: ["WdCarousel"] },
  },
  {
    path: "/image-preview",
    name: "image-preview",
    component: () => import("./pages/image-preview/index.vue"),
    meta: {
      group: "媒体",
      title: "ImagePreview",
      order: 2,
      covers: ["WdImagePreview"],
    },
  },
  {
    path: "/audio-player",
    name: "audio-player",
    component: () => import("./pages/audio-player/index.vue"),
    meta: { group: "媒体", title: "AudioPlayer", order: 3, covers: ["WdAudioPlayer"] },
  },
  {
    path: "/video-player",
    name: "video-player",
    component: () => import("./pages/video-player/index.vue"),
    meta: { group: "媒体", title: "VideoPlayer", order: 4, covers: ["WdVideoPlayer"] },
  },
  {
    path: "/danmaku",
    name: "danmaku",
    component: () => import("./pages/danmaku/index.vue"),
    meta: { group: "媒体", title: "Danmaku", order: 5, covers: ["WdDanmaku"] },
  },
  {
    path: "/media-card",
    name: "media-card",
    component: () => import("./pages/media-card/index.vue"),
    meta: { group: "媒体", title: "MediaCard", order: 6, covers: ["WdMediaCard"] },
  },

  /* ---------- 内容 ---------- */
  {
    path: "/markdown",
    name: "markdown",
    component: () => import("./pages/markdown/index.vue"),
    meta: { group: "内容", title: "Markdown", order: 1, covers: ["WdMarkdown"] },
  },
  {
    path: "/post-item",
    name: "post-item",
    component: () => import("./pages/post-item/index.vue"),
    meta: { group: "内容", title: "PostItem", order: 2, covers: ["WdPostItem"] },
  },
  {
    path: "/list-item",
    name: "list-item",
    component: () => import("./pages/list-item/index.vue"),
    meta: { group: "内容", title: "ListItem", order: 3, covers: ["WdListItem"] },
  },
  {
    path: "/ai-message",
    name: "ai-message",
    component: () => import("./pages/ai-message/index.vue"),
    meta: { group: "内容", title: "AiMessage", order: 4, covers: ["WdAiMessage"] },
  },

  /* ---------- 其他 ---------- */
  {
    path: "/qrcode",
    name: "qrcode",
    component: () => import("./pages/qrcode/index.vue"),
    meta: { group: "其他", title: "QRCode", order: 1, covers: ["WdQRCode"] },
  },
  {
    path: "/watermark",
    name: "watermark",
    component: () => import("./pages/watermark/index.vue"),
    meta: { group: "其他", title: "Watermark", order: 2, covers: ["WdWatermark"] },
  },
];
