import axios from 'axios'
import { Message } from 'element-ui'
import { Base64 } from 'js-base64'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.FSS_API,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    // 'TN-REQ-DATA-TYPE': 'json/text'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = {
      ...config.data
      // userId: store.state.user.workNum,
      // userName: store.state.user.name,
    }
  } else {
    config.params = {
      // ...config.params,
      // userId: store.state.user.workNum,
      // userName: store.state.user.name,
    }
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = eval('(' + Base64.decode(response.data) + ')')
    if (!res.success) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

