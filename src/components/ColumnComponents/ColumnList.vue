<template>
  <!-- 首页专栏区域 -->
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <!-- 专栏图片 -->
          <!-- 这个是测试数据所用的 -->
          <!-- <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-weight w-25 my-3" /> -->
          <!-- 这个是真实的后端数据 -->
          <img :src="column.avatar && column.avatar.url" :alt="column.title"
            class="rounded-circle border border-weight my-3" />

          <!-- 专栏名称 -->
          <h5 class="card-title">{{ column.title }}</h5>

          <!-- 专栏简介 -->
          <p class="card-text">{{ column.description }}</p>

          <!-- 进入专栏按钮，点击使用动态路由跳转到对应的文章页 -->
          <!-- 写法一：to 使用对象的形式 -->
          <!-- <router-link :to="{ name: 'column_details', params: { id: column.id } }" class="btn btn-outline-primary">进入专栏</router-link> -->
          <!-- 写法二：to 使用模板字符串 -->
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-secondary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, PropType, computed } from 'vue'

// 导入 vuex 中的数据类型接口
import { ColumnProps, ImageProps } from '../../store'

// 导入辅助的方法
// generateFitUrl 方法是将图片进行获取自定义大小
import { generateFitUrl } from '../../hooks/helper'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    // 页面加载的时候，将专栏列表页所需要的数据进行便利操作
    const columnList = computed(() => {
      return props.list.map((column) => {
        // 使用封装的 generateFitUrl 用来获取阿里云服务器上图片自定义的大小
        if (column.avatar && column.avatar.url) {
          generateFitUrl(column.avatar.url as ImageProps, 200, 110, ['m_fill'])
        }

        return column
      })
    })

    return {
      columnList
    }
  }
})
</script>

<style lang="less" scoped>
// 专栏列表的样式
.card-body {
  // 专栏列表头像的样式
  img {
    width: 50px;
    height: 50px;
  }

  // 专栏标题的样式
  .card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  // 专栏列表简介的样式
  .card-text {
    height: 4.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
