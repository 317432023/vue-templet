// 配置信息
export default {
    // 页面访问 是否需要验证登录状态
    authentication: true, signParam: true,
    // api 请求前缀
    baseUrl: 'http://192.168.0.126:9081/jz-admin-api',
    //baseUrl: 'http://127.0.0.1:9090',
    // 常用接口
    loginUrl: '/api/admin/agent/h5/uc/login',
    logoutUrl: '/api/admin/agent/h5/uc/logout',
    serverTimeUrl: '/api/common/serverTime',
    
    // 常用页面
    loginPage: '/pages/login/login',
    indexPage: '/pages/index/index'
}