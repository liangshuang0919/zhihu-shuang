<template>
  <teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{backgroundColor: bgcolor || ''}">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <!-- 属性 sr-only 是为了残障人士所创建的，可以播放内容 -->
          <span class="sr-only visually-hidden">{{ text || 'Loading...'}}.</span>
        </div>
        <p v-if="text" class="text-primary">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
// 导入 vue 中的方法
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String
    },
    bgcolor: {
      type: String
    }
  },
  setup() {
    // 组件加载的时候创建一个节点，为了将该组件放在这个节点中，使其与 #app 节点平行
    // 这个是为了解决使用 teleport 节点的时候，还要给 index.html 添加一个 div 节点
    const node = document.createElement('div')
    node.id = 'back'
    document.body.appendChild(node)

    // 组件销毁的时候，将创建的节点移除
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style lang="less" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  z-index: 100;
  text-align: center;
}
</style>
