<template>
  <teleport to="body">
    <div
      class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{ 'background-color': background }"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ text || "Loading..." }}</span>
        </div>
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String
    },
    background: {
      type: String,
      default: ''
    }
  }
})
</script>
<style lang="scss" scoped>
.loading-container {
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
