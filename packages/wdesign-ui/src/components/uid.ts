/**
 * 组件内部用的稳定 id（给 aria-controls / aria-activedescendant 这类
 * 「元素之间互指」的属性用）。
 *
 * 为什么不直接 `useId()`：那是 Vue 3.5 才有的 API，而本库的 peer 依赖是
 * `vue >= 3.3`，用了会让 3.3 / 3.4 的使用者直接报错。
 *
 * 为什么不用 Math.random：同一棵树在 SSR 与客户端会得到不同值，
 * 水合时属性对不上。模块级自增在同一进程内顺序稳定，两侧一致。
 */
let seq = 0

export function uid(prefix = 'wd') {
  seq += 1
  return `${prefix}-${seq}`
}
