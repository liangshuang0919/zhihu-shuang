// 导入创建 vuex 的 createStore
import { createStore } from 'vuex'

// 导入 axios 网络封装模块
import axios from 'axios'

// 导入 testData 中两个数据
// testColumn 是首页专栏列表的数据
// testPosts 是专栏详情页的列表数据
import { testColumn, testPosts } from '../data/testData'

// 定义的全局用户的信息接口
export interface UserProps {
  isLogin: boolean; // 用户的登录状态
  userName?: string; // 用户名
  userId?: string; // 用户的 ID
  columnId?: number // 要新建文章的专栏的 id
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

// 定义的首页专栏列表的数据接口
export interface ColumnProps {
  id: number; // 专栏的标识符
  title: string; // 专栏的标题
  avatar?: ImageProps; // 专栏的图片
  description: string; // 转浏览的描述
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

// interface ListProps<P> {
//   [id: string]: P;
// }

// export interface GlobalErrorProps {
//   status: boolean;
//   message?: string;
// }

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
    },
    // 处理从后端获取的首页专栏列表的数据
    // 第二个参数 rawData 是后端传递过来的数据
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    }
  },
  actions: {
    // 获取首页专栏列表的后端数据
    fetchColumns(context) {
      axios.get('/columns').then(res => {
        context.commit('fetchColumns', res.data);
      })
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
