<template>
	<div class="wrapper">
		<v-header class="header"></v-header>
		<keep-alive>
			<tabs class="tab"></tabs>
		</keep-alive>
		<btom-nav></btom-nav>
	</div>
</template>
<script>
import VHeader from './common/header'
import Tabs from './common/tabs'
import BtomNav from './common/btomNav'
import axios from 'axios'
export default{
	components:{
		VHeader,
		Tabs,
		BtomNav
	},
	data(){
		return{

		}
	}
}
</script>
<style scoped>
	.wrapper{
		display: flex;
		flex-direction: column;
		height:100vh;
	}
	.header{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		z-index:3;	
	}
	.tab{
		flex:1;
		margin:9rem 0 5rem 0;
	}

</style>