import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Message from '@/components/Message/createMessage'
import store from '../../store/index'

export interface ResponseData<T = any> {
  code: number;
  data: T;
  message?: string;
  error?: string;
}

const icode = '29C8A1608873A09C'

const axiosRequest = axios.create({
  baseURL: 'http://apis.imooc.com/api',
  timeout: 1000
})

// request interceptors
axiosRequest.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.params = {
        icode,
        ...config.params
      }
    }
    if (config.data instanceof FormData) {
      config.data.append('icode', icode)
    } else {
      config.data = { ...config.data, icode }
    }
    if (store.state.user.token) {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptors
axiosRequest.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 成功处理
    return Promise.resolve(response)
  },
  (error: AxiosError<ResponseData>) => {
    const status = error.response?.status
    const errorMessage = error.response?.data.error || '未知错误'
    const message = error.message
    if (message === 'Network Error') {
      console.log('发送请求时网络错误')
    } else if (message.indexOf('timeout') !== -1) {
      console.log('超时处理')
    }
    switch (status) {
      case 401:
        console.log('需要重新登陆', errorMessage)
        break
      case 403:
        console.log('需要重新登陆', errorMessage)
        break
      default:
        // 仅仅提示用户
        Message(errorMessage, 'danger', 2000)
        break
    }
    return Promise.reject(error)
  }
)

// 为了拿到合理的类型推断
export function request<T> (config: AxiosRequestConfig): Promise<T> {
  return axiosRequest
    .request<ResponseData<T>>(config)
    .then(res => {
      return res.data.data
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

export default request
