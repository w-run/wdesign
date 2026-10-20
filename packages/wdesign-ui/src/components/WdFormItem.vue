<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import {
  FORM_CONTEXT,
  isEmpty,
  runRules,
  type FormContext,
  type FormRuleTrigger,
} from './form-context'

defineOptions({ name: 'WdFormItem' })

const props = withDefaults(
  defineProps<{
    /** 对应 model 里的字段名 */
    prop?: string
    label?: string
    /** 覆盖表单的规则 */
    rules?: import('./form-context').FormRule[]
    /** 是否必填标记（仅视觉；实际校验仍看 rules） */
    required?: boolean
    /** 补充说明 */
    hint?: string
    /** 校验时机，默认在值变化时 */
    validateTrigger?: FormRuleTrigger
  }>(),
  { prop: '', validateTrigger: 'change', required: false },
)

const form = inject<FormContext | null>(FORM_CONTEXT, null)

const error = ref('')
const touched = ref(false)
const validating = ref(false)

const mergedRules = computed(() => {
  if (props.rules?.length) return props.rules
  if (!form || !props.prop) return []
  return form.rules()[props.prop] ?? []
})

const isRequired = computed(
  () => props.required || mergedRules.value.some((r) => r.required),
)

/** 取当前值 */
function currentValue(): unknown {
  return form?.model()?.[props.prop]
}

async function validate(trigger?: FormRuleTrigger): Promise<boolean> {
  if (!mergedRules.value.length) {
    error.value = ''
    return true
  }
  // 指定 trigger 时只跑该时机的规则（未标注 trigger 的规则视为通用）
  const rules = trigger
    ? mergedRules.value.filter((r) => !r.trigger || r.trigger === trigger)
    : mergedRules.value
  if (!rules.length) return true

  validating.value = true
  try {
    const msg = await runRules(rules, currentValue(), form?.model() ?? {})
    error.value = msg
    touched.value = true
    return !msg
  } finally {
    validating.value = false
  }
}

function reset() {
  error.value = ''
  touched.value = false
}

/* ---- 注册到表单 ---- */
if (form && props.prop) {
  form.register({ prop: props.prop, validate, reset, getError: () => error.value })
  onBeforeUnmount(() => form.unregister({ prop: props.prop, validate, reset, getError: () => error.value }))
}

/**
 * 值变化时校验。
 * 用 watch 监听 model 里该字段：控件抛出 update:modelValue → 父级更新 model
 * → 这里收到新值 → 触发校验。控件本身无需感知表单存在。
 */
watch(
  () => (form && props.prop ? form.model()[props.prop] : undefined),
  (v, old) => {
    if (v === old) return
    if (props.validateTrigger === 'change') validate('change')
  },
)

/** 失焦校验：包一层，捕获内部控件的 focusout */
function onFocusOut(e: FocusEvent) {
  const next = e.relatedTarget as Node | null
  if (next && (e.currentTarget as HTMLElement).contains(next)) return
  validate('blur')
}

const state = computed(() => {
  if (validating.value) return 'validating'
  if (error.value) return 'error'
  if (touched.value && !isEmpty(currentValue())) return 'success'
  return ''
})

const disabled = computed(() => form?.disabled() ?? false)

defineExpose({ validate, reset, error })
</script>

<template>
  <div
    class="wd-form-item"
    :class="[`wd-form-item--${state}`, { 'wd-form-item--disabled': disabled }]"
    :data-form-prop="prop || undefined"
  >
    <label v-if="label" class="wd-form-item__label" :style="form?.labelPosition() === 'left' ? { width: form?.labelWidth() } : undefined">
      <span v-if="isRequired" class="wd-form-item__req" aria-hidden="true">*</span>
      {{ label }}
    </label>
    <div class="wd-form-item__control" @focusout="onFocusOut">
      <slot />
      <p v-if="error" class="wd-form-item__error" role="alert">{{ error }}</p>
      <p v-else-if="hint" class="wd-form-item__hint">{{ hint }}</p>
    </div>
  </div>
</template>
