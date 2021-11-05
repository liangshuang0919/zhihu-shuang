<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-weight w-25 my-3" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text">{{ column.description }}</p>
          <a href="javascript:;" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, PropType, computed } from 'vue'

// 定义专栏数据接口
export interface ColumnProps {
  id: number // 当前专栏的标识号
  title: string // 当前专栏的标题
  avatar?: string // 当前专栏的图片
  description: string // 当前专栏的简介
}

// 解决 require 报错的问题
declare const require: any

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/images/column.jpg')
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

<style scoped></style>
