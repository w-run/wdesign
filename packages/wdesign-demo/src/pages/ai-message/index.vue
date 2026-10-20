<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { toast, WdAiMessage, WdButton } from "@wdesign";

/* ---------- 深度思考：展开与收起 ---------- */

const thinkOpen = {
  reasoning:
    "先分清用户问的是哪一层：命名属于规范问题，改一次就永久收敛；深色主题下的对比度属于取值问题，得逐个令牌补。两件事混在一起答，对方会把「重命名」当成修对比度的手段。结论放前面，再给例子。",
  content:
    "分两类处理。命名是规范问题，收敛到一处就结束了；深色主题对比度不足是取值问题，得逐个令牌调到 7:1 以上。别用重命名去解对比度，那只是把问题藏起来。",
};

const thinkClosed = {
  reasoning:
    "对方只贴了图，没给令牌名。直接回「我这边看正常」没有意义，先要到令牌名和截图位置，才能判断是覆盖顺序还是取值本身的问题。",
  content:
    "麻烦补两样东西：这张图对应页面的令牌名，以及深色模式下的截图。没有具体令牌名，我只能猜是覆盖顺序的问题。",
};

/* ---------- 内置流式：streaming + speed ---------- */

const streamContent =
  "接进聊天页时，正文交给 streaming，思考过程交给 reasoningStreaming，两条流互不干扰，推进速度都用 speed 控制。全部吐完会 emit 一个 stream-end。";

const streaming = ref(true);
const streamNote = ref("");

async function replayStream() {
  streamNote.value = "";
  streaming.value = false;
  await nextTick();
  streaming.value = true;
}

function onStreamEnd() {
  streamNote.value = "stream-end 到了，正文已吐完";
}

/* ---------- 外部驱动：thinking → 思考 → 正文 ---------- */

type Phase = "idle" | "thinking" | "reasoning" | "answer" | "done";

const phase = ref<Phase>("thinking");
const reasoning = ref("");
const answer = ref("");

const thinking = computed(() => phase.value === "thinking");
const reasoningStreaming = computed(() => phase.value === "reasoning");

const phaseText: Record<Phase, string> = {
  idle: "还没开始",
  thinking: "thinking：三点脉动，还没产出思考内容",
  reasoning: "reasoningStreaming：思考逐字吐字",
  answer: "正文到达，思考面板可随时点标题收起",
  done: "一轮结束，可再点一次重放",
};

let timers: number[] = [];

function clearTimers() {
  timers.forEach((t) => window.clearTimeout(t));
  timers = [];
}

const finalAnswer =
  "抖动的根因是标签行：没有标签时 margin-top 不生效，整行矮了 0.75rem。给标签容器留固定最小高度，或者把这段留白改成容器的 padding，行高就稳住了。";

/** 正文落地：由 reasoning-end 触发，也能被兜底定时器直接调用 */
function landAnswer() {
  phase.value = "answer";
  answer.value = finalAnswer;
  timers.push(
    window.setTimeout(() => {
      phase.value = "done";
    }, 300),
  );
}

/** 思考流吐完 → 等一拍再让正文到达，这就是真实产品里的时序 */
function onReasoningEnd() {
  if (phase.value !== "reasoning") return;
  clearTimers();
  timers.push(window.setTimeout(landAnswer, 400));
}

function runRound() {
  clearTimers();
  phase.value = "thinking";
  reasoning.value = "";
  answer.value = "";

  timers.push(
    window.setTimeout(() => {
      phase.value = "reasoning";
      reasoning.value =
        "先定位行高从哪来：标题 17px 配 1.45 行高，摘要固定两行截断，标签行靠 margin-top 撑开。三个值里任何一个跟着数据变，行高就会跳。真正在变的是标签行 —— 没有标签时那段外边距根本不生效。";
    }, 1000),
  );

  // 兜底：思考流万一没跑完（比如被外部改稿打断），八秒后也把正文放出来
  timers.push(
    window.setTimeout(() => {
      if (phase.value === "reasoning") landAnswer();
    }, 8000),
  );
}

onMounted(runRound);
onBeforeUnmount(clearTimers);

/* ---------- 操作按钮回显 ---------- */

const lastAction = ref("");

function onAction(label: string) {
  lastAction.value = label;
  toast(`收到 action 事件：${label}`);
}
</script>

<template>
  <DemoPage
    name="AiMessage"
    desc="AI 消息：深度思考 · 流式正文 · 外部驱动 · 用户气泡 · 操作按钮"
  >
    <DemoBlock :span="2"
      title="普通问答"
      desc="只给 content 就是最简气泡，AI 在左；不带思考内容时不占思考区的空间"
    >
      <WdAiMessage
        content="这个月的构建失败有三次，都出在图标包：两次是新增图标文件名带下划线，和 registry 的键名对不上；一次是光学归一脚本漏扫了 filled 目录。建议在 CI 里加一条文件名正则检查。"
      />
      <WdAiMessage
        content="补充一句：正则只查新增文件即可，历史文件已经全量对齐过一轮，不必重复扫。"
      />
    </DemoBlock>

    <DemoBlock :span="2"
      title="深度思考面板"
      desc="reasoning 是独立折叠区，正文不受它影响；defaultReasoningOpen 决定初始展开，收起后点标题可以再打开"
    >
      <WdAiMessage
        :reasoning="thinkOpen.reasoning"
        :content="thinkOpen.content"
      />
      <WdAiMessage
        :reasoning="thinkClosed.reasoning"
        :content="thinkClosed.content"
        :default-reasoning-open="false"
      />
    </DemoBlock>

    <DemoBlock :span="2"
      title="内置流式输出"
      desc="streaming 打开后按 speed 每字符推进一次，最小 8 毫秒；吐完 emit stream-end，外层可以据此收起加载态"
    >
      <DemoRow>
        <WdButton variant="tint" size="sm" @click="replayStream">重新流式一次</WdButton>
        <span class="demo-val">{{ streamNote || "（进来就会自动流一遍）" }}</span>
      </DemoRow>
      <WdAiMessage
        :content="streamContent"
        :speed="16"
        :streaming="streaming"
        @stream-end="onStreamEnd"
      />
    </DemoBlock>

    <DemoBlock :span="2"
      title="外部驱动完整一轮"
      desc="先 thinking 三点脉动，再 reasoningStreaming 吐思考；思考吐完 emit reasoning-end，外层收到后才把正文写进 content —— 时序由调用方定，组件只负责表现"
    >
      <DemoRow>
        <WdButton variant="ghost" size="sm" @click="runRound">重新走一轮</WdButton>
        <span class="demo-val">{{ phaseText[phase] }}</span>
      </DemoRow>
      <WdAiMessage
        :content="answer"
        :reasoning="reasoning"
        :thinking="thinking"
        :reasoning-streaming="reasoningStreaming"
        :speed="18"
        @reasoning-end="onReasoningEnd"
      />
    </DemoBlock>

    <DemoBlock :span="2"
      title="用户侧消息与操作按钮"
      desc="self 让气泡靠右、头像换成深色；actions 每点一下 emit action(label)，回显和后续动作都留给外层"
    >
      <WdAiMessage self content="帮我把上周的发布说明压成三句话，要能给老板看的那种。" />
      <WdAiMessage
        content="上周三条：阴影阶梯收敛成五档，hover 不再是孤例；深色主题正文对比度提到 7:1；图标包新增 12 枚，全部按惯性半径归一。"
        :actions="[
          { label: '采纳', variant: 'primary' },
          { label: '再压一句', variant: 'tint' },
          { label: '复制' },
        ]"
        @action="onAction"
      />
      <p class="demo-val">最近操作：{{ lastAction || "（还没点按钮）" }}</p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.demo-val {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
