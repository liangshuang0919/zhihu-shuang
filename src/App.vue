<template>
  <!-- 全局的头部 header 区域 -->
  <global-header :user="currentUser" />

  <!-- 页面主题区域 -->
  <div class="container">
    <!-- 首页的专栏区域 -->
    <column-list :list="currentList" />

    <!-- 表单区域 -->
    <validate-form @form-submit="onFormSubmit">
      <!-- 输入邮箱区域（对应 ValidateForm.vue 组件的默认插槽） -->
      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">邮箱地址</label>
        <validate-input id="exampleInputEmail" type="text" placeholder="请输入邮箱地址" :rules="emailRules" v-model="emailValue" ref="emailRef"></validate-input>
        <!-- {{ emailValue }} -->
      </div>

      <!-- 输入密码区域（对应 ValidateForm.vue 组件的默认插槽） -->
      <div class="mb-3">
        <label for="exampleInputPassword" class="form-label">邮箱密码</label>
        <validate-input id="exampleInputPassword" type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordValue"></validate-input>
      </div>

      <!-- 提交按钮区域（对应 ValidateForm.vue 组件 name 为 submit 的插槽） -->
      <template #submit>
        <span class="btn btn-danger">提交</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, ref } from 'vue';

// 导入 boostrap 样式文件
import 'bootstrap/dist/css/bootstrap.min.css';

// 导入组件
// 导入页面 header 区域
import GlobalHeader, { UserProps } from './components/HeaderComponent/GlobalHeader.vue';
// 导入首页专栏部分组件
import ColumnList, { ColumnProps } from './components/Home/ColumnList.vue';
// 导入表单验证组件
import ValidateInput, { RulesProp } from './components/ValidateComponents/ValidateInput.vue';
// 导入表单区域组件
import ValidateForm from './components/ValidateComponents/ValidateForm.vue';

// GlobalHeader.vue 组件的数据
const currentUser: UserProps = {
  isLogin: true,
  userName: 'liangshuang',
  userId: 1551724864
};
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
  name: 'App',
  components: {
    GlobalHeader,
    ColumnList,
    ValidateInput,
    ValidateForm
  },
  setup() {
    // 邮箱表单输入框内容
    const emailValue = ref('');

    // 密码表单输入框内容
    const passwordValue = ref('');

    // 获取邮箱输入表单节点
    const emailRef = ref<any>();

    // 创建邮箱验证规则
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱不能为空' },
      { type: 'email', message: '请输入正确的邮箱格式：xxxxxx@xx.com' }
    ];

    // 创建邮箱密码验证规则
    const passwordRules: RulesProp = [
      { type: 'required', message: '邮箱密码不能为空' },
      { type: 'pwdLength', message: '密码长度为 6-14 个字符' }
    ];

    // 接收 ValidateForm.vue 组件中提交按钮提交事件的值
    const onFormSubmit = (result: boolean) => {
      // result 就是 ValidateForm.vue 组件中 context.emit('form-submit', 参数2) 体检按钮事件的参数2
      console.log('resulet: ', result);
    };

    return {
      currentUser: currentUser, // GlobalHeader.vue 组件的数据
      currentList: currentList, // ColumnList.vue 组件的数据
      emailValue, // 邮箱表单输入框内容
      passwordValue, // 密码表单输入框内容
      emailRules, // 邮箱需要进行验证的规则
      passwordRules, // 邮箱密码需要进行验证的规则
      onFormSubmit, // 接收 ValidateForm.vue 组件中提交按钮提交事件的值
      emailRef // 邮箱输入框的节点
    };
  }
});
</script>

<style lang="less" scoped></style>
