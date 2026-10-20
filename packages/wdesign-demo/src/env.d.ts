/// <reference types="vite/client" />

/**
 * 演示站代码面板的数据源（见 tools/demo-code-plugin.mjs）。
 * key 是路由路径，blocks 是该页每个 <DemoBlock> 的模板原文，顺序与渲染顺序一致。
 */
declare module "virtual:demo-code" {
  /** 路由路径 → 该页每个 <DemoBlock> 的模板原文（顺序与渲染顺序一致） */
  const map: Record<string, string[]>;
  export default map;
}

/** 组件 API（属性 / 事件 / 插槽），构建期从 .vue 源码解析，见 tools/extract-api.mjs */
declare module "virtual:component-api" {
  interface ApiProp {
    name: string;
    type: string;
    default: string;
    desc: string;
  }
  interface ApiEmit {
    name: string;
    params: string;
  }
  interface ApiSlot {
    name: string;
  }
  interface Api {
    props: ApiProp[];
    emits: ApiEmit[];
    slots: ApiSlot[];
  }
  const map: Record<string, Api>;
  export default map;
}
