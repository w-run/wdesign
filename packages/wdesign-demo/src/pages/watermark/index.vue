<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdWatermark } from "@wdesign";
</script>

<template>
  <DemoPage name="Watermark" desc="水印：文字 / 多行 · 密度与角度 · 边缘偏移">
    <DemoBlock
      title="文字水印"
      desc="Canvas 生成一张平铺图，容器再大也只有 1 个背景层；水印层不接收指针事件，不影响下层操作"
    >
      <WdWatermark text="WDesign 内部资料" :font-size="13" :gap="90" :rotate="-22">
        <div class="wm-box">订单看板 · 2026 年 10 月</div>
      </WdWatermark>
    </DemoBlock>

    <DemoBlock
      title="多行水印"
      desc="text 传数组即可多行，单格里逐行绘制；多行时 gap 要相应放大，否则相邻格子会挤在一起"
    >
      <WdWatermark :text="['机密', '仅供内部评估']" :font-size="12" :gap="120" :rotate="-30">
        <div class="wm-box">财务测算表 · 2027 年预算</div>
      </WdWatermark>
    </DemoBlock>

    <DemoBlock
      title="密度与角度"
      desc="gap 越小越密、越难忽略但越干扰阅读；rotate 为 0 是横排，密级较高的文档通常用 -30° 斜排"
    >
      <DemoRow :gap="16" align="stretch">
        <div class="wm-cell">
          <WdWatermark text="草稿" :font-size="12" :gap="48" :rotate="0">
            <div class="wm-box">间距 48 · 不旋转</div>
          </WdWatermark>
        </div>
        <div class="wm-cell">
          <WdWatermark text="草稿" :font-size="12" :gap="140" :rotate="-45">
            <div class="wm-box">间距 140 · 斜 45°</div>
          </WdWatermark>
        </div>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="边缘偏移"
      desc="offset 控制首格相对容器左上角的位置；容器有圆角或内边距时调大一点，避免文字被裁掉半截"
    >
      <DemoRow :gap="16" align="stretch">
        <div class="wm-cell">
          <WdWatermark text="内部资料" :font-size="13" :gap="100" :offset="0">
            <div class="wm-box">offset 0</div>
          </WdWatermark>
        </div>
        <div class="wm-cell">
          <WdWatermark text="内部资料" :font-size="13" :gap="100" :offset="32">
            <div class="wm-box">offset 32</div>
          </WdWatermark>
        </div>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.wm-cell {
  flex: 1 1 260px;
  min-width: 0;
}

.wm-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  border-radius: var(--wd-radius-md);
  background: var(--wd-field);
  color: var(--wd-ink-2);
  font-size: 13px;
}
</style>
