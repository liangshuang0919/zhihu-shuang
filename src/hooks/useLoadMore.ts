// 加载更多组件
// 导入 vue 要用到的方法
import { ref, computed, ComputedRef } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 定义加载数据的页数和条数的接口类型
interface LoadParams {
  currentPage: number // 当前页
  pageSize: number // 请求当前页的数据条数
}

// 定义加载更多组件的函数
// actionName 是请求名
// total 动态的值，表示获取到的总数据条数
const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  // 一般点击加载更多的时候，是从第二页开始加载更多的，所以 currentPage 先设为 2
  // 默认请求的数据条数是 6，pageSize 定义为 6
  params: LoadParams = { currentPage: 2, pageSize: 6 }
) => {
  // 初始化 vuex
  const store = useStore()

  // 设置一个响应式的 currentPage，每次加载更多的时候需要 +1，初始值就是 params 里面的 currentPage
  const currentPage = ref(params.currentPage)
  // 发送请求时传递的参数
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize
  }))

  // 暴露方法
  // 第一个方法：点击加载更多
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++ // 每次发送加载更多的请求的时候，需要将请求的页 +1
    })
  }

  // 判断当前是否是加载的最后一条数据
  const isLastPage = computed(() => {
    // 当当前页等于了最大页数，说明到了最后一页，请求到了最后一个数据
    // 使用向上取整
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })

  return {
    currentPage, // 当前的页数
    loadMorePage, // 加载更多数据的方法
    isLastPage // 是否加载到了最后一页
  }
}

export default useLoadMore
