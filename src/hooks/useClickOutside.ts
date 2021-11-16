import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }

  // 页面挂载时的生命周期
  onMounted(() => {
    // 将点击空白页关闭下拉菜单事件挂载在 document 上
    document.addEventListener('click', handler)
  })

  // 页面销毁时的生命周期
  onUnmounted(() => {
    // 将点击空白页关闭下拉菜单事件销毁
    document.removeEventListener('click', handler)
  })

  return isClickOutside
}

export default useClickOutside
