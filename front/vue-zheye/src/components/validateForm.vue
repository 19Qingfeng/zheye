<template>
  <form class="validate-form-container">
    <slot />
    <div class="submit-area" @click="onFormSubmit">
      <slot name="footer">
        <span class="btn btn-primary">提交</span>
      </slot>
    </div>
  </form>
</template>

<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue'
import { $on, $off, $emit } from '@/utils/event'
type validateRule = () => boolean;

export default defineComponent({
  name: 'ValidateForm',
  emits: ['onFormSubmit'],
  setup (props, context) {
    const validateList: validateRule[] = []
    const onFormSubmit = () => {
      const result = validateList
        .map((func) => func())
        .every((boolean) => boolean)
      context.emit('onFormSubmit', result)
    }
    const clearFormData = () => {
      $emit('clear-form-data')
    }
    const validateFormItem = (func: validateRule) => {
      validateList.push(func)
    }
    $on('form-item-created', validateFormItem)
    onUnmounted(() => {
      $off('form-item-created', validateFormItem)
    })
    return {
      onFormSubmit,
      clearFormData
    }
  }
})
</script>
