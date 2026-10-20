# 06 · 开发流程

## 日常开发

```sh
pnpm install                          # 首次
pnpm dev                              # 启动 demo（vite，端口 5273）
pnpm --filter @w-run/wdesign-ui verify   # 全部检查
pnpm build:ui                         # 构建组件库
pnpm build:demo                       # 构建 demo
```

## demo 开发方式

demo 通过 vite alias 直连 **ui 源码**：

```ts
resolve: { alias: { "@wdesign": "../wdesign-ui/src" } }
```

改组件 → HMR 立即生效，**不需要先 build:ui**。

## 服务常驻的注意事项

远程会话结束时，前台启动的进程会被带走。需要脱离会话：

```sh
# Linux
tmux new-session -d -s demo "cd ... && npx vite ..."

# Windows
schtasks //Create //TN xxx //TR "..."
```

SSH 会话断开后进程消失，是远程开发最常见的坑。

## ⚠️ 禁止重启任何服务或主机

**配置改动只改文件，重启动作交给用户。**

曾因重启 w-yun 的 wtunnel 打断了所有 SSH 穿透（62901 / 62902 / 62981 / 62998 全部断掉），
而且 SSH 本身就是经过它的，重启等于自己砍断自己的连接。

## 提交前

```sh
pnpm --filter @w-run/wdesign-ui verify    # 必须全绿
```

检查项见 `05-checks.md`。

## 提交信息

用中文写，说明**为什么**而不是**做了什么**。
踩过的坑要写清楚根因和修法，便于后面检索。

格式：

```
<type>(<scope>): <简述>

## 问题
## 根因
## 修法
## 验证
```

## 调试链路（远程）

架构：w-box 开发 + w-yun 提供 Chrome DevTools。

```
w-box（vite :5273）──穿透 62904──▶ w-yun 浏览器访问
w-yun（Chrome CDP :9222）──穿透 62906──▶ w-box 的 codebuddy 调试
```

**Chrome 必须在 w-yun 上跑**（w-box 无 GUI）。
用 `schtasks` 启动使其脱离 SSH 会话：

```powershell
Start-Process -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  -ArgumentList "--remote-debugging-port=9222","--user-data-dir=C:\Users\admin\chrome-debug"
```

## 目录约定

| 路径 | 用途 |
|---|---|
| `packages/wdesign-ui/src/components/` | 组件（76 个 .vue + 内部 .ts） |
| `packages/wdesign-ui/src/styles/components/` | 组件样式（78 个） |
| `packages/wdesign-ui/tools/` | 检查器与构建脚本 |
| `packages/wdesign-demo/src/pages/<name>/index.vue` | 每个组件一页 |

## demo 页面写法

每个页面用 `DemoPage` + `DemoBlock` 组合：

```vue
<template>
  <DemoPage name="Button" desc="按钮：六种变体 · 三档尺寸">
    <DemoBlock title="变体" desc="primary 是主行动">
      <DemoRow>
        <WdButton variant="primary">主按钮</WdButton>
      </DemoRow>
    </DemoBlock>
  </DemoPage>
</template>
```

路由在 `src/router.ts` 注册，`meta` 决定侧栏分组与排序。

## 变体合并规则

同族组件合并到一页，不分开：

| 页面 | 包含 |
|---|---|
| Avatar | WdAvatar + WdAvatarGroup |
| Form | WdForm + WdFormItem |
| Calendar | 单日 + 区间 + 标记 + 农历 |

判据：**用户会同时用到、且需要对比着看**的组件放一页。
