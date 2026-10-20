<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import { WdTable, WdTag } from "@wdesign";

type Row = Record<string, unknown>;
type Col = {
  key: string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  fixed?: "left" | "right";
  ellipsis?: boolean;
};

/* 基础数据：rowKey 用 name，勾选态才能稳定跟随行而不是下标 */
const repoCols: Col[] = [
  { key: "name", title: "仓库", width: "180px", sortable: true },
  { key: "lang", title: "语言", width: "150px" },
  { key: "stars", title: "Stars", width: "110px", align: "right", sortable: true },
  { key: "status", title: "状态", width: "110px" },
];

const repoRows: Row[] = [
  { name: "wdesign", lang: "TypeScript", stars: 128, status: "active" },
  { name: "wdesign-icons", lang: "SVG", stars: 56, status: "active" },
  { name: "legacy-ui", lang: "Vue 2", stars: 3, status: "archived" },
  { name: "tokens-sync", lang: "Node", stars: 41, status: "active" },
];

const selected = ref<Row[]>([]);

/* 排序 + 省略：desc 故意给长文本，ellipsis 才会真正截断 */
const sortCols: Col[] = [
  { key: "store", title: "门店", width: "160px", sortable: true },
  { key: "gmv", title: "月 GMV（元）", width: "150px", align: "right", sortable: true },
  { key: "owner", title: "负责人", width: "120px" },
  { key: "note", title: "备注", width: "220px", ellipsis: true },
];

const sortRows: Row[] = [
  { store: "杭州未来科技城店", gmv: 1286400, owner: "林小满", note: "写字楼商圈，工作日午市与晚市双高峰，周末客流下滑明显" },
  { store: "上海静安寺店", gmv: 2148600, owner: "陈一鸣", note: "位于地铁换乘口，节假日客流约为平日的 2.3 倍" },
  { store: "成都春熙路店", gmv: 968200, owner: "苏哲", note: "旅游客群占比高，客单价季节波动大" },
  { store: "深圳南山店", gmv: 1742200, owner: "周未", note: "科技园区团餐订单稳定，工作日 11:30 前完成 60% 出餐" },
];

/* 树形数据：children 字段由 childrenKey 指定，默认就是 children */
const treeCols: Col[] = [
  { key: "name", title: "目录 / 组件", width: "260px" },
  { key: "type", title: "类型", width: "120px" },
  { key: "size", title: "体积", width: "110px", align: "right" },
];

const treeRows: Row[] = [
  {
    id: "form",
    name: "form 表单类",
    type: "目录",
    size: "—",
    children: [
      { id: "input", name: "WdInput.vue", type: "组件", size: "4.2 KB" },
      { id: "select", name: "WdSelect.vue", type: "组件", size: "8.1 KB" },
    ],
  },
  {
    id: "data",
    name: "data 数据类",
    type: "目录",
    size: "—",
    children: [
      { id: "table", name: "WdTable.vue", type: "组件", size: "15.6 KB" },
      { id: "tree", name: "WdTree.vue", type: "组件", size: "9.3 KB" },
    ],
  },
  { id: "pkg", name: "index.ts", type: "文件", size: "1.1 KB" },
];

const treeTip = ref("点开左侧箭头展开层级");

function onTreeExpand(row: Row, expanded: boolean) {
  treeTip.value = `${String(row.name)} 已${expanded ? "展开" : "收起"}`;
}

/* 行展开：详情区走 #expand 插槽，colspan 默认占满整行 */
const taskCols: Col[] = [
  { key: "name", title: "构建任务", width: "200px" },
  { key: "status", title: "状态", width: "120px" },
  { key: "time", title: "耗时", width: "110px", align: "right" },
];

const taskRows: Row[] = [
  { id: 1, name: "check:tokens", status: "通过", time: "0.2s", detail: "校验 111 个设计令牌，未发现未定义的变量引用。" },
  { id: 2, name: "build:ui", status: "通过", time: "18.6s", detail: "编译 76 个组件与对应样式文件，产物只输出 ESM。" },
  { id: 3, name: "test:smoke", status: "告警", time: "3.1s", detail: "381 项断言通过，2 项因缺少字体文件跳过。" },
];

const clicked = ref("尚未点击任何行");

function onRowClick(row: Row, index: number) {
  clicked.value = `第 ${index + 1} 行：${String(row.name)}`;
}

/* 固定列：首两列贴左，横向滚动时保持可见；maxHeight 让表头吸附 */
const fixedCols: Col[] = [
  { key: "id", title: "编号", width: "100px", fixed: "left" },
  { key: "name", title: "组件名", width: "160px", fixed: "left" },
  { key: "owner", title: "负责人", width: "120px" },
  { key: "path", title: "源码路径", width: "320px" },
  { key: "updated", title: "更新时间", width: "140px" },
];

const fixedRows: Row[] = ["WdButton", "WdInput", "WdTable", "WdSelect", "WdModal", "WdTree", "WdCard", "WdTag"].map(
  (name, i) => ({
    id: "C" + String(i + 1).padStart(3, "0"),
    name,
    owner: ["林小满", "陈一鸣", "苏哲", "周未"][i % 4],
    path: `packages/wdesign-ui/src/components/${name}.vue`,
    updated: "2026-10-" + String(10 + i).padStart(2, "0"),
  }),
);
</script>

<template>
  <DemoPage name="Table" desc="表格：勾选 · 排序 · 树形层级 · 行展开 · 固定列">
    <DemoBlock :span="2" title="基础与勾选" desc="selectable 打开勾选列，row-key 指定唯一标识，选中结果通过 v-model:selected 回传">
      <WdTable v-model:selected="selected" :columns="repoCols" :rows="repoRows" selectable row-key="name">
        <template #cell-status="{ row }">
          <WdTag :variant="row.status === 'active' ? 'tint' : 'gray'" dot>
            {{ row.status === "active" ? "活跃" : "归档" }}
          </WdTag>
        </template>
        <template #cell-stars="{ row }">
          <strong>{{ row.stars }}</strong>
        </template>
      </WdTable>
      <span class="hint">已选 {{ selected.length }} 行；点表头复选框可整表全选</span>
    </DemoBlock>

    <DemoBlock :span="2" title="排序与省略" desc="sortable 由表头点击驱动，数字按中文语序的 numeric 规则比较；ellipsis 给长文本截断">
      <WdTable :columns="sortCols" :rows="sortRows" row-key="store" size="sm" />
    </DemoBlock>

    <DemoBlock :span="2" title="树形数据" desc="tree 模式把 children 拍平后按层级缩进渲染，行仍然是同层 tr，列不会错位">
      <WdTable
        :columns="treeCols"
        :rows="treeRows"
        tree
        row-key="id"
        default-expand-all
        size="sm"
        @expand-change="onTreeExpand"
      />
      <span class="hint">{{ treeTip }}</span>
    </DemoBlock>

    <DemoBlock :span="2" title="行展开详情" desc="expandable 时每行多一个箭头，详情写在 #expand 插槽里，默认横跨整行">
      <WdTable :columns="taskCols" :rows="taskRows" expandable row-key="id" size="sm" @row-click="onRowClick">
        <template #cell-status="{ row }">
          <WdTag :variant="row.status === '通过' ? 'tint' : 'gray'" size="sm">{{ row.status }}</WdTag>
        </template>
        <template #expand="{ row }">
          <span class="detail">{{ row.detail }}</span>
        </template>
      </WdTable>
      <span class="hint">{{ clicked }}</span>
    </DemoBlock>

    <DemoBlock :span="2" title="固定列与空状态" desc="首两列 fixed=left 贴边，配合 maxHeight 让表头固定、表体滚动；没有数据时走 emptyText">
      <WdTable :columns="fixedCols" :rows="fixedRows" row-key="id" :max-height="220" size="sm" />
      <WdTable :columns="repoCols" :rows="[]" empty-text="该账号下暂无仓库数据" />
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.hint {
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.detail {
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--wd-ink-2);
}
</style>
