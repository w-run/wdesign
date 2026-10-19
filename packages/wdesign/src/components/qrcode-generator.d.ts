/**
 * qrcode-generator 类型声明（第三方纯 JS 库，无官方 @types）。
 *
 * 只声明本项目实际用到的 API，够用即可。
 *
 * ⚠️ 位置很关键：**不能放在 vendor/ 目录里**。
 *    放在被 import 的那个 .js 旁边时，TS 会把同名 .d.ts 当成
 *    那个 JS 文件的"模块声明"，于是报 "File ... is not a module"。
 *    放在组件目录下、用模块名通配声明就正常了。
 */

declare module '*/vendor/qrcode-generator.js' {
  interface WdQrCode {
    addData(data: string, mode?: string): void
    make(): void
    getModuleCount(): number
    isDark(row: number, col: number): boolean
    createSvgTag(opts?: { cellSize?: number; margin?: number }): string
    createDataURL(cellSize?: number, margin?: number): string
  }

  interface WdQrCodeFactory {
    (typeNumber: number, errorCorrectionLevel: string): WdQrCode
    stringToBytes(s: string): number[]
    stringToBytesFuncs: Record<string, (s: string) => number[]>
  }

  const qrcode: WdQrCodeFactory
  export default qrcode
}
