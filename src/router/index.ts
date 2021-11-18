// 导入 vue-router 方法和 history 模式的方法
import { createRouter, createWebHashHistory } from 'vue-router'

// 创建 history 模式实例
const routerHistory = createWebHashHistory()

// 创建 vue-router 要加载的组件
const Home = () => import('@/views/Home/Home.vue') // 首页页面
const Login = () => import('@/views/Login/Login.vue') // 登录页页面
const ColumnDetails = () => import('@/views/ColumnDetails/ColumnDetails.vue') // 专栏详情页页面

// 创建 vue-router 实例
const router = createRouter({
  history: routerHistory,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/column_details/:id',
    name: 'column_details',
    component: ColumnDetails
  }]
})

export default router
