<template>
  <div class="container">
    <golbal-header :user="userInfo" />
    <column-list :list="list" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ColumnList, { ColumnListData } from './components/ColumnList.vue'
import GolbalHeader, { UserProps } from './components/GolbalHeader.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

const data: ColumnListData[] = [
  {
    id: 1,
    title: 'hello',
    avatar:
      'https://th.bing.com/th/id/R5c74741127a42b3c550f0a6ecd82096a?rik=mSmOU8RfNwFUbQ&riu=http%3a%2f%2fimg17.3lian.com%2f201612%2f20%2f99b8790a4faae5fcebbe838eb24213ac.jpg&ehk=tGjAhjyRMAnzuFL%2b0y5ODF%2bozs8ahlOJ8%2fXRhxAri7E%3d&risl=&pid=ImgRaw',
    description: '这是描述'
  },
  {
    id: 2,
    title: 'hello',
    avatar: '',
    description: '这是描述'
  },
  {
    id: 3,
    title: 'hello',
    avatar:
      'https://th.bing.com/th/id/R5c74741127a42b3c550f0a6ecd82096a?rik=mSmOU8RfNwFUbQ&riu=http%3a%2f%2fimg17.3lian.com%2f201612%2f20%2f99b8790a4faae5fcebbe838eb24213ac.jpg&ehk=tGjAhjyRMAnzuFL%2b0y5ODF%2bozs8ahlOJ8%2fXRhxAri7E%3d&risl=&pid=ImgRaw',
    description: '这是描述'
  },
  {
    id: 4,
    title: 'hello',
    avatar:
      'https://th.bing.com/th/id/R5c74741127a42b3c550f0a6ecd82096a?rik=mSmOU8RfNwFUbQ&riu=http%3a%2f%2fimg17.3lian.com%2f201612%2f20%2f99b8790a4faae5fcebbe838eb24213ac.jpg&ehk=tGjAhjyRMAnzuFL%2b0y5ODF%2bozs8ahlOJ8%2fXRhxAri7E%3d&risl=&pid=ImgRaw',
    description: '这是描述'
  },
  {
    id: 5,
    title: 'hello',
    avatar:
      'https://th.bing.com/th/id/R5c74741127a42b3c550f0a6ecd82096a?rik=mSmOU8RfNwFUbQ&riu=http%3a%2f%2fimg17.3lian.com%2f201612%2f20%2f99b8790a4faae5fcebbe838eb24213ac.jpg&ehk=tGjAhjyRMAnzuFL%2b0y5ODF%2bozs8ahlOJ8%2fXRhxAri7E%3d&risl=&pid=ImgRaw',
    description: '这是描述'
  },
  {
    id: 6,
    title: 'hello',
    avatar:
      'https://th.bing.com/th/id/R5c74741127a42b3c550f0a6ecd82096a?rik=mSmOU8RfNwFUbQ&riu=http%3a%2f%2fimg17.3lian.com%2f201612%2f20%2f99b8790a4faae5fcebbe838eb24213ac.jpg&ehk=tGjAhjyRMAnzuFL%2b0y5ODF%2bozs8ahlOJ8%2fXRhxAri7E%3d&risl=&pid=ImgRaw',
    description: '这是描述'
  }
]

const userInfo: UserProps = {
  isLogin: true,
  name: 'wang.haoyu',
  id: 1
}

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GolbalHeader
  },
  setup () {
    return {
      list: data,
      userInfo
    }
  }
})
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
