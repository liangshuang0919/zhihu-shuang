<template>
  <!-- 文章详情页组件 -->
  <div class="post-detail-page">
    <!-- 删除文章的提示框组件 -->
    <modal title="删除文章" :visible="modalIsVisible" @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete">
      <p>确定要删除这篇文章吗？</p>
    </modal>

    <!-- 文章展示组件 -->
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <!-- 文章的图片 -->
      <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4"
        :v-if="currentImageUrl ? true : false">

      <!-- 文章的标题 -->
      <h2 class="mb-4">{{ currentPost.title }}</h2>

      <!-- 用户信息的展示 -->
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'">
          </user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{currentPost.createdAt}}</span>
      </div>

      <!-- 文章内容的展示 -->
      <div v-html="currentHTML"></div>

      <!-- 如果是自己的文字，则可以显示编辑删除按钮 -->
      <div v-if="true" class="btn-group mt-5">
        <router-link type="button" class="btn btn-success" :to="{name: 'createpost', query: {id: currentPost._id }}">
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
// 导入要用到的 vue 中的方法
import { defineComponent, onMounted, computed, ref } from 'vue'

// 导入初始化 vuex 的方法
import { useStore } from 'vuex'

// 导入 vuex 用到的数据类型接口
import { GlobalDataProps, PostProps, ImageProps, UserProps, ResponseType } from '../../store'

// 导入初始化 vue-router 的方法
import { useRoute, useRouter } from 'vue-router'

// 导入 MarkdownIt 插件，将 markdown 格式的文本转换为 html 文本
import MarkdownIt from 'markdown-it'

// 导入自定义的文本提示框方法
import createMessage from '../../hooks/useMessage'

// 导入组件
// 自定义的展示用户信息的组件
import UserProfile from '../../components/UseProfileComponent/UserProfile.vue'
// 导入提示框（点击自己的文章的删除按钮，跳出来确认操作的提示框）
import Modal from '../../components/ModalComponent/Modal.vue'

export default defineComponent({
  name: 'post-detail',
  components: {
    UserProfile, // 用户信息的组件
    Modal // 提示框组件
  },
  setup() {
    // 初始化 vuex
    const store = useStore<GlobalDataProps>()

    // 初始化 vue-router
    const route = useRoute()
    const router = useRouter()

    // 控制提示框显示隐藏
    const modalIsVisible = ref(false)

    // 获取当前动态路由的 id（也就是文字的 id）
    const postId = route.params.id

    // 初始化 MarkdownIt 插件
    const md = new MarkdownIt()

    // 页面挂在的时候，调用 fetchPost 事件，获取文章的详细数据
    onMounted(() => {
      store.dispatch('fetchPost', postId)
    })

    // 通过动态路由找到对应 id 的文章数据
    const currentPost = computed<PostProps>(() => store.getters.getPostById(postId))

    // 创建要渲染在页面上的 html 内容
    const currentHTML = computed(() => {
      // 获取到文章的内容数据，和判断这个是不是 html 格式
      const { content, isHTML } = currentPost.value

      // 如果找到了对应 id 的文章，并且也有文章内容，那么将其 markdown 文档渲染为 html 格式
      if (currentPost.value && content) {
        return isHTML ? content : md.render(content)
      }
      return isHTML
    })

    // 获取专栏图片
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value

        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })

    // 是否显示编辑、删除按钮区域
    const showEditArea = computed(() => {
      // 获取登陆的信息
      const { isLogin, _id } = store.state.user

      // 判断文章数据是否存在；该文章的作者是否存在；当用户是否登录
      if (currentPost.value && currentPost.value.author && isLogin) {
        // 对文章的作者做一个类型的断言，让其等于 UserProps 类型
        const postAuthor = currentPost.value.author as UserProps

        // 返回一个 boolean 值：当前文章作者的 id，与当前登录的用户的 id 是否相等
        return postAuthor._id === _id
      } else {
        return false
      }
    })

    // 删除文章的事件
    const hideAndDelete = () => {
      // 将提示框先隐藏
      modalIsVisible.value = false

      // 发送删除文章时间请求
      store.dispatch('deletePost', postId).then((rawData: ResponseType<PostProps>) => {
        createMessage('删除成功，2s 后跳转到专栏首页', 'success')

        // 路由跳转
        setTimeout(() => {
          router.push({
            name: 'column',
            params: {
              id: rawData.data.column
            }
          })
        }, 2000)
      })
    }

    return {
      currentPost, // 文章数据
      currentImageUrl, // 要渲染的专栏的图片
      currentHTML, // 要渲染的文章内容
      showEditArea, // 是否显示编辑文章的按钮
      modalIsVisible, // 控制提示框的显示隐藏
      hideAndDelete // 删除文章的事件
    }
  }
})
</script>
