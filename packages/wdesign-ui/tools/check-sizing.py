#!/usr/bin/env python3
"""
检查「尺寸约束互相打架」的写法。

为什么需要这个脚本：
    这一期连续踩了三次同一个坑 —— **CSS 里 min-* 的优先级高于 max-***：

    1. `.demo-block { min-width: 300px; max-width: 100% }`
       容器只有 264 时，卡片硬撑 300，右边被裁掉（390 屏实测）
    2. 网格 `minmax(240px, 1fr)`：容器 228 时轨道仍按 240 排，卡片被裁
    3. 浮层 `min-width: 100%`：Teleport 到 body 后 100% 变成 body 宽，
       `max-width: 320px` 直接失效，面板铺满 1512px

    三者都属于「写的时候完全合法、跑起来才发现」的类型，肉眼审代码很难抓住。

检查项：
    A. 同一规则里同时出现 `min-width: <数字>px` 与 `max-width:`  → 提示改成 min()
    B. `grid-template-columns` 里 `minmax(<数字>px, …)`              → 提示 min(Npx, 100%)
    C. `width: <数字>px` 且同规则有 `max-width` 但**没有** min-width → 安全，不报

用法：
    python3 tools/check-sizing.py           # 只报告
    python3 tools/check-sizing.py --strict  # 有问题则 exit 1（CI 用）
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCSS_GLOB = os.path.join(ROOT, 'src/styles/**/*.scss')

# min-width: 240px / min-width:240px（排除 min()、var()、百分比、auto）
PX = r'(\d+(?:\.\d+)?)px'
RE_MIN_PX = re.compile(r'^\s*min-width\s*:\s*' + PX + r'\s*;')
RE_MAX_ANY = re.compile(r'^\s*max-width\s*:\s*(.+?)\s*;?\s*$')
RE_MINMAX_PX = re.compile(r'minmax\(\s*' + PX + r'\s*,')


def blocks(lines):
    """把 SCSS 切成 [(start_idx, end_idx, [声明行...])]，只取最内层规则的直接声明。"""
    stack = []
    out = []
    for i, ln in enumerate(lines):
        stripped = ln.strip()
        # 行注释与块注释里的内容不算
        if stripped.startswith('//') or stripped.startswith('*') or stripped.startswith('/*'):
            continue
        if '{' in ln:
            stack.append((i, []))
            # 同一行 `{` 之前可能有声明（SCSS 允许），忽略这种边缘情况
            continue
        if stripped.startswith('}'):
            if stack:
                start, decls = stack.pop()
                if decls:
                    out.append((start, i, decls))
            continue
        if stack:
            stack[-1][1].append((i, ln))
    return out


def scan(path):
    rel = os.path.relpath(path, ROOT)
    lines = open(path, encoding='utf-8').read().split('\n')
    issues = []

    for start, _end, decls in blocks(lines):
        min_line = None
        max_val = None
        for i, ln in decls:
            m = RE_MIN_PX.match(ln)
            if m:
                min_line = (i, float(m.group(1)))
            m2 = RE_MAX_ANY.match(ln)
            if m2:
                max_val = m2.group(1).strip()
        # 允许显式忽略：该行或上一行有 `check-sizing: ignore`
        if min_line:
            i0 = min_line[0]
            ctx = lines[i0] + (lines[i0 - 1] if i0 else '')
            if 'check-sizing: ignore' in ctx:
                continue
        if min_line and max_val is not None:
            px = min_line[1]
            # max 也是 px 且不小于 min → 两者不打架（如 min 220 / max 380）
            mpx = re.fullmatch(r'(\d+(?:\.\d+)?)px', max_val)
            if mpx and float(mpx.group(1)) >= px:
                continue
            i = min_line[0]
            issues.append((
                rel, i + 1,
                f'min-width: {px:g}px 与 max-width: {max_val} 同规则 —— min 优先级更高，'
                f'容器更窄时会被它顶破；改 min({px:g}px, 100%) 之类',
            ))

    for i, ln in enumerate(lines):
        if '//' in ln:
            ln = ln[: ln.index('//')]
        if 'minmax(' in ln:
            for m in RE_MINMAX_PX.finditer(ln):
                issues.append((
                    rel, i + 1,
                    f'minmax({m.group(1)}px, …) —— 容器窄于 {m.group(1)}px 时轨道仍按最小值排、'
                    f'内容被裁；改 minmax(min({m.group(1)}px, 100%), …)',
                ))
    return issues


def main():
    strict = '--strict' in sys.argv
    all_issues = []
    for path in sorted(glob.glob(SCSS_GLOB, recursive=True)):
        all_issues.extend(scan(path))

    if not all_issues:
        print('✓ 尺寸约束检查通过（无 min/max 冲突、无固定最小值网格）')
        return 0

    for rel, line, msg in all_issues:
        print(f'{rel}:{line}  {msg}')
    print(f'\n共 {len(all_issues)} 处')
    return 1 if strict else 0


if __name__ == '__main__':
    sys.exit(main())
