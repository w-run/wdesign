<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdAvatar, WdBadge, WdButton, WdIcon } from "@wdesign";

const unread = ref(3);

/** 会话列表：未读为 0 的条目干脆不挂徽标，见最后一块 */
const threads = [
  { name: "林小满", text: "令牌那一版我明早过一遍", time: "10:24", unread: 2 },
  { name: "王一舟", text: "构建脚本改好了，可以重新发", time: "昨天", unread: 0 },
  { name: "周可", text: "文档站的颜色标错了", time: "周三", unread: 7 },
];
</script>

<template>
  <DemoPage
    name="Badge"
    desc="徽标：数值上限 · 圆点态 · 灰度色调 · 挂在图标与头像上 · 零值边界"
  >
    <DemoBlock title="数值徽标" desc="value 挂在被标记元素的右上角，图标按钮是最常见的宿主">
      <DemoRow :gap="24">
        <WdBadge :value="3"><WdIcon name="bell" :size="22" /></WdBadge>
        <WdBadge :value="7"><WdIcon name="star" :size="22" /></WdBadge>
        <WdBadge :value="1"><WdIcon name="user" :size="22" /></WdBadge>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="数值上限" desc="超过 max 显示 max+，避免三位数把徽标撑变形">
      <DemoRow :gap="24">
        <WdBadge :value="8"><WdIcon name="file" :size="22" /></WdBadge>
        <WdBadge :value="120" :max="99"><WdIcon name="file" :size="22" /></WdBadge>
        <WdBadge :value="12" :max="9"><WdIcon name="file" :size="22" /></WdBadge>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="圆点与色调" desc="不关心具体数量时用 dot，gray 用于压低提示强度">
      <DemoRow :gap="24">
        <WdBadge dot><WdIcon name="bell" :size="22" /></WdBadge>
        <WdBadge dot tone="gray"><WdIcon name="file" :size="22" /></WdBadge>
        <WdBadge :value="4" tone="gray"><WdIcon name="settings" :size="22" /></WdBadge>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="数值变化" desc="只有数值变化时徽标才弹入一次，首屏静止，避免页面看起来在抖">
      <DemoRow :gap="16">
        <WdBadge :value="unread"><WdIcon name="bell" :size="22" /></WdBadge>
        <WdButton variant="tint" size="sm" @click="unread = unread + 1">收到一条</WdButton>
        <WdButton variant="ghost" size="sm" @click="unread = 0">全部已读</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="挂在图标与头像上"
      desc="徽标是绝对定位，不参与宿主布局，所以塞进图标、头像旁边都不会把宿主撑大；纯文字的宿主会被角标压住右上角 —— 文字旁边请留出 padding 或者干脆改用 dot"
    >
      <DemoRow :gap="28" align="center">
        <WdBadge :value="2"><WdIcon name="bell" :size="22" /></WdBadge>
        <WdBadge :value="9" tone="gray"><WdIcon name="message" :size="22" /></WdBadge>
        <WdBadge dot><WdIcon name="folder" :size="22" /></WdBadge>
        <WdBadge dot><WdAvatar name="林小满" /></WdBadge>
        <WdBadge :value="5"><WdAvatar name="周可" /></WdBadge>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="会话列表"
      desc="未读数挂在头像角上：头像尺寸是固定的，角标浮在右上角不进布局，右侧时间戳那一列也不会被挤动"
    >
      <ul class="threads">
        <li v-for="t in threads" :key="t.name" class="threads__item">
          <span class="threads__avatar">
            <WdBadge v-if="t.unread" :value="t.unread">
              <WdAvatar :name="t.name" size="sm" />
            </WdBadge>
            <WdAvatar v-else :name="t.name" size="sm" />
          </span>
          <span class="threads__body">
            <span class="threads__name">{{ t.name }}</span>
            <span class="threads__text">{{ t.text }}</span>
          </span>
          <span class="threads__time">{{ t.time }}</span>
        </li>
      </ul>
    </DemoBlock>

    <DemoBlock
      title="零值边界"
      desc="0 是有效数值，会原样显示成一个「0」徽标；真正无未读时传空字符串（不渲染）或改用 dot，别让红底 0 继续挂着"
    >
      <DemoRow :gap="28" align="center">
        <WdBadge :value="0"><WdIcon name="bell" :size="22" /></WdBadge>
        <WdBadge :value="''"><WdIcon name="bell" :size="22" /></WdBadge>
        <WdBadge dot><WdIcon name="bell" :size="22" /></WdBadge>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.threads {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.threads__item {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 头像外面留 6px，给角标让出右上角的位置 */
.threads__avatar {
  flex: none;
  display: inline-flex;
  margin: 6px 6px 0 0;
}

.threads__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.threads__name {
  font-size: var(--wd-fs-ui);
  font-weight: 600;
  color: var(--wd-ink);
}

.threads__text {
  font-size: var(--wd-fs-caption);
  color: var(--wd-ink-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.threads__time {
  flex: none;
  font-size: var(--wd-fs-caption);
  color: var(--wd-ink-3);
}
</style>
