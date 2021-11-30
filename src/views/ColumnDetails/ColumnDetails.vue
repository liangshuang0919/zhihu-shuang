<template>
  <!-- 专栏详情页区域 -->
  <div class="column-detail-page w-50 mx-auto">
    <!-- 专栏详情页头部区域 -->
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <!-- 专栏详情页的图片 -->
      <div class="col-3 text-center">
        <img :src="column.avatar.url" :alt="column.title" class="rounded-circle border w-100" />
      </div>

      <!-- 专栏详情页的内容 -->
      <div class="col-9">
        <!-- 专栏详情页的题目 -->
        <h3>{{ column.title }}</h3>
        <!-- 专栏详情页的文章内容 -->
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>

    <!-- 专栏详情页文章具体内容区域 -->
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 的方法
import { defineComponent, computed, onMounted } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 vue-router 的钩子函数
// useRoute 方法是获取路由的具体信息，是一个对象
import { useRoute } from 'vue-router'

// 导入 PostList.vue 组件（专栏详情页文章具体内容组件）
import PostList from '../../components/PostComponent/PostList.vue'

export default defineComponent({
  name: 'ColumnDetails',
  components: {
    // PostHeader, // 专栏详情页头部介绍信息
    PostList // 专栏详情页文章具体内容组件
  },
  setup() {
    // 获取 vuex 的所有数据
    const store = useStore()

    // 初始化 route，可以获取到对应的路由对象
    const route = useRoute()

    // 获取专栏详情页的文章 id
    // 获取的 currentId 是一个字符串，需要进行类型转换
    const currentId = route.params.id

    onMounted(() => {
      // 页面加载的时候，获取首页专栏具体的某一个专栏的数据
      store.dispatch('fetchColumn', currentId)
      // 页面加载的时候，获取专栏详情页的数据
      store.dispatch('fetchPosts', currentId)
    })

    // 获取首页专栏区域文章 testData 数据的 id 与当前路由 id 相同的数据
    const column = computed(() => store.getters.getColumnById(currentId))

    // 获取专栏详情页文章 testPosts 数据的 id 与当前路由 id 相同的数据
    const list = computed(() => store.getters.getPostsById(currentId))

    return {
      column, // 首页专栏区域的数据
      list // 专栏详情页的数据
    }
  }
})
</script>

<style scoped></style>
