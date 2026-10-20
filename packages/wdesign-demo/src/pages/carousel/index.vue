<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdCarousel, WdIcon } from "@wdesign";

type Slide = { label?: string; src?: string; alt?: string };

const shots: Slide[] = [
  { src: "/images/components.jpg", alt: "组件总览", label: "组件总览" },
  { src: "/images/dark.jpg", alt: "深色模式", label: "深色模式" },
  { src: "/images/markdown.jpg", alt: "Markdown 排版", label: "Markdown 排版" },
];

const texts: Slide[] = [
  { label: "纯文字的每一屏" },
  { label: "不给 src 时整屏显示 label" },
  { label: "适合公告与引导页" },
];
</script>

<template>
  <DemoPage
    name="Carousel"
    desc="轮播：图片与纯文字两种内容 · 自动播放 · 圆点与箭头 · 首尾无缝循环 · 可接管每一屏"
  >
    <DemoBlock :span="2"
      title="基础"
      desc="items 里给了 src 就渲染图片，用 object-fit: contain 完整显示、绝不裁切"
    >
      <WdCarousel :items="shots" :height="320" />
    </DemoBlock>

    <DemoBlock :span="2"
      title="自动播放"
      desc="autoplay 是切换间隔（毫秒），鼠标移入暂停、移出继续，避免用户正在看时被抢走"
    >
      <WdCarousel :items="shots" :height="240" :autoplay="3000" />
    </DemoBlock>

    <DemoBlock :span="2"
      title="纯文字与控件开关"
      desc="不给 src 时整屏显示 label；关掉 showDots 与 showArrows 后只剩自动播放和拖拽手势"
    >
      <WdCarousel
        :items="texts"
        :height="200"
        :autoplay="2500"
        :show-dots="false"
        :show-arrows="false"
      />
    </DemoBlock>

    <DemoBlock :span="2"
      title="关闭无缝循环"
      desc="loop 默认开启，末张到首张不会整条轨道倒回；关掉后循环会往回拉一屏，换来更直白的顺序"
    >
      <WdCarousel :items="shots" :height="240" :loop="false" :autoplay="2500" />
    </DemoBlock>

    <DemoBlock :span="2"
      title="自定义每一屏"
      desc="用 #item 插槽接管整屏内容，item 与 index 由组件传进来"
    >
      <WdCarousel :items="texts" :height="260">
        <template #item="{ item, index }">
          <div class="panel">
            <WdIcon name="image" :size="26" />
            <span class="panel__text">{{ item.label }}</span>
            <span class="panel__index">第 {{ index + 1 }} 屏</span>
          </div>
        </template>
      </WdCarousel>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  color: var(--wd-ink);
}

.panel__text {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.panel__index {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
