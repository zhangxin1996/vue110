<template>
  <div class="goodsDesc-container">
    <h3>{{ goodsDesc.title }}</h3>
    <hr>
    <div class="content" v-html="goodsDesc.content"></div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
  data(){
    return {
      id:this.$route.params.id,
      goodsDesc:{}
    }
  },
  created(){
    this.getGoodsDesc()
  },
  methods:{
    getGoodsDesc(){
      this.$axios.get('api/goods/getdesc/'+this.id).then(result => {
        if(result.data.status === 0){
          this.goodsDesc = result.data.message[0];
        }else{
          Toast('获取商品的图文介绍数据失败！');
        }
      })
    }
  }
}
</script>

<style lang="less">
  .goodsDesc-container {
    padding: 0 4px;
    h3 {
      margin: 15px 0;
      text-align: center;
      font-size: 20px;
    }
    .content {
      img {
        width: 100%;
      }
    }
  }
</style>