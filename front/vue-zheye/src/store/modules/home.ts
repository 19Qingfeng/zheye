import { testData, testPosts, ColumnProps, PostProps } from '../../mock/column'
import { StateType } from '../types/index'
import { Module } from 'vuex'

export interface HomeState {
  column: ColumnProps[];
  posts: PostProps[];
}

const module: Module<HomeState, StateType> = {
  namespaced: true,
  state: {
    column: testData, // 专栏
    posts: testPosts // 列表
  },
  getters: {
    biggerColumnLen (state) {
      return state.column.filter(c => c.id > 2).length
    },
    currentColumn (state) {
      return (id: number) => {
        return state.column.find(c => c.id === id)
      }
    },
    currentPosts: state => (id: number) => {
      return state.posts.filter(p => p.columnId === id)
    }
  },
  mutations: {
    createPosts (state, posts) {
      state.posts.push(posts)
    }
  },
  actions: {}
}

export default module
