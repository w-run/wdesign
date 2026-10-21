<script setup lang="ts">
defineOptions({ name: 'WdTag' })

withDefaults(
  defineProps<{
    /**
     * 视觉风格。
     *
     * ⚠️ 语义分工（避免"红=出错"和"红=话题"撞在一起）：
     *   · `tint`  主题淡红 —— **话题 / 分类**（#设计 #前端），不是状态
     *   · `success` 绿 / `warning` 琥珀 / `gray` 中性 —— **状态**
     *   · `danger` 红 —— 只用于"失败 / 已封禁"这类真危险状态
     *   · `dark`  深色实底 —— 强调元信息（置顶、官方）
     */
    variant?: 'tint' | 'success' | 'warning' | 'gray' | 'danger' | 'dark'
    /** 尺寸档：sm | md | lg，不传为默认 md */
    size?: 'lg' | 'md' | 'sm'
    /** 前置状态圆点（颜色跟随 variant） */
    dot?: boolean
    /**
     * 无底色版本：只留同色圆点和彩色文字。
     * 用在密集表格 / 列表的"状态列" —— 一列 20 行都铺色块会花，
     * 点 + 彩字已经够扫读（参考 fintech / 文件管理器那批界面都是这么做的）。
     */
    plain?: boolean
  }>(),
  { variant: 'tint', dot: false, plain: false },
)
</script>

<template>
  <span
    class="wd-tag"
    data-wd-hover
    :class="[
      `wd-tag--${variant}`,
      { 'wd-tag--lg': size === 'lg', 'wd-tag--sm': size === 'sm', 'wd-tag--plain': plain },
    ]"
  >
    <i v-if="dot" class="wd-tag__dot"></i>
    <slot />
  </span>
</template>
