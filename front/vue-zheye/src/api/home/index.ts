import request from '../config/request'
import { CreatePostParams } from './interface'

// 获取所有专栏
export function getColumns<T> () {
  return request<T>({
    url: '/columns',
    method: 'get'
  })
}

// 获取单个专栏
export function getColumn<T> (cid: string) {
  return request<T>({
    url: `/columns/${cid}`,
    method: 'get'
  })
}

export const getPosts = <T>(cid: string) => {
  return request<T>({
    url: `/columns/${cid}/posts`,
    method: 'get'
  })
}

// 创建文章 /api/posts
export const createPost = <T>(data: CreatePostParams) => {
  return request<T>({
    url: '/posts',
    method: 'post',
    data
  })
}
