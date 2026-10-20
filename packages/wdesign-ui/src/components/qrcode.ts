// =============================================================
//  WDesign — QR Code 封装
//
//  实现来自 **qrcode-generator 1.4.4**
//    Copyright (c) 2009 Kazuhiko Arase
//    MIT License — https://github.com/kazuhikoarase/qrcode-generator
//    源码已内嵌到 ./vendor/qrcode-generator.js，未作为 npm 依赖引入。
//
//  为什么不再自己写：
//    我先前手写了完整实现（GF(256) 运算、Reed-Solomon、掩码罚分），
//    基准测试 10/11 通过，但多块版本（v3+）始终有数据错位。
//    排查发现至少三处容量计算漏乘块数 —— 说明这类有国际标准的算法
//    不值得手写：规范表多、边界条件多、错了只有扫码才能发现。
//    用经过十多年验证的 MIT 实现是更负责任的选择。
//
//  ⚠️ 该库默认用 ISO-8859-1 编码字符串，中文会错。
//     必须把 qrcode.stringToBytes 切到自带的 UTF-8 实现。
// =============================================================

import qrcodeModule from './vendor/qrcode-generator.js'

/** 纠错等级 */
export type EcLevel = 'L' | 'M' | 'Q' | 'H'

export interface QrResult {
  /** 模块矩阵（true = 黑） */
  matrix: boolean[][]
  /** 版本（1~40） */
  version: number
  /** 边长（模块数） */
  size: number
}

/**
 * 取真正的库对象。
 *
 * ⚠️ vendor 文件原本是 UMD，我在末尾补了 `export default qrcode` 让它能被
 * ESM 导入。但这个补丁会带来一个副作用：
 *   · 用 CJS require 时，module.exports 变成 `{ __esModule, default }`
 *   · `stringToBytesFuncs` 挂在**那个 default 对象**上，不在外壳上
 * 所以必须解包 `.default`，否则拿到的是一个空对象，
 * 表现为 `stringToBytesFuncs` 为 undefined、UTF-8 切换永远失败、
 * 中文全部乱码而英文正常 —— 这个症状很难从表象反推到这里。
 */
type QrLib = {
  (typeNumber: number, errorCorrectionLevel: string): QrCode
  stringToBytes: (s: string) => number[]
  stringToBytesFuncs: Record<string, (s: string) => number[]>
}

function getLib(): QrLib {
  /*
   * ⚠️ 必须**惰性**取，不能在模块顶层算一次就固定下来。
   *
   * UMD → ESM 的互操作依赖打包器生成的包装对象：
   *   · 打包器先创建 `qrcodeModule`（可能只是个 `{ default: ... }` 外壳）
   *   · 再执行原文件里的 UMD 赋值，把真正的函数写进 `.default`
   * 如果模块顶层就解包，读到的可能是尚未填充的外壳，
   * 于是 `stringToBytesFuncs` 永远是 undefined、UTF-8 切换永远失败。
   *
   * 症状极具误导性：英文能扫、中文全是乱码，
   * 看起来像编码实现问题，其实是取错了对象。
   */
  const m = qrcodeModule as unknown as { default?: QrLib }
  return (m.default ?? (m as unknown as QrLib)) as QrLib
}

interface QrCode {
  addData(data: string, mode?: string): void
  make(): void
  getModuleCount(): number
  isDark(row: number, col: number): boolean
}

/**
 * 切到 UTF-8 编码。
 *
 * ⚠️ 这一步是**必须**的：
 *   库默认的 stringToBytesFuncs['default'] 只做 `charCodeAt(i) & 0xff`，
 *   即 ISO-8859-1 —— 任何非 ASCII 字符（中文、emoji）都会被截成一个字节，
 *   扫码得到的是乱码。
 *
 * ⚠️ 而且必须在**每次编码前**确认，不能只在模块加载时设一次。
 *   UMD 文件末尾注册 `stringToBytesFuncs['UTF-8']` 的那段 IIFE
 *   执行顺序依赖打包器的副作用顺序；本项目用 esbuild 打包时，
 *   模块顶层的这次赋值可能早于库内部的注册，于是拿到 undefined 而被跳过，
 *   表现为"中文始终乱码但英文正常"。
 */
function ensureUtf8(lib: QrLib): boolean {
  const funcs = lib.stringToBytesFuncs
  if (funcs && funcs['UTF-8']) {
    lib.stringToBytes = funcs['UTF-8']
    return true
  }
  return false
}

/**
 * 编码为 QR 矩阵。
 *
 * @param text 要编码的文本（UTF-8）
 * @param ec   纠错等级，默认 M（约 15% 容错，日常够用）
 * @param minVersion 最小版本（0 = 自动选最小的）
 * @returns 矩阵；文本超长时库会抛错，这里捕获后返回 null
 */
export function encodeQr(text: string, ec: EcLevel = 'M', minVersion = 0): QrResult | null {
  try {
    const lib = getLib()
    // 每次编码前保证走 UTF-8（见 ensureUtf8 的说明）
    ensureUtf8(lib)
    // typeNumber = 0 表示自动选择最小可用版本
    const qr = lib(minVersion, ec)
    qr.addData(text, 'Byte')
    qr.make()

    const n = qr.getModuleCount()
    const matrix: boolean[][] = Array.from({ length: n }, (_, r) =>
      Array.from({ length: n }, (_, c) => qr.isDark(r, c)),
    )

    return {
      matrix,
      version: (n - 17) / 4,
      size: n,
    }
  } catch {
    /*
     * 库在内容超出所选版本容量时抛 "code length overflow"。
     * 对外返回 null 比抛异常更友好 —— 调用方只需判断有无结果。
     */
    return null
  }
}
