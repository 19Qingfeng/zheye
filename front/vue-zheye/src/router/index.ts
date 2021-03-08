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
          component: Home
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
          component: Column
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

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin && !store.state.user.user.isLogin) {
    next({ name: 'Login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.user.isLogin) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
