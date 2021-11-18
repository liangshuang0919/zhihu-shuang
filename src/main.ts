import { createApp } from 'vue' // 导入创建 vue 实例的方法
import router from './router' // 导入 vue-router 资源
import App from './App.vue' // 导入主页面

const app = createApp(App) // 创建 vue 实例

app.use(router) // app 实例挂载 vue-router

app.mount('#app') // 页面挂载 vue 的 app 实例
