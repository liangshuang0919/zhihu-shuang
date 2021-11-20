### zhihu-shuang

爽的仿知乎项目 ts + vue3

### 安装依赖

`npm install`

### 项目结构

① 项目文件夹名称：zhihu-shuang

② `public`文件夹：里面放的是 ico 图标和打包后的 index.html 文件

③ `src` 文件夹：项目书写的所有页面代码和资源

1.  `assets` 文件夹：里面有 images 图片资源文件夹
    
2. `components` 文件夹：所有的页面组件

   ① `ColumnComponents` 文件夹：主页专栏的组件

   ​	Ⅰ. `ColumnList.vue` 文件：主页专栏列表展示的组件

   ② `HeaderComponent` 文件夹：所有页面中 header 头部区域的组件

   ​    Ⅰ. `GlobalHeader.vue` 文件：全局中头部组件

   ③ `DropDownComponents`	 文件夹：头部组件右上角的下拉菜单

   ​	Ⅰ. `DropDown.vue` 文件：下拉菜单组件

   ​	Ⅱ. `DropDownItem.vue wen` 文件：下拉菜单中每一个选项的组件

   ④ `ValidateComponents` 文件夹：对表单进行处理

   ​	Ⅰ.  `ValidateForm.vue` 文件：将表单整合一起，设置插槽

   ​	Ⅱ. `ValidateInput.vue` 文件：表单验证规则、表单的数据双向绑定

   ⑤`PostComponents` 文件夹：专栏详情页组件

   ​	Ⅰ. `PostHeader.vue` 文件：专栏详情页头部专栏简介组件

   ​	Ⅱ.  `PostList.vue` 文件：专栏详情页中专栏列表展示组件

3. `data` 文件夹：所有用到的数据

   ① `helper.ts` 文件：一些辅助（扩展功能）的方法

   ② `store.ts` 文件：哥哥页面的数据类型模版和数据

   ③ `testData.ts` 文件：测试用的数据

4. `hooks` 文件夹：自定义的各种方法

   ① `useClickOutside.ts` 文件：自定义的 `useClickOutside` 方法，点击 `header` 区域右上角的下拉列表以外的区域，下拉列表将会

5. `router` 文件夹：`vue-router`

   ① `index.ts` 文件：`vue-router` 配置文件

6. `views` 文件夹：vue 页面
   ① `ColumnDetails` 文件夹中的 `ColumnDetails.vue` 文件是专栏详情页的页面

   ② `Home` 文件夹 中的 `Home.vue` 文件是主页页面

   ③ `Login` 文件夹 中的 `Login.vue` 文件 是登录页面
