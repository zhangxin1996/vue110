<template>
  <div class="comment-container">
    <h3 class="title">发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容(最多评论120字)" maxlength="120" v-model="commentText"></textarea>
    <mt-button class="btn" type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="content" v-for="(item,index) in comments" :key="item.add_time">
      <div class="content_head">
        第{{index+1}}楼 &nbsp;&nbsp; 用户：{{item.user_name}} &nbsp;&nbsp; 发表时间：{{item.add_time | dateFormat}}
      </div>
      <div class="content_body">
        {{item.content}}
      </div>
    </div> 
    <mt-button class="btn" type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
  data(){
    return {
      pageindex:1,      //  分页的页码，表示当前第几页,默认展示第一页数据
      comments:[],      //  所有的评论数据
      commentText:''    //  textarea 数据
    }
  },
  props:['idMsg'],
  created(){
    this.getComment()
  },
  methods: {
    // 获取评论
    getComment(){
      this.$axios.get('api/getcomments/'+ this.idMsg +'?pageindex='+this.pageindex).then( result => {
        if(result.data.status === 0) {
          // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据，用数组方法concat
          this.comments = this.comments.concat(result.data.message);
        }else {
          Toast('获取评论信息失败！');
        }
      })
    },
    // 加载更多按钮
    getMore(){
      this.pageindex++;
      this.getComment()
    },
    // 发表评论按钮
    postComment(){
      if(this.commentText.trim().length === 0) {
        return Toast("评论内容不能为空！");
      }

      this.$axios.post('api/postcomment/'+this.idMsg,{content:this.commentText}).then(result => {
        if(result.data.status === 0) {
          var newMsg = {user_name:'匿名用户',add_time:Date.now(),content:this.commentText};
          this.comments.unshift(newMsg);

          this.commentText = '';
        }else {
          Toast('提交评论信息失败！');
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
  .comment-container {
    margin-top: 20px;
    .title {
      font-size: 22px;
    }
    textarea {
      font-size: 13px;
      height: 90px;
      margin-bottom: 0;
    }
    .btn {
      margin-top: 4px;
      margin-bottom: 6px;
    }
    .content {
        
      .content_head {
        font-size: 12px;
        height: 30px;
        background-color: #ccc;
        line-height: 30px;
      }
      .content_body {
        padding: 0 4px;
        line-height: 36px;
        text-indent: 2em;
        background-color: #fff;
        font-size: 16px;
      }
    }
  }
</style>