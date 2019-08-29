<template>
  <div class="goodsinfo-container">
    
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div ref="ball" class="ball" v-show="ballFlag"></div>
    </transition>

    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <my-swipe :lunbotu="lunbotuList" :isFull="false"></my-swipe>
        </div>
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="mui-card">
      <div class="mui-card-header">
        <h3>{{ goodsInfo.title }}</h3>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<span class="market">￥{{ goodsInfo.market_price }}</span>
            销售价：<span class="sell">￥{{ goodsInfo.sell_price }}</span>
          </p>
          <div style="margin-bottom:10px;">
            <span>购买数量：</span>
            <!-- 数字输入框 -->
            <my-numBox class="numberBox" :max="goodsInfo.stock_quantity" @getCount="getSelectedCount"></my-numBox>
          </div>
          <div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no }}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity }}</p>
          <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goodsDesc">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goodsComment">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
// 轮播图组件
import swipe from '../subcomponents/Swipe.vue'
// 数字输入框组件
import numBox from '../subcomponents/goodsinfo_numbox.vue'

export default {
  data(){
    return {
      id:this.$route.params.id,
      lunbotuList:[],
      goodsInfo:{},
      ballFlag:false,    // 小球显示隐藏标识符
      selectedCount:1    // 保存用户选中的商品数量，默认数量为1
    }
  },
  created(){
    this.getLunBoTu()
    this.getGoodsInfo()
  },
  methods: {
    getLunBoTu(){
      this.$axios.get('api/getthumimages/'+this.id).then(result => {
        if(result.data.status === 0){
          // 因为轮播图组件中，图片的属性是img，而地址中的图片属性是src，所以需要手动的更改
          result.data.message.forEach(element => {
            element.img = element.src;
          });
          this.lunbotuList = result.data.message;
        }else{
          Toast('获取图片详情轮播图失败！');
        }
      })
    },
    getGoodsInfo(){
      this.$axios.get('api/goods/getinfo/'+this.id).then(result => {
        if(result.data.status === 0) {
          this.goodsInfo = result.data.message[0];
        }else {
          Toast('获取商品参数数据失败！');
        }
      })
    },
    goodsDesc(){
      // 使用路由编程式导航跳转到图文介绍
      this.$router.push({name:'goodsDesc',params:{id:this.id}})
    },
    goodsComment(){
      // 使用路由编程式导航跳转到商品评论
      this.$router.push({name:'goodscomment',params:{id:this.id}})
    },
    addToShopCar(){
      // 控制小球的显示隐藏
      this.ballFlag = !this.ballFlag;

      // 拼接出一个，要保存在 store 中 car 数组里的商品对象
      // {id:商品的id,count:商品的数量,price:商品的价格,selected:false}
      var info = {
        id:this.id,
        count:this.selectedCount,
        price:this.goodsInfo.sell_price,
        selected:true
      };
      // 调用 store 中的 mutations
      this.$store.commit('addToCar',info);
    },
    beforeEnter(el){
      el.style.transform="translate(0,0)";
    },
    enter(el,done){
      /**
       * 小球动画优化思路：
       * 1、导致动画不准确的原因：我们把小球最终位移的距离，局限在了某一分辨率下的滚动条为滚动的情况下
       * 2、只要分辨率和滚动条有一定滚动距离之后，问题就显示出来了
       * 3、得到结论：不能把 位移的横纵坐标写死，应该根据不同情况动态计算坐标值
       * 
       * 经过分析，得到解题思路：
       * 1、先得到徽标的横纵坐标，再得到小球的横纵坐标，让 y 值求差，让 x 值求差，得到的结果，就是小球要位移的横纵坐标
       *    + 获取小球元素通过属性ref
       *    + 获取徽标通过document.getElementById()
       * 2、如何得到徽标和小球的位置？？？ 通过 domObject.getBoundingClientRect()
       * 
       *  
       * 出现的问题：当分辨率变化或者滚动滚动条都会让小球的移动位置产生差别
       * 分析原因：不能把移动的位置规定死，应该随分辨率或滚动条的变化而变化
       * 解决问题：让徽标距离顶部和左边的距离-小球未移动时距离顶部和左边的距离，使用方法
       */

      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标的位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect();
      
      // 计算位移的横纵坐标值
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.offsetWidth;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all .5s cubic-bezier(.4,-0.03,1,.68)";
      done();
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count){
      // 当子组件把选中的数量传递给父组件的时候，将选中个数量保存到 data 身上
      this.selectedCount = count;
      console.log('父组件拿到的数量值为：' + this.selectedCount);
    }
  },
  components:{
    'my-swipe':swipe,
    'my-numBox':numBox
  }
}
</script>

<style lang="less" scoped>
  .goodsinfo-container {
    overflow: hidden;
    background-color: #d9dcd9;

    .ball{
      position: absolute;
      top: 385px;
      left: 150px;
      width: 15px;
      height: 15px;
      background-color: #ff0000;
      border-radius: 50%;
      z-index: 99;
    }

    .mui-card {
      .mui-card-header {
        h3 {
          font-size: 20px;
        }
      }

      .mui-card-content {
        .numberBox {
          display: inline-block;
        }
        
        .price {
          .market {
            text-decoration: line-through;
          }
          .sell {
            font-size: 18px;
            color: #ff0000;
            font-weight: bold;
          }
        }
      }

      .mui-card-footer {
        display: block;

        button {
          margin: 10px 0;
        }
      }
    }
  }
</style>