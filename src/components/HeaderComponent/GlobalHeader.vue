<template>
  <!-- 全局头部 header 区域 -->
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 py-3">
    <div class="container-fluid">
      <!-- 左侧 logo 和网站名区域 -->
      <router-link class="navbar-brand vertical-align-center introduce" to="/">
        <img src="../../assets/images/my_logo.jpg" alt="凉爽爽爽爽爽爽爽爽爽" width="30" height="30"
          class="d-inline-block align-text-top" />
        <span class="d-inline-block align-text-top">&nbsp;&nbsp;Create By Shuang</span>
      </router-link>

      <!-- 右侧登录注册按钮 -->
      <ul v-if="user ? !user.isLogin : false" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="/login" class="btn btn-primary my-2">登录</router-link>
        </li>
        <li class="list-inline-item">
          <router-link to="/register" class="btn btn-outline-light my-2">注册</router-link>
        </li>
      </ul>
      <!-- 右侧登录后，个人下拉菜单 -->
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <drop-down :title="`你好 ${user ? user.nickName : '张三'}`">
            <!-- 编辑资料 -->
            <drop-down-item>
              <a href="javascript:;" class="dropdown-item">编辑资料</a>
            </drop-down-item>
            <!-- 新建文章 -->
            <drop-down-item>
              <router-link to="/createpost" class="dropdown-item">新建文章</router-link>
            </drop-down-item>
            <!-- 我的专栏 -->
            <drop-down-item>
              <router-link to="/column/619e0a1eb558154f0392ee6a" class="dropdown-item">
                我的专栏
              </router-link>
            </drop-down-item>
            <!-- 退出登录 -->
            <drop-down-item>
              <a href="javascript:;" class="dropdown-item" @click="logout">退出登录</a>
            </drop-down-item>
          </drop-down>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, PropType } from 'vue'

// 导入 vuex
import { useStore } from 'vuex'

// 导入 vuex 中数据类型接口
import { GlobalDataProps, UserProps } from '../../store'

// 导入 vue-router 相关的方法
import { useRouter } from 'vue-router'

// 导入要用的的提示框的组件（这是我封装的一个实例方法）
import createMessage from '../../hooks/useMessage'

// 导入 DropDown.vue 组件
import DropDown from '../DropDownComponents/DropDown.vue'
// 导入 DropDwonItem.vue 组件
import DropDownItem from '../DropDownComponents/DropDownItem.vue'

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
  },
  setup() {
    // 创建 vuex 实例
    const store = useStore<GlobalDataProps>()

    // 初始化 router 路由
    const router = useRouter()

    const logout = () => {
      // 清空用户信息
      store.state.user = {
        isLogin: false
      }

      // 清空 token
      store.commit('logout')

      createMessage('退出成功，2s 后将跳转到登录页面~', 'success')

      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }

    return { logout }
  }
})
</script>

<style lang="less" scoped>
.introduce {
  vertical-align: middle;

  p {
    display: block;
  }
}
</style>
