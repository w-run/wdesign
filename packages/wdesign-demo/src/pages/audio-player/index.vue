<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdAudioPlayer } from "@wdesign";

const src = "/media/audio.mp3";

/** 手写波形：0~1 的数组，生产环境应由后端预先算好峰值传进来 */
const wave: number[] = [
  0.18, 0.42, 0.66, 0.92, 0.58, 0.34, 0.5, 0.78, 0.55, 0.28, 0.62, 0.88,
  0.48, 0.24, 0.4, 0.72, 0.84, 0.38, 0.2, 0.33, 0.58, 0.3, 0.22,
];

const progress = ref(0);
const duration = ref(0);
const lastEvent = ref("（还没触发）");

function onTimeupdate(current: number, total: number) {
  progress.value = current;
  duration.value = total;
}
</script>

<template>
  <DemoPage
    name="AudioPlayer"
    desc="音频播放器：card / bar / mini 三种形态 · 封面与波形两种主体 · 反色卡 · 事件驱动"
  >
    <DemoBlock :span="2"
      title="card · 有无封面两种主体"
      desc="有封面时封面是主体、波形缩成细密一条；不给封面时波形升格为主体，波峰走传进来的 waveform 数组"
    >
      <DemoRow :gap="20" align="flex-start">
        <div class="card-box">
          <WdAudioPlayer
            variant="card"
            :src="src"
            title="Unsayable"
            subtitle="Brambles"
            :waveform="wave"
          />
        </div>
        <div class="card-box">
          <WdAudioPlayer
            variant="card"
            :src="src"
            title="Ace"
            subtitle="Else 与 Vanderway"
            cover="/media/poster.jpg"
          />
        </div>
      </DemoRow>
    </DemoBlock>

    <DemoBlock :span="2"
      title="card · 反色与细进度条"
      desc="inverse 是固定深色面，用来把单曲从页面里跳出来；progressStyle 改成 bar 就换成克制的细进度线"
    >
      <DemoRow :gap="20" align="flex-start">
        <div class="card-box">
          <WdAudioPlayer
            variant="card"
            inverse
            :src="src"
            title="Magic Stories"
            subtitle="5 章节 · 64 小节"
            progress-style="bar"
          />
        </div>
      </DemoRow>
    </DemoBlock>

    <DemoBlock :span="2"
      title="bar · 列表内嵌"
      desc="bar 封面即播放键、时间与进度挤在同一行；给了 waveform 就走波形，不给就是细线，downloadable 多一个下载入口"
    >
      <div class="stack">
        <WdAudioPlayer
          variant="bar"
          :src="src"
          title="细进度线版本"
          subtitle="不给 waveform 时用细线"
          downloadable
        />
        <WdAudioPlayer
          variant="bar"
          :src="src"
          title="带波形版本"
          subtitle="栏目名 · 第 12 期"
          :waveform="wave"
          cover="/media/poster.jpg"
        />
      </div>
    </DemoBlock>

    <DemoBlock :span="2"
      title="mini · 单行极简"
      desc="mini 适合固定底栏或列表尾巴；compact 是它的旧写法，等价于 variant=mini"
    >
      <div class="stack stack--narrow">
        <WdAudioPlayer variant="mini" :src="src" title="第 1 段录音" subtitle="今天 14:20" />
        <WdAudioPlayer compact :src="src" title="第 2 段录音" subtitle="昨天（compact 旧写法）" />
        <WdAudioPlayer variant="mini" :src="src" title="第 3 段录音" subtitle="10-16" />
      </div>
    </DemoBlock>

    <DemoBlock :span="2"
      title="事件"
      desc="timeupdate 带 (current, duration)，上一首与下一首只发事件，换曲逻辑留给父级"
    >
      <div class="stack">
        <WdAudioPlayer
          variant="bar"
          :src="src"
          title="拖动进度或播完试试"
          subtitle="事件全部抛给父级"
          @timeupdate="onTimeupdate"
          @play="lastEvent = 'play'"
          @pause="lastEvent = 'pause'"
          @ended="lastEvent = 'ended'"
          @prev="lastEvent = 'prev'"
          @next="lastEvent = 'next'"
        />
      </div>
      <p class="log">
        进度 {{ progress.toFixed(1) }}s / {{ duration ? duration.toFixed(1) + "s" : "未加载" }}
        · 最近事件：{{ lastEvent }}
      </p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.card-box {
  width: 360px;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 720px;
}

.stack--narrow {
  max-width: 420px;
}

.log {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
