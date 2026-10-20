#!/usr/bin/env python3
"""
rescale-icons.py — 图标视觉体量归一：居中缩放，viewBox 不变

## 为什么
SVG 都画在 256×256 画布上，但**「占满画布」不等于「看起来一样大」**。
`heart` 这类图标实测外廓 214×198、视觉体量 226.9，而 `bell` 192×214、
体量 219.7 —— heart 明显大一小圈；再加上 heart 笔画更粗（21 vs 17），
观感差距被放大。

## 判据：视觉体量 = √((w+t)(h+t))，纯几何，不打分不加权
w/h 是光栅化后**墨迹**的包围盒，t 是笔画厚度（filled 图标 t 记为 0，
因为实心块没有笔画概念）。

## 做法
以全库**中位体量**为基准，超过基准的图标**只缩不放**、收敛一半、下限 0.94：

    系数 = clamp(1 - (体量 - 中位)/体量 × 0.5, 0.94, 1)

`viewBox` 原样保留，只给内部内容套一层以**墨迹中心**为轴的缩放：

    <g data-optical="rescale"
       transform="translate(cx,cy) scale(k) translate(-cx,-cy)">…</g>

## 用法
    python3 tools/rescale-icons.py --dry-run   # 只报告
    python3 tools/rescale-icons.py             # 写回（自动备份）
    python3 tools/rescale-icons.py --restore   # 从备份还原
"""
import os, re, sys, json, subprocess, shutil, tempfile

ROOT = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(ROOT)
ICONS = os.path.join(ROOT, 'icons')
BACKUP = os.path.join(ROOT, '.icons-backup')
REPORT = os.path.join(ROOT, '.rescale-report.json')

DRY = '--dry-run' in sys.argv
RESTORE = '--restore' in sys.argv
STRENGTH = 0.6      # 收敛强度：收掉超出基准的 60%（温和，避免整体变小）
MIN_SCALE = 0.93    # 最多缩 7%，避免过度
AXIS = 'width'      # 归一轴：width / height / max

PROBE = 96         # 光栅化分辨率（够量包围盒，比 256 快 4×）
STRIDE = 3          # 逐 2 像素采样，再快 4×


def measure_one(args):
    """光栅化单个图标，返回 (w, h, t, cx, cy)，坐标已换算回 256 空间"""
    style, name, path = args
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as tmp:
        png = tmp.name
    try:
        subprocess.run(
            ['rsvg-convert', '-w', str(PROBE), '-h', str(PROBE), '-o', png, path],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        from PIL import Image
        im = Image.open(png).convert('RGBA')
        px = im.load()
        W, H = im.size
        x0, y0, x1, y1 = W, H, -1, -1
        for y in range(0, H, STRIDE):
            for x in range(0, W, STRIDE):
                if px[x, y][3] > 60:
                    if x < x0: x0 = x
                    if y < y0: y0 = y
                    if x > x1: x1 = x
                    if y > y1: y1 = y
        if x1 < 0:
            return (style, name, None)

        # 笔画厚度：只在 outlined 上有意义；取短连续段中位数
        stroke = 0
        if style == 'outlined':
            runs = []
            for y in range(y0, y1 + 1, STRIDE):
                run = 0
                for x in range(x0, x1 + 1, STRIDE):
                    if px[x, y][3] > 60:
                        run += 1
                    else:
                        if 2 < run < 40:
                            runs.append(run)
                        run = 0
            runs.sort()
            if runs:
                stroke = runs[len(runs) // 2] * STRIDE

        s = 256.0 / W  # 换算回 viewBox 空间
        w = (x1 - x0 + STRIDE) * s
        h = (y1 - y0 + STRIDE) * s
        cx = (x0 + x1) / 2 * s
        cy = (y0 + y1) / 2 * s
        return (style, name, (w, h, stroke, cx, cy))
    except Exception:
        return (style, name, None)
    finally:
        if os.path.exists(png):
            os.unlink(png)


def wrap(svg, cx, cy, k):
    """居中缩放：viewBox 不变，只包一层 transform"""
    m = re.search(r'(<svg[^>]*>)([\s\S]*)(</svg>)', svg)
    if not m:
        return None
    kk, cxx, cyy = round(k, 3), round(cx, 2), round(cy, 2)
    g = ('<g data-optical="rescale" transform="translate(%s,%s) scale(%s) '
         'translate(-%s,-%s)">' % (cxx, cyy, kk, cxx, cyy))
    return m.group(1) + g + m.group(2) + '</g>' + m.group(3)


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

    if not shutil.which('rsvg-convert'):
        print('❌ 需要 rsvg-convert：apk add rsvg-convert')
        sys.exit(1)

    jobs = []
    for style in ('outlined', 'filled'):
        d = os.path.join(ICONS, style)
        if os.path.isdir(d):
            for f in sorted(os.listdir(d)):
                if f.endswith('.svg'):
                    jobs.append((style, f[:-4], os.path.join(d, f)))

    print('测量 %d 个图标…' % len(jobs))
    geo = {}
    for i, job in enumerate(jobs, 1):
        style, name, r = measure_one(job)
        if r:
            geo['%s/%s' % (style, name)] = r
        if i % 100 == 0:
            print('   %d/%d' % (i, len(jobs)), flush=True)

    # 归一轴：人眼并排比较时最先感知的是**宽度**（heart 宽 216、bell 宽 192，
    # 但两者 max(w,h) 都是 216 —— 用几何平均或 max 会把差异抵消掉）。
    def span(v):
        w, h, t, _, _ = v
        return {'width': w, 'height': h, 'max': max(w, h),
                'area': (w * h) ** 0.5}[AXIS]

    outlined_spans = [span(v) for k, v in geo.items() if k.startswith('outlined/')]
    filled_spans = [span(v) for k, v in geo.items() if k.startswith('filled/')]
    med = {'outlined': sorted(outlined_spans)[len(outlined_spans) // 2],
           'filled': sorted(filled_spans)[len(filled_spans) // 2]}

    plan = {}
    for key, v in geo.items():
        w, h, t, cx, cy = v
        style = key.split('/')[0]
        d = span(v)
        base = med[style]
        k = 1.0
        if d > base:
            # 只缩不放；把超出基准的部分收敛掉 STRENGTH 比例
            k = 1 - (d - base) / d * STRENGTH
            k = max(MIN_SCALE, round(k * 50) / 50)   # 量化到 0.02，档位便于审阅
        plan[key] = {'scale': k, 'w': round(w, 1), 'h': round(h, 1), 't': t,
                     'span': round(d, 1), 'base': round(base, 1),
                     'cx': round(cx, 2), 'cy': round(cy, 2)}

    shrinking = {k: v for k, v in plan.items() if v['scale'] < 1}
    print('=' * 62)
    print('归一轴 %s · 基准 outlined=%.0f / filled=%.0f · 需要缩小 %d / %d 个'
          % (AXIS, med['outlined'], med['filled'], len(shrinking), len(plan)))
    dist = {}
    for v in shrinking.values():
        dist[v['scale']] = dist.get(v['scale'], 0) + 1
    for k in sorted(dist):
        print('   ×%.2f  %d 个' % (k, dist[k]))
    print('\n样例：')
    for key in ('outlined/heart', 'outlined/bell', 'outlined/home', 'outlined/star',
                'outlined/anchor', 'outlined/search', 'outlined/briefcase'):
        if key in plan:
            v = plan[key]
            tag = '×%.2f' % v['scale'] if v['scale'] < 1 else '不变'
            print('   %-20s %3.0f×%-3.0f  %s=%5.1f(基准%.0f)  → %s'
                  % (key, v['w'], v['h'], AXIS, v['span'], v['base'], tag))

    json.dump({'axis': AXIS, 'base': med, 'plan': plan},
              open(REPORT, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)

    if DRY:
        print('\n[dry-run] 未改动文件；报告 = .rescale-report.json')
        return

    if not os.path.isdir(BACKUP):
        for style in ('outlined', 'filled'):
            src = os.path.join(ICONS, style)
            if os.path.isdir(src):
                shutil.copytree(src, os.path.join(BACKUP, style))
        print('\n已备份 → .icons-backup/')

    done = skipped = 0
    for key, v in shrinking.items():
        style, name = key.split('/')
        path = os.path.join(ICONS, style, name + '.svg')
        svg = open(path, encoding='utf-8').read()
        if 'data-optical' in svg:
            skipped += 1
            continue
        out = wrap(svg, v['cx'], v['cy'], v['scale'])
        if out:
            open(path, 'w', encoding='utf-8').write(out)
            done += 1
        else:
            skipped += 1
    print('\n✅ 重绘 %d 个（跳过 %d）' % (done, skipped))
    print('   还原：python3 tools/rescale-icons.py --restore')


if __name__ == '__main__':
    main()
