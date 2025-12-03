<template>
  <div class="home-page">
    <!-- 主体内容 -->
    <div class="main-content">
      <div class="bd">
        <div class="wrapper">
        <div class="left">
          <!-- 左侧：草图绘制区域 -->
          <div class="lleft">
            <div class="top">
              <h4>草图绘制</h4>
              <div class="sketch-area" @click="triggerFileInput">
                <div v-if="!sketchImage" class="upload-prompt">
                  <span class="iconfont icon-tupian"></span>
                  <p>点击上传草图或拖拽文件到此区域</p>
                </div>
                <img v-else :src="sketchImage" alt="草图" class="sketch-preview">
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="transparent-input" 
                  accept="image/*"
                  @change="handleFileUpload"
                >
              </div>
              <ul>
                <li><button @click="importSketch">导入草图</button></li>
                <li><button @click="saveSketch">保存草图</button></li>
              </ul>
            </div>
            <div class="buttom">
              <h4>图形描述</h4>
              <p>示例：直角三角形，直角边3cm×4cm，红色直角符号，地板标注"3cm"</p>
              <textarea 
                v-model="graphDescription" 
                placeholder="请输入图形细节描述..."
                @input="updateDescription"
              ></textarea>
            </div>
          </div>
          
          <!-- 中间：代码生成区域 -->
          <div class="lright">
            <div class="top">
              <ul>
                <li><a href="#" :class="{active: activeTab === 'tikz'}" @click.prevent="switchTab('tikz')">TikZ代码</a></li>
                <li><a href="#" :class="{active: activeTab === 'example'}" @click.prevent="switchTab('example')">示例图</a></li>
              </ul>
            </div>
            <div class="content">
              <h4>{{ activeTab === 'tikz' ? '生成的TikZ代码' : '示例图' }}</h4>
              <div class="tikz" v-if="activeTab === 'tikz'">
                <pre v-if="tikzCode">{{ tikzCode }}</pre>
                <div v-else class="empty-state">
                  <span class="iconfont icon-daima"></span>
                  <p>等待生成TikZ代码...</p>
                </div>
              </div>
              <div class="example-image" v-else>
                <div v-if="exampleImage" class="image-container">
                  <img :src="exampleImage" alt="示例图">
                </div>
                <div v-else class="empty-state">
                  <span class="iconfont icon-tupian"></span>
                  <p>暂无示例图</p>
                </div>
              </div>
            </div>
            <button @click="generateTikZ" :disabled="!graphDescription">
              {{ isGenerating ? '生成中...' : '生成TikZ代码与示例图' }}
            </button>
          </div>
        </div>
        
        <!-- 右侧：侧边栏 -->
        <div class="right">
          <div class="top">
            <div class="logo">logo</div>
            <h3>AI Sketch to TikZ</h3>
            <div class="content">智能手绘识别系统</div>
          </div>
          <div class="bottom">
            <ul>
              <li :class="{active: activeMenu === 'home'}">
                <router-link to="/">
                  <span class="iconfont icon-shouye"></span>
                  <i>首页</i>
                </router-link>
              </li>
              <li :class="{active: activeMenu === 'sketches'}">
                <router-link to="/sketches">
                  <span class="iconfont icon-shouye2"></span>
                  <i>我的草图</i>
                </router-link>
              </li>
              <li :class="{active: activeMenu === 'examples'}">
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
</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'HomePage',
  setup() {
    const route = useRoute()
    const fileInput = ref(null)
    
    // 响应式数据
    const sketchImage = ref(null)
    const graphDescription = ref('')
    const activeTab = ref('tikz')
    const activeMenu = ref('home')
    const tikzCode = ref('')
    const exampleImage = ref(null)
    const isGenerating = ref(false)
    
    // 模拟的 TikZ 代码示例
    const sampleTikZCode = `\\begin{tikzpicture}
    \\draw[->] (-1,0) -- (4,0) node[right] {$x$};
    \\draw[->] (0,-1) -- (0,4) node[above] {$y$};
    \\draw[scale=0.5,domain=-3:3,smooth,variable=\\x,blue] 
        plot ({\\x},{\\x*\\x});
    \\node at (2,3) {抛物线 $y=x^2$};
\\end{tikzpicture}`
    
    // 方法
    const triggerFileInput = () => {
      fileInput.value.click()
    }
    
    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          sketchImage.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }
    
    const importSketch = () => {
      triggerFileInput()
    }
    
    const saveSketch = () => {
      if (sketchImage.value) {
        alert('草图已保存')
        // 这里可以添加实际保存逻辑
      } else {
        alert('请先上传草图')
      }
    }
    
    const updateDescription = () => {
      // 可以在这里添加实时验证或提示
      console.log('图形描述更新:', graphDescription.value)
    }
    
    const switchTab = (tab) => {
      activeTab.value = tab
    }
    
    const generateTikZ = () => {
      if (!graphDescription.value.trim()) {
        alert('请输入图形描述')
        return
      }
      
      isGenerating.value = true
      
      // 模拟生成过程
      setTimeout(() => {
        tikzCode.value = sampleTikZCode
        exampleImage.value = 'https://via.placeholder.com/400x300/1f67ee/ffffff?text=TikZ+Example'
        activeTab.value = 'tikz'
        isGenerating.value = false
        alert('TikZ代码和示例图已生成成功！')
      }, 1500)
    }
    
    // 生命周期
    onMounted(() => {
      // 根据路由设置激活的菜单
      const path = route.path
      if (path.includes('sketches')) activeMenu.value = 'sketches'
      else if (path.includes('examples')) activeMenu.value = 'examples'
      else activeMenu.value = 'home'
    })
    
    return {
      fileInput,
      sketchImage,
      graphDescription,
      activeTab,
      activeMenu,
      tikzCode,
      exampleImage,
      isGenerating,
      triggerFileInput,
      handleFileUpload,
      importSketch,
      saveSketch,
      updateDescription,
      switchTab,
      generateTikZ
    }
  }
}
</script>

<style scoped>
/* 基础公共样式：清除默认样式 + 设置通用样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

body {
  font: 14px/1.5 "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  color: #333;
}

a {
  color: #333;
  text-decoration: none;
}

/* HomePage 特定样式 */
.header {
  height: 80px;
  background-color: #e7e7e7;
  box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.5);
}

.wrapper {
  display: flex;
  margin: 0 auto;
  max-width: 1600px;
  width: 100%;
  padding: 0 20px;
}

.header .wrapper {
  justify-content: space-between;
  align-items: center;
}

.header .logo {
  height: 80px;
  width: 400px;
  line-height: 80px;
  background: url(./logo1.png) no-repeat left center;
  background-size: 25%;
  padding-left: 100px;
}

.header .logo h2 {
  font-size: 20px;
  font-weight: 400;
  padding-top: 5px;
}

.header .user {
  display: flex;
  width: 200px;
  height: 60px;
  margin-right: 20px;
}

.header .user a {
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

.header .user a:hover {
  background-color: #e7e7e7;
}

.header .user .log {
  flex: 1;
  border-radius: 10px 0 0 10px;
  border-right: none;
}

.header .user .res {
  flex: 1;
  border-radius: 0px 10px 10px 0px;
}

.bd .left {
  width: 1400px;
  height: 700px;
  display: flex;
  background-color: #e2e2e2d2;
}

.bd .lleft {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.bd .lleft .top {
  flex: 2;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  border: #e2e2e2 solid 4px;
  display: flex;
  flex-direction: column;
}

.bd .lleft .top h4 {
  display: block;
  height: 100px;
  font-size: 22px;
  line-height: 100px;
  margin: 15px;
  margin-top: 5px;
  border-bottom: #e2e2e2 solid 1px;
}

.sketch-area {
  position: relative;
  width: 450px;
  height: 270px;
  margin: 0 auto;
  border: #e2e2e2 dashed 2px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f9f9f9;
}

.sketch-area:hover {
  border-color: #1f67ee;
  background-color: #f0f7ff;
}

.upload-prompt {
  text-align: center;
  color: #666;
}

.upload-prompt .iconfont {
  font-size: 48px;
  color: #c9bfbf;
  margin-bottom: 10px;
}

.sketch-preview {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.transparent-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.bd .lleft .top ul {
  display: flex;
  margin-top: auto;
  padding: 10px;
}

.bd .lleft .top li {
  flex: 1;
  margin: 10px;
}

.bd .lleft .top button {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #1f67ee;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.bd .lleft .top button:hover {
  background-color: #1557c8;
}

.bd .lleft .buttom {
  flex: 1;
  background-color: #fff;
  margin: 10px;
  margin-top: 0;
  border: #e2e2e2 solid 4px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.bd .lleft .buttom h4 {
  display: block;
  margin-top: 15px;
  margin-left: 15px;
  font-size: 22px;
}

.bd .lleft .buttom p {
  display: block;
  margin-top: 10px;
  margin-left: 15px;
  color: #666;
  font-size: 14px;
}

.bd .lleft .buttom textarea {
  display: block;
  margin: 15px;
  border: #e2e2e2 solid 2px;
  border-radius: 10px;
  width: calc(100% - 30px);
  height: 70px;
  outline: none;
  padding: 10px;
  font-size: 14px;
  resize: none;
  font-family: inherit;
}

.bd .lright {
  flex: 4;
  margin: 10px;
  display: flex;
  flex-direction: column;
}

.bd .lright .top {
  height: 40px;
  border-bottom: #e2e2e2 solid 2px;
}

.bd .lright .top ul {
  display: flex;
}

.bd .lright .top ul li a {
  display: block;
  width: 100px;
  text-align: center;
  line-height: 40px;
  border-radius: 10px 10px 0 0;
  font-size: 16px;
  background-color: #dbdbdb;
  color: #ada9a9;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.bd .lright .top ul li a:hover,
.bd .lright .top ul li a.active {
  background-color: #fff;
  border-bottom: #1f67ee solid 2px;
  border-left: #1f67ee solid 2px;
  color: #1f67ee;
}

.bd .lright .content {
  flex: 1;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.bd .lright .content h4 {
  display: block;
  padding: 15px;
  font-weight: 400;
  border-bottom: 1px solid #e2e2e2;
}

.bd .lright .content .tikz,
.bd .lright .content .example-image {
  flex: 1;
  margin: 15px;
  margin-top: 0;
  padding: 25px 10px;
  background-color: #010624;
  border-radius: 10px;
  overflow: auto;
  color: #fff;
}

.bd .lright .content .tikz pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #f8f8f2;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #e2e2e2;
}

.empty-state .iconfont {
  font-size: 48px;
  margin-bottom: 10px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
}

.bd .lright button {
  display: block;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: #1f67ee;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.bd .lright button:hover:not(:disabled) {
  background-color: #1557c8;
}

.bd .lright button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.bd .right {
  width: 200px;
  background-color: #1f67ee;
  display: flex;
  flex-direction: column;
}

.bd .right .top {
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
}

.bd .right .logo {
  height: 40px;
    width: 200px;
    font-size: 0;
    color: #fff;
    background: url(./logo1.png) no-repeat center center;
    background-size: 50%;
    margin-top: 10px;
    margin-bottom: 5px;
}

.bd .right h3 {
  color: #e7e7e7;
  text-align: center;
  font-weight: 400;
}

.bd .right .content {
  color: #e7e7e7;
  text-align: center;
  font-size: 10px;
}

.bd .right .bottom {
  flex: 1;
}

.bd .right .bottom ul {
  display: flex;
  flex-direction: column;
}

.bd .right .bottom li {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}

.bd .right .bottom li a {
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.bd .right .bottom li span {
  font-size: 18px;
  color: #e7e7e7;
  display: inline-block;
  margin-right: 15px;
}

.bd .right .bottom li i {
  font-style: normal;
  color: #e7e7e7;
  font-size: 16px;
}

.bd .right .bottom li.active,
.bd .right .bottom li:hover {
  background-color: #62aeec;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .wrapper {
    flex-direction: column;
  }
  
  .bd .left {
    flex-direction: column;
    height: auto;
  }
  
  .bd .right {
    width: 100%;
    height: auto;
  }
  
  .header .logo {
    min-width: auto;
    padding-left: 20px;
    background-size: 20%;
  }
}

@media (max-width: 768px) {
  .header .wrapper {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
  
  .header .logo {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    background-size: 15%;
    min-width: auto;
    width: 100%;
    justify-content: center;
  }
  
  .header .user {
    margin-top: 10px;
    margin-right: 0;
  }
  
  .sketch-area {
    width: 100%;
    max-width: 450px;
  }
}
</style>