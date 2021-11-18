<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 py-3">
    <div class="container-fluid">
      <router-link class="navbar-brand vertical-align-center introduce" to="/"> Create By Shuang </router-link>
      <ul v-if="user ? !user.isLogin : false" class="list-inline mb-0">
        <li class="list-inline-item"><router-link to="/login" class="btn btn-primary my-2">登录</router-link></li>
        <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">注册</router-link></li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <drop-down :title="`你好 ${user ? user.userName : '张三'}`">
            <drop-down-item><a href="javascript:;" class="dropdown-item">新建文章</a></drop-down-item>
            <drop-down-item><a href="#" class="dropdown-item">编辑资料</a></drop-down-item>
            <drop-down-item><a href="javascript:;" class="dropdown-item">退出登录</a></drop-down-item>
          </drop-down>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, PropType } from 'vue';

// 导入 DropDown.vue 组件
import DropDown from '../DropDownComponents/DropDown.vue';
// 导入 DropDwonItem.vue 组件
import DropDownItem from '../DropDownComponents/DropDownItem.vue';

// 定义顶部信息接口
export interface UserProps {
  isLogin: boolean; // 当前用户是否登录的标识符
  userName: string; // 用户名
  userId: number; // 用户唯一标识号
}

export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      require: true
    }
  },
  components: {
    DropDown,
    DropDownItem
  }
});
</script>

<style lang="less" scoped>
.introduce {
  vertical-align: middle;

  p {
    display: block;
  }
}
</style>
