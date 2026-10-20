<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'WdWatermark' })

const props = withDefaults(
  defineProps<{
    /** 水印文字（多行用数组） */
    text?: string | string[]
    /** 图片水印（与 text 二选一，优先 image） */
    image?: string
    /** 字号 */
    fontSize?: number
    /** 文字颜色（带透明度） */
    color?: string
    /** 单个水印格子的间距 */
    gap?: number
    /** 旋转角度（度） */
    rotate?: number
    /** 距离容器边缘的偏移，避免水印被裁 */
    offset?: number
    /** 水印层层级，低于弹窗等浮层才不会盖住内容 */
    zIndex?: number
  }>(),
  {
    text: '',
    image: '',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.08)',
    gap: 80,
    rotate: -22,
    offset: 12,
    zIndex: 9,
  },
)

const root = ref<HTMLElement | null>(null)
const bg = ref('')

/**
 * 用 Canvas 生成一张水印图，再作为 background-image 平铺。
 *
 * 为什么不用 DOM 铺满文字：
 *   · 格子数量 = 宽高/间距，大容器下会生成上千个节点
 *   · 每个节点都要参与布局与重绘，滚动时明显掉帧
 * Canvas 只生成一张图，浏览器平铺由合成层完成，几乎零成本。
 */
function render() {
  if (typeof document === 'undefined') return
  const el = root.value
  if (!el) return
  const w = el.clientWidth
  const h = el.clientHeight
  if (w === 0 || h === 0) return

  const lines = Array.isArray(props.text) ? props.text : props.text ? [props.text] : []
  if (!props.image && lines.length === 0) { bg.value = ''; return }

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const gap = Math.max(20, props.gap)
  const fs = Math.max(8, props.fontSize)

  /*
   * 单个格子尺寸要容纳最长的文字行（旋转后对角占用更大）。
   * 用 sqrt(2) 近似旋转后的外接矩形，否则长文字会被相邻格子截断。
   */
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let cellW: number
  let cellH: number
  let draw: (c: CanvasRenderingContext2D, cx: number, cy: number) => void

  if (props.image) {
    // 图片水印：异步加载，先用文字占位避免闪烁
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const size = gap
      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = size + 'px'
      canvas.style.height = size + 'px'
      ctx.scale(dpr, dpr)
      ctx.globalAlpha = 0.15
      ctx.drawImage(img, 0, 0, size, size)
      bg.value = canvas.toDataURL('image/png')
    }
    img.src = props.image
    return
  }

  ctx.font = `600 ${fs}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  const maxLineW = Math.max(...lines.map((l) => ctx.measureText(l).width))
  const lineH = fs * 1.5
  const blockW = maxLineW
  const blockH = lineH * lines.length

  const rot = (Math.abs(props.rotate) * Math.PI) / 180
  const cos = Math.cos(rot)
  const sin = Math.sin(rot)
  cellW = Math.ceil(blockW * cos + blockH * sin) + gap
  cellH = Math.ceil(blockW * sin + blockH * cos) + gap

  canvas.width = cellW * dpr
  canvas.height = cellH * dpr
  canvas.style.width = cellW + 'px'
  canvas.style.height = cellH + 'px'

  ctx.scale(dpr, dpr)
  ctx.translate(cellW / 2, cellH / 2)
  ctx.rotate((props.rotate * Math.PI) / 180)
  ctx.fillStyle = props.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `600 ${fs}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

  const startY = -blockH / 2 + lineH / 2
  lines.forEach((line, i) => {
    ctx.fillText(line, 0, startY + i * lineH)
  })

  bg.value = canvas.toDataURL('image/png')
}

let ro: ResizeObserver | null = null
let timer = 0

function scheduleRender() {
  clearTimeout(timer)
  // 尺寸变化可能连续触发，防抖 60ms —— canvas 重绘比 DOM 贵
  timer = window.setTimeout(render, 60)
}

onMounted(() => {
  render()
  if (typeof ResizeObserver !== 'undefined' && root.value) {
    ro = new ResizeObserver(() => scheduleRender())
    ro.observe(root.value)
  }
})

watch(
  () => [props.text, props.image, props.fontSize, props.color, props.gap, props.rotate],
  () => scheduleRender(),
  { deep: true },
)

onBeforeUnmount(() => {
  ro?.disconnect()
  clearTimeout(timer)
})

const bgStyle = computed(() => {
  if (!bg.value) return {}
  return {
    backgroundImage: `url(${bg.value})`,
    backgroundRepeat: 'repeat',
    backgroundPosition: `${props.offset}px ${props.offset}px`,
    zIndex: String(props.zIndex),
  }
})
</script>

<template>
  <div ref="root" class="wd-watermark">
    <slot />
    <!--
      水印层：
      · pointer-events: none —— 绝不能挡住下方的交互
      · 没有 include 到无障碍树 —— 水印是纯视觉信息，读屏不该读
      · background-image 平铺，而非 DOM 节点铺满
    -->
    <div
      v-if="bg"
      class="wd-watermark__layer"
      :style="bgStyle"
      aria-hidden="true"
    ></div>
  </div>
</template>
