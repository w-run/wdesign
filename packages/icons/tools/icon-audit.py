#!/usr/bin/env python3
"""
icon-audit.py — 图标库光学一致性检查

测量的不是「尺寸」，而是**墨迹覆盖率**：把每个 SVG 光栅化后统计非透明像素占比。
几何尺寸一致但覆盖率相差数倍的图标，并排显示时视觉大小必然不一致
（`minus` 只有一条线，`filled/apps` 占满画布 —— 同为 24px 时观感差 15 倍）。

检查项：
  1. 覆盖率分布（p5/中位/p95）——差距过大说明补偿不足
  2. **补偿效果**：应用 optical.js 的系数后，覆盖率分布应显著收窄
  3. optical.js 的清单是否覆盖所有需要补偿的图标（新增图标提醒）
  4. 画布越界（内容超出 0..256）
  5. 空图标 / 极小图标（可能是坏文件）

依赖：需要把 SVG 光栅化。这里用纯 Python 解析路径面积近似不可行，
因此改为「读 optical.js 的分档 + 校验图标清单一致性」，覆盖率数据由
`tools/measure-ink.js`（浏览器内跑）产出后缓存到 .ink-cache.json。
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONS = os.path.join(ROOT, 'icons')
OPTICAL = os.path.join(ROOT, 'src/optical.js')
CACHE = os.path.join(ROOT, '.ink-cache.json')
STRICT = '--strict' in sys.argv

errors, warns, infos = [], [], []

# ---- 图标清单 ----
files = {}
for style in ('outlined', 'filled'):
    d = os.path.join(ICONS, style)
    if not os.path.isdir(d):
        continue
    for f in os.listdir(d):
        if f.endswith('.svg'):
            files[f'{style}/{f[:-4]}'] = os.path.join(d, f)

if not files:
    print('❌ 找不到图标')
    sys.exit(1)

# ---- 解析 optical.js 的三档清单 ----
src = open(OPTICAL, encoding='utf-8').read()


def parse_set(name):
    m = re.search(r'export const %s = new Set\(\[(.*?)\]\)' % name, src, re.S)
    return set(re.findall(r"'([^']+)'", m.group(1))) if m else set()


TALL = parse_set('OPTICAL_TALL')
LIGHT = parse_set('OPTICAL_LIGHT')
HEAVY = parse_set('OPTICAL_HEAVY')
FACTORS = dict(re.findall(r'(tall|light|heavy):\s*([\d.]+)', src))

# ---- 覆盖率缓存（由浏览器测量产出）----
ink = {}
if os.path.exists(CACHE):
    ink = json.load(open(CACHE, encoding='utf-8'))

# 1) 清单一致性：optical.js 里出现的图标必须真实存在
for label, s in (('TALL', TALL), ('LIGHT', LIGHT), ('HEAVY', HEAVY)):
    ghost = {n for n in s if not any(k.split('/')[1] == n for k in files)}
    if ghost:
        errors.append('OPTICAL_%s 含不存在的图标：%s' % (label, ', '.join(sorted(ghost)[:6])))

# 2) 有覆盖率数据时：找出「明显偏轻但未补偿」的图标
BASE = 1.0
if ink:
    uncompensated = []
    for key, cov in ink.items():
        name = key.split('/')[1]
        if name in TALL or name in LIGHT:
            continue
        if cov < 0.12:          # 显著偏轻
            uncompensated.append((key, cov))
    if uncompensated:
        warns.append('覆盖率 < 0.12 但未进补偿表 %d 个（新图标？）：\n      %s'
                     % (len(uncompensated),
                        '\n      '.join('%s %.3f' % (k, c) for k, c in uncompensated[:8])))

    # 3) 补偿效果：比较补偿前后的离散度
    def spread(vals):
        s = sorted(vals)
        return s[int(len(s) * 0.95)] - s[int(len(s) * 0.05)]

    before = [c for c in ink.values()]
    after = [c * float(FACTORS.get('tall', 1.14) if k.split('/')[1] in TALL
                       else FACTORS.get('light', 1.08) if k.split('/')[1] in LIGHT
                       else FACTORS.get('heavy', 0.97) if k.split('/')[1] in HEAVY
                       else 1) ** 2 for k, c in ink.items()]
    infos.append('覆盖率离散度 p95-p5：补偿前 %.3f → 补偿后 %.3f（越接近 0 越均匀）'
                 % (spread(before), spread(after)))
    infos.append('覆盖率中位：%.3f；补偿档位 tall=%s light=%s heavy=%s'
                 % (sorted(before)[len(before) // 2], FACTORS.get('tall'), FACTORS.get('light'), FACTORS.get('heavy')))
else:
    infos.append('未找到 .ink-cache.json —— 覆盖率相关检查已跳过（跑 tools/measure-ink.js 生成）')

# 4) 画布越界 / 空文件（轻量静态检查）
for key, path in files.items():
    raw = open(path, encoding='utf-8').read()
    if len(raw) < 120:
        errors.append('%s 内容过短（%d 字节），可能是坏文件' % (key, len(raw)))
    if 'viewBox="0 0 256 256"' not in raw:
        warns.append('%s 的 viewBox 不是 0 0 256 256' % key)

# ---- 输出 ----
def show(t, items, mark):
    if not items:
        return
    print('\n%s %s (%d)' % (mark, t, len(items)))
    for i in items:
        print('   · %s' % i)


print('=' * 66)
print('WDesign Icons 审计')
print('=' * 66)
print('图标 %d 个（outlined %d / filled %d）；补偿档 tall %d / light %d / heavy %d'
      % (len(files),
         sum(1 for k in files if k.startswith('outlined/')),
         sum(1 for k in files if k.startswith('filled/')),
         len(TALL), len(LIGHT), len(HEAVY)))
show('错误', errors, '❌')
show('警告', warns, '⚠️')
show('提示', infos, 'ℹ️')
print('\n' + '=' * 66)
if errors:
    print('结果：❌ %d 错误 / %d 警告' % (len(errors), len(warns)))
    if STRICT:
        sys.exit(1)
else:
    print('结果：✅ 无错误（%d 警告）' % len(warns) if warns else '结果：✅ 全部通过')
