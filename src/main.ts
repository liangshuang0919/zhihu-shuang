import { createApp } from 'vue' // 导入创建 vue 实例的方法
import router from './router' // 导入 vue-router 资源
import store from './store' // 导入 vuex
import axios from 'axios'

import App from './App.vue' // 导入主页面

const app = createApp(App) // 创建 vue 实例

// 配置上默认的接口地址
axios.defaults.baseURL = 'http://apis.imooc.com/api/'

// 设置请求拦截器
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'A5100D297F9752AE' }
  return config
})

axios.get('/columns', { params: { currentPage: 1, pageSize: 5 } }).then(res => {
  console.log(res)
})

app.use(router) // app 实例挂载 vue-router
app.use(store) // app 实例挂载 vuex
app.mount('#app') // 页面挂载 vue 的 app 实例
