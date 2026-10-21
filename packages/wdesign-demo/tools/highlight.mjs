// =============================================================
//  构建期语法高亮（shiki + 我们自己的 VS Code 主题）
//
//  为什么放构建期：
//    1. shiki 带语法文件，运行时引入会让首包多出几百 KB；构建期跑完只留下 HTML
//    2. 主题是标准 **VS Code 主题 JSON**（theme/wdesign-light.json / -dark.json），
//       同一份文件既能给 shiki 用，也能直接丢进 VS Code 当编辑器主题 ——
//       设计同学在编辑器里看到的就是文档里看到的那一套颜色
//
//  为什么不用原来的 80 行手写高亮：
//    它只认"标签 / 属性 / 字符串"，写不了 `:class="{ 'is-on': x }"` 里的表达式、
//    `v-for="(it, i) in items"` 里的关键字 —— 而那才是读代码时最需要的结构。
//
//  ⚠️ shiki 是可选依赖：装不上就退回纯文本，绝不让构建挂掉。
// =============================================================
import { readFileSync } from "node:fs";
import { join } from "node:path";

let highlighterPromise = null;
let disabled = false;

const LANGS = ["vue", "html", "ts", "js", "scss", "css", "json", "bash", "md"];

function loadTheme(name) {
  const file = join(process.cwd(), "theme", name);
  return JSON.parse(readFileSync(file, "utf8"));
}

async function getHighlighter() {
  if (disabled) return null;
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const { createHighlighter } = await import("shiki");
      return createHighlighter({
        themes: [loadTheme("wdesign-light.json"), loadTheme("wdesign-dark.json")],
        langs: LANGS,
      });
    })().catch((e) => {
      disabled = true;
      console.warn("[wd-highlight] shiki 不可用，代码面板退回纯文本：", e.message);
      return null;
    });
  }
  return highlighterPromise;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * 把一段源码高亮成 HTML（不含 <pre>，只给 <code> 内层用）。
 *
 * 用 shiki 的**双主题**输出：每个 token 同时带 `--shiki-light` / `--shiki-dark`
 * 两个 CSS 变量，切深色主题时只要改一个变量，不用重新高亮。
 */
export async function highlight(code, lang = "vue") {
  const hl = await getHighlighter();
  if (!hl) return escapeHtml(code);
  try {
    const html = hl.codeToHtml(code, {
      lang: LANGS.includes(lang) ? lang : "html",
      themes: { light: "WDesign Light", dark: "WDesign Dark" },
      defaultColor: "light",
    });
    // 只取 <code> 内部：外层 <pre> 我们自己控制样式
    const m = /<code[^>]*>([\s\S]*?)<\/code>/.exec(html);
    return m ? m[1] : escapeHtml(code);
  } catch (e) {
    console.warn("[wd-highlight] 高亮失败，退回纯文本：", e.message);
    return escapeHtml(code);
  }
}
