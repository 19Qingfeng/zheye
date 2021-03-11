<template>
  <div class="validate-input-container pb-3">
    <component
      :is="tag"
      ref="input"
      class="form-control"
      :class="{ 'is-invalid': value.error }"
      :value="value.val"
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
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive
} from 'vue'
import { $emit, $off, $on } from '@/utils/event'

const emailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/

interface RuleProp {
  type: 'require' | 'email' | 'custom';
  message: string;
  validate?: (value: any) => boolean;
}

export type TagType = 'input' | 'textarea';

export type RulesProps = RuleProp[];

export default defineComponent({
  name: 'ValidateInput',
  inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RulesProps>
    },
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    const value = reactive({
      val: computed({
        get: () => props.modelValue,
        set: (val) => {
          context.emit('updateModelValue', val)
        }
      }),
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
            case 'custom':
              passed = rule.validate ? rule.validate(props.modelValue) : true
          }
          return passed
        })
        value.error = !allPass
        return allPass
      }
      return true
    }
    const updateModelValue = (e: KeyboardEvent) => {
      console.log('update')
      const target = e.target
      const updateValue = (target as HTMLInputElement).value
      value.val = updateValue
      context.emit('update:modelValue', updateValue)
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
