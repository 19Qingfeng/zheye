<template>
  <div class="container">
    <Model
      v-model:visible="visible"
      title="This is title"
      :outsideRefList="outsideRefList"
    >
      确定删除文章吗
    </Model>
    <button ref="button" @click.prevent="onOpenModel">展示</button>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import '@/utils/index'
import Model from '@/components/Model/index.vue'

export default defineComponent({
  components: {
    Model
  },
  setup () {
    const visible = ref(false)
    const button = ref(null)
    const outsideRefList = [button]
    const onOpenModel = () => {
      visible.value = !visible.value
    }
    return {
      visible,
      button,
      outsideRefList,
      onOpenModel
    }
  }
})
</script>
