#!/usr/bin/env python3
"""
hover-guard.py — 把所有 :hover 规则收进 @media (hover: hover)。

## 为什么
触屏设备上，:hover 在 tap 之后会一直保持，直到用户点别处 ——
点了一个按钮，它就停在悬停态（变色 / 放大 / 阴影），看起来像卡住。
这是系统性问题（全库 60+ 条规则），不是个别组件的疏漏。

## 怎么做的
按**最内层优先**的顺序改写：先处理不含子块的花括号块，把需要保护的
重写成 `@media (hover: hover) { … }`，再从外向里收敛。
这样嵌套规则（`.wd-btn--primary { &:hover … }`）不会被误当成叶子块，
父块的结构也不会被破坏。

## 用法
    python3 tools/hover-guard.py          # 改写
    python3 tools/hover-guard.py --check  # 只报告（≥1 处则非零退出，供 CI）
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STY = os.path.join(ROOT, 'src/styles')
CHECK = '--check' in sys.argv
SKIP = {'_vars.scss', '_dark.scss', '_tokens.scss'}


def match_brace(s, i):
    """s[i] == '{'，返回配对 '}' 的下标"""
    d = 0
    for j in range(i, len(s)):
        if s[j] == '{':
            d += 1
        elif s[j] == '}':
            d -= 1
            if d == 0:
                return j
    return -1


def strip_noise(s):
    """把注释替换成等长空格，保证下标不变"""
    out = list(s)
    for m in re.finditer(r'/\*.*?\*/', s, re.S):
        for k in range(m.start(), m.end()):
            if out[k] != '\n':
                out[k] = ' '
    for m in re.finditer(r'//[^\n]*', s):
        for k in range(m.start(), m.end()):
            out[k] = ' '
    return ''.join(out)


def leaf_blocks(s):
    """返回最内层规则的 (open_idx, close_idx, head_start, head)。

    head 必须只取「选择器」：父块里上一条声明（`transition: ...;`）的尾巴
    不能混进来，否则会把声明当选择器、产出非法 CSS。
    做法：父块开头 → '{' 之间，按最后一个 ';' 或 '}' 切，取其后一段。
    """
    clean = strip_noise(s)
    blocks = []
    stack = []
    for i, ch in enumerate(clean):
        if ch == '{':
            stack.append(i)
        elif ch == '}':
            if not stack:
                continue
            o = stack.pop()
            body = clean[o + 1:i]
            if '{' not in body and '}' not in body:
                parent_end = stack[-1] + 1 if stack else 0
                seg = s[parent_end:o]
                cut = max(seg.rfind('}'), seg.rfind(';'))
                head_start = parent_end + (cut + 1 if cut >= 0 else 0)
                blocks.append((o, i, head_start, s[head_start:o].strip()))
    return blocks


def balanced(s):
    """花括号是否配平（剔除注释与字符串后粗校验）"""
    clean = strip_noise(s)
    depth = 0
    for ch in clean:
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth < 0:
                return False
    return depth == 0


def protected_spans(s):
    """@media (hover: hover) 已覆盖的区间"""
    spans = []
    for m in re.finditer(r'@media[^{]*hover[^{]*\{', strip_noise(s)):
        e = match_brace(strip_noise(s), m.end() - 1)
        if e > 0:
            spans.append((m.start(), e))
    return spans


def sel_groups(head):
    if head.startswith('@') or not head:
        return None
    return [p.strip() for p in head.split(',') if p.strip()]


def process(path):
    src = open(path, encoding='utf-8').read()
    changed = 0
    # 反复扫描：每轮只改「当前最内层里需要保护的块」，改完再扫，直到稳定
    for _ in range(200):
        guards = protected_spans(src)
        hit = None
        for o, c, hstart, head in leaf_blocks(src):
            if any(a <= o <= b for a, b in guards):
                continue
            groups = sel_groups(head)
            if not groups:
                continue
            if any(':active' in g or ':focus' in g for g in groups):
                continue
            hov = [g for g in groups if ':hover' in g]
            if not hov:
                continue
            hit = (o, c, hstart, head, groups, hov)
            break
        if not hit:
            break

        o, c, hstart, head, groups, hov = hit
        head_start = hstart
        line_indent = re.match(r'[ \t]*', src[head_start:o]).group(0)

        body_raw = src[o + 1:c]
        body = ' '.join(body_raw.split())
        new_head = ', '.join(hov)
        # 被保护块上移到外层：用一层 @media 包住（保持缩进层级感）
        indent = line_indent if line_indent else ''
        repl = (f'@media (hover: hover) {{\n'
                f'{indent}  {new_head} {{ {body} }}\n'
                f'{indent}}}')
        rest = [g for g in groups if g not in hov]
        if rest:
            # 混合组：hover 部分单独包起来，非 hover 部分原样保留
            repl = repl + f'\n{indent}{", ".join(rest)} {{ {body} }}'
        src = src[:head_start] + repl + src[c + 1:]
        changed += 1

    if changed and not CHECK:
        if not balanced(src):
            raise SystemExit('❌ %s 改写后花括号不配平，已放弃写入' % path)
        open(path, 'w', encoding='utf-8').write(src)
    return changed


total = files = 0
for dp, _, fs in os.walk(STY):
    for f in sorted(fs):
        if not f.endswith('.scss') or f in SKIP:
            continue
        p = os.path.join(dp, f)
        n = process(p)
        if n:
            total += n
            files += 1
            print('  %-42s +%d' % (p.replace(STY + '/', ''), n))

print('\n%s %d 条 hover → @media (hover: hover)，%d 个文件'
      % ('[待改]' if CHECK else '[已改]', total, files))
if CHECK and total:
    sys.exit(1)
