<template>
  <div class="goodsComment-container">
    <my-comment :idMsg="id"></my-comment>
  </div>
</template>

<script>
import comment from '../subcomponents/Comment.vue'
export default {
  data(){
    return {
      id:this.$route.params.id
    }
  },
  components:{
    "my-comment":comment
  }
}
</script>

<style lang="less" scoped>
  .goodsComment-container {
    padding: 0 4px;
  }
</style>