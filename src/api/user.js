import request from '../utils/request'
import router from '@/router'
import { useUserStore } from '@/stores'

export const userRegisterService = ({ username, password }) => {
  request.post('/api/reguser', {
    username,
    password
  })
}
export const userLoginService = ({ username, password }) => {
  // 使用 request 库的 post 方法向 '/api/login' 接口发送 POST 请求
  // 请求体中包含用户名和密码
  request
    .post('/api/login', {
      username,
      password
    })
    .then((res) => {
      console.log(res)
      useUserStore().setToken(res.data.token)
      router.push('/')
    })
}
export const userGetInfoService = () => {
  request.get('/my/userinfo').then((res) => {
    useUserStore().setUserInfo(res.data.data)
  })
}
