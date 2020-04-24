import config from './config.js';
import $http from './request.js';
/**
 * 用户内存状态
 * 
 * Usage: 在main.js中
 * import User from './common/user.js'
 * Vue.prototype.User = User
 * 在其他地方
 * this.User.navigate(...)
 */
export default {
  // 用户token
  token: false,
  // 用户信息
  userInfo: false,
  // 绑定的第三方登录状态
  userbind: false,
  // 用户相关统计
  counts: {},
  /**
   * 初始化（一般app启动时调用）
   */
  __init(){
      // 获取用户信息
      this.token = uni.getStorageSync('token');
      this.userInfo = uni.getStorageSync('userInfo');
      this.counts = uni.getStorageSync('counts');
  },
  /**
   * 页面鉴权
   */
  navigate(options, type="navigateTo"){
    // 是否登录验证
    if(!$http.checkToken(config.authentication)) return;
    // 跳转
    switch(type){
      case "navigateTo":
      uni.navigateTo(options);
      break;
      
      case "switchTab":
      uni.switchTab(options);
      break;

      case "redirectTo":
      uni.redirectTo(options);
      break;
      
      case "reLaunch":
      uni.reLaunch(options);
      break;
    }
  },
  async login(options={}){
    let url = options.url?options.url:config.loginUrl;
    let [err, res] = await $http.post(url, options.data, {useToken: 'no'}).then(data=>[null,data]).catch(err=>[err]);
    if(!$http.errorCheck(err, res)) return false;
    // 登录成功 保存状态
    this.token = res.data.token;
    // 对象转换
    this.userInfo = res.data.userInfo;//this.__formatuserInfo(res.data.data.userInfo);
    // 本地存储
    uni.setStorageSync("userInfo", this.userInfo);
    uni.setStorageSync("token", this.token);
    // TODO 获取用户相关统计
    // TODO 连接websocket
    
    uni.showToast({title: '登录成功'});
    // 返回上一步
    if(options.navigateBack){
      uni.navigateBack({delta: 1});
    }
    return true;
  }, 
  logout(showToast = true, switchTab = false) {
    // 退出登录
    $http.get(config.logoutUrl, {}, {checkToken: 'no'});
    
    // 清除缓存
    uni.removeStorageSync('userInfo');
    uni.removeStorageSync('token');
    // 清除状态
    this.token = false;
    this.userInfo = false;
    this.userbind = false;
    this.counts = {};
    
    // TODO 关闭websocket
    
    // 返回home页面
    if(switchTab)
        uni.switchTab({url: config.loginPage});
    else uni.redirectTo({url: config.loginPage});
    
    if(showToast) {
      return uni.showToast({title: '退出登录成功'});
    }
  }
  
}