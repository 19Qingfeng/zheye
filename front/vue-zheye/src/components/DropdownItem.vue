<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <slot />
  </li>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    // nothing
  }
})
</script>
<style lang="scss">
.dropdown-option.is-disabled * {
  color: #6c757d;
  cursor: none;
  pointer-events: none; // 元素永远不会成为鼠标事件的target。
  background-color: transparent;
}
</style>
