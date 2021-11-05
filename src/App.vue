<template>
  <global-header :user="currentUser" />
  <div class="container">
    <column-list :list="currentList" />
  </div>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent } from 'vue'

// 导入组件
// 导入页面 header 区域
import GlobalHeader, { UserProps } from './components/HeaderComponent/GlobalHeader.vue'
// 导入首页专栏部分组件
import ColumnList, { ColumnProps } from './components/Home/ColumnList.vue'

// 导入 boostrap 样式文件
import 'bootstrap/dist/css/bootstrap.min.css'

// GlobalHeader.vue 组件的数据
const currentUser: UserProps = {
  isLogin: true,
  userName: 'liangshuang',
  userId: 1551724864
}
// ColumnList.vue 组件的数据
const currentList: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    ColumnList
  },
  setup() {
    return {
      currentUser: currentUser, // GlobalHeader.vue 组件的数据
      currentList: currentList // ColumnList.vue 组件的数据
    }
  }
})
</script>

<style></style>
