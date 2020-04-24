import Vue from 'vue'
import App from './App'

// 导入项目request
import request from './common/request.js';
Vue.prototype.$http = request;

import config from './common/config.js';
Vue.prototype.config = config;

import lib from './common/lib.js';
Vue.prototype.lib = lib;

import User from './common/user.js'
Vue.prototype.User = User

import util from './common/util.js'
Vue.prototype.util = util

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    config,
    lib
})
app.$mount()
