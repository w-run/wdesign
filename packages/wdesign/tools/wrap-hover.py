#!/usr/bin/env python3
"""
逐文件、逐条手工确认过的 hover 包裹。

===== 为什么不用自动脚本 =====
试过一版"顶层 :hover 自动包一层 @media"，结果把逗号分隔的多选择器
和嵌套在 @media 里的规则拆坏了（编译报 expected selector）。
SCSS 的结构复杂度超出简单行扫描能处理的范围 —— 这类批量改写
一旦出错会静默改变语义，比不修更危险。

===== 策略 =====
只包「单选择器 + 单行规则」的情况：
    .foo:hover { color: x; }
→
    @media (hover: hover) {
      .foo:hover { color: x; }
    }

多行的块（`{` 后换行）与逗号多选择器一律跳过，留人工处理。
"""
import os
import re
import sys

DIR = 'src/styles/components'
DRY = '--apply' not in sys.argv

# 单行规则：选择器 { 属性; }
SINGLE = re.compile(r'^(\.[^\n{},]*(?::hover)[^\n{},]*)\s*\{([^{}]*)\}\s*$')


def wrap_file(path):
    lines = open(path, encoding='utf-8').read().split('\n')
    out = []
    changed = 0
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # 跳过已是 @media 内的、注释、以及缩进块（嵌套）
        if (line and not line[0].isspace()
                and ':hover' in stripped
                and not stripped.startswith('//')
                and not stripped.startswith('/*')):

            m = SINGLE.match(stripped)
            if m:
                # 单行规则 → 就地包裹
                out.append('@media (hover: hover) {')
                out.append('  ' + stripped)
                out.append('}')
                changed += 1
                i += 1
                continue

        out.append(line)
        i += 1

    return out, changed


total = 0
for f in sorted(os.listdir(DIR)):
    if not f.endswith('.scss'):
        continue
    path = os.path.join(DIR, f)
    lines, n = wrap_file(path)
    if n:
        total += n
        if DRY:
            print(f'  [dry] {f}: {n} 处')
        else:
            open(path, 'w', encoding='utf-8').write('\n'.join(lines))
            print(f'  ✓ {f}: {n} 处')

print(f'\n共 {total} 处' + ('（干跑，加 --apply 执行）' if DRY else '已写入'))
