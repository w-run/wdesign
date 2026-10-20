<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdPostItem } from "@wdesign";

/** 卡片形态：emoji 当视觉锚点，标签收尾 */
const posts = [
  {
    title: "把设计令牌收进一个地方",
    summary: "颜色、阴影、圆角、动效曲线全部收敛到 --wd-* 变量，换主题只需要动一层。",
    tags: ["设计系统", "CSS 变量"],
    emoji: "🎨",
  },
  {
    title: "为什么阴影要分五档",
    summary: "sm / default / hover / pop / lg 表达的是层级关系，不是随手挑的模糊值。",
    tags: ["视觉规范"],
    emoji: "🪜",
  },
];

/** 只有标题也能成条目 */
const minimal = [
  { title: "本周新增 12 枚图标，全部按惯性半径归一" },
  { title: "组件检查器补上「事件名必须 kebab-case」一条" },
];

/** 可点击：href 一给，整块变成链接 */
const linked = [
  {
    title: "WdMarkdown 的内置解析器是怎么写的",
    summary: "行扫描状态机加全量转义，够用且不引第三方依赖。",
    tags: ["实现笔记"],
    emoji: "📝",
    href: "#/markdown",
  },
  {
    title: "AI 消息组件的三条流：正文、思考、操作",
    summary: "把流式状态交给外层控制，组件只负责表现。",
    tags: ["组件设计"],
    emoji: "🤖",
    href: "#/ai-message",
  },
];

/** 长摘要：固定两行截断 */
const longOne = {
  title: "发布前要过的十项检查",
  summary:
    "从令牌命名到深色主题对比度，再到检查器自身的「注入错误验证」，这份清单是每次发版前必须逐条勾掉的。清单里最容易被跳过的是第七条 —— 修完检查器要故意写一个已知错误，确认它仍然会失败，否则检查器放水了你也不知道。另外两条常被忽略的是：npm 官方源要等到可用、npmmirror 只戳一次不等待。",
  tags: ["发布流程", "检查器"],
};
</script>

<template>
  <DemoPage name="PostItem" desc="文章条目：标题 · 摘要 · 标签 · emoji · 链接">
    <DemoBlock
      title="基础卡片"
      desc="默认就是卡片形态，圆角加单层阴影；emoji 固定在标题前当视觉锚点，同列表里节奏一致"
    >
      <WdPostItem v-for="p in posts" :key="p.title" v-bind="p" />
    </DemoBlock>

    <DemoBlock
      title="最简形态"
      desc="summary 与 tags 都可以不给，只留标题时条目自动收窄，不会留下空洞的段落间距"
    >
      <WdPostItem v-for="p in minimal" :key="p.title" :title="p.title" />
    </DemoBlock>

    <DemoBlock
      title="可点击条目"
      desc="传了 href 就渲染成 a 标签，整块可点，hover 上浮两像素并给标题上色"
    >
      <WdPostItem v-for="p in linked" :key="p.title" v-bind="p" />
    </DemoBlock>

    <DemoBlock
      title="长摘要截断"
      desc="summary 固定两行后省略号截断，列表高度不会被长短不一的文案撑散"
    >
      <WdPostItem v-bind="longOne" />
    </DemoBlock>
  </DemoPage>
</template>
