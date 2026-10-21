<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdAvatar, WdAvatarGroup, WdTag } from "@wdesign";

/**
 * 头像组的数据必须走 ref —— 之前直接写在模板里（`:names="[林小满, …]"`），
 * 中文没加引号，被当成标识符求值成 undefined，
 * 头像组于是渲染出一排「?」：不报错、不告警，只是全错。
 */
const members = ["林小满", "王一舟", "周可", "李默", "赵雪"];
const duo = ["林小满", "王一舟"];
const crowd = ["林小满", "王一舟", "周可", "李默", "赵雪", "陈原", "孙见", "吴笛"];
const nobody: string[] = [];

/** 成员条目：头像 + 名字 + 角色标签，列表里最常见的一行 */
const people = [
  { name: "林小满", role: "设计系统 · 维护者", tag: "管理员" },
  { name: "王一舟", role: "前端工程 · 组件", tag: "成员" },
  { name: "周可", role: "文档与示例", tag: "成员" },
];
</script>

<template>
  <DemoPage
    name="Avatar"
    desc="头像与头像组：自动配色 · 四档色相 · 尺寸档位 · 堆叠折叠 · 占位与空数据"
  >
    <DemoBlock title="自动配色" desc="不指定 tone 时按名称哈希取色，同一名字颜色稳定">
      <DemoRow :gap="12">
        <WdAvatar name="林小满" />
        <WdAvatar name="王一舟" />
        <WdAvatar name="周可" />
        <WdAvatar name="李默" />
        <WdAvatar name="赵雪" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="明度档位"
      desc="6 组低饱和淡彩（蓝/绿/琥珀/玫/紫/青），底与文字同色相；tone 0（默认）= 按名字哈希稳定分配，同一个人永远同色"
    >
      <DemoRow :gap="12">
        <WdAvatar name="甲" :tone="1" />
        <WdAvatar name="乙" :tone="2" />
        <WdAvatar name="丙" :tone="3" />
        <WdAvatar name="丁" :tone="4" />
        <WdAvatar name="戊" :tone="5" />
        <WdAvatar name="己" :tone="6" />
        <WdAvatar name="深" dark />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="尺寸"
      desc="只有 sm / md / lg 三档 —— 尺寸由令牌决定，不接受任意像素值"
    >
      <DemoRow :gap="12" align="flex-end">
        <WdAvatar name="小" size="sm" />
        <WdAvatar name="中" size="md" />
        <WdAvatar name="大" size="lg" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock title="头像组" desc="max 控制最多显示几个，其余折叠成 +N">
      <DemoRow :gap="12">
        <WdAvatarGroup :names="members" :max="3" />
        <WdAvatarGroup :names="duo" :max="5" />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="首字符与占位"
      desc="组件取名字第一个字符，英文名同样只取一个字母；名字为空时回落成问号 —— 列表里冒出「?」说明数据缺名字，不是这里的默认样式"
    >
      <DemoRow :gap="12" align="center">
        <WdAvatar />
        <WdAvatar name="Linus" />
        <WdAvatar name="陈" size="sm" />
        <WdAvatar name="+" />
        <WdAvatar name="+3" dark />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="成员条目"
      desc="头像在行首固定尺寸，名字与角色纵向排列并吃掉剩余宽度；一行塞不下三个元素时，先砍角色文字而不是缩小头像"
    >
      <ul class="people">
        <li v-for="p in people" :key="p.name" class="people__item">
          <WdAvatar :name="p.name" />
          <span class="people__body">
            <span class="people__name">{{ p.name }}</span>
            <span class="people__role">{{ p.role }}</span>
          </span>
          <WdTag size="sm" variant="gray">{{ p.tag }}</WdTag>
        </li>
      </ul>
    </DemoBlock>

    <DemoBlock
      title="头像组的边界"
      desc="空数组什么都不渲染，也不会留出占位；人数没超过 max 时不会出现 +N；只有真超员才补一个深色的 +N"
    >
      <DemoRow :gap="20" align="center">
        <WdAvatarGroup :names="nobody" />
        <WdAvatarGroup :names="duo" :max="5" />
        <WdAvatarGroup :names="crowd" :max="5" />
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.people {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.people__item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.people__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.people__name {
  font-size: var(--wd-fs-ui);
  font-weight: 600;
  color: var(--wd-ink);
}

.people__role {
  font-size: var(--wd-fs-sm);
  color: var(--wd-ink-2);
}
</style>
