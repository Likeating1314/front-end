<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- 品牌标识 -->
      <router-link to="/" class="nav-brand">
        <span class="brand-text">AI Sketch to <span class="brand-highlight">TikZify</span></span>
      </router-link>
      
      <!-- 导航链接 -->
      <div class="nav-menu">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link">登录</router-link>
        <router-link v-if="!isLoggedIn" to="/register" class="nav-link">注册</router-link>
        <a v-if="isLoggedIn" href="#" @click.prevent="logout" class="nav-link">退出登录</a>
        <span v-if="isLoggedIn" class="nav-user">欢迎，{{ username }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store'

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const isLoggedIn = computed(() => !!authStore.isLoggedIn)
    const username = computed(() => authStore.username || '')
    
    const logout = () => {
      if (confirm('确定要退出登录吗？')) {
        authStore.logout()
        router.push('/login')
      }
    }
    
    return {
      isLoggedIn,
      username,
      logout
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.brand-text {
  color: white;
}

.brand-highlight {
  color: #3498db;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.1);
}

.router-link-active {
  background-color: rgba(255,255,255,0.1);
}

.nav-user {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: rgba(52, 152, 219, 0.2);
  border-radius: 4px;
}
</style>