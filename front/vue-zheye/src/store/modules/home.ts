import { ColumnListData } from '@/components/ComumnList/interface'
import { PostProp } from '@/components/PostList/interface'
import { StateType } from '../interface'
import { Module } from 'vuex'
import { getColumn, getColumns, getPosts, createPost } from '@/api/home'
import type { PostProps, Columns, Column, CreatePostParams } from '@/api/home/interface'

export interface HomeState {
  column: ColumnListData[];
  posts: PostProp[];
}

const module: Module<HomeState, StateType> = {
  namespaced: true,
  state: {
    column: [], // 专栏
    posts: [] // 列表
  },
  getters: {
    currentColumn (state) {
      return (id: string) => {
        return state.column.find(c => c.id === id)
      }
    },
    currentPosts: state => (id: string) => {
      return state.posts.filter(p => p.column === id)
    }
  },
  mutations: {
    createPosts (state, posts) {
      state.posts.push(posts)
    },
    fetchColumns (state, columns: Column[]) {
      state.column = columns.map(c => {
        return {
          id: c._id,
          title: c.title,
          description: c.description,
          avatar: c.avatar?.url
        }
      })
    },
    fetchColumn (state, rawData) {
      state.column = [
        {
          id: rawData._id,
          title: rawData.title,
          description: rawData.description,
          avatar: rawData.avatar?.url
        }
      ]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData
    }
  },
  actions: {
    async fetchColumns ({ commit }) {
      const { list } = await getColumns<Columns>()
      commit('home/fetchColumns', list, { root: true })
    },
    async fetchColumn ({ commit }, cid) {
      const data = await getColumn<Column>(cid)
      commit('fetchColumn', data)
    },
    async fetchPosts ({ commit }, cid) {
      const { list } = await getPosts<PostProps>(cid)
      commit('fetchPosts', list)
    },
    async createPost ({ commit }, data: CreatePostParams) {
      const response = await createPost<any>(data)
      // 不需要做commit
      console.log(response, '响应结果')
      // commit("ADD_POST_TO_COLUMNS")
    }
  }
}

export default module
