import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/SearchPage',
      name: 'SearchPage',
      component: () => import(/* webpackChunkName: "about" */ './views/SearchPage.vue')
    },
    {
      path: '/Union',
      name: 'Union',
      component: () => import(/* webpackChunkName: "about" */ './views/Union.vue')
    },
    {
      path:'/Anchor',
      name:'Anchor',
      component: () => import(/* webpackChunkName: "about" */ './views/Anchor.vue')
    },
    {
      path:'/UserInfo',
      name:'UserInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/UserInfo.vue')
    }
  ]
})
