<script>
	export default {
		onLaunch: function() {
            // 网路监听
            this.lib.NetWork.On();
            // 初始化用户状态
            this.User.__init()
            // #ifdef APP-PLUS  
            // 更新检测
            //this.lib.Update();
            // #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
    /*引入官方css库 uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
    /*引入自定义图标库*/
    @import './common/icon.css';

    /*自定义的公共css文件*/
    @import  './common/common.css';
    
</style>
