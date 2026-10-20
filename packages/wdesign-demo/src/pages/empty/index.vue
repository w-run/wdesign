<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdEmpty, WdIcon } from "@wdesign";
</script>

<template>
  <DemoPage name="Empty" desc="空状态：基础 · 自定义图标 · 操作引导 · 业务场景">
    <DemoBlock
      title="基础"
      desc="title 给结论，description 给原因或下一步；只有标题没有说明时，用户仍然不知道该干什么"
    >
      <WdEmpty title="暂无数据" />
      <WdEmpty
        title="还没有任何构建记录"
        description="推送代码到 release 分支后，构建会自动出现在这里"
      />
    </DemoBlock>

    <DemoBlock
      title="自定义图标"
      desc="icon 插槽换成与场景相关的图标，比统一的空文件夹更早传达「这是搜索无结果还是没权限」"
    >
      <DemoRow :gap="32" align="flex-start">
        <WdEmpty title="没有匹配的订单">
          <template #icon>
            <WdIcon name="search" :size="30" />
          </template>
        </WdEmpty>
        <WdEmpty title="文件已清空">
          <template #icon>
            <WdIcon name="folder-open" :size="30" />
          </template>
        </WdEmpty>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="操作引导"
      desc="action 插槽放唯一的主行动；空状态最忌同时给三四个按钮，用户会直接关页面"
    >
      <WdEmpty title="团队里还没有成员" description="邀请同事加入后即可共同维护组件与文档">
        <template #action>
          <WdButton variant="primary" size="sm">邀请成员</WdButton>
        </template>
      </WdEmpty>
    </DemoBlock>

    <DemoBlock
      title="description 插槽"
      desc="需要分点说明或带链接时用 description 插槽，比拼接一长串字符串更可控"
    >
      <WdEmpty title="无法查看该报表">
        <template #icon>
          <WdIcon name="shield" :size="30" />
        </template>
        <template #description>
          <p class="tip">当前角色只有「只读」权限。</p>
          <p class="tip">请联系项目管理员开通「财务」角色后重试。</p>
        </template>
        <template #action>
          <WdButton variant="tint" size="sm">申请权限</WdButton>
        </template>
      </WdEmpty>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.tip {
  margin: 0 0 4px;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--wd-ink-2);
}
</style>
