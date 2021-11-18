<template>
  <!-- 首页区域 -->
  <div class="home-page">
    <section class="py-5 text-center container">
      <!-- 首页内容 “随心写作，自由表达” 区域 -->
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../../assets/images/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p><a href="javascript:;" class="btn btn-primary my-2">开始写文章</a></p>
        </div>
      </div>
    </section>

    <!-- 首页专栏的标题 -->
    <h4 class="font-weight-bold text-center">发现精彩</h4>

    <!-- 首页的专栏区域 -->
    <column-list :list="currentList" />

    <!-- <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25" @click="loadMorePage" v-if="!isLastPage">加载更多</button> -->
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 方法
import { defineComponent } from 'vue';

// 导入首页专栏部分组件和定义的 ColumnProps 数据类型
import ColumnList, { ColumnProps } from '../../components/ColumnComponents/ColumnList.vue';

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
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧,这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
];

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList // 注册首页专栏部分组件
  },
  setup(props) {
    return {
      currentList // ColumnList.vue 组件的数据
    };
  }
});
</script>

<style scoped></style>
