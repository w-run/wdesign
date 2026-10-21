<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdProgress } from "@wdesign";

/** 业务里常见的资源占用 */
const rows = [
  { label: "对象存储", value: 72 },
  { label: "构建缓存", value: 38 },
  { label: "日志归档", value: 96 },
];

/** color 接受任意 CSS 颜色，这里用语义令牌和彩虹序列 */
const colors = [
  { label: "成功", color: "var(--wd-success)" },
  { label: "警告", color: "var(--wd-warning)" },
  { label: "彩虹蓝", color: "var(--wd-rainbow-blue)" },
  { label: "彩虹紫", color: "var(--wd-rainbow-violet)" },
];
</script>

<template>
  <DemoPage name="Progress" desc="进度条：基础 · 细条 · 深色面 · 自定义颜色">
    <DemoBlock
      title="基础"
      desc="value 自动夹在 0–100，传超范围数值也不会溢出容器"
    >
      <div class="stack">
        <WdProgress :value="35" />
        <WdProgress :value="70" />
        <WdProgress :value="100" />
        <WdProgress :value="120" />
      </div>
    </DemoBlock>

    <DemoBlock
      title="细条"
      desc="thin 用于列表行内、卡片角落这类次要位置的进度，不抢标题的视觉权重"
    >
      <div class="stack">
        <div v-for="r in rows" :key="r.label" class="meter">
          <span class="meter__label">{{ r.label }}</span>
          <WdProgress :value="r.value" thin />
          <span class="meter__value">{{ r.value }}%</span>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      title="深色面"
      desc="onDark 把轨道和文字切到深色面容器的对比度，放在深色卡片里才不会糊成一片"
    >
      <div class="dark-panel">
        <p class="dark-panel__title">本月配额消耗</p>
        <WdProgress :value="64" on-dark />
        <WdProgress :value="28" thin on-dark />
      </div>
    </DemoBlock>

    <DemoBlock
      title="自定义颜色"
      desc="color 直接吃 CSS 颜色值，主题令牌和彩虹序列都能用；只用于区分类型，别用来做装饰"
    >
      <div class="stack">
        <div v-for="c in colors" :key="c.label" class="meter">
          <span class="meter__label">{{ c.label }}</span>
          <WdProgress :value="65" thin :color="c.color" />
        </div>
      </div>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.meter {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meter__label {
  flex: none;
  width: 80px;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.meter__value {
  flex: none;
  width: 44px;
  text-align: right;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.dark-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 20px;
  border-radius: var(--wd-radius-lg);
  background: var(--wd-dark);
}

.dark-panel__title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--wd-dark-text);
}
</style>
