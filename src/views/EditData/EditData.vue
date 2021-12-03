<template>
  <!-- 编辑用户资料页面 -->
  <div class="edit-data w-690 create-post-page">
    <ul class="nav nav-tabs my-4" @click="change">
      <!-- 更新个人资料 -->
      <li class="nav-item">
        <a class="nav-link" :class="{active: isActive}" href="javascript:;">更新个人信息</a>
      </li>
      <!-- 更新专栏资料 -->
      <li class="nav-item">
        <a class="nav-link" :class="{active: !isActive}" href="javascript:;">更新专栏信息</a>
      </li>
    </ul>

    <!-- 上传资料 -->
    <h3 class="my-4">{{ isActive ? '编辑个人信息' : '编辑专栏信息' }}</h3>
    <!-- 上传图片组件 -->
    <!-- bootstrap 的水平居中 align-items-center justify-content-center -->
    <uploader action="/upload" :uploaded="uploadedData" :beforeUpload="uploadCheck" v-if="!isActive"
      @file-upload-success="handelFileUploaded"
      class="d-flex align-items-center justify-content-center bg-light text-secondary mx-auto my-3 rounded-circle head-portrait">
      <img :src="columnImage" alt="专栏图片" v-if="columnImage">
      <h3 v-else>点击上传头像</h3>

      <!-- 对应子组件 loading 的插槽，上传中的样式 -->
      <template #loading>
        <div class="d-flex w-100">
          <!-- 左侧转圈的样式 -->
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="spinner-border text-secondary" role="status"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <h3>正在上传</h3>
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
        <!-- 个人信息的用户名 -->
        <validate-input :rules="titleRules" v-model="formData.titleVal"
          :placeholder="isActive ? '请输入用户名' : '请输入专栏名' " type="text" />
      </div>

      <!-- 专栏详情区域 -->
      <div class="mb-3">
        <!-- 用户信息的个人简介 -->
        <validate-input :rules="contentRules" v-model="formData.contentVal"
          :placeholder="isActive ? '请输入个人简介' : '请输入专栏简介'" tag="textarea" rows="6" />
      </div>

      <!-- 发表文章按钮 -->
      <template #submit>
        <button class="btn btn-outline-secondary btn-large w-100">
          {{ isActive ? '更新个人信息' : '更新专栏资料' }}
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, ref, reactive, onMounted } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 vuex 中的数据类型接口
import {
  GlobalDataProps,
  CurrentColumnProps,
  ResponseType,
  ImageProps,
  UserProps
} from '../../store'

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
import Uploader from '../../components/UploaderComponent/Uploader.vue'

export default defineComponent({
  name: 'EditData',
  components: {
    ValidateForm, // 表单组件
    ValidateInput, // 输入框组件
    Uploader // 图片上传组件
  },
  setup() {
    // 获取 vuex 的数据
    const store = useStore<GlobalDataProps>()

    // 初始化一个对象，要传递给子组件 Uploader.vue 的数据
    const uploadedData = ref()

    // 制定用户名的输入规则
    const titleRules: RulesProp = [{ type: 'required', message: '用户名不能为空' }]

    // 制定个人简介的输入规则
    const contentRules: RulesProp = [{ type: 'required', message: '个人简介不能为空' }]

    // 表单输入框的内容
    const formData = reactive({
      titleVal: '', // 用户名、专栏名双向绑定的内容
      contentVal: '' // 用户简介、专栏简介双向绑定的内容
    })

    // 控制 li 标签活跃状态
    // 为 true 的话，表示发送更新个人资料请求
    // 为 false 的话，表示发送更新专栏资料请求
    const isActive = ref(true)

    const columnImage = ref('')

    // 点击 ul 标签切换 li 的活跃状态
    const change = (e: any) => {
      if (!e.target.className.includes('active')) {
        isActive.value = !isActive.value // 切换活跃的 li
      }

      // 用户资料界面的数据
      const currentUserInfo = store.state.user
      const currentColumnInfo = store.state.currentColumn

      if (e.target.innerText === '更新个人信息') {
        formData.titleVal = currentUserInfo.nickName
        formData.contentVal = currentUserInfo.description
      } else if (e.target.innerText === '更新专栏信息') {
        formData.titleVal = currentColumnInfo.data.title
        formData.contentVal = currentColumnInfo.data.description
      }

      if (typeof currentColumnInfo.data.avatar === 'object') {
        columnImage.value = currentColumnInfo.data.avatar.url
      }
    }

    // 记录要上传头像的 id
    let imageId = ''

    // 获取当前上传图的 id
    const handelFileUploaded = (rawData: ResponseType<ImageProps>) => {
      // 获取当前上传图片的 id
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }

    onMounted(() => {
      // 用户资料界面的数据
      const currentUserInfo = store.state.user
      formData.titleVal = currentUserInfo.nickName // 改变页面中文章标题
      formData.contentVal = currentUserInfo.description || '' // 改变页面中的内容

      // 获取专栏信息
      store.dispatch('getCurrentColumn', currentUserInfo.column)
    })

    // 发表文章按钮的事件
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // _id：当前创建文章的用户的 id
        // column：用户创建的文章专栏的 id
        const { _id, column } = store.state.user
        const currentColumnInfo = store.state.currentColumn

        // 因为 columnId 可能不存在，直接创建新文章的话，columnId 可能为 undefined，会报错
        // 先判断 columnId 是否存在，再创建新的文章到数据中
        if (column) {
          const newUser: UserProps = {
            _id: _id, // 用户的 ID
            isLogin: true, // 用户登录状态
            nickName: formData.titleVal, // 用户名
            description: formData.contentVal // 用户简介
          }

          const newColumn: CurrentColumnProps = {
            title: formData.titleVal, // 专栏名
            description: formData.contentVal // 专栏简介
          }

          // // 如果用户创建文章的时候，上传了图片，那么就将这个图片的 id 加给 newPost
          if (imageId) {
            newColumn.avatar = imageId
          }

          // 判断当前是否为编辑状态，是的话就调用 updatePost 更新文章的方法；否则调用 createPost 创建文章的方法
          const actionName = isActive.value ? 'updateUserInfo' : 'updateColumnInfo'

          // 初始化要发送的数据，如果是编辑状态，更新文章的话还需要带上文章的 id；否则直接发送文章的数据即可
          const sendData = isActive.value
            ? { columnId: _id, payload: newUser }
            : { columnId: currentColumnInfo.data._id, payload: newColumn }

          // 新的文章添加给 vuex 的方法，添加到数据当中
          store.dispatch(actionName, sendData).then(() => {
            // 创建成功提示框
            createMessage('更新个人信息成功！', 'success')
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
      isActive, // li 标签的活跃状态
      change, // ul 的点击事件
      columnImage, // 专栏图片
      uploadedData, // 要返回给子组件的值
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

<style lang="less" >
// 整个区域的样式
.w-690 {
  width: 690px;
  margin: 0 auto;

  .head-portrait {
    width: 200px;
    height: 200px;
  }

  .nav-tabs {
    border-bottom: 1px solid #dee2e6;
  }
}

.create-post-page {
  margin: 0 auto;

  .file-upload-container {
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; // 指定可以换元素的内容应该如何适应到其使用的高度和宽度确定的框
    }
  }
}
</style>
