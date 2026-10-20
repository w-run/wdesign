<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdTree, WdIcon, WdTag } from "@wdesign";

/* 文件树：key 用路径，展开态与勾选态都按 key 记忆，数据重拉也不会丢 */
const fileNodes = [
  {
    key: "src",
    label: "src",
    children: [
      { key: "App.vue", label: "App.vue" },
      { key: "main.ts", label: "main.ts" },
      {
        key: "components",
        label: "components",
        children: [
          { key: "WdButton.vue", label: "WdButton.vue" },
          { key: "WdTable.vue", label: "WdTable.vue" },
          { key: "WdTree.vue", label: "WdTree.vue" },
        ],
      },
      {
        key: "styles",
        label: "styles",
        children: [
          { key: "_tokens.scss", label: "_tokens.scss" },
          { key: "_vars.scss", label: "_vars.scss" },
        ],
      },
    ],
  },
  { key: "package.json", label: "package.json" },
  { key: "README.md", label: "README.md" },
  { key: "legacy", label: "legacy（只读）", disabled: true },
];

const sizes: Record<string, string> = {
  "src": "目录",
  "App.vue": "1.2 KB",
  "main.ts": "0.4 KB",
  "components": "目录",
  "WdButton.vue": "6.8 KB",
  "WdTable.vue": "15.6 KB",
  "WdTree.vue": "9.3 KB",
  "styles": "目录",
  "_tokens.scss": "4.3 KB",
  "_vars.scss": "0.9 KB",
  "package.json": "1.1 KB",
  "README.md": "9.5 KB",
  "legacy（只读）": "停用",
};

/* 基础：展开 + 单选高亮 */
const expanded = ref<(string | number)[]>(["src", "components"]);
const selectedKey = ref<string | number | null>("App.vue");

/* 勾选：级联模式下勾父带全子，子节点全勾后父级也自动勾上 */
const checkExpanded = ref<(string | number)[]>(["src", "components"]);
const checkedKeys = ref<(string | number)[]>(["components"]);
const checkTip = ref("勾选目录会自动带上全部子项");

function onCheck(node: { label: string }, checked: boolean) {
  checkTip.value = `${node.label} ${checked ? "已勾选" : "已取消"}`;
}

/* 非级联：各自独立，适合「批量授权」这类不留父子联动的场景 */
const looseExpanded = ref<(string | number)[]>(["view", "edit"]);
const looseChecked = ref<(string | number)[]>(["dashboard"]);
const permissionNodes = [
  {
    key: "view",
    label: "查看权限",
    children: [
      { key: "dashboard", label: "数据看板" },
      { key: "report", label: "经营报表" },
    ],
  },
  {
    key: "edit",
    label: "编辑权限",
    children: [
      { key: "product", label: "商品管理" },
      { key: "order", label: "订单管理" },
    ],
  },
];
</script>

<template>
  <DemoPage name="Tree" desc="树：层级展开 · 单选高亮 · 勾选级联 · 图标与引导线">
    <DemoBlock title="基础与选中" desc="selectedKey 单选高亮，expandedKeys 受控展开；键盘上下键也能在节点间移动">
      <WdTree v-model:expanded-keys="expanded" v-model:selected-key="selectedKey" :nodes="fileNodes" />
      <span class="hint">当前选中：{{ selectedKey ?? "无" }}</span>
    </DemoBlock>

    <DemoBlock title="勾选与级联" desc="checkable 打开复选框，cascade 下勾父带全子、子全勾则父自动勾上">
      <WdTree
        v-model:expanded-keys="checkExpanded"
        v-model:checked-keys="checkedKeys"
        :nodes="fileNodes"
        checkable
        cascade
        @check="onCheck"
      />
      <span class="hint">已勾选 {{ checkedKeys.length }} 项 · {{ checkTip }}</span>
    </DemoBlock>

    <DemoBlock title="非级联勾选" desc="cascade=false 时父子互不影响，适合按项精确授权的场景">
      <WdTree v-model:expanded-keys="looseExpanded" v-model:checked-keys="looseChecked" :nodes="permissionNodes" checkable :cascade="false" />
      <span class="hint">已授权 {{ looseChecked.length }} 项权限</span>
    </DemoBlock>

    <DemoBlock title="图标、附件信息与引导线" desc="图标走 #icon 插槽换成 WdIcon，右侧体积用 #extra；show-line 画出层级引导线，indent 控制每级缩进">
      <WdTree
        v-model:expanded-keys="expanded"
        v-model:selected-key="selectedKey"
        :nodes="fileNodes"
        show-line
        :indent="20"
      >
        <!-- 图标名写成字面量，检查器才能校验图标是否真实存在 -->
        <template #icon="{ node }">
          <WdIcon v-if="node.children" name="folder-open" :size="14" />
          <WdIcon v-else name="file" :size="14" />
        </template>
        <template #label="{ node }">
          <span :class="{ 'node--disabled': node.disabled }">{{ node.label }}</span>
        </template>
        <template #extra="{ node }">
          <WdTag variant="gray" size="sm">{{ sizes[node.label] }}</WdTag>
        </template>
      </WdTree>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.hint {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.node--disabled {
  color: var(--wd-ink-3);
}
</style>
