<script setup lang="ts">
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdButton, WdIcon, WdResult } from "@wdesign";
</script>

<template>
  <DemoPage name="Result" desc="结果页：四种状态 · 操作区 · 富说明 · 自定义图标">
    <DemoBlock
      title="四种状态"
      desc="success 收尾、error 给原因、warning 给确认项、info 给中性提示；状态色由组件按语义选，别自己改"
    >
      <div class="grid">
        <WdResult
          status="success"
          title="发布成功"
          description="wdesign v1.4.2 已上线生产环境"
        />
        <WdResult
          status="error"
          title="构建失败"
          description="依赖解析出错：wd-icons 版本冲突"
        />
        <WdResult
          status="warning"
          title="待确认"
          description="有 2 项构建配置需要人工确认"
        />
        <WdResult status="info" title="任务已排队" description="前方还有 3 个任务" />
      </div>
    </DemoBlock>

    <DemoBlock
      title="操作区"
      desc="extra 插槽放主行动与次行动，顺序按「最可能做的」从左到右排"
    >
      <WdResult
        status="success"
        title="订单已提交"
        description="订单号 W-20240921-0417，预计 24 小时内发货"
      >
        <template #extra>
          <DemoRow :gap="10" :wrap="false">
            <WdButton variant="primary" size="sm">查看订单</WdButton>
            <WdButton variant="tint" size="sm">继续采购</WdButton>
          </DemoRow>
        </template>
      </WdResult>
    </DemoBlock>

    <DemoBlock
      title="失败富说明"
      desc="description 之外还可以用默认插槽写分条原因，比塞进一句话更容易定位问题"
    >
      <WdResult status="error" title="部署中止">
        <p class="line">1. 健康检查未通过：/health 返回 503</p>
        <p class="line">2. 目标机器 nginx 配置缺少 upstream 定义</p>
        <p class="line">已自动回滚到 v1.4.1，可修正后重新触发</p>
        <template #extra>
          <WdButton variant="dark" size="sm">查看构建日志</WdButton>
        </template>
      </WdResult>
    </DemoBlock>

    <DemoBlock
      title="自定义图标"
      desc="icon 插槽用于品牌化或特殊语义（如云盘上传完成），尺寸保持 30px 才不会压住标题"
    >
      <WdResult status="info" title="导入完成" description="共 128 条记录，跳过 3 条重复">
        <template #icon>
          <WdIcon name="cloud-upload" :size="30" />
        </template>
      </WdResult>
    </DemoBlock>
  </DemoPage>
</template>

<style scoped>
/* 结果页自带大留白，并排时用等宽网格，避免四块内容宽度参差 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 12px;
}

.line {
  margin: 0 0 6px;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--wd-ink-2);
}
</style>
