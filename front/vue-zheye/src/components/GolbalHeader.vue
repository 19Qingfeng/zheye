<template>
  <nav class="navbar navbar-dark bg-primary mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul class="list-inline mb-0">
      <template v-if="!user.isLogin">
        <li class="list-inline-item">
          <a href="" class="btn btn-outline-light my-2">登陆</a>
        </li>
        <li class="list-inline-item">
          <a href="" class="btn btn-outline-light my-2">注册</a>
        </li>
      </template>
      <template v-else>
        <li class="list-inline-item">
          <dropdown :title="`你好 ${user.name}`" />
        </li>
      </template>
    </ul>
  </nav>
</template>
<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'GolbalHeader',
  components: {
    Dropdown
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style>
</style>
