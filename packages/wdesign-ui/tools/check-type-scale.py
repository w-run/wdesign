#!/usr/bin/env python3
"""
检查组件样式里的**裸字号**（font-size: 13.5px 这类没有走令牌的写法）。

为什么需要这个脚本：
    组件样式里曾经散落着 226 处裸 font-size，落在 20 个档位上：
    8.5 / 9 / 9.5 / 10.5 / 11 / 11.5 / 12 / 12.5 / 13 / 13.5 / 14 /
    14.5 / 15 / 15.5 / 16 / 17 / 19 / 20 / 22 / 26 px。

    档位一多，"哪个字号给谁用"就没人记得住 —— 最后每个新组件
    都挑一个"看起来差不多"的裸值，页面的层级感被稀释成一片噪声。
    这正是"小气"观感的结构性来源，不是某个组件的问题。

    更隐蔽的是：SCSS 变量的 `!default` 是**先定义者胜**。
    _tokens.scss 里 `$wd-fs-display` 曾被定义两次，上面那份 56px 一直生效，
    下面注释里声称的 clamp() 从未被读取 —— 令牌"看起来在"，实际是死的。
    这个脚本的 sibling（check-tokens.py）查的是"变量有没有被引用"，
    查不出"引用了但值是错的"，所以字阶要单独守一道。

检查项：
    A. font-size 用了 px 裸值          → 必须改成 var(--wd-fs-*)
    B. font-size 用了 em / rem 裸值     → 同上（em 相对父级，更不可控）
    C. font-size 用了小数字且**不是**字阶档位 → 提示档位不存在

豁免：
    · 标记 `check-type-scale: ignore` 的行（数据展示大数字等合理例外）
    · 行内注释里含"数据展示"或"大数字"的字样（需显式豁免标记才放行）

用法：
    python3 tools/check-type-scale.py           # 只报告
    python3 tools/check-type-scale.py --strict  # 有问题则 exit 1（CI 用）
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCSS_GLOB = os.path.join(ROOT, 'src/styles/components/**/*.scss')

# 字阶档位（与 _tokens.scss 的 --wd-fs-* 一一对应）
# 数值取自令牌；nano 9.5 是下限，再小就难以辨认
TYPE_SCALE = {
    'display': 'clamp(40px, 3.4vw, 56px)',
    'title': '28px',
    'heading': '18px',
    'body': '14.5px',
    'lg': '16px',
    'ui': '14px',
    'caption': '13px',
    'label': '12.5px',
    'sm': '12.5px',
    'xs': '11.5px',
    'micro': '10.5px',
    'nano': '9.5px',
}

# 裸值 → 建议令牌
SUGGEST = {
    '10.5': 'micro',
    '9.5': 'nano',
    '9': 'nano',
    '8.5': 'nano',
    '13': 'caption',
    '13.5': 'caption',
    '12.5': 'label',
    '12': 'label',
    '11.5': 'xs',
    '11': 'xs',
    '14': 'ui',
    '14.5': 'body',
    '15': 'body',
    '15.5': 'body',
    '16': 'lg',
}

RE_FONT_PX = re.compile(r'font-size\s*:\s*([0-9]+(?:\.[0-9]+)?)px\b')
RE_FONT_REL = re.compile(r'font-size\s*:\s*([0-9]+(?:\.[0-9]+)?)(em|rem)\b')
RE_VAR_OK = re.compile(r'font-size\s*:\s*var\(')


def strip_comment(ln):
    """去掉行注释与块注释内容，避免注释里的示例值被误报。"""
    out = []
    in_block = False
    i = 0
    while i < len(ln):
        if in_block:
            if ln[i:i + 2] == '*/':
                in_block = False
                i += 2
                continue
            out.append(' ')
            i += 1
            continue
        if ln[i:i + 2] == '/*':
            in_block = True
            out.append('  ')
            i += 2
            continue
        if ln[i:i + 2] == '//':
            break
        out.append(ln[i])
        i += 1
    return ''.join(out)


def scan(path):
    rel = os.path.relpath(path, ROOT)
    raw = open(path, encoding='utf-8').read().split('\n')
    issues = []
    in_block_comment = False

    for i, original in enumerate(raw):
        # 整块块注释跳过
        if in_block_comment:
            if '*/' in original:
                in_block_comment = False
            continue
        if original.strip().startswith('/*') and '*/' not in original:
            in_block_comment = True
            continue

        line = strip_comment(original)
        if not RE_FONT_PX.search(line) and not RE_FONT_REL.search(line):
            continue

        # 显式豁免：本行或上一行有标记
        ctx = original + (raw[i - 1] if i else '')
        if 'check-type-scale: ignore' in ctx:
            continue

        m = RE_FONT_PX.search(line)
        if m:
            val = m.group(1)
            name = SUGGEST.get(val)
            if name:
                issues.append((
                    rel, i + 1,
                    f'font-size: {val}px —— 改用 var(--wd-fs-{name})（{TYPE_SCALE[name]}）',
                ))
            else:
                issues.append((
                    rel, i + 1,
                    f'font-size: {val}px 不在字阶档位内；'
                    f'若确为数据展示大数字，请加 "check-type-scale: ignore" 注释显式豁免',
                ))
            continue

        m2 = RE_FONT_REL.search(line)
        if m2:
            issues.append((
                rel, i + 1,
                f'font-size: {m2.group(1)}{m2.group(2)} —— 相对单位会随父级缩放，'
                f'层级不可控；改用 var(--wd-fs-*)',
            ))

    return issues


def main():
    strict = '--strict' in sys.argv
    paths = sorted(glob.glob(SCSS_GLOB, recursive=True))
    all_issues = []
    for path in paths:
        all_issues.extend(scan(path))

    if not all_issues:
        print(f'✓ 字阶检查通过（{len(paths)} 个组件样式文件，无裸字号）')
        return 0

    for rel, line, msg in all_issues:
        print(f'{rel}:{line}  {msg}')
    print(f'\n共 {len(all_issues)} 处')
    return 1 if strict else 0


if __name__ == '__main__':
    sys.exit(main())
