<template>
  <div>
    <div id="data1" class="mui-numbox" data-numbox-min='1' style="height: 25px;line-height: 25px;">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="this.initCount" @change="countChanged" ref="numBox" readonly/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
  mounted(){
    mui(".mui-numbox").numbox()
  },
  methods:{
    countChanged(){
      var o = {id:this.goodsId,count:this.$refs.numBox.value}
      this.$store.commit('updateGoodsInfoCount',o);
    }
  },
  props:['initCount','goodsId']
}
</script>

<style lang="less" scoped>

</style>