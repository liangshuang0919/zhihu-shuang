<template>
  <div class="validate-input-container pb-3">
    <input class="form-control" :class="{ 'is-invalid': inputRef.error }" :value="inputRef.val" @blur="validateInput" @input="updateValue" v-bind="$attrs" />
    <span v-show="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 中的方法
import { defineComponent, reactive, PropType, onMounted } from 'vue';

// 导入 ValidateForm.vue 组件的 emitter 监听器
import { emitter } from './ValidateForm.vue';

// 初始化表单验证时候的验证规则，合并成一个接口
interface RuleProp {
  type: 'required' | 'email' | 'pwdLength'; // 验证类型，可扩展的
  // required 为必填，不能为空
  // email 为验证输入的是不是一个邮箱
  message: string; // 验证出现问题的时候，提示的错误
}

// 因为表单验证的时候可以使用一系列的规则，所以将要用到的规则合并为一个数组
export type RulesProp = RuleProp[];

// 验证邮箱书写规则的正则表达式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>, // 从父组件传递过来的规则数组
    modelValue: String // 进行表单双向绑定的 modelValue 值
  },
  inheritAttrs: false, // 禁用 Attribute 继承
  setup(props, context) {
    // console.log(context.attrs); // 这是 input 表单的各个属性值

    // 表单输入框的一些信息
    const inputRef = reactive({
      val: props.modelValue || '', // 输入框的内容
      error: false, // 验证是否报错
      message: '' // 错误信息
    });

    // 进行数据双向绑定的事件，实时更新表单输入的内容
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value; // 存储表单内部输入的内容
      inputRef.val = targetValue; // 将表单的内容赋值给要进行渲染的数据变量
      context.emit('update:modelValue', targetValue); // vue3 进行数据双向绑定的写法，要创建一个 update:modelValue 方法
    };

    // 失去焦点的时候要发生的回调函数，对表单进行一个验证
    const validateInput = () => {
      // 判断验证的规则是否存在
      if (props.rules) {
        // 下面要遍历判断传递的规则，每一个是否符合验证规则
        // 数组中的每一项进行规则盘算
        const allPassed = props.rules.every((rule) => {
          let passFlag = true; // 一个临时变量，用来存储当前的规则是否通过
          inputRef.message = rule.message; // 没有判断的时候，先让 inputRef 中存储错误信息的 message，等于传递过来的数组中每一项的错误信息
          switch (rule.type) {
            case 'required':
              passFlag = inputRef.val.trim() !== '';
              break;
            case 'email':
              passFlag = emailReg.test(inputRef.val.trim());
              break;
            case 'pwdLength':
              passFlag = inputRef.val.trim().length >= 6 && inputRef.val.trim().length <= 14;
              break;
            default:
              break;
          }
          return passFlag;
        });

        // 最后表单的错误信息是上面遍历数组规则结果的取反
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };

    // 页面加载的时候触发 emitter 监听器，进行组件间通信
    onMounted(() => {
      emitter.emit('form-item-created', validateInput);
    });

    return {
      inputRef, // 表单的内容，会在页面中渲染出了
      updateValue, // 数据的双向绑定，获取表单输入的内容
      validateInput // 表单失去焦点的时候的回调函数，进行表单验证
    };
  }
});
</script>

<style scoped></style>
