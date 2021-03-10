<template>
  <nav class="navbar navbar-dark bg-primary mb-4 px-4">
    <a class="navbar-brand" href="#" @click="goBackHome">者也专栏</a>
    <ul class="list-inline mb-0">
      <template v-if="!isLogin">
        <li class="list-inline-item">
          <a href="" class="btn btn-outline-light my-2" @click="handleLogin"
            >登陆</a
          >
        </li>
        <li class="list-inline-item" @click="handleSignup">
          <a href="" class="btn btn-outline-light my-2">注册</a>
        </li>
      </template>
      <template v-else>
        <li class="list-inline-item">
          <dropdown :title="`你好 ${user.nickName}`">
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
import { computed, defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { UserInfo } from '@/store/modules/user'
import { useStore } from '@/store'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

export default defineComponent({
  name: 'GolbalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserInfo>,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const goBackHome = () => {
      router.push({ name: 'Home' })
    }
    const handleLogin = () => {
      router.push({ name: 'Login' })
    }
    const handleSignup = () => {
      router.push({ name: 'Register' })
    }
    const isLogin = computed(() => {
      return store.getters['user/isLogin']
    })
    return {
      isLogin,
      goBackHome,
      handleSignup,
      handleLogin
    }
  }
})
</script>

<style>
</style>
