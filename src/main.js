// 入口文件

// 导入 vue
import Vue from 'vue'

// 按需导入 mint-ui 组件
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)

// 导入 mui 样式
import './lib/mui/css/mui.min.css'

// 导入 App.vue 组件
import app from './App.vue'


var vm = new Vue({
  el:'#app',
  render:function(createElements){
    return createElements(app)
  }
})