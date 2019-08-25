<template>
  <div>
    <!-- 问题：我们不知道什么时候能拿到 max 值，但终归有一刻，能拿到 max 值 -->
    <!-- 原因：因为数据是通过 .then 异步的方式获取的，虽然获取数据的方法是在 created 中调用，但渲染到 numberbox 的时候，数据还没有获取到,所以传递过来的 max 为 undefined-->
    <!-- 解决办法：通过 watch 属性监听来监听父组件传递过来的 max 值，不管 watch 会触发几次，最后一次，肯定是一个合法的 max 数值 -->
    <div id="data1" class="mui-numbox" data-numbox-min='1'>
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numBox"/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
  props:['max'],
  mounted(){
    mui("#data1").numbox()
  },
  methods:{
    // 问题：什么时候将子组件的数传递给父组件？？？
    // 每当数据发生改变的时候，通过事件调用，把最新的数据，传递给父组件
    countChanged(){
      this.$emit('getCount',parseInt(this.$refs.numBox.value));
    }
  },
  watch:{
    // 属性监听
    max:function(newval,oldval){
      // 使用 JS 设置 numbox 的最大值
      mui("#data1").numbox().setOption('max',newval);
    }
  }
}
</script>

<style lang="less" scoped>

</style>