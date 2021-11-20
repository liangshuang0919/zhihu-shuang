// 导入创建 vuex 的 createStore
import { createStore } from 'vuex'

// 导入 testData 中两个数据
// testColumn 是首页专栏列表的数据
// testPosts 是专栏详情页的列表数据
import { testColumn, testPosts, ColumnProps } from '../data/testData'

// 定义的全局用户的信息接口
export interface UserProps {
  isLogin: boolean; // 用户的登录状态
  userName?: string; // 用户名
  userId?: string; // 用户的 ID
  columnId?: number // 要新建文章的专栏的 id
}

// 定义的专栏详情页的数据接口
export interface PostProps {
  id: number; // 文章的标识符
  title: string; // 文章的标题
  content: string; // 文章的内容
  image?: string; // 文章的图片
  columnId: number; // 将专栏详情页的数据与首页的专栏区域的内容，一一对应起来
  createdAt: string; // 文章的时间
}

// 定义存储所有全局信息的接口
export interface GlobalDataProps {
  columns: ColumnProps[]; // 首页专栏列表数据展示的数据
  posts: PostProps[]; // 专栏详情页文章展示列表的数据类型
  user: UserProps;
}

// export interface ResponseType<P = {}> {
//   code: number;
//   msg: string;
//   data: P;
// }

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
// interface ListProps<P> {
//   [id: string]: P;
// }

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

// const asyncAndCommit = async (url: string, mutationName: string,
//   commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
//   const { data } = await axios(url, config)
//   if (extraData) {
//     commit(mutationName, { data, extraData })
//   } else {
//     commit(mutationName, data)
//   }
//   return data
// }

// 创建 vuex 状态管理的数据，规定的是自定义的全局数据的一个接口类型
const store = createStore<GlobalDataProps>({
  state: {
    columns: testColumn, // 首页专栏列表数据
    posts: testPosts, // 专栏详情页列表数据
    user: {
      isLogin: false, // 用户登录状态信息
      userName: 'liangshuang',
      columnId: 1
    }
  },
  mutations: {
    // 登录时，修改登录信息
    login(state) {
      state.user = { ...state.user, isLogin: true, userName: 'liangshuang' }
    },
    // 创建新的文章
    createPost(state, newPost) {
      state.posts.push(newPost);
    }
  },
  getters: {
    // 获取首页专栏列表 id 大于 2 的专栏数
    columnsNumber(state) {
      return state.columns.filter(item => item.id > 2).length
    },
    // 接收一个参数，返回首页专栏列表的具体某一个列表的 id
    getColumnById: (state) => (id: number) => {
      return state.columns.find(item => item.id === id)
    },
    // 接收一个参数，返回专栏详情页列表的具体某一个文章的 id
    getPostsById: (state) => (columnId: number) => {
      return state.posts.filter(item => item.columnId === columnId)
    }
  }
})

export default store // 导出 vuex 状态管理的 store

// const store = createStore<GlobalDataProps>({
//   state: {
//     token: localStorage.getItem('token') || '',
//     error: { status: false },
//     loading: false,
//     columns: { data: {}, isLoaded: false, total: 0 },
//     posts: { data: {}, loadedColumns: [] },
//     user: { isLogin: false }
//   },
//   mutations: {
//     // login(state) {
//     //   state.user = { ...state.user, isLogin: true, name: 'viking' }
//     // },
//     createPost(state, newPost) {
//       state.posts.data[newPost._id] = newPost
//     },
//     fetchColumns(state, rawData) {
//       const { data } = state.columns
//       const { list, count } = rawData.data
//       state.columns = {
//         data: { ...data, ...arrToObj(list) },
//         total: count,
//         isLoaded: true
//       }
//     },
//     fetchColumn(state, rawData) {
//       state.columns.data[rawData.data._id] = rawData.data
//     },
//     fetchPosts(state, { data: rawData, extraData: columnId }) {
//       state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
//       state.posts.loadedColumns.push(columnId)
//     },
//     fetchPost(state, rawData) {
//       state.posts.data[rawData.data._id] = rawData.data
//     },
//     deletePost(state, { data }) {
//       delete state.posts.data[data._id]
//     },
//     updatePost(state, { data }) {
//       state.posts.data[data._id] = data
//     },
//     setLoading(state, status) {
//       state.loading = status
//     },
//     setError(state, e: GlobalErrorProps) {
//       state.error = e
//     },
//     fetchCurrentUser(state, rawData) {
//       state.user = { isLogin: true, ...rawData.data }
//     },
//     login(state, rawData) {
//       const { token } = rawData.data
//       state.token = token
//       localStorage.setItem('token', token)
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`
//     },
//     logout(state) {
//       state.token = ''
//       state.user = { isLogin: false }
//       localStorage.remove('token')
//       delete axios.defaults.headers.common.Authorization
//     }
//   },
//   actions: {
//     fetchColumns({ state, commit }, params = {}) {
//       const { currentPage = 1, pageSize = 6 } = params
//       // if (!state.columns.isLoaded) {
//       //   return asyncAndCommit('/columns', 'fetchColumns', commit)
//       // }
//       return asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
//     },
//     fetchColumn({ state, commit }, cid) {
//       if (!state.columns.data[cid]) {
//         return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
//       }
//     },
//     fetchPosts({ state, commit }, cid) {
//       if (!state.posts.loadedColumns.includes(cid)) {
//         return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
//       }
//     },
//     fetchPost({ state, commit }, id) {
//       const currentPost = state.posts.data[id]
//       if (!currentPost || !currentPost.content) {
//         return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
//       } else {
//         return Promise.resolve({ data: currentPost })
//       }
//     },
//     updatePost({ commit }, { id, payload }) {
//       return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
//         method: 'patch',
//         data: payload
//       })
//     },
//     fetchCurrentUser({ commit }) {
//       return asyncAndCommit('/user/current', 'fetchCurrentUser', commit)
//     },
//     login({ commit }, payload) {
//       return asyncAndCommit('/user/login', 'login', commit, { method: 'post', data: payload })
//     },
//     createPost({ commit }, payload) {
//       return asyncAndCommit('/posts', 'createPost', commit, { method: 'post', data: payload })
//     },
//     deletePost({ commit }, id) {
//       return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, { method: 'delete' })
//     },
//     loginAndFetch({ dispatch }, loginData) {
//       return dispatch('login', loginData).then(() => {
//         return dispatch('fetchCurrentUser')
//       })
//     }
//   },
//   getters: {
//     getColumns: (state) => {
//       return objToArr(state.columns.data)
//     },
//     getColumnById: (state) => (id: string) => {
//       return state.columns.data[id]
//     },
//     getPostsByCid: (state) => (cid: string) => {
//       return objToArr(state.posts.data).filter(post => post.column === cid)
//     },
//     getCurrentPost: (state) => (id: string) => {
//       return state.posts.data[id]
//     }
//   }
// })

// export default store
