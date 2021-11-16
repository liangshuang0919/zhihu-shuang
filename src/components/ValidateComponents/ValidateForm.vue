<template>
  <form class="validate-form-container">
    <!-- 默认插槽区域 -->
    <slot name="default"></slot>

    <!-- 提交按钮区域 -->
    <div class="submit-area" @click.prevent="submitFrom">
      <!-- 提交按钮插槽区域 -->
      <slot name="submit">
        <!-- 默认内容 -->
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ValidateForm',
  // 自定义要触发的事件名
  emits: ['form-submit'],
  setup(props, context) {
    // 表单提交事件
    const submitFrom = () => {
      context.emit('form-submit', true);
    };

    return {
      submitFrom // 表单提交事件
    };
  }
  // mounted() {
  //   this.$on('item-created', () => {});
  // }
});
</script>

<style lang="less" scoped>
.submit-area {
  text-align: center;
}
</style>
