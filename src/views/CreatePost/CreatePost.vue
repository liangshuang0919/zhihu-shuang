<template>
  <!-- 创建文章页面 -->
  <div class="create-post-page w-75">
    <h4>{{ isEditMode ? '编辑文章' : '创建文章' }}</h4>
    <!-- 上传图片组件 -->
    <!-- bootstrap 的水平居中 align-items-center justify-content-center -->
    <uploader action="/upload" :uploaded="uploadedData" :beforeUpload="uploadCheck"
      @file-upload-success="handelFileUploaded"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
      <h2>点击上传头图</h2>

      <!-- 对应子组件 loading 的插槽，上传中的样式 -->
      <template #loading>
        <div class="d-flex">
          <!-- 左侧转圈的样式 -->
          <div class="spinner-border text-secondary" role="status"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <!-- 右侧文字的样式 -->
          <h2>正在上传</h2>
        </div>
      </template>

      <!-- 对应子组件 uploaded 的插槽，上传完成的央视 -->
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="">
      </template>
    </uploader>

    <!-- 整个表单区域 -->
    <validate-form @form-submit="onFormSubmit">
      <!-- 文章标题区域 -->
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="formData.titleVal" placeholder="请输入文章标题" type="text" />
      </div>

      <!-- 专栏详情区域 -->
      <div class="mb-3">
        <label class="form-label">专栏详情：</label>
        <validate-input :rules="contentRules" v-model="formData.contentVal" placeholder="请输入专栏详情" tag="textarea"
          rows="12" />
      </div>

      <!-- 发表文章按钮 -->
      <template #submit>
        <button class="btn btn-primary btn-large w-100">{{ isEditMode ? '更新文章' : '发表文章' }}</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 的方法
import { defineComponent, ref, reactive, onMounted } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 vuex 中的数据类型接口
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '../../store'

// 导入 vue-router 的 useRouter 和 useRoute 方法
// useRouter 获取路由器，用来进行路由的跳转
// useRoute 是获取跳转的路由对象，上面有各种方法
import { useRouter, useRoute } from 'vue-router'

// 导入我封装好的全局提示框函数
import createMessage from '../../hooks/useMessage'

// 导入我封装好的一些恶功能函数
import { beforeUploadCheck } from '../../hooks/helper'

// 导入组件
// 导入 ValidateForm.vue 表单组件
import ValidateForm from '../../components/ValidateComponents/ValidateForm.vue'
// 导入 ValidateInput.vue 输入框组件
import ValidateInput, { RulesProp } from '../../components/ValidateComponents/ValidateInput.vue'
// 导如 Uploader 片上传组件
import Uploader from './components/Uploader.vue'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm, // 表单组件
    ValidateInput, // 输入框组件
    Uploader // 图片上传组件
  },
  setup() {
    // 获取 vuex 的数据
    const store = useStore<GlobalDataProps>()

    // 初始化 route，获取当前路由的信息
    const route = useRoute()
    // 初始化 router，获取路由的各种方法和属性
    const router = useRouter()

    // 初始化 isEditMode，判断当前的创建文章页面是否是编辑模式
    // 两个 !! 将后面的值变为 boolean 类型，路由有 id 参数的话表示当前是编辑模式
    const isEditMode = !!route.query.id

    // 初始化一个对象，要传递给子组件 Uploader.vue 的数据
    const uploadedData = ref()

    // 表单输入框的内容
    const formData = reactive({
      titleVal: '', // 文章标题双向绑定的内容
      contentVal: '' // 文章内容双向绑定的内容
    })

    // 制定文章标题的输入规则
    const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]

    // 制定文章内容的输入规则
    const contentRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]

    // 记录要上传图片的 id
    let imageId = ''

    // 获取当前上传图的 id
    const handelFileUploaded = (rawData: ResponseType<ImageProps>) => {
      // 获取当前上传图片的 id
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }

    onMounted(() => {
      // 如果当前是编辑文章的界面
      if (isEditMode) {
        // 发送获取文章数据的请求
        store.dispatch('fetchPost', route.query.id).then((rawData: ResponseType<PostProps>) => {
          // 初始化请求的数据，将这个数据传递给子组件 Uploader.vue，让内容显示出来
          const currentPost = rawData.data

          // 如果文字图片存在
          if (currentPost.image) {
            // 要传给子组件的数据赋上图片的值
            uploadedData.value = {
              data: currentPost.image
            }
          }

          formData.titleVal = currentPost.title // 改变页面中文章标题
          formData.contentVal = currentPost.content || '' // 改变页面中的内容
        })
      }
    })

    // 发表文章按钮的事件
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // _id：当前创建文章的用户的 id
        // column：用户创建的文章专栏的 id
        const { _id, column } = store.state.user

        // 因为 columnId 可能不存在，直接创建新文章的话，columnId 可能为 undefined，会报错
        // 先判断 columnId 是否存在，再创建新的文章到数据中
        if (column) {
          const newPost: PostProps = {
            title: formData.titleVal, // 设置新创建的文章的标题
            content: formData.contentVal, // 设置新创建的文章的内容
            column: column, // 对应专栏的 id
            author: _id // 创建文章的用户的 id
          }

          // 如果用户创建文章的时候，上传了图片，那么就将这个图片的 id 加给 newPost
          if (imageId) {
            newPost.image._id = imageId
          }

          // 判断当前是否为编辑状态，是的话就调用 updatePost 更新文章的方法；否则调用 createPost 创建文章的方法
          const actionName = isEditMode ? 'updatePost' : 'createPost'

          // 初始化要发送的数据，如果是编辑状态，更新文章的话还需要带上文章的 id；否则直接发送文章的数据即可
          const sendData = isEditMode ? { id: route.query.id, payload: newPost } : newPost

          // 新的文章添加给 vuex 的方法，添加到数据当中
          store.dispatch(actionName, sendData).then(() => {
            // 创建成功提示框
            createMessage('发表文章成功，2s 后跳转到文章', 'success')

            // 跳转路由
            setTimeout(() => {
              router.push({
                name: 'column',
                params: {
                  id: column
                }
              })
            })
          })
        }
      }
    }

    // 定义上传文件时，检查文件参数是否合法
    const uploadCheck = (file: File) => {
      // 获取检查上传文件的结果
      // 这里自定义的是允许上传文件的类型为 jpg 和 png；允许上传的大小为 1M
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })

      // 获取结果
      const { passed, error } = result

      // 判断是什么错误，提示什么类型的信息
      // 如果是上传文件的类型出错
      if (error === 'format') {
        createMessage('上传的图片只能是 JPG/PNG 格式！', 'error')
      }
      // 如果是上传文件的大小出错
      if (error === 'size') {
        createMessage('上传的图片大小不能超过 1M', 'error')
      }
      // 如果是上传文件成功
      if (passed) {
        createMessage('成功上传图片！', 'success')
      }

      return passed
    }

    return {
      uploadedData, // 要返回给子组件的值
      isEditMode, // 判断当前是否为文章的编辑状态
      formData, // 表单输入框内容
      titleRules, // 文章标题的输入规则
      contentRules, // 文章内容的输入规则
      onFormSubmit, // 发表文章事件
      uploadCheck, // 检查文件上传的事件
      handelFileUploaded // 获取当前上传图的 id
    }
  }
})
</script>

<style lang="less">
.create-post-page {
  margin: 0 auto;

  .file-upload-container {
    height: 300px;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; // 指定可以换元素的内容应该如何适应到其使用的高度和宽度确定的框
    }
  }
}

.uploaded-area {
  position: relative;

  &:hover h3 {
    display: block;
  }

  h3 {
    display: none;
    position: absolute;
    color: #999;
    text-align: center;
    width: 100%;
    top: 50%;
  }
}
</style>
