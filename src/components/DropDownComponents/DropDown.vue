<template>
  <div class="dropdown" ref="dropdownRef">
    <button type="button" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="dropdownOpen">
      {{ title }}
    </button>
    <ul class="dropdown-menu dropdown-menu-end" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
// 导入 vue 中的事件
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const dropdownRef = ref<null | HTMLElement>(null) // 获取整个页面节点

    const isOpen = ref(false) // 控制下拉菜单显示隐藏

    // 点击右上角按钮控制下拉菜单显示隐藏的事件
    const dropdownOpen = () => {
      isOpen.value = !isOpen.value
    }

    // 点击右上角按钮以外的地方控制下拉菜单隐藏事件
    const dropdownClose = (e: MouseEvent) => {
      if (dropdownRef.value) {
        // 下面的逻辑是
        // !dropdownRef.value.contains(e.target as HTMLElement) 点击右上角的 button 以外的 dom 触发
        // isOpen.value 下拉菜单同时打开的情况
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    }

    // 页面挂载时的生命周期
    onMounted(() => {
      // 将点击空白页关闭下拉菜单事件挂载在 document 上
      document.addEventListener('click', dropdownClose)
    })

    // 页面销毁时的生命周期
    onUnmounted(() => {
      // 将点击空白页关闭下拉菜单事件销毁
      document.removeEventListener('click', dropdownClose)
    })

    // 返回数据
    return {
      dropdownRef,
      isOpen,
      dropdownOpen
    }
  }
})
</script>

<style scoped></style>
