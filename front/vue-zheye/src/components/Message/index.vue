<template>
  <teleport to="body">
    <div
      v-if="isVsible"
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="messageType"
    >
      <strong>{{ message }}</strong>
      <button @click.prevent="onHide" type="button" class="btn-close"></button>
    </div>
  </teleport>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType, ref, toRef } from 'vue'
import { MessageType } from './createMessage'
export default defineComponent({
  name: 'Message',
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'info'
    },
    message: String
  },
  emits: ['close-message'],
  setup (props, ctx) {
    const isVsible = ref(true)
    const type = toRef(props, 'type')
    const messageType = computed(() => {
      return `alert-${type.value}`
    })
    const onHide = () => {
      isVsible.value = false
      ctx.emit('close-message')
    }
    return {
      messageType,
      isVsible,
      onHide
    }
  }
})
</script>
