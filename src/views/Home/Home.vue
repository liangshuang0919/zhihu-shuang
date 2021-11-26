<template>
  <!-- 首页区域 -->
  <div class="home-page">
    <section class="py-5 text-center container">
      <!-- 首页内容 “随心写作，自由表达” 区域 -->
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../../assets/images/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/createpost" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>

    <!-- 首页专栏的标题 -->
    <h4 class="font-weight-bold text-center">发现精彩</h4>

    <!-- 首页的专栏区域 -->
    <column-list :list="columnData" />

    <!-- <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25" @click="loadMorePage" v-if="!isLastPage">加载更多</button> -->
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 方法
import { defineComponent, computed, onMounted } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 vuex 中定义的全局数据 GlobalDataProps 接口, FileProps, ImageProps
import { GlobalDataProps } from '../../store'

// 导入首页专栏部分组件和定义的 ColumnProps 数据类型
import ColumnList from '../../components/ColumnComponents/ColumnList.vue'
// 导入全局的一个消息提示框组件
import createMessage from '../../hooks/useMessage'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList // 注册首页专栏部分组件
  },
  setup() {
    // 获取全局 vuex 数据
    const store = useStore<GlobalDataProps>()

    // 页面最开始加载的时候，获取后端的专栏列表数据，将其渲染在页面上
    onMounted(() => {
      store.dispatch('fetchColumns')
    })

    // 通过 vuex 获取全局的一个首页专栏列表的数据
    const columnData = computed(() => store.state.columns)

    // 创建一个用户检查上传文件类型的一个自定义事件
    const beforeUpload = (file: File) => {
      // 检查当前文件是否为 JPG 的格式
      const isImage = file.type === 'image/jpeg'

      // 当文件不是 JPG 格式的时候
      if (!isImage) {
        createMessage('上传的图片只能是 JPG 格式，请重新选择图片！', 'error')
      }

      return isImage
    }

    // 子组件上传文件成功，返回给父组件一个上传成功的事件
    // 将返回的数据 rawData 定义成 FileProps 类型
    // 将 FileProps 中的 data 类型定义为 ImageProps 泛型
    // const onFileUploadedSuccess = (rawData: FileProps<ImageProps>) => {
    //   createMessage(`成功上传图片ID ${rawData.data._id}`, 'success')
    // }

    // 子组件上传文件失败，返回给父组件一个上传失败的事件
    // const onFileUploadedError = (rawData: FileProps<ImageProps>) => {
    //   createMessage(`上传图片失败ID ${rawData.data._id}`, 'error')
    // }

    return {
      columnData, // 首页专栏列表的数据
      beforeUpload // 创建一个用户检查上传文件类型的一个自定义事件
      // onFileUploadedSuccess, // 子组件上传文件成功，返回给父组件一个上传成功的事件
      // onFileUploadedError // 子组件上传文件失败，返回给父组件一个上传失败的事件
    }
  }
})
</script>

<style scoped></style>
