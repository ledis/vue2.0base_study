<template>
	<div ref="myElement" class="demo-infinite-container main">
		<mu-tabs class="tabs" :value="activeTab" @change="handleTabChange">
	    <mu-tab value="all" title="全部" />
      <mu-tab value="good" title="精华" />
      <mu-tab value="weex" title="weex" />
      <mu-tab value="share" title="分享" />
      <mu-tab value="ask" title="问答" />
      <mu-tab value="job" title="招聘" />
	  </mu-tabs>
	  <!--帖子列表-->
	 	<mu-list>
	 		<template v-for="(item,index) in items">
	 			<section class="list">
	 				<router-link :to="{path:'vueproject/user',query:{user:item.author.loginname}}" tag="img" :src="item.author.avatar_url"></router-link>
	 				<router-link :to="{path:'/vueproject/content',query:{id:item.id}}" tag="div" class="content">
	 					<div class="list_title">
	 						<span v-if="item.top">置顶</span>
	 						<span v-else-if="item.good">精华</span>
	 						<span v-else-if="item.tab==='share'" :style="styleObj">分享</span>
	 						<span v-else-if="item.tab==='ask'" :style="styleObj">问答</span>
	 						<span v-else-if="item.tab==='job'" :style="styleObj">招聘</span>
	 						<h3>{{item.title}}</h3>
	 					</div>
	 					<div class="timer">
	 						<span>{{item.reply_count}} / {{item.visit_count}}</span>
							<span>{{item.last_reply_at |timeago}}</span>
	 					</div>
	 				</router-link>
	 			</section>
	 		</template>
	 		<p class="nomore" v-show="nomore">没有更多了。。。</p>
	 	</mu-list>
	 	<section v-if="!items.length">
        暂无话题
    </section>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
	</div>
</template>
<script>
import axios from 'axios'
import timeago from 'timeago.js';
	export default{
		data () {
	    return {
	      activeTab: 'all',
	      items:[],
	      url:'https://www.vue-js.com/api/v1/topics?tab=all',
	      styleObj:{
	      	backgroundColor:'#999'
	      },
	      nomore:false,
	      loading: false,
        scroller: null,
        page:1,
        scrollValue:null
	    }
	  },
	  created:function(){
	  	this.getData()
	  },
	  mounted:function(){
	  	this.scroller = this.$el
	  },
	  methods: {
	    handleTabChange (val) {
	    	this.$refs.myElement.scrollTop=0
	    	this.page=1
	    	this.nomore=false
	      this.activeTab = val
	      this.url='https://www.vue-js.com/api/v1/topics?tab=' + val
	      this.getData()
	    },
	    
	    loadMore() {
	      if(!this.nomore){
	      	this.loading=true
	      	this.page+=1
	      	let url=this.url+'&page='+this.page
	      	let arr=[]
	      	setTimeout(() => {
	      		let that=this
	      		axios.get(url).then(function(response){
	      			arr=response.data.data
	      			if(arr.length===0){
	      				that.loading=false
	      				that.nomore=true
	      				return
	      			}
	      			that.items = [...that.items, ...arr]
	      			arr=[]
	      		})
		        this.loading = false
		      }, 1000)
	      }
	    },
	    getData(){
	    	let that=this
	    	axios.get(this.url).then(function(response){
	    		that.items=response.data.data;
	    		console.log(that.items);
	    	})
	    }
	  },
	  filters:{
	  	timeago(val){
	  		let time=new Date(val)
	  		var thistime=new timeago()
	  		return thistime.format(time,'zh_CN')
	  	}
	  }
	}
</script>
<style scoped>
.main {
    overflow: auto;
}
.tabs{
	position: fixed;
  top: 0;
  left: 0;
  right: 0;
	margin-top:5rem;
	height:4rem;
	border-top:1px solid hsla(0,0%,100%,.1);
	display:flex;
	justify-content: space-around;
}
.list{
	font-size:14px;
	display: flex;
	border-bottom:1px solid #999;
	padding:1.2rem 1rem;
}
.list img{
	width:4rem;
	height:4rem;
	border-radius:50%;
	margin-right:1rem;
}
.content{
	flex:1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.list_title>span {
    background-color: #009688;
    color: #fff;
    padding: 0.2rem;
    border-radius: 0.2rem;
}

.list_title>h3 {
    display: inline;
    font-weight: 700;
}
.timer {
    display: flex;
    justify-content: space-between;
    color: #999;
}
.nomore {
    text-align: center;
    padding: 1.4rem 0;
}
.demo-infinite-container{
  -webkit-overflow-scrolling: touch;

}
</style>