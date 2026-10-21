<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdIcon, WdTag } from "@wdesign";

/** 可点选标签：选中态不新增外观，只把 variant 从 gray 换回 tint */
const topics = ["设计", "工程", "数据", "运营", "增长"];
const picked = ref<string[]>(["设计", "数据"]);

function toggle(topic: string) {
  picked.value = picked.value.includes(topic)
    ? picked.value.filter((t) => t !== topic)
    : [...picked.value, topic];
}

/** 边界演示：一屏放不下的标签墙 */
const stack = [
  "Vue",
  "TypeScript",
  "SCSS",
  "Vite",
  "pnpm",
  "Vitest",
  "Playwright",
  "ESLint",
  "Prettier",
  "Changesets",
];
</script>

<template>
  <DemoPage
    name="Tag"
    desc="标签：话题与状态分工 · 六种底色 · 三档尺寸 · 圆点态 · 图标与计数 · 可点选"
  >
    <DemoBlock
      title="话题标签"
      desc="tint 是主题淡红，专门表示「话题 / 分类」（#设计 #前端）。红在这里是品牌色，不承担错误语义"
    >
      <DemoRow>
        <WdTag># 设计</WdTag>
        <WdTag># 前端</WdTag>
        <WdTag variant="dark">官方</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="状态标签"
      desc="状态必须用语义色：success 绿=正常、warning 琥珀=待处理、gray=中性、danger 红=失败。别拿主题红当「进行中」，否则和报错撞车"
    >
      <DemoRow>
        <WdTag variant="success" dot>运行中</WdTag>
        <WdTag variant="warning" dot>待审核</WdTag>
        <WdTag variant="gray" dot>草稿</WdTag>
        <WdTag variant="danger" dot>已封禁</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="状态 · 无底色"
      desc="plain 去掉底色，只留同色圆点和彩字 —— 表格状态列一列二十行，铺色块会花；点 + 彩字已经够扫读"
    >
      <DemoRow>
        <WdTag variant="success" dot plain>Success</WdTag>
        <WdTag variant="warning" dot plain>Pending</WdTag>
        <WdTag variant="danger" dot plain>Failed</WdTag>
        <WdTag variant="gray" dot plain>Draft</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="尺寸" desc="sm 跟在列表项后面不抢视线，lg 留给筛选区里可点的标签">
      <DemoRow>
        <WdTag size="sm">sm</WdTag>
        <WdTag>md</WdTag>
        <WdTag size="lg">lg</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="圆点跟随变体" desc="dot 的颜色取自标签自身（currentColor），不再固定红点 —— 绿标签配红点是纯粹的歧义">
      <DemoRow>
        <WdTag variant="success" dot>已连接</WdTag>
        <WdTag variant="tint" dot>热门话题</WdTag>
        <WdTag variant="dark" dot>已归档</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="标签组" desc="一组标签的整齐度取决于间距一致，用固定 gap 而不是随手给 margin">
      <DemoRow :gap="8">
        <WdTag size="sm" variant="gray">Vue</WdTag>
        <WdTag size="sm" variant="gray">TypeScript</WdTag>
        <WdTag size="sm" variant="gray">SCSS</WdTag>
        <WdTag size="sm" variant="gray">Vite</WdTag>
        <WdTag size="sm" variant="gray">pnpm</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="图标与计数"
      desc="图标放在文字前，尺寸跟标签档位走（sm 用 12、md 用 13）；组件内已有 8px 间距，不用再补空格"
    >
      <DemoRow :gap="8">
        <WdTag><WdIcon name="tag" :size="13" />分类</WdTag>
        <WdTag variant="gray"><WdIcon name="user" :size="13" />8 人</WdTag>
        <WdTag variant="dark"><WdIcon name="star" :size="13" />精选</WdTag>
        <WdTag size="sm" variant="gray"><WdIcon name="message" :size="12" />12</WdTag>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="可点选的标签"
      desc="标签本身不是按钮：可点选时把状态映射回 variant —— 选中 tint、未选 gray，别用下划线或加粗表示选中"
    >
      <DemoRow :gap="8">
        <WdTag
          v-for="topic in topics"
          :key="topic"
          class="pick"
          :variant="picked.includes(topic) ? 'tint' : 'gray'"
          @click="toggle(topic)"
        >
          {{ topic }}
        </WdTag>
      </DemoRow>
      <p class="cap">
        已选 {{ picked.length }} 个：{{ picked.join(" / ") || "无" }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="边界：长文案与标签墙"
      desc="标签是 nowrap 的，放不下就直接溢出而不是折行；一行超过 8 个时先把次要项折叠成 +N，再考虑换行"
    >
      <div class="clip">
        <WdTag>跨平台组件库的可访问性改造专项</WdTag>
      </div>
      <DemoRow :gap="8">
        <WdTag v-for="item in stack" :key="item" size="sm" variant="gray">
          {{ item }}
        </WdTag>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.clip {
  width: 220px;
  overflow: hidden;
}

/* 可点选的标签要把手型光标补上，组件本身不区分可点与不可点 */
.pick {
  cursor: pointer;
}

.cap {
  margin: 0;
  font-size: var(--wd-fs-sm);
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
