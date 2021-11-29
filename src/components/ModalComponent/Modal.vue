<template>
  <!-- 提示框组件区域 -->
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <!-- 提示框的标题 -->
            <h5 class="modal-title">{{ title }}</h5>

            <!-- 关闭提示框的按钮 -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" @click="onClose">&times;</span>
            </button>
          </div>

          <!-- 插槽，可以自定义中间的内容 -->
          <div class="modal-body">
            <slot></slot>
          </div>

          <!-- 取消、确定按钮 -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="onClose">取消</button>
            <button type="button" class="btn btn-primary" @click="onConfirm">确定</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
// 导入要用到的 vue 的方法
import { defineComponent } from 'vue'

// 导入自定义的创建 DOM 节点的函数
import useDOMCreate from '../../hooks/useDOMCreate'

export default defineComponent({
  name: 'modal',
  props: {
    title: String, // 提示框的标题
    // 父组件传来的控制提示框是否显示
    visible: {
      type: Boolean,
      default: false
    }
  },
  // 自定义子传父的事件名
  emits: ['modal-on-close', 'modal-on-confirm'],
  setup(props, context) {
    // 创建一个 id 为 modal 的 DOM 节点
    useDOMCreate('modal')

    // 点击关闭按钮，关闭提示框
    const onClose = () => {
      context.emit('modal-on-close')
    }

    // 点击确定按钮，确认删除文章
    const onConfirm = () => {
      context.emit('modal-on-confirm')
    }

    return {
      onClose, // 关闭提示框
      onConfirm // 确认删除文字
    }
  }
})
</script>

<style lang="less" scoped></style>
