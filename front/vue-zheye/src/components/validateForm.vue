<template>
  <form class="validate-form-container">
    <slot />
    <div class="submit-area" @click="onFormSubmit">
      <slot name="footer">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ValidateForm',
  emits: ['onFormSubmit'],
  setup (props, context) {
    const onFormSubmit = () => {
      context.emit('onFormSubmit', true)
    }
    return {
      onFormSubmit
    }
  }
})
</script>
