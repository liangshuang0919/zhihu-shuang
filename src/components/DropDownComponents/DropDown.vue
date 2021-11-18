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
import { defineComponent, ref, watch } from 'vue';

// 导入点击下拉框外部，关闭下拉框事件
import useClickOutside from '../../hooks/useClickOutside';

export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false); // 控制下拉菜单显示隐藏

    const dropdownRef = ref<null | HTMLElement>(null); // 获取整个页面节点

    // 点击右上角按钮控制下拉菜单显示隐藏的事件
    const dropdownOpen = () => {
      isOpen.value = !isOpen.value;
    };

    // 点击右上角按钮外部使其隐藏
    const isClickOutside = useClickOutside(dropdownRef);
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false;
      }
    });

    // 返回数据
    return {
      dropdownRef,
      isOpen,
      dropdownOpen
    };
  }
});
</script>

<style scoped></style>
