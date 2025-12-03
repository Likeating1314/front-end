import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// 导入全局样式
import './styles/main.css'
import './styles/components.css'

// 创建 Vue 应用
const app = createApp(App)

// 使用路由和状态管理
app.use(router)
app.use(pinia)

// 挂载应用
app.mount('#app')