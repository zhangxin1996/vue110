<template>
  <div class="photoList-container">
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <!-- 刚进页面只有 更多 为高亮 -->
          <a :class="['mui-control-item', item.id===0?'mui-active':'']" v-for="item in classify" @tap="getPhotoList(item.id)" :key="item.id">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="content">
          <h3 class="content-title">{{ item.title }}</h3>
          <div class="content-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 1. 导入 mui 的js文件
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from 'mint-ui'

export default {
  data(){
    return {
      classify:[],    // 分类信息数据
      list:[]    // 图片列表数据
    }
  },
  created(){
    this.getClassify(),
    // 因为刚进入时显示的是全部 ID为0 时的数据
    this.getPhotoList(0)
  },
  mounted(){
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods:{
    getClassify(){  // 分类数据
      this.$axios.get('api/getimgcategory').then(result => {
        if(result.data.status === 0){
          // message 数组中，使用 unshift 方法手动添加对象： { title:”全部”, id:0 }
          var msg = {title:'更多',id:0};
          result.data.message.unshift(msg);

          this.classify = result.data.message;
        }else {
          Toast('获取分类信息数据失败！');
        }
      })
    },
    getPhotoList(ClassifyId){   // 图片列表数据
      this.$axios.get('api/getimages/'+ClassifyId).then( result => {
        if(result.data.status === 0) {
          this.list = result.data.message;
        }else {
          Toast('获取图片列表数据失败！');
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
* { 
  touch-action: pan-y; 
}

.photoList-container {
  .photo-list {
    background-color: #f0eded;
    list-style: none;
    padding: 0 10px;
    margin: 0;
    li {
      position: relative;
      margin-bottom: 10px;
      text-align: center;
      &:last-child{
        margin-bottom: 0;
      }
      img {
        width: 100%;
        box-shadow: 0 0 6px #ddd;
        vertical-align: middle;
      }
      img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .content {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 84px;
        background-color: rgba(0,0,0,0.6);
        color: #fff;
        text-align: left;
        // css多行文字溢出隐藏为三个点(...)
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        .content-title{
          font-size: 13px;
        }
        .content-body{
          font-size: 12px;
        }
      }
    }
  }
}
</style>