// 导入创建 vuex 的 createStore
// 导入 vuex 中的 Commit 类型
import { createStore, Commit } from 'vuex'

// 导入 axios 网络封装模块
import axios, { AxiosRequestConfig } from 'axios'

// 导入 helper 中的自己封装的功能函数
import { arrToObj, objToArr } from '../hooks/helper'

// 导入 testData 中两个数据
// testColumn 是首页专栏列表的数据
// testPosts 是专栏详情页的列表数据
// import { testColumn, testPosts } from '../data/testData'

// 图片的数据接口
export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}

// 定义的全局用户的信息接口
export interface UserProps {
  _id?: string // 用户的 ID
  isLogin: boolean // 用户的登录状态
  nickName?: string // 用户名
  column?: number | string // 要新建文章的专栏的 id
  email?: string // 用户的登录邮箱
  avatar?: ImageProps
}

// 定义的首页专栏列表的数据接口
export interface ColumnProps {
  _id: string // 专栏的标识符
  title: string // 专栏的标题
  avatar?: ImageProps // 专栏的图片
  description: string // 转浏览的描述
}

// 定义的专栏详情页的数据接口
export interface PostProps {
  _id?: string // 文章的标识符
  title: string // 文章的标题
  excerpt?: string // 文章的摘要
  content?: string // 文章的内容
  image?: ImageProps // 文章的图片
  column?: string | number // 将专栏详情页的数据与首页的专栏区域的内容，一一对应起来
  createdAt?: string // 文章的时间
  author?: string | UserProps // 创建文章的用户 id
  isHTML?: boolean
}

// 全局的错误状态接口
export interface GlobalErrorProps {
  status: boolean // 错误状态
  message?: string // 错误信息
}

// 定义上传文件的一个返回的数据类型接口
export interface FileProps<P = {}> {
  code: number
  message: string // 服务器传递过来的信息
  data: P // 定义一个泛型
}

// 定义响应类型的接口
export interface ResponseType<P = {}> {
  code: number
  msg: string
  data: P
}

// 定义一个类型，为了将 columns 和 posts 整合成一个类型
interface ListProps<P> {
  [id: string]: P
}

// 定义存储所有全局信息的接口
export interface GlobalDataProps {
  user: UserProps // 用户信息
  token: string // 用户登录时，获取到的 token 令牌
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number } // 首页专栏列表数据展示的数据
  posts: { data: ListProps<PostProps>; loadedColumns: string[] } // 专栏详情页文章展示列表的数据类型
  loading: boolean // 全局的一个数据请求的时候，一个等待的状态
  error: GlobalErrorProps // 错误信息
}

// 封装 get 请求，使用 async + await 进行异步处理请求的函数
// 参数一：是进行请求的 url 地址；类型是 string 类型
// 参数二：是要进行数据处理的 mutations 方法；类型是 string 类型
// 参数三：是 commit 方法；类型是 Commit 类型，需要从 vuex 中导入
// const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
//   const { data } = await axios.get(url)
//   commit(mutationName, data)
//   return data
// }

// 封装 post 请求使用 async + await 进行异步处理请求的函数
// 参数一：是进行请求的 url 地址；类型是 string 类型
// 参数二：是要进行数据处理的 mutations 方法；类型是 string 类型
// 参数三：是 commit 方法；类型是 Commit 类型，需要从 vuex 中导入
// 参数四：是 post 请求需要传递的参数
// const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: string) => {
//   const { data } = await axios.post(url, payload)
//   commit(mutationName, data)
//   return data
// }

// 封装一个可以处理多种请求的函数，既可以处理 GET、POST、PATCH 等等
// 参数一：是进行请求的 url 地址；类型是 string 类型
// 参数二：是要进行数据处理的 mutations 方法；类型是 string 类型
// 参数三：是 commit 方法；类型是 Commit 类型，需要从 vuex 中导入
// 参数四：config 就是 axios 要进行发送数据的请求配置，这个需要在 axios 中导入，默认是 GET 请求
// 参数五：extraData 是一个可以额外传递的参数，可选的
const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: 'GET' },
  extraData?: any
) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}

// 创建 vuex 状态管理的数据，规定的是自定义的全局数据的一个接口类型
const store = createStore<GlobalDataProps>({
  state: {
    user: {
      isLogin: false // 用户登录状态信息
    },
    token: localStorage.getItem('token') || '', // 用户登录时的 token 令牌，没有的时候设为空
    columns: { data: {}, currentPage: 0, total: 0 }, // 首页专栏列表数据
    posts: { data: {}, loadedColumns: [] }, // 专栏详情页列表数据
    loading: true, // 全局的一个数据请求的时候，一个等待的状态
    error: {
      status: false // 错误状态
    }
  },
  // mutations 中有一些 rawData，表示的是通过 actions 异步请求获取到的原始数据
  mutations: {
    // 登录时，修改登录信息
    // login(state) {
    //   state.user = { ...state.user, isLogin: true, userName: 'liangshuang' }
    // },
    // 处理从后端获取的首页指定的一个专栏的数据
    // 第二个参数 rawData 是后端传递过来的数据
    fetchColumn(state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    // 处理从后端获取的首页专栏列表的数据
    fetchColumns(state, rawData) {
      const { data } = state.columns
      // list 是后端返回的获取的具体某一页某几条专栏的数据对象
      // count 是后端返回的首页专栏总数
      const { list, count, currentPage } = rawData.data

      state.columns = {
        // 将原本的数据和新获取到的数据拼接在一起，并不是覆盖掉
        data: { ...data, ...arrToObj(list) },
        total: count, // 动态获取后端的总数据数
        currentPage: currentPage * 1 // 把当前请求的标识符置为 true，不在重复发送请求
      }
    },
    // 处理从后端获取的当前文章的详情数据
    fetchPost(state, rawData) {
      state.posts.data[rawData.data._id] = rawData.data
    },
    // 处理从后端获取的专栏详情页的数据
    fetchPosts(state, { data: rawData, extraData: columnId }) {
      // { ...state.posts.data, ...arrToObj(rawData.data.list) }
      // 上面这种展开的操作，是为了将之前缓存的数据和后面新请求的数据进行一个拼接
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
      // 修改已经有的数组
      state.posts.loadedColumns.push(columnId)
    },
    // 使用同步方法更新文章的内容
    updatePost(state, { data }) {
      // 直接将原本的数据覆盖掉即可
      state.posts.data[data._id] = data
    },
    // 使用同步方法删除文章
    deletePost(state, { data }) {
      // 直接删除这个对应 id 的对象中的数据即可
      delete state.posts.data[data._id]
    },
    // 页面请求数据的时候，对等待状态 loading 进行修改
    setLoading(state, status) {
      state.loading = status
    },
    // 设置全局错误信息的方法
    setError(state, err: GlobalErrorProps) {
      state.error = err
    },
    // 用来处理请求到的用户信息
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    // 用户登录时，进行的数据处理
    login(state, rawData) {
      const { token } = rawData.data // 获取用户登录时的 token
      state.token = token // 将 token 存放在 vuex 中

      // 将 token持久化，用户登录的时候，将 token 存于 localstorage 中
      localStorage.setItem('token', token)

      // 下面是给 axios 每次请求的时候，都要将设置其 header 的头部信息
      // 在 axios 的 git 文档上的要求写法如下，但是在 ts 中不允许使用 [] 的方式存储键值
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // 1. 使用 '.' 的方式存储键值即可
      // 2. 'Bearer + token' 是一个常用的固定写法
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    // 用户退出事件
    logout(state) {
      // 用户推出时将 vuex 中的 token 清空
      state.token = ''
      // 将本地的 localstorage 中的 toktn 删除
      localStorage.removeItem('token')
      // 将 axios 的头部携带的统一 token 删除掉
      delete axios.defaults.headers.common.Authorization
    },
    // 创建新的文章
    createPost(state, rawData) {
      state.posts.data[rawData._id] = rawData
    }
  },
  actions: {
    // 获取首页专栏列表的某一个专栏的具体的后端数据
    fetchColumn({ state, commit }, columnId) {
      if (!state.columns.data[columnId]) {
        // 使用封装的 get 请求函数，进行异步请求数据
        return asyncAndCommit(`/columns/${columnId}`, 'fetchColumn', commit)
      }
    },
    // 获取首页专栏列表的后端数据
    fetchColumns({ state, commit }, params = {}) {
      // 发送首页加载专栏数据的时候，可以传递当前加载数据的页数和数据条数
      const { currentPage = 1, pageSize = 6 } = params

      // 如果存储的 currentPage 小于当前的 currentPage，说明之前没有请求过，就需要发送请求
      if (state.columns.currentPage < currentPage) {
        return asyncAndCommit(
          `/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
          'fetchColumns',
          commit
        )
      }
    },
    // 处理从后端获取的当前文章的详情数据
    fetchPost({ state, commit }, columnId) {
      // 第一种将文章数据请求过来，是请求的完整的数据
      // 第二种将文章数据请求过来，但是请求的是简介的内容，并不是详情内容
      const currentPost = state.posts.data[columnId]
      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(`/posts/${columnId}`, 'fetchPost', commit)
      } else {
        // 这个解决的是在 CreatedPost 组件中，因为进入编辑文章的时候，发送了 fetchPost 请求
        // 并且后面跟着一个 then 回调，但是当我们第一次请求到数据的时候，并不会再发送请求，发送回调
        // 这里就需要我手动创建一个 Promise 对象，返回数据
        return Promise.resolve({ data: currentPost })
      }
    },
    // 获取首专栏详情页的后端数据
    fetchPosts({ state, commit }, columnId) {
      // 如果给当前专栏设置了一个 columnId 额外的值，那么就不再发送请求；没有设置就正常发送请求并且设置
      if (!state.posts.loadedColumns.includes(columnId)) {
        // 使用封装的 get 请求函数，进行异步请求数据
        return asyncAndCommit(
          `/columns/${columnId}/posts`,
          'fetchPosts',
          commit,
          { method: 'GET' },
          columnId
        )
      }
    },
    // 更新文章的异步请求方法
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
        method: 'PATCH',
        data: payload
      })
    },
    // 删除文章的异步请求方法
    deletePost({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, {
        method: 'DELETE'
      })
    },
    // 发送请求的时候，获取用户获取到的信息
    // 因为上面的 axios 更改了头信息，这里就可以获取到被 token 保护到的用户信息了
    fetchCurrentUser({ commit }) {
      return asyncAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    // 用户登录请求
    login({ commit }, payload) {
      // 使用封装的 post 请求函数，进行异步请求数据
      return asyncAndCommit('/user/login', 'login', commit, {
        method: 'POST',
        data: payload
      })
    },
    // 创建文章请求
    createPost({ commit }, payload) {
      // 使用封装的 post 请求函数，进行异步请求数据
      return asyncAndCommit('/posts', 'createPost', commit, {
        method: 'POST',
        data: payload
      })
    },
    // 为了前端减少actions 的回调，这里使用到 vuex 提供的一个组和 actions 的方法
    // 这里组合的是 login action 和 fetchAndUser action 两个 action。
    // 因为代码的逻辑就是在用户登录成功之后，就获取到用户的信息
    // 参数一：dispatch 方法，调用 actions 方法
    // 参数二：loginData 用户登录信息，用户登录的手机号 + 用户登录密码
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    getColumns: (state) => {
      return objToArr(state.columns.data)
    },
    // 接收一个参数，返回首页专栏列表的具体某一个列表的 id
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    },
    // 接收一个参数，返回具体的一个文章的内容
    getPostById: (state) => (id: string) => {
      return state.posts.data[id]
    },
    // 接收一个参数，某一个专栏的具体的文章内容
    getPostsById: (state) => (columnId: string) => {
      return objToArr(state.posts.data).filter((item) => item.column === columnId)
    }
  }
})

export default store // 导出 vuex 状态管理的 store
