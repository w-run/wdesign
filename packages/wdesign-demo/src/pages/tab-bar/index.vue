<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdTabBar } from "@wdesign";

const items = [
  { key: "home", label: "首页", icon: "home" },
  { key: "explore", label: "发现", icon: "compass" },
  { key: "message", label: "消息", icon: "chat", badge: 3 },
  { key: "me", label: "我的", icon: "user" },
];

const active = ref("home");
const active2 = ref("explore");
const log = ref("（还没点）");
</script>

<template>
  <DemoPage
    name="TabBar"
    desc="底部导航：悬浮胶囊 + 独立 FAB · 图标与文字双状态 · 角标 · 受控切换"
  >
    <DemoBlock
      title="悬浮胶囊（默认）"
      desc="floating 让导航脱离容器边缘、带投影 —— 贴在底部像系统原生控件，悬浮才是产品自己的语言"
    >
      <div class="stage">
        <div class="stage__body">内容区</div>
        <WdTabBar v-model="active" :items="items" />
      </div>
    </DemoBlock>

    <DemoBlock title="带 FAB" desc="右侧独立圆形主按钮，与胶囊之间留 10px 缝：它是「新建」而不是第五个 tab">
      <div class="stage">
        <div class="stage__body">内容区</div>
        <WdTabBar v-model="active2" :items="items.slice(0, 3)" fab @fab="log = '点了 FAB'" />
      </div>
      <p class="note">{{ log }}</p>
    </DemoBlock>

    <DemoBlock title="通栏（floating=false）" desc="放在页面最底部、宽度撑满，用于原生壳或全屏 WebView">
      <div class="stage stage--plain">
        <div class="stage__body">内容区</div>
        <WdTabBar v-model="active" :items="items" :floating="false" />
      </div>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.stage {
  display: flex;
  flex-direction: column;
  /* 手机宽度居中：卡片很宽时不能让模拟框贴左 */
  margin: 0 auto;
  width: min(420px, 100%);
  height: 300px;
  padding: 12px;
  border-radius: var(--wd-radius-lg);
  background: var(--wd-bg);
}

.stage--plain {
  padding: 0;
  overflow: hidden;
}

/* 内容区只是占位：说明导航是浮在内容之上的 */
.stage__body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--wd-radius-md);
  background: var(--wd-card);
  color: var(--wd-ink-3);
  font-size: 12.5px;
}

.note {
  margin: 10px 0 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
