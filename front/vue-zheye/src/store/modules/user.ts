import { StateType } from '../types/index'
import { Module } from 'vuex'

export interface UserState {
  user: UserInfo;
}

interface UserInfo {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

const module: Module<UserState, StateType> = {
  namespaced: true,
  state: {
    user: {
      isLogin: false,
      name: undefined,
      id: undefined,
      columnId: undefined
    }
  },
  mutations: {
    login (state) {
      state.user.isLogin = true
      state.user.name = 'wang.haoyu'
      state.user.id = 1
    }
  }
}

export default module
