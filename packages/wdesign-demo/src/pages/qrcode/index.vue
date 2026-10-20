<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdQRCode, WdIcon } from "@wdesign";

const inviteUrl = "https://w-run.net/invite/8f3ac2d1";
const payUrl = "https://pay.w-run.net/o/20261024-8841";
const csPhone = "tel:+862152880066";

const lastError = ref("");
</script>

<template>
  <DemoPage name="QRCode" desc="二维码：三种模块样式 · 纠错等级 · 中心 logo · 加载态">
    <DemoBlock
      title="基础"
      desc="text 是必填内容（不叫 value，避免和原生属性打架）；默认 M 级纠错、2 个模块静区"
    >
      <DemoRow :gap="24">
        <WdQRCode :text="inviteUrl" :size="160" @error="lastError = $event" />
        <WdQRCode :text="csPhone" :size="160" />
      </DemoRow>
      <p v-if="lastError" class="qr-note">{{ lastError }}</p>
    </DemoBlock>

    <DemoBlock
      title="模块样式"
      desc="square 扫描最稳，适合印刷与扫码枪；dot 更柔和，liquid 让相邻模块黏连成墨迹，适合偏设计的卡片"
    >
      <DemoRow :gap="24">
        <WdQRCode :text="payUrl" :size="140" module-style="square" />
        <WdQRCode :text="payUrl" :size="140" module-style="dot" />
        <WdQRCode :text="payUrl" :size="140" module-style="liquid" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="中心 logo"
      desc="centerBlank 从矩阵里剔除中心模块（不是盖色块），靠 H 级纠错兜底；logo 面积别超过 25%–30%，否则扫不出来"
    >
      <DemoRow :gap="24">
        <WdQRCode :text="inviteUrl" :size="180" level="H" :center-blank="26">
          <template #center>
            <span class="qr-logo">
              <WdIcon name="hex-cube" :size="26" />
            </span>
          </template>
        </WdQRCode>
        <WdQRCode :text="payUrl" :size="180" level="H" :margin="4" :center-blank="22">
          <template #center>
            <span class="qr-logo qr-logo--text">W</span>
          </template>
        </WdQRCode>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="加载态与空内容"
      desc="loading 时显示骨架，避免先闪一块空白再突然出现；text 为空则显示占位提示，不要自己写空判断"
    >
      <DemoRow :gap="24">
        <WdQRCode loading :size="120" />
        <WdQRCode :size="120" />
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.qr-note {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.qr-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--wd-card);
  color: var(--wd-red);
  font-size: 22px;
  font-weight: 800;
}

.qr-logo--text {
  border-radius: var(--wd-radius-sm);
  color: var(--wd-ink);
}
</style>
