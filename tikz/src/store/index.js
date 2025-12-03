import { createPinia } from 'pinia'
import { defineStore } from 'pinia'

// 导出 Pinia 实例
const pinia = createPinia()

// 定义 auth store
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null')
  }),
  actions: {
    login(username) {
      this.isLoggedIn = true
      this.currentUser = { username }
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('currentUser', JSON.stringify({ username }))
    },
    logout() {
      this.isLoggedIn = false
      this.currentUser = null
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('currentUser')
    }
  },
  getters: {
    username: (state) => state.currentUser?.username || ''
  }
})

// 导出默认 Pinia 实例
export default pinia