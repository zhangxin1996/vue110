<template>
  <div class="newsList-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
  data(){
    return {
      newsList:[]
    }
  },
  created(){
    this.getNewsList()
  },
  methods:{
    getNewsList(){
    this.$axios.get('api/getnewslist').then(result => {
      if(result.data.status === 0) {
        this.newsList = result.data.message;
      }else {
        Toast('获取新闻列表失败！');
      }
    })
  }
  }
}
</script>

<style lang="less" scoped>
  .newsList-container {
    h3 {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mui-ellipsis {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #03a9f4;
    }
  }
</style>