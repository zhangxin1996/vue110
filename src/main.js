// 入口文件

// 导入 vue
import Vue from 'vue'

// 导入 App.vue 组件
import app from './App.vue'

// 导入 vue-router 并注入
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入 router.js
import router from './router.js'

// 按需导入 mint-ui 组件
// import {Header, Swipe, SwipeItem, Button} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

// 全局导入 mint-ui 组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 导入 mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入 axios
import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';

// 导入时间格式化插件
import moment from 'moment'

// 定义全局时间过滤器
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dataStr).format(pattern);
})

// vue图片预览插件+缩略图样式 vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 刚运行的时候，一定会调用 main.js，将 localStorage 中的数据保存到 store 的 car 上
var car = JSON.parse(window.localStorage.getItem("car") || "[]");

var store = new Vuex.Store({
  state:{   // this.$store.state.xxx
    // 将购物车中的商品数据，通过数组存起来，可以设计成这样，
    // [{id:商品的id,count:商品的数量,price:商品的价格,selected:false}]
    car:car
  },
  mutations:{   // this.$store.commint('方法名',唯一的参数)
    // 将加入购物车的商品，放到 store 的 car 中
    addToCar(state,goodsinfo){
      // 在 GoodsInfo.vue 组件中，点击加入购物车，将商品的数据保存到 store中的 car 上
      // 分析：首先判断，购物车中是否存在该商品，如果存在只更新数量，如果不存在，push进 car 中
      
      // 标识符，判断购物车中是否有该商品
      var flag = false;

      state.car.some(element => {
        if(element.id === goodsinfo.id){
          element.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      })

      // 如果循环完毕，没有找到该商品，flag 为 false,通过 push 方法，添加到数组 car 中
      if(!flag){
        state.car.push(goodsinfo);
      }

      // 当更新完 car 后，把数组 car，数据存储到本地的 localStorage 中
      window.localStorage.setItem('car',JSON.stringify(state.car));
    },
    // 将 shopCarContainer 中商品数量改变同步到 store 的 car 中
    updateGoodsInfoCount(state,goodsinfo){
      state.car.some(element => {
        if(element.id === goodsinfo.id){
          element.count = parseInt(goodsinfo.count);
          return true;
        }
      })

      window.localStorage.setItem('car',JSON.stringify(state.car));
    },
    // 删除商品
    removeFromCar(state,id){
      state.car.some((element,index) => {
        if(element.id === id) {
          state.car.splice(index,1);
          return true;
        }
      })

      window.localStorage.setItem('car',JSON.stringify(state.car));
    },
    // 将 shopCarContainer 中商品 selected 改变同步到 store 的 car 中
    updateGoodsInfoSelected(state,goodsInfo){
      state.car.some(element => {
        if(element.id === goodsInfo.id){
          element.selected = goodsInfo.selected;
          return true;
        }
      })

      window.localStorage.setItem('car',JSON.stringify(state.car));
    }
    
  },
  getters:{   // this.$store.getters.方法名
    // 计算所有商品数量，放到徽标位置
    getAllCount(state){
      var countAll = 0;
      state.car.forEach(element => {
        countAll += element.count;
      });
      return countAll;
    },
    // 将商品数量，同步到 shopCarContainer
    getShopCount(state){
      var count = {};
      state.car.forEach(element => {
        count[element.id] = element.count;
      })
      return count;
    },
    // 将商品 switch 的状态，同步到 shopCarContainer
    getShopSelected(state){
      var selected = {};
      state.car.forEach(element => {
        selected[element.id] = element.selected;
      })
      return selected;
    },
    // 实现勾选数量和价格的自动计算
    getTotal(state){
      var o = {
        count:0,  // 勾选的数量
        total:0   // 勾选的总价
      };
      state.car.forEach(element => {
        if(element.selected){
          o.count += element.count;
          o.total += (element.price * element.count);
        }
      })
      return o;
    }
  }
})

var vm = new Vue({
  el:'#app',
  render:function(createElements){
    return createElements(app)
  },
  router,
  store
})