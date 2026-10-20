#!/usr/bin/env bash
# ============================================================
#  publish-npm.sh — 发布 @w-run/* 到公共 npm
#
#  凭据：从环境变量 $NPM_TOKEN 读取（在 ~/.bashrc 里声明）。
#  ⚠️ 绝不把 token 写进仓库里的任何文件。
#
#  用法：
#    bash tools/publish-npm.sh          # 发布 ui + icons
#    bash tools/publish-npm.sh ui       # 只发 ui
#    bash tools/publish-npm.sh icons    # 只发 icons
#
#  ===== 验证策略 =====
#  · 官方源：**必须等到可用**（这是发布的真实结果，失败即报错退出）
#  · npmmirror：只触发同步、查一次状态，**不等待**
#      镜像同步是异步的，通常几十秒到几分钟。
#      等它会严重拖慢发布流程，而且镜像延迟不代表发布失败 ——
#      国内用户可以稍后重试，或临时用官方源安装。
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${1:-all}"

OFFICIAL="https://registry.npmjs.org"
MIRROR="https://registry.npmmirror.com"

if [ -z "${NPM_TOKEN:-}" ]; then
  echo "✗ 环境变量 NPM_TOKEN 未设置"
  exit 1
fi

TMPRC="$(mktemp)"
trap 'rm -f "$TMPRC"' EXIT
printf "registry=%s/\n//registry.npmjs.org/:_authToken=%s\n" "$OFFICIAL" "$NPM_TOKEN" > "$TMPRC"
chmod 600 "$TMPRC"

echo "▸ 认证：$(cd "$ROOT" && npm_config_userconfig="$TMPRC" npm whoami --registry="$OFFICIAL" 2>/dev/null)"

encode_name() {
  printf '%s' "$1" | sed 's|/|%2f|'
}

pkg_version() {
  local name="$1" registry="$2"
  curl -s --max-time 12 "$registry/$(encode_name "$name")" 2>/dev/null \
    | python3 -c "import json,sys
try:
    d = json.load(sys.stdin)
    print(d.get('dist-tags', {}).get('latest', ''))
except Exception:
    print('')" 2>/dev/null
}

# 等待官方源出现指定版本 —— 这是唯一需要阻塞的检查
wait_official() {
  local name="$1" want="$2" max="${3:-90}"
  local waited=0
  while [ "$waited" -lt "$max" ]; do
    local v
    v="$(pkg_version "$name" "$OFFICIAL")"
    if [ "$v" = "$want" ]; then
      echo "  ✓ 官方源可见：$name@$v（${waited}s）"
      return 0
    fi
    sleep 5
    waited=$((waited + 5))
  done
  echo "  ✗ 官方源超时（${max}s）：$name@$want 未出现"
  return 1
}

# 触发镜像同步，只查一次，不等待
poke_mirror() {
  local name="$1"

  local resp
  resp="$(curl -s --max-time 12 -X PUT "$MIRROR/-/package/$(encode_name "$name")/syncs" 2>/dev/null || true)"
  if ! printf '%s' "$resp" | grep -q '"ok":true'; then
    echo "  · 镜像同步请求异常（不影响发布）"
    return 0
  fi

  # 给它几秒再查一次；没同步就放手，不阻塞
  sleep 5
  local v
  v="$(pkg_version "$name" "$MIRROR")"
  if [ "$v" = "$2" ]; then
    echo "  ✓ 镜像已同步：$v"
  else
    echo "  · 镜像同步中（异步，不阻塞）"
    echo "    稍后可查：curl -s $MIRROR/$(encode_name "$name") | grep latest"
  fi
}

publish_pkg() {
  local dir="$1" name="$2" version="$3"

  echo ""
  echo "▸ 发布 $name@$version"

  #
  # 版本已存在时直接跳过 ——
  # npm 会对重复版本报 E403/EPUBLISHCONFLICT，
  # 但那会让脚本在 set -e 下中断后续步骤（包括验证）。
  # 先查一次，避免无意义的发布尝试。

  local existing
  existing="$(pkg_version "$name" "$OFFICIAL")"
  if [ "$existing" = "$version" ]; then
    echo "  · 版本已存在，跳过发布"
    echo "  ✓ 官方源可见：$name@$version"
    poke_mirror "$name" "$version"
    return 0
  fi

  (
    cd "$dir"
    # 显式 --registry：项目 .npmrc 可能把 @w-run 指向别处
    npm_config_userconfig="$TMPRC" npm publish --access public \
      --registry="$OFFICIAL/" 2>&1 | grep -v "npm warn" | tail -6
  )

  echo ""
  echo "▸ 验证 $name"

  # 1) 官方源：必须等到，失败即整体失败
  wait_official "$name" "$version" 90 || return 1

  # 2) 镜像：只戳一下，不等
  poke_mirror "$name" "$version"
}

FAILED=0

if [ "$TARGET" = "all" ] || [ "$TARGET" = "icons" ]; then
  V="$(node -p "require('$ROOT/packages/icons/package.json').version")"
  publish_pkg "$ROOT/packages/icons" "@w-run/wdesign-icons" "$V" || FAILED=1
fi

if [ "$TARGET" = "all" ] || [ "$TARGET" = "ui" ]; then
  V="$(node -p "require('$ROOT/packages/wdesign-ui/package.json').version")"
  publish_pkg "$ROOT/packages/wdesign-ui" "@w-run/wdesign-ui" "$V" || FAILED=1
fi

echo ""
if [ "$FAILED" -ne 0 ]; then
  echo "❌ 有包发布失败或官方源未生效"
  exit 1
fi
echo "✅ 发布完成（官方源已验证；镜像异步同步中）"
