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
import { defineComponent } from 'vue'

// 导入创建节点的方法，这个是为了给 teleport 标签创建一个对应的 id 与 to 属性一致的 div 节点
import useDOMCreate from '../../hooks/useDOMCreate'

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
    // 创建与 teleport 标签对应的 div 节点
    useDOMCreate('message')
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
