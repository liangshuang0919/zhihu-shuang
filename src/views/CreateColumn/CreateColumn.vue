<template>
  <!-- 上传文章页面组件 -->
  <div class="create-post-page">
    <h4>新建文章</h4>
    <input type="file" name="file" @change.prevent="handelFileChange" />
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" type="text" v-model="formDatas.titleVal" placeholder="请输入文章标题" />
      </div>
      <div class="mb-3">
        <label class="form-label">专栏详情：</label>
        <validate-input rows="10" tag="textarea" :rules="contentRules" v-model="formDatas.contentVal" placeholder="请输入专栏详情" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
// 导入 vue 会用到的方法
import { defineComponent, ref, onMounted, reactive } from 'vue'

// 导入获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 vuex 中数据类型接口
import { GlobalDataProps, PostProps, ImageProps } from '../../store'

// 导入 vue-router 相关的方法
import { useRouter, useRoute } from 'vue-router'

// 导入 axios 模块
import axios from 'axios'

// 导入组件
// 导入表单组件
import ValidateForm from '../../components/ValidateComponents/ValidateForm.vue'
// 导入表单输入框组件
import ValidateInput, { RulesProp } from '../../components/ValidateComponents/ValidateInput.vue'

export default defineComponent({
  name: 'CreateColumn',
  components: {
    ValidateInput, // 表单输入框组件
    ValidateForm // 表单组件
  },
  setup() {
    // 初始化 vuex 的用户信息
    const store = useStore<GlobalDataProps>()

    // 初始化 router 路由
    const router = useRouter()

    // 获取表单输入框的内容
    const formDatas = reactive({
      titleVal: '', // 标题
      contentVal: '' // 内容
    })

    // 定义表单输入框规则
    // 定义文章标题输入框规则
    const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]
    // 定义文章内容输入框规则
    const contentRules: RulesProp = [{ type: 'required', message: '文章详情不能为空' }]

    // 定义表单提交按钮事件
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user // 用户 id

        // 如果用户已经登录，则允许创建文章
        if (column) {
          const newPost: PostProps = {
            title: formDatas.titleVal, // 文章标题
            content: formDatas.contentVal, // 文章内容
            column // 文章 id
          }

          // 调用上传文件事件
          store.commit('createPost', newPost)

          // 提交成功后跳转路由
          router.push({
            name: 'column', // 专栏页面
            params: { id: column }
          })
        }
      }
    }

    // 定义选择文件事件
    const handelFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement // 获取输入框的节点
      const files = target.files // 获取输入框的文件（是一个数组）

      // 如果上传了文件，将文件获取到
      if (files) {
        const uploadedFile = files[0] // 获取上传的第一个文件
        const formData = new FormData() // 创建 FormData 实例
        // formData.append 方法是添加文件
        formData.append(uploadedFile.name, uploadedFile)

        // 发送请求
        // 发送文件请求的可以传递三个参数
        // 参数一：上传文件的 url 地址
        // 参数二：要上传的文件实例
        // 参数三：header 头信息，默认是 x-www-form-application，需要改成 multipart/form-data
        axios
          .post('/upload', formData, {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          })
          .then((res: any) => {
            console.log(res)
          })
      }
    }

    return {
      formDatas, // 表单输入框内容
      titleRules, // 文章标题规则
      contentRules, // 文章内容规则
      onFormSubmit, // 提交按钮事件
      handelFileChange // 选择文件事件
    }
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
