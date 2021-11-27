<template>
  <!-- 专栏详情页头部区域 -->
  <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
    <!-- 专栏详情页的图片 -->
    <div class="col-3 text-center">
      <img :src="column.avatar.url" :alt="column.title" class="rounded-circle border w-100" />
    </div>

    <!-- 专栏详情页的内容 -->
    <div class="col-9">
      <!-- 专栏详情页的题目 -->
      <h3>{{ column.title }}</h3>
      <!-- 专栏详情页的文章内容 -->
      <p class="text-muted">{{ column.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
// 导入将要用到的 vue 的方法
import { defineComponent, PropType, reactive, toRefs } from 'vue'

// 导入页面所需要的数据
import { ColumnProps } from '../../store'

export default defineComponent({
  name: 'PostHeader',
  props: {
    // 父组件 ColumnDetails.vue 传过来的值
    column: {
      required: true,
      type: Object as PropType<ColumnProps>
    }
  },
  setup() {
    // 因为传过来的 column 为对象类型，需要使用 reactive 方法进行整合
    const column = reactive({})
    // 经过 reactive 方法进行整合之后，还要用 toRefs 方法对值进行一次拷贝
    const tefColumn = toRefs(column)

    return {
      tefColumn // 这个就是 column
    }
  }
})
</script>

<style scoped></style>
