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

<script lang="ts">
// 导入 vue 中要使用到的事件
import { defineComponent, onUnmounted } from 'vue';

// 导入 mitt 插件
import mitt from 'mitt';

// 创建 mitt 监听器
export const emitter = mitt();

type ValidateFunc = () => boolean;

export default defineComponent({
  name: 'ValidateForm',
  // 自定义要触发的事件名
  emits: ['form-submit'],
  setup(props, context) {
    // 创建一个数组，存储一些列的函数
    // 用来接收的是 ValidateInput.vue 组件，对每一个输入框表单进行校验后的结果
    let funcArr: ValidateFunc[] = [];

    // 表单提交事件
    const submitFrom = () => {
      const result = funcArr.map((func) => func()).every((result) => result);
      context.emit('form-submit', result);
    };

    // 这个是用来进行组件间通信的回调函数
    const callback = (func: ValidateFunc) => {
      funcArr.push(func);
    };

    // 将组件间通信的回调函数注册给 emitter 监听器
    // 参数一是要定义的事件名称；参数二是上面创建的回调函数
    emitter.on('form-item-created', callback);

    // 组件销毁的时候要将 emitter 监听器销毁掉
    onUnmounted(() => {
      emitter.off('form-item-created');
      funcArr = [];
    });

    return {
      submitFrom // 表单提交事件
    };
  }
});
</script>

<style lang="less" scoped>
.submit-area {
  text-align: center;
}
</style>
