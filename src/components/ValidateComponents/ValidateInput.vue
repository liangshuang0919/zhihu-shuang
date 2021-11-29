<template>
  <div class="validate-input-container pb-3">
    <input v-if="tag !== 'textarea'" class="form-control" :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput" v-bind="$attrs" v-model="inputRef.val" />
    <textarea v-else style="resize: none" class="form-control" :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput" v-bind="$attrs" v-model="inputRef.val" />
    <span v-show="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 中的方法
import { defineComponent, reactive, PropType, onMounted, computed } from 'vue'

// 导入 ValidateForm.vue 组件的 emitter 监听器
import { emitter } from './ValidateForm.vue'

// 初始化表单验证时候的验证规则，合并成一个接口
interface RuleProp {
  type: 'required' | 'email' | 'pwdLength' | 'nick_name' | 'custom' // 验证类型，可扩展的
  // required 为必填，不能为空
  // email 为验证输入的是不是一个邮箱
  // pwdLength 为密码的长度
  // nick_name 为验证昵称的长度
  // custom 如果规则返回一个方法，为方法的返回值
  message: string // 验证出现问题的时候，提示的错误
  validator?: () => boolean // 返回一个函数，比如验证重复密码是否与输入的密码一致
}

// 因为表单验证的时候可以使用一系列的规则，所以将要用到的规则合并为一个数组
export type RulesProp = RuleProp[]

// 创建一个 TagType 规则，控制输入框标签显示 input 还是 textarea 标签
export type TagType = 'input' | 'textarea'

// 验证邮箱书写规则的正则表达式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>, // 从父组件传递过来的规则数组
    modelValue: String, // 进行表单双向绑定的 modelValue 值
    // 控制输入框标签的类型，是为 input 还是 textarea
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false, // 禁用 Attribute 继承
  setup(props, context) {
    // console.log(context.attrs); // 这是 input 表单的各个属性值

    // 表单输入框的一些信息
    const inputRef = reactive({
      // 输入框的内容，使用计算属性的 get 和 set 方法
      val: computed({
        get: () => props.modelValue || '',
        set: (val) => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false, // 验证是否报错
      message: '' // 错误信息
    })

    // 失去焦点的时候要发生的回调函数，对表单进行一个验证
    const validateInput = () => {
      // 判断验证的规则是否存在
      if (props.rules) {
        // 下面要遍历判断传递的规则，每一个是否符合验证规则
        // 数组中的每一项进行规则盘算
        const allPassed = props.rules.every((rule) => {
          let passFlag = true // 一个临时变量，用来存储当前的规则是否通过
          inputRef.message = rule.message // 没有判断的时候，先让 inputRef 中存储错误信息的 message，等于传递过来的数组中每一项的错误信息
          switch (rule.type) {
            case 'required':
              passFlag = inputRef.val.trim() !== ''
              break
            case 'email':
              passFlag = emailReg.test(inputRef.val.trim())
              break
            case 'pwdLength':
              passFlag = inputRef.val.trim().length >= 6 && inputRef.val.trim().length <= 14
              break
            case 'nick_name':
              passFlag = inputRef.val.trim().length >= 2 && inputRef.val.trim().length <= 10
              break
            case 'custom':
              // 如果验证规则返回的函数的话，则执行该函数；否则返回 true
              passFlag = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passFlag
        })

        // 最后表单的错误信息是上面遍历数组规则结果的取反
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    // 页面加载的时候触发 emitter 监听器，进行组件间通信
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    return {
      inputRef, // 表单的内容，会在页面中渲染出了
      validateInput // 表单失去焦点的时候的回调函数，进行表单验证
    }
  }
})
</script>

<style lang="less" scoped></style>
