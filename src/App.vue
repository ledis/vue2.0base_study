<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./css/reset.css"
export default {
  name: 'app'
}
</script>

<style>
*{
  font-size:1rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}
/*定义滚动条轨道 内阴影+圆角*/ 
::-webkit-scrollbar-track {
    background: transparent;
}
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.1);
}
</style>
