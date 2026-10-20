<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdCascader } from "@wdesign";

const regionOptions = [
  {
    value: "zhejiang",
    label: "浙江",
    children: [
      {
        value: "hangzhou",
        label: "杭州",
        children: [
          { value: "xihu", label: "西湖区" },
          { value: "binjiang", label: "滨江区" },
          { value: "yuhang", label: "余杭区" },
        ],
      },
      {
        value: "ningbo",
        label: "宁波",
        children: [
          { value: "haishu", label: "海曙区" },
          { value: "yinzhou", label: "鄞州区" },
        ],
      },
    ],
  },
  {
    value: "guangdong",
    label: "广东",
    children: [
      {
        value: "shenzhen",
        label: "深圳",
        children: [
          { value: "nanshan", label: "南山区" },
          { value: "futian", label: "福田区" },
        ],
      },
      {
        value: "guangzhou",
        label: "广州",
        children: [{ value: "tianhe", label: "天河区" }],
      },
    ],
  },
  {
    value: "overseas",
    label: "海外（暂未开通）",
    disabled: true,
    children: [{ value: "sg", label: "新加坡" }],
  },
];

const region = ref<(string | number)[]>([]);
const anyLevel = ref<(string | number)[]>([]);
const preset = ref<(string | number)[]>(["zhejiang", "hangzhou", "xihu"]);

const lastChange = ref("（尚未选择）");

function onCascadeChange(values: (string | number)[], labels: string[]) {
  lastChange.value = values.length
    ? `${labels.join(" / ")}（${values.join(",")}）`
    : "（已清空）";
}
</script>

<template>
  <DemoPage
    name="Cascader"
    desc="级联选择：多列并排联动 · 只选叶子 / 任意层级 · 完整路径回显"
  >
    <DemoBlock
      title="三级联动"
      desc="面板按层级并排展开、宽度贴合触发器；只有点到叶子节点才收起并写回完整路径"
    >
      <DemoRow>
        <WdCascader
          v-model="region"
          :options="regionOptions"
          placeholder="选择省 / 市 / 区"
        />
      </DemoRow>
      <p class="cap">已选路径：{{ region.join(" / ") || "（空）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="任意层级可选"
      desc="changeOnSelect 打开后，点中途的省或市也能直接确认 —— 粗粒度筛选（大区、品类一级）不必逼用户选到底"
    >
      <DemoRow>
        <WdCascader
          v-model="anyLevel"
          :options="regionOptions"
          change-on-select
          placeholder="选到哪层都算"
        />
      </DemoRow>
      <p class="cap">已选路径：{{ anyLevel.join(" / ") || "（空）" }}</p>
    </DemoBlock>

    <DemoBlock
      title="事件与回显"
      desc="change 同时给出值数组与标签数组，做日志或接口参数都不必再查表；v-model 给一段完整路径就能回显"
    >
      <DemoRow>
        <WdCascader
          v-model="preset"
          :options="regionOptions"
          @change="onCascadeChange"
        />
      </DemoRow>
      <p class="cap">最近 change：{{ lastChange }}</p>
    </DemoBlock>

    <DemoBlock
      title="尺寸、面板高度与禁用"
      desc="maxHeight 收住展开面板的高度，层级深或多列时不会顶出屏幕；清空按钮默认就有，禁用后不可展开"
    >
      <DemoRow>
        <WdCascader size="sm" :options="regionOptions" placeholder="sm" />
        <WdCascader :options="regionOptions" placeholder="md" />
        <WdCascader
          size="lg"
          :options="regionOptions"
          :max-height="200"
          placeholder="lg · 面板最高 200"
        />
      </DemoRow>
      <DemoRow>
        <WdCascader
          :options="regionOptions"
          :model-value="['zhejiang', 'hangzhou', 'xihu']"
          disabled
        />
      </DemoRow>
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
