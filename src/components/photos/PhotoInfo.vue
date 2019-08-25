<template>
  <div class="photoInfo-container">
    <h3 class="title">{{ infoList.title }}</h3>
    <div class="subtitle">
      <span>发表时间：{{ infoList.add_time | dateFormat }}</span>
      <span>点击：{{ infoList.click }}次</span>
    </div>
    <hr>

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>

    <!-- 详细描述 -->
    <div class="content" v-html="infoList.content"></div>

    <!-- 评论子组件 -->
    <comment-box :idMsg="id"></comment-box>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
// 1、导入评论子组件
import comment from '../subcomponents/Comment.vue'

export default {
  data(){
    return {
      id:this.$route.params.id,
      infoList:{},   // 图片详情数据
      slide1:[]   // 缩略图数据
    }
  },
  created(){
    this.getPhotoInfo(),
    this.getThumbnail()
  },
  methods:{
    getPhotoInfo(){
      this.$axios.get('api/getimageInfo/'+this.id).then(result => {
        if(result.data.status === 0) {
          this.infoList = result.data.message[0];
        }else{
          Toast('获取图片详情数据失败！');
        }
      })
    },
    getThumbnail(){
      this.$axios.get('api/getthumimages/'+this.id).then(result => {
        if(result.data.status === 0){
          result.data.message.forEach(element => {
            element.w = 600;  // 设置以大图浏览时的宽度
            element.h = 400;  // 设置以大图浏览时的高度
            element.src = element.src;  //大图
            element.msrc = element.src;  //小图
          });
          this.slide1 = result.data.message;
        }else{
          Toast('获取缩略图失败！');
        }
      })
    }
  },
  components:{    // 2、注册子组件
    'comment-box':comment
  }
}
</script>

<style lang="less" scoped>
  .photoInfo-container {
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
    .thumbs {
      /deep/ .my-gallery {
        display: flex;
        flex-wrap: wrap;
        figure {
          width: 30%;
          margin: 5px;
          img {
            width: 100%;
          }
        }
      }
    }
    .content {
      font-size: 14px;
      color: #999;
    }
  }
</style>