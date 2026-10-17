#!/usr/bin/env python3
"""
hover-js.py — 为 :hover 规则生成 `.is-hover` 状态类选择器（渐进增强）。

## 关键点（踩过的坑）
状态类选择器**必须放在 `@media (hover: hover)` 之外**。
上一版把它们和 :hover 一起写在媒体查询里 → 触屏上媒体查询不成立，
状态类同样失效，整个改造等于白做。

## 产出形态

    @media (hover: hover) {           /* 纯 CSS 降级：桌面端行为不变 */
      .wd-tag--tint:hover { … }
    }
    .wd-tag--tint.is-hover { … }      /* JS 增强：任何指针类型都能精确控制 */

## 用法
    python3 tools/hover-js.py           # 改写
    python3 tools/hover-js.py --check   # 只报告
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STY = os.path.join(ROOT, 'src/styles')
CHECK = '--check' in sys.argv
SKIP = {'_vars.scss', '_dark.scss', '_tokens.scss', '_base.scss', '_mixins.scss'}
MARK = 'JS 增强'


def strip_noise(s):
    out = list(s)
    for m in re.finditer(r'/\*.*?\*/', s, re.S):
        for k in range(m.start(), m.end()):
            if out[k] != '\n':
                out[k] = ' '
    for m in re.finditer(r'//[^\n]*', s):
        for k in range(m.start(), m.end()):
            out[k] = ' '
    return ''.join(out)


def block_spans(s):
    clean = strip_noise(s)
    out, stack = [], []
    for i, ch in enumerate(clean):
        if ch == '{':
            stack.append(i)
        elif ch == '}':
            if stack:
                out.append((stack.pop(), i))
    return out


def to_state_selector(sel):
    return re.sub(r':hover\b', '.is-hover', sel)


def process(path):
    src = open(path, encoding='utf-8').read()
    spans = block_spans(src)
    clean = strip_noise(src)

    # 1) 找出 @media (hover...) 区间，以及其中「最内层」的 hover 规则
    media_spans = []
    for m in re.finditer(r'@media[^{]*hover[^{]*\{', clean):
        # 找配对 '}'
        d = 0
        for i in range(m.end() - 1, len(clean)):
            if clean[i] == '{':
                d += 1
            elif clean[i] == '}':
                d -= 1
                if d == 0:
                    media_spans.append((m.start(), i))
                    break

    jobs = []   # (插入位置, 选择器, 声明)
    for o, c in spans:
        body = clean[o + 1:c]
        if '{' in body or '}' in body:
            continue
        # 选择器
        parent_end = 0
        for po, pc in spans:
            if po < o < pc:
                parent_end = max(parent_end, po + 1)
        seg = src[parent_end:o]
        cut = max(seg.rfind('}'), seg.rfind(';'))
        hstart = parent_end + (cut + 1 if cut >= 0 else 0)
        sel = src[hstart:o].strip()
        if ':hover' not in sel or '.is-hover' in sel:
            continue
        hov = [p.strip() for p in sel.split(',') if ':hover' in p]
        if not hov:
            continue
        # 必须位于 hover 媒体查询内（否则是漏网规则，先跳过另行处理）
        encl = [sp for sp in media_spans if sp[0] < o < sp[1]]
        if not encl:
            continue
        media_end = max(e[1] for e in encl)
        jobs.append((media_end, [to_state_selector(p) for p in hov], ' '.join(src[o + 1:c].split())))

    if not jobs:
        return 0

    # 2) 从后往前插：插在上层媒体查询块**之后**
    out = src
    for media_end, sels, decl in sorted(jobs, key=lambda x: -x[0]):
        addition = ('\n' + '/* ' + MARK + '（addHover）：同一份声明，由 .is-hover 驱动，'
                    '不受 hover 媒体查询限制 */\n'
                    + ', '.join(sels) + ' { ' + decl + ' }\n')
        out = out[:media_end + 1] + addition + out[media_end + 1:]

    if not CHECK:
        # 结构校验：花括号配平
        d = 0
        for ch in strip_noise(out):
            if ch == '{':
                d += 1
            elif ch == '}':
                d -= 1
        if d != 0:
            print('❌ %s 配平失败，放弃写入' % path)
            return 0
        open(path, 'w', encoding='utf-8').write(out)
    return len(jobs)


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
print('\n%s %d 条 hover 生成 .is-hover 选择器，%d 个文件'
      % ('[待改]' if CHECK else '[已改]', total, files))
