// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

import 'normalize.css'
//import '../static/js/rem.js'

/** -- Begin Ajax */
// 引入自定义的ajax js组件
import ajax from '../static/js/customAjax'
Vue.use(ajax)

// 引入自定义的js组件(使用Promise)
import fetchServer from '../static/js/fetchServer'
Vue.prototype.fetchServer = fetchServer // 这样所有的 vue 实例都可以使用 this.fetchServer

// 引入vue的ajax组件（官方不推荐使用了）
/*import VueResource from 'vue-resource'
Vue.use(VueResource)*/

// 引入axios
import axios from 'axios'
Vue.prototype.$axios=axios // 这样所有的 vue 实例都可以使用 this.$axios 
/** End Ajax -- */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
