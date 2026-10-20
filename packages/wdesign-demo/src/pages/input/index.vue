<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdInput, WdIcon } from "@wdesign";

const name = ref("林小满");
const city = ref("");
const keyword = ref("设计系统");
const bio = ref("");
const query = ref("");
const amount = ref("");
const clearCount = ref(0);

/** 非受控：不传 v-model，组件自己持有输入值，页面只接事件 */
const lastChange = ref("（尚未输入）");
const lastEnter = ref("（尚未回车）");

function onChange(v: string) {
  lastChange.value = v || "（空）";
}

function onEnter(v: string) {
  lastEnter.value = v || "（空）";
}
</script>

<template>
  <DemoPage
    name="Input"
    desc="输入框：胶囊 / 圆角 · 三档尺寸 · 清除与字数 · 前后缀插槽"
  >
    <DemoBlock
      title="基础与形状"
      desc="默认 pill 胶囊，与 Select、Cascader 的触发器同一形状；rounded 留给需要和卡片边缘对齐的场合"
    >
      <DemoRow>
        <WdInput v-model="name" placeholder="请输入昵称" />
        <WdInput v-model="city" shape="rounded" placeholder="圆角输入框" />
      </DemoRow>
      <p class="cap">
        昵称：{{ name || "（空）" }} / 城市：{{ city || "（空）" }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="尺寸、禁用与只读"
      desc="sm 用于密集工具栏，lg 用于页面上的主输入；禁用态不可聚焦，只读态能选中文字但不能改"
    >
      <DemoRow>
        <WdInput size="lg" placeholder="大尺寸 lg" />
        <WdInput placeholder="中尺寸 md（默认）" />
        <WdInput size="sm" placeholder="小尺寸 sm" />
      </DemoRow>
      <DemoRow>
        <WdInput model-value="禁用状态" disabled />
        <WdInput model-value="只读内容，可复制" readonly />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="清除与字数"
      desc="clearable 只在有值时冒出清除按钮；showCount 必须同时给 maxlength，否则没有上限可显示"
    >
      <DemoRow>
        <WdInput
          v-model="keyword"
          clearable
          placeholder="可一键清除"
          @clear="clearCount++"
        />
        <WdInput
          v-model="bio"
          :maxlength="20"
          show-count
          placeholder="最多 20 字"
        />
      </DemoRow>
      <p class="cap">已清空 {{ clearCount }} 次 / 简介已写 {{ bio.length }} 字</p>
    </DemoBlock>

    <DemoBlock
      title="前缀与后缀插槽"
      desc="icon 槽放图标，suffix 槽放单位或固定后缀；图标统一走 WdIcon，颜色跟随容器"
    >
      <DemoRow>
        <WdInput v-model="query" placeholder="搜索组件">
          <template #icon>
            <WdIcon name="search" :size="16" />
          </template>
        </WdInput>
        <WdInput v-model="amount" placeholder="输入金额">
          <template #suffix>
            <span class="cap">元</span>
          </template>
        </WdInput>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="不传 v-model 也能工作"
      desc="非受控用 defaultValue 起手，组件自己记住输入值；表单里少维护一个 ref，只在 change / enter 时取值"
    >
      <DemoRow>
        <WdInput
          default-value="初始内容"
          placeholder="非受控输入框"
          @change="onChange"
          @enter="onEnter"
        />
        <WdInput type="password" placeholder="密码（type=password）" />
      </DemoRow>
      <p class="cap">最近输入：{{ lastChange }} / 回车提交：{{ lastEnter }}</p>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.cap {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--wd-ink-2);
}
</style>
