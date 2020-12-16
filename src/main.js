import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './components/lang/i18n.js'
Vue.use(ElementUI);
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 引入引入jquery
import $ from "jquery";
Vue.prototype.$ = $
// 引入MD5
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
// 引入axios
import axios from "axios"
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';


new Vue({
  router,
  store,
  i18n,
  data:{
    eventHub:new Vue() // 在main.js设置所有组件都能用调用
   },
  render: h => h(App)
}).$mount('#app')
