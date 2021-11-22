// 导入创建 vuex 的 createStore
// 导入 vuex 中的 Commit 类型
import { createStore, Commit } from 'vuex'

// 导入 axios 网络封装模块
import axios from 'axios'

// 导入 testData 中两个数据
// testColumn 是首页专栏列表的数据
// testPosts 是专栏详情页的列表数据
// import { testColumn, testPosts } from '../data/testData'

// 定义的全局用户的信息接口
export interface UserProps {
  isLogin: boolean // 用户的登录状态
  userName?: string // 用户名
  userId?: string // 用户的 ID
  columnId?: number // 要新建文章的专栏的 id
}

// 图片的数据接口
export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}

// 定义的首页专栏列表的数据接口
export interface ColumnProps {
  _id: number | string // 专栏的标识符
  title: string // 专栏的标题
  avatar?: ImageProps // 专栏的图片
  description: string // 转浏览的描述
}

// 定义的专栏详情页的数据接口
export interface PostProps {
  _id: number | string // 文章的标识符
  title: string // 文章的标题
  excerpt?: string // 文章的摘要
  content?: string // 文章的内容
  image?: ImageProps // 文章的图片
  column: string // 将专栏详情页的数据与首页的专栏区域的内容，一一对应起来
  createdAt: string // 文章的时间
}

// 定义存储所有全局信息的接口
export interface GlobalDataProps {
  token: string // 用户登录时，获取到的 token 令牌
  columns: ColumnProps[] // 首页专栏列表数据展示的数据
  posts: PostProps[] // 专栏详情页文章展示列表的数据类型
  user: UserProps // 用户信息
  loading: boolean // 全局的一个数据请求的时候，一个等待的状态
}

// export interface ResponseType<P = {}> {
//   code: number;
//   msg: string;
//   data: P;
// }

// interface ListProps<P> {
//   [id: string]: P;
// }

// export interface GlobalErrorProps {
//   status: boolean;
//   message?: string;
// }

// 封装 get 请求，使用 async + await 进行异步处理请求的函数
// 参数一：是进行请求的 url 地址；类型是 string 类型
// 参数二：是要进行数据处理的 mutations 方法；类型是 string 类型
// 参数三：是 commit 方法；类型是 Commit 类型，需要从 vuex 中导入
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

// 封装 post 请求使用 async + await 进行异步处理请求的函数
// 参数一：是进行请求的 url 地址；类型是 string 类型
// 参数二：是要进行数据处理的 mutations 方法；类型是 string 类型
// 参数三：是 commit 方法；类型是 Commit 类型，需要从 vuex 中导入
// 参数四：是 post 请求需要传递的参数
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

// 创建 vuex 状态管理的数据，规定的是自定义的全局数据的一个接口类型
const store = createStore<GlobalDataProps>({
  state: {
    token: '', // 用户登录时的 token 令牌
    columns: [], // 首页专栏列表数据
    posts: [], // 专栏详情页列表数据
    user: {
      isLogin: false, // 用户登录状态信息
      userName: '',
      columnId: 1
    },
    loading: true // 全局的一个数据请求的时候，一个等待的状态
  },
  // mutations 中有一些 rawData，表示的是通过 actions 异步请求获取到的原始数据
  mutations: {
    // 登录时，修改登录信息
    // login(state) {
    //   state.user = { ...state.user, isLogin: true, userName: 'liangshuang' }
    // },
    // 创建新的文章
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    // 处理从后端获取的首页专栏列表的数据
    // 第二个参数 rawData 是后端传递过来的数据
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    // 处理从后端获取的首页指定的一个专栏的数据
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    // 处理从后端获取的专栏详情页的数据
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    // 页面请求数据的时候，对等待状态 loading 进行修改
    setLoading(state, status) {
      state.loading = status
    },
    // 用户登录时，进行的数据处理
    login(state, rawData) {
      state.token = rawData.data.token
    }
  },
  actions: {
    // 获取首页专栏列表的后端数据
    fetchColumns({ commit }) {
      // 使用封装的 get 请求函数，进行异步请求数据
      getAndCommit('/columns', 'fetchColumns', commit)

      // 使用 async + await 异步处理请求
      // const { data } = await axios.get('/columns')
      // commit('fetchColumns', data)

      // 未加 async + await 异步处理请求
      // axios.get('/columns').then((res) => {
      //   context.commit('fetchColumns', res.data)
      // })
    },
    // 获取首页专栏列表的某一个专栏的具体的后端数据
    fetchColumn({ commit }, columnId) {
      // 使用封装的 get 请求函数，进行异步请求数据
      getAndCommit(`/columns/${columnId}`, 'fetchColumn', commit)

      // 使用 async + await 异步处理请求
      // const { data } = await axios.get(`/columns/${columnId}`)
      // commit('fetchColumn', data)

      // 未加 async + await 异步处理请求
      // axios.get(`/columns/${columnId}`).then((res) => {
      //   commit('fetchColumn', res.data)
      // })
    },
    // 获取首专栏详情页的后端数据
    fetchPosts({ commit }, columnId) {
      // 使用封装的 get 请求函数，进行异步请求数据
      getAndCommit(`/columns/${columnId}/posts`, 'fetchPosts', commit)

      // 使用 async + await 异步处理请求
      // const { data } = await axios.get(`/columns/${columnId}/posts`)
      // commit('fetchPosts', data)

      // 未加 async + await 异步处理请求
      // axios.get(`/columns/${columnId}/posts`).then((res) => {
      //   commit('fetchPosts', res.data)
      // })
    },
    // 用户登录请求
    login({ commit }, payload) {
      // 使用封装的 post 请求函数，进行异步请求数据
      return postAndCommit('/user/login', 'login', commit, payload)
    }
  },
  getters: {
    // 接收一个参数，返回首页专栏列表的具体某一个列表的 id
    getColumnById: (state) => (id: number | string) => {
      return state.columns.find((item) => item._id === id)
    },
    // 接收一个参数，返回专栏详情页列表的具体某一个文章的 id
    getPostsById: (state) => (columnId: number | string) => {
      return state.posts.filter((item) => item.column === columnId)
    }
  }
})

export default store // 导出 vuex 状态管理的 store
