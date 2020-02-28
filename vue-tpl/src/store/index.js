
import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

// 根级别的 actions和mutations
import mutations from './mutations'
import actions from './actions'

// 子模块
import login from './modules/login'

export default new vuex.Store({
    mutations,
    actions,
    
    modules: {
        login
    }
    
});