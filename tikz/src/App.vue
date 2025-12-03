<template>
  <div id="app">
    <!-- 导航栏组件 -->
    <!-- <NavBar v-if="showNav" /> -->
    
    <!-- 路由视图 -->
    <router-view />
    
    <!-- 页脚 -->
    <footer class="app-footer" v-if="showNav">
      <p>&copy; 2024 4G Switch to Tick 系统</p>
    </footer>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const route = useRoute()
    
    // 在登录/注册页面不显示导航栏
    const showNav = computed(() => {
      return !['Login', 'Register'].includes(route.name)
    })
    
    return {
      showNav
    }
  }
}
</script>

<style>
/* 全局样式 */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-footer {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  margin-top: auto;
}
</style>