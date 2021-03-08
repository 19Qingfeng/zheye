<template>
  <li
    class="dropdown-option"
    :class="{ 'is-disabled': disabled }"
    @click="onClickDropItem"
  >
    <slot />
  </li>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // useRouter 只能在setup中使用
    const router = useRouter()
    const onClickDropItem = () => {
      if (props.link) {
        router.push({
          name: props.link
        })
      }
    }
    return {
      onClickDropItem
    }
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
