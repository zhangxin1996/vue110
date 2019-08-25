## 告诉项目相关信息的

### 这是一个NB的项目

## [主流开源协议之间的异同？](https://www.zhihu.com/question/19568896)

## 用(传统的方式)命令行把修改过后的代码上传到码云？？？
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页APP组件
1. 完成 Header  区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
  + 在制作 购物车 小图标的时候，操作会相对多一些：
  + 先把 扩展图标的 css 样式，拷贝到项目中
  + 拷贝 扩展字体库 ttf 文件，到项目中
  + 为 购物车 小图标，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作 首页轮播图 布局

## 加载 首页轮播图 数据
1. 获取数据，如何获取呢？通过 axios
2. 使用 axios 的 this.axios.get 获取数据
3. 将获取到的数据保存到 data 身上
4. 通过 v-for 将 data 数据渲染到页面上

## 改造 九宫格 区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯页面 制作
1. 绘制界面，使用 MUI 的 media-list.html
2. 使用 axios 获取数据
3. 渲染数据

## 实现 新闻咨询列表 点击跳转到新闻详情
1. 把列表每一项改造为为 router-link，同时，再跳转的时候应该给定唯一的 ID标识符
2. 创建新闻资讯类表组件 NewsInfo.vue
3. 在路由模块，将 新闻详情的 路由地址 和 组件页面 对应起来

## 实现新闻详情的 页面布局 和 数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment.vue 的地方，先手动导入 comment.vue 组件
  + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入的 comment.vue 组件，注册为自己的子组件
4. 将注册子组件的名称，以标签的形式，引入在页面中即可

## 实现点击 加载更多 评论的功能
1. 为加载更多按钮，绑定一个事件，在事件中，请求下一页数据
2. 点击加载更多让 pageIndex++，从新调用 this.getComment() 方法来获取最新一页的评论数据
3. 为了防止点击加载更多，新数据覆盖老数据的情况，让老数据调用数组的 concat 方法拼接上 新数据

## 发表评论
1. 为 textarea 双向数据绑定
2. 为发表评论按钮 绑定点击事件
3. 校验 textarea 输入框中的数据，如果数据去掉空格为空，则 Toast提示提示评论数据不能为空，并 return
4. 通过 axios 发送一个请求，提交给服务器
5. 当发表评论成功后，刷新列表，查看最新的数据
  + 如果调用 getComment 方法，来刷新数据得到最新评论，可能得到的是最后一页的数据，前几页的数据获取不到
  + 可以使用这种方法，手动的拼接一个评论对象，通过数组方法 unshift，把最新的评论对象追加到 data 中的comments 的开头，这样就能实现刷新列表的需求。

## 改造 图片分享 按钮，为路由的链接并显示对应的组件

## 绘制 图片列表组件页面结构 并美化样式
1. 制作 顶部的滑动条
2. 制作 底部图片列表

### 制作顶部滑动条的坑？？？
1. 使用 MUI 中的 tab-top-webview-main.html
2. 将 tab-top-webview-main.html 页面中的 .mui-fullscreen 类去掉，否则会全屏显示
3. 滑动条无法正常触发滑动，通过查看官方文档，发现这是JS组件，需要被初始化
  + 导入 mui.js
  + 调用官方提供的方式初始化
  ```
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  ```
  + 应该将官方提供的初始化代码，放到 mounted 钩子函数中，因为只有当页面DOM结构生成时，才能去调用元素执行相关操作；
4. 报错`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`，
  + 原因是：引入第三方js使用了非严格模式，而 webpack 在打包的时候默认使用的是严格模式，这时候就需要更改 webpack 在打包的时候也使用非严格模式。
  + 解决方法：
    + `npm install babel-plugin-transform-remove-strict-mode --save-dev`
    + 在bablerc文件中 添加：“plugins”:
      ```
      {
        "plugins": ["transform-remove-strict-mode"]
      }
      ```
  + [vue引入第三方js时，报严格模式错误的解决方法](http://www.architecy.com/archives/549)
5. 报错 `[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See <URL>`
  + 解决办法：
    + 在 style 引入全局样式
      ```
      * {
        touch-action: pan-y;
      }
      ```
  + [滑动时候警告：Unable to preventDefault inside passive event listener](https://www.jianshu.com/p/04bf173826aa)
6. 改类名(.mui-tab-item)，解决 tabbar 点击无法切换的问题
7. 获取所有分类，并渲染 分类列表

### 制作图片列表区域
1. 图片列表使用懒加载技术，我们可以使用 Mint-UI 的组件 `Lazy load`
2. 需全局导入  `Mint-UI` 才能显示懒加载的图标
3. 通过 v-for 渲染图片列表数据

### 实现了图片列表懒加载改造和样式的美化


## 实现点击图片 跳转到 图片详情页面
1. 改造 li 为 <router-link>，需要 tag 属性指定渲染为哪种标签

## 实现图片详情页面的布局并美化和获取数据渲染到页面上

## 实现图片详情 缩略图 功能
1. 使用插件 `vue-preview`，实现图片缩略图功能
2. 插件的使用步骤：
  1. 使用命令 `npm i vue-preview -S`
  2. main.js 入口引入
  ```
  import VuePreview from ‘vue-preview’
  Vue.use(VuePreview)
  ```
  3. 组件中引入
  ```
  <div class="thumbs">
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
  </div>
  ```
  4. 获取数据
  ```
  export default {
    data(){
      return {
        id:this.$route.params.id,
        slide1:[]   // 缩略图数据
      }
    },
    created(){
      this.getThumbnail()
    },
    methods:{
      getThumbnail(){
        this.$axios.get('api/getthumimages/'+this.id).then(result => {
          if(result.data.status === 0){
            result.data.message.forEach(element => {
              element.w = 600;  // 设置以大图浏览时的宽度
              element.h = 400;  // 设置以大图浏览时的高度
              element.src = element.src;  //大图
              element.msrc = element.src;  //小图
            });
            this.slide1 = result.data.message;
          }else{
            Toast('获取缩略图失败！');
          }
        })
      }
    }
  }
  ```
  5. 设置缩略图CSS样式
  ```
  .thumbs {
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
        }
      }
    }
  }
  ```

## 实现商品购买的路由改造，及页面的实现

## 尝试在手机上 进行项目的预览和测试
1. 要保证自己的手机可以正常运行
2. 要保证手机和开发项目的电脑在同一 WIFI 环境中，也就是说手机可以访问到电脑的 IP
3. 打开自己的项目中 package.json 文件，在 dev 脚本中添加 --host 指令，把当前电脑的 WIFI 地址，设置为 --host 指令值
  + 查看自己电脑所处的 WIFI 的 IP值，win+R cmd终端运行 `ipconfig` 查看无线网的 ip地址


## Vuex是为了保存组件之间共享数据而诞生的，如果组件之间有共享的数据，可以直接挂载到Vuex上，而不必父组件之间传值了，如果组件的数据不需要共享，此时，这些不必要共享的私有数据，就没必要放到Vuex中了。

  + 只有共享的数据，才有权利放到Vuex中
  + 组件内部私有的数据，放到组件data中
  + props和data和Vuex之间的区别
### 得出结论：Vuex是一个全局共享数据的区域，相当于是一个数据的仓库。