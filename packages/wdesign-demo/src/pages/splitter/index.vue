<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdSplitter } from "@wdesign";

/** 受控：主栏百分比由父级持有，可持久化到 URL 或 localStorage */
const ratio = ref(38);
/** 非受控：只给初值，组件自己记 */
const liveRatio = ref(50);
const finalRatio = ref(50);

function onResize(v: number) {
  liveRatio.value = v;
}

function onResizeEnd(v: number) {
  finalRatio.value = v;
}
</script>

<template>
  <DemoPage name="Splitter" desc="分栏：横向 · 纵向 · 边界限制 · 非受控初值">
    <DemoBlock
      title="横向分栏"
      desc="左右分栏必须给容器明确高度，否则容器塌成 0、分隔条拖不动；v-model 拿到的是主栏百分比"
    >
      <div class="stage stage--md">
        <WdSplitter v-model="ratio">
          <template #first>
            <div class="pane">文件树 · {{ Math.round(ratio) }}%</div>
          </template>
          <template #second>
            <div class="pane pane--alt">编辑器 · {{ Math.round(100 - ratio) }}%</div>
          </template>
        </WdSplitter>
      </div>
    </DemoBlock>

    <DemoBlock
      title="纵向分栏"
      desc="direction 换成 vertical 即上下分栏，键盘上下箭头同样可调，双击分隔条回到初值"
    >
      <div class="stage stage--lg">
        <WdSplitter direction="vertical" :default-value="45">
          <template #first>
            <div class="pane">查询结果</div>
          </template>
          <template #second>
            <div class="pane pane--alt">执行计划 · 扫描 12 万行</div>
          </template>
        </WdSplitter>
      </div>
    </DemoBlock>

    <DemoBlock
      title="边界与粗细"
      desc="min / max 会夹住拖拽范围，避免把某一栏挤到不可读；size 加大命中区，disabled 整体锁死"
    >
      <div class="stage stage--md">
        <WdSplitter :default-value="30" :min="25" :max="60" :size="10">
          <template #first>
            <div class="pane">侧栏（最小 25%）</div>
          </template>
          <template #second>
            <div class="pane pane--alt">主区（最大 60% 给侧栏）</div>
          </template>
        </WdSplitter>
      </div>
      <div class="stage stage--sm">
        <WdSplitter :default-value="50" disabled>
          <template #first>
            <div class="pane">禁用态</div>
          </template>
          <template #second>
            <div class="pane pane--alt">拖不动，但内容照常滚动</div>
          </template>
        </WdSplitter>
      </div>
    </DemoBlock>

    <DemoBlock
      title="非受控与事件"
      desc="不传 modelValue 时用 defaultValue 起手，组件内部持值；resize 用于实时预览，resizeEnd 适合落库"
    >
      <div class="stage stage--md">
        <WdSplitter
          :default-value="30"
          @resize="onResize"
          @resize-end="onResizeEnd"
        >
          <template #first>
            <div class="pane">预览区</div>
          </template>
          <template #second>
            <div class="pane pane--alt">属性面板</div>
          </template>
        </WdSplitter>
      </div>
      <p class="hint">
        拖拽中：{{ Math.round(liveRatio) }}% · 松手后落库：{{ Math.round(finalRatio) }}%
      </p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.stage {
  overflow: hidden;
  border-radius: var(--wd-radius-lg);
  background: var(--wd-field);
}

.stage--sm {
  height: 120px;
}

.stage--md {
  height: 240px;
}

.stage--lg {
  height: 320px;
}

.pane {
  display: grid;
  height: 100%;
  place-items: center;
  font-size: 13px;
  color: var(--wd-ink-2);
}

.pane--alt {
  background: var(--wd-tint-1);
}

.hint {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}
</style>
