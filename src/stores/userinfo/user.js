import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ' '
    }
    const user = ref({})
    const getUserInfo = async () => {
      await userGetInfoService()
    }
    const setUserInfo = (userInfo) => {
      user.value = userInfo
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUserInfo,
      setUserInfo
    }
  },
  {
    persist: true
  }
)
