import request from '../config/request'

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

// 获取单个专栏
export function getPosts<T> (cid: string) {
  return request<T>({
    url: `/columns/${cid}/posts`,
    method: 'get'
  })
}
