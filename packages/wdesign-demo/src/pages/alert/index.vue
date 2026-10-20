<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdAlert, WdButton } from "@wdesign";

/** closable 的关闭是组件内部状态，重挂载才能再演示一次，所以用 v-if 控制 */
const closableAlive = ref(true);
const lastClose = ref("");

function onClose() {
  closableAlive.value = false;
  lastClose.value = "已触发 close 事件";
}
</script>

<template>
  <DemoPage name="Alert" desc="提示条：四种语气 · 标题与描述 · 可关闭">
    <DemoBlock title="四种语气" desc="variant 表达的是「语气的轻重」，不是颜色偏好，按信息性质选">
      <WdAlert
        variant="info"
        title="版本已更新"
        description="本次更新包含 6 个组件的行为修正，刷新后生效。"
      />
      <WdAlert
        variant="success"
        title="发布成功"
        description="wdesign-ui 1.4.0 已推送到公共源。"
      />
      <WdAlert
        variant="warning"
        title="令牌即将到期"
        description="访问令牌还有 3 天过期，请及时轮换。"
      />
      <WdAlert
        variant="danger"
        title="构建失败"
        description="packages/icons 有 2 个 SVG 未通过校验，详见构建日志。"
      />
    </DemoBlock>

    <DemoBlock title="标题与描述的组合" desc="只有标题时信息密度最高，长说明再补 description">
      <DemoRow align="flex-start">
        <WdAlert variant="success" title="仅标题：适合一句话结论" />
      </DemoRow>
      <WdAlert variant="info" description="没有标题时直接用 description，适合页面顶部的轻量说明。" />
      <WdAlert variant="warning" title="默认插槽">
        插槽里的内容同样渲染在描述区，可以放<strong>富文本</strong>或行内标签。
      </WdAlert>
    </DemoBlock>

    <DemoBlock title="可关闭" desc="closable 只是隐藏自身并抛出 close 事件，状态要不要持久化由调用方决定">
      <WdAlert
        v-if="closableAlive"
        variant="info"
        title="这条可以关掉"
        description="点右侧关闭按钮，会触发 close 事件。"
        closable
        @close="onClose"
      />
      <DemoRow v-else>
        <WdButton variant="tint" size="sm" @click="closableAlive = true">重新显示</WdButton>
        <span>{{ lastClose }}</span>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
