import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import Column from '@/views/column.vue'
import store from '@/store'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect: '/login',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            requireLogin: true
          }
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: {
            redirectAlreadyLogin: true
          }
        },
        {
          path: '/column/:id',
          name: 'Column',
          component: Column,
          meta: {
            requireLogin: true
          }
        },
        {
          path: '/create',
          name: 'CreatePosts',
          component: () =>
            import(
              /* webpackChunkName:'createPosts' */ '@/views/createPosts.vue'
            ),
          meta: {
            requireLogin: true
          }
        }
      ]
    }
  ]
})

const whiteList: string[] = ['/login']

router.beforeEach(async (to, from, next) => {
  // isLogin 使用是否存在token进行检查 而不是isLogin
  const isLogin = store.getters['user/isLogin']
  const hasUserInfo = !!store.state.user.user._id
  if (isLogin) {
    if (to.meta.redirectAlreadyLogin && isLogin) {
      next({ name: 'Home' })
    } else {
      if (hasUserInfo) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch {
          store.dispatch('user/removeLoginInfo')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
