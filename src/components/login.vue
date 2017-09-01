<template>
	<div class="wrapper">
		<mu-appbar class="title" title="登录"></mu-appbar>
		<div class="main">
			<mu-text-field v-model="val" label="Access Token" :errorText="error" labelFloat/>
			<mu-raised-button @click="login" label="登录" class="demo-raised-button" primary/>
		</div>
		<btom-nav></btom-nav>
	</div>
</template>
<script>
import axios from 'axios'
import BtomNav from './common/btomNav'
	export default{
		data(){
			return{
				val:'',
				error:''
			}
		},
		components:{
			BtomNav
		},
		methods:{
			login(){
				let that=this 
				axios.post('https://www.vue-js.com/api/v1/accesstoken',{accesstoken: that.val})
				.then(function(response){
					that.error=''
					localStorage.setItem('accesstoken', that.val)
          localStorage.setItem('user_id', response.data.id)
          localStorage.setItem('loginname', response.data.loginname)
          that.$router.push({
              path: '/vueproject/personal'
          })
				})
				.catch(function(error){
					that.error = '输入错误，请重新输入'
					 console.log(that.$route.matched)
					that.$route.matched[0].meta = {
              requiresAuth: true
          }
				})
			}
		}
	}
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
}
.title{
	text-align: center;
	height:5rem;
}
.main{
	flex: 1;
  margin: 5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>