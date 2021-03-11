 <template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import PostList from '../components/PostList/index.vue'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const currentId = route.params.id
    const column = computed(() =>
      store.getters['home/currentColumn'](currentId)
    )
    onMounted(() => {
      store.dispatch('home/fetchColumn', currentId)
      store.dispatch('home/fetchPosts', currentId)
    })
    // const list = computed(() => store.getters['home/currentPosts'](currentId))
    const list = computed(() => store.getters['home/currentPosts'](currentId))
    onMounted(() => {
      // nothing
    })
    return {
      column,
      list
    }
  }
})
</script>
