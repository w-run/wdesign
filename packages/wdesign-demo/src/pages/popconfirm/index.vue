<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdPopconfirm, WdButton } from "@wdesign";

const lastAction = ref("尚未操作");

function onConfirm(what: string) {
  lastAction.value = `${what}：已确认`;
}

function onCancel(what: string) {
  lastAction.value = `${what}：已取消`;
}
</script>

<template>
  <DemoPage name="Popconfirm" desc="气泡确认：删除二次确认 · 语气 · 方位 · 禁用态">
    <DemoBlock
      title="删除二次确认"
      desc="危险操作默认走 danger 语气并把「确定」换成语义明确的动词，减少误点"
    >
      <DemoRow>
        <WdPopconfirm
          variant="danger"
          title="删除这条记录？"
          description="删除后不可恢复，关联的 3 条评论会一并清除。"
          ok-text="删除"
          cancel-text="再想想"
          placement="bottom"
          @confirm="onConfirm('删除记录')"
          @cancel="onCancel('删除记录')"
        >
          <WdButton variant="dark" size="sm">删除</WdButton>
        </WdPopconfirm>
        <span>{{ lastAction }}</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="普通确认" desc="非破坏性操作用默认语气，标题写清楚「做什么」，别只写「确定？」">
      <DemoRow>
        <WdPopconfirm
          title="把草稿发布到生产环境？"
          description="发布会立即对全部用户可见。"
          ok-text="发布"
          placement="top"
          @confirm="onConfirm('发布')"
          @cancel="onCancel('发布')"
        >
          <WdButton variant="primary" size="sm">发布</WdButton>
        </WdPopconfirm>
        <WdPopconfirm
          title="退出编辑？"
          ok-text="退出"
          cancel-text="继续编辑"
          placement="top"
          @confirm="onConfirm('退出编辑')"
          @cancel="onCancel('退出编辑')"
        >
          <WdButton variant="tint" size="sm">退出</WdButton>
        </WdPopconfirm>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="宽度" desc="description 较长时把 width 放到 280–320，240 会挤成三四行">
      <DemoRow>
        <WdPopconfirm
          :width="300"
          title="归档整个项目？"
          description="归档后项目只读，成员不能再提交，但历史记录与附件都会保留。"
          ok-text="归档"
          placement="bottom"
          @confirm="onConfirm('归档项目')"
          @cancel="onCancel('归档项目')"
        >
          <WdButton variant="tint" size="sm">归档</WdButton>
        </WdPopconfirm>
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="禁用" desc="disabled 时点击触发器不弹气泡，用于权限不足或前置条件未满足">
      <DemoRow>
        <WdPopconfirm disabled title="确定要删除吗？" @confirm="onConfirm('禁用态')">
          <WdButton variant="tint" size="sm" disabled>无权限删除</WdButton>
        </WdPopconfirm>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
