<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
// import store from './store.js'
export default{
  data(){
    return{
      
    }
  },
  created(){
    this.$store.dispatch('gettoken');
  }
}
</script>
<style lang="scss">
body,html,ul{
  margin:0;
  padding: 0;
  background: #f1f1f1;
}
div{
  box-sizing: border-box;
}
li{
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .v-table-rightview .v-table-body{
    overflow-y:visible; 
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.m-title{
    text-align: left;
    padding-left:20px;
    height: 40px;
    line-height: 40px;
    background: #fafafa;
  }
.v-table-header{
    background: #999 !important;
    color: #fff;
}
.v-page-ul{
  width: 100% !important;
}
.el-pager{
  background: #fff
}
</style>
