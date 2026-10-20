<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdImagePreview } from "@wdesign";

const gallery = [
  "/images/components.jpg",
  "/images/dark.jpg",
  "/images/markdown.jpg",
];
</script>

<template>
  <DemoPage
    name="ImagePreview"
    desc="图片预览：点击放大 · 滚轮缩放 · 旋转与还原 · 多图翻页"
  >
    <DemoBlock
      title="单图"
      desc="只给 src 时预览里只有一张，不出现左右翻页和计数"
    >
      <WdImagePreview src="/images/components.jpg" alt="组件总览">
        <img class="thumb" src="/images/components.jpg" alt="组件总览" />
      </WdImagePreview>
    </DemoBlock>

    <DemoBlock
      title="多图"
      desc="给 list 才有翻页与 1 / 3 计数，index 决定这一张打开时停在哪一屏"
    >
      <DemoRow :gap="12">
        <WdImagePreview
          v-for="(src, i) in gallery"
          :key="src"
          :list="gallery"
          :index="i"
          :alt="`预览第 ${i + 1} 张`"
        >
          <img class="thumb" :src="src" :alt="`缩略图 ${i + 1}`" />
        </WdImagePreview>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="指定起始序号"
      desc="同一个缩略图也能从任意一张打开，index 从 0 起算，适合外部列表点进来"
    >
      <DemoRow :gap="12" align="center">
        <WdImagePreview :list="gallery" :index="2" alt="第 3 张">
          <img class="thumb" src="/images/markdown.jpg" alt="从第 3 张开始" />
        </WdImagePreview>
        <span class="hint">点击这张，预览会直接从第 3 张开始</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="自定义缩略图"
      desc="默认插槽放什么都可以，点击区域由组件包住，适合按钮式入口"
    >
      <WdImagePreview :list="gallery" :index="1" alt="图集">
        <WdButton variant="tint" size="sm">查看大图（共 3 张）</WdButton>
      </WdImagePreview>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.thumb {
  display: block;
  width: 168px;
  height: 112px;
  object-fit: cover;
  border-radius: var(--wd-radius-sm);
}

.hint {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
