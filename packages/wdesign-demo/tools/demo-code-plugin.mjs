// =============================================================
//  demo 代码提取插件
//
//  演示站要变成「预览 + 源码」的文档卡片，源码不能再手写一份 ——
//  手写的那份一定会在改 demo 时漂移（然后就是"文档说的和跑的不一样"）。
//  所以这里在构建期直接把每个页面的 SFC 切开，把每个 <DemoBlock> 的
//  **模板原文**抽出来，通过虚拟模块 `virtual:demo-code` 交给 DemoBlock 渲染。
//
//  产物形状：
//    {
//      "/button": { blocks: ["<DemoRow>…</DemoRow>", …], source: "<整个 SFC>" },
//      "/":       { … }
//    }
//
//  ⚠️ 抽取靠的是标签配对而不是正则替换：DemoBlock 之间可能嵌套（目前没有，
//     但留着不吃亏），用深度计数保证切在正确的闭合标签上。
// =============================================================
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { extractAll } from "./extract-api.mjs";
import { highlight } from "./highlight.mjs";

const VIRTUAL_ID = "virtual:demo-code";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

const API_ID = "virtual:component-api";
const API_RESOLVED = "\0" + API_ID;

/** 去掉公共缩进：卡片里显示的代码不该带 8 个空格的前缀 */
function dedent(text) {
  const lines = text.split("\n");
  const widths = lines
    .filter((l) => l.trim())
    .map((l) => l.match(/^ */)[0].length);
  const min = widths.length ? Math.min(...widths) : 0;
  return lines.map((l) => l.slice(min)).join("\n").trim();
}

/**
 * 切出一个页面里所有 <DemoBlock> 的模板原文（按出现顺序）。
 * 返回的下标要和运行时 DemoBlock 的注册顺序一致，否则代码会串到别的卡片上。
 */
function extractBlocks(src) {
  const blocks = [];
  let cursor = 0;

  while (true) {
    const open = src.indexOf("<DemoBlock", cursor);
    if (open === -1) break;

    const openEnd = src.indexOf(">", open);
    if (openEnd === -1) break;

    // <DemoBlock ... />
    if (src[openEnd - 1] === "/") {
      cursor = openEnd + 1;
      continue;
    }

    let depth = 1;
    let i = openEnd + 1;
    let closeStart = -1;

    while (depth > 0) {
      const nextOpen = src.indexOf("<DemoBlock", i);
      const nextClose = src.indexOf("</DemoBlock>", i);
      if (nextClose === -1) {
        closeStart = src.length;
        depth = 0;
        break;
      }
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        i = nextOpen + "<DemoBlock".length;
      } else {
        depth--;
        closeStart = nextClose;
        i = nextClose + "</DemoBlock>".length;
      }
    }

    blocks.push(dedent(src.slice(openEnd + 1, closeStart)));
    cursor = i;
  }

  return blocks;
}

/** 递归找 pages/<dir>/index.vue */
function collectPages(pagesDir, out = []) {
  let entries = [];
  try {
    entries = readdirSync(pagesDir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(pagesDir, name);
    if (!statSync(full).isDirectory()) continue;
    const file = join(full, "index.vue");
    try {
      readFileSync(file);
      out.push({ dir: name, file });
    } catch {
      /* 没有 index.vue 就跳过 */
    }
  }
  return out;
}

export function demoCode() {
  const pagesDir = join(process.cwd(), "src/pages");

  const build = async () => {
    const map = {};
    for (const { dir, file } of collectPages(pagesDir)) {
      const source = readFileSync(file, "utf8");
      const blocks = extractBlocks(source);
      // ⚠️ 只发 blocks，不发整个 SFC：76 页全文加起来 500KB+，
      //    会白白计入首包（构建产物从 190KB 涨到 380KB 就是它干的）
      // 每块同时给源码与高亮后的 HTML（shiki + 我们的 VS Code 主题）
      const items = [];
      for (const code of blocks) {
        items.push({ code, html: await highlight(code, "vue") });
      }
      map[dir === "home" ? "/" : `/${dir}`] = items;
    }
    return map;
  };

  return {
    name: "wd-demo-code",

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      if (id === API_ID) return API_RESOLVED;
      return null;
    },

    async load(id) {
      if (id === RESOLVED_ID) {
        const data = await build();
        return `export default ${JSON.stringify(data)};`;
      }
      if (id === API_RESOLVED) {
        const compDir = join(process.cwd(), "../wdesign-ui/src/components");
        return `export default ${JSON.stringify(extractAll(compDir))};`;
      }
      return null;
    },

    configureServer(server) {
      // 改页面源码 → 整页刷新一次。代码面板与预览必须永远同源，
      // 只走 HMR 会让面板停在上一版代码上（那种不一致最难发现）。
      server.watcher.on("change", (file) => {
        const isPage = file.includes("/src/pages/");
        const isComponent = file.includes("wdesign-ui/src/components/");
        if (!isPage && !isComponent) return;
        for (const id of [RESOLVED_ID, API_RESOLVED]) {
          const mod = server.moduleGraph.getModuleById(id);
          if (mod) server.moduleGraph.invalidateModule(mod);
        }
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}
