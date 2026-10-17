<script setup lang="ts">
import { provide, reactive, ref } from 'vue'
import {
  FORM_CONTEXT,
  runRules,
  type FormItemInstance,
  type FormRuleTrigger,
  type FormRules,
} from './form-context'

defineOptions({ name: 'WdForm' })

const props = withDefaults(
  defineProps<{
    /** 表单数据（v-model，双向） */
    modelValue?: Record<string, unknown>
    /** 校验规则：{ 字段名: FormRule[] } */
    rules?: FormRules
    /** 标签位置 */
    labelPosition?: 'top' | 'left'
    /** labelPosition=left 时的标签宽度 */
    labelWidth?: string
    /** 整体禁用 */
    disabled?: boolean
    /** 校验失败时滚动到第一个错误项 */
    scrollToError?: boolean
  }>(),
  {
    modelValue: () => ({}),
    rules: () => ({}),
    labelPosition: 'top',
    labelWidth: '96px',
    disabled: false,
    scrollToError: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: Record<string, unknown>): void
  (e: 'submit', v: Record<string, unknown>): void
  (e: 'validate', ok: boolean, errors: Record<string, string>): void
}>()

/* ---------------- 子项注册表 ---------------- */
const items = reactive(new Map<string, FormItemInstance>())

function register(item: FormItemInstance) {
  items.set(item.prop, item)
}
function unregister(item: FormItemInstance) {
  items.delete(item.prop)
}

/** 子项值变化 → 触发该字段 change 校验 */
async function notifyChange(prop: string, trigger: FormRuleTrigger) {
  const item = items.get(prop)
  if (!item) return
  await item.validate(trigger)
}

provide(FORM_CONTEXT, {
  model: () => props.modelValue,
  rules: () => props.rules,
  disabled: () => props.disabled,
  labelPosition: () => props.labelPosition,
  labelWidth: () => props.labelWidth,
  register,
  unregister,
  notifyChange,
})

/* ---------------- 对外 API ---------------- */
const validating = ref(false)

/** 校验全部（或指定字段），返回是否通过 */
async function validate(prop?: string): Promise<boolean> {
  validating.value = true
  try {
    const targets = prop ? [items.get(prop)].filter(Boolean) as FormItemInstance[]
                          : Array.from(items.values())
    const results = await Promise.all(targets.map((it) => it.validate()))
    const ok = results.every(Boolean)
    const errors: Record<string, string> = {}
    for (const it of targets) {
      const e = it.getError()
      if (e) errors[it.prop] = e
    }
    emit('validate', ok, errors)
    if (!ok && props.scrollToError) scrollToFirstError(errors)
    return ok
  } finally {
    validating.value = false
  }
}

function scrollToFirstError(errors: Record<string, string>) {
  const first = Object.keys(errors)[0]
  if (!first) return
  const el = formRef.value?.querySelector(`[data-form-prop="${first}"]`)
  ;(el as HTMLElement | null)?.scrollIntoView?.({ block: 'center', behavior: 'smooth' })
}

/** 重置校验状态（不动数据） */
function clearValidate(prop?: string) {
  if (prop) items.get(prop)?.reset()
  else items.forEach((it) => it.reset())
}

/** 重置数据 + 清空校验 */
function resetFields() {
  const model = { ...props.modelValue }
  items.forEach((it, prop) => {
    model[prop] = undefined
    it.reset()
  })
  emit('update:modelValue', model)
}

function onSubmit() {
  validate().then((ok) => {
    if (ok) emit('submit', props.modelValue)
  })
}

const formRef = ref<HTMLElement | null>(null)

defineExpose({ validate, clearValidate, resetFields })
</script>

<template>
  <form
    ref="formRef"
    class="wd-form"
    :class="[`wd-form--label-${labelPosition}`, { 'wd-form--disabled': disabled }]"
    novalidate
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>
