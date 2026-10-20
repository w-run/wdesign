<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdCard, WdIcon, WdSpace, WdTag } from "@wdesign";
</script>

<template>
  <DemoPage
    name="Space"
    desc="间距容器：档位与像素 · 方向 · 两端对齐 · 等分 · 换行 · 居中 · 卡片内组合"
  >
    <DemoBlock title="间距档位" desc="间距只取固定的三档，页面里就不会出现八种不同的间隔">
      <WdSpace size="sm">
        <WdTag variant="gray">sm</WdTag>
        <WdTag variant="gray">紧凑</WdTag>
        <WdTag variant="gray">8px</WdTag>
      </WdSpace>
      <WdSpace size="md">
        <WdTag variant="gray">md</WdTag>
        <WdTag variant="gray">默认</WdTag>
        <WdTag variant="gray">12px</WdTag>
      </WdSpace>
      <WdSpace size="lg">
        <WdTag variant="gray">lg</WdTag>
        <WdTag variant="gray">宽松</WdTag>
        <WdTag variant="gray">24px</WdTag>
      </WdSpace>
      <WdSpace :size="4">
        <WdTag variant="gray">数字</WdTag>
        <WdTag variant="gray">直接给像素 4px</WdTag>
      </WdSpace>
    </DemoBlock>

    <DemoBlock title="纵向排列" desc="direction 为 col 时用于表单里的一串控件，间距语义不变">
      <WdSpace direction="col" size="sm">
        <WdButton variant="tint" size="sm">第一项</WdButton>
        <WdButton variant="tint" size="sm">第二项</WdButton>
        <WdButton variant="tint" size="sm">第三项</WdButton>
      </WdSpace>
    </DemoBlock>

    <DemoBlock title="两端对齐" desc="标题与操作分列两侧，比各自写 margin 更稳，父级宽度变了也不用改">
      <WdSpace between class="fill">
        <span class="title">本周任务</span>
        <WdTag size="sm" variant="gray">共 12 条</WdTag>
      </WdSpace>
    </DemoBlock>

    <DemoBlock title="子项等分" desc="grow 让每个子项 flex 拉伸，宽度由容器决定，不需要手算百分比">
      <WdSpace grow class="fill">
        <WdCard padding="sm">等分一</WdCard>
        <WdCard padding="sm">等分二</WdCard>
        <WdCard padding="sm">等分三</WdCard>
      </WdSpace>
    </DemoBlock>

    <DemoBlock title="换行" desc="wrap 在容器变窄时自动折行，标签墙和筛选条件必须打开它">
      <WdSpace wrap size="sm" class="wrap-box">
        <WdTag>设计系统</WdTag>
        <WdTag variant="gray">组件库</WdTag>
        <WdTag>样式令牌</WdTag>
        <WdTag variant="gray">可访问性</WdTag>
        <WdTag>暗色模式</WdTag>
        <WdTag variant="gray">国际化</WdTag>
      </WdSpace>
    </DemoBlock>

    <DemoBlock
      title="居中"
      desc="center 同时居中主轴与交叉轴，空状态、占位图这类两三行的内容用它最省事；它只管子项，盒子本身的高度还得自己给"
    >
      <div class="center-box">
        <WdSpace direction="col" center class="fill">
          <WdIcon name="search" :size="20" />
          <span class="hint">没有匹配的结果</span>
        </WdSpace>
      </div>
    </DemoBlock>

    <DemoBlock
      title="一张卡里的三段"
      desc="头部两端对齐、清单纵向、按钮横排，三段都用 Space 组织：间隙全走档位，卡片高度不会因为某个手写 margin 忽高忽低"
    >
      <WdCard>
        <WdSpace between class="fill">
          <span class="title">本周任务</span>
          <WdTag size="sm" variant="gray">共 12 条</WdTag>
        </WdSpace>
        <WdSpace direction="col" size="sm" class="fill stack">
          <span class="row">周一 · 组件评审</span>
          <span class="row">周三 · 令牌对齐</span>
          <span class="row">周五 · 版本发布</span>
        </WdSpace>
        <WdSpace size="sm" class="fill">
          <WdButton variant="ghost" size="sm">稍后处理</WdButton>
          <WdButton variant="primary" size="sm">全部完成</WdButton>
        </WdSpace>
      </WdCard>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.fill {
  width: 100%;
}

.title {
  font-size: 14px;
  font-weight: 700;
  color: var(--wd-ink);
}

.wrap-box {
  max-width: 260px;
  padding: 12px;
  border-radius: var(--wd-radius-md);
  background: var(--wd-field);
}

.center-box {
  display: flex;
  height: 130px;
  border-radius: var(--wd-radius-md);
  background: var(--wd-field);
}

.hint {
  font-size: var(--wd-fs-caption);
  color: var(--wd-ink-2);
}

.stack {
  margin: 16px 0;
}

.row {
  font-size: var(--wd-fs-caption);
  color: var(--wd-ink-2);
}
</style>
