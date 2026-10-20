// =============================================================
//  WDesign — Form 校验上下文
//
//  表单校验的分工：
//    WdForm      持有 model / rules，向子级 provide 一个注册表
//    WdFormItem  注册自己（prop 名 + 校验函数），负责显示错误与状态
//    具体控件    只管 v-model，不需要知道校验的存在
//
//  这样控件完全解耦：任何带 modelValue 的组件都能放进 FormItem 受管。
// =============================================================

export type FormRuleTrigger = 'change' | 'blur'

export interface FormRule {
  /** 是否必填 */
  required?: boolean
  /** 空值时提示 */
  message?: string
  /** 自定义校验，返回 true / 字符串错误 */
  validator?: (value: unknown, model: Record<string, unknown>) => boolean | string | Promise<boolean | string>
  /** 触发时机，默认 change */
  trigger?: FormRuleTrigger
  /** 最小长度（字符串） */
  min?: number
  /** 最大长度（字符串） */
  max?: number
  /** 正则 */
  pattern?: RegExp
}

export type FormRules = Record<string, FormRule[]>

export interface FormItemInstance {
  prop: string
  validate: (trigger?: FormRuleTrigger) => Promise<boolean>
  reset: () => void
  /** 由 WdFormItem 内部维护，供 WdForm 汇总 */
  getError: () => string
}

export const FORM_CONTEXT = Symbol('wd-form')
export const FORM_ITEM_CONTEXT = Symbol('wd-form-item')

export interface FormContext {
  model: () => Record<string, unknown>
  rules: () => FormRules
  disabled: () => boolean
  labelPosition: () => 'top' | 'left'
  labelWidth: () => string
  register: (item: FormItemInstance) => void
  unregister: (item: FormItemInstance) => void
  /** 子项值变化时通知父级重新校验该字段 */
  notifyChange: (prop: string, trigger: FormRuleTrigger) => void
}

/** 判断「空」：undefined / null / '' / [] 都算空 */
export function isEmpty(v: unknown): boolean {
  if (v === undefined || v === null) return true
  if (typeof v === 'string') return v.trim() === ''
  if (Array.isArray(v)) return v.length === 0
  return false
}

/** 执行一组规则，返回第一条错误信息（空串表示通过） */
export async function runRules(
  rules: FormRule[],
  value: unknown,
  model: Record<string, unknown>,
): Promise<string> {
  for (const r of rules) {
    if (r.required && isEmpty(value)) {
      return r.message || '此项为必填'
    }
    // 非必填且为空时，跳过其余规则（避免 min/max 误报）
    if (isEmpty(value) && !r.required) continue

    if (typeof value === 'string') {
      if (r.min !== undefined && value.length < r.min) {
        return r.message || `至少 ${r.min} 个字符`
      }
      if (r.max !== undefined && value.length > r.max) {
        return r.message || `最多 ${r.max} 个字符`
      }
    }
    if (r.pattern && typeof value === 'string' && !r.pattern.test(value)) {
      return r.message || '格式不正确'
    }
    if (r.validator) {
      const out = await r.validator(value, model)
      if (out !== true) return typeof out === 'string' ? out : r.message || '校验未通过'
    }
  }
  return ''
}
