<template>
  <div class="stopCarContainer">
    <!-- 商品列表区域 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item,index) in shopCarList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getShopSelected[item.id]" @change="updateSelected(item.id,$store.getters.getShopSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="right">
              <h1>{{ item.title }}</h1>
              <div class="info">
                <span class="price">￥{{ item.sell_price }}</span>
                <!-- 如何在购物车中获取商品的数量？？？ -->
                <!-- 先准备一个空对象 o，循环购物车中的数据，将 id 作为 o 对象的属性名，count 作为  o 对象的属性值，这样循环一遍，得到的 o 对象为：{88:3,98:6,99:1}-->
                <my-numbox :initCount="$store.getters.getShopCount[item.id]" :goodsId="item.id"></my-numbox>
                <!-- 删除商品需要传递两个参数 -->
                <!-- 参数一：index，用于删除 shopCarList 中的数据，通过索引来删除更方便-->
                <!-- 参数二：item.id，用于删除 store 中 car 中的数据 -->
                <a href="#" @click.prevent="remove(index,item.id)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>          
    </div>

    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="left">
            <p>总计（不包含运费）</p>
            <p>
              已勾选商品&nbsp;<span class="red">{{ $store.getters.getTotal.count }}</span>&nbsp;件，总价<span class="red">￥{{ $store.getters.getTotal.total }}</span>
            </p>
          </div>
          <mt-button type="danger" size="small">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import numbox from '../subcomponents/shopcar_numbox.vue'
  import {Toast} from 'mint-ui'

  export default {
    data(){
      return {
        shopCarList:[]
      }
    },
    created(){
      this.getShopCarList();
    },
    methods:{
      getShopCarList(){
        var idAll = [];
        // 获取 store 中 car 中的id
        this.$store.state.car.forEach(element => {
          idAll.push(element.id);
        })
        if(idAll.length <= 0){
          return;
        }
        this.$axios.get('api/goods/getshopcarlist/'+idAll.join(",")).then(result => {
          if(result.data.status === 0){
            this.shopCarList = result.data.message;
          }else{
            Toast("获取购物车列表数据失败！");
          }
        })
      },
      remove(index,id){
        this.shopCarList.splice(index,1);
        this.$store.commit('removeFromCar',id);
      },
      updateSelected(id,selected){
        this.$store.commit('updateGoodsInfoSelected',{id:id,selected:selected});
      }
    },
    components:{
      "my-numbox":numbox
    }
  }
</script>

<style lang="less" scoped>
  .stopCarContainer {
    background-color: #eee;
    overflow: hidden;

    .mui-card-content-inner {
      display: flex;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h1 {
          font-size: 13px;
        }
        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 3px;
        
          .price {
            color: #ff0000;
            font-weight: bold;  
          }
        }
      }
    }

    .mui-card-content-inner{
        display: flex;
        justify-content: space-between;

      .left {
        .red {
          color: #ff0000;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
</style>