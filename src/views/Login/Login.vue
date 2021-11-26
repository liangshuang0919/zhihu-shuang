<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">先登录，才能进入凉爽爽爽爽爽爽爽爽爽的专栏</h5>
    <!-- 表单区域 -->
    <validate-form @form-submit="onFormSubmit" @keyup.enter="onFormSubmit" class="input-area">
      <!-- 输入邮箱区域（对应 ValidateForm.vue 组件的默认插槽） -->
      <div class="mb-3 w-50 input-area">
        <label for="exampleInputEmail" class="form-label">邮箱地址</label>
        <validate-input id="exampleInputEmail" type="text" placeholder="请输入邮箱地址" :rules="emailRules"
          v-model="formData.email" ref="emailRef"></validate-input>
      </div>

      <!-- 输入密码区域（对应 ValidateForm.vue 组件的默认插槽） -->
      <div class="mb-3 w-50 input-area">
        <label for="exampleInputPassword" class="form-label">邮箱密码</label>
        <validate-input id="exampleInputPassword" type="password" placeholder="请输入密码"
          :rules="passwordRules" v-model="formData.password"></validate-input>
      </div>

      <!-- 提交按钮区域（对应 ValidateForm.vue 组件 name 为 submit 的插槽） -->
      <template #submit>
        <span class="btn btn-primary w-50">登录</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
// 导入要使用到的 vue 的方法
import { defineComponent, reactive } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 vue-router 的钩子函数
// useRouter 方法是定义路由的一些列行为
import { useRouter } from 'vue-router'

// 导入要用的的提示框的组件（这是我封装的一个实例方法）
import createMessage from '../../hooks/useMessage'

// 导入表单区域组件
import ValidateForm from '../../components/ValidateComponents/ValidateForm.vue'
// 导入表单验证组件
import ValidateInput, { RulesProp } from '../../components/ValidateComponents/ValidateInput.vue'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    // 获取全局 vuex 数据
    const store = useStore()

    // 表单输入框中的内容
    const formData = reactive({
      email: '1551724864@qq.com',
      password: '123456'
    })

    // 初始化 router，用来定义路由的一系列行为
    const router = useRouter()

    // 创建邮箱验证规则
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱不能为空' },
      { type: 'email', message: '请输入正确的邮箱格式：xxxxxx@xx.com' }
    ]

    // 创建邮箱密码验证规则
    const passwordRules: RulesProp = [
      { type: 'required', message: '邮箱密码不能为空' },
      { type: 'pwdLength', message: '密码长度为 6-14 个字符' }
    ]

    // 接收 ValidateForm.vue 组件中提交按钮提交事件的值
    const onFormSubmit = (result: boolean) => {
      // result 就是 ValidateForm.vue 组件中 context.emit('form-submit', 参数2) 体检按钮事件的参数2
      // 当登陆成功的时候，进行路由的跳转
      if (result) {
        // 用户登录时携带的信息
        const payload = {
          email: formData.email, // 用户邮箱
          password: formData.password // 用户邮箱密码
        }
        // 调用 store 的 login 异步请求方法，获取 token
        store
          .dispatch('loginAndFetch', payload)
          .then(() => {
            // 用户的登录成功的时候，显示成功的提示框
            createMessage('登陆成功 2s 后将跳转到首页~', 'success')
            setTimeout(() => {
              // 用户登录成功的时候，跳转到首页去
              router.push('/')
            }, 2000)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }

    return {
      formData, // 表单输入框中的内容
      emailRules, // 邮箱需要进行验证的规则
      passwordRules, // 邮箱密码需要进行验证的规则
      onFormSubmit // 接收 ValidateForm.vue 组件中提交按钮提交事件的值
    }
  }
})
</script>

<style lang="less" scoped>
.input-area {
  margin: 0 auto;
}
</style>
