// 入口文件

// 导入 vue
import Vue from 'vue'

// 导入 router 并注入
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 按需导入 mint-ui 组件
import {Header, Swipe, SwipeItem, Button} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

// 导入 mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入 App.vue 组件
import app from './App.vue'

// 导入 router.js
import router from './router.js'

// 导入 axios
import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';

// 导入时间格式化插件
import moment from 'moment'

// 定义全局时间过滤器
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD hh:mm:ss'){
  return moment(dataStr).format(pattern);
})

var vm = new Vue({
  el:'#app',
  render:function(createElements){
    return createElements(app)
  },
  router
})