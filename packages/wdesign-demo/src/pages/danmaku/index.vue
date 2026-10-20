<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdDanmaku } from "@wdesign";

type Danmaku = {
  time: number;
  text: string;
  color?: string;
  mode?: "scroll" | "top" | "bottom";
};

/** 手写 items：父级推进 current，组件只负责「时间到了就飞」 */
const items: Danmaku[] = [
  { time: 0.3, text: "手写 items，直接给数组" },
  { time: 1.2, text: "这条是顶部固定弹幕", mode: "top", color: "#FFD166" },
  { time: 1.8, text: "轨道按顺序自动分配，不会叠在一起" },
  { time: 2.6, text: "彩色滚动弹幕", color: "#7BD88F" },
  { time: 3.4, text: "这条是底部固定弹幕", mode: "bottom", color: "#8AB4F8" },
  { time: 4.3, text: "组件自己不播，current 由父级驱动" },
  { time: 5.6, text: "暂停时原地定格，不是清空", color: "#FF8FA3" },
  { time: 7.2, text: "只有 8 秒窗口内的弹幕会被渲染" },
  { time: 9.0, text: "循环到 20 秒后从头再来" },
];

/** raw：原始文本本地解析，不联网 */
const rawXml = `<?xml version="1.0" encoding="UTF-8"?>
<i>
  <d p="0.6,1,25,16777215,1699999999,0,abc,0">raw 传进来的就是原始 XML</d>
  <d p="1.4,5,25,16711680,1699999999,0,abc,0">红色顶部固定</d>
  <d p="2.4,1,25,65280,1699999999,0,abc,0">绿色滚动</d>
  <d p="3.6,4,25,16776960,1699999999,0,abc,0">黄色底部固定</d>
  <d p="4.8,1,25,16777215,1699999999,0,abc,0">十进制颜色自动转成十六进制</d>
  <d p="6.5,1,25,65535,1699999999,0,abc,0">青色弹幕</d>
</i>`;

/** 模拟播放进度：真实场景由 video 的 timeupdate 传进来 */
const LOOP = 20;
const current = ref(0);
const playing = ref(true);
const shown = ref(true);
let timer: number | undefined;

onMounted(() => {
  timer = window.setInterval(() => {
    if (!playing.value) return;
    current.value = Number(((current.value + 0.2) % LOOP).toFixed(1));
  }, 200);
});

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer);
});

function replay() {
  current.value = 0;
  playing.value = true;
}
</script>

<template>
  <DemoPage
    name="Danmaku"
    desc="弹幕层：滚动与顶部底部固定 · 三种数据源 · 轨道与字号可调 · 暂停定格"
  >
    <DemoBlock
      title="基础"
      desc="items 手写、current 由父级定时推进（真实场景直接接视频的 timeupdate），visible 与 paused 各自独立"
    >
      <DemoRow :gap="10">
        <WdButton
          :variant="playing ? 'dark' : 'primary'"
          size="sm"
          @click="playing = !playing"
        >
          {{ playing ? "暂停" : "继续" }}
        </WdButton>
        <WdButton variant="tint" size="sm" @click="replay">重播</WdButton>
        <WdButton variant="ghost" size="sm" @click="shown = !shown">
          {{ shown ? "隐藏弹幕" : "显示弹幕" }}
        </WdButton>
      </DemoRow>
      <div class="stage">
        <WdDanmaku
          :items="items"
          :current="current"
          :visible="shown"
          :paused="!playing"
          :rows="6"
        />
      </div>
      <p class="log">当前进度 {{ current.toFixed(1) }}s / {{ LOOP }}s</p>
    </DemoBlock>

    <DemoBlock
      title="数据源 src"
      desc="给 src 就异步拉取，B 站 XML 自动识别；跨域需自备代理，同源文件可直接用"
    >
      <div class="stage">
        <WdDanmaku src="/media/danmaku.xml" :current="current" :rows="7" />
      </div>
    </DemoBlock>

    <DemoBlock
      title="原始文本 raw"
      desc="raw 用于本地解析，适合弹幕随页面一起下发；与 src 相比少一次网络请求"
    >
      <div class="stage">
        <WdDanmaku :raw="rawXml" :current="current" :rows="6" />
      </div>
    </DemoBlock>

    <DemoBlock
      title="轨道、字号与透明度"
      desc="rows 决定并行轨道数（窄容器给 4 行更稳），fontSize 与 opacity 直接作用于每一行"
    >
      <DemoRow :gap="16" align="stretch">
        <div class="stage stage--half">
          <WdDanmaku :items="items" :current="current" :rows="4" :font-size="13" :opacity="0.75" />
        </div>
        <div class="stage stage--half">
          <WdDanmaku :items="items" :current="current" :rows="8" :font-size="18" />
        </div>
      </DemoRow>
      <p class="log">左：4 行 · 13px · 75% 透明度　　右：8 行 · 18px · 不透明</p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.stage {
  position: relative;
  height: 300px;
  overflow: hidden;
  border-radius: var(--wd-radius-lg);
  background: var(--wd-dark);
}

.stage--half {
  flex: 1 1 300px;
}

.log {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
