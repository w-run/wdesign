#!/usr/bin/env python3
"""
design-audit.py — WDesign 设计系统健康检查

把"靠眼睛发现"的问题固化成可重复执行的检查，防止回归。检查项：

  1. 组件 import / export / 全局注册 三张清单是否一致（曾漏过 3 个导出、15 个注册）
  2. 组件与样式原子件是否配对，且 index.scss 是否登记
  3. 引用了但从未定义的 CSS 变量（会静默失效）
  4. 定义了但从未消费的令牌
  5. 组件样式里直接写死的颜色（非 #fff/#000 豁免）
  6. 动画填充模式（`both` 会让元素在动画时钟停摆时永久停在首帧）
  7. 对比度：关键前景/背景组合是否达到 WCAG AA

用法：python3 tools/design-audit.py [--strict]
      --strict 时任何 ERROR 项都会以非零码退出（供 CI 使用）
"""
import os, re, sys, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
STY = os.path.join(SRC, 'styles')
COMPS = os.path.join(SRC, 'components')

errors, warns, infos = [], [], []


def rd(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


def walk(exts=('.scss', '.vue', '.ts')):
    for dp, _, fs in os.walk(SRC):
        for f in fs:
            if f.endswith(exts):
                yield os.path.join(dp, f)


# ── 1. 组件三张清单一致 ────────────────────────────────────────
files = {f[:-4] for f in os.listdir(COMPS) if f.endswith('.vue')}
idx = rd(os.path.join(SRC, 'index.ts'))
imported = set(re.findall(r"^import (Wd\w+) from '\./components/\w+\.vue'", idx, re.M))
exported = set(re.findall(r'^  (Wd\w+),$', idx, re.M)) - {'toast'}
arr = idx.split('const components = [')[1].split(']')[0]
registered = set(re.findall(r'(Wd\w+)', arr))

if files - imported:
    errors.append('组件未 import：%s' % ', '.join(sorted(files - imported)))
if files - exported:
    errors.append('组件未 export（按需引入拿不到）：%s' % ', '.join(sorted(files - exported)))
if files - registered:
    errors.append('组件未注册（app.use(WdUI) 拿不到）：%s' % ', '.join(sorted(files - registered)))
if (imported | exported | registered) - files:
    errors.append('index.ts 引用了不存在的组件：%s' % ', '.join(sorted((imported | exported | registered) - files)))

# defineOptions name 与文件名一致
for n in sorted(files):
    s = rd(os.path.join(COMPS, n + '.vue'))
    m = re.search(r"defineOptions\(\{\s*name:\s*'([^']+)'", s)
    if not m:
        errors.append('%s.vue 缺少 defineOptions({ name })（全局注册会拿不到名字）' % n)
    elif m.group(1) != n:
        errors.append('%s.vue 的 name 为 %s，与文件名不一致' % (n, m.group(1)))

# ── 2. 原子件配对 + 登记 ──────────────────────────────────────
comp_dir = os.path.join(STY, 'components')
atoms = {f[1:-5] for f in os.listdir(comp_dir) if f.startswith('_') and f.endswith('.scss')}
atoms |= {f[:-5] for f in os.listdir(comp_dir) if not f.startswith('_') and f.endswith('.scss')}
index_scss = rd(os.path.join(STY, 'index.scss'))
listed = set(re.findall(r"@import 'components/([\w-]+)'", index_scss))
for a in sorted(atoms - listed):
    warns.append('原子件 _%s.scss 未在 index.scss 登记（不会被打包）' % a)
for a in sorted(listed - atoms):
    errors.append('index.scss 引用了不存在的原子件 components/%s' % a)

# ── 3/4. CSS 变量：未定义引用 / 未消费定义 ────────────────────
vars_src = rd(os.path.join(STY, '_vars.scss'))
dark_src = rd(os.path.join(STY, '_dark.scss'))
defined = set(re.findall(r'--(wd-[\w-]+)\s*:', vars_src)) | set(re.findall(r'--(wd-[\w-]+)\s*:', dark_src))

refs = {}
for p in walk():
    if os.path.basename(p) in ('_vars.scss', '_dark.scss'):
        continue
    for v in re.findall(r'var\(\s*--(wd-[\w-]+)', rd(p)):
        refs.setdefault(v, set()).add(os.path.relpath(p, ROOT))

# 由消费方按需覆盖的变量（令牌提供默认值即可，不属于「未定义」）
OPTIONAL_VARS = {'wd-reveal-delay'}
for v in sorted(set(refs) - defined - OPTIONAL_VARS):
    errors.append('引用了未定义的 CSS 变量 --%s（整条声明会静默失效）← %s'
                  % (v, ', '.join(sorted(refs[v]))))

unused = sorted(v for v in defined - set(refs) if not v.startswith(('wd-font', 'wd-ease', 'wd-dur')))
if unused:
    infos.append('定义了但当前无组件消费（%d 个）：%s' % (len(unused), ', '.join('--' + u for u in unused)))

# ── 5. 硬编码颜色 ─────────────────────────────────────────────
EXEMPT_FILES = {'_tokens.scss', '_dark.scss', '_markdown.scss', '_segmented.scss'}
EXEMPT_VALUES = {'#fff', '#ffffff', '#000', '#000000', 'currentcolor', 'transparent'}
hard = []
for p in walk():
    base = os.path.basename(p)
    if base in EXEMPT_FILES:
        continue
    for i, line in enumerate(rd(p).splitlines(), 1):
        if line.lstrip().startswith('//'):
            continue
        for c in re.findall(r'#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)', line):
            if c.lower() in EXEMPT_VALUES:
                continue
            hard.append('%s:%d %s' % (os.path.relpath(p, ROOT), i, c))
if hard:
    warns.append('硬编码颜色 %d 处（深色主题下不会翻转）：\n      %s'
                 % (len(hard), '\n      '.join(hard[:10])))

# ── 6. 动画填充模式 ──────────────────────────────────────────
# `both` 含 backwards：动画时钟停摆（后台标签页/无头渲染/冻结 rAF）时元素会永久停在首帧
risky_anims = set()
anim_src = rd(os.path.join(STY, '_animations.scss'))
for name, body in re.findall(r'@keyframes\s+([\w-]+)\s*\{(.*?)\n\}', anim_src, re.S):
    m = re.search(r'from\s*\{([^}]*)\}', body)
    if m and re.search(r'opacity\s*:\s*0\b', m.group(1)):
        risky_anims.add(name)
for p in walk():
    for i, line in enumerate(rd(p).splitlines(), 1):
        m = re.search(r'animation\s*:\s*([^;]+);', line)
        if not m:
            continue
        for a in risky_anims:
            if re.search(r'\b' + re.escape(a) + r'\b', m.group(1)) and re.search(r'\bboth\b', m.group(1)):
                errors.append('%s:%d 入场动画用了 fill-mode `both`（%s）→ 时钟停摆时元素永久隐藏'
                              % (os.path.relpath(p, ROOT), i, a))

# ── 7. 对比度 ────────────────────────────────────────────────
def _lum(rgb):
    def f(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (f(x) for x in rgb)
    return .2126 * r + .7152 * g + .0722 * b


def ratio(fg, bg):
    la, lb = _lum(fg), _lum(bg)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + .05) / (lo + .05)


def hex2rgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def token(name, src=None):
    src = src or vars_src
    m = re.search(r'--%s\s*:\s*(#[0-9a-fA-F]{3,8})' % name, src)
    return m.group(1) if m else None


CONTRAST_CASES = [
    # (说明, 前景 token, 背景 token, 最低要求)
    ('说明文字 / 白卡', 'wd-ink-2', 'wd-card', 4.5),
    ('说明文字 / 页底', 'wd-ink-2', 'wd-bg', 4.5),
    ('说明文字 / 控件底', 'wd-ink-2', 'wd-field', 4.5),
    ('红色文字 / 白卡', 'wd-red-text', 'wd-card', 4.5),
    ('红色文字 / 浅红底', 'wd-red-text', 'wd-tint-2', 4.5),
    ('成功图标 / 成功浅底', 'wd-success-ink', 'wd-success-soft', 3.0),
    ('警告图标 / 警告浅底', 'wd-warning-ink', 'wd-warning-soft', 3.0),
]
CONTRAST_CASES_DARK = [
    ('[深] 说明文字 / 深卡', 'wd-ink-2', 'wd-card', 4.5),
    ('[深] 红色文字 / 深卡', 'wd-red-text', 'wd-card', 4.5),
    ('[深] 红色文字 / 深红底', 'wd-red-text', 'wd-tint-2', 4.5),
    ('[深] 锚点面次级字 / 反转浅面', 'wd-dark-text-2', 'wd-dark', 4.5),
]

for label, fg_t, bg_t, need in CONTRAST_CASES:
    fg, bg = token(fg_t), token(bg_t)
    if not (fg and bg):
        continue
    r = ratio(hex2rgb(fg), hex2rgb(bg))
    if r < need:
        errors.append('%s：%s on %s = %.2f:1（需 ≥%.1f）' % (label, fg, bg, r, need))

# 深色层：亮度写在 _dark.scss，需按深色值算
dark_vals = dict(re.findall(r'--(wd-[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})', dark_src))
for label, fg_t, bg_t, need in CONTRAST_CASES_DARK:
    fg = dark_vals.get(fg_t) or token(fg_t)
    bg = dark_vals.get(bg_t) or token(bg_t)
    if not (fg and bg):
        continue
    r = ratio(hex2rgb(fg), hex2rgb(bg))
    if r < need:
        errors.append('%s：%s on %s = %.2f:1（需 ≥%.1f）' % (label, fg, bg, r, need))

# ── 输出 ─────────────────────────────────────────────────────
def show(title, items, mark):
    if not items:
        return
    print('\n%s %s (%d)' % (mark, title, len(items)))
    for it in items:
        print('   · %s' % it)

print('=' * 66)
print('WDesign 设计系统审计')
print('=' * 66)
print('组件 %d 个 / 样式原子件 %d 个 / CSS 变量 %d 个'
      % (len(files), len(atoms), len(defined)))
show('错误', errors, '❌')
show('警告', warns, '⚠️')
show('提示', infos, 'ℹ️')
print('\n' + '=' * 66)
if errors:
    print('结果：❌ %d 个错误 / %d 个警告' % (len(errors), len(warns)))
    if '--strict' in sys.argv:
        sys.exit(1)
elif warns:
    print('结果：✅ 无错误（%d 个警告）' % len(warns))
else:
    print('结果：✅ 全部通过')
