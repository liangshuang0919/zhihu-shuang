<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <!-- GlobalHeader.vue 里面的 drop-down-item 标签内部写 disabled，这个按钮的选项就会禁用掉 -->
    <slot></slot>
  </li>
</template>

<script  lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropDownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="less" scoped>
.is-disabled {
  pointer-events: none;
  background-color: transparent;
  color: red;
}
</style>
