# 04 · 发布

## 发布到公共 npm

```sh
bash tools/publish-npm.sh          # ui + icons
bash tools/publish-npm.sh ui       # 只发 ui
bash tools/publish-npm.sh icons    # 只发 icons
```

**凭据**：环境变量 `$NPM_TOKEN`（在 `~/.bashrc` 里声明）。
脚本创建临时 `.npmrc`，退出时删除。**绝不把 token 写进仓库文件**。

## 验证策略（关键决策）

| 源 | 策略 | 理由 |
|---|---|---|
| **官方 npm** | **必须等到可用**（90s 轮询，超时即失败） | 这是发布的真实结果，不能含糊 |
| **npmmirror** | 只触发同步 + 查一次，**不等待** | 异步，几十秒到几分钟。等它会把 14s 拖成 3min+ |

镜像延迟**不代表发布失败** —— 国内用户可稍后重试。

## 版本已存在时跳过

npm 对重复版本报 `EPUBLISHCONFLICT`，会让 `set -e` 中断后续验证。
脚本发布前先查一次，已存在则直接进入验证流程。

## 必须在 `package.json` 里指定 `--registry`

项目 `.npmrc` 可能把 `@w-run` 指向别处，导致发布时去错误的源找凭据（`ENEEDAUTH`）。

```sh
npm publish --access public --registry=https://registry.npmjs.org/
```

## 手动触发镜像同步

```sh
curl -X PUT "https://registry.npmmirror.com/-/package/@w-run%2fwdesign-ui/syncs"
```

## 私有源已废弃

原 `box.w-run.net/npm/` 私有静态源不再使用，相关文件已全部删除：
`NPM-PRIVATE.md` / `publish-static.mjs` / `nginx-npm.conf` / `serve-static.mjs`。

三个 `.npmrc` 的 `@w-run:registry` 已改为官方源。

## 版本号约定

发版前改 `packages/*/package.json` 的 `version`。
两个包独立版本，但通常同步发布。
