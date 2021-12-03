<template>
  <!-- 专栏详情页面的文章展示区域 -->
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <!-- 文章标题 -->
        <h4>
          <router-link :to="`/post/${post._id}/`">{{ post.title }}</router-link>
        </h4>

        <!-- 文章展示的信息 -->
        <div class="row my-3 align-items-center">
          <!-- 文章图片 -->
          <div v-if="post.image && post.image.url" class="col-3 text-center">
            <router-link :to="`/post/${post._id}/`">
              <img :src="post.image.url" :alt="post.title" class="rounded-lg w-75" />
            </router-link>
          </div>

          <!-- 文章简单的内容 -->
          <p :class="{ 'col-9': post.image }" class="text-muted">{{ post.excerpt }}</p>
        </div>

        <!-- 文章发布时间 -->
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 方法
import { defineComponent, PropType, computed } from 'vue'

// 导入 vuex 中的数据类型接口, ImageProps
import { PostProps, ImageProps } from '../../store'

// 导入辅助的方法
// generateFitUrl 方法是将图片进行获取自定义大小
import { generateFitUrl } from '../../hooks/helper'

export default defineComponent({
  props: {
    // 父组件 ColumnDetails.vue 传过来的值
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup(props) {
    // 页面要渲染的文章列表的信息
    const posts = computed(() => {
      return props.list.map((post) => {
        // 使用封装的 generateFitUrl 用来获取阿里云服务器上图片自定义的大小
        generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        return post
      })
    })

    return {
      posts // 文章列表信息
    }
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
</style>
