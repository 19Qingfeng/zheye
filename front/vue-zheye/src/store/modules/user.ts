import { StateType } from '../interface'
import { login, getUserLogin } from '@/api/user/index'
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from '@/utils/locationStorage'
import { LoginResponse, UserInfoRes } from '@/type'
import { Module } from 'vuex'

export interface UserState {
  user: UserInfo;
  token: string;
}

export interface UserInfo {
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}

const module: Module<UserState, StateType> = {
  namespaced: true,
  state: {
    token: getLocalStorage('token'),
    user: {}
  },
  getters: {
    isLogin: state => state.token !== ''
  },
  mutations: {
    setLoginInfo (state, token) {
      state.token = token
      setLocalStorage('token', token)
    },
    SET_USER_LOGIN_INFO (state, info: UserInfoRes) {
      state.user = {
        ...info
      }
    },
    REMOVE_LOGIN_INFO (state) {
      state.token = ''
      state.user = {}
      removeLocalStorage(state.token)
    }
  },
  actions: {
    async login ({ commit }, payload) {
      const data = await login<LoginResponse>(payload)
      commit('setLoginInfo', data.token)
      return data
    },
    async getInfo ({ commit }) {
      const userInfo = await getUserLogin<UserInfoRes>()
      commit('SET_USER_LOGIN_INFO', userInfo)
    },
    // 组合
    async getLoginInfo ({ dispatch }, payload) {
      await dispatch('login', payload)
      return dispatch('getInfo')
    },
    removeLoginInfo ({ commit }) {
      commit('REMOVE_LOGIN_INFO')
    }
  }
}

export default module
