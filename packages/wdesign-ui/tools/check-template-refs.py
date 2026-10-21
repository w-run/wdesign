#!/usr/bin/env python3
"""
检查 `.vue` 模板里误用 `xxx.value`。

为什么需要这条检查：
  `<script setup>` 里的 ref / computed 在**模板中会自动解包**，写 `view.value` 得到的是
  `undefined` —— 一旦落在 `:class` / `{{ }}` / 事件表达式里，render 就会抛 TypeError：
  组件每次更新都失败、DOM 停在上一帧。症状极具误导性：
  点击没反应、aria 属性不翻转、面板打不开（DatePicker 月视图就是这么坏了三天没人发现）。

判据：
  1. 脚本区用 `const X = ref(...)` / `computed(...)` / `shallowRef(...)` 声明过的名字
  2. 模板区出现 `X.value`（排除 `obj.value` 这类数据字段——那些不在 ref 名单里）

退出码：发现问题返回 1。
"""
import re
import sys
from pathlib import Path

COMP_DIR = Path(__file__).resolve().parent.parent / "src/components"

REF_DECL = re.compile(
    r"const\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*(?:ref|shallowRef|computed|reactive)\s*[<(]"
)


def split_sfc(text: str):
    """返回 (script 文本, template 文本)；没有 template 返回 None。"""
    i = text.find("<template>")
    if i < 0:
        return text, None
    return text[:i], text[i:]


def template_line_offset(script: str, tpl_start: int, offset_in_tpl: int, text: str) -> int:
    return text[:tpl_start].count("\n") + text[tpl_start : tpl_start + offset_in_tpl].count("\n") + 1


def main() -> int:
    problems = []
    files = sorted(COMP_DIR.glob("*.vue"))
    for f in files:
        text = f.read_text(encoding="utf-8")
        script, tpl = split_sfc(text)
        if tpl is None:
            continue
        refs = set(REF_DECL.findall(script))
        if not refs:
            continue
        tpl_start = len(script)
        # 只看模板里的绑定表达式与插值
        for m in re.finditer(r"[:\w@][\w:.\-]*=\"([^\"]*)\"|\{\{([^}]*)\}\}", tpl):
            expr = m.group(1) or m.group(2) or ""
            for name in refs:
                if re.search(rf"\b{re.escape(name)}\.value\b", expr):
                    line = template_line_offset(script, tpl_start, m.start(), text)
                    problems.append((f.name, line, f"{name}.value", expr.strip()[:70]))

    if problems:
        print(f"✗ 模板里误用了 .value（模板会自动解包，写 .value 得到 undefined）：\n")
        for name, line, token, expr in problems:
            print(f"  {name}:{line}  {token}   in  {expr}")
        print("\n修法：模板里直接写变量名（去掉 .value）。")
        return 1

    print(f"✓ 模板 ref 解包检查通过（{len(files)} 个组件）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
