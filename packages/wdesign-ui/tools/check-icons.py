#!/usr/bin/env python3
"""
检查 WdIcon 的 :name 引用是否真的存在。

为什么需要：
    WdIcon 找不到图标时不会报错，只是渲染成**空白**。
    写成 name="theme"（实际叫 palette）时，页面上就是一块什么都没有的区域，
    控制台干净、构建成功，只能靠肉眼发现 —— 我已经栽过一次。

检查范围：
    - 模板里静态写死：<wd-icon name="xxx" />
    - 数据里传给 :name：icon: 'xxx'
    - 动态三元/变量一律跳过（无法静态判定）

用法：
    python3 tools/check-icons.py
    python3 tools/check-icons.py --strict   # 有缺失则 exit 1
"""
import os
import re
import sys
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICON_DIRS = [
    os.path.join(ROOT, '../icons/icons/outlined'),
    os.path.join(ROOT, '../icons/icons/filled'),
]

# Demo 里用于说明"这是图标名"的字段
ICON_FIELD = re.compile(r"\bicon:\s*'([a-z0-9][a-z0-9-]*)'")
# 只匹配**静态** name="字面量"。
#
# ⚠️ 必须排除动态绑定 `:name="icon"` ——
#    正则里的 `\bname=` 会把 `:name=` 也匹配上（冒号不是 word boundary），
#    于是 `:name="icon"` 被当成字面量 "icon"，报"图标名不存在"。
#    用负向后顾 `(?<!:)` 排除掉带冒号的绑定。
STATIC_NAME = re.compile(r'<wd-icon[^>]*?(?<!:)\bname="([a-z0-9][a-z0-9-]{2,})"')
# 明显是模板变量的单字母/双字母名
VAR_LIKE = re.compile(r'^[a-z]$')


def available():
    out = set()
    for d in ICON_DIRS:
        if os.path.isdir(d):
            for f in os.listdir(d):
                if f.endswith('.svg'):
                    out.add(f[:-4])
    return out


def scan():
    names = available()
    missing = {}
    targets = []
    targets += glob.glob(os.path.join(ROOT, 'src/components/*.vue'))
    targets += glob.glob(os.path.join(ROOT, 'demo/*.html'))
    targets += glob.glob(os.path.join(ROOT, 'demo/*.js'))

    for path in sorted(targets):
        rel = os.path.relpath(path, ROOT)
        text = open(path, encoding='utf-8', errors='ignore').read()
        for lineno, line in enumerate(text.splitlines(), 1):
            if line.strip().startswith('//') or line.strip().startswith('*'):
                continue
            for rx in (STATIC_NAME, ICON_FIELD):
                for m in rx.finditer(line):
                    name = m.group(1)
                    if VAR_LIKE.match(name):
                        continue  # v-for / 变量绑定，非字面量图标名
                    if name not in names:
                        missing.setdefault(name, []).append(f'{rel}:{lineno}')
    return names, missing


def main():
    names, missing = scan()
    print(f'可用图标：{len(names)} 个')

    if not missing:
        print('✓ 所有图标名均存在')
        return 0

    print(f'\n✗ {len(missing)} 个图标名不存在（WdIcon 会渲染为空白，且不报错）：\n')
    for name in sorted(missing):
        print(f'  name="{name}"')
        for loc in missing[name][:5]:
            print(f'      {loc}')
        # 给一个近似建议
        guess = [n for n in names if name.split('-')[0] in n][:4]
        if guess:
            print(f'      可能是：{", ".join(guess)}')

    print('\n用 `ls packages/icons/icons/outlined` 查实际名字。')
    return 1 if '--strict' in sys.argv else 0


if __name__ == '__main__':
    sys.exit(main())
