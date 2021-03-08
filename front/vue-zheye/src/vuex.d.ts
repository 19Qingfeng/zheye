import { ComponentCustomProperties } from 'vue'
import { StateType } from './store/types/index'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<StateType>;
  }
}
