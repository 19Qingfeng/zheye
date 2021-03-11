<template>
  <teleport to="body">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content" ref="model">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="onClose"
            ></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="onClose"
            >
              {{ cancelText }}
            </button>
            <button type="button" class="btn btn-primary" @click="onConfrim">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import type { PropType, Ref } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'Model',
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '保存'
    },
    outsideRefList: {
      type: Object as PropType<Ref<HTMLElement | null>[]>
    }
  },
  emits: ['update:visible', 'model-confirm', 'model-close'],
  setup (props, context) {
    const model = ref<null | HTMLElement>(null)
    const onClose = () => {
      context.emit('model-close')
      context.emit('update:visible', false)
    }
    const onConfrim = () => {
      context.emit('model-confirm')
      context.emit('update:visible', false)
    }
    const { isOutside } = useClickOutside(model, props.outsideRefList)
    watch(isOutside, (cur) => {
      if (!cur && props.visible) {
        onClose()
      }
    })
    return {
      onClose,
      onConfrim,
      model
    }
  }
})
</script>
