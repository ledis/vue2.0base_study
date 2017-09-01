<template>
	<mu-paper class="bottom_nav">
	  <mu-bottom-nav :value="bottomNav" @change="handleChange">
	    <mu-bottom-nav-item to="/vueproject" value="首页" title="首页" icon="home"/>
	    <mu-bottom-nav-item to="/vueproject/publish" value="发布" title="发布" icon="subject"/>
	    <mu-bottom-nav-item to="/vueproject/message" value="消息" title="消息" icon="message"/>
	    <mu-bottom-nav-item :to="person_path" value="我的" title="我的" icon="person"/>
	  </mu-bottom-nav>
	</mu-paper>
</template>
<script>
	export default{
		data(){
			return {
				bottomNav:'首页',
				person_path:'/login'
			}
		},
		created:function(){
			this.facthData()
		},
		watch:{
			'$route':'facthData'
		},
		methods:{
			handleChange(val) {
          this.bottomNav = val
      },
      facthData(){
      	let accesstoken=localStorage.getItem("accesstoken")
      	if(accesstoken){
      		this.person_path="/vueproject/personal"
      	}else{
      		this.person_path="/vueproject/login"
      	}
      	if (this.$route.path === '/vueproject') {
            this.bottomNav = '首页'
        }
        if (this.$route.path === '/vueproject/publish') {
            this.bottomNav = '发布'
        }
        if (this.$route.path === '/vueproject/message') {
            this.bottomNav = '消息'
        }
        if (this.$route.path === '/vueproject/login' || this.$route.path === '/vueproject/personal') {
            this.bottomNav = '我的'
        }
      }
		}

	}
</script>
<style>
.bottom_nav .mu-bottom-nav-shift-wrapper {
    display: flex;
    justify-content: space-around;
}

.bottom_nav {
    height: 5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>