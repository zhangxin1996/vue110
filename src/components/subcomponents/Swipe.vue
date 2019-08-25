<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotu" :key="item.id">
        <img :src="item.img" :class="{full:isFull}" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
/**
 * 出现的问题：
 *  商品详情的轮播图出现被拉长的问题？
 * 分析得出：
 *  首页中的轮播图是，宽和高都是100%，这样正常显示；而商品详情页面的轮播图是，宽为自适应高为100%，才能正常显示；
 * 问题所在：
 *  首页轮播图和商品详情的轮播图宽度是100%还是自适应
 * 解决问题：
 *  父组件向轮播图子组件传入一个布尔值，首先在轮播图组件中定义一个宽度为100%的类，首页传入true，启动该类，商品详情页面传入false，不启用该类
 * 
 */
export default {
  props:['lunbotu','isFull'],
  data(){
    return {

    }
  },
  methods: {}
  
}
</script>

<style lang="less" scoped>
  .mint-swipe {
    height:170px;
    text-align: center;

    img {
      height: 100%;
    }
  }
  // 宽度为100%的类
  .full {
    width:100%;
  }
</style>