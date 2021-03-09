import request from '../config/request'
import { LoginParams } from '@/type'

export const login = <T>(data: LoginParams) => {
  return request<T>({
    url: '/user/login',
    method: 'post',
    data
  })
}

export const getUserLogin = <T>() => {
  return request<T>({
    url: '/user/current',
    method: 'get'
  })
}
