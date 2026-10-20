<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdDrawer, WdButton } from "@wdesign";

const right = ref(false);
const left = ref(false);
const locked = ref(false);
</script>

<template>
  <DemoPage name="Drawer" desc="抽屉：左右两侧 · 受控开关 · 底部操作区">
    <DemoBlock title="右侧（默认）" desc="从右侧滑出是主流程的默认方向：查看详情、编辑表单都走它">
      <DemoRow>
        <WdButton variant="primary" @click="right = true">打开右侧抽屉</WdButton>
      </DemoRow>
      <WdDrawer v-model="right" title="订单详情">
        <p>默认插槽是正文区，长内容自行滚动。</p>
        <p>底部操作区用 #footer 插槽，不放就没有这一条。</p>
        <template #footer>
          <WdButton variant="tint" size="sm" @click="right = false">关闭</WdButton>
          <WdButton variant="primary" size="sm" @click="right = false">去处理</WdButton>
        </template>
      </WdDrawer>
    </DemoBlock>

    <DemoBlock title="左侧" desc="side 取 left 时从左边滑出，适合导航性质的次级内容，不和右侧主流程抢位置">
      <DemoRow>
        <WdButton variant="tint" @click="left = true">打开左侧抽屉</WdButton>
      </DemoRow>
      <WdDrawer v-model="left" title="筛选条件" side="left">
        <p>左侧抽屉只用于「切换视图」这类轻操作，不要放需要按顺序填写的长表单。</p>
      </WdDrawer>
    </DemoBlock>

    <DemoBlock
      title="点遮罩不关闭"
      desc="closeOnMask=false 防止误触丢内容；此时用右上角关闭按钮或 Esc 退出"
    >
      <DemoRow>
        <WdButton variant="dark" @click="locked = true">打开不可点遮罩关闭的抽屉</WdButton>
      </DemoRow>
      <WdDrawer v-model="locked" title="编辑中" :close-on-mask="false">
        <p>点遮罩不会关，正是为了不让填了一半的表单被误关。</p>
        <template #footer>
          <WdButton variant="primary" size="sm" @click="locked = false">保存并关闭</WdButton>
        </template>
      </WdDrawer>
    </DemoBlock>
  </DemoPage>
</template>
