<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdIcon, WdMediaCard } from "@wdesign";

type Stat = { value: string; label: string };

const stats: Stat[] = [
  { value: "4h 45m", label: "总时长" },
  { value: "12.4 km", label: "路线长度" },
  { value: "1 842 m", label: "累计爬升" },
];

const hoverStats: Stat[] = [
  { value: "3840 px", label: "宽度" },
  { value: "4:3", label: "比例" },
];

const body =
  "内容层由标题、数据条、正文与主按钮四段组成，正文默认始终展开；只有开了 collapsible 才会出现折叠箭头，并且要求确实有正文或默认插槽。";

const log = ref("（还没操作）");

function onAction() {
  log.value = "触发了 action 事件，后续动作由页面决定";
}

function onOpen(value: boolean) {
  log.value = value ? "卡片展开（update:open = true）" : "卡片收起（update:open = false）";
}
</script>

<template>
  <DemoPage
    name="MediaCard"
    desc="媒体卡片：layout 与 mediaMode 两个正交维度 · 数据条 · 可折叠正文 · 工具与标题插槽"
  >
    <DemoBlock
      title="layout × mediaMode 四种组合"
      desc="layout 管内容压在图上还是排在图下，mediaMode 管图片铺满还是内嵌，两者互不绑定"
    >
      <div class="grid">
        <div class="cell">
          <span class="cap">overlay · cover</span>
          <WdMediaCard
            src="/images/components.jpg"
            alt="组件总览"
            title="组件总览"
            subtitle="内容压在图上的铺满卡片"
            badge="最新"
            duration="12:03"
            layout="overlay"
            media-mode="cover"
          />
        </div>
        <div class="cell">
          <span class="cap">overlay · inset</span>
          <WdMediaCard
            src="/images/dark.jpg"
            alt="深色模式"
            title="深色模式"
            subtitle="压在图上，但图片内嵌留白"
            badge="推荐"
            duration="9:41"
            layout="overlay"
            media-mode="inset"
          />
        </div>
        <div class="cell">
          <span class="cap">stacked · cover</span>
          <WdMediaCard
            src="/images/markdown.jpg"
            alt="Markdown 排版"
            title="Markdown 排版"
            subtitle="图铺满顶部，内容在图下"
            layout="stacked"
            media-mode="cover"
          />
        </div>
        <div class="cell">
          <span class="cap">stacked · inset</span>
          <WdMediaCard
            src="/images/components.jpg"
            alt="组件总览"
            title="组件总览"
            subtitle="图片内嵌，内容独立成区"
            layout="stacked"
            media-mode="inset"
          />
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      title="数据条与主按钮"
      desc="stats 给 2~4 组最稳，超过 4 组会挤；body 在没有 collapsible 时始终展开，action 只发事件"
    >
      <div class="grid grid--two">
        <WdMediaCard
          src="/images/dark.jpg"
          alt="路线概览"
          title="周末徒步路线"
          subtitle="自然 · 徒步"
          badge="2 小时前"
          :stats="stats"
          :body="body"
          action="查看行程"
          layout="stacked"
          media-mode="inset"
          ratio="16 / 9"
          @action="onAction"
        />
        <WdMediaCard
          src="/images/markdown.jpg"
          alt="版式预览"
          title="版式与栅格"
          subtitle="设计 · 规范"
          :stats="hoverStats"
          action="打开规范"
          layout="stacked"
          media-mode="cover"
          ratio="16 / 9"
          @action="onAction"
        />
      </div>
      <p class="log">{{ log }}</p>
    </DemoBlock>

    <DemoBlock
      title="可折叠"
      desc="collapsible 配 defaultOpen 决定初始状态，折叠只动内容区；这里同时监听 update:open"
    >
      <div class="grid grid--two">
        <WdMediaCard
          src="/images/components.jpg"
          alt="展开态"
          title="默认展开"
          subtitle="defaultOpen 为 true"
          badge="展开"
          :stats="stats"
          :body="body"
          action="立即查看"
          layout="stacked"
          media-mode="cover"
          ratio="4 / 3"
          collapsible
          @update:open="onOpen"
          @action="onAction"
        />
        <WdMediaCard
          src="/images/dark.jpg"
          alt="收起态"
          title="默认收起"
          subtitle="defaultOpen 为 false"
          badge="收起"
          :body="body"
          action="立即查看"
          layout="stacked"
          media-mode="inset"
          collapsible
          :default-open="false"
          @update:open="onOpen"
          @action="onAction"
        />
      </div>
      <p class="log">{{ log }}</p>
    </DemoBlock>

    <DemoBlock
      title="比例与圆角"
      desc="ratio 收 CSS aspect-ratio 字符串，换比例就换卡片高度；radius 三档 md / lg / xl 只改卡片圆角"
    >
      <div class="grid">
        <div class="cell">
          <span class="cap">radius md · 1 / 1</span>
          <WdMediaCard
            src="/images/markdown.jpg"
            alt="方图"
            title="正方形"
            layout="stacked"
            media-mode="cover"
            radius="md"
            ratio="1 / 1"
          />
        </div>
        <div class="cell">
          <span class="cap">radius lg · 4 / 3</span>
          <WdMediaCard
            src="/images/components.jpg"
            alt="四比三"
            title="常规比例"
            layout="stacked"
            media-mode="cover"
            radius="lg"
            ratio="4 / 3"
          />
        </div>
        <div class="cell">
          <span class="cap">radius xl · 16 / 9</span>
          <WdMediaCard
            src="/images/dark.jpg"
            alt="宽幅"
            title="宽幅大图"
            layout="stacked"
            media-mode="inset"
            radius="xl"
            ratio="16 / 9"
          />
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      title="插槽：工具按钮与标题补充"
      desc="#tools 落在媒体层右上角（自动排成圆形按钮），#headline-extra 紧跟副标题，适合放标签或计数"
    >
      <div class="grid grid--two">
        <WdMediaCard
          src="/images/components.jpg"
          alt="带工具按钮"
          title="组件库速览"
          subtitle="76 个组件 · 595 个图标"
          badge="收藏夹"
          layout="overlay"
          media-mode="cover"
        >
          <template #tools>
            <WdIcon name="bookmark" :size="16" />
            <WdIcon name="share" :size="16" />
          </template>
          <template #headline-extra>
            <span class="extra">12.8 万次浏览</span>
          </template>
        </WdMediaCard>
        <WdMediaCard
          src="/images/markdown.jpg"
          alt="带标题补充"
          title="文档排版"
          subtitle="标题与正文的字级阶梯"
          layout="stacked"
          media-mode="inset"
          ratio="4 / 3"
        >
          <template #headline-extra>
            <span class="extra extra--dark">共 6 章 · 更新于 3 天前</span>
          </template>
        </WdMediaCard>
      </div>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  width: 100%;
}

.grid--two {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.cell {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.cap {
  font-size: 12px;
  font-weight: 600;
  color: var(--wd-ink-3);
}

.extra {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: var(--wd-on-dark-2);
}

.extra--dark {
  color: var(--wd-ink-3);
}

.log {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
