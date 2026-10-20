<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdCard, WdMarkdown } from "@wdesign";

/** 完整语法样本：标题 / 段落 / 列表 / 表格 / 代码块 / 引用 / 行内元素 */
const sample = `# 支持哪些语法

**WdMarkdown** 自带一个零依赖解析器，不引 marked 与 markdown-it —— 渲染说明文字够用，也不必为 30KB 的 parser 付代价。

## 段落与行内元素

行内可以 **加粗**、*斜体*、~~删除线~~、行内代码 \`const a = 1\`，也可以给 [这套演示站](#/button) 挂链接。

> 所有文本都会过一遍 escapeHtml()，所以用户或 AI 生成的内容可以直接丢进来渲染。

## 列表

- 无序列表：标题、段落、引用、分割线
- 表格、图片、自动链接裸 URL

1. 先在 source 里写 Markdown
2. 需要完整的 CommonMark，就把渲染结果走 html 传进来

## 表格

| 能力 | 实现方式 | 状态 |
|:---|:---:|---:|
| 零依赖 | 自研行扫描状态机 | 已支持 |
| 安全转义 | escapeHtml 全量过滤 | 已支持 |
| 内嵌 HTML 块 | 不解析，有意为之 | 不计划 |

## 代码块

\`\`\`sh
pnpm --filter @w-run/wdesign-demo dev
\`\`\`
`;

/** flush 演示：内容更短，重点看左右留白交给外层卡片 */
const cardNote = `### 发布说明

- 阴影阶梯收敛为 sm / default / hover / pop / lg
- 深色主题下的正文对比度提到 7:1
- 图标按惯性半径重新归一一轮
`;

/** html 演示：模拟已经过外部管线的渲染结果 */
const renderedHtml = [
  "<h3>来自外部管线</h3>",
  "<p>这段 HTML 由 <code>marked</code> 加自定义插件产出，<strong>WdMarkdown 只负责套上排版类名</strong>，不会再解析一遍。</p>",
  "<ul>",
  "<li>插件产出的自定义块、脚注、任务列表都能原样落地</li>",
  "<li>代价是安全责任回到调用方：注入之前必须自己消毒</li>",
  "</ul>",
].join("");

/* ---------- source 变化 → 重新解析 ---------- */

const draftHead = "# 今日草稿\n\n";
const draftBody =
  "把 `--wd-shadow-*` 阶梯统一成五档之后，hover 不再是孤例。\n\n- 卡片用 shadow-sm\n- 弹层用 shadow-pop\n- 开关旋钮用 shadow-knob\n";

const draft = ref(draftHead);
let timer: number | null = null;

function stopTyping() {
  if (timer !== null) {
    window.clearInterval(timer);
    timer = null;
  }
}

function startTyping() {
  stopTyping();
  const target = draftHead + draftBody;
  if (draft.value.length >= target.length) return;
  timer = window.setInterval(() => {
    draft.value = target.slice(0, draft.value.length + 2);
    if (draft.value.length >= target.length) stopTyping();
  }, 70);
}

function resetTyping() {
  stopTyping();
  draft.value = draftHead;
}

onBeforeUnmount(stopTyping);
</script>

<template>
  <DemoPage
    name="Markdown"
    desc="Markdown 渲染：内置零依赖解析器 · 全量转义 · 也接受外部渲染好的 HTML"
  >
    <DemoBlock
      title="内置解析器"
      desc="source 交给自研解析器，标题、列表、表格、代码块、引用、行内强调都在覆盖范围内；超出覆盖范围就换 html 方案"
    >
      <WdMarkdown :source="sample" />
    </DemoBlock>

    <DemoBlock
      title="flush：嵌进已带内距的容器"
      desc="flush 把组件自身的左右内距清零，留白全部交给外层卡片；现在默认内距是 0，先把写法固定下来，将来组件调整默认值也不会突然多出一层"
    >
      <WdCard padding="lg">
        <WdMarkdown flush :source="cardNote" />
      </WdCard>
    </DemoBlock>

    <DemoBlock
      title="html：接自己的渲染管线"
      desc="传了 html 就完全跳过内置解析，字符串里的标签会原样注入 —— 只用于已消毒、可信的内容"
    >
      <WdMarkdown :html="renderedHtml" />
    </DemoBlock>

    <DemoBlock
      title="source 变化即刻重渲染"
      desc="解析结果跟着 source 走，适合写完一段渲染一段的草稿场景；逐字追加时排版不跳"
    >
      <DemoRow>
        <WdButton variant="tint" size="sm" @click="startTyping">继续写入</WdButton>
        <WdButton variant="ghost" size="sm" @click="resetTyping">清空重来</WdButton>
      </DemoRow>
      <WdMarkdown :source="draft" />
    </DemoBlock>
  </DemoPage>
</template>
