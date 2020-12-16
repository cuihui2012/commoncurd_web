import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/Login.vue'
import home from '@/views/Home.vue'
import appManage from '@/views/AppManage.vue'
import dataAuthManage from '@/views/DataAuthManage.vue'
import apiUtil from '@/views/ApiUtil.vue'
import apiLog from '@/views/ApiLog.vue'
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'login',
      component: login,
    },{
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {path: '/appManage',name: 'appManage',component: appManage},
        {path: '/dataAuthManage',name: 'dataAuthManage',component: dataAuthManage},
        {path: '/apiUtil',name: 'apiUtil',component: apiUtil},
        {path: '/apiLog',name: 'apiLog',component: apiLog},
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
