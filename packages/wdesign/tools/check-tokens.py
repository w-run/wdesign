#!/usr/bin/env python3
"""
检查 SCSS 里引用了不存在的 CSS 变量。

为什么需要这个脚本：
    浏览器对 `var(--wd-foo)` 引用未定义变量**不会报错**，而是整条声明
    被丢弃（computed value = unset）。表现为「样式莫名其妙不生效」，
    排查成本极高 —— 这是我实际踩过三次的坑。

用法：
    python3 tools/check-tokens.py            # 只报告
    python3 tools/check-tokens.py --strict   # 有未定义变量则 exit 1（CI 用）
"""
import os
import re
import sys
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 令牌定义来源：编译期变量 + :root 发射点 + 主题层
TOKEN_FILES = [
    'src/styles/_tokens.scss',
    'src/styles/_vars.scss',
    'src/styles/_dark.scss',
]

# 组件内部通过 inline style 传入的变量，不属于令牌系统
INTERNAL = {
    '--wd-desc-span',
    '--wd-desc-cols',
    '--wd-tree-line-x',
    # 组件内部尺寸变量（在 _group.scss 的 .wd-group--sm/md/lg 里定义）
    '--wd-group-h',
    '--wd-group-pad',
    '--wd-group-fs',
    # 音频卡片主色：由组件的 accent prop 通过 inline style 注入
    '--wd-audio-accent',
    # 勾选色：由 WdCheckbox / WdRadio 的 color prop 注入，
    # 派生色（hover / disabled）在样式里用 color-mix 从它算出
    '--wd-check-color',
    '--wd-check-hover',
    '--wd-check-disabled',
    # Timeline 节点列宽（在 _timeline.scss 的 item 上定义）
    '--tl-node-col',
    '--tl-color',
    # 进度 / 滑轨主色：由 WdProgress / WdSlider 的 color prop 注入
    '--wd-progress-color',
    '--wd-slider-color',
    '--wd-slider-track',
}


def defined_tokens():
    out = set()
    for rel in TOKEN_FILES:
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            continue
        text = open(path, encoding='utf-8').read()
        for m in re.finditer(r'(--wd-[\w-]+)\s*:', text):
            out.add(m.group(1))
    return out


def scan():
    defined = defined_tokens()
    missing = {}
    for path in sorted(glob.glob(os.path.join(ROOT, 'src/styles/**/*.scss'), recursive=True)):
        text = open(path, encoding='utf-8').read()
        rel = os.path.relpath(path, ROOT)

        # 去掉注释再扫描 —— 注释里举例的 `var(--wd-xxx)` 不是真实引用，
        # 否则每次在文档里写示例都会误报。
        text = re.sub(r'/\*[\s\S]*?\*/', lambda m: '\n' * m.group(0).count('\n'), text)
        text = re.sub(r'//[^\n]*', '', text)

        for lineno, line in enumerate(text.splitlines(), 1):
            for m in re.finditer(r'var\((--wd-[\w-]+)', line):
                v = m.group(1)
                if v in defined or v in INTERNAL:
                    continue
                # 带 fallback 的引用是安全的：var(--x, fallback)
                tail = line[m.end():m.end() + 40]
                if ',' in tail.split(')')[0]:
                    continue
                missing.setdefault(v, []).append(f'{rel}:{lineno}')
    return defined, missing


def main():
    defined, missing = scan()
    print(f'已定义令牌：{len(defined)} 个')

    if not missing:
        print('✓ 没有引用未定义的 CSS 变量')
        return 0

    print(f'\n✗ 发现 {len(missing)} 个未定义的变量引用（整条声明会被浏览器丢弃）：\n')
    for var in sorted(missing):
        print(f'  var({var})')
        for loc in missing[var][:6]:
            print(f'      {loc}')
        if len(missing[var]) > 6:
            print(f'      … 另有 {len(missing[var]) - 6} 处')

    print('\n修法：改用已存在的令牌，或显式加 fallback（var(--x, #eee)）。')
    return 1 if '--strict' in sys.argv else 0


if __name__ == '__main__':
    sys.exit(main())
