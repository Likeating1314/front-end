<template>
  <div class="examples-page">
    <!-- 主体内容 -->
    <div class="bd">
      <div class="wrapper">
        <div class="content-area">
          <div class="content-header">
            <h1>TikZ 示例库</h1>
            <div class="category-filter">
              <select v-model="selectedCategory">
                <option value="">所有分类</option>
                <option value="geometry">几何图形</option>
                <option value="chart">图表</option>
                <option value="diagram">图表/流程图</option>
                <option value="math">数学公式</option>
                <option value="circuit">电路图</option>
              </select>
              <select v-model="selectedDifficulty">
                <option value="">所有难度</option>
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>
          </div>
          
          <div class="examples-grid">
            <div class="example-card" v-for="(example, index) in filteredExamples" :key="index">
              <div class="example-preview">
                <div class="example-image">示例 {{ index + 1 }}</div>
                <div class="example-badge" :class="example.difficulty">
                  {{ getDifficultyLabel(example.difficulty) }}
                </div>
              </div>
              <div class="example-info">
                <h3>{{ example.title }}</h3>
                <p>{{ example.description }}</p>
                <div class="example-tags">
                  <span class="tag" v-for="(tag, tagIndex) in example.tags" :key="tagIndex">{{ tag }}</span>
                </div>
                <div class="example-stats">
                  <span class="stat">
                    <span class="iconfont icon-yanjing"></span> {{ example.views }} 次查看
                  </span>
                  <span class="stat">
                    <span class="iconfont icon-download"></span> {{ example.downloads }} 次下载
                  </span>
                </div>
              </div>
              <div class="example-actions">
                <button class="btn-preview" @click="previewExample(example)">预览</button>
                <button class="btn-use" @click="useExample(example)">使用此模板</button>
                <button class="btn-download" @click="downloadExample(example)">下载代码</button>
              </div>
            </div>
          </div>
          
          <div class="pagination" v-if="filteredExamples.length > 0">
            <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">上一页</button>
            <span class="page-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
          </div>
        </div>
        
        <!-- 右侧：侧边栏 -->
        <div class="right">
          <div class="top">
            <div class="logo">logo</div>
            <h3>TikZ 示例库</h3>
            <div class="content">模板与示例</div>
          </div>
          <div class="bottom">
            <ul>
              <li>
                <router-link to="/">
                  <span class="iconfont icon-shouye"></span>
                  <i>首页</i>
                </router-link>
              </li>
              <li>
                <router-link to="/sketches">
                  <span class="iconfont icon-shouye2"></span>
                  <i>我的草图</i>
                </router-link>
              </li>
              <li class="active">
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
  name: 'ExamplesPage',
  setup() {
    // 模拟示例数据
    const examples = ref([
      { id: 1, title: '直角三角形', description: '直角边3cm×4cm，红色直角符号', category: 'geometry', difficulty: 'easy', tags: ['几何', '三角形'], views: 125, downloads: 89 },
      { id: 2, title: '圆形饼图', description: '分四部分，不同颜色，带百分比标签', category: 'chart', difficulty: 'medium', tags: ['图表', '圆形'], views: 98, downloads: 67 },
      { id: 3, title: '正弦函数图像', description: 'y = sin(x)，0到2π，网格背景', category: 'math', difficulty: 'medium', tags: ['函数', '图像'], views: 156, downloads: 102 },
      { id: 4, title: '流程图', description: '简单决策流程图，带箭头和条件判断', category: 'diagram', difficulty: 'hard', tags: ['流程图', '决策'], views: 87, downloads: 45 },
      { id: 5, title: '网络拓扑图', description: '网络节点连接图，带标签和连接线', category: 'diagram', difficulty: 'hard', tags: ['网络', '拓扑'], views: 112, downloads: 78 },
      { id: 6, title: '电路图', description: '简单电路示意图，电阻、电容、电源', category: 'circuit', difficulty: 'hard', tags: ['电路', '物理'], views: 76, downloads: 54 },
      { id: 7, title: '矩形和正方形', description: '不同尺寸的矩形和正方形示例', category: 'geometry', difficulty: 'easy', tags: ['几何', '矩形'], views: 92, downloads: 65 },
      { id: 8, title: '条形图', description: '横向条形图，带数据标签', category: 'chart', difficulty: 'medium', tags: ['图表', '条形图'], views: 103, downloads: 71 },
      { id: 9, title: '三维坐标系', description: '三维坐标系，带坐标轴标签', category: 'math', difficulty: 'hard', tags: ['数学', '三维'], views: 65, downloads: 42 },
      { id: 10, title: '组织结构图', description: '公司组织结构图，层级关系', category: 'diagram', difficulty: 'medium', tags: ['组织', '结构图'], views: 88, downloads: 59 },
      { id: 11, title: '逻辑门电路', description: '与门、或门、非门逻辑电路', category: 'circuit', difficulty: 'hard', tags: ['电路', '逻辑'], views: 71, downloads: 48 },
      { id: 12, title: '椭圆和圆形', description: '椭圆和圆形组合图形', category: 'geometry', difficulty: 'medium', tags: ['几何', '椭圆'], views: 82, downloads: 56 }
    ])
    
    const selectedCategory = ref('')
    const selectedDifficulty = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 8
    
    // 分类数据
    const categories = ref([
      { id: 'geometry', name: '几何图形', icon: '◉', count: 3 },
      { id: 'chart', name: '图表', icon: '📊', count: 2 },
      { id: 'diagram', name: '图表/流程图', icon: '📈', count: 3 },
      { id: 'math', name: '数学公式', icon: '∑', count: 2 },
      { id: 'circuit', name: '电路图', icon: '⚡', count: 2 }
    ])
    
    // 计算属性
    const filteredExamples = computed(() => {
      let filtered = examples.value
      
      if (selectedCategory.value) {
        filtered = filtered.filter(example => example.category === selectedCategory.value)
      }
      
      if (selectedDifficulty.value) {
        filtered = filtered.filter(example => example.difficulty === selectedDifficulty.value)
      }
      
      // 分页
      const startIndex = (currentPage.value - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return filtered.slice(startIndex, endIndex)
    })
    
    const totalPages = computed(() => {
      let filtered = examples.value
      
      if (selectedCategory.value) {
        filtered = filtered.filter(example => example.category === selectedCategory.value)
      }
      
      if (selectedDifficulty.value) {
        filtered = filtered.filter(example => example.difficulty === selectedDifficulty.value)
      }
      
      return Math.ceil(filtered.length / itemsPerPage)
    })
    
    // 方法
    const getDifficultyLabel = (difficulty) => {
      switch(difficulty) {
        case 'easy': return '简单'
        case 'medium': return '中等'
        case 'hard': return '困难'
        default: return '未知'
      }
    }
    
    const selectCategory = (categoryId) => {
      selectedCategory.value = categoryId === selectedCategory.value ? '' : categoryId
      currentPage.value = 1
    }
    
    const previewExample = (example) => {
      alert(`预览示例: ${example.title}`)
      // 这里可以添加实际预览逻辑
    }
    
    const useExample = (example) => {
      alert(`使用示例模板: ${example.title}\n将跳转到编辑页面...`)
      // 这里可以添加实际使用模板逻辑
    }
    
    const downloadExample = (example) => {
      alert(`下载示例代码: ${example.title}`)
      // 这里可以添加实际下载逻辑
    }
    
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }
    
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }
    
    return {
      examples,
      selectedCategory,
      selectedDifficulty,
      currentPage,
      filteredExamples,
      totalPages,
      categories,
      getDifficultyLabel,
      selectCategory,
      previewExample,
      useExample,
      downloadExample,
      prevPage,
      nextPage
    }
  }
}
</script>

<style scoped>
/* 复用 HomePage 的基础样式 */
.examples-page {
  margin-top: -60px;
  padding-top: 60px;
}

.examples-page .bd {
  margin-top: 0;
  padding-top: 0;
  min-height: calc(100vh - 60px);
}

.examples-page .header {
  height: 80px;
  background-color: #e7e7e7;
  box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.5);
}

.examples-page .wrapper {
  display: flex;
  margin: 0 auto;
  max-width: 1600px;
  width: 100%;
  padding: 0 20px;
}

.examples-page .header .wrapper {
  justify-content: space-between;
  align-items: center;
}

.examples-page .header .logo {
  height: 80px;
  width: 400px;
  line-height: 80px;
  background: url(./logo1.png) no-repeat left center;
  background-size: 25%;
  padding-left: 100px;
}

.examples-page .header .logo h2 {
  font-size: 20px;
  font-weight: 400;
  padding-top: 5px;
}

.examples-page .header .user {
  display: flex;
  width: 200px;
  height: 60px;
  margin-right: 20px;
}

.examples-page .header .user a {
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

.examples-page .header .user a:hover {
  background-color: #e7e7e7;
}

.examples-page .header .user .log {
  flex: 1;
  border-radius: 10px 0 0 10px;
  border-right: none;
}

.examples-page .header .user .res {
  flex: 1;
  border-radius: 0px 10px 10px 0px;
}

.examples-page .bd {
  background-color: #f5f5f5;
  min-height: calc(100vh - 80px);
}

.examples-page .wrapper {
  display: flex;
}

.examples-page .content-area {
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

.category-filter {
  display: flex;
  gap: 15px;
}

.category-filter select {
  padding: 10px 15px;
  border: 2px solid #e2e2e2;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  min-width: 150px;
}

.category-filter select:focus {
  outline: none;
  border-color: #1f67ee;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.example-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.example-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.example-preview {
  height: 150px;
  background: linear-gradient(135deg, #f0f7ff, #e2e2e2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.example-image {
  font-size: 20px;
  color: #1f67ee;
  font-weight: 600;
}

.example-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.example-badge.easy {
  background-color: #2ecc71;
}

.example-badge.medium {
  background-color: #f39c12;
}

.example-badge.hard {
  background-color: #e74c3c;
}

.example-info {
  padding: 15px;
}

.example-info h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 18px;
}

.example-info p {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
  min-height: 42px;
}

.example-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.tag {
  background-color: #f0f7ff;
  color: #1f67ee;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.example-stats {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 11px;
  margin-bottom: 8px;
}

.example-stats .stat {
  display: flex;
  align-items: center;
  gap: 3px;
}

.example-actions {
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-top: 1px solid #e2e2e2;
  display: flex;
  gap: 4px;
}

.btn-preview, .btn-use, .btn-download {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
}

.btn-preview {
  background-color: #3498db;
  color: white;
}

.btn-preview:hover {
  background-color: #2980b9;
}

.btn-use {
  background-color: #3498db;
  color: white;
}

.btn-use:hover {
  background-color: #2980b9;
}

.btn-download {
  background-color: #3498db;
  color: white;
}

.btn-download:hover {
  background-color: #2980b9;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.page-btn {
  padding: 10px 20px;
  background-color: #1f67ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.page-btn:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.page-info {
  font-size: 16px;
  color: #666;
}

/* 右侧边栏 */
.examples-page .right {
  width: 200px;
  background-color: #1f67ee;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.examples-page .right .top {
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  background-color: #1557c8;
}

.examples-page .right .logo {
  height: 40px;
    width: 200px;
    font-size: 0;
    color: #fff;
    background: url(./logo1.png) no-repeat center center;
    background-size: 50%;
    margin-top: 15px;
    margin-bottom: 15px;
}

.examples-page .right h3 {
  color: #e7e7e7;
  text-align: center;
  font-weight: 400;
  margin-bottom: 5px;
}

.examples-page .right .content {
  color: #e7e7e7;
  text-align: center;
  font-size: 12px;
}

.examples-page .right .bottom {
  flex: 1;
}

.categories {
  padding: 20px;
}

.categories h4 {
  color: white;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
}

.categories ul {
  list-style: none;
}

.categories li {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.categories li:hover, .categories li.active {
  background-color: rgba(255,255,255,0.15);
}

.category-icon {
  font-size: 18px;
  margin-right: 10px;
  color: white;
}

.category-name {
  flex: 1;
  color: white;
  font-size: 14px;
}

.category-count {
  background-color: rgba(255,255,255,0.2);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.examples-page .right .bottom {
  /* 移除了 margin-top: auto，防止导航栏被推到最下面 */
}

.examples-page .right .bottom ul {
  display: flex;
  flex-direction: column;
}

.examples-page .right .bottom li {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.examples-page .right .bottom li a {
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.examples-page .right .bottom li span {
  font-size: 18px;
  color: #e7e7e7;
  display: inline-block;
  margin-right: 15px;
}

.examples-page .right .bottom li i {
  font-style: normal;
  color: #e7e7e7;
  font-size: 16px;
}

.examples-page .right .bottom li.active,
.examples-page .right .bottom li:hover {
  background-color: #62aeec;
}

.examples-page .right .bottom li {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.examples-page .right .bottom li a {
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.examples-page .right .bottom li span {
  font-size: 18px;
  color: #e7e7e7;
  display: inline-block;
  margin-right: 15px;
}

.examples-page .right .bottom li i {
  font-style: normal;
  color: #e7e7e7;
  font-size: 16px;
}

.examples-page .right .bottom li.active,
.examples-page .right .bottom li:hover {
  background-color: #62aeec;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .examples-page .wrapper {
    flex-direction: column;
  }
  
  .examples-page .right {
    width: 100%;
    margin-top: 20px;
  }
  
  .categories ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .categories li {
    flex: 1;
    min-width: 150px;
  }
}

@media (max-width: 768px) {
  .examples-page .header .wrapper {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
  
  .examples-page .header .logo {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    min-width: auto;
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .examples-page .header .user {
    margin-top: 0;
    margin-right: 0;
  }
  
  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .category-filter {
    width: 100%;
    flex-direction: column;
  }
  
  .category-filter select {
    width: 100%;
  }
  
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-direction: column;
    gap: 10px;
  }
}
</style>