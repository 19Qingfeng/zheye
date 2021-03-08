<template>
  <nav class="navbar navbar-dark bg-primary mb-4 px-4">
    <a class="navbar-brand" href="#" @click="goBackHome">者也专栏</a>
    <ul class="list-inline mb-0">
      <template v-if="!user.isLogin">
        <li class="list-inline-item">
          <a href="" class="btn btn-outline-light my-2" @click="handleLogin"
            >登陆</a
          >
        </li>
        <li class="list-inline-item">
          <a href="" class="btn btn-outline-light my-2">注册</a>
        </li>
      </template>
      <template v-else>
        <li class="list-inline-item">
          <dropdown :title="`你好 ${user.name}`">
            <dropdown-item link="New">
              <a href="#" class="dropdown-item"> 新建文章</a>
            </dropdown-item>
            <dropdown-item>
              <a href="#" class="dropdown-item"> 编辑资料</a>
            </dropdown-item>
            <dropdown-item :disabled="true">
              <a href="#" class="dropdown-item"> 退出登陆</a>
            </dropdown-item>
          </dropdown>
        </li>
      </template>
    </ul>
  </nav>
</template>
<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'GolbalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const goBackHome = () => {
      router.push({ name: 'Home' })
    }
    const handleLogin = () => {
      router.push({ name: 'Login' })
    }
    return {
      goBackHome,
      handleLogin
    }
  }
})
</script>

<style>
</style>
