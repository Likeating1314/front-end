<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">用户注册</h1>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            placeholder="请输入用户名"
            required
          />
          <div class="form-error" v-if="errors.username">{{ errors.username }}</div>
        </div>
        
        <div class="form-group">
          <label for="email">电子邮箱</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="请输入电子邮箱"
            required
          />
          <div class="form-error" v-if="errors.email">{{ errors.email }}</div>
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="请输入密码（至少6位）"
            required
            minlength="6"
          />
          <div class="form-error" v-if="errors.password">{{ errors.password }}</div>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            placeholder="请再次输入密码"
            required
          />
          <div class="form-error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
        </div>
        
        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.agreeTerms" required />
            <span>我已阅读并同意 <a href="#" class="terms-link">用户协议</a> 和 <a href="#" class="terms-link">隐私政策</a></span>
          </label>
        </div>
        
        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>
      
      <div class="auth-footer">
        <p>已有账户？ <router-link to="/login">立即登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store'

export default {
  name: 'RegisterPage',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const form = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    })
    
    const errors = ref({})
    const loading = ref(false)
    
    // 表单验证函数
    const validateForm = () => {
      errors.value = {}
      let isValid = true
      
      // 用户名验证
      if (!form.value.username.trim()) {
        errors.value.username = '用户名不能为空'
        isValid = false
      } else if (form.value.username.length < 3) {
        errors.value.username = '用户名至少3个字符'
        isValid = false
      } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(form.value.username)) {
        errors.value.username = '用户名只能包含字母、数字、中文和下划线'
        isValid = false
      }
      
      // 邮箱验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!form.value.email) {
        errors.value.email = '邮箱不能为空'
        isValid = false
      } else if (!emailRegex.test(form.value.email)) {
        errors.value.email = '邮箱格式不正确'
        isValid = false
      }
      
      // 密码验证
      if (!form.value.password) {
        errors.value.password = '密码不能为空'
        isValid = false
      } else if (form.value.password.length < 6) {
        errors.value.password = '密码至少6位'
        isValid = false
      }
      
      // 确认密码验证
      if (!form.value.confirmPassword) {
        errors.value.confirmPassword = '请确认密码'
        isValid = false
      } else if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = '两次输入的密码不一致'
        isValid = false
      }
      
      return isValid
    }
    
    const handleRegister = () => {
      // 清除之前的错误
      errors.value = {}
      
      // 验证表单
      if (!validateForm()) {
        return
      }
      
      // 检查是否同意条款
      if (!form.value.agreeTerms) {
        alert('请同意用户协议和隐私政策')
        return
      }
      
      loading.value = true
      
      // 模拟 API 调用
      setTimeout(() => {
        // 在实际应用中，这里应该调用后端API进行注册
        // 模拟注册成功
        authStore.login(form.value.username)
        alert('注册成功！已自动登录')
        
        // 跳转到首页
        router.push('/')
        loading.value = false
      }, 1500)
    }
    
    // 实时验证密码匹配
    const validatePasswordMatch = () => {
      if (form.value.password && form.value.confirmPassword) {
        if (form.value.password !== form.value.confirmPassword) {
          errors.value.confirmPassword = '两次输入的密码不一致'
        } else {
          delete errors.value.confirmPassword
        }
      }
    }
    
    // 监听密码变化
    const watchPassword = () => {
      if (form.value.password && form.value.confirmPassword) {
        validatePasswordMatch()
      }
    }
    
    return {
      form,
      errors,
      loading,
      handleRegister,
      watchPassword,
      validatePasswordMatch
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.auth-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
  position: relative;
  padding-bottom: 15px;
}

.auth-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #3498db, #2ecc71);
  border-radius: 2px;
}

.auth-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f9fafb;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-group input::placeholder {
  color: #a0aec0;
}

.form-error {
  color: #e74c3c;
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.form-error::before {
  content: '⚠';
  font-size: 14px;
}

.form-options {
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 3px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3498db;
}

.terms-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.terms-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

.btn {
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2980b9, #1c639b);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-block {
  display: block;
  width: 100%;
}

.auth-footer {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #edf2f7;
  color: #718096;
  font-size: 14px;
}

.auth-footer a {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.auth-footer a:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .auth-container {
    padding: 15px;
    min-height: calc(100vh - 120px);
  }
  
  .auth-card {
    padding: 25px;
    max-width: 100%;
  }
  
  .auth-title {
    font-size: 24px;
    margin-bottom: 25px;
  }
  
  .form-group input {
    padding: 12px 14px;
  }
  
  .btn {
    padding: 12px 16px;
  }
}

/* 添加一些输入状态的样式 */
.form-group input:valid {
  border-color: #2ecc71;
}

.form-group input:invalid:not(:placeholder-shown) {
  border-color: #e74c3c;
}

/* 密码强度指示器 */
.password-strength {
  margin-top: 8px;
  height: 4px;
  border-radius: 2px;
  background-color: #e1e5e9;
  overflow: hidden;
  position: relative;
}

.strength-meter {
  height: 100%;
  width: 0;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.strength-weak {
  width: 33%;
  background-color: #e74c3c;
}

.strength-medium {
  width: 66%;
  background-color: #f39c12;
}

.strength-strong {
  width: 100%;
  background-color: #2ecc71;
}

.strength-label {
  font-size: 12px;
  color: #718096;
  margin-top: 4px;
  text-align: right;
}
</style>