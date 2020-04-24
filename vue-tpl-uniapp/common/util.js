import config from './config.js';
import $http from './request.js';

export default {
    async _serverTime(preferTimestamp=true,retry=3) {//async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果;async函数返回一个Promise对象
        if(retry == 0) {
            console.log('serverTime retry full')
            return 0;
        }
        let $that = this;
        
        let [err,ts] = await new Promise((resolve, reject)=>{
            uni.request({url: $http._getUrl(config.serverTimeUrl), method: 'GET', data:{'preferTimestamp':preferTimestamp},
                success: res => {
                    let jsonObj = res.data;
                    if(jsonObj.code == 0) {
                        let ts0 = jsonObj.result.serverTime;
                        console.log(ts0);
                        let diff = ts0 - new Date().getTime()/* $that.getTimeStamp() */;
                        console.log(diff);
                        uni.setStorageSync('diff', diff.toString());
                        resolve(ts0)
                    }else resolve(0)
                },
                fail: (err) => {
                    reject(err); 
                }
            });
        }).then(data=>[null, data]).catch(err=>[err]);
        
        if(err) {
            console.log('serverTime fail, retry...')
            return this._serverTime(true, --retry);
        }
        console.log("第一次从服务器取得="+ts)
        return ts;
    },
    /**主调函数：取得服务器时间戳毫秒数。返回非0代表成功，0失败*/
    async serverTime(preferTimestamp=true) {
        let diff = uni.getStorageSync('diff');
        if(diff) return new Date().getTime()/* this.getTimeStamp() */ + parseInt(diff);
        return await this._serverTime(preferTimestamp).then(data=>data);
    },
    /**
     * 获取不同时区对应的北京时间
     * description:
     * new Date() 方法返回的是本机时间，是带时区的时间。导入参数后返回的是带时区的日期与1970年1月1日相差的毫秒数；
     * getTimezoneOffset() 方法可返回格林威治时间和本地时间之间的时差，以分钟为单位。
     * time_zone少于0的是西区 西区应该用时区绝对值加京八区 重新设置时间（西区时间比东区时间早 所以加时区间隔）
     * 大于0的是东区 东区时间直接跟京八区相减
     */
    getBeijingtime(currentDate) {
      //获得当前运行环境时间
      let d = new Date();
      //未指定要转换的时间则使用当前系统时间
      if(!currentDate) {
        currentDate = new Date();
      }
      let tmpHours = currentDate.getHours();
      //算得时区
      let time_zone = -d.getTimezoneOffset() / 60;
      if (time_zone < 0) {
        time_zone = Math.abs(time_zone) + 8; 
    	currentDate.setHours(tmpHours + time_zone);
      } else {
        time_zone -= 8;
    	currentDate.setHours(tmpHours - time_zone);
      }
      return currentDate;
    },
    /**
     * 取得时间戳
     * 注意：不能使用getTime()
     * getTime() 方法的返回值一个数值，表示从1970年1月1日0时0分0秒（UTC，即协调世界时）距离该日期对象（带时区的时间）的毫秒数，
     * 那它与北京时间的差值就不一定了，计算起来也很麻烦。
     * 而Date.UTC()返回的是0时区的时间，返回的是0时区的当前日期与1970.1.1相差的毫秒数。那么它与北京时间差值就是固定的8小时；
     */
    getTimeStamp(){
      const currentDate = this.getBeijingtime();
      const y = currentDate.getFullYear();   //当前客户端对应的北京时间的年
      const m = currentDate.getMonth();   //北京时间的月
      const d = currentDate.getDate();
      const h = currentDate.getHours();
      const mm = currentDate.getMinutes();
      const ss = currentDate.getSeconds();
      // Date.UTC() 方法接受的参数同日期构造函数接受最多参数时一样，返回从1970-1-1 00:00:00 UTC到指定日期的的毫秒数。
      const timeObj = Date.UTC(y, m, d, h, mm, ss, 0) - (8 * 60 * 60);
      return timeObj;
    }
}