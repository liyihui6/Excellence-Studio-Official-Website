// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
require('animate.css/animate.min.css')

axios.defaults.baseURL = 'http://10.200.3.110:8080' // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

Vue.prototype.$http = axios
Vue.use(iView)
Vue.use(mavonEditor)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
