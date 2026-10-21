<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdVideoPlayer } from "@wdesign";

type Episode = { key: string; label: string; tag?: string; disabled?: boolean };

const src = "/media/demo.mp4";
const poster = "/media/poster.jpg";

/** 不给 src 的集：组件只发 change-episode，换源由页面负责 */
const episodes: Episode[] = [
  { key: "ep1", label: "第 1 集 · 起点" },
  { key: "ep2", label: "第 2 集 · 迷雾" },
  { key: "ep3", label: "第 3 集 · 预告", tag: "预告" },
  { key: "ep4", label: "第 4 集 · 待上线", disabled: true },
];

/** 长剧集：用来验证分页（260 集 → 1-100 / 101-200 / 201-260 三页） */
const manyEpisodes: Episode[] = Array.from({ length: 260 }, (_, i) => ({
  key: `ep${i + 1}`,
  label: `第 ${i + 1} 集 · ${["起点", "迷雾", "回声", "长夜", "潮汐"][i % 5]}`,
  tag: i === 2 ? "预告" : undefined,
  disabled: i === 3,
}));
const currentMany = ref<string | number>("ep120");

/**
 * 直播源（CCTV1 · HLS）。
 *
 * ⚠️ 必须走 `/live?u=` 同源代理，不能直接写源地址：
 *   1. 源站不带 CORS 头，浏览器直连会被拦
 *   2. 它会 302 到带签名的地址（IP + 时间绑定），前端拼不出分片 URL
 * 代理见 `tools/live-proxy.mjs`（只在 dev server 生效，构建产物里没有）。
 */
const liveUpstream = "http://204.12.221.218:8181/3m1080p/cctv1.m3u8";
const liveSrc = `/live?u=${encodeURIComponent(liveUpstream)}`;

const currentEp = ref<string | number>("ep1");
const danmakuOn = ref(true);
const log = ref("（还没操作）");

function onChangeEpisode(ep: Episode, index: number) {
  currentEp.value = ep.key;
  log.value = `切到「${ep.label}」（第 ${index + 1} 项），换源由页面处理`;
}

function onRateChange(rate: number) {
  log.value = `倍速改成 ${rate}x（rate-change 事件）`;
}
</script>

<template>
  <DemoPage
    name="VideoPlayer"
    desc="视频播放器：点播与直播两种模式 · 选集抽屉 · 内置弹幕 · 插槽扩展控件"
  >
    <DemoBlock
      title="直播 · CCTV1"
      desc="mode 取 live 时去掉进度条与选集、显示 LIVE 徽标；m3u8 在 Chrome 走 hls.js（hls=auto 时自动探测全局 Hls）"
    >
      <WdVideoPlayer :src="liveSrc" mode="live" />
    </DemoBlock>

    <DemoBlock
      title="长剧集 · 自动分页"
      desc="集数超过 episodePageSize（默认 100）时，列表上方出现 1-100 / 101-200 这样的分页；不够门槛就不分页，直接铺列表。打开面板会自动跳到当前集所在的页"
    >
      <WdVideoPlayer
        :src="src"
        :poster="poster"
        :episodes="manyEpisodes"
        :current-episode="currentMany"
        playlist
        episode-nav
        @change-episode="(ep: Episode, i: number) => (currentMany = ep.key)"
      />
    </DemoBlock>

    <DemoBlock
      title="点播 · 选集与弹幕"
      desc="episodes 不带 src 时组件只发 change-episode，换源交给页面；弹幕直接吃 B 站 XML，开关走 v-model:danmaku-on"
    >
      <WdVideoPlayer
        :src="src"
        :poster="poster"
        title="示例影片 · WDesign Demo"
        mode="vod"
        :episodes="episodes"
        :current-episode="currentEp"
        danmaku-src="/media/danmaku.xml"
        v-model:danmaku-on="danmakuOn"
        @change-episode="onChangeEpisode"
      />
      <p class="log">
        {{ log }} · 弹幕{{ danmakuOn ? "已开启" : "已关闭" }}（播放中弹幕才飞）
      </p>
    </DemoBlock>

    <DemoBlock
      title="直播模式"
      desc="mode=live 去掉进度条，改显示脉动实时线与当前时刻；这里用点播片源模拟直播画面，不依赖外网流"
    >
      <WdVideoPlayer
        :src="src"
        :poster="poster"
        title="直播间 · 信号测试"
        mode="live"
        :playlist="false"
        :episode-nav="false"
      />
    </DemoBlock>

    <DemoBlock
      title="控件常显与插槽"
      desc="controlsMode=always 让控件不再自动淡出，适合演示与截图；#top-right 放清晰度、#overlay 放水印"
    >
      <WdVideoPlayer
        :src="src"
        :poster="poster"
        title="控件常显"
        controls-mode="always"
      >
        <template #top-right>
          <span class="chip">1080P</span>
        </template>
        <template #overlay="{ current }">
          <span class="mark">水印 · {{ current.toFixed(1) }}s</span>
        </template>
      </WdVideoPlayer>
    </DemoBlock>

    <DemoBlock
      title="自定义倍速与描边图标"
      desc="rates 决定倍速菜单档位并抛出 rate-change；iconStyle 改 outlined 后控件变细线，深色画面上建议保持 filled"
    >
      <WdVideoPlayer
        :src="src"
        :poster="poster"
        title="倍速 0.5× — 3×"
        :rates="[0.5, 1, 1.5, 2, 3]"
        icon-style="outlined"
        :playlist="false"
        :episode-nav="false"
        :pip="false"
        @rate-change="onRateChange"
      />
      <p class="log">{{ log }}</p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.chip {
  padding: 2px 10px;
  border-radius: var(--wd-radius-pill);
  font-size: 12px;
  font-weight: 700;
  color: var(--wd-on-dark-text);
  background: var(--wd-on-dark);
}

.mark {
  font-size: 12px;
  color: var(--wd-on-dark-2);
}

.log {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
