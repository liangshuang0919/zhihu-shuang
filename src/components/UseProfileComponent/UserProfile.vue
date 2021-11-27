<template>
  <!-- 文章中用户信息展示区域 -->
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <!-- 用户头像 -->
      <img :src="fitUrl" :alt="user.nickName" class="rounded-circle img-thumbnail">

      <!-- 用户的信息 -->
      <div class="detail ml-2">
        <h6 class="d-block mb-0">{{ user.nickName }}</h6>
        <span class="text-truncate text-muted d-block">{{ user.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 的方法
import { defineComponent, computed, PropType } from 'vue'

// 导入 vuex 中的数据类型接口
import { UserProps } from '../../store'

// 导入自定义的公共功能函数，addColumnAvatar 是用户信息展示的参数
import { addColumnAvatar } from '../../hooks/helper'

export default defineComponent({
  name: 'UserProfile',
  props: {
    // 父组件传来的用户的数据
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup(props) {
    // 要展示的用户的信息数据
    const fitUrl = computed(() => {
      // 通过 addColumnAvatar 格式化下用户的头像
      addColumnAvatar(props.user, 50, 50)

      // 获取用户图头像的信息
      const { avatar } = props.user

      return avatar && avatar.fitUrl
    })

    return {
      fitUrl // 要展示的用户的信息数据
    }
  }
})
</script>

<style lang="less" scoped>
.user-profile-component img {
  width: 50px;
  height: 50px;
  /* border: 1px solid #ccc;
  border-radius: 50px; */
}
</style>
