# ============================================================
# publish.sh — 一键发布 @w-run/* 到 w-box 私有静态 npm 源
#  目标：10.0.0.99:/workspace/static/npm/  →  https://box.w-run.net/npm/
#
#  产物布局（一次发布，npm 包 + 字体都在 npm/ 下）：
#    /npm/@w-run/wdesign.json                      ← 包元数据
#    /npm/@w-run/wdesign/-/w-run-wdesign-1.0.0.tgz ← 包体
#    /npm/fonts/*                                  ← 字体（CDN，独立于包）
# ============================================================
set -e
cd "$(dirname "$0")/.."

BOX=root@10.0.0.99
KEY="$HOME/.ssh/ssh_box"
SSH="ssh -o BatchMode=yes -o ConnectTimeout=15 -i $KEY $BOX"

# 1) 生成静态源产物（元数据 JSON + tarball）
NPM_BASE_URL=https://box.w-run.net/npm node tools/publish-static.mjs dist-npm

# 2) 字体一起放入 npm/fonts（若尚未同步）
mkdir -p dist-npm/fonts
cp -f fonts/mona-sans-vf.woff2 dist-npm/fonts/ 2>/dev/null || true
cp -f fonts/noto-sans-sc-vf.woff2 dist-npm/fonts/ 2>/dev/null || true
cp -n fonts/noto-sans-sc-vf.ttf dist-npm/fonts/ 2>/dev/null || true
cp -f fonts/wdesign-fonts.css dist-npm/fonts/

# 3) scp 上传（合并到远端，不动其它包）
$SSH 'mkdir -p /workspace/static/npm'
scp -o BatchMode=yes -o ConnectTimeout=15 -i "$KEY" -r dist-npm/* "$BOX:/workspace/static/npm/" 2>&1 | grep -v '^$' || true

echo ""
echo "✅ 已发布 → https://box.w-run.net/npm/@w-run/wdesign"
echo ""
echo "消费端项目根 .npmrc:"
echo "  registry=https://registry.npmmirror.com/"
echo "  @w-run:registry=https://box.w-run.net/npm/"
echo ""
echo "字体（CSS 直引）:"
echo "  <link rel=\"stylesheet\" href=\"https://box.w-run.net/npm/fonts/wdesign-fonts.css\">"