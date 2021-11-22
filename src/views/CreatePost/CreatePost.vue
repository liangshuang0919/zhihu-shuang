<template>
  <!-- 创建文章页面 -->
  <div class="create-post-page">
    <h4>新建文章</h4>

    <!-- 整个表单区域 -->
    <validate-form @form-submit="onFormSubmit">
      <!-- 文章标题区域 -->
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>

      <!-- 专栏详情区域 -->
      <div class="mb-3">
        <label class="form-label">专栏详情：</label>
        <validate-input :rules="contentRules" v-model="contentVal" placeholder="请输入专栏详情" tag="textarea" rows="12" />
      </div>

      <!-- 发表文章按钮 -->
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 的方法
import { defineComponent, ref } from 'vue'

// 导入 vuex 的获取 vuex 数据的 useStore 方法
import { useStore } from 'vuex'

// 导入 vuex 中的两个数据
import { GlobalDataProps, PostProps } from '../../store'

// 导入 vue-router 的 useRouter 和 useRoute 方法
// useRouter 获取路由器，用来进行路由的跳转
// useRoute 是获取跳转的路由对象，上面有各种方法
import { useRouter } from 'vue-router'

// 导入组件
// 导入 ValidateForm.vue 表单组件
import ValidateForm from '../../components/ValidateComponents/ValidateForm.vue'
// 导入 ValidateInput.vue 输入框组件
import ValidateInput, { RulesProp } from '../../components/ValidateComponents/ValidateInput.vue'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    // 获取路由器，用来进行路由的跳转
    const router = useRouter()

    // 获取 vuex 的数据
    const store = useStore<GlobalDataProps>()

    // 文章标题双向绑定的内容
    const titleVal = ref('')
    // 制定文章标题的输入规则
    const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]

    // 文章内容双向绑定的内容
    const contentVal = ref('')
    // 制定文章内容的输入规则
    const contentRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]

    // 发表文章按钮的事件
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user // 获取用户信息中心的文章专栏 id 号

        // 因为 columnId 可能不存在，直接创建新文章的话，columnId 可能为 undefined，会报错
        // 先判断 columnId 是否存在，再创建新的文章到数据中
        if (columnId) {
          const newPost: PostProps = {
            _id: new Date().getTime(), // 设置新创建的文章的 id
            title: titleVal.value, // 设置新创建的文章的标题
            content: contentVal.value, // 设置新创建的文章的内容
            createdAt: new Date().toLocaleString(), // 设置新创建的文章的创建时间
            column: columnId + '' // 对应专栏的 id
          }

          // 新的文章添加给 vuex 的方法，添加到数据当中
          store.commit('createPost', newPost)

          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }

    return {
      titleVal, // 文章标题双向绑定的内容
      titleRules, // 文章标题的输入规则
      contentVal, // 文章内容双向绑定的内容
      contentRules, // 文章内容的输入规则
      onFormSubmit // 发表文章事件
    }
  }
})
</script>

<style lang="less" scoped>
.create-post-page {
  .file-upload-container {
    height: 200px;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.uploaded-area {
  position: relative;

  &:hover h3 {
    display: block;
  }

  h3 {
    display: none;
    position: absolute;
    color: #999;
    text-align: center;
    width: 100%;
    top: 50%;
  }
}
</style>
