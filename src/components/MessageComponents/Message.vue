<template>
  <!-- 消息提示框前面的图标 -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <!-- 成功的消息图标 -->
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </symbol>

    <!-- 失败的消息图标 -->
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path
        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </symbol>
  </svg>

  <!-- 全局页面的一个提示信息框 -->
  <teleport to='#message'>
    <!-- 成功的提示框 -->
    <div class="message-box alert d-flex align-items-center alert-dismissible fixed-top w-50 mx-auto" :class="classObject"
      v-if="isVisible">
      <!-- 提示框前面的图标 -->
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img">
        <use :xlink:href="messageIcon" />
      </svg>

      <!-- 提示框的内容 -->
      <div>{{ message }}</div>

      <!-- 关闭提示框的按钮 -->
      <button type="button" class="btn-close" aria-label="Close" @click.prevent="closeMessage"></button>
    </div>
  </teleport>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, PropType, ref } from 'vue'

// 导入创建节点的方法，这个是为了给 teleport 标签创建一个对应的 id 与 to 属性一致的 div 节点
import useDOMCreate from '../../hooks/useDOMCreate'

// 提示框类型的接口
export type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  name: 'Message',
  props: {
    message: String, // 提示框的内容
    // 定义提示框的属性
    type: {
      type: String as PropType<MessageType>, // 提示框的类型
      default: 'default' // 提示框的默认类型
    }
  },
  // 事件名的数组
  emits: ['close-message'],
  setup(props, context) {
    // 创建与 teleport 标签对应的 div 节点
    useDOMCreate('message')

    // 控制提示框显示隐藏
    const isVisible = ref(true)

    // 提示框的样式对象
    const classObject = {
      'alert-success': props.type === 'success', // 成功样式
      'alert-danger': props.type === 'error', // 失败样式
      'alert-primary': props.type === 'default' // 普通样式
    }

    // 提示框前面的小图标
    const messageIcon = props.type === 'success' ? '#check-circle-fill' : props.type === 'error' ? '#exclamation-triangle-fill' : '#info-fill'

    // 关闭提示框的事件
    const closeMessage = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }

    return {
      classObject, // 提示框的类名对象
      isVisible, // 控制提示框的显示隐藏
      messageIcon, // 提示框前面的小图标
      closeMessage // 关闭提示框的事件
    }
  }
})
</script>

<style lang="less" scoped>
.message-box {
  margin-top: 86px;
}
</style>
