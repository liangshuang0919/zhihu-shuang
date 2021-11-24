<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">欢迎注册凉爽爽爽爽爽爽爽爽爽的专栏~</h5>
    <!-- 表单区域 -->
    <validate-form @form-submit="onFormSubmit" class="input-area">
      <!-- 输入邮箱区域（对应 ValidateForm.vue 组件的默认插槽） -->
      <div class="mb-3 w-50 input-area">
        <label for="inputEmail" class="form-label">邮箱地址</label>
        <validate-input id="inputEmail" type="text" placeholder="请输入邮箱地址" :rules="emailRules" v-model="formData.email"
          ref="emailRef">
        </validate-input>
      </div>

      <!-- 输入昵称区域（对应 ValidateForm.vue 组件的默认插槽） -->
      <div class="mb-3 w-50 input-area">
        <label for="inputNickName" class="form-label">昵称</label>
        <validate-input id="inputNickName" type="text" placeholder="请输入昵称" :rules="nicknameRules" v-model="formData.nickName">
        </validate-input>
      </div>

      <!-- 输入密码区域（对应 ValidateForm.vue 组件的默认插槽） -->
      <div class="mb-3 w-50 input-area">
        <label for="inputPassword" class="form-label">密码</label>
        <validate-input id="inputPassword" type="password" placeholder="请输入密码" :rules="passwordRules" v-model="formData.password">
        </validate-input>
      </div>

      <!-- 输入重复密码区域（对应 ValidateForm.vue 组件的默认插槽） -->
      <div class="mb-3 w-50 input-area">
        <label for="inputRepeatPassword" class="form-label">确认密码</label>
        <validate-input id="inputRepeatPassword" type="password" placeholder="请再次输入密码" :rules="repeatPasswordRules"
          v-model="formData.repeatPassword"></validate-input>
      </div>

      <!-- 提交按钮区域（对应 ValidateForm.vue 组件 name 为 submit 的插槽） -->
      <template #submit>
        <span class="btn btn-primary w-50">注册新用户</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
// 导入要使用到的 vue 的方法
import { defineComponent, reactive } from 'vue'

// 导入 vue-router 的钩子函数
// useRouter 方法是定义路由的一些列行为
import { useRouter } from 'vue-router'

// 导入 axios 模块
import axios from 'axios'

// 导入要用的的提示框的组件（这是我封装的一个实例方法）
import createMessage from '../../hooks/useMessage'

// 导入表单区域组件
import ValidateForm from '../../components/ValidateComponents/ValidateForm.vue'
// 导入表单验证组件
import ValidateInput, { RulesProp } from '../../components/ValidateComponents/ValidateInput.vue'

export default defineComponent({
  name: 'Register',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    // 初始化 router，用来定义路由的一系列行为
    const router = useRouter()

    // 创建表单输入框中的内容
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })

    // 创建邮箱验证规则
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱不能为空' },
      { type: 'email', message: '请输入正确的邮箱格式：xxxxxx@xx.com' }
    ]

    // 创建昵称时验证规则
    const nicknameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空' },
      { type: 'nick_name', message: '昵称的长度在 2-10 个字符' }
    ]

    // 创建密码验证规则
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'pwdLength', message: '密码的长度为 6-14 个字符' }
    ]

    // 创建重复密码验证规则
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        message: '密码不一致，请重新输入',
        validator: () => {
          // 验证密码与重复密码是否一样
          return formData.password === formData.repeatPassword
        }
      }
    ]

    // 接收 ValidateForm.vue 组件中提交按钮提交事件的值
    const onFormSubmit = (result: boolean) => {
      // result 就是 ValidateForm.vue 组件中 context.emit('form-submit', 参数2) 体检按钮事件的参数2
      // 当登陆成功的时候，进行路由的跳转
      if (result) {
        // 用户登录时携带的信息
        const payload = {
          email: formData.email, // 用户邮箱
          nickName: formData.nickName, // 用户昵称
          password: formData.password // 用户密码
        }
        // 调用 store 的 login 异步请求方法，获取 token
        axios
          .post('/users/', payload)
          .then(() => {
            // 用户的登录成功的时候，显示成功的提示框
            createMessage('注册成功 2s 后将跳转到登录页面~', 'success')
            setTimeout(() => {
              // 用户登录成功的时候，跳转到首页去
              router.push('/login')
            }, 2000)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }

    return {
      formData, // 表单四个输入框输入的内容
      emailRules, // 邮箱需要进行验证的规则
      nicknameRules, // 昵称需要进行验证的规则
      passwordRules, // 密码需要进行验证的规则
      repeatPasswordRules, // 重复密码进行验证的规则
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
