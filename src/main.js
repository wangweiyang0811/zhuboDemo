import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import $ from 'jquery'
import moment from 'moment'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
import 'element-ui/lib/theme-chalk/index.css';
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'
import loading from './Loading.js'
import vMessage from './components/Message/index' 
import { Pagination } from 'element-ui'
// 注册到全局

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

Vue.config.productionTip = false
Vue.prototype.$axios=axios;
Vue.prototype.$store=store;
Vue.use(Pagination);
Vue.use(loading)
Vue.use(VueAwesomeSwiper)
Vue.use(vMessage);
axios.interceptors.request.use(function(config){
  store.state.isShow=true;
  return config
})
//定义一个响应拦截器
axios.interceptors.response.use(function(config){
  store.state.isShow=false;//在这里对返回的数据进行处理
  return config
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


window.setLocal=setLocal;
window.getLocal=getLocal;
window.moment=moment;
window.$=$;
function setLocal(key,val){
  let value={
    data:val,
    time:new Date().getTime()
  }
  localStorage.setItem(key,JSON.stringify(value));
}
function getLocal(key){
  let val=localStorage.getItem(key);
  let curTime=new Date().getTime();
  let durationTime=1;
  if(val){
    val=JSON.parse(val);
    if((val.time+durationTime*24*60*60*1000)>curTime){
      return val.data;
    }else{
      localStorage.removeItem(val);
      return false;
    }
  }else{
    return false;
  }
}