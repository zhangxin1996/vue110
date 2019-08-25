<template>
  <div class="goodslist-container">
    <!-- <router-link class="goodsBox" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+item.id"  tag="div">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <div class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </div>
        <div class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </div>
      </div>
    </router-link> -->

    <!-- 在网页中，有两种跳转方式 -->
    <!-- 方式一：使用 a 标签的形式，叫做标签跳转； -->
    <!-- 方式二：使用 js 中的 window.location.href 的形式，叫做 编程式导航 -->
    <div class="goodsBox" v-for="item in goodsList" :key="item.id" @click="getdetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <div class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </div>
        <div class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </div>
      </div>
    </div>

    <mt-button class="btn" type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
  // data 是在自己组件内部，挂在一些私有数据的
  data(){
    return {
      pageindex:1,   // 分页页码
      goodsList:[]   // 存放商品列表的数组
    }
  },
  created(){
    this.getGoodsList()
  },
  methods: {
    getGoodsList(){
      // 获取商品列表数据
      this.$axios.get('api/getgoods?pageindex='+this.pageindex).then(result => {
        if(result.data.status === 0) {
          // 旧数据拼接上新数据组成最终的商品列表数组
          this.goodsList = this.goodsList.concat(result.data.message);
        }else {
          Toast('获取商品列表数据失败！');
        }
      })
    },
    getMore(){
      this.pageindex++;
      this.getGoodsList();
    },
    getdetail(id){
      // 使用 js 的形式进行路由导航

      /**
       * 注意：区分 $route 和 $router这两个对象
       * 1、this.$route 是路由【参数对象】，所有路由中的参数，params，query 都属于它；
       * 2、this.$router 是路由的【导航对象】，用它可以方便的使用 js代码，进行路由的前进 后退 跳转到新的URL地址
       * 
       */

      // 字符串
      // this.$router.push('/home/goodsinfo/'+id);
      // 对象
      // this.$router.push({path:'/home/goodsinfo/'+id});
      // 传递命名的路由
      this.$router.push({name:'goodsinfo',params:{id:id}})

      console.log(this.$router);
    }
  },
}
</script>

<style lang="less" scoped>
  .goodslist-container {
    padding: 0 4px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goodsBox {
      width: 49%;
      min-height: 295px;
      border: 1px solid #ccc;
      margin: 4px 0;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      img {
        width: 100%;
      }
      h1 {
        font-size: 13px;
        padding: 0 4px;
      }
      .info {
        background-color: #eeecee;
        height: 60px;
        .price {
          height: 30px;
          line-height: 30px;  
          .now {
            color: #ef3e3e;
            font-size: 20px;
            font-weight: 700;
          }
          .old {
            font-size: 14px;
            color: #999;
            text-decoration: line-through;
          }
        }
      }
      .sell {
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #999;
      }
    }
  }
</style>