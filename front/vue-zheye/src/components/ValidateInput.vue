<template>
  <div class="validate-input-container pb-3">
    <input
      ref="input"
      class="form-control"
      :class="{ 'is-invalid': value.error }"
      v-model="value.val"
      v-bind="$attrs"
      @blur="validateInput"
      @input="updateModelValue"
    />
    <span v-if="value.error" class="invalid-feedback">
      {{ value.message }}
    </span>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive
} from 'vue'
import { $emit, $off, $on } from '@/utils/event'

const emailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/

interface RuleProp {
  type: 'require' | 'email';
  message: string;
}

export type RulesProps = RuleProp[];

export default defineComponent({
  name: 'ValidateInput',
  inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RulesProps>
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    const value = reactive({
      val: props.modelValue,
      message: '',
      error: false
    })
    const validateInput = () => {
      if (props.rules) {
        const allPass = props.rules.every((rule) => {
          let passed = true
          value.message = rule.message
          switch (rule.type) {
            case 'require':
              passed = value.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(value.val)
              break
          }
          return passed
        })
        value.error = !allPass
        return allPass
      }
      return true
    }
    const updateModelValue = (e: KeyboardEvent) => {
      const target = e.target
      const value = (target as HTMLInputElement).value
      context.emit('update:modelValue', value)
    }
    const clearInput = () => {
      value.val = ''
      context.emit('update:modelValue', '')
    }
    onMounted(() => {
      $emit('form-item-created', validateInput)
      // 监听清空
      $on('clear-form-data', clearInput)
    })
    onUnmounted(() => {
      $off('form-item-created', validateInput)
      $off('clear-form-data', clearInput)
    })
    return {
      value,
      validateInput,
      updateModelValue
    }
  }
})
</script>
