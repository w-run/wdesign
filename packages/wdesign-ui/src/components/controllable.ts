// =============================================================
//  受控 / 非受控双模式
//
//  ===== 为什么需要 =====
//  之前所有表单组件都**强制受控**：使用者必须自己写
//      const v = ref('')
//      <wd-input v-model="v" />
//  哪怕只是放一个搜索框。表单场景里 state 一多就很啰嗦。
//
//  非受控模式下组件自己持有状态，使用者只在需要时读：
//      <wd-input default-value="初始值" @change="onChange" />
//
//  ===== 语义（对齐 React 与主流 Vue 库）=====
//  - 传了 modelValue（含 undefined 判断）→ 受控，内部状态不生效
//  - 没传 modelValue，但传了 defaultValue → 非受控，用 defaultValue 初始化
//  - 两个都没传 → 非受控，用 fallback
//
//  ===== 一个容易搞错的点 =====
//  Vue 的 props 无法区分「没传」和「传了 undefined」——
//  两者都表现为 props.modelValue === undefined。因此判断依据用
//  `'modelValue' in props`（Vue 3 的 setup props 是响应式对象，
//  可以用 in 判断是否存在该键；父组件没传时该键不存在）。
//
//  实际使用中更稳的判据是 vnode.props —— 这里用 props 的 in
//  检查已足够覆盖常规用法，且不依赖内部 API。
// =============================================================
import { computed, getCurrentInstance, ref, watch } from 'vue'
import type { Ref } from 'vue'

export interface UseControllableOptions<T> {
  /** 组件收到的 modelValue prop */
  modelValue: Ref<T | undefined>
  /** 组件收到的 defaultValue prop */
  defaultValue?: Ref<T | undefined>
  /** 两者都没传时的兜底值 */
  fallback: T
  /** 未受控时是否需要上报变更（一般是 emit('update:modelValue')） */
  onChange?: (v: T) => void
  /** 判断「父组件是否真的传了值」 */
  isProvided?: () => boolean
}

export function useControllable<T>(opts: UseControllableOptions<T>) {
  const { modelValue, defaultValue, fallback, onChange } = opts

  /**
   * 是否受控。
   *
   * ⚠️ 不能用 `'modelValue' in props` —— Vue 的 props 对象包含**所有声明过的**
   * prop 键（没传也是 undefined），`in` 恒为 true，判断永远失效。
   *
   * 正确判据是父组件是否真的写了这个 attr：读 vnode.props。
   * 这在 setup 期间可用（getCurrentInstance().vnode）。
   * 同时留 isProvided 回调作为显式覆盖。
   */
  const inst = getCurrentInstance()
  const providedAtSetup = (() => {
    if (opts.isProvided) return null
    const vp = inst?.vnode?.props as Record<string, unknown> | null
    if (!vp) return modelValue.value !== undefined
    // 模板里写 :model-value="x" 或 v-model 都会产生 modelValue / model-value 键
    return 'modelValue' in vp || 'model-value' in vp
  })()

  const controlled = computed(() =>
    opts.isProvided ? opts.isProvided() : !!providedAtSetup,
  )

  // 内部状态：初始取 defaultValue，其次 fallback
  const inner = ref<T>(
    (defaultValue?.value !== undefined ? defaultValue.value : fallback) as T,
  ) as Ref<T>

  /** 真正生效的值 */
  const value = computed<T>(() => (controlled.value ? (modelValue.value as T) : inner.value))

  /** 更新：受控模式只上报，非受控模式改内部状态并上报 */
  function set(next: T) {
    if (!controlled.value) inner.value = next
    onChange?.(next)
  }

  /** 受控模式下父组件改了值，内部状态同步一份，方便切回非受控时衔接 */
  watch(
    () => modelValue.value,
    (v) => {
      if (controlled.value && v !== undefined) inner.value = v as T
    },
  )

  /** defaultValue 后到（异步获取初值）时也要能生效 */
  watch(
    () => defaultValue?.value,
    (v) => {
      if (!controlled.value && v !== undefined) inner.value = v as T
    },
  )

  return { value, set, controlled, inner }
}
