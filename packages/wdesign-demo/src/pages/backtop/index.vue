<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdBacktop, WdIcon } from "@wdesign";

const backCount = ref(0);

const releases = [
  { version: "1.8.0", date: "2026-10-24", note: "组件库 76 个组件全部补齐一组件一页的演示" },
  { version: "1.7.3", date: "2026-10-18", note: "修复表格列宽与节点宽耦合导致的对齐偏移" },
  { version: "1.7.2", date: "2026-10-11", note: "深色主题下阴影阶梯统一改用 token" },
  { version: "1.7.1", date: "2026-10-05", note: "日期选择器补齐键盘操作与焦点环" },
  { version: "1.7.0", date: "2026-09-28", note: "新增水印、二维码、命令面板三个组件" },
  { version: "1.6.4", date: "2026-09-20", note: "上传组件支持断点续传与秒传回调" },
  { version: "1.6.3", date: "2026-09-12", note: "修复弹层堆叠顺序在多层嵌套时错乱" },
  { version: "1.6.2", date: "2026-09-04", note: "输入框在 Safari 下的光标跳动修复" },
  { version: "1.6.1", date: "2026-08-27", note: "图标包补齐 24 个业务图标，全部为填充路径" },
  { version: "1.6.0", date: "2026-08-19", note: "发布脚本支持灰度：先戳私有源再发官方源" },
  { version: "1.5.7", date: "2026-08-10", note: "表格虚拟滚动在十万行数据下的卡顿优化" },
  { version: "1.5.6", date: "2026-08-02", note: "事件名统一为 kebab-case，破坏性调整已列出" },
  { version: "1.5.5", date: "2026-07-25", note: "抽屉组件支持挂载到自定义容器" },
  { version: "1.5.4", date: "2026-07-17", note: "分页组件补上每页条数切换的回传参数" },
  { version: "1.5.3", date: "2026-07-09", note: "修复级联选择器在空数据时的 placeholder 缺位" },
  { version: "1.5.2", date: "2026-07-01", note: "通知组件支持同位置多条堆叠与自动收拢" },
  { version: "1.5.1", date: "2026-06-23", note: "徽标数字超过三位时改为 99+ 展示" },
  { version: "1.5.0", date: "2026-06-15", note: "引入 Soft Bento 视觉规范，圆角与阴影全面收敛" },
  { version: "1.4.6", date: "2026-06-06", note: "进度条补上环形形态与不确定态" },
  { version: "1.4.5", date: "2026-05-29", note: "开关组件在受控模式下不再自更新状态" },
  { version: "1.4.4", date: "2026-05-21", note: "骨架屏支持自定义行数与行高" },
  { version: "1.4.3", date: "2026-05-13", note: "步骤条支持竖向与错误态展示" },
  { version: "1.4.2", date: "2026-05-05", note: "时间轴补上自定义节点与折叠区间" },
  { version: "1.4.1", date: "2026-04-27", note: "下拉菜单在视口边缘自动翻转方向" },
  { version: "1.4.0", date: "2026-04-19", note: "拆分图标包为独立 npm 包，按需引入" },
  { version: "1.3.2", date: "2026-04-11", note: "气泡卡片支持点击外部关闭与嵌套引用" },
];
</script>

<template>
  <DemoPage name="Backtop" desc="回到顶部：滚动阈值 · 贴边距离 · 回滚时长（滚动页面查看效果）">
    <DemoBlock
      title="基础用法"
      desc="页面在 .demo-main 里滚动，所以必须传 target；滚过 320px 后按钮才出现，隐藏态不拦截点击也不进 Tab 序"
    >
      <WdBacktop target=".demo-main" @click="backCount++" />
      <DemoRow :gap="12">
        <span class="bt-note">已触发回到顶部 {{ backCount }} 次</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="位置、时长与图标"
      desc="right / bottom 调贴边距离，duration 是回滚动画时长（缓出曲线）；默认插槽可换图标，instant 则跳过动画直接归位"
    >
      <WdBacktop target=".demo-main" :right="88" :bottom="24" :duration="800">
        <WdIcon name="go-top" :size="18" />
      </WdBacktop>
      <p class="bt-note">右下角第二个按钮：距右 88px、时长 800ms，图标走默认插槽</p>
    </DemoBlock>

    <DemoBlock
      title="长内容"
      desc="内容不足一屏时按钮不会出现 —— 阈值按滚动距离判断，与内容高度无关；下面这批发布记录用来撑出滚动距离"
    >
      <div v-for="item in releases" :key="item.version" class="release-row">
        <span class="release-row__version">{{ item.version }}</span>
        <span class="release-row__date">{{ item.date }}</span>
        <span class="release-row__note">{{ item.note }}</span>
      </div>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
.bt-note {
  margin: 0;
  font-size: 12.5px;
  color: var(--wd-ink-2);
}

.release-row {
  display: flex;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px solid var(--wd-ink-5);
  font-size: 13px;
  color: var(--wd-ink-2);
}

.release-row__version {
  flex: none;
  width: 64px;
  font-family: var(--wd-font-mono);
  font-size: 12px;
  color: var(--wd-ink);
}

.release-row__date {
  flex: none;
  width: 92px;
  font-family: var(--wd-font-mono);
  font-size: 12px;
  color: var(--wd-ink-3);
}

.release-row__note {
  flex: 1 1 auto;
  min-width: 0;
}
</style>
