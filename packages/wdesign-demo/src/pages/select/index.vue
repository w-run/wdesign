<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdSelect } from "@wdesign";

const sort = ref("最近更新");

const roleOptions = [
  { label: "前端工程师", value: "frontend" },
  { label: "后端工程师", value: "backend" },
  { label: "产品设计", value: "design" },
  { label: "测试（暂不可选）", value: "qa", disabled: true },
];
const role = ref("frontend");

const skillOptions = ["Vue", "TypeScript", "SCSS", "Node", "Figma", "动效", "无障碍"];
const skills = ref<(string | number)[]>(["Vue", "TypeScript"]);

const cityOptions = ["杭州", "上海", "北京", "深圳", "成都", "广州", "南京", "武汉"];
const city = ref("");

/** 非受控：不传 v-model，组件自己持有选中值 */
const lastChange = ref("（尚未选择）");

function onChange(v: (string | number) | (string | number)[]) {
  lastChange.value = Array.isArray(v) ? v.join("、") || "（空数组）" : String(v) || "（空）";
}
</script>

<template>
  <DemoPage
    name="Select"
    desc="选择器：单选 / 多选 · 可搜索 · 标签折叠 · 三档尺寸"
  >
    <DemoBlock
      title="单选与两种 options 写法"
      desc="options 可以直接给字符串（值等于文案），也可以给 {label, value, disabled} —— 需要值和文案不同、或要禁掉某一项时用后者"
    >
      <DemoRow>
        <WdSelect v-model="sort" :options="['最近更新', '最早创建', '名称排序']" />
        <WdSelect v-model="role" :options="roleOptions" placeholder="选择岗位" />
      </DemoRow>
      <p class="cap">
        排序：{{ sort }} / 岗位值：{{ role }}
      </p>
    </DemoBlock>

    <DemoBlock
      title="多选与标签折叠"
      desc="multiple 时 modelValue 是数组；maxTagCount 限制触发器里最多平铺几个标签，其余收成 +N"
    >
      <DemoRow>
        <WdSelect
          v-model="skills"
          :options="skillOptions"
          multiple
          :max-tag-count="2"
          clearable
          placeholder="选择技能"
        />
      </DemoRow>
      <p class="cap">已选 {{ skills.length }} 项：{{ skills.join("、") || "（无）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="可搜索"
      desc="filterable 打开后，面板顶部出现筛选框，只按标签文字匹配；没有匹配项时给一句「无匹配项」而不是空白"
    >
      <DemoRow>
        <WdSelect
          v-model="city"
          :options="cityOptions"
          filterable
          clearable
          placeholder="搜索城市"
        />
      </DemoRow>
      <p class="cap">当前城市：{{ city || "（未选）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="尺寸与禁用"
      desc="三档尺寸的触发器高度与 Input 对齐；禁用时整体降透明度且不展开面板"
    >
      <DemoRow>
        <WdSelect size="lg" :options="['lg 选项']" placeholder="lg" />
        <WdSelect :options="['md 选项']" placeholder="md" />
        <WdSelect size="sm" :options="['sm 选项']" placeholder="sm" />
      </DemoRow>
      <DemoRow>
        <WdSelect :options="['A', 'B']" model-value="A" disabled />
        <WdSelect :options="['A', 'B']" placeholder="禁用 · 未选" disabled />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="不传 v-model 也能工作"
      desc="非受控用 defaultValue 起手，选中值由组件自己记；父级只在 change 时读一次，适合纯筛选这类「用完就走」的表单"
    >
      <DemoRow>
        <WdSelect
          :options="['深圳', '上海', '北京']"
          default-value="深圳"
          @change="onChange"
        />
        <WdSelect
          :options="['Vue', 'React', 'Svelte']"
          multiple
          :default-value="['Vue']"
          @change="onChange"
        />
      </DemoRow>
      <p class="cap">最近 change：{{ lastChange }}</p>
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
