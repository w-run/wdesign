#!/usr/bin/env python3
"""
normalize-icons.py — 按「视觉惯性半径」归一图标大小

## 度量为什么是惯性半径
图标都画在 256×256 画布上，但「占满画布」不等于「看起来一样大」。试过的度量：

| 度量 | 结果 | 问题 |
|---|---|---|
| 包围盒 / 宽度 | home 最大、heart 最小 | 与肉眼排序相反 |
| 墨迹覆盖率 | heart 0.142 / bell 0.162 | 测不出粗细 |
| 几何平均 √(w·h) | heart 216.9 / bell 215.7 | 方向差异被抵消 |
| **惯性半径** | **home 85.2 < bell 86.7 < search 88.1 < heart 90.1** | **与肉眼排序一致** |

惯性半径（radius of gyration）是把每个像素当作质量、算它到重心的
均方根距离。它天然同时包含：整体尺寸、笔画粗细、以及**内部空洞造成的
质量分散** —— 这正是 `home`（门洞 + 屋顶空隙多）显小、
`heart`（紧凑闭合团块）显大的原因。

## 做法
以全库惯性半径的**中位**为基准，把偏离的图标向基准缩放：

    系数 k = base / r_g       （只缩不放，下限 --min-scale）

`viewBox` 不变，只给内部内容套以**墨迹重心**为轴的缩放：

    <g data-optical="rg" transform="translate(cx,cy) scale(k) translate(-cx,-cy)">…</g>

缩放会同步改变笔画粗细，但这正是视觉归一想要的 —— 粗细本就是视觉重量的一部分。

## 用法
    python3 tools/normalize-icons.py --dry-run
    python3 tools/normalize-icons.py
    python3 tools/normalize-icons.py --restore
"""
import os, re, sys, json, subprocess, shutil, tempfile

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
ICONS = os.path.join(ROOT, 'icons')
BACKUP = os.path.join(ROOT, '.icons-backup')
REPORT = os.path.join(ROOT, '.normalize-report.json')

ARGS = sys.argv[1:]
DRY = '--dry-run' in ARGS
RESTORE = '--restore' in ARGS


def arg(name, default):
    if name in ARGS:
        i = ARGS.index(name)
        if i + 1 < len(ARGS):
            return type(default)(ARGS[i + 1])
    return default


STRENGTH = arg('--strength', 1.0)     # 1.0 = 完全归到基准
MIN_SCALE = arg('--min-scale', 0.90)
MAX_SCALE = arg('--max-scale', 1.00)  # 默认只缩不放
PROBE = 256


def render(svg_path, size=PROBE):
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as t:
        out = t.name
    subprocess.run(['rsvg-convert', '-w', str(size), '-h', str(size), '-o', out, svg_path],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    a = np.array(Image.open(out).convert('RGBA').split()[-1]).astype(np.float32) / 255.0
    os.unlink(out)
    return a


def moments(alpha):
    """返回 (gyration, cx, cy, ink)，坐标在 viewBox(256) 空间"""
    ys, xs = np.nonzero(alpha > 0.3)
    if len(xs) == 0:
        return None
    w = alpha[ys, xs]
    m = w.sum()
    cx = (w * xs).sum() / m
    cy = (w * ys).sum() / m
    r2 = (w * ((xs - cx) ** 2 + (ys - cy) ** 2)).sum() / m
    return float(np.sqrt(r2)), float(cx), float(cy), float(m / (alpha.size))


def wrap_scale(svg, cx, cy, k):
    m = re.search(r'(<svg[^>]*>)([\s\S]*)(</svg>)', svg)
    if not m:
        return None
    kk, cxx, cyy = round(k, 3), round(cx, 2), round(cy, 2)
    g = ('<g data-optical="rg" transform="translate(%s,%s) scale(%s) translate(-%s,-%s)">'
         % (cxx, cyy, kk, cxx, cyy))
    return m.group(1) + g + m.group(2) + '</g>' + m.group(3)


def strip_wrap(svg):
    """去掉已有的 data-optical 包裹（用于重复运行）"""
    return re.sub(r'<g data-optical="[^"]*"[^>]*>([\s\S]*)</g>', r'\1', svg)


def main():
    if RESTORE:
        n = 0
        for style in ('outlined', 'filled'):
            b = os.path.join(BACKUP, style)
            if os.path.isdir(b):
                for f in os.listdir(b):
                    shutil.copy2(os.path.join(b, f), os.path.join(ICONS, style, f))
                    n += 1
        print('已还原 %d 个图标' % n)
        return

    # 始终以备份（原始）为基线；没有备份说明是首次运行
    src_root = BACKUP if os.path.isdir(BACKUP) else ICONS

    jobs = []
    for style in ('outlined', 'filled'):
        d = os.path.join(src_root, style)
        if os.path.isdir(d):
            for f in sorted(os.listdir(d)):
                if f.endswith('.svg'):
                    jobs.append((style, f[:-4], os.path.join(d, f)))

    print('基线：%s（%d 个）' % ('.icons-backup/' if src_root == BACKUP else 'icons/', len(jobs)))
    data = {}
    for i, (style, name, path) in enumerate(jobs, 1):
        try:
            mo = moments(render(path))
            if mo:
                data['%s/%s' % (style, name)] = mo
        except Exception:
            pass
        if i % 150 == 0:
            print('   %d/%d' % (i, len(jobs)), flush=True)

    # 分风格取中位（outlined 与 filled 的视觉密度本就不同）
    base = {}
    for st in ('outlined', 'filled'):
        rs = sorted(v[0] for k, v in data.items() if k.startswith(st + '/'))
        if rs:
            base[st] = rs[len(rs) // 2]

    plan = {}
    for key, (rg, cx, cy, ink) in data.items():
        st = key.split('/')[0]
        b = base[st]
        k = 1.0 + (b / rg - 1.0) * STRENGTH   # 向基准靠拢
        k = min(MAX_SCALE, max(MIN_SCALE, round(k, 2)))
        if abs(k - 1) > 0.005:
            plan[key] = {'scale': k, 'rg': round(rg, 1), 'base': round(b, 1),
                         'ink': round(ink, 3), 'cx': round(cx, 2), 'cy': round(cy, 2)}

    print('\n惯性半径基准：%s' % ' '.join('%s=%.1f' % (k, v) for k, v in base.items()))
    print('需调整 %d / %d 个' % (len(plan), len(data)))
    dist = {}
    for v in plan.values():
        dist[v['scale']] = dist.get(v['scale'], 0) + 1
    for k in sorted(dist):
        print('   ×%.2f  %d 个' % (k, dist[k]))

    print('\n关键图标：')
    for n in ('home', 'bell', 'search', 'heart'):
        key = 'outlined/' + n
        if key in data:
            rg = data[key][0]
            k = plan.get(key, {}).get('scale', 1.0)
            print('   %-8s r_g=%5.1f (基准 %.1f) → ×%.2f' % (n, rg, base['outlined'], k))

    json.dump({'base': base, 'plan': plan}, open(REPORT, 'w', encoding='utf-8'),
              indent=1, ensure_ascii=False)
    if DRY:
        print('\n[dry-run] 报告 → .normalize-report.json')
        return

    if not os.path.isdir(BACKUP):
        for st in ('outlined', 'filled'):
            s = os.path.join(ICONS, st)
            if os.path.isdir(s):
                shutil.copytree(s, os.path.join(BACKUP, st))
        print('\n已备份 → .icons-backup/')

    done = 0
    for key, v in plan.items():
        st, name = key.split('/')
        src = os.path.join(BACKUP, st, name + '.svg')
        dst = os.path.join(ICONS, st, name + '.svg')
        if not os.path.exists(src):
            src = dst
        svg = strip_wrap(open(src, encoding='utf-8').read())
        out = wrap_scale(svg, v['cx'], v['cy'], v['scale'])
        if out:
            open(dst, 'w', encoding='utf-8').write(out)
            done += 1
    print('\n✅ 调整 %d 个图标' % done)
    print('   还原：python3 tools/normalize-icons.py --restore')


if __name__ == '__main__':
    main()
