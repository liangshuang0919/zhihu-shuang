<template>
  <!-- 全局的头部 header 区域 -->
  <global-header :user="currentUser" />

  <!-- 页面主题区域 -->
  <div class="container">
    <router-view></router-view>
  </div>

  <!-- 全局的底部 footer 区域 -->
  <footer class="text-center py-4 text-secondary bg-light mt-6">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">© 2021 凉爽爽爽爽爽爽爽爽爽专栏</li>
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多</li>
      </ul>
    </small>
  </footer>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, ref } from 'vue';

// 导入 boostrap 样式文件
import 'bootstrap/dist/css/bootstrap.min.css';

// 导入组件
// 导入页面 header 区域
import GlobalHeader, { UserProps } from './components/HeaderComponent/GlobalHeader.vue';

// GlobalHeader.vue 组件的数据
const currentUser: UserProps = {
  isLogin: false, // 用户登录情况
  userName: 'liangshuang', // 用户名
  userId: 1551724864 // 用户 id
};

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup() {
    // 获取邮箱输入表单节点
    const emailRef = ref<any>();

    return {
      currentUser: currentUser, // GlobalHeader.vue 组件的数据
      emailRef // 邮箱输入框的节点
    };
  }
});
</script>

<style lang="less" scoped></style>
