import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ResponseData<T = any> {
  code: number;
  data: T;
  message?: string;
  error?: string;
}

const icode = '29C8A1608873A09C'

const axiosRequest = axios.create({
  baseURL: 'http://apis.imooc.com/api'
})

// request interceptors
axiosRequest.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = {
      icode,
      ...config.params
    }
  }
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    config.data = { ...config.data }
  }
  return config
})

// response interceptors
axiosRequest.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 成功处理
    return Promise.resolve(response)
  },
  error => {
    // 错误处理
    console.log(error, 'error')
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
      return e
    })
}

export default request
