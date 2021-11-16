<template>
  <div class="validate-input-container pb-3">
    <input type="email" class="form-control" :class="{ 'is-invalid': inputRef.error }" v-model="inputRef.val" @blur="validateInput" />
    <span v-show="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'

// 初始化表单验证时候的验证规则，合并成一个接口
interface RuleProp {
  type: 'required' | 'email' // 验证类型，可扩展的
  // required 为必填，不能为空
  // email 为验证输入的是不是一个邮箱
  message: string // 验证出现问题的时候，提示的错误
}

// 因为表单验证的时候可以使用一系列的规则，所以将要用到的规则合并为一个数组
export type RulesProp = RuleProp[]

// 验证邮箱书写规则的正则表达式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>
  },
  setup(props) {
    // 表单输入框的一些信息
    const inputRef = reactive({
      val: '', // 输入框的内容
      error: false, // 验证是否报错
      message: '' // 错误信息
    })

    // 失去焦点的时候要发生的回调函数，对表单进行一个验证
    const validateInput = () => {
      // 判断验证的规则是否存在
      if (props.rules) {
        // 下面要遍历判断传递的规则，每一个是否符合验证规则
        // 数组中的
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
            default:
              break
          }
          return passFlag
        })

        inputRef.error = !allPassed
      }
    }

    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style scoped></style>
