<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdScrollbar } from "@wdesign";

/** 构建日志：长内容用来撑出滚动 */
const logs = [
  "18:30:02 [info] 开始构建 release/1.4",
  "18:30:05 [info] 缓存命中：node_modules",
  "18:30:21 [info] 编译 76 个组件",
  "18:30:44 [warn] WdTable 单文件超过 40KB",
  "18:31:02 [info] 生成 ESM 产物",
  "18:31:14 [info] 校验导出符号 128 个",
  "18:31:30 [info] 打包样式：412KB → 68KB",
  "18:31:48 [info] 上传制品到对象存储",
  "18:32:03 [info] 写入构建报告 build-report.json",
  "18:32:10 [info] 构建完成，耗时 2 分 8 秒",
];

const shortLines = ["设计令牌已同步", "图标已同步"];
</script>

<template>
  <DemoPage name="Scrollbar" desc="自定义滚动条：短内容 · 长内容 · 常显 · 原生对比">
    <DemoBlock
      title="内容不溢出"
      desc="内容没超过 maxHeight 时不渲染滑块，版式与普通容器完全一致，不会多出一条灰条"
    >
      <WdScrollbar :max-height="200">
        <div class="box">
          <p v-for="l in shortLines" :key="l" class="line">{{ l }}</p>
        </div>
      </WdScrollbar>
    </DemoBlock>

    <DemoBlock
      title="长内容"
      desc="只换外观不换机制：滚轮、触控板惯性、键盘翻页全部走原生滚动，滑块默认悬停才出现"
    >
      <WdScrollbar :max-height="200">
        <div class="box">
          <p v-for="l in logs" :key="l" class="line">{{ l }}</p>
        </div>
      </WdScrollbar>
    </DemoBlock>

    <DemoBlock
      title="常显与粗细"
      desc="always 适合主机面板这类「必须让人知道能滚」的场景；size 调粗细，12px 已接近原生手感"
    >
      <WdScrollbar :max-height="200" always :size="12">
        <div class="box">
          <p v-for="l in logs" :key="l" class="line">{{ l }}</p>
        </div>
      </WdScrollbar>
    </DemoBlock>

    <DemoBlock
      title="原生滚动"
      desc="native 交还给浏览器绘制，无障碍与辅助工具最稳，代价是样式不跟随主题"
    >
      <WdScrollbar :max-height="200" native>
        <div class="box">
          <p v-for="l in logs" :key="l" class="line">{{ l }}</p>
        </div>
      </WdScrollbar>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.box {
  padding: 6px 12px;
}

.line {
  margin: 0;
  padding: 7px 0;
  font-family: var(--wd-font-mono);
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
