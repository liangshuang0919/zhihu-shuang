### zhihu-shuang

爽的仿知乎项目 ts + vue3

### 安装依赖

`npm install`

### 项目结构

① 项目文件夹名称：zhihu-shuang

② `public`文件夹：里面放的是 ico 图标和打包后的 index.html 文件

③ `src` 文件夹：项目书写的所有页面代码和资源

1.  `assets` ：里面有 images 图片资源文件夹

2. `components`

   ① `ColumnComponents`

   ​	Ⅰ. `ColumnList.vue` ：主页专栏列表展示的组件

   ② `DropDownComponents`

   ​	Ⅰ. `DropDown.vue`：头部下拉菜单组件

   ​	Ⅱ. `DropDownItem.vue`：头部下拉菜单中每一个选项的组件

   ③ `FooterConponent`

   ​	Ⅰ. `GlobalFooter.vue`：全局底部区域组件

   ④ `HeaderComponent`

   ​    Ⅰ. `GlobalHeader.vue` 文件：全局中头部组件

   ⑤ `LoadingComponent `

   ​	Ⅰ.  `Loading.vue`：全局的加载等待组件

   ⑥ `MessageComponents`

   ​	Ⅰ. `Message.vue `：全局的一个模态框，提示确认取消的框

   ⑦ `ModalComponent`

   ​	Ⅰ.  `Modal.vue`：全局的一个模态框，提示确认取消的框

   ⑧ `PostComponent`

   ​	Ⅰ. `PostList.vue`：专栏详情页，显示文章列表的组件

   ⑨ `UploaderComponent`

   ​	Ⅰ. `Uploader.vue`：上传文件的组件

   ⑩ `UseProfileComponent`

   ​	Ⅰ.  `UserProfile.vue`：展示文章中，用户信息那一栏的组件

   ⑪ `ValidateComponents`：对表单进行处理

   ​	Ⅰ.  `ValidateForm.vue`：将表单整合一起，设置插槽

   ​	Ⅱ. `ValidateInput.vue`：表单验证规则、表单的数据双向绑定

3. `hooks`

   ① `helper.ts`：自定义的各种全局的功能函数

   ② `useClickOutside.ts`：自定义的 useClickOutside 方法，点击 header 区域右上角的下拉列表以外的区域，下拉列表将会

   ③ `useDOMCreate.ts`：在全局中挂载一个有具体 id 的 div 节点并销毁的组件（为了方便 teleport 的使用）

   ④ `useLoadMore.ts` ：加载更多的方法

   ⑤`useMessage.ts`：在全局中展示提示框的函数

5. `router`

   ① `index.ts` ：`vue-router` 配置文件

5.  `store.ts`

    ① `index.ts`：vuex 配置文件

6. `views`
   ① `ColumnDetails` 中的 `ColumnDetails.vue` 是专栏详情页的页面

   ② `CreatePost` 中的 `CreatePost.vue` 是创建文章和编辑文章的页面

   ③ `EditData` 中的 `EditData.vue` 是编辑用户资料的页面

   ④ `Home` 中的 `Home.vue` 是主页页面

   ⑤ `Login` 中的 `Login.vue` 是登录页面

   ⑥ `PostDetail` 中的 `PostDetail.vue` 是文章详情页的页面

   ⑦ `Register` 中的 `Register.vue` 是注册页面
