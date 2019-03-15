import Vue from 'vue'
import Router from 'vue-router'

import RateConvert from './components/rateConvert.vue'

Vue.use(Router)



let router = new Router({
  mode:'history',
  routes:[
    {
      path:'/convert',
      name:'convert',
      component: RateConvert
    }
  ]})


export default router
