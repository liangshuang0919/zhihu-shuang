<template>
  <!-- 专栏详情页面的文章展示区域 -->
  <div class="post-list">
    <article v-for="post in posts" :key="post.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <!-- 文章标题 -->
        <h4>
          <router-link :to="`/posts/${post.id}/`">{{ post.title }}</router-link>
        </h4>

        <!-- 文章展示的信息 -->
        <div class="row my-3 align-items-center">
          <!-- 文章图片 -->
          <div v-if="post.image" class="col-4">
            <router-link :to="`/posts/${post.id}/`">
              <img :src="post.image" :alt="post.title" class="rounded-lg w-100" />
            </router-link>
          </div>

          <!-- 文章简单的内容 -->
          <p :class="{ 'col-8': post.image }" class="text-muted">{{ post.content }}</p>
        </div>

        <!-- 文章发布时间 -->
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 方法
import { defineComponent, PropType, computed } from 'vue';

// 导入页面所需要的数据
import { ImageProps } from '../../store';
import { PostProps } from '../../data/testData';

// 导入辅助的方法
// generateFitUrl 方法是将图片进行获取自定义大小
import { generateFitUrl } from '../../data/helper';

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
        generateFitUrl(post.image as ImageProps, 20, 110, ['m_fill']);
        return post;
      });
    });

    return {
      posts // 文章列表信息
    };
  }
});
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
