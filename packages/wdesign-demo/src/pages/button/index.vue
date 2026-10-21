<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdIcon, WdInput } from "@wdesign";

const loading = ref(false);

async function fakeSubmit() {
  loading.value = true;
  await new Promise((r) => setTimeout(r, 1500));
  loading.value = false;
}

/** 事件演示：点一次记一次；禁用态的按钮点了不该让计数上涨 */
const hits = ref(0);
const lastAction = ref("（还没点过）");

function hit(label: string) {
  hits.value += 1;
  lastAction.value = label;
}

/** 表单演示：type="submit" 才会走原生提交链路 */
const projectName = ref("");
const submitted = ref("（还没提交）");

function onSubmit() {
  submitted.value = projectName.value
    ? `已提交：${projectName.value}`
    : "已提交：名称为空";
}
</script>

<template>
  <DemoPage
    name="Button"
    desc="按钮：六种变体 · 三档尺寸 · 图标态 · 加载态 · 事件与表单提交"
  >
    <DemoBlock title="变体" desc="primary 是主行动，其余按视觉权重递减">
      <DemoRow>
        <WdButton variant="primary">主按钮</WdButton>
        <WdButton variant="tint">次级</WdButton>
        <WdButton variant="dark">深色</WdButton>
        <WdButton variant="ghost">幽灵</WdButton>
        <WdButton variant="primary" disabled>禁用</WdButton>
        <WdButton variant="tint" disabled>禁用</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="链接按钮"
      desc="arrow 追加上右箭头（↗），用于「了解更多 / 去某处」。纯图标用 md 档（44px 圆、箭头 20），配文字时用 sm + ghost，箭头收到 15px 不抢正文"
    >
      <DemoRow :gap="20">
        <WdButton icon-only arrow aria-label="了解更多" />
        <WdButton icon-only arrow variant="tint" size="sm" aria-label="详解" />
        <WdButton variant="ghost" size="sm" arrow>了解更多</WdButton>
        <WdButton variant="tint" size="sm" arrow>查看全部 12 项</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="尺寸" desc="sm 用于密集工具栏，lg 用于页面的主 CTA">
      <DemoRow>
        <WdButton variant="primary" size="lg">大尺寸</WdButton>
        <WdButton variant="primary" size="md">中尺寸</WdButton>
        <WdButton variant="primary" size="sm">小尺寸</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="图标态与通栏" desc="图标用 WdIcon（尺寸跟着按钮档位走），不要用 + × ⋯ 这类文字字符 —— 它们的字形大小和对齐都不可控">
      <DemoRow>
        <WdButton variant="dark" icon-only aria-label="新增">
          <WdIcon name="plus" :size="20" />
        </WdButton>
        <WdButton variant="tint" icon-only aria-label="关闭">
          <WdIcon name="close" :size="20" />
        </WdButton>
        <WdButton variant="ghost" icon-only aria-label="更多">
          <WdIcon name="dots-horizontal" :size="20" />
        </WdButton>
        <WdButton variant="tint" icon-only size="lg" aria-label="筛选">
          <WdIcon name="filter" :size="22" />
        </WdButton>
      </DemoRow>
      <WdButton variant="primary" block>block 通栏按钮</WdButton>
    </DemoBlock>

    <DemoBlock title="加载态" desc="loading 时自动禁用点击，防止重复提交">
      <DemoRow>
        <WdButton variant="primary" loading>提交中</WdButton>
        <WdButton variant="tint" loading loading-text="保存中…">保存</WdButton>
        <WdButton variant="dark" :loading="loading" @click="fakeSubmit">
          点我加载 1.5s
        </WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="图标与文字"
      desc="图标走 WdIcon，颜色继承 currentColor；图标与文字的 8px 间距由按钮自己给，别在文案里补空格或给图标加 margin"
    >
      <DemoRow>
        <WdButton variant="primary">
          <WdIcon name="plus" :size="16" />新建
        </WdButton>
        <WdButton variant="tint">
          <WdIcon name="download" :size="16" />下载
        </WdButton>
        <WdButton variant="ghost">
          <WdIcon name="dots-horizontal" :size="16" />更多
        </WdButton>
        <WdButton variant="dark" size="sm">
          <WdIcon name="share" :size="14" />分享
        </WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="点击与禁用"
      desc="禁用按钮是 pointer-events: none，连 click 都不派发 —— 所以计数不会涨。别把权限判断写在 click 里靠 disabled 拦，它根本不进来"
    >
      <DemoRow>
        <WdButton variant="primary" @click="hit('主按钮')">点我 +1</WdButton>
        <WdButton variant="tint" @click="hit('次级按钮')">这个也算</WdButton>
        <WdButton variant="primary" disabled @click="hit('禁用按钮')">
          禁用：点了不动
        </WdButton>
      </DemoRow>
      <p class="cap">点击 {{ hits }} 次 · 最近一次：{{ lastAction }}</p>
    </DemoBlock>

    <DemoBlock
      title="表单里的提交"
      desc="type 默认是 button，放进 form 也不会提交；要触发原生提交、回车提交和浏览器校验，必须显式写 type=submit"
    >
      <form class="form" @submit.prevent="onSubmit">
        <WdInput v-model="projectName" placeholder="项目名称" />
        <WdButton type="submit" variant="primary">创建项目</WdButton>
      </form>
      <p class="cap">{{ submitted }}</p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.cap {
  margin: 0;
  font-size: var(--wd-fs-sm);
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
