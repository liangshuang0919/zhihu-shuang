// 导入 vue-router 方法和 history 模式的方法
import { createRouter, createWebHashHistory } from 'vue-router'

// 导入 vuex 中的数据，这里为了获取一个用户登录的状态
import store from '../store'

// 创建 history 模式实例
const routerHistory = createWebHashHistory()

// 创建 vue-router 要加载的组件
const Home = () => import('@/views/Home/Home.vue') // 首页页面
const Login = () => import('@/views/Login/Login.vue') // 登录页页面
const ColumnDetails = () => import('@/views/ColumnDetails/ColumnDetails.vue') // 专栏详情页页面
const CreatePost = () => import('@/views/CreatePost/CreatePost.vue') // 编辑文章页面

// 创建 vue-router 实例
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // 元信息
      meta: {
        title: 'Shuang-Home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      // 元信息
      meta: {
        redirectAlreadyLogin: true, // 用户已经登录
        title: 'Shuang-Login'
      }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetails,
      // 元信息
      meta: {
        title: 'Shuang-ColumnDetails'
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      // 元信息
      meta: {
        requiredLogin: true // 只有登录了的用户才能创建帖子
      }
    }]
})

// 设置路由守卫
// beforeEach 方法是全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    // 如果当前页面不是 login 页面，并且用户没有登陆的话，就需要跳转到登录页面
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    // 当用户已经登录了，跳到首页页面
    next('/')
  } else {
    next()
  }
})

export default router
