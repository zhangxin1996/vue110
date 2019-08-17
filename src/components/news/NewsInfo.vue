<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 副标题 -->
    <div class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </div>
    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>
    <!-- 评论子组件区域 -->
    <comment-box :idMsg="id"></comment-box>

  </div>
</template>

<script>
// 1、导入评论子组件
import comment from '../subcomponents/Comment.vue'

import {Toast} from 'mint-ui'

export default {
  data(){
    return {
      id:this.$route.params.id,  // 将 URL 地址中创递过来的 ID值，挂载到 data 上，方便以后调用
      newsInfo:{}
    }
  },
  created(){
    this.getNewsInfo()
  },
  methods:{
    getNewsInfo(){
      this.$axios.get('api/getnew/'+this.id).then( result => {
        if(result.data.status === 0) {
          this.newsInfo = result.data.message[0];
        }else {
          Toast('获取新闻详情失败！');
        }
      })
    }
  },
  components:{  // 用来注册子组件的
    'comment-box':comment
  }
}
</script>

<style lang="less" scoped>
  .newsinfo-container {
    padding: 5px 5px 0 5px;
    .title {
      text-align: center;
      color: #ff0000;
      font-size: 18px;
      margin: 15px 0;
    }
    .subtitle {
      display: flex;
      justify-content: space-between;
      
      color: #03a9f4;
      font-size: 14px;
    }
    .content {
      font-size: 14px;
      color: #999;
    }
  }
</style>