<template>
  <!-- 上传文章的组件 -->
  <div class="file-upload">
    <div class="file-upload-container" @click="triggerUpload" v-bind="$attrs">
      <!-- 展示用户正在上传文件的插槽 -->
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary">正在上传...</button>
      </slot>

      <!-- 展示用户上传文件成功时的插槽 -->
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>

      <!-- 展示默认展示的样式-->
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>

    <!-- 需要隐藏起来的 input 标签 -->
    <input type="file" class="file-input d-none" ref="fileInput" @change="handelFileChange">
  </div>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, PropType, ref, watch } from 'vue'

// 导入 axios 模块
import axios from 'axios'

// 指示上传文件的状态，在不同的阶段显示不同的样式
// ready：准备阶段
// loading：上传阶段
// success：上传成功
// error：上传失败
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

// 定义事件类型，为 file 类型，返回一个 boolean
type CheckFunction = (file: File) => boolean

export default defineComponent({
  name: 'Uploader',
  props: {
    // 上传文件的 url 地址
    action: {
      type: String,
      required: true
    },
    // 用来检查当前上传的文件否满足用户自定义的需求
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    // 传递过来的是编辑文章页面的数据（从文章中进行编辑）
    uploaded: {
      type: Object
    }
  },
  // 禁用 Attribute 继承
  inheritAttrs: false,
  // 自定义事件名称的数组
  emits: ['file-upload-success', 'file-upload-error'],
  setup(props, context) {
    // 获取上传文件的 DOM 节点
    const fileInput = ref<null | HTMLInputElement>(null)

    // 初始化文件上传的状态
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')

    // 获取插槽上的值，传递给父组件
    const uploadedData = ref(props.uploaded)

    // 监听父组件传递过来的 uploaded 值
    watch(
      () => props.uploaded,
      (newValue) => {
        if (newValue) {
          fileStatus.value = 'success' // 更改成功状态
          uploadedData.value = newValue // 更新 uploadedData 的值
        }
      }
    )

    // 点击 btn 按钮，触发 input 上传文件的事件
    const triggerUpload = () => {
      // fileInput.value 是上传文件的 DOM 节点
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    // 创建选择了文件的事件，当 input 改变（change）的时候就触发
    const handelFileChange = (e: Event) => {
      // 创建要获取到的 input 元素
      // 使用 as 类型断言是为了获取到 input 上面的 files 属性
      const currentTarget = e.target as HTMLInputElement

      // 判断是否选择了文件
      if (currentTarget.files) {
        // 上传文件的流程
        // 1、将上传的文件合并为一个数组
        const files = Array.from(currentTarget.files)

        // 先检查当前上传的文件是否满足用户自定义需求
        if (props.beforeUpload) {
          // 检查当前上传的文件是否满足用户自定义的一个标识符
          const result = props.beforeUpload(files[0])

          // 如果当前文件不满足用户自定义的话，那么就直接 return，不再执行下面的代码
          if (!result) {
            return
          }
        }

        // 改变文件上传的状态
        fileStatus.value = 'loading'
        // 2、创建 FormData 实例
        const formData = new FormData()
        // 3、将第一个文件放入 formData 实例对象中，只能上传一个文件
        formData.append('file', files[0])
        // 4、发送请求
        axios
          .post(props.action, formData, {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          })
          .then((res) => {
            // 请求成功后改变上传文件的状态
            fileStatus.value = 'success'

            // 给插槽内的值赋值
            uploadedData.value = res.data

            // 上传文件成功触发自定义成功的一个事件
            context.emit('file-upload-success', res.data)
          })
          .catch((err) => {
            // 请求失败后改变上传文件的状态
            fileStatus.value = 'error'

            // 上传文件是把你触发自定义失败的一个事件
            context.emit('file-upload-error', { err })
          })
          // 这个红色提示只是编辑器的提示，功能可以正常操作
          .finally(() => {
            if (fileInput.value) {
              // fileInput.value 是上传文件的 DOM 节点
              // fileInput.value.value 才是这个节点的 value 内容
              fileInput.value.value = ''
            }
          })
      }
    }
    return {
      fileInput, // 上传文件的表单
      fileStatus, // 文件上传 input 当前状态
      uploadedData, // 获取插槽上的值，传递给父组件
      triggerUpload, // 上传文件的事件
      handelFileChange // 选择了文件事件
    }
  }
})
</script>

<style lang="less" scoped></style>
