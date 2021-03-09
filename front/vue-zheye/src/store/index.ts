import { InjectionKey } from 'vue'
import { StateType } from './interface'
import {
  createStore,
  createLogger,
  Store,
  useStore as baseUseStore
} from 'vuex'

export const key: InjectionKey<Store<StateType>> = Symbol('vuex key')

const modulesFiles = require.context('./modules', true, /\.[t|j]s$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles
  .keys()
  .reduce((modules: any, modulePath: string) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})

const store = createStore<StateType>({
  modules,
  plugins: process.env.NODE_NEV === 'dev' ? [createLogger()] : []
})

export function useStore () {
  return baseUseStore(key)
}

export default store
