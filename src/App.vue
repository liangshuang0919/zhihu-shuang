<template>

  <!-- 全局的头部 header 区域 -->
  <global-header :user="currentUser" />

  <!-- 页面内容区域 -->
  <div class="container">
    <!-- loading 页面 -->
    <loading text="客观稍安勿躁，小的正在拼命加载中..." bgcolor="rgba(0,0,0,0.8)" v-if="isLoading"></loading>

    <!-- 页面内容区域 -->
    <router-view></router-view>
  </div>

  <!-- 全局的底部 footer 区域 -->
  <global-footer></global-footer>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, ref, computed } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 boostrap 样式文件
import 'bootstrap/dist/css/bootstrap.min.css'

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
    const store = useStore()

    // 获取 vuex 中的用户登录信息
    const currentUser = computed(() => store.state.user)

    // 获取邮箱输入表单节点
    const emailRef = ref('')

    // 获取全局 vuex 中数据请求时的等待状态 loading
    const isLoading = computed(() => store.state.loading)

    return {
      currentUser: currentUser, // GlobalHeader.vue 组件的数据
      emailRef, // 邮箱输入框的节点
      isLoading // 数据请求时的等待状态 loading
    }
  }
})
</script>

<style lang="less" scoped></style>
