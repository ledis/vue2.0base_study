<template>
	<div class="wrapper">
		<mu-appbar class="title" title="消息中心"></mu-appbar>
		<div class="main">
			<mu-tabs class="activeTab" :value="activeTab" @change="handleTabChange">
          <mu-tab value="hasnot_read" title="未读消息" />
          <mu-tab value="has_read" title="已读消息" />
          <span v-if="count" class="count">{{count}}</span>
      </mu-tabs>
      <!--未读消息列表 -->
       <ul v-if="accesstoken" class="lists" v-show="activeTab === 'hasnot_read'">
		     	<router-link :to="{path:'/vueproject/content',query:{id:item.topic.id}}" tag="li" class="list" v-for="item in hasnot_read_messages" :key="item.id">
						<div class="user">
                <img :src="item.author.avatar_url" alt="user">
                <span>{{item.author.loginname}}</span>
            </div>
            <div class="content">
                <h2 v-html="markdownChange(item.reply.content)"></h2>
                <p>来自：《{{item.topic.title}}》</p>
            </div>
            <div class="timer">
                <span>{{item.reply.create_at | timeago}}</span>
            </div>
		     	</router-link>
		     	<li v-if="!hasnot_read_messages.length">暂无消息</li>
       </ul>
       <!---->
       <ul v-if="accesstoken" class="lists" v-show="activeTab === 'has_read'">
          <router-link :to="{path:'/vuecommunitytest/content',query:{id:item.topic.id}}" tag="li" class="list" v-for="item in has_read_messages" :key="item.id">
              <div class="user">
                  <img :src="item.author.avatar_url" alt="user">
                  <span>{{item.author.loginname}}</span>
              </div>
              <div class="content">
                  <h2 v-if="item.reply.content" v-html="markdownChange(item.reply.content)"></h2>
                  <h2 v-if="!item.reply.content">此内容已被作者删除</h2>
                  <p>来自：《{{item.topic.title}}》</p>
              </div>
              <div v-if="item.reply.content" class="timer">
                  <span>{{item.reply.create_at | timeago}}</span>
              </div>
          </router-link>
          <li v-if="!has_read_messages.length">暂无消息</li>
      </ul>
      <p class="tips" v-if="!accesstoken">请先登录</p>
      <!-- 全部标记已读 -->
      <mu-raised-button class="btn" v-if="count" v-show="activeTab === 'hasnot_read'" @click="mark_all" label="标记全部已读" icon="done_all" primary/>
		</div>
		<btom-nav></btom-nav>
	</div>
</template>
<script>
import axios from 'axios'
import timeago from 'timeago.js'
import BtomNav from './common/btomNav'
	export default{
		components:{
			BtomNav
		},
		data(){
			return {
				activeTab: 'hasnot_read',
				accesstoken: '',
				hasnot_read_messages: [],
				has_read_messages: [],
				count:[]
			}
		},
		created:function(){
			this.accesstoken = localStorage.getItem("accesstoken")
      if (this.accesstoken) {
          this.getData()
      }
		},
		filters: {
        timeago(val) {
            let time = new Date(val)
            let thistime = timeago()
            return thistime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
        }
    },
		methods:{
			handleTabChange(val) {
          this.activeTab = val
      },
			getData(){
				let that = this
        let url = 'https://www.vue-js.com/api/v1/messages?accesstoken=' + this.accesstoken
        axios.get(url).then(function(response){
        	that.hasnot_read_messages = response.data.data.hasnot_read_messages
          that.has_read_messages = response.data.data.has_read_messages
        })

        axios.get('https://www.vue-js.com/api/v1/message/count?accesstoken=' + this.accesstoken).then(function(response) {
                //获取未读消息数量
                that.count = response.data.data
            })
			},
			mark_all() {
          let that = this
          axios.post('https://www.vue-js.com/api/v1/message/mark_all', {
                  accesstoken: that.accesstoken
              })
              .then(function(response) {
                  that.getData()
              })
      }
		}
	}
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    height:100vh;
}
.title {
	position:fixed;
	top:0;
	left:0;
	z-index:3;
    text-align: center;
    height: 5rem;
}
.main {
    margin: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
}
.activeTab {
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, .1);
}

.count {
    position: absolute;
    left: 10%;
    top:20%;
    background-color: #ff5252;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 50%;
}

.lists {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
}

.btn {
    margin: 1rem;
}

.list {
    display: flex;
    justify-content: space-between;
    background-color: #f8f8f8;
    padding: 1rem;
    margin-bottom: 1rem;
}

.user {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6rem;
}

.user>img {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
}

.user>span {
    text-align: center;
    max-width: 100%;
    word-wrap: break-word;
    word-break: normal;
}

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.content>h2 {
    font-weight: 700;
    font-size: 16px;
}

.content>p {
    color: #999;
    font-size: 12px;
}

.timer {
    margin-left: 1rem;
    width: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.tips {
    padding: 1rem;
}
</style>