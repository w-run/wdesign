# 私有 npm 源（纯静态）

把 `@w-run/*` 组件发布到 **w-box 的静态站**，零后端进程，复用现有 `box.w-run.net`。

## 原理

npm 客户端只需要两个 GET 请求，因此纯静态托管即可：

| 请求 | 返回 |
|---|---|
| `GET /npm/@w-run/wdesign` | 包元数据（packument JSON） |
| `GET /npm/@w-run/wdesign/-/w-run-wdesign-1.0.0.tgz` | tarball |

## 目录结构（w-box）

```
/workspace/static/npm/
├── @w-run/
│   ├── wdesign.json                    ← 元数据
│   └── wdesign/-/w-run-wdesign-1.0.0.tgz  ← 包体
```

## 发布

```sh
sh tools/publish.sh          # 生成产物 + rsync 到 w-box
```

## 消费端（项目根 .npmrc）

```ini
registry=https://registry.npmmirror.com/
@w-run:registry=https://box.w-run.net/npm/
```

```sh
npm install @w-run/wdesign
```

> ⚠️ **必须带 scope**（`@w-run/...`）：私有源没有公共包，
> 只有给包加 scope 才能用 `.npmrc` 精准路由，让 vue 等依赖仍走公共源。

## Nginx

见 `tools/nginx-npm.conf`，挂到 `box.w-run.net` 站点内即可。

## 能力边界

| 操作 | 支持 | 说明 |
|---|---|---|
| `npm install` / `view` / `pack` | ✅ | 走静态文件 |
| 多版本并存 | ✅ | 每次发布会合并进 packument |
| `npm publish` | ❌ | 静态不能写；改用 `tools/publish.sh` |
| `npm deprecate` / dist-tag 增改 | ⚠️ | 直接编辑 `<pkg>.json` |

## 优化建议

- 字体（`fonts/` 17MB）占包体 95%，建议拆成独立包 `@w-run/wdesign-fonts`，或改为 CDN 引用
- 若不想加 scope，可在 Nginx 对未命中路径 `proxy_pass` 到公共源做兜底（需少量反代，非纯静态）
