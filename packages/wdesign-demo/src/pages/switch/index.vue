<script setup lang="ts">
import { ref } from "vue";
import DemoPage from "@/shell/DemoPage.vue";
import DemoBlock from "@/shell/DemoBlock.vue";
import DemoRow from "@/shell/DemoRow.vue";
import { WdSwitch } from "@wdesign";

const on = ref(true);
const notify = ref(true);
const night = ref(false);
const autoUpdate = ref(true);

/** 非受控：不传 v-model，组件自己持有开关状态 */
const lastChange = ref("（尚未切换）");

function onChange(v: boolean) {
  lastChange.value = v ? "开" : "关";
}
</script>

<template>
  <DemoPage
    name="Switch"
    desc="开关：即时生效的二元状态 · 受控 / 非受控 · 禁用态"
  >
    <DemoBlock
      title="受控"
      desc="v-model 绑定布尔值；开关本身不带文案，说明文字交给旁边一行，避免组件里塞视觉噪音"
    >
      <DemoRow>
        <WdSwitch v-model="on" />
        <span class="cap">当前：{{ on ? "已开启" : "已关闭" }}</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="不传 v-model 也能工作"
      desc="非受控用 defaultValue 起手，组件自己记状态；只在 change 里取值，适合「改了就提交」的设置项"
    >
      <DemoRow>
        <WdSwitch :default-value="true" @change="onChange" />
        <WdSwitch :default-value="false" @change="onChange" />
        <span class="cap">最近切换：{{ lastChange }}</span>
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="禁用态"
      desc="禁用的开与关都要能看到，否则用户分不清「不可改」和「当前是关」"
    >
      <DemoRow>
        <WdSwitch :model-value="true" disabled />
        <WdSwitch :model-value="false" disabled />
      </DemoRow>
    </DemoBlock>

    <DemoBlock
      title="用在设置行里"
      desc="每个开关管一个字段，左侧标签负责解释；这类行只改一处、立即生效，所以不用表单提交按钮"
    >
      <DemoRow :gap="28">
        <DemoRow :gap="8" :wrap="false">
          <span class="cap">消息推送</span>
          <WdSwitch v-model="notify" />
        </DemoRow>
        <DemoRow :gap="8" :wrap="false">
          <span class="cap">夜间模式</span>
          <WdSwitch v-model="night" />
        </DemoRow>
        <DemoRow :gap="8" :wrap="false">
          <span class="cap">自动更新</span>
          <WdSwitch v-model="autoUpdate" />
        </DemoRow>
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
