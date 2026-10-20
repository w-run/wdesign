<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { toast, WdButton } from "@wdesign";

const LONG_TEXT =
  "已把 12 个组件从旧目录迁到 packages/wdesign-ui/src/components，构建产物路径保持不变，消费方无需改 import。";

/** 一次连发 5 条：容器最多留 4 条，最旧的那条会被挤掉 */
function fireBatch() {
  for (let i = 1; i <= 5; i++) {
    toast(`第 ${i} 条提示`, { duration: 4000 });
  }
}
</script>

<template>
  <DemoPage name="Toast" desc="轻提示：命令式调用 · 四种语气 · 时长可控 · 最多堆 4 条">
    <DemoBlock title="最简调用" desc="toast() 是命令式函数，不占模板位置；默认 2400ms 后自动消失，点一下可提前关闭">
      <DemoRow>
        <WdButton variant="primary" @click="toast('已保存')">toast('已保存')</WdButton>
        <WdButton variant="tint" @click="toast('已复制到剪贴板')">再试一条</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="四种语气" desc="success / warning / danger / info 是 toast 上的方法，比手写 { type } 更省事">
      <DemoRow>
        <WdButton variant="tint" @click="toast.info('已切换到只看未读')">info</WdButton>
        <WdButton variant="primary" @click="toast.success('部署成功')">success</WdButton>
        <WdButton variant="tint" @click="toast.warning('存储空间将满')">warning</WdButton>
        <WdButton variant="dark" @click="toast.danger('同步失败，请重试')">danger</WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="时长" desc="duration 按毫秒传，读得慢的长文案要给足时间，默认的 2400ms 只够一句短话">
      <DemoRow>
        <WdButton variant="ghost" size="sm" @click="toast('0.8 秒就消失', { duration: 800 })">
          短 · 800ms
        </WdButton>
        <WdButton variant="ghost" size="sm" @click="toast(LONG_TEXT, { duration: 6000 })">
          长文案 · 6000ms
        </WdButton>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="堆叠上限" desc="连续触发不会无限堆高：容器最多保留 4 条，最旧的先退场，避免遮住操作区">
      <DemoRow>
        <WdButton variant="tint" @click="fireBatch">连发 5 条</WdButton>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
