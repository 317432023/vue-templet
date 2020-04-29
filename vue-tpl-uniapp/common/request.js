import config from './config.js';
import User from './user.js';
import util from './util.js';
import md5 from 'js-md5';
/**
 * 对uni.request的封装，增加了支持是否登录检查
 * 
 * Usage: 在main.js中
 * import request from './common/request.js';
 * Vue.prototype.$http = request;
 * 在其他地方使用
 * 方法一：
 * let p = this.$http.request(options);
 * p.then(data=>{...}).catch(err=>{...})
 * 方法二：
 * 先在调用方外层方法加上async修饰符然后
 * let [err, res] = await this.$http.request(options).then(data=>[null,data]).catch(err=>[err]);
 * 方法三：
 * try{
 *   let data = await this.$http.request(options);
 * }catch(err){...}
 * 
 * if(!this.$http.errorCheck(err,res)) return;
 * console.log(res);
 */
export default {
    // 初始化options参数
    config: {
        baseUrl: config.baseUrl,
        header: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {},
        method: 'GET',
        dataType: 'json',
        useToken: 'yes',
        checkToken: 'yes',
    },
    _getUrl(url) {
        if(url.startsWith('http')) {
            return url
        }
        return this.config.baseUrl+url
    },
    /** MD5 (body内容（POST|PUT） + 参数值(参数名称自然排序) + 可变消息头值[token, SAAS, dvc, ver] + 时间戳消息头值 + 盐 )*/
    async request(options = {}) {
        options.url = this._getUrl(options.url);
        options.method = options.method || this.config.method;
        options.header = options.header || this.config.header;
        options.dataType = options.dataType || this.config.dataType;
        options.useToken = options.useToken || this.config.useToken;
        options.checkToken = options.checkToken || this.config.checkToken;
        if(options.useToken == 'yes') {
            // 验证用户是否登录
            if(!this.checkToken(options.checkToken == 'yes')) {
                return;
            }
            options.header.token = User.token;
        }
        if(config.signParam) {
            let ts = await util.serverTime();
            
            if(!ts){
                return uni.showToast({title: '请求失败，请检查网络',icon:'none'})
            }
            
            let _strings = new Array();
            //console.log(typeof options.data)
            if(typeof options.data === 'string') {
                _strings.push(options.data)
            }else if(typeof options.data === 'object'){
                let paramArray = new Array();
                for(let key in options.data) {
                    paramArray.push({'name':key, 'value':options.data[key]});
                }
                paramArray.sort((x,y) => x['name'].localeCompare(y['name']))
                paramArray.forEach((value, index) => {
                  _strings.push(value['value']);
                })
            }
            for(let key in options.header) {
                if(key == 'token') {
                    if(options.useToken == 'yes')_strings.push(options.header[key])
                }else if(key == 'station-id') {
                    _strings.push(options.header[key])
                }else if(key == 'device') {
                    _strings.push(options.header[key])
                }else if(key == 'version') {
                    _strings.push(options.header[key])
                }
            }
            _strings.push(ts);
            _strings.push('rise');
            let s = _strings.join("")
            //console.log(s)
            options.header['signature'] = md5(s);
            options.header['timestamp'] = ts;
            //console.log('signature='+options.header['signature'] )
        }
        return new Promise((resolve, reject)=>{
            options.success = (res)=>{
                if(res.data.code !== 0) {
                    uni.showToast({title: '处理失败，错误码 '+res.data.code + '\n' + res.data.msg, icon:'none'})
                    if(options.method=='GET' && res.data.code==401) uni.navigateTo({url:config.loginPage})
                    return false;
                }
                resolve(res.data)
            };
            options.fail = (err)=>{
                uni.showToast({'title':'请求接口失败',icon:'none'})
                reject(err)
            };
            uni.request(options)
        })
        
    },
    get(url, data, options={}) {
        options.url = url;
        options.data = data;
        options.method = 'GET';
        return this.request(options);
    },
    del(url, data, options={}) {
        options.url = url;
        options.data = data;
        options.method = 'DELETE';
        return this.request(options);
    },
    post(url, data, options={}) {
        options.url = url;
        options.data = data;
        options.method = 'POST';
        return this.request(options);
    },
    patch(url, data, options={}) {/* 注意 uniapp 目前还不支持 PATCH 请求 */
        options.url = url;
        options.data = data;
        options.method = 'PATCH';
        return this.request(options);
    },
    put(url, data, options={}) {
        options.url = url;
        options.data = data;
        options.method = 'PUT';
        return this.request(options);
    },
    /**
     * 检测到失败返回false
     */
    errorCheck(err, res, errfun = false, resfun = false) {
        if(err) {
            if(typeof errfun == 'function') errfun();
            uni.showToast({'title': '加载失败，请检查网络', icon:'none'});
            return false;
        }
        if(res.code) {
            if(typeof resfun == 'function') refun();
            uni.showToast({'title': res.msg, icon:'none'});
            return false;
        }
        return true;
    },
    /**
     * 验证用户是否登录
     */
    checkToken(checkFlag) {
        if(checkFlag && !User.token) {
            uni.showToast({title: '请先登录', icon: 'none'});
            setTimeout(()=>
                uni.navigateTo({
                    url: config.loginPage
                }), 2000);
            return false;
        }
        //TODO 到服务器验证token并持续会话
        return true;
    },
    /**
     * 验证用户权限
     */
    checkAuth(checkFlag) {
      if(checkFlag && !User.userinfo.phone) {
        uni.showToast({title: '请先绑定手机号码', icon: 'none'});
        uni.navigateTo({url: '/pages/user-bind-phone/user-bind-phone'});
        return false;
      }
      return true;
    }
}