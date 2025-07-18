import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3007',
  timeout: 1000
})
// 请求拦截器
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数
    if (response.data.status === 0) {
      return response
    }
    // 对响应数据做点什么
    ElMessage.error(response.data.msg || '服务异常')
    return Promise.reject(response.data)
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    //权限不足或token过期
    if (error.response?.status === 401) {
      router.push('/login')
    }
    ElMessage.error(error.response.data.msg || '服务异常')
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default instance
