# ============================================================
# publish.sh — 一键发布 @w-run/* 到 w-box 私有静态 npm 源
# ============================================================
#!/bin/sh
set -e
cd "$(dirname "$0")/.."

# 1) 生成静态源产物（元数据 JSON + tarball）
NPM_BASE_URL=https://box.w-run.net/npm node tools/publish-static.mjs dist-npm

# 2) 同步到 w-box 静态目录（追加合并，不删除远端其它包）
rsync -av dist-npm/ root@w-box:/workspace/static/npm/

echo ""
echo "✅ 已发布 → https://box.w-run.net/npm/@w-run/wdesign"
echo "   消费者项目 .npmrc 写入:"
echo "     registry=https://registry.npmmirror.com/"
echo "     @w-run:registry=https://box.w-run.net/npm/"