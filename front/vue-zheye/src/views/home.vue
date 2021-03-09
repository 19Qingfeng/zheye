<template>
  <div class="container">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list" />
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/index'
import ColumnList from '../components/ComumnList/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore()
    const list = computed(() => {
      return store.state.home.column
    })
    store.dispatch('home/fetchColumns')
    return {
      list
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
