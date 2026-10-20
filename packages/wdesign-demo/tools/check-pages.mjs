#!/usr/bin/env node
// =============================================================
//  demo 页面结构检查（防「静默失效」）
//
//  为什么需要：demo 是纯手写的 76 个页面，最容易出的错都不报错 ——
//  路由指向不存在的文件（点进去空白）、组件忘了 import（模板静默不渲染）、
//  从 @wdesign 导入了不存在的符号（undefined 组件）、图标名拼错（空白方块）。
//
//  用法：
//    node tools/check-pages.mjs          # 正常检查
//    node tools/check-pages.mjs --list   # 附带每页区块数量
//
//  ⚠️ 改完本检查器必须注入一个已知错误，确认它仍然会失败（见 .agents/memory/05-checks.md）。
// =============================================================
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse, compileScript, compileTemplate } from "vue/compiler-sfc";

const DEMO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(DEMO_ROOT, "src");
const PAGES = join(SRC, "pages");
const ROUTER = join(SRC, "router.ts");
const UI_INDEX = resolve(DEMO_ROOT, "../wdesign-ui/src/index.ts");
const ICON_DIR = resolve(DEMO_ROOT, "../icons/icons/outlined");

const LIST = process.argv.includes("--list");
const errors = [];
const fails = (check, file, msg) => errors.push({ check, file, msg });

/** 内置标签 / 无需导入的 PascalCase 标签 */
const BUILTIN_TAGS = new Set([
  "RouterLink", "RouterView", "Transition", "TransitionGroup", "Teleport",
  "KeepAlive", "Component", "Template", "Slot", "Suspense", "Fragment", "App",
]);

/* ---------------- 1. 路由 ↔ 页面文件 ---------------- */

const routerSrc = readFileSync(ROUTER, "utf8");
const routeOf = []; // { path, name, file }

for (const m of routerSrc.matchAll(
  /path:\s*"([^"]+)"[\s\S]*?import\("\.\/pages\/([^/"]+)\/index\.vue"\)/g,
)) {
  routeOf.push({ path: m[1], dir: m[2], file: join(PAGES, m[2], "index.vue") });
}

if (!routeOf.length) fails("#1 路由", "router.ts", "一条路由都没解析到 —— 检查器本身坏了");

for (const r of routeOf) {
  if (!existsSync(r.file)) {
    fails("#1 路由", `router.ts → pages/${r.dir}/index.vue`, "路由指向的页面文件不存在（点进去是空白页）");
  }
}

const dirs = existsSync(PAGES)
  ? readdirSync(PAGES).filter((d) => statSync(join(PAGES, d)).isDirectory())
  : [];
for (const d of dirs) {
  if (!routeOf.some((r) => r.dir === d)) {
    fails("#1 路由", `pages/${d}`, "页面目录没有对应路由（写完了但侧栏进不去）");
  }
}

/* ---------------- 2~9. 逐页检查 ---------------- */

const uiIndexSrc = readFileSync(UI_INDEX, "utf8");
const UI_EXPORTS = new Set([
  ...[...uiIndexSrc.matchAll(/export\s*\{\s*default as (\w+)\s*\}/g)].map((m) => m[1]),
  ...[...uiIndexSrc.matchAll(/export\s*\{\s*(\w+)\s*\}\s*from/g)].map((m) => m[1]),
  ...[...uiIndexSrc.matchAll(/export\s+const\s+(\w+)\s*=/g)].map((m) => m[1]),
  ...[...uiIndexSrc.matchAll(/export\s+function\s+(\w+)/g)].map((m) => m[1]),
]);

const ICONS = new Set(
  existsSync(ICON_DIR)
    ? readdirSync(ICON_DIR).filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4))
    : [],
);

/* ---------------- 组件枚举型 prop（用于校验字面量取值） ----------------
 * 从 ui 各组件的 defineProps 里抓 `xxx?: 'a' | 'b'` 这种字符串联合。
 * 目的：`<WdAvatar :size="28" />` 这种「传了错类型的 prop」不报错、不生效，
 * 只有肉眼看渲染才发现 —— 必须在工具层面拦住。 */
const UI_COMP_DIR = resolve(DEMO_ROOT, "../wdesign-ui/src/components");
const ENUM_PROPS = new Map(); // WdXxx -> Map<propName, Set<allowed>>

for (const f of existsSync(UI_COMP_DIR) ? readdirSync(UI_COMP_DIR) : []) {
  if (!f.startsWith("Wd") || !f.endsWith(".vue")) continue;
  const name = f.slice(0, -4);
  const src = readFileSync(join(UI_COMP_DIR, f), "utf8");
  const block = src.match(/defineProps<\{(.*?)\n\}>\(/s)?.[1] ?? src.match(/defineProps<\{(.*?)\}>\(/s)?.[1];
  if (!block) continue;
  const map = new Map();
  for (const line of block.split("\n")) {
    const m = line.match(/^\s*(\w+)\??:\s*(.+?)\s*$/);
    if (!m) continue;
    const [, prop, type] = m;
    const values = [...type.matchAll(/'([^']+)'/g)].map((x) => x[1]);
    if (!values.length) continue;
    // `'sm' | 'md' | 'lg' | number` 这种同时收数字的，不能把数字判成错
    map.set(prop, { values: new Set(values), allowsNumber: /\bnumber\b/.test(type) });
  }
  if (map.size) ENUM_PROPS.set(name, map);
}

/** 去掉注释，避免注释里的示例被当成真实代码 */
function stripComments(code) {
  return code
    .replace(/<!--[\s\S]*?-->/g, (s) => s.replace(/[^\n]/g, " "))
    .replace(/\/\*[\s\S]*?\*\//g, (s) => s.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));
}

let pageCount = 0;
let blockTotal = 0;

for (const r of routeOf) {
  if (!existsSync(r.file)) continue;
  pageCount++;
  const rel = `pages/${r.dir}/index.vue`;
  const source = readFileSync(r.file, "utf8");

  /* 2. SFC 可编译 */
  const { descriptor, errors: parseErrors } = parse(source, { filename: rel });
  if (parseErrors?.length) {
    for (const e of parseErrors) fails("#2 编译", rel, `SFC 解析失败：${e.message}`);
    continue;
  }
  try {
    // 纯模板页面（如首页）没有 script 块，compileScript 会直接抛错
    if (descriptor.script || descriptor.scriptSetup) {
      compileScript(descriptor, { id: rel });
    }
    if (descriptor.template) {
      const res = compileTemplate({
        source: descriptor.template.content,
        filename: rel,
        id: rel,
        compilerOptions: { prefixIdentifiers: true },
      });
      for (const e of res.errors ?? []) {
        fails("#2 编译", rel, `模板编译失败：${typeof e === "string" ? e : e.message}`);
      }
    }
  } catch (e) {
    fails("#2 编译", rel, `script 编译失败：${e.message}`);
    continue;
  }

  const scriptRaw = descriptor.scriptSetup?.content ?? descriptor.script?.content ?? "";
  const script = stripComments(scriptRaw);
  const tpl = stripComments(descriptor.template?.content ?? "");

  /* 3. 模板里的组件标签必须已导入 */
  const imported = new Set();
  for (const m of script.matchAll(/import\s*\{([^}]+)\}\s*from/g)) {
    for (const part of m[1].split(",")) {
      const name = part.trim().split(/\s+as\s+/).pop()?.trim();
      if (name) imported.add(name);
    }
  }
  for (const m of script.matchAll(/import\s+(\w+)\s*(?:,|from)/g)) imported.add(m[1]);

  for (const m of tpl.matchAll(/<([A-Z][A-Za-z0-9]*)[\s/>]/g)) {
    const tag = m[1];
    if (BUILTIN_TAGS.has(tag) || imported.has(tag)) continue;
    fails("#3 导入", rel, `模板用了 <${tag}> 但没 import（模板会静默不渲染）`);
  }

  /* 4. 从 @wdesign 导入的符号必须真实存在 */
  const libImports = new Set();
  for (const m of script.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']@wdesign["']/g)) {
    for (const part of m[1].split(",")) {
      const name = part.trim().split(/\s+as\s+/).pop()?.trim();
      if (!name) continue;
      libImports.add(name);
      if (!UI_EXPORTS.has(name)) {
        fails("#4 导出", rel, `@wdesign 没有导出 ${name}（组件会是 undefined）`);
      }
    }
  }

  /* 5. 禁止手写 svg */
  if (/<svg[\s>]/i.test(tpl)) {
    fails("#5 图标", rel, "手写了 <svg> —— 必须走 WdIcon（否则不跟随 currentColor）");
  }

  /* 6. 事件名必须 kebab-case（只看 @ 与 v-on:，`:fooBar` 是 prop 不是事件） */
  for (const m of tpl.matchAll(/(?:@|v-on:)([a-z]+[A-Z]\w*)\s*=/g)) {
    fails("#6 事件名", rel, `事件名用了 camelCase：${m[1]}，必须是 kebab-case`);
  }

  /* 7. DemoPage 必须有 name */
  const demoPage = tpl.match(/<DemoPage\b[^>]*>/);
  if (demoPage && !/\bname=/.test(demoPage[0])) {
    fails("#7 页面", rel, "<DemoPage> 缺少 name 属性（标题会是空白）");
  }

  /* 8. 至少一个 DemoBlock（首页是导航页，不参与） */
  if (r.dir !== "home") {
    const blocks = [...tpl.matchAll(/<DemoBlock\b/g)].length;
    blockTotal += blocks;
    if (!demoPage) fails("#8 结构", rel, "页面没有用 <DemoPage> 包裹");
    if (!blocks) fails("#8 结构", rel, "页面没有任何 <DemoBlock> 区块");
  }

  /* 9. 图标名必须存在 */
  for (const m of tpl.matchAll(/<WdIcon\b[^>]*?\bname="([^"{]+)"/g)) {
    if (!ICONS.has(m[1])) fails("#9 图标", rel, `图标名不存在：${m[1]}`);
  }

  /* 11. 枚举型 prop 的取值必须合法（`:size="28"` 这类传错类型不报错也不生效） */
  for (const tagMatch of tpl.matchAll(/<([A-Z]\w+)((?:[^>"']|"[^"]*"|'[^']*')*)>/g)) {
    const [, tag, rawAttrs] = tagMatch;
    if (!libImports.has(tag)) continue;
    const enumMap = ENUM_PROPS.get(tag);
    if (!enumMap) continue;

    for (const attrMatch of rawAttrs.matchAll(/([:@]?)([a-zA-Z][\w:-]*)\s*=\s*"([^"]*)"/g)) {
      const [, sigil, rawName, value] = attrMatch;
      if (sigil === "@") continue;
      const name = rawName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const allowed = enumMap.get(name);
      if (!allowed) continue;

      const v = value.trim();
      const literal = v.match(/^'([^']*)'$/) ?? v.match(/^"([^"]*)"$/);
      if (literal) {
        if (!allowed.values.has(literal[1])) {
          fails(
            "#11 取值",
            rel,
            `<${tag} ${rawName}="${literal[1]}"> 不合法，可选：${[...allowed.values].join(" | ")}`,
          );
        }
      } else if (/^-?\d+(\.\d+)?$/.test(v) && !allowed.allowsNumber) {
        fails(
          "#11 取值",
          rel,
          `<${tag} ${sigil}${rawName}="${v}"> 传了数字，但这个 prop 是字符串枚举：${[...allowed.values].join(" | ")}`,
        );
      }
    }
  }

  /* 12. 绑定表达式里不许出现裸中文标识符（`:names="[林小满, 王一舟]"` 会静默变成 undefined） */
  for (const m of tpl.matchAll(/(?::|v-bind:)[\w:-]+\s*=\s*"([^"]*)"/g)) {
    // 模板字面量（反引号）里出现中文是合法的，先剥掉再判断
    const bare = m[1]
      .replace(/'[^']*'/g, "''")
      .replace(/"[^"]*"/g, '""')
      .replace(/`[^`]*`/g, "``");
    const hit = bare.match(/[\u4e00-\u9fa5]+/);
    if (hit) {
      fails(
        "#12 表达式",
        rel,
        `绑定表达式里有裸中文 \`${hit[0]}\`（漏了引号，会变成 undefined）`,
      );
    }
  }
}

/* ---------------- 10. demo 里引用的 --wd-* 令牌必须真实存在 ---------------- */

{
  const UI_STYLES = resolve(DEMO_ROOT, "../wdesign-ui/src/styles");
  const tokenNames = new Set();
  const collectTokens = (dir) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, f.name);
      if (f.isDirectory()) collectTokens(full);
      else if (f.name.endsWith(".scss")) {
        const src = readFileSync(full, "utf8");
        for (const m of src.matchAll(/(--wd-[\w-]+)\s*:/g)) tokenNames.add(m[1]);
      }
    }
  };
  collectTokens(UI_STYLES);

  const walk = (dir) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, f.name);
      if (f.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.(scss|vue)$/.test(f.name)) continue;
      const rel = full.slice(DEMO_ROOT.length + 1).replace(/\\/g, "/");
      const src = stripComments(readFileSync(full, "utf8"));

      for (const m of src.matchAll(/var\(\s*(--wd-[\w-]+)\s*([,)])/g)) {
        const [, token, next] = m;
        if (!tokenNames.has(token)) {
          fails("#10 令牌", rel, `${token} 不存在（整条声明会被丢弃，不报错）`);
        }
        // 项目硬规则：不许给 var() 加 fallback —— 会掩盖令牌名写错
        if (next === ",") {
          fails("#10 令牌", rel, `var(${token}, …) 带了 fallback —— 令牌写错时会被悄悄兜住`);
        }
      }
    }
  };
  walk(SRC);
}

/* ---------------- 汇总 ---------------- */

const unique = [...new Map(errors.map((e) => [e.check + e.file + e.msg, e])).values()];

if (LIST) {
  console.log(`页面 ${pageCount} 个 / DemoBlock ${blockTotal} 个 / 平均 ${(blockTotal / pageCount).toFixed(1)} 块`);
}

if (unique.length) {
  console.log("");
  for (const e of unique) console.log(`  ✗ ${e.check} ${e.file}\n      ${e.msg}`);
  console.log(`\ndemo 检查：${pageCount} 页，${unique.length} 处问题\n`);
  process.exit(1);
}

console.log(`✓ demo 检查通过：${pageCount} 页 · ${blockTotal} 个 DemoBlock · 无静默失效项`);
