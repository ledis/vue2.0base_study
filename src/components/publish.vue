<template>
	<div class="wrapper">
		<mu-appbar class="title" title="发布话题">
    </mu-appbar>
    <div class="main">
    	<mu-select-field class="text" :labelFocusClass="['label-foucs']" v-model="list" label="选择模块">
		    <mu-menu-item v-for="(text,index) in lists" :value="index" :title="text"/>
		  </mu-select-field>
		  <mu-text-field v-model="title" class="text" label="标题" hintText="标题字数 10字以上" />
		  <mu-text-field v-model="content" class="text content" hintText="输入文本，支持markdown格式" multiLine :rows="5" :underlineShow="false" />
		  <mu-raised-button @click="setData" label="发布话题" class="demo-raised-button" icon="near_me" primary/>
    </div>
		<mu-dialog :open="!accesstoken" title="提示：">
        请先登录
        <mu-flat-button slot="actions" primary to="/vueproject" label="取消" />
        <mu-flat-button slot="actions" primary to="/vueproject/login" label="确定" />
    </mu-dialog>
    <mu-dialog :open="publish" title="提示：">
        {{tips}}
        <mu-flat-button slot="actions" primary @click="close" label="确定" />
    </mu-dialog>
    <btom-nav></btom-nav>
	</div>
</template>
<script>
import axios from 'axios'
// import marked from 'marked'
import BtomNav from './common/btomNav'
export default{
	components: {
      BtomNav
  },
  data(){
  	return {
  		accesstoken:'',
  		list:0,
  		lists:['分享','回答','招聘'],
  		tips:'请输入正确格式',
  		title: '',
      tab: '',
      publish: false,
      content: '',
  	}
  },
  created:function(){
  	this.accesstoken=localStorage.getItem("accesstoken")
  },
  methods:{
  	setData(){
  		if(this.list===0){
  			this.tab='share'
  		}else if(this.list===1){
  			this.tab='ask'
  		}else if(this.list===2){
  			this.tab='job'
  		}
  		let that=this 

  		axios.post('https://www.vue-js.com/api/v1/topics',{accesstoken: that.accesstoken,
                    title: that.title,
                    tab: that.tab,
                    content: that.content
        }).then(function(response){
        	that.title=''
        	that.content=''
        	that.publish=true
        	that.tips='发表成功！'
        	setTimeout(function() {
              that.publish = false
          }, 1500)
        }).catch(function(error) {
            that.publish = true
        })
  	},
  	close() {
        this.publish = false
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
		left:0;
		top:0;
    text-align: center;
    height: 5rem;
}
.main{
	flex: 1;
  margin: 5rem 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.text{
	width:100%;
}
.content {
    flex: 1;
    background-color: #f7f7f7;
    padding: 1rem;
    overflow-y: auto;
}

textarea {
    height: 10rem;
}
</style>