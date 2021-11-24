// 在方法中创建一个组建市实例，需要使用 createApp 这个 api
import { createApp } from 'vue'

// 将消息提示的组件通过函数回调的形式展示
import Message from '../components/MessageComponents/Message.vue' // 导入提示框组件

// 提示框类型的接口
export type MessageType = 'success' | 'error' | 'default'

// 定义创建提示框的函数
// 参数一：message 是提示框要显示的内容
// 参数二：type 是提示框的类型
// 参数三：timeout 是提示框存在的时间
const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  // createApp 方法有两个参数
  // 参数一：Message 接收的就是一个组件
  // 参数二：props 是这个 Message 组件的 props 值（父组件传递过来的）
  const messageInstance = createApp(Message, {
    message,
    type
  })

  // 创建一个要挂载的 div 节点
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)

  // 将创建的 messageInstance 实例挂载到 mountNode 这个节点上
  messageInstance.mount(mountNode)

  // 设置一个定时器
  setTimeout(() => {
    // 定时器结束后将提示框的实例清除掉
    messageInstance.unmount()

    // 定时器结束后将提示框的节点清除掉
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
