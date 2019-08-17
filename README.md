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