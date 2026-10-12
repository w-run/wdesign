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
    return {
      index: 1,            // 物理 slide 索引：1..n 为真实内容，0 与 n+1 为克隆
      silent: false,       // 归一化跳转时禁用过渡（避免肉眼看到回跳）
      touchX: 0,
      touchDelta: 0,
      touchLock: false,
    }
  },
  computed: {
    n() {
      return this.items.length
    },
    // 物理 slide 列表：[克隆(末), item0, ..., item末, 克隆(首)]
    slides() {
      const n = this.n
      if (n === 0) return []
      if (n === 1) return this.items.slice()
      return [this.items[n - 1], ...this.items, this.items[0]]
    },
    // 逻辑 index（用于 dots / slot）：真实 item 序号 0..n-1
    activeIdx() {
      const n = this.n
      if (n === 0) return 0
      return (((this.index - 1) % n) + n) % n
    },
    trackStyle() {
      return {
        transform: `translateX(calc(${-this.index * 100}% + ${this.touchDelta}px))`,
        transition: this.silent ? 'none' : 'transform 0.45s var(--wd-ease)',
      }
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
    // 移动到位后，若在克隆位则静默归一化
    go(i) {
      const n = this.n
      if (!n) return
      this.stop()
      this.index = i
      clearTimeout(this._snapT)
      this._snapT = setTimeout(() => this.snap(), 480)
      if (this.autoplay > 0 && n > 1) this.start()
    },
    snap() {
      const n = this.n
      if (n < 2) return
      if (this.index >= n + 1) this.snapTo(1)          // 滑到尾部克隆 → 归一化为第 1 张
      else if (this.index <= 0) this.snapTo(n)          // 滑到头部克隆 → 归一化为最后一张
    },
    snapTo(i) {
      this.silent = true
      this.index = i
      this.$nextTick(() => {
        this.silent = false
      })
    },
    start() {
      this.stop()
      if (this.autoplay > 0 && this.n > 1) {
        this._timer = setInterval(() => this.go(this.index + 1), this.autoplay)
      }
    },
    stop() {
      if (this._timer) {
        clearInterval(this._timer)
        this._timer = null
      }
    },
    /* ---- 触屏滑动 ---- */
    onTouchStart(e) {
      const t = e.touches && e.touches[0]
      if (!t) return
      this.stop()
      clearTimeout(this._snapT)
      this.touchX = t.clientX
      this.touchDelta = 0
      this.touchLock = true
    },
    onTouchMove(e) {
      const t = e.touches && e.touches[0]
      if (!t || !this.touchLock) return
      this.touchDelta = (t.clientX - this.touchX)
    },
    onTouchEnd() {
      if (!this.touchLock) return
      this.touchLock = false
      const w = this.$el ? this.$el.offsetWidth : 1
      const TH = 42
      let target = this.index
      if (this.touchDelta < -TH) target = this.index + 1
      else if (this.touchDelta > TH) target = this.index - 1
      else target = this.index   // 未达阈值 → 回到原位置
      this.touchDelta = 0
      this.go(target)
    },
  },
  template: `
    <div class="wd-carousel" :class="{ 'wd-carousel--dragging': touchLock }" :style="{ height: height + 'px' }"
      @mouseenter="stop" @mouseleave="start"
      @touchstart.prevent="onTouchStart" @touchmove.prevent="onTouchMove" @touchend="onTouchEnd">
      <div class="wd-carousel__track" :style="trackStyle">
        <div v-for="(it, i) in slides" :key="i" class="wd-carousel__slide" :style="{ background: pal(i) }">
          <slot name="item" :item="it" :index="i">
            <img v-if="it.src" :src="it.src" :alt="it.alt || ''" class="wd-carousel__img" />
            <span v-else class="wd-carousel__label">{{ it.label || 'Slide ' + (((i - 1) % n + n) % n + 1) }}</span>
          </slot>
        </div>
      </div>
      <button v-if="showArrows && n > 1" type="button" class="wd-icon-btn wd-carousel__arrow wd-carousel__arrow--prev" @click="go(index - 1)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
      </button>
      <button v-if="showArrows && n > 1" type="button" class="wd-icon-btn wd-carousel__arrow wd-carousel__arrow--next" @click="go(index + 1)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>
      </button>
      <div v-if="showDots && n > 1" class="wd-carousel__dots">
        <button v-for="(_, i) in items" :key="i" type="button" class="wd-carousel__dot"
          :class="{ 'wd-carousel__dot--active': i === activeIdx }" @click="go(i + 1)"></button>
      </div>
    </div>`,
}

