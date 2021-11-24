import { createApp } from 'vue' // 导入创建 vue 实例的方法
import router from './router' // 导入 vue-router 资源
import store from './store' // 导入 vuex
import axios from 'axios'

import App from './App.vue' // 导入主页面

const app = createApp(App) // 创建 vue 实例

// 配置上默认的接口地址
axios.defaults.baseURL = 'http://apis.imooc.com/api/'

// 设置请求拦截器
axios.interceptors.request.use((config) => {
  // 请求时，判断请求是否完成，渲染 loading 组件
  store.commit('setLoading', true)

  // 这一个地方，是用来解决一个小 bug
  // 当第一次登陆失败的时候，会弹出提示框，再次点击登录的时候，因为 error 的 status 一直为 true。所以在每一次点击登陆的时候，在请求拦截这里将 error 的 status 置为  false
  store.commit('setError', { status: false, message: '' })

  // 判断请求是 get 请求还是 post 请求
  if (config.method === 'get') {
    config.params = { ...config.params, icode: 'A5100D297F9752AE' }
  } else if (config.method === 'post') {
    config.data = { ...config.data, icode: 'A5100D297F9752AE' }
  }

  return config
})

// 设置响应拦截
axios.interceptors.response.use(
  (config) => {
    // 请求时，判断请求是否完成，隐藏 loading 组件
    store.commit('setLoading', false)

    return config
  },
  (err) => {
    // 当用户登录失败时，拦截到的错误信息
    const { error } = err.response.data

    // 用 vuex 对错误信息进行处理
    store.commit('setError', { status: true, message: error })

    // 登录失败的时候，要把 loading 加载组件去掉
    store.commit('setLoading', false)

    // github 上 axios 的官网文档这么要求的，要返回一个 Promise 错误信息
    return Promise.reject(error)
  }
)

app.use(router) // app 实例挂载 vue-router
app.use(store) // app 实例挂载 vuex
app.mount('#app') // 页面挂载 vue 的 app 实例
