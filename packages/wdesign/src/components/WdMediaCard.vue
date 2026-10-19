<script setup lang="ts">
import { computed, ref } from 'vue'

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
     * 媒体与内容的关系：
     *   overlay — 内容压在图上（图片作背景，底部渐变压暗）
     *   stacked — 图在上、内容在下（内容区为白底）
     */
    layout?: 'overlay' | 'stacked'
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
    collapsible: false,
    defaultOpen: true,
    ratio: '4 / 3',
    radius: 'xl',
  },
)

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
</script>

<template>
  <article
    class="wd-media-card"
    :class="[
      `wd-media-card--${layout}`,
      `wd-media-card--r-${radius}`,
      {
        'is-open': open,
        'is-collapsible': collapsible,
        'has-media': !!src,
      },
    ]"
  >
    <!-- ===== 媒体层 ===== -->
    <div v-if="src" class="wd-media-card__media" :style="{ aspectRatio: ratio }">
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

      <!-- overlay 形态：标题压在图上 -->
      <div v-if="isOverlay && (title || subtitle)" class="wd-media-card__headline">
        <h3 v-if="title" class="wd-media-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="wd-media-card__subtitle">{{ subtitle }}</p>
      </div>
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
        (!isOverlay && (title || subtitle || $slots['headline-extra'])) ||
        stats.length ||
        body ||
        $slots.default ||
        action ||
        collapsible
      "
      class="wd-media-card__body"
    >
      <!-- stacked 形态：标题在媒体下方 -->
      <div
        v-if="!isOverlay && (title || subtitle || $slots['headline-extra'])"
        class="wd-media-card__headline wd-media-card__headline--static"
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

      <!-- 可展开区域：正文 + 插槽 -->
      <div
        v-show="!collapsible || open"
        v-if="body || $slots.default"
        class="wd-media-card__expand"
      >
        <p v-if="body" class="wd-media-card__text">{{ body }}</p>
        <slot />
      </div>

      <!-- 底部：CTA + 折叠箭头 -->
      <div v-if="action || collapsible" class="wd-media-card__foot">
        <button
          v-if="action"
          type="button"
          class="wd-media-card__cta"
          @click="emit('action')"
        >
          {{ action }}
        </button>
        <button
          v-if="collapsible"
          type="button"
          class="wd-media-card__toggle"
          :aria-expanded="open"
          :aria-label="open ? '收起' : '展开'"
          @click="toggle"
        >
          <wd-icon :name="open ? 'chevron-up' : 'chevron-down'" :size="16" />
        </button>
      </div>
    </div>
  </article>
</template>
