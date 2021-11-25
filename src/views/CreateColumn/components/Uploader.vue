<template>
  <!-- 上传文章的组件 -->
  <div class="file-upload">
    <button class="btn btn-primary" @click="triggerUpload">
      <span v-if="fileStatus === 'loading'">正在上传...</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else>点击上传</span>
    </button>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handelFileChange">
  </div>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, ref } from 'vue'

// 导入 axios 模块
import axios from 'axios'

// 指示上传文件的状态，在不同的阶段显示不同的样式
// ready：准备阶段
// loading：上传阶段
// success：上传成功
// error：上传失败
export type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

export default defineComponent({
  name: 'Uploader',
  props: {
    // 上传文件的 url 地址
    action: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 获取上传文件的 DOM 节点
    const fileInput = ref<null | HTMLInputElement>(null)

    // 初始化文件上传的状态
    const fileStatus = ref<UploadStatus>('ready')

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
        // 改变文件上传的状态
        fileStatus.value = 'loading'

        // 上传文件的流程
        // 1、将上传的文件合并为一个数组
        const files = Array.from(currentTarget.files)
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
            console.log(res)
          })
          .catch((err) => {
            // 请求失败后改变上传文件的状态
            fileStatus.value = 'error'
            console.log(err)
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
      triggerUpload, // 上传文件的事件
      handelFileChange // 选择了文件事件
    }
  }
})
</script>

<style lang="less" scoped></style>
