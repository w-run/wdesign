// =============================================================
//  极小的 Vue 模板着色器
//
//  为什么自己写：代码面板只需要给「标签 / 属性 / 字符串 / 插值」上色，
//  为这个引 highlight.js 或 shiki（几十 KB 起步）不划算 —— 演示站的首包
//  已经 200KB+ 了。这里 80 行、零依赖、只认模板语法。
//
//  ⚠️ 输出是 HTML 字符串，所有文本都先过 esc()，
//     否则示例源码里的 `<` 会被当成标签注入。
// =============================================================

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

function esc(text: string): string {
  return text.replace(/[&<>"]/g, (c) => ESCAPES[c]);
}

/** 把模板源码转成带 `.tk-*` 类名的 HTML */
export function highlightTemplate(code: string): string {
  let out = "";
  let i = 0;

  const span = (cls: string | null, text: string) => {
    out += cls ? `<span class="tk-${cls}">${esc(text)}</span>` : esc(text);
  };

  while (i < code.length) {
    // 注释
    if (code.startsWith("<!--", i)) {
      const end = code.indexOf("-->", i);
      const j = end === -1 ? code.length : end + 3;
      span("comment", code.slice(i, j));
      i = j;
      continue;
    }

    // 插值 {{ }}
    if (code.startsWith("{{", i)) {
      const end = code.indexOf("}}", i);
      const j = end === -1 ? code.length : end + 2;
      span("interp", code.slice(i, j));
      i = j;
      continue;
    }

    // 开/闭标签
    const tag = /^<\/?([A-Za-z][\w.-]*)/.exec(code.slice(i));
    if (tag) {
      span("punct", code.slice(i, i + tag[0].length - tag[1].length));
      span("tag", tag[1]);
      i += tag[0].length;
      continue;
    }

    // 标签结束
    if (code.startsWith("/>", i) || code[i] === ">") {
      const len = code.startsWith("/>", i) ? 2 : 1;
      span("punct", code.slice(i, i + len));
      i += len;
      continue;
    }

    // 带值的属性：name="value" / :prop="expr" / @click="fn"
    const attr = /^([:@#]?[A-Za-z][\w:.-]*)(=)(?:"[^"]*"|'[^']*')/.exec(code.slice(i));
    if (attr) {
      span("attr", attr[1]);
      span("punct", "=");
      span("str", attr[0].slice(attr[1].length + 1));
      i += attr[0].length;
      continue;
    }

    // 布尔属性 / 指令：disabled、v-model、#
    const bare = /^([:@#]?[A-Za-z][\w:.-]*)(?=[\s/>])/.exec(code.slice(i));
    if (bare) {
      span("attr", bare[1]);
      i += bare[0].length;
      continue;
    }

    span(null, code[i]);
    i += 1;
  }

  return out;
}
