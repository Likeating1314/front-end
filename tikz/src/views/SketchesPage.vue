<template>
  <div class="sketches-page">
    <!-- 头部 -->
    <div class="header">
      <div class="wrapper">
        <div class="logo">
          <h2>我的草稿箱</h2>
        </div>
        <div class="user">
          <router-link to="/login" class="log">登录</router-link>
          <router-link to="/register" class="res">注册</router-link>
        </div>
      </div>
    </div>
    
    <!-- 主体内容 -->
    <div class="bd">
      <div class="wrapper">
        <div class="content-area">
          <div class="content-header">
            <h1>我的草图</h1>
            <div class="search-bar">
              <input type="text" placeholder="搜索草图..." v-model="searchQuery">
              <button class="search-btn">搜索</button>
            </div>
          </div>
          
          <div class="sketches-grid">
            <div class="sketch-card" v-for="(sketch, index) in filteredSketches" :key="index">
              <div class="sketch-preview">
                <div class="sketch-image">草图预览 {{ index + 1 }}</div>
                <div class="sketch-date">{{ sketch.date }}</div>
              </div>
              <div class="sketch-info">
                <h3>{{ sketch.title }}</h3>
                <p>{{ sketch.description }}</p>
                <div class="sketch-tags">
                  <span class="tag" v-for="(tag, tagIndex) in sketch.tags" :key="tagIndex">{{ tag }}</span>
                </div>
              </div>
              <div class="sketch-actions">
                <button class="btn-view" @click="viewSketch(sketch)">查看</button>
                <button class="btn-edit" @click="editSketch(sketch)">编辑</button>
                <button class="btn-delete" @click="deleteSketch(sketch)">删除</button>
              </div>
            </div>
          </div>
          
          <div class="empty-state" v-if="filteredSketches.length === 0">
            <span class="iconfont icon-wujieguo"></span>
            <p>暂无草图，快去首页创建吧！</p>
            <router-link to="/" class="btn-create">创建新草图</router-link>
          </div>
        </div>
        
        <!-- 右侧：侧边栏 -->
        <div class="right">
          <div class="top">
            <div class="logo">logo</div>
            <h3>我的草稿箱</h3>
            <div class="content">草图管理</div>
          </div>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-number">{{ sketches.length }}</span>
              <span class="stat-label">总草图数</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ completedSketches }}</span>
              <span class="stat-label">已完成</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ recentSketches }}</span>
              <span class="stat-label">最近7天</span>
            </div>
          </div>
          <div class="bottom">
            <ul>
              <li>
                <router-link to="/">
                  <span class="iconfont icon-shouye"></span>
                  <i>首页</i>
                </router-link>
              </li>
              <li class="active">
                <router-link to="/sketches">
                  <span class="iconfont icon-shouye2"></span>
                  <i>我的草图</i>
                </router-link>
              </li>
              <li>
                <router-link to="/examples">
                  <span class="iconfont icon-shouye1"></span>
                  <i>示例库</i>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'SketchesPage',
  setup() {
    // 模拟草图数据
    const sketches = ref([
      { id: 1, title: '直角三角形', description: '直角边3cm×4cm，红色直角符号', date: '2024-01-15', tags: ['几何', '三角形'], status: 'completed' },
      { id: 2, title: '圆形图表', description: '半径5cm，分四部分，不同颜色', date: '2024-01-14', tags: ['图表', '圆形'], status: 'completed' },
      { id: 3, title: '函数图像', description: 'y = sin(x)，0到2π', date: '2024-01-13', tags: ['函数', '图像'], status: 'in-progress' },
      { id: 4, title: '流程图', description: '简单决策流程图', date: '2024-01-12', tags: ['流程图'], status: 'in-progress' },
      { id: 5, title: '网络拓扑图', description: '简单的网络节点连接图', date: '2024-01-11', tags: ['网络', '拓扑'], status: 'completed' },
      { id: 6, title: '电路图', description: '简单电路示意图', date: '2024-01-10', tags: ['电路', '物理'], status: 'completed' }
    ])
    
    const searchQuery = ref('')
    
    // 计算属性
    const filteredSketches = computed(() => {
      if (!searchQuery.value.trim()) {
        return sketches.value
      }
      const query = searchQuery.value.toLowerCase()
      return sketches.value.filter(sketch => 
        sketch.title.toLowerCase().includes(query) ||
        sketch.description.toLowerCase().includes(query) ||
        sketch.tags.some(tag => tag.toLowerCase().includes(query))
      )
    })
    
    const completedSketches = computed(() => {
      return sketches.value.filter(sketch => sketch.status === 'completed').length
    })
    
    const recentSketches = computed(() => {
      // 模拟最近7天的草图数
      return sketches.value.filter((sketch, index) => index < 3).length
    })
    
    // 方法
    const viewSketch = (sketch) => {
      alert(`查看草图: ${sketch.title}`)
      // 这里可以添加实际查看逻辑
    }
    
    const editSketch = (sketch) => {
      alert(`编辑草图: ${sketch.title}`)
      // 这里可以添加实际编辑逻辑
    }
    
    const deleteSketch = (sketch) => {
      if (confirm(`确定要删除草图 "${sketch.title}" 吗？`)) {
        const index = sketches.value.findIndex(s => s.id === sketch.id)
        if (index !== -1) {
          sketches.value.splice(index, 1)
          alert('草图已删除')
        }
      }
    }
    
    return {
      sketches,
      searchQuery,
      filteredSketches,
      completedSketches,
      recentSketches,
      viewSketch,
      editSketch,
      deleteSketch
    }
  }
}
</script>

<style scoped>
/* 复用 HomePage 的基础样式 */
.sketches-page .header {
  height: 80px;
  background-color: #e7e7e7;
  box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.5);
}

.sketches-page .wrapper {
  display: flex;
  margin: 0 auto;
  max-width: 1600px;
  width: 100%;
  padding: 0 20px;
}

.sketches-page .header .wrapper {
  justify-content: space-between;
  align-items: center;
}

.sketches-page .header .logo {height: 80px;
  width: 400px;
  line-height: 80px;
  background: url(./logo1.png) no-repeat left center;
  background-size: 25%;
  padding-left: 100px;
}

.sketches-page .header .logo h2 {
  font-size: 20px;
  font-weight: 400;
  padding-top: 5px;
}

.sketches-page .header .user {
  display: flex;
  width: 200px;
  height: 60px;
  margin-right: 20px;
}

.sketches-page .header .user a {
  line-height: 20px;
  text-align: center;
  font-size: 16px;
  color: rgb(105, 105, 105);
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #fff;
  border: #c9bfbf solid 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.sketches-page .header .user a:hover {
  background-color: #e7e7e7;
}

.sketches-page .header .user .log {
  flex: 1;
  border-radius: 10px 0 0 10px;
  border-right: none;
}

.sketches-page .header .user .res {
  flex: 1;
  border-radius: 0px 10px 10px 0px;
}

.sketches-page .bd {
  background-color: #f5f5f5;
  min-height: calc(100vh - 80px);
}

.sketches-page .wrapper {
  display: flex;
}

.sketches-page .content-area {
  flex: 1;
  padding: 20px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.content-header h1 {
  color: #2c3e50;
  font-size: 28px;
}

.search-bar {
  display: flex;
  gap: 10px;
}

.search-bar input {
  padding: 10px 15px;
  border: 2px solid #e2e2e2;
  border-radius: 5px;
  width: 300px;
  font-size: 16px;
}

.search-bar input:focus {
  outline: none;
  border-color: #1f67ee;
}

.search-btn {
  padding: 10px 20px;
  background-color: #1f67ee;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
}

.search-btn:hover {
  background-color: #1557c8;
}

.sketches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.sketch-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.sketch-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.sketch-preview {
  height: 180px;
  background: linear-gradient(135deg, #f0f7ff, #e2e2e2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.sketch-image {
  font-size: 18px;
  color: #1f67ee;
  font-weight: 600;
}

.sketch-date {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255,255,255,0.9);
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  color: #666;
}

.sketch-info {
  padding: 20px;
}

.sketch-info h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 18px;
}

.sketch-info p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.sketch-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  background-color: #f0f7ff;
  color: #1f67ee;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.sketch-actions {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e2e2e2;
  display: flex;
  gap: 10px;
}

.btn-view, .btn-edit, .btn-delete {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}

.btn-view {
  background-color: #1f67ee;
  color: white;
}

.btn-view:hover {
  background-color: #1557c8;
}

.btn-edit {
  background-color: #1f67ee;
  color: white;
}

.btn-edit:hover {
  background-color: #1557c8;
}

.btn-delete {
  background-color: #1f67ee;
  color: white;
}

.btn-delete:hover {
  background-color: #1557c8;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.empty-state .iconfont {
  font-size: 60px;
  color: #e2e2e2;
  margin-bottom: 20px;
}

.empty-state p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.btn-create {
  display: inline-block;
  padding: 12px 30px;
  background-color: #1f67ee;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
}

.btn-create:hover {
  background-color: #1557c8;
}

/* 右侧边栏 */
.sketches-page .right {
  width: 200px;
  background-color: #1f67ee;
  display: flex;
  flex-direction: column;
}

.sketches-page .right .top {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sketches-page .right .logo {
  height: 40px;
    width: 200px;
    font-size: 0;
    color: #fff;
    background: url(./logo1.png) no-repeat center center;
    background-size: 50%;
    margin-top: 10px;
    margin-bottom: 5px;
}

.sketches-page .right h3 {
  color: #e7e7e7;
  text-align: center;
  font-weight: 400;
}

.sketches-page .right .content {
  color: #e7e7e7;
  text-align: center;
  font-size: 12px;
}

.stats {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stat-item {
  background-color: rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255,255,255,0.8);
}

.sketches-page .right .bottom {
  flex: 1;
}

.sketches-page .right .bottom ul {
  display: flex;
  flex-direction: column;
}

.sketches-page .right .bottom li {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.sketches-page .right .bottom li a {
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.sketches-page .right .bottom li span {
  font-size: 18px;
  color: #e7e7e7;
  display: inline-block;
  margin-right: 15px;
}

.sketches-page .right .bottom li i {
  font-style: normal;
  color: #e7e7e7;
  font-size: 16px;
}

.sketches-page .right .bottom li.active,
.sketches-page .right .bottom li:hover {
  background-color: #62aeec;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .sketches-page .wrapper {
    flex-direction: column;
  }
  
  .sketches-page .right {
    width: 100%;
    margin-top: 20px;
  }
  
  .stats {
    flex-direction: row;
    justify-content: space-around;
  }
}

@media (max-width: 768px) {
  .sketches-page .header .wrapper {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
  
  .sketches-page .header .logo {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    min-width: auto;
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .sketches-page .header .user {
    margin-top: 0;
    margin-right: 0;
  }
  
  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .search-bar {
    width: 100%;
  }
  
  .search-bar input {
    width: 100%;
  }
  
  .sketches-grid {
    grid-template-columns: 1fr;
  }
}
</style>