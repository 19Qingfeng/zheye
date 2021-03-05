<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>

    <ul class="dropdown-menu custom-dropdown-menu" v-show="isOpen">
      <slot />
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import userClickOutside from '../hooks/useClickOutside'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const { isOutside } = userClickOutside(dropdownRef)
    watch(isOutside, (current) => {
      if (!current && isOpen.value) isOpen.value = false
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
<style lang="scss" scoped>
.custom-dropdown-menu {
  display: block;
}
</style>
