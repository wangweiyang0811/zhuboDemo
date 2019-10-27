import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token:'',
    isShow:false
  },
  mutations: {
    getToken(state){
      let token=localStorage.getItem('token');
      if(token){
        state.token=token;
      }else{
        axios('/openapi/token',{
          params:{
              grant_type:'client_credential',
              appid:'ds03e40d40259d6842',
              secret:'fb5c5807abc8e549fdeadaca7ff64sec'
          },
          timeout: 10000
        })
        .then((result) => {
            state.token=result.data.access_token;
            localStorage.setItem('token',state.token);
            canuse();
        }).catch((err) => {
          alert('请求token失败，点击确定重新请求');
          this.commit('getToken')
        });
      }
      function canuse(){
        axios('/openapi/check?access_token='+state.token)
        .then((res) => {
          if(res.data.status!=='success'){
            alert('当前服务不可用。')
          }
      })
      }
    }
  },
  actions: {
    gettoken(context){
      context.commit('getToken');
    }
  }
})
// store.dispatch('getToken');
