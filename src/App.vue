<template>

  <!-- 全局的头部 header 区域 -->
  <global-header :user="currentUser" />

  <!-- 页面内容区域 -->
  <div class="container">
    <!-- loading 页面 -->
    <!-- <loading text="客观稍安勿躁，小的正在拼命加载中..." bgcolor="rgba(0,0,0,0.8)" v-if="isLoading"></loading> -->
    <loading text="客观稍安勿躁，小的正在拼命加载中..." bgcolor="rgba(0,0,0,0.8)" v-if="false"></loading>

    <!-- 页面内容区域 -->
    <router-view></router-view>
  </div>

  <!-- 全局的底部 footer 区域 -->
  <global-footer></global-footer>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, computed, watch } from 'vue'

// 导入 axios 模块
// import axios from 'axios'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 boostrap 样式文件
import 'bootstrap/dist/css/bootstrap.min.css'

// 导入 GlobalDataProps 全局数据泛型
import { GlobalDataProps } from './store'

// 导入要用的的提示框的组件（这是我封装的一个实例方法）
import createMessage from './hooks/useMessage'

// 导入组件
// 导入数据加载时，展示的 loading 页面
import Loading from './components/LoadingComponent/Loading.vue'
// 导入页面 header 区域
import GlobalHeader from './components/HeaderComponent/GlobalHeader.vue'
// 导入页面 footer 区域
import GlobalFooter from './components/FooterConponent/GlobalFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    Loading, // loading 页面
    GlobalHeader, // 页面 header 区域
    GlobalFooter // 页面 footer 区域
  },
  setup() {
    // 获取全局 vuex 数据
    const store = useStore<GlobalDataProps>()

    // 获取 vuex 中的用户登录信息
    const currentUser = computed(() => store.state.user)

    // 获取全局 vuex 中数据请求时的等待状态 loading
    const isLoading = computed(() => store.state.loading)

    // 获取全局的一个错误
    const error = computed(() => store.state.error)

    // 使用 watch 方法监控 error，发生改变时，对提示框实例进行判断显示不显示
    watch(
      // 参数一是一个回调函数，表示要监听的值
      () => error.value.status,
      // 参数二是一个回调函数，将进行监听值变化时的操作
      () => {
        const { status, message } = error.value
        if (status && message) {
          createMessage(message, 'error')
        }
      }
    )

    return {
      currentUser: currentUser, // GlobalHeader.vue 组件的数据
      isLoading, // 数据请求时的等待状态 loading
      error // 错误信息
    }
  }
})
</script>

<style></style>
