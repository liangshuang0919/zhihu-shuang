<template>
  <!-- 首页区域 -->
  <div class="home-page text-center">
    <section class="py-5 container">
      <!-- 首页内容 “随心写作，自由表达” 区域 -->
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../../assets/images/callout.jpg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/createpost" class="btn btn-outline-dark my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>

    <!-- 首页专栏的标题 -->
    <h4 class="font-weight-bold text-center">发现精彩</h4>

    <!-- 首页的专栏区域 -->
    <column-list :list="columnData" />

    <!-- 加载更多 -->
    <button class="btn btn-outline-secondary mt-2 mb-5 mx-auto btn-block w-25" @click="loadMorePage"
      v-if="!isLastPage">
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 方法
import { defineComponent, computed, onMounted } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 vuex 中定义的全局数据 GlobalDataProps 接口, FileProps, ImageProps
import { GlobalDataProps } from '../../store'

// 导入自定义的加载更多的功能函数
import useLoadMore from '../../hooks/useLoadMore'

// 导入首页专栏部分组件和定义的 ColumnProps 数据类型
import ColumnList from '../../components/ColumnComponents/ColumnList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList // 注册首页专栏部分组件
  },
  setup() {
    // 获取全局 vuex 数据
    const store = useStore<GlobalDataProps>()

    // 获取服务器中所有数据的总数
    const total = computed(() => store.state.columns.total)
    const currentPage = computed(() => store.state.columns.currentPage)

    // 页面最开始加载的时候，获取后端的专栏列表数据，将其渲染在页面上
    onMounted(() => {
      store.dispatch('fetchColumns', { pageSize: 6 })
    })

    // 通过 vuex 获取全局的一个首页专栏列表的数据
    const columnData = computed(() => store.getters.getColumns)

    // 获取到加载更多的事件 loadMorePage，和当前是否是最后一页数据 isLatsPage
    const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, {
      pageSize: 6,
      // 发送请求的时候，当前页数如果有值，那么需要 +1；如果没有值，表示当前第一次请求，所以第一次请求应该为第 2 页
      currentPage: currentPage.value ? currentPage.value + 1 : 2
    })

    return {
      columnData, // 首页专栏列表的数据
      loadMorePage, // 加载更多事件
      isLastPage // 判断当前是否是最后一页数据
    }
  }
})
</script>

<style scoped></style>
