<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

defineOptions({ name: 'WdMediaCard' })

export interface MediaCardStat {
  /** 主数值，如 "130 kg" / "4h 45m" */
  value: string
  /** 说明文字，如 "Weight" / "Duration" */
  label: string
}

const props = withDefaults(
  defineProps<{
    /** 媒体地址（图片 / 视频首帧） */
    src?: string
    /** 媒体替代文本 */
    alt?: string
    /** 主标题 */
    title?: string
    /** 副标题 / 分类 */
    subtitle?: string
    /** 右上角标签（如 "Last Seen: 1 hour ago"） */
    badge?: string
    /** 数据条：2~4 组最佳，超过 4 组会挤 */
    stats?: MediaCardStat[]
    /** 正文段落（展开后显示） */
    body?: string
    /** 主按钮文字 */
    action?: string
    /**
     * 内容与媒体的关系：
     *   overlay — 内容压在图上（底部渐变压暗）
     *   stacked — 图在上、内容在下（内容区独立）
     */
    layout?: 'overlay' | 'stacked'
    /**
     * 媒体呈现方式（**与 layout 正交**，任意组合）：
     *   cover — 图片铺满、圆角由卡片裁切（视觉冲击强）
     *   inset — 图片内嵌、四周留白 + 独立圆角 + 投影（精致感）
     *
     * ⚠️ 之前我把它和 layout 绑死了（overlay→铺满、stacked→内嵌），
     *    但两者其实是**独立的两个维度**：
     *      "内容压图上 + 图片内嵌"  是完全合理的组合（浮层卡片）
     *      "内容在图下 + 图片铺满"  也合理（大图卡片）
     *    绑在一起会让人以为 layout 决定了图片样式。
     */
    mediaMode?: 'cover' | 'inset'
    /**
     * 可折叠：点击箭头收起/展开内容区。
     * overlay 形态下折叠后只剩媒体 + 标题。
     */
    collapsible?: boolean
    /** 初始是否展开（collapsible 时生效） */
    defaultOpen?: boolean
    /** 媒体宽高比 */
    ratio?: string
    /** 圆角档位 */
    radius?: 'md' | 'lg' | 'xl'
  }>(),
  {
    src: '',
    alt: '',
    title: '',
    subtitle: '',
    badge: '',
    stats: () => [],
    body: '',
    action: '',
    layout: 'overlay',
    mediaMode: 'cover',
    collapsible: false,
    defaultOpen: true,
    ratio: '4 / 3',
    radius: 'xl',
  },
)

const slots = useSlots()

const emit = defineEmits<{
  action: []
  'update:open': [value: boolean]
}>()

/**
 * 展开状态。
 *
 * ⚠️ 不用 max-height 过渡做显隐 ——
 *    在动画时钟停摆的环境里会卡在 0（元素永久不可见）。
 *    展开/收起只由 v-show 控制，过渡只作用于内部元素的位移。
 */
const open = ref(props.defaultOpen)

function toggle() {
  open.value = !open.value
  emit('update:open', open.value)
}

const isOverlay = computed(() => props.layout === 'overlay')

/**
 * 是否有"可折叠的内容"。
 *
 * ⚠️ 只看 collapsible 不够：如果组件没有正文/插槽，
 *    展开/收起是空操作 —— 箭头不仅无用，还会让用户点了没反应。
 *    必须同时存在 collapsible 和实际内容才显示箭头。
 */
const canCollapse = computed(() => props.collapsible && (!!props.body || !!slots.default))

/**
 * 图片上是否有文字覆盖。
 *
 * 只有 overlay 布局才有内容压在图上。
 * 没有文字覆盖时，图片只是一张"配图"，不需要投影 ——
 * 加阴影会让它显得"莫名其妙地浮起来"。
 */
const hasTextOnMedia = computed(() => isOverlay.value && !!(props.title || props.subtitle || props.badge))
</script>

<template>
  <article
    class="wd-media-card"
    :class="[
      `wd-media-card--${layout}`,
      `wd-media-card--media-${mediaMode}`,
      `wd-media-card--r-${radius}`,
      {
        'is-open': open,
        'is-collapsible': collapsible,
        'has-media': !!src,
      },
    ]"
  >
    <!-- ===== 媒体层 ===== -->
    <div
      v-if="src"
      class="wd-media-card__media"
      :class="{ 'has-text': hasTextOnMedia }"
      :style="{ aspectRatio: ratio }"
    >
      <img :src="src" :alt="alt || title" class="wd-media-card__img" loading="lazy" />
      <!-- 渐变压暗：保证压在图上的文字可读 -->
      <div class="wd-media-card__scrim" aria-hidden="true"></div>

      <!-- 顶部角标与插槽（收藏 / 定位等操作） -->
      <!--
        ⚠️ 每个可选区块都要连**容器一起** v-if，
        不能只判断内部文本 —— 空 div 仍会吃掉 padding 与 flex 间距。
      -->
      <div v-if="badge || $slots.tools" class="wd-media-card__top">
        <span v-if="badge" class="wd-media-card__badge">{{ badge }}</span>
        <div v-if="$slots.tools" class="wd-media-card__tools">
          <slot name="tools" />
        </div>
      </div>

      <!--
        ⚠️ overlay 的标题**不在这里** —— 它由 body 统一渲染。
        否则会出现两份标题（媒体层里的 + body 里的）。
        媒体层只负责图片、scrim、角标和工具按钮。
      -->
    </div>

    <!--
      内容层：只有在**确实有内容**时才渲染。
      逐一列出所有可能的内容来源，任一存在就渲染：
        · 标题/副标题（仅 stacked，overlay 的标题在媒体层里）
        · headline-extra 插槽
        · 数据条
        · 正文 / 默认插槽
        · CTA 按钮
        · 折叠箭头
      ⚠️ 不能写成 `!isOverlay || ...` ——
         stacked 且所有内容都为空时，那个 `!isOverlay` 会让空容器照样渲染。
    -->
    <div
      v-if="
        (title || subtitle || $slots['headline-extra']) ||
        stats.length ||
        body ||
        $slots.default ||
        action ||
        collapsible
      "
      class="wd-media-card__body"
    >
      <!-- 标题：overlay 和 stacked 都在这里渲染（位置由 CSS 决定） -->
      <div
        v-if="title || subtitle || $slots['headline-extra']"
        class="wd-media-card__headline wd-media-card__headline--static"
        :class="{ 'wd-media-card__headline--overlay': isOverlay }"
      >
        <h3 v-if="title" class="wd-media-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="wd-media-card__subtitle">{{ subtitle }}</p>
        <slot name="headline-extra" />
      </div>

      <!-- 数据条：顶部细分隔线 + 等分 -->
      <dl v-if="stats.length" class="wd-media-card__stats">
        <div v-for="(s, i) in stats" :key="i" class="wd-media-card__stat">
          <dt class="wd-media-card__stat-value">{{ s.value }}</dt>
          <dd class="wd-media-card__stat-label">{{ s.label }}</dd>
        </div>
      </dl>

      <!--
        可展开区域：正文 + 插槽。
        折叠动画沿用 WdCollapse 的 `grid-template-rows: 0fr → 1fr` ——
        这是目前唯一**不依赖固定高度**的纯 CSS 折叠方案：
          · max-height 需要猜一个足够大的值，短内容会"跳"
          · height 需要 JS 测量
        0fr/1fr 由内容自然撑开，任意长度的正文都平滑。
      -->
      <div
        v-if="body || $slots.default"
        class="wd-media-card__expand"
        :class="{ 'is-open': !collapsible || open }"
      >
        <div class="wd-media-card__expand-inner">
          <p v-if="body" class="wd-media-card__text">{{ body }}</p>
          <slot />
        </div>
      </div>

      <!-- 主按钮：占满整行 -->
      <button
        v-if="action"
        type="button"
        class="wd-media-card__cta"
        @click="emit('action')"
      >
        {{ action }}
      </button>

      <!--
        折叠箭头：**独立成行、底部居中**（参考图的做法）。
        ⚠️ 之前和 CTA 并排挤在右侧 —— 那是"工具栏"的布局，
          而展开/收起是卡片的**全局动作**，应该独立、居中、易点。
      -->
      <!--
        折叠箭头：只在**真的有内容可展开**时显示。
        只有标题/数据条、没有正文的卡片不该有箭头 —— 点了什么都不会发生。
      -->
      <div v-if="canCollapse" class="wd-media-card__foot">
        <button
          type="button"
          class="wd-media-card__toggle"
          :aria-expanded="open"
          :aria-label="open ? '收起' : '展开'"
          @click="toggle"
        >
          <wd-icon :name="open ? 'chevron-up' : 'chevron-down'" :size="18" />
        </button>
      </div>
    </div>
  </article>
</template>
