<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>

          <router-link :to="{ name: 'Column', params: { id: column.id } }">
            <a href="#" class="btn btn-outline-primary">进入专栏</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue'
import { ColumnListData } from './interface'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      // PropType接受一个泛型
      type: Array as PropType<ColumnListData[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed({
      get: () => {
        return props.list.map((column) => {
          return {
            ...column,
            avatar: column.avatar
              ? column.avatar
              : require('../../assets/default.png')
          }
        })
      },
      set: () => {
        // nothing
      }
    })
    return {
      columnList
    }
  }
})
</script>

<style lang='scss' scoped>
.card-body {
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
