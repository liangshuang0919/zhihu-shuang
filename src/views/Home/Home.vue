<template>
  <!-- 首页区域 -->
  <div class="home-page">
    <section class="py-5 text-center container">
      <!-- 首页内容 “随心写作，自由表达” 区域 -->
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../../assets/images/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="javascript:;" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>

    <!-- 首页专栏的标题 -->
    <h4 class="font-weight-bold text-center">发现精彩</h4>

    <!-- 首页的专栏区域 -->
    <column-list :list="columnData" />

    <h2>{{ columnNumber }}</h2>

    <!-- <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25" @click="loadMorePage" v-if="!isLastPage">加载更多</button> -->
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 方法
import { defineComponent, computed, onMounted } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 vuex 中定义的全局数据 GlobalDataProps 接口
import { GlobalDataProps } from '../../store'

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

    // 页面最开始加载的时候，获取后端的专栏列表数据，将其渲染在页面上
    onMounted(() => {
      store.dispatch('fetchColumns')
    })

    // 通过 vuex 获取全局的一个首页专栏列表的数据
    const columnData = computed(() => store.state.columns)

    // 获取首页专栏列表中，专栏 id 大于 2 的专栏数量
    const columnNumber = computed(() => store.getters.columnsNumber)

    return {
      columnData, // 首页专栏列表的数据
      columnNumber // 首页专栏列表数目
    }
  }
})
</script>

<style scoped></style>
