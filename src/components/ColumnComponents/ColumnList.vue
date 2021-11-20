<template>
  <!-- 首页专栏区域 -->
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <!-- 专栏图片 -->
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-weight w-25 my-3" />

          <!-- 专栏名称 -->
          <h5 class="card-title">{{ column.title }}</h5>

          <!-- 专栏简介 -->
          <p class="card-text">{{ column.description }}</p>

          <!-- 进入专栏按钮，点击使用动态路由跳转到对应的文章页 -->
          <!-- 写法一：to 使用对象的形式 -->
          <!-- <router-link :to="{ name: 'column_details', params: { id: column.id } }" class="btn btn-outline-primary">进入专栏</router-link> -->
          <!-- 写法二：to 使用模板字符串 -->
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, PropType, computed } from 'vue';

// 定义专栏数据接口
export interface ColumnProps {
  id: number; // 当前专栏的标识号
  title: string; // 当前专栏的标题
  avatar?: string; // 当前专栏的图片
  description: string; // 当前专栏的简介内容
}

// 解决 require 报错的问题
declare const require;

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
        // 当专栏列表页没有图片的时候，默认使用本地的一张图片
        if (!column.avatar) {
          column.avatar = require('@/assets/images/column.jpg');
        }
        return column;
      });
    });

    return {
      columnList
    };
  }
});
</script>

<style scoped></style>
