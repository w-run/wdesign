// =============================================================
//  组件 API 提取（构建期）
//
//  文档卡片要展示「属性 / 事件 / 插槽」三张表。这些信息在组件源码里
//  已经写着（TS 类型 + JSDoc），**不能另手写一份** —— 一定会漂移。
//  所以这里直接从 .vue 源码里解析:
//    · defineProps<{…}>()    → 属性名、类型、JSDoc 说明
//    · withDefaults(…, {…})  → 默认值
//    · defineEmits<{…}>()    → 事件名、参数
//    · <slot name="x">       → 插槽
//
//  解析策略是"够用就好"：组件写法已经统一（见 CONVENTIONS），不需要通用
//  TypeScript 解析器。任何解析不出的部分宁可留空，也不要编。
// =============================================================
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/** 从 startIndex（指向 '<' 之后）开始找配对的 '>'，跳过字符串与注释 */
function findAngleEnd(text, from) {
  let depth = 0;
  for (let i = from; i < text.length; i++) {
    const ch = text[i];
    if (ch === "<") depth++;
    else if (ch === ">") {
      if (depth === 0) return i;
      depth--;
    }
  }
  return -1;
}

/** 取 defineProps / defineEmits 的泛型体内部文本 */
function genericBody(src, keyword) {
  const at = src.indexOf(keyword);
  if (at === -1) return "";
  const lt = src.indexOf("<", at);
  if (lt === -1) return "";
  // 找到泛型里第一个 '{'
  const brace = src.indexOf("{", lt);
  if (brace === -1) return "";
  // 从 brace 起做花括号配对
  let depth = 0;
  for (let i = brace; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return src.slice(brace + 1, i);
    }
  }
  return "";
}

/** 把一段 JSDoc 压成一行说明 */
function cleanComment(raw) {
  return raw
    .replace(/^\/\*\*?/, "")
    .replace(/\*\/$/, "")
    .split("\n")
    .map((l) => l.replace(/^\s*\*?\s?/, "").trim())
    .filter(Boolean)
    .join(" ")
    .trim();
}

/** 解析 defineProps 的字段列表 */
function parseProps(body) {
  const lines = body.split("\n");
  const out = [];
  let comment = "";
  let inComment = false;
  let current = null;

  const push = () => {
    if (!current) return;
    current.type = current.type.replace(/\s+/g, " ").trim();
    current.desc = cleanComment(comment) || "";
    out.push(current);
    current = null;
    comment = "";
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (inComment) {
      comment += "\n" + line;
      if (line.includes("*/")) inComment = false;
      continue;
    }
    if (line.trim().startsWith("/**")) {
      push();
      if (line.includes("*/")) {
        comment = line.trim();
      } else {
        comment = line;
        inComment = true;
      }
      continue;
    }
    if (!line.trim() || line.trim().startsWith("//")) continue;

    const m = line.match(/^\s{2,}([A-Za-z_$][\w$]*)\??:\s*(.*)$/);
    if (m) {
      push();
      current = { name: m[1], type: m[2], desc: "" };
      continue;
    }
    // 类型续行（联合类型换行写）
    if (current) current.type += " " + line.trim();
  }
  push();
  return out;
}

/** 解析 withDefaults 的默认值对象 */
function parseDefaults(src) {
  const at = src.indexOf("withDefaults(");
  if (at === -1) return {};
  // 默认值对象在 defineProps 的泛型闭合 `}>()` 之后
  const closeIdx = src.indexOf("}>()", at);
  const from = closeIdx === -1 ? at : closeIdx + 4;
  const brace = src.indexOf("{", from);
  if (brace === -1) return {};
  let depth = 0;
  let body = "";
  for (let i = brace; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) {
        body = src.slice(brace + 1, i);
        break;
      }
    }
  }
  const out = {};
  for (const m of body.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*([^,\n]+?)(?=,\s*\n|,\s*$|\n\s*$)/g)) {
    out[m[1]] = m[2].trim().replace(/,$/, "");
  }
  return out;
}

/** 解析 defineEmits 的两个常见写法 */
function parseEmits(body) {
  const out = [];
  // (e: 'name', a: T, b: U): void
  for (const m of body.matchAll(/\(\s*e\s*:\s*'([^']+)'\s*,?([^)]*)\)/g)) {
    const params = m[2]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.replace(/:\s*/, ": "))
      .join(", ");
    out.push({ name: m[1], params });
  }
  // 'name': [a: T, b: U]
  for (const m of body.matchAll(/'([^']+)'\s*:\s*\[([^\]]*)\]/g)) {
    if (out.some((e) => e.name === m[1])) continue;
    const params = m[2]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(", ");
    out.push({ name: m[1], params });
  }
  return out;
}

/** 解析模板里的具名插槽 */
function parseSlots(src) {
  const names = new Set();
  for (const m of src.matchAll(/<slot\b([^>]*)>/g)) {
    const nameAttr = m[1].match(/\bname="([^"]+)"/);
    if (!nameAttr) {
      names.add("default");
      continue;
    }
    const name = nameAttr[1];
    if (name.includes("${") || name.includes("`")) continue; // 动态插槽名，跳过
    names.add(name);
  }
  return [...names].map((name) => ({ name }));
}

/** 一个 .vue 文件 → API 描述 */
export function extractApi(file) {
  const src = readFileSync(file, "utf8");
  const props = parseProps(genericBody(src, "defineProps"));
  const defaults = parseDefaults(src);
  const emits = parseEmits(genericBody(src, "defineEmits"));
  const slots = parseSlots(src);

  return {
    props: props.map((p) => ({
      name: p.name,
      type: p.type.replace(/\s*\|\s*/g, " | "),
      default: defaults[p.name] ?? "",
      desc: p.desc,
    })),
    emits,
    slots,
  };
}

/** 组件目录 → { WdButton: {...}, … } */
export function extractAll(compDir) {
  const map = {};
  let files = [];
  try {
    files = readdirSync(compDir).filter((f) => f.startsWith("Wd") && f.endsWith(".vue"));
  } catch {
    return map;
  }
  for (const f of files) {
    const name = f.replace(/\.vue$/, "");
    try {
      map[name] = extractApi(join(compDir, f));
    } catch {
      map[name] = { props: [], emits: [], slots: [] };
    }
  }
  return map;
}
