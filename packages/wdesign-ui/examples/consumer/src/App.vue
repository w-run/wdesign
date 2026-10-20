<script setup>
import { ref } from 'vue'
import {
  WdAlert,
  WdButton,
  WdCheckbox,
  WdIcon,
  WdInput,
  WdProgress,
  WdSelect,
  WdSpinner,
  WdTag,
  toast,
} from '@w-run/wdesign-ui'

const name = ref('')
const agree = ref(false)
const plan = ref('专业版')
const loading = ref(false)

function greet() {
  toast.success(`你好，${name.value || '陌生人'}！`)
}

function submit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    toast.success('提交成功')
  }, 1200)
}
</script>

<template>
  <div class="page">
    <header class="hero">
      <WdTag variant="tint">@w-run/wdesign-ui</WdTag>
      <h1>消费端示例</h1>
      <p>从 npm 安装组件库，具名引入 + 全量样式即可用。</p>
    </header>

    <section class="wd-card">
      <div class="wd-card__title">按钮 · Button</div>
      <div class="row">
        <WdButton variant="primary" @click="greet">主按钮</WdButton>
        <WdButton variant="tint">次级按钮</WdButton>
        <WdButton variant="dark">深色按钮</WdButton>
        <WdButton variant="ghost">幽灵按钮</WdButton>
        <WdButton variant="primary" :loading="loading" @click="submit">
          {{ loading ? '提交中…' : '提交' }}
        </WdButton>
      </div>
    </section>

    <section class="wd-card">
      <div class="wd-card__title">表单 · Form</div>
      <div class="col">
        <WdInput v-model="name" placeholder="输入你的名字…" size="lg" clearable />
        <WdCheckbox v-model="agree" label="我已阅读并同意条款" />
        <WdSelect v-model="plan" :options="['基础版', '专业版', '团队版']" />
        <WdProgress :value="66" />
      </div>
      <p class="hint">
        输入：{{ name || '（空）' }} · 同意：{{ agree ? '是' : '否' }} · 套餐：{{ plan }}
      </p>
    </section>

    <section class="wd-card">
      <div class="wd-card__title">反馈 · Feedback</div>
      <div class="row">
        <WdTag variant="tint" dot>运行中</WdTag>
        <WdTag variant="gray">已完成</WdTag>
        <WdTag variant="dark">归档</WdTag>
        <WdSpinner size="sm" />
        <WdIcon name="heart" :size="20" />
      </div>
      <div class="row" style="margin-top: 18px">
        <WdAlert
          variant="success"
          title="部署成功"
          description="从 npm 安装的组件运行正常。"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 880px;
  margin: 0 auto;
  padding: 48px 24px 96px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.hero {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}
.hero h1 {
  font-size: 38px;
  font-weight: 900;
  letter-spacing: -0.03em;
  margin: 0;
}
.hero p {
  color: var(--wd-ink-2);
  margin: 0;
}
.row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 420px;
}
.hint {
  font-size: 12.5px;
  color: var(--wd-ink-3);
  margin: 14px 0 0;
  font-family: var(--wd-font-mono);
}
</style>
