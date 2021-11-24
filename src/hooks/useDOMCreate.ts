// 创建节点的方法
import { onUnmounted } from 'vue'

function useDOMCreate(nodeId: string) {
  // 组件加载的时候创建一个节点，为了将该组件放在这个节点中，使其与 #app 节点平行
  // 这个是为了解决使用 teleport 节点的时候，还要给 index.html 添加一个 div 节点
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node)

  // 组件销毁的时候，将创建的节点移除
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default useDOMCreate
