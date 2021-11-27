// 导入 vue-router 方法和 history 模式的方法
import { createRouter, createWebHashHistory } from 'vue-router'

// 导入 vuex 中的数据，这里为了获取一个用户登录的状态
import store from '../store'

// 导入 axios 模块
import axios from 'axios'

// 创建 history 模式实例
const routerHistory = createWebHashHistory()

// 创建 vue-router 要加载的组件
const Home = () => import('@/views/Home/Home.vue') // 首页页面
const Login = () => import('@/views/Login/Login.vue') // 登录页页面
const Register = () => import('@/views/Register/Register.vue') // 登录页页面
const PostDetail = () => import('@/views/PostDetail/PostDetail.vue') // 文章详情页页面
const ColumnDetails = () => import('@/views/ColumnDetails/ColumnDetails.vue') // 专栏详情页页面
const CreatePost = () => import('@/views/CreatePost/CreatePost.vue') // 创建文章页面

// 创建 vue-router 实例
const router = createRouter({
  history: routerHistory,
  routes: [
    // 首页页面路由
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Shuang-首页'
      }
    },
    // 登录页面路由
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectAlreadyLogin: true, // 用户已经登录
        title: 'Shuang-登录'
      }
    },
    // 注册页面路由
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Shuang-注册'
      }
    },
    // 文章详情路由
    {
      path: '/post/:id',
      name: 'post-detail',
      component: PostDetail,
      meta: {
        title: 'Shuang-专栏详情'
      }
    },
    // 专栏详情路由
    {
      path: '/column/:id',
      name: 'column-details',
      component: ColumnDetails,
      meta: {
        title: 'Shuang-专栏详情'
      }
    },
    // 新建文章路由
    {
      path: '/createpost',
      name: 'createpost',
      component: CreatePost,
      meta: {
        title: 'Shuang-创建文章',
        requiredLogin: true // 只有登录了的用户才能创建帖子
      }
    }
  ]
})

// 设置路由守卫
// beforeEach 方法是全局前置守卫
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta

  if (to.meta.title) {
    document.title = to.meta.title + ''
  } else {
    document.title = 'Shuang-zhihu'
  }

  // 1、判断用户是否登录
  if (!user.isLogin) {
    if (token) {
      // 3、已经存在 token 的时候，那么给 axios 设置统一的请求头，加上 token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      // 发送获取用户信息的请求
      store
        .dispatch('fetchCurrentUser')
        .then(() => {
          if (redirectAlreadyLogin) {
            // 发送请求成功的话，那么当前页面设置了路由权限的话，跳转到首页
            next('/')
          } else {
            // 发送请求成功的话，那么当前页面没有设置路由权限的话，继续执行
            next()
          }
        })
        .catch((err) => {
          // 如果发送请求失败的话，说明 token 已经失效的，那么执行退出事件，然后跳转到登录页重新登陆
          console.error(err)
          store.commit('logout')
          next('login')
        })
    } else {
      // 4、用户没有 token 的话，那么判断要访问的页面是否设置了路由权限
      if (requiredLogin) {
        // 4.1 要访问的页面设置了路由权限，那么跳转到登录页面
        next('login')
      } else {
        // 4.2 要访问的页面没有设置路由权限，那么继续执行
        next()
      }
    }
  } else {
    // 2、用户已经登陆判断是否设置了路由权限
    if (redirectAlreadyLogin) {
      // 2.1 如果设置了路由权限，那么则跳转到首页
      next('/')
    } else {
      // 2.2 如果没有设置路由权限，那么继续执行
      next()
    }
  }
})

export default router
