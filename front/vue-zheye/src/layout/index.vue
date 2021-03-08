<template>
  <section class="container">
    <golbal-header :user="userInfo" />
    <router-view></router-view>
  </section>
</template>

<script lang='ts'>
import { defineComponent, computed, ComputedRef } from 'vue'
import { useStore } from '@/store/index'
import GolbalHeader, { UserProps } from '../components/GolbalHeader.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    GolbalHeader
  },
  setup () {
    const store = useStore()
    const userInfo: ComputedRef<UserProps> = computed(
      () => store.state.user.user
    )
    return {
      userInfo
    }
  }
})
</script>
